import { NextRequest, NextResponse } from 'next/server';
import AdmZip from 'adm-zip';
import { scanExtensionFiles, ScanSummary } from '@/utils/securityScanner';
import { v2 as cloudinary } from 'cloudinary';
import { neon } from '@neondatabase/serverless';

// 1. Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ============================================================================
// NOTIFY THE UPLOADER
// This is intentionally a small, swappable function. Right now it logs and
// (best-effort) writes a row so there's a record of every scan. Wire in real
// email (Resend/SendGrid/etc.) here once you have a way to know the
// uploader's address — see the README note about the developer_id gap.
// ============================================================================
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

  // Best-effort persistence so uploaders/admins can see scan history even
  // before a real notification channel (email, in-app inbox, etc.) exists.
  // Wrapped in try/catch so a missing table doesn't break the upload flow —
  // see the README for the CREATE TABLE statement.
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
    const formData = await req.formData();
    const file = formData.get('extension') as File | null;

    if (!file) {
      return NextResponse.json({ error: "No extension file provided." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const zip = new AdmZip(buffer);
    const zipEntries = zip.getEntries();

    const manifestEntry = zipEntries.find(entry => entry.entryName === 'vextor-manifest.json' || entry.entryName === 'extension/vextor-manifest.json');

    if (!manifestEntry) {
      return NextResponse.json({ error: "Missing vextor-manifest.json" }, { status: 400 });
    }

    let manifest: any;
    try {
      manifest = JSON.parse(manifestEntry.getData().toString('utf8'));
    } catch (err) {
      return NextResponse.json({ error: "Invalid JSON in vextor-manifest.json." }, { status: 400 });
    }

    const permissions: string[] = manifest.permissions || [];

    // 2. Run the AST security scan across every JS-like file in the archive
    //    (not just .js — .mjs/.cjs extensions were previously a free pass)
    const codeFiles = zipEntries
      .filter(entry => !entry.isDirectory && /\.(js|mjs|cjs)$/i.test(entry.entryName))
      .map(entry => ({ name: entry.entryName, code: entry.getData().toString('utf8') }));

    const summary = scanExtensionFiles(codeFiles, permissions);

    const sql = neon(process.env.DATABASE_URL as string) as any;

    // 🚨 NOTE: developer_id is still a placeholder — see README. Notification
    // is keyed on it, so until real auth is wired in, notifications aren't
    // actually reaching a real developer yet.
    const developerId = 'replace_with_actual_user_id';

    await notifyUploader(sql, { developerId, extensionName: manifest.name, summary });

    if (!summary.passed) {
      return NextResponse.json({
        status: "REJECTED",
        message: "Security audit failed. Fix the critical issues below and re-upload.",
        criticalCount: summary.criticalCount,
        warningCount: summary.warningCount,
        // Back-compat shape the current ExtensionUploadForm expects: file + flat string[] of issues.
        violations: summary.results.map(r => ({
          file: r.file,
          issues: r.violations.map(v => `[${v.severity.toUpperCase()}] ${v.message}${v.line ? ` (line ${v.line})` : ''}`),
        })),
        // Full structured report, for once the form is updated to use it.
        violationsDetailed: summary.results,
      }, { status: 403 });
    }

    // 3. Upload to Cloudinary
    const uploadPromise = new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'raw', folder: 'vextor_extensions', format: 'zip' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    const cloudRes: any = await uploadPromise;

    await sql`
      INSERT INTO extensions (name, display_name, description, version, developer_id, download_url, permissions, status)
      VALUES (
        ${manifest.name}, 
        ${manifest.displayName || manifest.name}, 
        ${manifest.description || 'No description provided.'}, 
        ${manifest.version}, 
        ${developerId}, 
        ${cloudRes.secure_url}, 
        ${permissions}, 
        'APPROVED'
      )
    `;

    return NextResponse.json({
      status: "APPROVED",
      message: summary.warningCount > 0
        ? `Extension published successfully. ${summary.warningCount} warning(s) were noted — review them below.`
        : "Extension published successfully.",
      warnings: summary.warningCount > 0 ? summary.results : undefined,
      manifest: { name: manifest.name, version: manifest.version, permissions }
    }, { status: 200 });

  } catch (error: any) {
    console.error("Upload failed:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}