import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
    try {
        const { userId }: any = auth();
        const user = await currentUser();

        if (!userId || !user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { plan } = body; // 'pro' or 'teams'

        // Map your internal plan names to your Lemon Squeezy Variant IDs
        // You get these IDs from your Lemon Squeezy dashboard under your Product Variants
        const variantId = plan === "teams" ? process.env.LEMON_TEAMS_VARIANT_ID : process.env.LEMON_PRO_VARIANT_ID;

        // Call the Lemon Squeezy API to create a checkout
        const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
            method: "POST",
            headers: {
                "Accept": "application/vnd.api+json",
                "Content-Type": "application/vnd.api+json",
                "Authorization": `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
            },
            body: JSON.stringify({
                data: {
                    type: "checkouts",
                    attributes: {
                        checkout_data: {
                            email: user.emailAddresses[0].emailAddress,
                            name: user.firstName || "Developer",
                            // 🚀 Pass the Vextor user ID here so the webhook can read it!
                            custom: {
                                user_id: userId,
                                plan: plan,
                            },
                        },
                        product_options: {
                            redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?upgrade=success`,
                        },
                    },
                    relationships: {
                        store: {
                            data: {
                                type: "stores",
                                id: process.env.LEMONSQUEEZY_STORE_ID,
                            },
                        },
                        variant: {
                            data: {
                                type: "variants",
                                id: variantId,
                            },
                        },
                    },
                },
            }),
        });

        const checkoutData = await response.json();

        if (checkoutData.errors) {
            console.error("Lemon Squeezy API Error:", checkoutData.errors);
            return new NextResponse("Checkout creation failed", { status: 500 });
        }

        // Send the secure checkout URL back to the frontend button
        return NextResponse.json({ url: checkoutData.data.attributes.url });

    } catch (error) {
        console.error("[CHECKOUT_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}