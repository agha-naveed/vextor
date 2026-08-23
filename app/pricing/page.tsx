"use client"
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PricingPage() {
    const { user, isLoaded } = useUser();
  const router = useRouter();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleUpgrade = async (planId: string) => {
    // 1. If not logged in, send them to login!
    if (isLoaded && !user) {
      router.push(`/login?redirect_url=/pricing`);
      return;
    }

    setLoadingPlan(planId);

    try {
      // 2. Call your Next.js backend to generate a checkout link
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId }),
      });

      const data = await res.json();

      // 3. Send the user to the secure payment page!
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      setLoadingPlan(null);
    }
  };

  return (
    <main className="min-h-screen bg-black text-neutral-200 antialiased selection:bg-neutral-800 selection:text-white pb-28">
      {/* Subtle structural grid line on top */}
      <div className="w-full border-b border-neutral-900" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-20">
        
        {/* Header */}
        <div className="mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
            // Plans & Compute
          </span>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mt-2">
            Predictable pricing for developers.
          </h1>
          <p className="text-neutral-400 text-sm mt-2 max-w-lg">
            Choose how you want to build. Upgrade, downgrade, or cancel anytime.
          </p>
        </div>

        {/* Unified Bounded Container */}
        <div className="rounded-xl border border-neutral-800 bg-[#0a0a0a] overflow-hidden grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-neutral-800">
          
          {/* 1. Hobby */}
          <div className="p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg text-white">Hobby</h2>
                <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 border border-neutral-800 px-2 py-0.5 rounded">
                  Free
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-2 min-h-[32px]">
                For tinkerers exploring the editor.
              </p>

              <div className="mt-8 pb-8 border-b border-neutral-900">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-mono font-medium text-white">$0</span>
                </div>
                <p className="font-mono text-xs text-neutral-500 mt-1">forever</p>
              </div>

              <div className="mt-8 space-y-3">
                <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                  Included capabilities
                </p>
                <ul className="space-y-2.5 text-xs text-neutral-300">
                  <li className="flex items-start gap-2.5">
                    <span className="text-neutral-600 select-none">—</span>
                    <span>Core editor & local autocomplete</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-neutral-600 select-none">—</span>
                    <span>Powered by free API keys (subject to rate limits)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-neutral-600 select-none">—</span>
                    <span>Single-file edits</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-neutral-600 select-none">—</span>
                    <span>Community support</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12">
              <Link
                href="/dashboard"
                className="w-full block text-center py-2.5 px-4 rounded-md border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-850 hover:border-neutral-700 text-xs font-medium text-neutral-300 transition"
              >
                Get started
              </Link>
            </div>
          </div>

          {/* 2. Pro */}
          <div className="p-8 flex flex-col justify-between bg-[#0e0e0e] relative">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg text-white">Pro</h2>
                <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-300 bg-white/10 px-2 py-0.5 rounded">
                  Most popular
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-2 min-h-[32px]">
                For engineers shipping daily who need advanced agentic power.
              </p>

              <div className="mt-8 pb-8 border-b border-neutral-800">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-mono font-medium text-white">$20</span>
                  <span className="font-mono text-xs text-neutral-400">/mo</span>
                </div>
                <p className="font-mono text-xs text-neutral-500 mt-1">billed monthly</p>
              </div>

              <div className="mt-8 space-y-3">
                <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-400">
                  Everything in Hobby, plus
                </p>
                <ul className="space-y-2.5 text-xs text-neutral-200">
                  <li className="flex items-start gap-2.5">
                    <span className="text-white select-none">+</span>
                    <span>Extended request limits with zero throttling</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-white select-none">+</span>
                    <span>Access to well-trained, high-performance AI models</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-white select-none">+</span>
                    <span>Multi-file auto-handling & smart refactoring</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-white select-none">+</span>
                    <span>Full repository semantic indexing</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12">
              <button
                onClick={() => handleUpgrade("pro")}
                disabled={loadingPlan === "pro"}
                className="w-full py-2.5 px-4 rounded-md bg-white hover:bg-neutral-200 text-black text-xs font-semibold tracking-tight transition cursor-pointer disabled:opacity-50"
              >
                {loadingPlan === "pro" ? "Loading..." : "Start Pro trial"}
              </button>
            </div>
          </div>

          {/* 3. Teams */}
          <div className="p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg text-white">Teams</h2>
                <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 border border-neutral-800 px-2 py-0.5 rounded">
                  Scale
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-2 min-h-[32px]">
                For organizations that build and ship together.
              </p>

              <div className="mt-8 pb-8 border-b border-neutral-900">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-mono font-medium text-white">$40</span>
                  <span className="font-mono text-xs text-neutral-400">/user/mo</span>
                </div>
                <p className="font-mono text-xs text-neutral-500 mt-1">billed annually</p>
              </div>

              <div className="mt-8 space-y-3">
                <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                  Everything in Pro, plus
                </p>
                <ul className="space-y-2.5 text-xs text-neutral-300">
                  <li className="flex items-start gap-2.5">
                    <span className="text-neutral-500 select-none">+</span>
                    <span>Centralized team billing and administration</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-neutral-500 select-none">+</span>
                    <span>Usage analytics and audit logs</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12">
              <button
                className="w-full py-2.5 px-4 rounded-md border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-850 hover:border-neutral-700 text-xs font-medium text-neutral-300 transition cursor-pointer"
              >
                Get Teams
              </button>
            </div>
          </div>

        </div>

        {/* Minimalist Footer Note */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-neutral-500 font-mono gap-4">
          <p>Local offline models remain unrestricted on all tiers.</p>
          <p>Need custom infrastructure? <span className="text-neutral-300 underline cursor-pointer">Contact sales</span></p>
        </div>

      </div>
    </main>
  );
}