"use client";

import { FiChevronRight, FiDownloadCloud, FiSettings, FiPlay, FiCpu } from "react-icons/fi";
import { FaApple, FaWindows, FaLinux } from "react-icons/fa";
import Link from "next/link";

export default function GettingStartedPage() {
    return (
        <div className="flex w-full h-full relative">

            {/* Ambient Glow */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/5 blur-[150px] rounded-full pointer-events-none -z-10" />

            {/* MAIN CONTENT */}
            <div className="flex-1 py-10 px-6 lg:px-12 xl:px-20 max-w-4xl mx-auto">

                {/* Section Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4">
                        <span>Introduction</span>
                        <FiChevronRight className="w-4 h-4" />
                        <span className="text-slate-600 dark:text-slate-300">Getting Started</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter mb-6 leading-tight transition-colors">
                        Initializing <br /> Vextor Engine
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-light transition-colors">
                        Welcome to the next generation of local development. Getting Vextor AI running on your machine takes less than two minutes. No cloud APIs, no telemetry, no friction.
                    </p>
                </div>

                {/* Content Blocks */}
                <div className="space-y-16 text-slate-700 dark:text-slate-300 leading-relaxed transition-colors">

                    <section id="prerequisites" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3 transition-colors">
                            <FiSettings className="text-indigo-600 dark:text-indigo-500" />
                            01. System Prerequisites
                        </h2>
                        <p className="mb-6">
                            Because Vextor compiles and runs its concurrent backend locally, you must ensure your machine has the required toolchains installed.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] transition-colors">
                                <div className="text-orange-600 dark:text-orange-400 font-bold mb-1">Rust (Cargo)</div>
                                <div className="text-xs text-slate-500 font-mono">v1.70.0 or higher</div>
                            </div>
                            <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] transition-colors">
                                <div className="text-cyan-600 dark:text-cyan-400 font-bold mb-1">Go Runtime</div>
                                <div className="text-xs text-slate-500 font-mono">v1.21.0 or higher</div>
                            </div>
                            <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] transition-colors">
                                <div className="text-emerald-600 dark:text-emerald-400 font-bold mb-1">Node.js</div>
                                <div className="text-xs text-slate-500 font-mono">v18.0.0 or higher</div>
                            </div>
                        </div>
                    </section>

                    <section id="installation" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3 transition-colors">
                            <FiDownloadCloud className="text-indigo-600 dark:text-indigo-500" />
                            02. Installation
                        </h2>
                        <p className="mb-4">
                            Download the universal installer. This script automatically detects your OS, downloads the pre-compiled binaries, and registers the <code className="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-1.5 py-0.5 rounded font-mono text-sm">vextor</code> command globally.
                        </p>

                        <div className="rounded-xl overflow-hidden bg-slate-900 dark:bg-[#0a0c10] border border-slate-800 dark:border-white/10 mb-8 shadow-2xl transition-colors">
                            <div className="flex items-center px-4 py-3 bg-black/60 border-b border-white/5 gap-4">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                                    <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                                    <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                                </div>
                            </div>
                            <div className="p-5 text-sm font-mono text-slate-300 leading-loose overflow-x-auto">
                                <div className="flex gap-4">
                                    <span className="text-indigo-500 select-none">$</span>
                                    <span>curl -fsSL https://vextor.ai/install.sh | bash</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Pagination */}
                <div className="mt-20 pt-8 border-t border-slate-200 dark:border-white/5 flex justify-between items-center mb-20 transition-colors">
                    <div className="invisible"></div>
                    <Link href="/docs/architecture" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center gap-3 transition-colors group">
                        <div className="text-right">
                            <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Next</div>
                            <div className="font-medium text-sm">Polyglot Architecture</div>
                        </div>
                        <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>
            </div>

            {/* RIGHT SIDEBAR (On this page) */}
            <aside className="hidden xl:block w-64 shrink-0 h-[calc(100vh-[73px])] sticky top-0 overflow-y-auto py-8 pl-6 border-l border-slate-200 dark:border-white/5 transition-colors duration-300">
                <h4 className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-6">On This Page</h4>
                <ul className="space-y-4">
                    <li>
                        <a href="#prerequisites" className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-indigo-600 dark:bg-indigo-500" />
                            System Prerequisites
                        </a>
                    </li>
                    <li>
                        <a href="#installation" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors pl-3 border-l border-slate-200 dark:border-white/10 ml-0.5">
                            Installation
                        </a>
                    </li>
                </ul>
            </aside>

        </div>
    );
}