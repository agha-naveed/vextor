import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { sql } from "@/lib/db";
import { ensureUserRecord } from "@/lib/ensureUser";
import { PLAN_CREDITS, type PlanId } from "@/lib/plans";
import { isDemoBillingServer } from "@/lib/demo";

// Demo-only: upgrades (or resets) the signed-in user's plan with no real payment.
// Disabled with a 404 unless DEMO_BILLING=true on the server.
export async function POST(req: Request) {
  if (!isDemoBillingServer) {
    return new NextResponse("Not found", { status: 404 });
  }

  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  let body: { plan?: string } = {};
  try {
    body = await req.json();
  } catch {
    return new NextResponse("Invalid JSON", { status: 400 });
  }

  const plan = body.plan;
  if (plan !== "pro" && plan !== "teams" && plan !== "hobby") {
    return new NextResponse("Unknown plan", { status: 400 });
  }
  const planId = plan as PlanId;

  try {
    // Make sure the users row exists (the Clerk webhook may not have run in a local demo)
    await ensureUserRecord(sql as unknown as Parameters<typeof ensureUserRecord>[0]);

    if (planId === "hobby") {
      // Demo "cancel": back to the free plan
      await sql`
        UPDATE users SET
          plan = 'hobby',
          "computeCredits" = ${PLAN_CREDITS.hobby}::int,
          variant_id = NULL,
          subscription_status = 'expired',
          subscription_ends_at = NULL,
          updated_at = now()
        WHERE id = ${userId}`;
    } else {
      const fakeCustomer = `demo_cus_${userId.slice(-8)}`;
      const fakeSub = `demo_sub_${Date.now()}`;
      await sql`
        UPDATE users SET
          plan = ${planId},
          "computeCredits" = ${PLAN_CREDITS[planId]}::int,
          customer_id = ${fakeCustomer},
          subscription_id = ${fakeSub},
          variant_id = ${"demo_" + planId},
          subscription_status = 'active',
          subscription_ends_at = NULL,
          billing_cycle_start = now(),
          updated_at = now()
        WHERE id = ${userId}`;
    }

    return NextResponse.json({ ok: true, plan: planId });
  } catch (error) {
    console.error("[DEMO_UPGRADE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
