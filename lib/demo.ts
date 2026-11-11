// Demo billing mode for presentations. Nothing here talks to Lemon Squeezy.
// Turn on with DEMO_BILLING=true and NEXT_PUBLIC_DEMO_BILLING=true in .env.local.
// Leave both unset (or false) in production so real payments are used.

/** Server-side switch. Every demo API route must check this first. */
export const isDemoBillingServer = process.env.DEMO_BILLING === 'true';

/** Client-side switch (inlined at build time by Next.js). */
export const isDemoBillingClient = process.env.NEXT_PUBLIC_DEMO_BILLING === 'true';
