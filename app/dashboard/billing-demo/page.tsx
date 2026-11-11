import { currentUser } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { sql } from "@/lib/db";
import { isDemoBillingServer } from "@/lib/demo";
import DemoBillingActions from "./DemoBillingActions";

export const dynamic = "force-dynamic";

// Stand-in for the Lemon Squeezy customer portal, used only in demo mode.
export default async function BillingDemoPage() {
    if (!isDemoBillingServer) notFound();

    const user = await currentUser();
    if (!user) redirect("/login");

    const rows = await sql`SELECT plan, subscription_status FROM users WHERE id = ${user.id} LIMIT 1`;
    const plan = (rows[0]?.plan as string) || "hobby";
    const status = (rows[0]?.subscription_status as string) || "none";

    return (
        <main className="min-h-screen bg-neutral-50 dark:bg-[#06070a] p-6 sm:p-12">
            <div className="max-w-xl mx-auto rounded-3xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-8">
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500 mb-2">Demo billing portal</p>
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Manage subscription</h1>
                <dl className="text-sm space-y-2 mb-8">
                    <div className="flex justify-between"><dt className="text-neutral-500">Plan</dt><dd className="font-medium capitalize text-neutral-900 dark:text-white">{plan}</dd></div>
                    <div className="flex justify-between"><dt className="text-neutral-500">Status</dt><dd className="font-medium capitalize text-neutral-900 dark:text-white">{status}</dd></div>
                    <div className="flex justify-between"><dt className="text-neutral-500">Payment method</dt><dd className="font-medium text-neutral-900 dark:text-white">Visa ending 4242</dd></div>
                </dl>
                <DemoBillingActions plan={plan} />
                <Link href="/dashboard" className="block text-center text-xs text-neutral-500 mt-6 hover:underline">Back to dashboard</Link>
            </div>
        </main>
    );
}
