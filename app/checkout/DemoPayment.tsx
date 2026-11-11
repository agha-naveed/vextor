"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Demo-only payment form. Pre-filled with Stripe-style test data; nothing is charged
// and nothing is sent to Lemon Squeezy. Shown only when NEXT_PUBLIC_DEMO_BILLING=true.
export default function DemoPayment({ plan, price }: { plan: "pro" | "teams"; price: string }) {
    const router = useRouter();
    const [card, setCard] = useState("4242 4242 4242 4242");
    const [expiry, setExpiry] = useState("12/30");
    const [cvc, setCvc] = useState("123");
    const [status, setStatus] = useState<"idle" | "processing" | "error">("idle");
    const [error, setError] = useState("");

    const inputClass =
        "w-full px-3 py-2.5 rounded-lg border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm text-neutral-900 dark:text-white outline-none focus:border-primary";

    const handlePay = async () => {
        setStatus("processing");
        setError("");
        try {
            // Fake a short payment delay so the demo feels real
            await new Promise((r) => setTimeout(r, 1500));
            const res = await fetch("/api/demo-upgrade", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ plan }),
            });
            if (!res.ok) throw new Error(await res.text());
            router.push("/dashboard?upgrade=success");
            router.refresh();
        } catch (e) {
            setStatus("error");
            setError(e instanceof Error ? e.message : "Upgrade failed");
        }
    };

    return (
        <div className="mt-6 space-y-3">
            <div className="text-[10px] font-bold uppercase tracking-widest text-amber-500">
                Demo mode: test card, no real charge
            </div>
            <input className={inputClass} value={card} onChange={(e) => setCard(e.target.value)} placeholder="Card number" />
            <div className="grid grid-cols-2 gap-3">
                <input className={inputClass} value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/YY" />
                <input className={inputClass} value={cvc} onChange={(e) => setCvc(e.target.value)} placeholder="CVC" />
            </div>
            <button
                onClick={handlePay}
                disabled={status === "processing"}
                className="w-full py-3.5 bg-primary hover:opacity-90 text-white font-bold rounded-xl shadow-[0_0_20px_var(--color-primary)] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {status === "processing" ? "Processing payment..." : `Pay ${price} (demo)`}
            </button>
            {status === "error" && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
}
