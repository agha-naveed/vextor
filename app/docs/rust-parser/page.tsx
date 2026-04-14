"use client";

import { FiChevronRight, FiCpu, FiFolder, FiZap, FiCode } from "react-icons/fi";
import { FaRust } from "react-icons/fa";
import Link from "next/link";

export default function RustParserPage() {
    return (
        <div className="flex w-full h-full relative">

            {/* Ambient Glow */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-600/5 blur-[150px] rounded-full pointer-events-none -z-10" />

            {/* MAIN CONTENT */}
            <div className="flex-1 py-10 px-6 lg:px-12 xl:px-20 max-w-4xl mx-auto">

                {/* Section Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4">
                        <span>Core Engine</span>
                        <FiChevronRight className="w-4 h-4" />
                        <span className="text-slate-600 dark:text-slate-300">Rust AST Parser</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter mb-6 leading-tight transition-colors">
                        The Intelligence <br /> Layer
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-light transition-colors">
                        Vextor AI delegates the heaviest computational burdens—Abstract Syntax Tree (AST) parsing and multi-file dependency tracking—to a highly optimized, memory-safe Rust binary.
                    </p>
                </div>

                {/* Content Blocks */}
                <div className="space-y-16 text-slate-700 dark:text-slate-300 leading-relaxed transition-colors">

                    {/* WHY RUST */}
                    <section id="why-rust" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3 transition-colors">
                            <FaRust className="text-orange-600 dark:text-orange-500" />
                            01. Why Rust?
                        </h2>
                        <p className="mb-4">
                            In a traditional VS Code environment, scanning a large project directory to build AI context relies on TypeScript/JavaScript. Because JavaScript is garbage-collected and single-threaded, allocating millions of AST nodes forces the editor to freeze.
                        </p>
                        <p className="mb-6">
                            By utilizing Rust, Vextor AI achieves predictable, zero-cost abstractions. Rust scans files, builds token trees, and resolves dependencies in the background without ever interrupting the V8 Engine powering the React UI.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0a0c10] shadow-xl shadow-slate-200/50 dark:shadow-none transition-colors">
                                <FiCpu className="w-8 h-8 text-orange-500 mb-4" />
                                <h3 className="font-bold text-slate-900 dark:text-white mb-2 transition-colors">Memory Safety without GC</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 transition-colors">
                                    Rust's strict ownership model ensures that we can index massive 100,000+ file codebases without memory leaks or garbage collection pauses.
                                </p>
                            </div>
                            <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0a0c10] shadow-xl shadow-slate-200/50 dark:shadow-none transition-colors">
                                <FiZap className="w-8 h-8 text-amber-500 mb-4" />
                                <h3 className="font-bold text-slate-900 dark:text-white mb-2 transition-colors">Blazing Fast Threading</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 transition-colors">
                                    Fearless concurrency allows the Rust parser to spawn native OS threads to scan different directories simultaneously, completing workspace initialization in milliseconds.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* DEPENDENCY TRACKING */}
                    <section id="dependency-tracking" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3 transition-colors">
                            <FiFolder className="text-indigo-600 dark:text-indigo-500" />
                            02. Multi-File Code Flow Map
                        </h2>
                        <p className="mb-6">
                            When the AI needs context, throwing an entire project into the prompt window causes extreme cognitive overload and token limits. Vextor's Rust engine dynamically tracks localized <strong>Multi-File Dependencies</strong>.
                        </p>

                        <div className="rounded-xl overflow-hidden bg-slate-900 dark:bg-[#0a0c10] border border-slate-800 dark:border-white/10 mb-6 shadow-2xl transition-colors">
                            <div className="px-4 py-2 bg-black/60 border-b border-white/5 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                                Rust Execution Log // Context Map
                            </div>
                            <pre className="p-5 text-xs font-mono text-slate-300 overflow-x-auto leading-loose">
                                {`[AST_INDEXER] Scanning dependencies for \`auth.controller.ts\`...
--> Found import: \`../services/jwt.service.ts\`
--> Found import: \`../models/user.model.ts\`
[CONTEXT_MGR] Assembling localized code flow graph.
[CONTEXT_MGR] Total Token Estimate: 3,420 tokens.
[LLM_BRIDGE] Sending strictly focused context to local GGUF model.`}
                            </pre>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 transition-colors">
                            Instead of a massive project-wide spaghetti graph, the Rust engine curates a precise, file-centric context window. This ensures the AI understands exactly how a change in your current file affects connected libraries.
                        </p>
                    </section>

                    {/* FFI & MEMORY MAPPING */}
                    <section id="memory-mapping" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3 transition-colors">
                            <FiCode className="text-indigo-600 dark:text-indigo-500" />
                            03. Zero-Copy Memory Mapping
                        </h2>
                        <p className="mb-4">
                            Passing massive AST JSON strings between Rust and Node.js/Electron over HTTP or standard input/output would negate all performance gains due to serialization overhead.
                        </p>
                        <p className="mb-6">
                            Vextor solves this using <strong>Node-API (N-API)</strong> and SharedArrayBuffers.
                        </p>

                        <div className="p-6 rounded-2xl border border-blue-600/30 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/5 flex gap-5 items-start transition-colors">
                            <div className="w-8 h-8 rounded-full bg-blue-600/10 dark:bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">🚀</span>
                            </div>
                            <div>
                                <h4 className="text-slate-900 dark:text-white font-bold text-lg mb-2 transition-colors">The N-API Bridge</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed transition-colors">
                                    When the Rust engine finishes parsing the AST, it writes the binary representation directly into a shared block of memory. The Electron main process reads this exact memory block instantly. There is zero parsing, zero stringification, and zero delay.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* EXACT Pagination Block you requested */}
                <div className="mt-20 pt-8 border-t border-slate-200 dark:border-white/5 flex justify-between items-center mb-20 transition-colors">
                    <Link href="/docs/ui" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center gap-3 transition-colors group">
                        <span className="text-2xl group-hover:-translate-x-1 transition-transform">←</span>
                        <div className="text-left">
                            <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Previous</div>
                            <div className="font-medium text-sm">React & Electron UI</div>
                        </div>
                    </Link>
                    <Link href="/docs/go-pty" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center gap-3 transition-colors group">
                        <div className="text-right">
                            <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Next</div>
                            <div className="font-medium text-sm">Go PTY Terminal</div>
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
                        <a href="#why-rust" className="text-sm text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300 transition-colors flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-orange-600 dark:bg-orange-500" />
                            Why Rust?
                        </a>
                    </li>
                    <li>
                        <a href="#dependency-tracking" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors pl-3 border-l border-slate-200 dark:border-white/10 ml-0.5">
                            Multi-File Code Flow
                        </a>
                    </li>
                    <li>
                        <a href="#memory-mapping" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors pl-3 border-l border-slate-200 dark:border-white/10 ml-0.5">
                            Zero-Copy Memory Mapping
                        </a>
                    </li>
                </ul>
            </aside>

        </div>
    );
}