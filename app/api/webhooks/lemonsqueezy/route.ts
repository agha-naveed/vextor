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
        
        // 🚀 This is the user ID we passed in the Frontend URL!
        const userId = payload.meta.custom_data?.user_id;

        if (!userId) {
            console.warn("⚠️ Webhook fired without a custom user_id attached.");
            return NextResponse.json({ received: true });
        }

        // 4. Handle Subscription Logic
        // For a successful new subscription
        if (eventName === 'subscription_created' || eventName === 'subscription_updated') {
            // 🚀 Here is where variantId is declared!
            const variantId = payload.data.attributes.variant_id.toString();

            // 🚀 Here is where newPlan is declared!
            let newPlan = "hobby"; 
            if (status === "active") {
                // Compare against your env variables to see which plan they bought
                if (variantId === process.env.LS_PRO_VARIANT_ID) newPlan = "pro";
                if (variantId === process.env.LS_TEAMS_VARIANT_ID) newPlan = "teams";
            }
            
            await sql`
                UPDATE users 
                SET plan = ${newPlan}, 
                    subscription_id = ${payload.data.id},
                    variant_id = ${variantId},
                    updated_at = now()
                WHERE id = ${userId}
            `;
        }

        // For a cancellation
        if (eventName === 'subscription_cancelled' || eventName === 'subscription_expired') {
            await sql`
                UPDATE users 
                SET plan = 'hobby',
                    subscription_id = NULL,
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