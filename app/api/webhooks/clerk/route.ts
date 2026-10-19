import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function POST(req: Request) {
  // You can find this secret in the Clerk Dashboard -> Webhooks
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or Vercel');
  }

  // Get the headers required by Svix to verify the webhook signature
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', { status: 400 });
  }

  // Get the raw body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload to ensure it actually came from Clerk
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', { status: 400 });
  }

  const eventType = evt.type;

  // Handle the user registration event
  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name } = evt.data;

    const email = email_addresses[0]?.email_address;
    const name = [first_name, last_name].filter(Boolean).join(' ') || 'Developer';

    if (!id || !email) {
      return new Response('Error: Missing required user data', { status: 400 });
    }

    try {
      // 🚀 Insert into your Neon database matching your exact schema
      await sql`
        INSERT INTO users (id, email, name, "computeCredits", plan)
        VALUES (${id}, ${email}, ${name}, 1000, 'hobby')
        ON CONFLICT (id) DO NOTHING;
      `;
      
      console.log(`✅ Successfully created database record for user: ${id}`);
    } catch (error) {
      console.error('Database insertion failed:', error);
      return new Response('Database error', { status: 500 });
    }
  }

  // Handle user deletion (optional but good practice)
  if (eventType === 'user.deleted') {
    const { id } = evt.data;
    try {
      await sql`DELETE FROM users WHERE id = ${id}`;
      console.log(`🗑️ Successfully deleted user: ${id}`);
    } catch (error) {
      console.error('Database deletion failed:', error);
    }
  }

  return NextResponse.json({ success: true }, { status: 200 });
}