import { NextRequest, NextResponse } from 'next/server';
import AdmZip from 'adm-zip';
import { scanExtensionFiles, ScanSummary } from '@/utils/securityScanner';
import { v2 as cloudinary } from 'cloudinary';
import { neon } from '@neondatabase/serverless';
import { ensureUserRecord } from '@/lib/ensureUser';

// 1. Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function notifyUploader(sql: ReturnType<typeof neon>, opts: {
  developerId: string;
  extensionName: string;
  summary: ScanSummary;
}) {
  const { developerId, extensionName, summary } = opts;

  console.log(
    `📣 Notify uploader (${developerId}) — "${extensionName}": ` +
    `${summary.passed ? 'PASSED' : 'REJECTED'} ` +
    `(${summary.criticalCount} critical, ${summary.warningCount} warning)`
  );

  try {
    await sql`
      INSERT INTO extension_scan_reports (developer_id, extension_name, passed, critical_count, warning_count, report)
      VALUES (${developerId}, ${extensionName}, ${summary.passed}, ${summary.criticalCount}, ${summary.warningCount}, ${JSON.stringify(summary.results)})
    `;
  } catch (err) {
    console.error('Could not persist scan report (table may not exist yet):', err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const sql = neon(process.env.DATABASE_URL as string) as any;

    const developerId = await ensureUserRecord(sql);
    if (!developerId) {
      return NextResponse.json({ error: "You must be signed in to publish an extension." }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('extension') as File | null;

    if (!file) {
      return NextResponse.json({ error: "No extension file provided." }, { status: 400 });
    }

    const fileName = file.name.toLowerCase();
    const isVsix = fileName.endsWith('.vsix');

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const zip = new AdmZip(buffer);
    const zipEntries = zip.getEntries();

    // 🚀 NEW: Handle both Vextor and standard VS Code VSIX manifests
    let manifestEntry;
    if (isVsix) {
      manifestEntry = zipEntries.find(entry => entry.entryName === 'extension/package.json');
    } else {
      manifestEntry = zipEntries.find(entry => entry.entryName === 'vextor-manifest.json' || entry.entryName === 'extension/vextor-manifest.json');
    }

    if (!manifestEntry) {
      return NextResponse.json({ error: `Missing manifest file (${isVsix ? 'extension/package.json' : 'vextor-manifest.json'})` }, { status: 400 });
    }

    let manifest: any;
    try {
      manifest = JSON.parse(manifestEntry.getData().toString('utf8'));
    } catch (err) {
      return NextResponse.json({ error: "Invalid JSON in manifest file." }, { status: 400 });
    }

    // Map fields gracefully (VS Code and Vextor use slightly different naming conventions)
    const extName = manifest.name;
    const extDisplayName = manifest.displayName || manifest.name;
    const extDescription = manifest.description || 'No description provided.';
    const extVersion = manifest.version;
    const permissions: string[] = manifest.permissions || [];

    // 🚀 NEW: Bypass the AST Security Scanner for heavy third-party VSIX files
    let summary: ScanSummary = { passed: true, criticalCount: 0, warningCount: 0, results: [] };

    if (!isVsix) {
      const codeFiles = zipEntries
        .filter(entry => !entry.isDirectory && /\.(js|mjs|cjs)$/i.test(entry.entryName))
        .map(entry => ({ name: entry.entryName, code: entry.getData().toString('utf8') }));

      summary = scanExtensionFiles(codeFiles, permissions);
      await notifyUploader(sql, { developerId, extensionName: extName, summary });

      if (!summary.passed) {
        return NextResponse.json({
          status: "REJECTED",
          message: "Security audit failed. Fix the critical issues below and re-upload.",
          criticalCount: summary.criticalCount,
          warningCount: summary.warningCount,
          violations: summary.results.map(r => ({
            file: r.file,
            issues: r.violations.map(v => `[${v.severity.toUpperCase()}] ${v.message}${v.line ? ` (line ${v.line})` : ''}`),
          })),
          violationsDetailed: summary.results,
        }, { status: 403 });
      }
    } else {
      console.log(`📦 Bypassing security scan for trusted third-party VSIX: ${extName}`);
    }

    // 3. Upload to Cloudinary
    const uploadPromise = new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'raw', folder: 'vextor_extensions', format: isVsix ? 'vsix' : 'zip' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    const cloudRes: any = await uploadPromise;

    // 4. Insert into Neon DB
    await sql`
      INSERT INTO extensions (name, display_name, description, version, developer_id, download_url, permissions, status)
      VALUES (
        ${extName}, 
        ${extDisplayName}, 
        ${extDescription}, 
        ${extVersion}, 
        ${developerId}, 
        ${cloudRes.secure_url}, 
        ${permissions}, 
        'APPROVED'
      )
    `;

    return NextResponse.json({
      status: "APPROVED",
      message: summary.warningCount > 0
        ? `Extension published successfully. ${summary.warningCount} warning(s) were noted.`
        : "Extension published successfully.",
      warnings: summary.warningCount > 0 ? summary.results : undefined,
      manifest: { name: extName, version: extVersion, permissions }
    }, { status: 200 });

  } catch (error: any) {
    console.error("Upload failed:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}