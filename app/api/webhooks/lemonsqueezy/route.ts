import { NextResponse } from "next/server";
import crypto from "crypto";
import { sql } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET!;
        
        // 1. Get the raw body text and signature
        const text = await req.text();
        const signature = req.headers.get("x-signature") || "";

        // 2. Cryptographically verify the request came from Lemon Squeezy
        const hmac = crypto.createHmac("sha256", secret);
        const digest = Buffer.from(hmac.update(text).digest("hex"), "utf8");
        const signatureBuffer = Buffer.from(signature, "utf8");

        if (digest.length !== signatureBuffer.length || !crypto.timingSafeEqual(digest, signatureBuffer)) {
            console.error("🚨 Invalid Lemon Squeezy Signature");
            return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
        }

        // 3. Parse the event data
        const payload = JSON.parse(text);
        const eventName = payload.meta.event_name;
        
        // This is the user ID we passed in the Frontend URL
        const userId = payload.meta.custom_data?.user_id;

        if (!userId) {
            console.warn("⚠️ Webhook fired without a custom user_id attached.");
            return NextResponse.json({ received: true });
        }

        // 4. Handle Subscription Upgrades & Monthly Renewals
        if (eventName === 'subscription_created' || eventName === 'subscription_updated') {
            const attributes = payload.data.attributes;
            const variantId = attributes.variant_id.toString();
            const status = attributes.status; 

            // Only refill credits and upgrade if the subscription is in good standing
            if (status === "active") {
                let newPlan = "hobby"; 
                let newCredits = 1000; 

                // Identify which tier they purchased
                if (variantId === process.env.LS_PRO_VARIANT_ID) {
                    newPlan = "pro";
                    newCredits = 50000; 
                }
                if (variantId === process.env.LS_TEAMS_VARIANT_ID) {
                    newPlan = "teams";
                    newCredits = 500000; 
                }

                // Execute Database Update
                await sql`
                    UPDATE users 
                    SET plan = ${newPlan}, 
                        subscription_id = ${payload.data.id},
                        variant_id = ${variantId},
                        compute_credits = ${newCredits},
                        updated_at = now()
                    WHERE id = ${userId}
                `;
            }
        }

        // 5. Handle True Expirations (Downgrade to Free Tier)
        // We only trigger this when the paid time is completely over.
        if (eventName === 'subscription_expired') {
            await sql`
                UPDATE users 
                SET plan = 'hobby',
                    subscription_id = NULL,
                    variant_id = NULL,
                    compute_credits = 1000, 
                    updated_at = now()
                WHERE id = ${userId}
            `;
        }

        return NextResponse.json({ received: true }, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        });

    } catch (error: any) {
        console.error("🔥 Lemon Squeezy Webhook Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}