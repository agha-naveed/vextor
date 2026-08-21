import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { sql } from "@/lib/db";

export async function GET() {
    try {
        const user = await currentUser();
        
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Fetch the user's Lemon Squeezy Customer ID from your database
        const dbResult = await sql`
            SELECT customer_id FROM users WHERE id = ${user.id} LIMIT 1
        `;

        const customerId = dbResult[0]?.customer_id;

        if (!customerId) {
            return NextResponse.json({ error: "No billing record found." }, { status: 404 });
        }

        // Request a secure portal link directly from Lemon Squeezy
        const response = await fetch(`https://api.lemonsqueezy.com/v1/customers/${customerId}`, {
            headers: {
                'Accept': 'application/vnd.api+json',
                'Authorization': `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`
            }
        });

        const data = await response.json();
        
        // The secure portal link provided by Lemon Squeezy
        const portalUrl = data.data?.attributes?.urls?.customer_portal;

        if (!portalUrl) {
            throw new Error("Could not generate portal link");
        }

        return NextResponse.json({ url: portalUrl });

    } catch (error) {
        console.error("Billing Portal Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}