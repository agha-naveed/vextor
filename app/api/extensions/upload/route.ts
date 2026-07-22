import { NextRequest, NextResponse } from 'next/server';
import AdmZip from 'adm-zip';
import { scanExtensionCode } from '@/utils/securityScanner';
import { Extension } from '@/models/Extension';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import { connectDB } from '@/utils/connectDB';

// 1. Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
    const allViolations: { file: string; issues: string[] }[] = [];

    // 2. Run AST Security Scan
    for (const entry of zipEntries) {
      if (entry.entryName.endsWith('.js') && !entry.isDirectory) {
        const jsCode = entry.getData().toString('utf8');
        const fileViolations = scanExtensionCode(jsCode, permissions);
        if (fileViolations.length > 0) {
          allViolations.push({ file: entry.entryName, issues: fileViolations });
        }
      }
    }

    if (allViolations.length > 0) {
      return NextResponse.json({
        status: "REJECTED",
        message: "Security audit failed.",
        violations: allViolations
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

    // 4. Connect to MongoDB Atlas and Save
    if (!mongoose.connection.readyState) {
    //   await mongoose.connect(process.env.MONGODB_URI as string);
        await connectDB()

    }

    await Extension.create({
      name: manifest.name,
      displayName: manifest.displayName || manifest.name,
      description: manifest.description || "No description provided.",
      version: manifest.version,
      developerId: "replace_with_actual_user_id", 
      downloadUrl: cloudRes.secure_url,
      permissions: permissions,
      status: "APPROVED" 
    });

    return NextResponse.json({
      status: "APPROVED",
      message: "Extension published successfully.",
      manifest: { name: manifest.name, version: manifest.version, permissions }
    }, { status: 200 });

  } catch (error: any) {
    console.error("Upload failed:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}


export async function GET() {

    await connectDB()

    const a = await Extension.find()
    return NextResponse.json(a)
}