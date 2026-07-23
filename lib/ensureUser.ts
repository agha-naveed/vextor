// lib/ensureUser.ts
//
// Webhooks are reliable but not instantaneous, and in rare cases a delivery
// can be missed entirely (Clerk retries, but nothing is 100%). Anywhere you
// need a guaranteed-real users.id — like attributing an extension upload to
// a developer — call this first. It's a no-op if the row already exists
// (the common case, since the webhook usually beats the user to it).

import { auth, currentUser } from '@clerk/nextjs/server';
import { neon } from '@neondatabase/serverless';

/**
 * Returns the current Clerk user's id, guaranteeing a matching row exists
 * in the `users` table. Returns null if nobody is signed in.
 */
export async function ensureUserRecord(sql: ReturnType<typeof neon>): Promise<string | null> {
  const { userId } = await auth();
  if (!userId) return null;

  try {
    const existing = await sql`SELECT id FROM users WHERE id = ${userId}` as [];
    if (existing.length > 0) return userId;
  } catch (err) {
    console.error('ensureUserRecord: lookup failed:', err);
    // Fall through and try to insert anyway — better to attempt it than
    // silently return an id that might not exist in the table.
  }

  const user = await currentUser();
  if (!user) return userId; // Session exists but profile fetch failed — caller can still use the id.

  const primaryEmail =
    user.emailAddresses.find(e => e.id === user.primaryEmailAddressId) ??
    user.emailAddresses[0] ??
    null;

  if (!primaryEmail) {
    console.error(`ensureUserRecord: Clerk user ${userId} has no email address.`);
    return userId;
  }

  const email = primaryEmail.emailAddress;
  const emailVerified = primaryEmail.verification?.status === 'verified';
  const name = [user.firstName, user.lastName].filter(Boolean).join(' ').trim() || 'Unnamed User';

  try {
    await sql`
      INSERT INTO users (id, email, name, email_verified)
      VALUES (${userId}, ${email}, ${name}, ${emailVerified})
      ON CONFLICT (id) DO NOTHING
    `;
  } catch (err) {
    console.error('ensureUserRecord: insert failed:', err);
  }

  return userId;
}