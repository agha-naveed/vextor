"use client";

import { useState } from "react";
import Link from "next/link";
import { FiChevronRight, FiTerminal, FiShield, FiCpu, FiCode, FiZap, FiBox } from "react-icons/fi";
import { FaRust } from "react-icons/fa";
import { SiGo } from "react-icons/si";

export default function page() {
    const [activeSection, setActiveSection] = useState("architecture");

    return (
        <div className="min-h-screen bg-[#06070a] text-slate-300 font-sans selection:bg-indigo-500/30 flex flex-col">

            <div className="max-w-screen-2xl mx-auto flex w-full flex-1 relative overflow-hidden">

                {/* LEFT SIDEBAR (Navigation) */}
                <aside className="hidden lg:block w-72 shrink-0 border-r border-white/5 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto py-8 pr-6 custom-scrollbar">
                    <nav className="space-y-8 pl-6">
                        <div>
                            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Introduction</h4>
                            <ul className="space-y-2">
                                <li>
                                    <button onClick={() => setActiveSection("getting-started")} className={`text-sm w-full text-left transition-colors ${activeSection === "getting-started" ? "text-indigo-400 font-medium" : "text-slate-400 hover:text-slate-200"}`}>Getting Started</button>
                                </li>
                                <li>
                                    <button onClick={() => setActiveSection("architecture")} className={`text-sm w-full text-left transition-colors ${activeSection === "architecture" ? "text-indigo-400 font-medium" : "text-slate-400 hover:text-slate-200"}`}>Polyglot Architecture</button>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Core Engine</h4>
                            <ul className="space-y-2">
                                <li>
                                    <button className="text-sm w-full text-left text-slate-400 hover:text-slate-200 transition-colors">React & Electron UI</button>
                                </li>
                                <li>
                                    <button className="text-sm w-full text-left text-slate-400 hover:text-slate-200 transition-colors">Rust AST Parser</button>
                                </li>
                                <li>
                                    <button className="text-sm w-full text-left text-slate-400 hover:text-slate-200 transition-colors">Go PTY Terminal</button>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">AI & Inference</h4>
                            <ul className="space-y-2">
                                <li>
                                    <button className="text-sm w-full text-left text-slate-400 hover:text-slate-200 transition-colors">Natural Language CLI</button>
                                </li>
                                <li>
                                    <button className="text-sm w-full text-left text-slate-400 hover:text-slate-200 transition-colors">Offline GGUF & llama.cpp</button>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Ecosystem</h4>
                            <ul className="space-y-2">
                                <li>
                                    <button className="text-sm w-full text-left text-slate-400 hover:text-slate-200 transition-colors">Deterministic Guardrails</button>
                                </li>
                                <li>
                                    <button className="text-sm w-full text-left text-slate-400 hover:text-slate-200 transition-colors">Custom Extension API</button>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </aside>

                {/* MAIN CONTENT AREA */}
                <main className="flex-1 h-[calc(100vh-4rem)] overflow-y-auto py-10 px-6 lg:px-12 xl:px-20 relative custom-scrollbar">

                    {/* Ambient Glow */}
                    <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/5 blur-[150px] rounded-full pointer-events-none -z-10" />

                    <div className="max-w-4xl mx-auto">

                        {/* Section Header */}
                        <div className="mb-12">
                            <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium mb-4">
                                <span>Core Engine</span>
                                <FiChevronRight className="w-4 h-4" />
                                <span className="text-slate-300">Polyglot Architecture</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 leading-tight">Defying the <br /> Architectural Ceiling</h1>
                            <p className="text-lg md:text-xl text-slate-400 leading-relaxed font-light">
                                Vextor AI is not a VS Code fork. It is a completely original IDE engineered from scratch utilizing React, Electron, Rust, and Go to eliminate UI freezing, terminal crashes, and cloud-dependency constraints.
                            </p>
                        </div>

                        {/* Content Blocks */}
                        <div className="space-y-16 text-slate-300 leading-relaxed">

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                    <FiZap className="text-indigo-500" />
                                    The Single-Thread Problem
                                </h2>
                                <p className="mb-6">
                                    Modern AI tools like GitHub Copilot and Cursor are exceptionally powerful, but they share a fatal structural flaw: they are built on top of VS Code's legacy architecture. Because VS Code operates on a single-threaded Node.js event loop, forcing an AI to continuously scan thousands of lines of code causes the entire editor to lag.
                                </p>

                                {/* Architecture Comparison Table */}
                                <div className="overflow-x-auto border border-white/10 rounded-xl bg-white/[0.01] mb-8">
                                    <table className="w-full text-left text-sm">
                                        <thead className="border-b border-white/10 bg-white/[0.02]">
                                            <tr>
                                                <th className="p-4 font-bold text-white">Component</th>
                                                <th className="p-4 font-bold text-slate-400">Legacy Editors (VS Code Forks)</th>
                                                <th className="p-4 font-bold text-indigo-400">Vextor AI Architecture</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            <tr>
                                                <td className="p-4 font-medium text-slate-200">Terminal PTY</td>
                                                <td className="p-4 text-slate-500">Node.js (Prone to dropped packets)</td>
                                                <td className="p-4 text-emerald-400 font-mono text-xs">Custom Concurrent Go Backend</td>
                                            </tr>
                                            <tr>
                                                <td className="p-4 font-medium text-slate-200">AST Parsing</td>
                                                <td className="p-4 text-slate-500">TypeScript (Blocks UI thread)</td>
                                                <td className="p-4 text-orange-400 font-mono text-xs">Rust Binary (Zero UI interference)</td>
                                            </tr>
                                            <tr>
                                                <td className="p-4 font-medium text-slate-200">AI Execution</td>
                                                <td className="p-4 text-slate-500">Cloud API dependent</td>
                                                <td className="p-4 text-blue-400 font-mono text-xs">Offline GGUF / llama.cpp Integration</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-6">The Multi-Process Engine</h2>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Feature Card 1 */}
                                    <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-orange-500/30 transition-colors group">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center transition-transform group-hover:scale-110">
                                                <FaRust className="w-6 h-6 text-orange-400" />
                                            </div>
                                            <h3 className="text-lg font-bold text-white">Rust Parsing Engine</h3>
                                        </div>
                                        <p className="text-sm text-slate-400 leading-relaxed">
                                            We offloaded all heavy computation—Abstract Syntax Tree (AST) parsing, file dependency tracking, and multi-file code flow generation—to a separate, memory-safe Rust binary. Vextor scans massive interdependent file structures instantly.
                                        </p>
                                    </div>

                                    {/* Feature Card 2 */}
                                    <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-colors group">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center transition-transform group-hover:scale-110">
                                                <SiGo className="w-6 h-6 text-cyan-400" />
                                            </div>
                                            <h3 className="text-lg font-bold text-white">Concurrent Go PTY</h3>
                                        </div>
                                        <p className="text-sm text-slate-400 leading-relaxed">
                                            The Vextor terminal completely bypasses Node.js. By utilizing a custom Go backend connected to the Electron/React frontend via WebSockets, the multi-language terminal remains crash-free under the heaviest compiling loads.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <hr className="border-white/5" />

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                    <FiTerminal className="text-indigo-500" />
                                    Natural Language Terminal
                                </h2>
                                <p className="mb-6">
                                    A significant barrier to developer flow is the steep learning curve of complex CLI and Git operations. Vextor AI natively integrates a Magic AI Bar directly above the Go terminal, allowing for real-time natural language to shell script compilation.
                                </p>

                                {/* Code Snippet Mockup */}
                                <div className="rounded-xl overflow-hidden bg-[#0a0c10] border border-white/10 mb-8 shadow-2xl">
                                    <div className="flex items-center justify-between px-4 py-3 bg-black/60 border-b border-white/5">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                                            <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                                            <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                                        </div>
                                        <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono">Terminal // CMD + AI</span>
                                    </div>
                                    <div className="p-4 bg-indigo-500/10 border-b border-white/5 flex items-center gap-3">
                                        <FiTerminal className="text-indigo-400" />
                                        <span className="text-slate-300 text-sm italic font-mono">"Undo my last commit but keep my changes"</span>
                                    </div>
                                    <div className="p-5 text-sm font-mono text-slate-400 leading-loose">
                                        <div className="text-emerald-400">&gt; git reset --soft HEAD~1</div>
                                        <div className="text-slate-500">Unstaged changes after reset:</div>
                                        <div className="text-yellow-300">M  src/components/TerminalManager.jsx</div>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                    <FiCpu className="text-indigo-500" />
                                    Offline-First AI Inference
                                </h2>
                                <p className="mb-6">
                                    Enterprise codebases cannot be leaked to third-party APIs. Vextor AI was built with a strict offline-first philosophy. By integrating directly with <strong>llama.cpp</strong>, Vextor can run quantized <strong>GGUF models</strong> entirely locally on your hardware.
                                </p>
                                <blockquote className="pl-4 border-l-2 border-indigo-500 text-slate-400 italic mb-8">
                                    "Your code never leaves your machine. The neural parsing and context generation happen on your local GPU/CPU, ensuring absolute data privacy without sacrificing intelligence."
                                </blockquote>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                    <FiBox className="text-indigo-500" />
                                    Custom Extension API
                                </h2>
                                <p className="mb-6">
                                    Because Vextor AI is not a VS Code fork, it does not use the VS Code extension marketplace. Instead, we have exposed a clean, powerful, and highly-typed Custom Extension API built for the modern web stack.
                                </p>

                                <div className="rounded-xl overflow-hidden bg-[#0a0c10] border border-white/10 mb-6">
                                    <div className="px-4 py-2 bg-black/60 border-b border-white/5 text-[10px] font-mono text-slate-500 uppercase">
                                        vextor-plugin.ts
                                    </div>
                                    <pre className="p-5 text-xs font-mono text-slate-300 overflow-x-auto">
                                        <code className="language-typescript">
                                            {`import { VextorExtension, TerminalAPI } from '@vextor/core';

export default class MyCustomPlugin implements VextorExtension {
  name = "Auto-Linter";
  
  onActivate() {
    // Hooks directly into the concurrent Go PTY stream
    TerminalAPI.onCommandExecution((cmd) => {
      if (cmd.includes('git commit')) {
        TerminalAPI.injectCommand('npm run lint');
      }
    });
  }
}`}
                                        </code>
                                    </pre>
                                </div>
                            </section>

                            {/* Alert / Warning Block */}
                            <div className="p-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 flex gap-5 items-start mt-12">
                                <FiShield className="w-8 h-8 text-emerald-400 shrink-0 mt-1" />
                                <div>
                                    <h4 className="text-white font-bold text-lg mb-2">Deterministic Security Guardrails</h4>
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        The AI CLI features a deterministic interception layer. If an AI generates a destructive command (such as <code className="text-emerald-300 bg-emerald-500/10 px-1 py-0.5 rounded">rm -rf</code> or <code className="text-emerald-300 bg-emerald-500/10 px-1 py-0.5 rounded">git push -f</code>), the execution is physically suspended by the Go server pending explicit developer approval.
                                    </p>
                                </div>
                            </div>

                        </div>

                        {/* Pagination at bottom of docs */}
                        <div className="mt-20 pt-8 border-t border-white/5 flex justify-between items-center mb-20">
                            <button className="text-slate-400 hover:text-white flex items-center gap-3 transition-colors group">
                                <span className="text-2xl group-hover:-translate-x-1 transition-transform">←</span>
                                <div className="text-left">
                                    <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Previous</div>
                                    <div className="font-medium text-sm">Getting Started</div>
                                </div>
                            </button>
                            <button className="text-slate-400 hover:text-white flex items-center gap-3 transition-colors group">
                                <div className="text-right">
                                    <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Next</div>
                                    <div className="font-medium text-sm">Rust AST Parser</div>
                                </div>
                                <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
                            </button>
                        </div>
                    </div>
                </main>

                {/* RIGHT SIDEBAR (On this page) */}
                <aside className="hidden xl:block w-64 shrink-0 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto py-8 pl-6 border-l border-white/5">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">On This Page</h4>
                    <ul className="space-y-4">
                        <li>
                            <a href="#" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-indigo-500" />
                                The Single-Thread Problem
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-sm text-slate-400 hover:text-slate-200 transition-colors pl-3 border-l border-white/10 ml-0.5">
                                The Multi-Process Engine
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-sm text-slate-400 hover:text-slate-200 transition-colors pl-3 border-l border-white/10 ml-0.5">
                                Natural Language Terminal
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-sm text-slate-400 hover:text-slate-200 transition-colors pl-3 border-l border-white/10 ml-0.5">
                                Offline-First AI Inference
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-sm text-slate-400 hover:text-slate-200 transition-colors pl-3 border-l border-white/10 ml-0.5">
                                Custom Extension API
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-sm text-slate-400 hover:text-slate-200 transition-colors pl-3 border-l border-white/10 ml-0.5">
                                Security Guardrails
                            </a>
                        </li>
                    </ul>
                </aside>

            </div>
        </div>
    );
}