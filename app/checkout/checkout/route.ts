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
        const { plan } = body;

        // ========================================================
        // 🚀 HERE IS WHERE YOU CALL STRIPE OR LEMON SQUEEZY
        // ========================================================
        // Example logic:
        // const session = await stripe.checkout.sessions.create({
        //     customer_email: user.emailAddresses[0].emailAddress,
        //     line_items: [{ price: 'price_XXXXXX', quantity: 1 }],
        //     mode: 'subscription',
        //     success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
        //     cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
        //     metadata: { userId: userId, plan: plan } // Pass the ID so the webhook knows who paid!
        // });
        // 
        // return NextResponse.json({ url: session.url });

        // Placeholder response until you pick a provider:
        return NextResponse.json({ url: "/dashboard?placeholder=true" });

    } catch (error) {
        console.log("[CHECKOUT_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}