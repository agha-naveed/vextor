"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DemoBillingActions({ plan }: { plan: string }) {
    const router = useRouter();
    const [busy, setBusy] = useState(false);

    const change = async (target: "hobby" | "pro" | "teams") => {
        setBusy(true);
        try {
            const res = await fetch("/api/demo-upgrade", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ plan: target }),
            });
            if (!res.ok) throw new Error(await res.text());
            router.push("/dashboard");
            router.refresh();
        } catch {
            alert("Demo plan change failed.");
            setBusy(false);
        }
    };

    const btn = "w-full py-3 rounded-xl font-bold text-sm border border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-white/10 transition disabled:opacity-50";

    return (
        <div className="space-y-3">
            {plan !== "teams" && <button disabled={busy} onClick={() => change("teams")} className={btn}>Switch to Teams</button>}
            {plan !== "pro" && plan !== "hobby" && <button disabled={busy} onClick={() => change("pro")} className={btn}>Switch to Pro</button>}
            {plan !== "hobby" && <button disabled={busy} onClick={() => change("hobby")} className={btn + " text-red-500"}>Cancel subscription (back to Hobby)</button>}
        </div>
    );
}
