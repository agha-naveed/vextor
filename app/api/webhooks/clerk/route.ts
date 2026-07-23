// app/api/webhooks/clerk/route.ts
//
// This is what actually writes a row to Neon on signup. It fires
// automatically for BOTH signup paths in your /login page — Google OAuth
// and email/password — because Clerk sends this event no matter how the
// account was created. Your frontend doesn't need to call anything extra.
//
// Setup (one-time, in the Clerk dashboard):
//   1. Dashboard → Webhooks → Add Endpoint
//   2. URL: https://vextor.vercel.app/api/webhooks/clerk
//   3. Subscribe to: user.created, user.updated, user.deleted
//   4. Copy the "Signing Secret" it gives you into your env as
//      CLERK_WEBHOOK_SIGNING_SECRET
//   5. `npm install svix` (used to verify the webhook signature below)

import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

interface ClerkEmailAddress {
  id: string;
  email_address: string;
  verification?: { status?: string } | null;
}

interface ClerkUserEventData {
  id: string;
  email_addresses: ClerkEmailAddress[];
  primary_email_address_id: string | null;
  first_name: string | null;
  last_name: string | null;
}

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;
  if (!WEBHOOK_SECRET) {
    console.error('CLERK_WEBHOOK_SIGNING_SECRET is not set.');
    return NextResponse.json({ error: 'Server misconfigured.' }, { status: 500 });
  }

  // 🔒 Verify this request actually came from Clerk, not an attacker who
  // found the URL and POSTed a fake "user.created" event to plant a
  // spoofed account. The raw body (not parsed JSON) is required for the
  // signature check to work.
  const headerPayload = await headers();
  const svixId = headerPayload.get('svix-id');
  const svixTimestamp = headerPayload.get('svix-timestamp');
  const svixSignature = headerPayload.get('svix-signature');

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: 'Missing svix headers.' }, { status: 400 });
  }

  const rawBody = await req.text();
  const wh = new Webhook(WEBHOOK_SECRET);

  let event: any;
  try {
    event = wh.verify(rawBody, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    });
  } catch (err) {
    console.error('Clerk webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 });
  }

  const sql = neon(process.env.DATABASE_URL as string);
  const eventType = event.type as string;

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const data = event.data as ClerkUserEventData;

    const primaryEmail =
      data.email_addresses.find(e => e.id === data.primary_email_address_id) ??
      data.email_addresses[0] ??
      null;

    if (!primaryEmail) {
      console.error(`Clerk user ${data.id} has no email address — skipping DB sync.`);
      return NextResponse.json({ received: true, skipped: 'no-email' });
    }

    const email = primaryEmail.email_address;
    const emailVerified = primaryEmail.verification?.status === 'verified';
    const name = [data.first_name, data.last_name].filter(Boolean).join(' ').trim() || 'Unnamed User';

    try {
      await sql`
        INSERT INTO users (id, email, name, email_verified)
        VALUES (${data.id}, ${email}, ${name}, ${emailVerified})
        ON CONFLICT (id) DO UPDATE SET
          email = EXCLUDED.email,
          name = EXCLUDED.name,
          email_verified = EXCLUDED.email_verified,
          updated_at = now()
      `;
    } catch (err) {
      console.error('Failed to sync Clerk user to Neon:', err);
      // 500 here tells Clerk to retry the webhook delivery.
      return NextResponse.json({ error: 'DB sync failed.' }, { status: 500 });
    }
  }

  if (eventType === 'user.deleted') {
    const id = (event.data as { id?: string }).id;
    if (id) {
      try {
        await sql`DELETE FROM users WHERE id = ${id}`;
      } catch (err) {
        console.error('Failed to delete Clerk user from Neon:', err);
      }
    }
  }

  return NextResponse.json({ received: true });
}