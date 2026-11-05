import { headers } from "next/headers";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { sql } from "@/lib/db";
import { PLAN_CREDITS, planFromVariant, variantMappingConfigured, type PlanId } from "@/lib/plans";

function verifySignature(rawBody: string, signature: string | null, secret: string): boolean {
  if (!signature) return false;
  const expected = Buffer.from(crypto.createHmac("sha256", secret).update(rawBody).digest("hex"), "utf8");
  const received = Buffer.from(signature, "utf8");
  // timingSafeEqual throws on different lengths, so compare lengths first
  return expected.length === received.length && crypto.timingSafeEqual(expected, received);
}

async function findUserId(customUserId: unknown, subscriptionId: string | null): Promise<string | null> {
  if (typeof customUserId === "string" && customUserId) return customUserId;
  if (subscriptionId) {
    const rows = (await sql`SELECT id FROM users WHERE subscription_id = ${subscriptionId} LIMIT 1`) as { id: string }[];
    if (rows.length > 0) return rows[0].id;
  }
  return null;
}

export async function POST(req: Request) {
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;
  if (!secret) {
    console.error("LEMON_SQUEEZY_WEBHOOK_SECRET is not set");
    return new NextResponse("Webhook not configured.", { status: 500 });
  }

  const rawBody = await req.text();
  const signature = (await headers()).get("x-signature");
  if (!verifySignature(rawBody, signature, secret)) {
    return new NextResponse("Invalid signature.", { status: 400 });
  }

  let payload: any;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return new NextResponse("Invalid JSON.", { status: 400 });
  }

  const eventName: string = payload?.meta?.event_name ?? "";
  const customData = payload?.meta?.custom_data ?? {};
  const data = payload?.data ?? {};
  const attrs = data.attributes ?? {};

  // Subscription events carry the subscription id in data.id; invoice events in attributes.subscription_id.
  const subscriptionId: string | null =
    eventName.startsWith("subscription_payment_") ? (attrs.subscription_id != null ? String(attrs.subscription_id) : null)
    : eventName.startsWith("subscription_") ? (data.id != null ? String(data.id) : null)
    : null;
  const customerId: string | null = attrs.customer_id != null ? String(attrs.customer_id) : null;
  const variantId: string | null =
    attrs.variant_id != null ? String(attrs.variant_id)
    : attrs.first_order_item?.variant_id != null ? String(attrs.first_order_item.variant_id)
    : null;

  try {
    const userId = await findUserId(customData.user_id, subscriptionId);
    if (!userId) {
      console.error(`LS webhook ${eventName}: no user_id in custom_data and no user with this subscription`);
      return new NextResponse("User not found, ignoring.", { status: 200 });
    }

    switch (eventName) {
      case "order_created":
      case "subscription_created": {
        // The variant ID decides the plan. custom_data.plan is user-editable in a buy link,
        // so it is only a fallback while the variant env vars are not configured.
        let plan: PlanId | null = planFromVariant(variantId);
        if (!plan && !variantMappingConfigured && (customData.plan === "pro" || customData.plan === "teams")) {
          console.warn("LEMON_PRO_VARIANT_ID / LEMON_TEAMS_VARIANT_ID not set: trusting custom_data.plan");
          plan = customData.plan;
        }
        if (!plan) {
          console.error(`LS webhook ${eventName}: variant ${variantId} is not a known plan`);
          return new NextResponse("Unknown variant, ignoring.", { status: 200 });
        }

        // Credits are (re)set only when the plan or subscription actually changes, so a retried delivery is harmless.
        await sql`
          UPDATE users SET
            "computeCredits" = CASE
              WHEN plan <> ${plan}
                OR (${subscriptionId}::varchar IS NOT NULL AND subscription_id IS DISTINCT FROM ${subscriptionId}::varchar)
              THEN ${PLAN_CREDITS[plan]}::int ELSE "computeCredits" END,
            plan = ${plan},
            customer_id = COALESCE(${customerId}::varchar, customer_id),
            subscription_id = COALESCE(${subscriptionId}::varchar, subscription_id),
            variant_id = COALESCE(${variantId}::varchar, variant_id),
            subscription_status = COALESCE(${attrs.status ?? null}::varchar, subscription_status),
            subscription_ends_at = NULL,
            billing_cycle_start = now(),
            updated_at = now()
          WHERE id = ${userId}`;
        break;
      }

      case "subscription_updated":
      case "subscription_resumed":
      case "subscription_unpaused": {
        const status: string | null = attrs.status ?? null;
        if (status === "expired") {
          await downgrade(userId);
          break;
        }
        const plan = planFromVariant(variantId);
        await sql`
          UPDATE users SET
            "computeCredits" = CASE WHEN ${plan}::varchar IS NOT NULL AND plan <> ${plan}::varchar
                               THEN ${plan ? PLAN_CREDITS[plan] : 0}::int ELSE "computeCredits" END,
            plan = COALESCE(${plan}::varchar, plan),
            variant_id = COALESCE(${variantId}::varchar, variant_id),
            subscription_status = COALESCE(${status}::varchar, subscription_status),
            subscription_ends_at = ${attrs.ends_at ?? null}::timestamptz,
            updated_at = now()
          WHERE id = ${userId}`;
        break;
      }

      case "subscription_cancelled": {
        // Cancelled = will not renew. They keep access until ends_at; "subscription_expired" removes it.
        await sql`
          UPDATE users SET
            subscription_status = 'cancelled',
            subscription_ends_at = ${attrs.ends_at ?? null}::timestamptz,
            updated_at = now()
          WHERE id = ${userId}`;
        break;
      }

      case "subscription_expired":
        await downgrade(userId);
        break;

      case "subscription_payment_success": {
        // New billing period: refill credits for whatever plan the user is on.
        if (attrs.billing_reason === "renewal") {
          await sql`
            UPDATE users SET
              "computeCredits" = CASE plan WHEN 'teams' THEN ${PLAN_CREDITS.teams}::int
                                           WHEN 'pro'   THEN ${PLAN_CREDITS.pro}::int
                                           ELSE "computeCredits" END,
              billing_cycle_start = now(),
              updated_at = now()
            WHERE id = ${userId}`;
        }
        break;
      }

      default:
        break; // events we do not act on: still acknowledge them
    }

    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    // 500 makes Lemon Squeezy retry the delivery
    console.error(`LS webhook ${eventName} failed:`, error);
    return new NextResponse("Webhook processing failed.", { status: 500 });
  }
}

async function downgrade(userId: string) {
  await sql`
    UPDATE users SET
      plan = 'hobby',
      "computeCredits" = ${PLAN_CREDITS.hobby}::int,
      variant_id = NULL,
      subscription_status = 'expired',
      subscription_ends_at = NULL,
      updated_at = now()
    WHERE id = ${userId}`;
}
