"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCheck, FaShieldHalved } from "react-icons/fa6";

const planDetails: Record<string, { name: string; price: string; cycle: string; variantUrl: string }> = {
    pro: {
        name: "Pro Plan",
        price: "$20",
        cycle: "billed monthly",
        variantUrl: process.env.NEXT_PUBLIC_LS_PRO_URL || "https://vextor.lemonsqueezy.com/checkout/buy/YOUR_PRO_VARIANT"
    },
    teams: {
        name: "Teams Plan",
        price: "$480",
        cycle: "billed annually ($40/mo)",
        variantUrl: process.env.NEXT_PUBLIC_LS_TEAMS_URL || "https://vextor.lemonsqueezy.com/checkout/buy/YOUR_TEAMS_VARIANT"
    }
};

export default function CheckoutDetailsPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const planKey = searchParams.get("plan") || "pro";
    const plan = planDetails[planKey] || planDetails.pro;

    // Load user session from your auth system
    // const { user } = useSession();
    const user = { id: "user_12345", email: "user@example.com", name: "Developer" };

    // Load Lemon.js script for modal checkout
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://assets.lemonsqueezy.com/lemon.js";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            // @ts-ignore
            if (window.createLemonSqueezy) window.createLemonSqueezy();
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleProceedToPayment = () => {
        // Attach the authenticated user ID and pre-fill their email
        const finalUrl = `${plan.variantUrl}?custom[user_id]=${user.id}&checkout[email]=${encodeURIComponent(user.email)}`;

        // @ts-ignore
        if (window.LemonSqueezy) {
            // @ts-ignore
            window.LemonSqueezy.Url.Open(finalUrl);
        } else {
            window.location.href = finalUrl;
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-20 px-6">
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">Review Your Order</h1>
            <p className="text-neutral-500 text-sm mb-8">Confirm your account and subscription details before checkout.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Account Details Box */}
                <div className="p-6 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/[0.02]">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">Account Information</h2>
                    <div className="space-y-3 text-sm">
                        <div>
                            <span className="text-neutral-500 block text-xs">Name</span>
                            <span className="font-medium text-neutral-900 dark:text-white">{user.name}</span>
                        </div>
                        <div>
                            <span className="text-neutral-500 block text-xs">Email</span>
                            <span className="font-medium text-neutral-900 dark:text-white">{user.email}</span>
                        </div>
                        <div>
                            <span className="text-neutral-500 block text-xs">User ID</span>
                            <span className="font-mono text-xs text-neutral-400">{user.id}</span>
                        </div>
                    </div>
                </div>

                {/* Plan Summary Box */}
                <div className="p-6 rounded-2xl border border-primary/30 bg-primary/5 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-baseline mb-2">
                            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{plan.name}</h3>
                            <span className="text-2xl font-black text-primary">{plan.price}</span>
                        </div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6">{plan.cycle}</p>

                        <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-300">
                            <li className="flex items-center gap-2">
                                <FaCheck className="text-primary w-3.5 h-3.5" />
                                <span>500 Fast Requests per month</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <FaCheck className="text-primary w-3.5 h-3.5" />
                                <span>Multi-file agentic editing</span>
                            </li>
                        </ul>
                    </div>

                    <button
                        onClick={handleProceedToPayment}
                        className="mt-8 w-full py-3.5 bg-primary hover:opacity-90 text-white font-bold rounded-xl shadow-[0_0_20px_var(--color-primary)] transition"
                    >
                        Proceed to Payment
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-center gap-2 mt-8 text-xs text-neutral-500">
                <FaShieldHalved className="w-4 h-4" />
                <span>Encrypted 256-bit checkout powered by Lemon Squeezy</span>
            </div>
        </div>
    );
}