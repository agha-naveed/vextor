"use client";

import { FiChevronRight, FiTerminal, FiCommand, FiCpu, FiShield } from "react-icons/fi";
import { BsStars } from "react-icons/bs";
import Link from "next/link";

export default function NaturalLanguageCLIPage() {
    return (
        <div className="flex w-full h-full relative">

            {/* Ambient Glow */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/5 blur-[150px] rounded-full pointer-events-none -z-10" />

            {/* MAIN CONTENT */}
            <div className="flex-1 py-10 px-6 lg:px-12 xl:px-20 max-w-4xl mx-auto">

                {/* Section Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4">
                        <span>AI & Inference</span>
                        <FiChevronRight className="w-4 h-4" />
                        <span className="text-slate-600 dark:text-slate-300">Natural Language CLI</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter mb-6 leading-tight transition-colors">
                        The Natural <br /> Language Terminal
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-light transition-colors">
                        Say goodbye to searching StackOverflow for complex shell syntax. The Vextor AI Magic Bar allows you to type intent in plain English, compiling it instantly into precise, executable CLI commands.
                    </p>
                </div>

                {/* Content Blocks */}
                <div className="space-y-16 text-slate-700 dark:text-slate-300 leading-relaxed transition-colors">

                    {/* THE MAGIC BAR */}
                    <section id="the-magic-bar" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3 transition-colors">
                            <FiCommand className="text-purple-600 dark:text-purple-500" />
                            01. The Magic Bar Interface
                        </h2>
                        <p className="mb-6">
                            Nested directly above the Go-powered <code>xterm.js</code> canvas is the Magic Bar. This lightweight React component intercepts user keystrokes before they hit the terminal. Instead of executing commands blindly, it acts as an intelligent staging area.
                        </p>

                        <div className="p-1 rounded-2xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-indigo-500/20 shadow-xl mb-8">
                            <div className="bg-slate-50 dark:bg-[#0a0c10] rounded-xl overflow-hidden transition-colors">
                                <div className="p-4 bg-slate-100/50 dark:bg-white/5 border-b border-slate-200 dark:border-white/5 flex items-center gap-3 transition-colors">
                                    <BsStars className="text-amber-500 w-5 h-5 animate-pulse" />
                                    <span className="text-slate-600 dark:text-slate-300 text-sm italic font-mono transition-colors">"Find all dangling docker images and delete them"</span>
                                </div>
                                <div className="p-5 text-sm font-mono text-slate-600 dark:text-slate-400 leading-loose transition-colors bg-white dark:bg-transparent">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-emerald-600 dark:text-emerald-400 font-bold">&gt;</span> docker rmi $(docker images -f "dangling=true" -q)
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="text-[10px] uppercase tracking-widest text-slate-400 bg-slate-100 dark:bg-white/5 px-2 py-1 rounded">Bash</span>
                                            <span className="text-[10px] uppercase tracking-widest text-slate-400 bg-slate-100 dark:bg-white/5 px-2 py-1 rounded">Translated</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* CONTEXT AWARENESS */}
                    <section id="context-awareness" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3 transition-colors">
                            <FiCpu className="text-purple-600 dark:text-purple-500" />
                            02. Workspace Context Awareness
                        </h2>
                        <p className="mb-4">
                            The Natural Language CLI is not a generic chatbot. It is deeply integrated into Vextor's <strong>Polyglot Architecture</strong>.
                        </p>
                        <p className="mb-6">
                            When you type a command, the React UI queries the Rust AST Engine to determine the current project's ecosystem. The LLM translates your intent based on the specific framework, package manager, and operating system you are actively using.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0a0c10] shadow-sm transition-colors">
                                <h3 className="font-bold text-slate-900 dark:text-white mb-3 text-sm transition-colors flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-500" /> Scenario A: React Project
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Intent: "install tailwind"</p>
                                <div className="text-xs font-mono bg-slate-200 dark:bg-white/5 p-2 rounded text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-white/5">
                                    npm install -D tailwindcss postcss autoprefixer<br />
                                    npx tailwindcss init -p
                                </div>
                            </div>
                            <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0a0c10] shadow-sm transition-colors">
                                <h3 className="font-bold text-slate-900 dark:text-white mb-3 text-sm transition-colors flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-orange-500" /> Scenario B: Rust Project
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Intent: "add sered serialization"</p>
                                <div className="text-xs font-mono bg-slate-200 dark:bg-white/5 p-2 rounded text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-white/5">
                                    cargo add serde --features derive
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* PIPING TO GO */}
                    <section id="execution-handoff" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3 transition-colors">
                            <FiTerminal className="text-purple-600 dark:text-purple-500" />
                            03. The Execution Handoff
                        </h2>
                        <p className="mb-4">
                            Once the local <code>llama.cpp</code> instance compiles the English intent into a shell string, the React UI displays the proposed command. <strong>It does not execute immediately.</strong>
                        </p>
                        <p className="mb-6">
                            Upon user confirmation (pressing <kbd className="font-mono text-xs bg-slate-200 dark:bg-white/10 px-1.5 py-0.5 rounded text-slate-700 dark:text-slate-300">Enter</kbd>), the compiled string is sent over the WebSocket to the Concurrent Go Server. The Go server injects the command into the PTY host as if the user had typed it manually, preserving all terminal history, state, and environment variables.
                        </p>

                        {/* Security Warning */}
                        <div className="p-6 rounded-2xl border border-emerald-600/30 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/5 flex gap-5 items-start mt-8 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-emerald-600/10 dark:bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                <FiShield className="text-emerald-600 dark:text-emerald-400 w-4 h-4" />
                            </div>
                            <div>
                                <h4 className="text-slate-900 dark:text-white font-bold text-lg mb-2 transition-colors">Deterministic Interception</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed transition-colors">
                                    As discussed in the Go PTY documentation, the Go execution layer will permanently block any AI-generated command that matches a destructive signature (e.g., recursive deletions or force-pushes), ensuring the AI cannot accidentally wipe your local machine.
                                </p>
                            </div>
                        </div>
                    </section>

                </div>

                {/* Pagination */}
                <div className="mt-20 pt-8 border-t border-slate-200 dark:border-white/5 flex justify-between items-center mb-20 transition-colors">
                    <Link href="/docs/go-pty" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center gap-3 transition-colors group">
                        <span className="text-2xl group-hover:-translate-x-1 transition-transform">←</span>
                        <div className="text-left">
                            <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Previous</div>
                            <div className="font-medium text-sm">Go PTY Terminal</div>
                        </div>
                    </Link>

                    <Link href="/docs/offline-ai" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center gap-3 transition-colors group">
                        <div className="text-right">
                            <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Next</div>
                            <div className="font-medium text-sm">Offline AI Inference</div>
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
                        <a href="#the-magic-bar" className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-purple-600 dark:bg-purple-500" />
                            The Magic Bar
                        </a>
                    </li>
                    <li>
                        <a href="#context-awareness" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors pl-3 border-l border-slate-200 dark:border-white/10 ml-0.5">
                            Context Awareness
                        </a>
                    </li>
                    <li>
                        <a href="#execution-handoff" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors pl-3 border-l border-slate-200 dark:border-white/10 ml-0.5">
                            The Execution Handoff
                        </a>
                    </li>
                </ul>
            </aside>

        </div>
    );
}