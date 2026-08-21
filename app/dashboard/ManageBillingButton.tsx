"use client";

import { useState } from "react";

export default function ManageBillingButton() {
    const [loading, setLoading] = useState(false);

    const handleManageBilling = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/billing');
            const data = await res.json();
            
            if (data.url) {
                // Redirect securely to the Lemon Squeezy hosted portal
                window.location.href = data.url;
            } else {
                alert(data.error || "Failed to load billing portal. Please contact support.");
                setLoading(false);
            }
        } catch (error) {
            console.error("Billing portal error:", error);
            alert("Something went wrong while connecting to the billing provider.");
            setLoading(false);
        }
    };

    return (
        <button 
            onClick={handleManageBilling}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-neutral-100 dark:bg-white/5 text-neutral-900 dark:text-white font-bold text-sm border border-transparent dark:border-white/10 hover:bg-neutral-200 dark:hover:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
        >
            {loading ? (
                <>
                    <div className="w-4 h-4 border-2 border-neutral-900 dark:border-white border-t-transparent rounded-full animate-spin"></div>
                    Loading Portal...
                </>
            ) : (
                "Manage Billing"
            )}
        </button>
    );
}