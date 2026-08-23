import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { sql } from '@/lib/db' 
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  // 1. Get the secret from your environment variables
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Missing CLERK_WEBHOOK_SECRET in environment variables')
  }

  // 2. Extract Svix headers for security verification
  const headerPayload = headers()
  const svix_id = (await headerPayload).get("svix-id")
  const svix_timestamp = (await headerPayload).get("svix-timestamp")
  const svix_signature = (await headerPayload).get("svix-signature")

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing svix headers', { status: 400 })
  }

  // 3. Read the request body exactly once
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // 4. Verify the webhook signature securely
  const wh = new Webhook(WEBHOOK_SECRET)
  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook signature', { status: 400 })
  }

  // 5. 🚀 HANDLE THE EVENT & UPDATE NEON DB
  const eventType = evt.type

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name } = evt.data
    
    // Safely parse name and email 
    const email = email_addresses[0]?.email_address || 'no-email@vextor.com'
    const name = `${first_name || ''} ${last_name || ''}`.trim() || 'Vextor User'

    try {
      await sql`
        INSERT INTO users (id, email, name, plan, compute_credits, monthly_ai_requests, updated_at)
        VALUES (${id}, ${email}, ${name}, 'hobby', 1000, 0, now())
        ON CONFLICT (id) DO NOTHING;
      `
      console.log(`✅ Success: User ${id} created in Neon database!`)
    } catch (dbError: any) {
      console.error('Database Insertion Error:', dbError.message)
      return new Response('Database error', { status: 500 })
    }
  }

  // Always return 200 so Clerk knows it was successful
  return NextResponse.json({ message: 'Webhook received' }, { status: 200 })
}