"use client";

import { LuTerminal, LuShieldCheck, LuCpu, LuArrowUpRight } from 'react-icons/lu';

const features = [
    {
        number: "01",
        icon: LuTerminal,
        title: "Natural Language Terminal",
        description: "Type intent in plain English. The AI instantly translates it into exact shell syntax and pipes it through our optimized system backend without context loss."
    },
    {
        number: "02",
        icon: LuCpu,
        title: "Native AST Engine",
        description: "Background parsing offloaded to an optimized memory binary. Enjoy sub-millisecond autocomplete with zero UI frame drops on massive workspaces."
    },
    {
        number: "03",
        icon: LuShieldCheck,
        title: "Deterministic Guardrails",
        description: "Active application-layer interceptors block dangerous commands, tied directly into your custom .vextorignore rules for total workspace privacy."
    }
];

export default function FeaturesGrid() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-32 relative isolate">
            
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[300px] bg-primary/10 dark:bg-primary/5 blur-[150px] rounded-full pointer-events-none -z-10" />

            {/* Section Header */}
            <div className="max-w-2xl mb-20">
                <span className="text-xs font-mono font-bold text-primary uppercase tracking-[0.3em] block mb-4">
                    Architecture & Capabilities
                </span>
                <h2 className="text-4xl md:text-6xl font-extrabold text-neutral-900 dark:text-white tracking-tighter leading-none mb-6">
                    Designed for velocity.
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg leading-relaxed">
                    Built from scratch to handle heavy workloads, maintain absolute local privacy, and keep you entirely in the flow state.
                </p>
            </div>

            {/* Three-Column Editorial Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {features.map((feat, index) => (
                    <div 
                        key={index}
                        className="group relative p-8 md:p-10 rounded-3xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/[0.02] hover:border-primary/50 transition-all duration-500 flex flex-col justify-between shadow-sm hover:shadow-xl dark:shadow-none"
                    >
                        <div>
                            <div className="flex items-center justify-between mb-12">
                                <span className="text-4xl font-mono font-bold text-neutral-300 dark:text-neutral-700 group-hover:text-primary transition-colors duration-300">
                                    {feat.number}
                                </span>
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                                    <feat.icon className="w-6 h-6" />
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight mb-4">
                                {feat.title}
                            </h3>
                            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                                {feat.description}
                            </p>
                        </div>

                        <div className="pt-8 mt-12 border-t border-neutral-100 dark:border-white/5 flex items-center justify-between text-xs font-mono text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                            <span>SYSTEM MODULE</span>
                            <LuArrowUpRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Full-Width Highlight Banner */}
            <div className="relative p-8 md:p-12 rounded-3xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.01] flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden">
                <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
                
                <div className="relative z-10 max-w-xl">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-primary font-bold mb-2 block">
                        LOCAL-FIRST ASSURANCE
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
                        Your code never leaves your machine unless you choose to share it.
                    </h3>
                </div>

                <div className="relative z-10 flex items-center gap-4 shrink-0">
                    <div className="px-5 py-3 rounded-xl bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-xs font-mono text-neutral-700 dark:text-neutral-300 shadow-sm">
                        Zero Telemetry Leakage
                    </div>
                </div>
            </div>

        </section>
    );
}