import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

// This creates a secure, connectionless HTTP driver perfect for Vercel Edge/Serverless
export const sql = neon(process.env.DATABASE_URL as string);