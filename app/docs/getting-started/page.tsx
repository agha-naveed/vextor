"use client";

import { FiChevronRight, FiDownloadCloud, FiSettings, FiPlay, FiCpu, FiTerminal, FiFileText } from "react-icons/fi";
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
                        Welcome to the next generation of local development. Vextor AI requires no cloud APIs, zero telemetry, and offers zero friction. Follow this guide to get the multi-process engine running on your machine.
                    </p>
                </div>

                {/* Content Blocks */}
                <div className="space-y-16 text-slate-700 dark:text-slate-300 leading-relaxed transition-colors">

                    {/* PREREQUISITES */}
                    <section id="prerequisites" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3 transition-colors">
                            <FiSettings className="text-indigo-600 dark:text-indigo-500" />
                            01. System Prerequisites
                        </h2>
                        <p className="mb-6">
                            Because Vextor bypasses legacy Node.js terminal environments, it compiles and runs its concurrent backend locally. You must ensure your machine has the required toolchains installed for the sidecar architecture to boot.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] transition-colors">
                                <div className="text-orange-600 dark:text-orange-400 font-bold mb-1">Rust (Cargo)</div>
                                <div className="text-xs text-slate-500 font-mono mb-2">v1.70.0+</div>
                                <div className="text-[10px] text-slate-400 leading-snug">Required to compile the memory-safe AST parser.</div>
                            </div>
                            <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] transition-colors">
                                <div className="text-cyan-600 dark:text-cyan-400 font-bold mb-1">Go Runtime</div>
                                <div className="text-xs text-slate-500 font-mono mb-2">v1.21.0+</div>
                                <div className="text-[10px] text-slate-400 leading-snug">Powers the concurrent PTY and WebSocket server.</div>
                            </div>
                            <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] transition-colors">
                                <div className="text-emerald-600 dark:text-emerald-400 font-bold mb-1">Node.js</div>
                                <div className="text-xs text-slate-500 font-mono mb-2">v18.0.0+</div>
                                <div className="text-[10px] text-slate-400 leading-snug">Handles the Electron wrapper and React UI rendering.</div>
                            </div>
                        </div>

                        {/* Windows Warning */}
                        <div className="p-5 rounded-xl border border-amber-600/30 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5 flex gap-4 items-start transition-colors">
                            <div className="w-6 h-6 rounded-full bg-amber-600/10 dark:bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                <span className="text-amber-600 dark:text-amber-400 font-bold text-xs">!</span>
                            </div>
                            <div>
                                <h4 className="text-slate-900 dark:text-white font-bold text-sm mb-1 transition-colors">Windows Users (WSL2 Required)</h4>
                                <p className="text-xs text-slate-700 dark:text-slate-400 leading-relaxed transition-colors">
                                    Vextor's concurrent Go PTY is deeply optimized for UNIX-like environments. To use Vextor on Windows, you must install and run the IDE from within a Windows Subsystem for Linux (WSL2) distribution.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* INSTALLATION */}
                    <section id="installation" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3 transition-colors">
                            <FiDownloadCloud className="text-indigo-600 dark:text-indigo-500" />
                            02. Installation
                        </h2>
                        <p className="mb-4">
                            Download the universal installer. This script automatically detects your operating system, downloads the pre-compiled Rust and Go binaries, and registers the <code className="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-1.5 py-0.5 rounded font-mono text-sm">vextor</code> CLI globally.
                        </p>

                        <div className="rounded-xl overflow-hidden bg-slate-900 dark:bg-[#0a0c10] border border-slate-800 dark:border-white/10 mb-6 shadow-2xl transition-colors">
                            <div className="flex items-center px-4 py-3 bg-black/60 border-b border-white/5 gap-4">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                                    <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                                    <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                                </div>
                                <div className="flex items-center gap-3 ml-2 border-l border-white/10 pl-4 text-xs font-mono text-slate-500 uppercase tracking-widest">
                                    macOS / Linux
                                </div>
                            </div>
                            <div className="p-5 text-sm font-mono text-slate-300 leading-loose overflow-x-auto">
                                <div className="flex gap-4">
                                    <span className="text-indigo-500 select-none">$</span>
                                    <span>curl -fsSL https://vextor.ai/install.sh | bash</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-sm">Verify the installation by checking the version:</p>
                        <div className="p-4 mt-2 rounded-xl bg-slate-900 dark:bg-[#0a0c10] border border-slate-800 dark:border-white/10 text-sm font-mono text-slate-300">
                            <div className="flex gap-4"><span className="text-indigo-500">$</span><span>vextor --version</span></div>
                            <div className="text-slate-500 ml-6">Vextor Engine v2.0.4 (Polyglot Edition)</div>
                        </div>
                    </section>

                    {/* INITIALIZATION */}
                    <section id="initialization" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3 transition-colors">
                            <FiPlay className="text-indigo-600 dark:text-indigo-500" />
                            03. Initializing a Workspace
                        </h2>
                        <p className="mb-4">
                            Unlike traditional editors, Vextor does not just open a folder. It boots a local server cluster. Navigate to any existing repository and run the initialization command.
                        </p>

                        <div className="rounded-xl overflow-hidden bg-slate-900 dark:bg-[#0a0c10] border border-slate-800 dark:border-white/10 mb-8 shadow-2xl transition-colors">
                            <div className="p-5 text-sm font-mono text-slate-300 leading-loose overflow-x-auto">
                                <div className="flex gap-4">
                                    <span className="text-indigo-500 select-none">$</span>
                                    <span>cd my-awesome-project</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-indigo-500 select-none">$</span>
                                    <span>vextor .</span>
                                </div>
                                <div className="mt-4 text-slate-500 border-l-2 border-indigo-500/30 pl-4 py-2 bg-black/20">
                                    [Vextor/Core] Spawning Rust AST Engine on port 8081... <span className="text-emerald-400">SUCCESS</span><br />
                                    [Vextor/PTY] Starting Concurrent Go Terminal... <span className="text-emerald-400">SUCCESS</span><br />
                                    [Vextor/UI] Launching Electron window... <span className="text-emerald-400">READY</span>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2"><FiFileText className="text-slate-400" /> The <code className="font-mono text-indigo-600 dark:text-indigo-400">.vextorignore</code> File</h3>
                        <p className="mb-4 text-sm">
                            Upon first boot, Vextor will automatically generate a <code>.vextorignore</code> file in your root directory. This tells the Rust AST Parser which directories to skip (e.g., <code>node_modules</code>, <code>target/</code>, <code>.git</code>) to ensure background indexing remains instantaneous.
                        </p>
                    </section>

                    {/* LLM CONFIGURATION */}
                    <section id="llm-setup" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3 transition-colors">
                            <FiCpu className="text-indigo-600 dark:text-indigo-500" />
                            04. Linking the Local LLM
                        </h2>
                        <p className="mb-6">
                            Out of the box, Vextor AI requires a localized LLM to drive the Natural Language Terminal and predictive autocomplete. We utilize <strong>GGUF</strong> formats integrated with <code>llama.cpp</code> for optimized CPU/GPU hybrid inference.
                        </p>

                        <ol className="list-decimal list-inside space-y-4 mb-8 text-slate-600 dark:text-slate-400 marker:text-indigo-500 marker:font-bold border-l border-slate-200 dark:border-white/10 pl-6 ml-2">
                            <li>Download a compatible GGUF model (e.g., <strong>Llama-3-8B-Instruct.gguf</strong>) from HuggingFace.</li>
                            <li>Open the Vextor AI command palette (<code className="bg-slate-100 dark:bg-white/5 px-1.5 py-0.5 rounded text-xs">Ctrl+Shift+P</code> or <code className="bg-slate-100 dark:bg-white/5 px-1.5 py-0.5 rounded text-xs">Cmd+Shift+P</code>).</li>
                            <li>Search for <strong>"Vextor: Link Local LLM"</strong> and select your downloaded <code>.gguf</code> file.</li>
                            <li>Wait for the engine to allocate the model to your VRAM.</li>
                        </ol>

                        <div className="p-6 rounded-2xl border border-blue-600/30 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/5 flex gap-5 items-start mt-8 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-blue-600/10 dark:bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                <span className="text-blue-600 dark:text-blue-400 font-bold text-xs">ℹ</span>
                            </div>
                            <div>
                                <h4 className="text-slate-900 dark:text-white font-bold text-lg mb-2 transition-colors">Hardware Recommendation</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed transition-colors">
                                    For seamless terminal translations and code autocompletion, we highly recommend models quantized to <strong>Q4_K_M</strong> or <strong>Q5_K_M</strong>. This provides the perfect balance of instant reasoning speed and low RAM overhead (typically utilizing ~5GB of memory).
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* FIRST COMMAND */}
                    <section id="first-command" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3 transition-colors">
                            <FiTerminal className="text-indigo-600 dark:text-indigo-500" />
                            05. Your First AI Command
                        </h2>
                        <p className="mb-4">
                            Now that your LLM is linked, let's test the Natural Language Terminal. Open the integrated terminal (`Ctrl + \``) and select the <strong>"CMD + AI"</strong> profile.
                        </p>
                        <p className="mb-6">
                            Instead of trying to remember complex shell syntax, simply type your intent in plain English into the Magic Bar.
                        </p>

                        <div className="rounded-xl overflow-hidden bg-slate-900 dark:bg-[#0a0c10] border border-slate-800 dark:border-white/10 mb-8 shadow-2xl transition-colors">
                            <div className="p-4 bg-indigo-500/10 border-b border-white/5 flex items-center gap-3">
                                <span className="text-yellow-400 animate-pulse">✨</span>
                                <span className="text-slate-300 text-sm italic font-mono">"Find whatever process is running on port 3000 and kill it"</span>
                            </div>
                            <div className="p-5 text-sm font-mono text-slate-400 leading-loose">
                                <div className="text-emerald-400">&gt; npx kill-port 3000</div>
                                <div className="text-slate-500">Process on port 3000 killed successfully.</div>
                            </div>
                        </div>

                        <p className="text-sm text-slate-500 italic">
                            Congratulations. You are now running a completely offline, polyglot AI development environment.
                        </p>
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
                    <li>
                        <a href="#initialization" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors pl-3 border-l border-slate-200 dark:border-white/10 ml-0.5">
                            Initializing Workspace
                        </a>
                    </li>
                    <li>
                        <a href="#llm-setup" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors pl-3 border-l border-slate-200 dark:border-white/10 ml-0.5">
                            Linking the Local LLM
                        </a>
                    </li>
                    <li>
                        <a href="#first-command" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors pl-3 border-l border-slate-200 dark:border-white/10 ml-0.5">
                            Your First AI Command
                        </a>
                    </li>
                </ul>
            </aside>

        </div>
    );
}