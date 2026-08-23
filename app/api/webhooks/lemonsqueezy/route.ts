import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import crypto from "crypto";

export async function POST(req: Request) {
    try {
        // 1. Get the raw text body and the signature header
        const rawBody = await req.text();
        const signature = (await headers()).get("x-signature") as string;
        const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET!;

        // 2. Verify the signature to ensure it's actually from Lemon Squeezy
        const hmac = crypto.createHmac("sha256", secret);
        const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
        const signatureBuffer = Buffer.from(signature, "utf8");

        if (!crypto.timingSafeEqual(digest, signatureBuffer)) {
            return new NextResponse("Invalid signature.", { status: 400 });
        }

        // 3. Parse the verified payload
        const data = JSON.parse(rawBody);
        const eventName = data.meta.event_name;
        
        // 🚀 Extract the custom data we passed during checkout
        const customData = data.meta.custom_data;
        const userId = customData?.user_id;
        const plan = customData?.plan || 'pro';

        // 4. Handle successful subscription creation
        if (eventName === "subscription_created" || eventName === "order_created") {
            if (userId) {
                // Determine compute credits based on plan
                const computeCredits = plan === 'teams' ? 50000 : 10000;

                // Update Neon Database
                await sql`
                    UPDATE users 
                    SET 
                        plan = ${plan}, 
                        "computeCredits" = ${computeCredits}, 
                        updated_at = now()
                    WHERE id = ${userId};
                `;
                
                console.log(`Successfully upgraded user ${userId} to ${plan} via Lemon Squeezy`);
            }
        }

        // Return a 200 OK so Lemon Squeezy knows it was received
        return new NextResponse("OK", { status: 200 });

    } catch (error) {
        console.error("Webhook Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}