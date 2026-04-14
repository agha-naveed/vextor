"use client";

import { FiChevronRight, FiLayout, FiMonitor, FiZap, FiCode } from "react-icons/fi";
import { FaReact, FaNodeJs } from "react-icons/fa";
import Link from "next/link";

export default function UIPage() {
    return (
        <div className="flex w-full h-full relative">

            {/* Ambient Glow */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/5 blur-[150px] rounded-full pointer-events-none -z-10" />

            {/* MAIN CONTENT */}
            <div className="flex-1 py-10 px-6 lg:px-12 xl:px-20 max-w-4xl mx-auto">

                {/* Section Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4">
                        <span>Core Engine</span>
                        <FiChevronRight className="w-4 h-4" />
                        <span className="text-slate-600 dark:text-slate-300">React & Electron UI</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter mb-6 leading-tight transition-colors">
                        The Presentation <br /> Layer
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-light transition-colors">
                        The Vextor frontend is a strictly "dumb" UI. By completely stripping computational logic out of the React rendering tree, the editor guarantees a flawless 60FPS experience, regardless of repository size.
                    </p>
                </div>

                {/* Content Blocks */}
                <div className="space-y-16 text-slate-700 dark:text-slate-300 leading-relaxed transition-colors">

                    {/* THE UNBLOCKING PHILOSOPHY */}
                    <section id="unblocking" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3 transition-colors">
                            <FiZap className="text-indigo-600 dark:text-indigo-500" />
                            01. The 60FPS Mandate
                        </h2>
                        <p className="mb-4">
                            In traditional Electron apps, heavy operations (like searching across files or parsing syntax) are often run on the main Node.js process. When the user types quickly, the UI stutters because the V8 engine is busy allocating memory.
                        </p>
                        <p className="mb-6">
                            Vextor flips this paradigm. The React frontend is exclusively responsible for painting pixels. It communicates with the Rust AST Parser and Go PTY host via asynchronous WebSockets and memory-mapped buffers. It never calculates; it only displays.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0a0c10] shadow-xl shadow-slate-200/50 dark:shadow-none transition-colors">
                                <FaReact className="w-8 h-8 text-blue-500 mb-4" />
                                <h3 className="font-bold text-slate-900 dark:text-white mb-2 transition-colors">React 18 Concurrent Features</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 transition-colors">
                                    Vextor utilizes React's `useTransition` and `Suspense` heavily. UI updates that require large tree reconciliations (like opening massive JSON files) are deprioritized to keep typing latency at zero.
                                </p>
                            </div>
                            <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0a0c10] shadow-xl shadow-slate-200/50 dark:shadow-none transition-colors">
                                <FaNodeJs className="w-8 h-8 text-emerald-500 mb-4" />
                                <h3 className="font-bold text-slate-900 dark:text-white mb-2 transition-colors">Electron as a Thin Client</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 transition-colors">
                                    Context Isolation is strictly enforced. The renderer process has absolutely no access to the Node.js `fs` or `child_process` modules, completely neutralizing local vulnerability injections.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* TERMINAL INTEGRATION */}
                    <section id="terminal-canvas" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3 transition-colors">
                            <FiMonitor className="text-indigo-600 dark:text-indigo-500" />
                            02. High-Performance Terminal Rendering
                        </h2>
                        <p className="mb-6">
                            Vextor utilizes a customized fork of <code>xterm.js</code>. Rather than using the standard DOM renderer (which creates a new HTML span element for every character), Vextor enforces the <strong>WebGL Renderer</strong>.
                        </p>

                        <div className="rounded-xl overflow-hidden bg-slate-900 dark:bg-[#0a0c10] border border-slate-800 dark:border-white/10 mb-6 shadow-2xl transition-colors">
                            <div className="px-4 py-2 bg-black/60 border-b border-white/5 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                                src/components/Terminal/PtyClient.ts
                            </div>
                            <pre className="p-5 text-xs font-mono text-slate-300 overflow-x-auto leading-loose">
                                <code className="language-typescript">
                                    {`import { Terminal } from '@xterm/xterm';
import { WebglAddon } from '@xterm/addon-webgl';

// Initialize dumb terminal display
const term = new Terminal({
  fontFamily: 'JetBrains Mono',
  allowProposedApi: true
});

// Attach WebGL hardware acceleration
const webglAddon = new WebglAddon();
term.loadAddon(webglAddon);

// Connect directly to the Go Concurrent PTY Host via WebSocket
const ws = new WebSocket('ws://localhost:8080/pty/stream');

ws.onmessage = (event) => {
  // Directly pipe binary stream to WebGL canvas. Zero JS parsing.
  term.write(new Uint8Array(event.data)); 
};`}
                                </code>
                            </pre>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 transition-colors">
                            When a compiler outputs 50,000 lines of error logs instantly, the Go backend pushes the binary stream directly into the GPU via WebGL. The React virtual DOM doesn't even know it happened.
                        </p>
                    </section>

                    {/* THE MAGIC AI BAR */}
                    <section id="magic-bar" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3 transition-colors">
                            <FiLayout className="text-indigo-600 dark:text-indigo-500" />
                            03. The Magic AI Bar Component
                        </h2>
                        <p className="mb-6">
                            The UI for the Natural Language Terminal sits directly above the `xterm.js` canvas. It acts as the bridge between human intent and shell execution.
                        </p>

                        {/* Interactive UI Mockup */}
                        <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0d0f14] shadow-xl shadow-slate-200/50 dark:shadow-none mb-8 transition-colors">
                            <div className="text-[10px] uppercase tracking-widest text-slate-400 mb-4 font-mono">Component Preview</div>

                            <div className="flex items-center gap-3 bg-slate-100 dark:bg-[#1a1e2b] border border-slate-200 dark:border-white/5 rounded-lg px-4 py-3 transition-colors">
                                <div className="text-amber-500 font-bold">✨</div>
                                <input
                                    type="text"
                                    disabled
                                    placeholder="Revert my last git commit but keep the files..."
                                    className="bg-transparent border-none outline-none w-full text-sm font-mono text-slate-900 dark:text-white placeholder:text-slate-400"
                                />
                                <div className="flex items-center gap-2 shrink-0">
                                    <div className="px-2 py-1 rounded bg-slate-200 dark:bg-white/10 text-[10px] text-slate-600 dark:text-slate-400 font-mono transition-colors">Ctrl</div>
                                    <span className="text-slate-400">+</span>
                                    <div className="px-2 py-1 rounded bg-slate-200 dark:bg-white/10 text-[10px] text-slate-600 dark:text-slate-400 font-mono transition-colors">Enter</div>
                                </div>
                            </div>
                        </div>

                        <p className="text-sm">
                            When the user presses Enter, the React component does not call an API directly. Instead, it dispatches an IPC message to the Electron main process, which securely ferries the intent to the local <code className="bg-slate-100 dark:bg-white/5 px-1.5 py-0.5 rounded transition-colors">llama.cpp</code> instance for translation.
                        </p>
                    </section>

                </div>

                {/* Pagination */}
                <div className="mt-20 pt-8 border-t border-slate-200 dark:border-white/5 flex justify-between items-center mb-20 transition-colors">
                    <Link href="/docs/architecture" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center gap-3 transition-colors group">
                        <span className="text-2xl group-hover:-translate-x-1 transition-transform">←</span>
                        <div className="text-left">
                            <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Previous</div>
                            <div className="font-medium text-sm">Polyglot Architecture</div>
                        </div>
                    </Link>
                    <Link href="/docs/rust-parser" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center gap-3 transition-colors group">
                        <div className="text-right">
                            <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Next</div>
                            <div className="font-medium text-sm">Rust AST Parser</div>
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
                        <a href="#unblocking" className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-indigo-600 dark:bg-indigo-500" />
                            The 60FPS Mandate
                        </a>
                    </li>
                    <li>
                        <a href="#terminal-canvas" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors pl-3 border-l border-slate-200 dark:border-white/10 ml-0.5">
                            Terminal Rendering
                        </a>
                    </li>
                    <li>
                        <a href="#magic-bar" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors pl-3 border-l border-slate-200 dark:border-white/10 ml-0.5">
                            Magic AI Bar
                        </a>
                    </li>
                </ul>
            </aside>

        </div>
    );
}