import { NextRequest, NextResponse } from 'next/server';
import AdmZip from 'adm-zip';
import { scanExtensionCode } from '@/utils/securityScanner'; // Adjust path if needed

// Interface for our expected manifest structure
interface VextorManifest {
  name: string;
  version: string;
  permissions?: string[];
  [key: string]: any;
}

export async function POST(req: NextRequest) {
  try {
    // 1. Extract the file from the FormData
    const formData = await req.formData();
    const file = formData.get('extension') as File | null;

    if (!file) {
      return NextResponse.json({ error: "No extension file provided." }, { status: 400 });
    }

    // 2. Convert the uploaded file to a Node.js Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 3. Load the zip archive into memory (no disk writing required)
    const zip = new AdmZip(buffer);
    const zipEntries = zip.getEntries();

    // 4. Locate and parse the vextor-manifest.json
    const manifestEntry = zipEntries.find(entry => entry.entryName === 'vextor-manifest.json' || entry.entryName === 'extension/vextor-manifest.json');
    
    if (!manifestEntry) {
      return NextResponse.json({ 
        error: "Invalid Package: Missing vextor-manifest.json at the root." 
      }, { status: 400 });
    }

    let manifest: VextorManifest;
    try {
      manifest = JSON.parse(manifestEntry.getData().toString('utf8'));
    } catch (err) {
      return NextResponse.json({ error: "Invalid JSON in vextor-manifest.json." }, { status: 400 });
    }

    const permissions: string[] = manifest.permissions || [];
    const allViolations: { file: string; issues: string[] }[] = [];

    // 5. Scan every JavaScript file inside the extension package
    for (const entry of zipEntries) {
      // Only scan .js files (ignore images, json, md, etc.)
      if (entry.entryName.endsWith('.js') && !entry.isDirectory) {
        const jsCode = entry.getData().toString('utf8');
        
        // Run our AST scanner
        const fileViolations = scanExtensionCode(jsCode, permissions);
        
        if (fileViolations.length > 0) {
          allViolations.push({
            file: entry.entryName,
            issues: fileViolations
          });
        }
      }
    }

    // 6. The Verdict: Reject if any security violations were found
    if (allViolations.length > 0) {
      return NextResponse.json({
        status: "REJECTED",
        message: "Security audit failed. Malicious or unauthorized code detected.",
        violations: allViolations
      }, { status: 403 });
    }

    // 7. Success! Save to Database and Cloud Storage
    // TODO: Insert into PostgreSQL/MongoDB here
    // TODO: Upload `buffer` to Cloudinary/S3 here

    return NextResponse.json({
      status: "APPROVED",
      message: "Extension passed security audit and is ready for publishing.",
      manifest: {
        name: manifest.name,
        version: manifest.version,
        permissions: permissions
      }
    }, { status: 200 });

  } catch (error: any) {
    console.error("Upload processing failed:", error);
    return NextResponse.json({ 
      error: "Internal server error during upload processing." 
    }, { status: 500 });
  }
}