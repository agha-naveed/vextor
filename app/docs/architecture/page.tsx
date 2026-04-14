"use client";

import { FiChevronRight, FiCpu, FiLayers, FiActivity, FiDatabase, FiLock } from "react-icons/fi";
import { FaRust, FaReact } from "react-icons/fa";
import { SiGo } from "react-icons/si";
import Link from "next/link";

export default function ArchitecturePage() {
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
                        <span className="text-slate-600 dark:text-slate-300">Polyglot Architecture</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter mb-6 leading-tight transition-colors">
                        The Multi-Process <br /> Engine
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-light transition-colors">
                        Vextor AI abandons the monolithic JavaScript architecture of traditional editors. By distributing heavy workloads across native Rust and Go binaries, we have engineered an IDE that refuses to bottleneck.
                    </p>
                </div>

                {/* Content Blocks */}
                <div className="space-y-16 text-slate-700 dark:text-slate-300 leading-relaxed transition-colors">

                    {/* THE MONOLITH FALLACY */}
                    <section id="the-monolith" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3 transition-colors">
                            <FiActivity className="text-indigo-600 dark:text-indigo-500" />
                            01. The Monolith Fallacy
                        </h2>
                        <p className="mb-4">
                            Virtually every modern editor (including VS Code, Cursor, and their derivatives) relies on an Electron/Node.js monolith. In this architecture, the UI rendering, the integrated terminal, the file-system watcher, and the extension host all share the same underlying V8 JavaScript engine.
                        </p>
                        <p className="mb-6">
                            This creates a fatal ceiling. When an AI extension attempts to parse an entire 10,000-file repository to build a context graph, the single-threaded event loop becomes completely saturated. The result is UI stuttering, dropped terminal inputs, and high RAM consumption.
                        </p>

                        <div className="p-6 rounded-2xl border border-rose-600/30 dark:border-rose-500/30 bg-rose-50 dark:bg-rose-500/5 transition-colors">
                            <h4 className="text-slate-900 dark:text-white font-bold text-sm mb-2 transition-colors">The Legacy Bottleneck</h4>
                            <div className="flex flex-col gap-2 font-mono text-xs text-slate-600 dark:text-slate-400">
                                <div className="p-2 border border-rose-600/20 bg-rose-600/5 rounded">1. User types in Terminal ➔ Node.js Event Loop</div>
                                <div className="p-2 border border-rose-600/20 bg-rose-600/5 rounded">2. AI Scans File System ➔ Node.js Event Loop (BLOCKING)</div>
                                <div className="p-2 border border-rose-600/20 bg-rose-600/5 rounded">3. Terminal input drops because Event Loop is busy.</div>
                            </div>
                        </div>
                    </section>

                    {/* THE TRI-CORE SYSTEM */}
                    <section id="tri-core-system" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3 transition-colors">
                            <FiLayers className="text-indigo-600 dark:text-indigo-500" />
                            02. The Tri-Core System
                        </h2>
                        <p className="mb-8">
                            Vextor AI introduces a Polyglot Sidecar Architecture. We split the IDE into three isolated processes, each written in the language best suited for its task.
                        </p>

                        <div className="space-y-6">
                            {/* Layer 1 */}
                            <div className="flex gap-6 p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0a0c10] shadow-xl shadow-slate-200/50 dark:shadow-none transition-colors group">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                                    <FaReact className="w-6 h-6 text-blue-500" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 transition-colors">1. The Presentation Layer (React & Electron)</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
                                        Handles rendering the UI, code editor visuals, and animations. Because no heavy background tasks run on this thread, the UI consistently hits 60FPS.
                                    </p>
                                </div>
                            </div>

                            {/* Layer 2 */}
                            <div className="flex gap-6 p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0a0c10] shadow-xl shadow-slate-200/50 dark:shadow-none transition-colors group">
                                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                                    <FaRust className="w-6 h-6 text-orange-500" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 transition-colors">2. The Intelligence Layer (Rust)</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
                                        An independent Rust binary handles file-system watching, Abstract Syntax Tree (AST) parsing, and context mapping. Rust's zero-cost abstractions allow it to track 100,000+ file dependencies using less than 40MB of RAM.
                                    </p>
                                </div>
                            </div>

                            {/* Layer 3 */}
                            <div className="flex gap-6 p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0a0c10] shadow-xl shadow-slate-200/50 dark:shadow-none transition-colors group">
                                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                                    <SiGo className="w-6 h-6 text-cyan-500" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 transition-colors">3. The Execution Layer (Go)</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
                                        A concurrent Go server manages the Pseudo-Terminal (PTY). Go's goroutines provide perfect, non-blocking I/O streaming, meaning your terminal will never freeze even if a compiler spits out millions of lines of logs.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* INTER-PROCESS COMMUNICATION */}
                    <section id="ipc" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3 transition-colors">
                            <FiDatabase className="text-indigo-600 dark:text-indigo-500" />
                            03. Inter-Process Communication (IPC)
                        </h2>
                        <p className="mb-4">
                            Having three isolated environments is useless if they cannot communicate instantaneously. Vextor avoids standard JSON-over-HTTP due to parsing overhead, opting instead for highly optimized memory bridges and raw socket streams.
                        </p>

                        <div className="rounded-xl overflow-hidden bg-slate-900 dark:bg-[#0a0c10] border border-slate-800 dark:border-white/10 mb-8 shadow-2xl transition-colors">
                            <div className="px-4 py-2 bg-black/60 border-b border-white/5 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                                Architecture Diagram // Data Flow
                            </div>
                            <pre className="p-6 text-xs font-mono text-slate-400 overflow-x-auto leading-relaxed">
                                {`[React UI] (Main Thread)
   │
   ├───> IPC Bridge (WebSockets / Binary Protocol)
   │        ├──> [Go Server] ──> Manages PTY / shell execution
   │        └──> [Rust Engine] ──> Parses AST & File Tree
   │
[llama.cpp GGUF] <────> Memory Mapped (Zero-Copy) into Rust
`}
                            </pre>
                        </div>

                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 transition-colors">The Go WebSocket Bridge</h3>
                        <p className="mb-6 text-sm">
                            The terminal in the React UI is a lightweight <code>xterm.js</code> canvas. It acts purely as a dumb display. Every keystroke is sent as an ArrayBuffer over a local WebSocket to the Go server. The Go server pipes it into the native Windows/Linux shell, and streams the binary output directly back to the canvas. No string manipulation occurs in Node.js.
                        </p>

                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 transition-colors">The Rust Native Interface</h3>
                        <p className="text-sm">
                            Rust communicates with Electron via Node-API (N-API). Instead of serializing large syntax trees into JSON and sending them over local network ports, Rust writes the parsed code flow directly into shared memory buffers that the V8 engine can read instantly.
                        </p>
                    </section>

                    {/* SECURITY ISOLATION */}
                    <section id="security-isolation" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3 transition-colors">
                            <FiLock className="text-indigo-600 dark:text-indigo-500" />
                            04. Security Isolation
                        </h2>
                        <p className="mb-6">
                            By physically detaching the AI logic from the terminal execution logic, we achieve a deterministic security model that is impossible in legacy editors.
                        </p>

                        <div className="p-6 rounded-2xl border border-emerald-600/30 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/5 flex gap-5 items-start transition-colors">
                            <div className="w-8 h-8 rounded-full bg-emerald-600/10 dark:bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                <span className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">🛡</span>
                            </div>
                            <div>
                                <h4 className="text-slate-900 dark:text-white font-bold text-lg mb-2 transition-colors">The Go Execution Interceptor</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed transition-colors">
                                    When the Natural Language CLI generates a command like <code>rm -rf .git</code>, the React UI does not have permission to execute it. It sends a "Command Request" to the Go server. The Go server cross-references the command against a hardcoded list of destructive keywords. If flagged, the Go binary physically blocks the PTY stream until the user manually confirms the action in the UI.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Pagination */}
                <div className="mt-20 pt-8 border-t border-slate-200 dark:border-white/5 flex justify-between items-center mb-20 transition-colors">
                    <Link href="/docs" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center gap-3 transition-colors group">
                        <span className="text-2xl group-hover:-translate-x-1 transition-transform">←</span>
                        <div className="text-left">
                            <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Previous</div>
                            <div className="font-medium text-sm">Getting Started</div>
                        </div>
                    </Link>
                    <Link href="/docs/ui" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center gap-3 transition-colors group">
                        <div className="text-right">
                            <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Next</div>
                            <div className="font-medium text-sm">React & Electron UI</div>
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
                        <a href="#the-monolith" className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-indigo-600 dark:bg-indigo-500" />
                            The Monolith Fallacy
                        </a>
                    </li>
                    <li>
                        <a href="#tri-core-system" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors pl-3 border-l border-slate-200 dark:border-white/10 ml-0.5">
                            The Tri-Core System
                        </a>
                    </li>
                    <li>
                        <a href="#ipc" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors pl-3 border-l border-slate-200 dark:border-white/10 ml-0.5">
                            Inter-Process Communication
                        </a>
                    </li>
                    <li>
                        <a href="#security-isolation" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors pl-3 border-l border-slate-200 dark:border-white/10 ml-0.5">
                            Security Isolation
                        </a>
                    </li>
                </ul>
            </aside>

        </div>
    );
}