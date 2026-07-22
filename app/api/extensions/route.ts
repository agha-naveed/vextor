import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Extension } from '@/models/Extension';

export async function GET() {
  try {
    // 1. Connect to MongoDB Atlas
    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGODB_URI as string);
    }

    // 2. Fetch only approved extensions, newest first
    const extensions = await Extension.find({ status: "APPROVED" })
                                      .sort({ createdAt: -1 })
                                      .select('-__v');

    return NextResponse.json(extensions, { status: 200 });
  } catch (error: any) {
    console.error("Failed to fetch extensions:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}