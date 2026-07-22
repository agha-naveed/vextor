import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Extension } from '@/models/Extension';
import { connectDB } from '@/utils/connectDB';

export async function GET() {
  try {
    await connectDB()

    // 2. Fetch only approved extensions, newest first
    const extensions = await Extension.find({ status: "APPROVED" })
                                      .sort({ createdAt: -1 })
                                      .select('-__v');

    return NextResponse.json(extensions, { status: 200, headers: {
    'Access-Control-Allow-Origin': '*', // Allows your Electron app to read the data
    'Access-Control-Allow-Methods': 'GET',
    'Content-Type': 'application/json'
  } });
  } catch (error: any) {
    console.error("Failed to fetch extensions:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}