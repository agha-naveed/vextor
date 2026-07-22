import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET() {
  try {
    // 1. Connect to Neon
    const sql = neon(process.env.DATABASE_URL as string);

    // 2. Write raw SQL
    const extensions = await sql`
      SELECT * FROM extensions 
      WHERE status = 'APPROVED' 
      ORDER BY created_at DESC
    `;

    return NextResponse.json(extensions, { 
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
      }
    });
  } catch (error: any) {
    console.error("Failed to fetch extensions:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}