"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaCheck } from "react-icons/fa6";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const plans = [
    {
        name: "Hobby",
        desc: "For tinkerers exploring the editor.",
        price: "$0",
        cycle: "forever",
        features: [
            "Core editor & local autocomplete",
            "Powered by free API keys (subject to rate limits)",
            "Single-file edits",
            "Community support"
        ],
        btnText: "Get started",
        featured: false
    },
    {
        name: "Pro",
        badge: "Most popular",
        desc: "For engineers shipping daily who need advanced agentic power.",
        price: "$20",
        span: "/mo",
        cycle: "billed monthly",
        features: [
            "Everything in Hobby, plus:",
            "Extended request limits with zero throttling",
            "Access to well-trained, high-performance AI models",
            "Multi-file auto-handling & smart refactoring",
            "Full repository semantic indexing"
        ],
        btnText: "Start Pro trial",
        featured: true
    },
    {
        name: "Teams",
        desc: "For organizations that build and ship together.",
        price: "$40",
        span: "/user/mo",
        cycle: "billed annually",
        features: [
            "Everything in Pro, plus:",
            "Centralized team billing and administration",
            "Usage analytics and audit logs"
        ],
        btnText: "Get Teams",
        featured: false
    }
];

export default function Pricing() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!sectionRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
            }
        });

        tl.from(".pricing-header", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        })
        .from(".pricing-card", {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out"
        }, "-=0.4");

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} id="pricing" className="relative max-w-7xl mx-auto px-6 py-32 isolate">
            
            <div className="pricing-header text-center mb-20">
                <h2 className="text-xs font-black text-primary tracking-[0.4em] uppercase mb-4">
                    Pricing
                </h2>
                <p className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tighter mb-6">
                    Start free. Scale when your workflow demands it.
                </p>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                    Choose the plan that fits your coding velocity. Upgrade anytime for higher limits and multi-file intelligence.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 items-stretch">
                {plans.map((plan, i) => (
                    <div 
                        key={i} 
                        className={`pricing-card relative flex flex-col p-8 rounded-3xl border transition-colors duration-500
                            ${plan.featured 
                                ? "border-primary bg-gradient-to-b from-primary/5 to-white dark:to-white/[0.02] shadow-2xl shadow-primary/10 md:-translate-y-4" 
                                : "border-neutral-200 dark:border-white/10 bg-white dark:bg-white/[0.02]"
                            }
                        `}
                    >
                        {plan.badge && (
                            <div className="absolute -top-3 left-8 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-[0_0_10px_var(--color-primary)]">
                                {plan.badge}
                            </div>
                        )}

                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">{plan.name}</h3>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 h-10">{plan.desc}</p>
                        </div>

                        <div className="mb-8">
                            <div className="flex items-baseline gap-1">
                                <span className="text-5xl font-bold text-neutral-900 dark:text-white tracking-tighter">{plan.price}</span>
                                {plan.span && <span className="text-sm font-medium text-neutral-500">{plan.span}</span>}
                            </div>
                            <p className="text-xs text-neutral-500 mt-2">{plan.cycle}</p>
                        </div>

                        <ul className="flex flex-col gap-4 mb-10 flex-1">
                            {plan.features.map((feat, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-300">
                                    <FaCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                    <span>{feat}</span>
                                </li>
                            ))}
                        </ul>

                        <button 
                            className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer
                                ${plan.featured 
                                    ? "bg-primary hover:opacity-90 text-white shadow-[0_0_20px_var(--color-primary)]" 
                                    : "bg-neutral-100 hover:bg-neutral-200 dark:bg-white/5 dark:hover:bg-white/10 text-neutral-900 dark:text-white border border-transparent dark:border-white/10"
                                }
                            `}
                        >
                            {plan.btnText}
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}