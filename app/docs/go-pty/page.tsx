"use client";

import { FiChevronRight, FiTerminal, FiActivity, FiShield, FiWifi } from "react-icons/fi";
import { SiGo } from "react-icons/si";
import Link from "next/link";

export default function GoPtyPage() {
    return (
        <div className="flex w-full h-full relative">

            {/* Ambient Glow - Cyan for Go */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-600/5 blur-[150px] rounded-full pointer-events-none -z-10" />

            {/* MAIN CONTENT */}
            <div className="flex-1 py-10 px-6 lg:px-12 xl:px-20 max-w-4xl mx-auto">

                {/* Section Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4">
                        <span>Core Engine</span>
                        <FiChevronRight className="w-4 h-4" />
                        <span className="text-slate-600 dark:text-slate-300">Go PTY Terminal</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter mb-6 leading-tight transition-colors">
                        The Execution <br /> Layer
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-light transition-colors">
                        Vextor AI's integrated terminal completely bypasses the Node.js event loop. Powered by a custom, concurrent Go backend, the Vextor terminal remains crash-proof under the heaviest I/O compiler workloads.
                    </p>
                </div>

                {/* Content Blocks */}
                <div className="space-y-16 text-slate-700 dark:text-slate-300 leading-relaxed transition-colors">

                    {/* THE NODE PTY PROBLEM */}
                    <section id="node-pty-problem" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3 transition-colors">
                            <FiActivity className="text-cyan-600 dark:text-cyan-500" />
                            01. The Node.js PTY Problem
                        </h2>
                        <p className="mb-4">
                            Traditional Electron editors utilize the <code>node-pty</code> library to bridge the UI to the underlying operating system's terminal (CMD, PowerShell, or bash). While functional for light tasks, this architecture routes all standard input/output (stdio) streams through the single-threaded Node.js V8 engine.
                        </p>
                        <p className="mb-6">
                            When a build tool or compiler rapidly prints thousands of lines of logs, the V8 engine struggles to stringify and garbage-collect the incoming buffers fast enough. This leads to dropped packets, frozen inputs, and complete editor crashes.
                        </p>

                        <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0a0c10] shadow-xl shadow-slate-200/50 dark:shadow-none transition-colors">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2 transition-colors flex items-center gap-2">
                                <SiGo className="text-cyan-500" /> The Go Solution
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 transition-colors">
                                By replacing Node.js with Go, Vextor leverages <strong>Goroutines</strong>. Go easily spawns thousands of lightweight concurrent threads. The terminal output stream is handled on an entirely separate OS thread from the input stream, ensuring your keystrokes are registered instantly, even during massive compilation dumps.
                            </p>
                        </div>
                    </section>

                    {/* WEBSOCKET IPC */}
                    <section id="websocket-ipc" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3 transition-colors">
                            <FiWifi className="text-cyan-600 dark:text-cyan-500" />
                            02. WebSocket Streaming
                        </h2>
                        <p className="mb-6">
                            To connect the Go Execution Layer to the React Presentation Layer without introducing latency, Vextor utilizes a local WebSocket binary stream.
                        </p>

                        <div className="rounded-xl overflow-hidden bg-slate-900 dark:bg-[#0a0c10] border border-slate-800 dark:border-white/10 mb-6 shadow-2xl transition-colors">
                            <div className="px-4 py-2 bg-black/60 border-b border-white/5 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                                src/pty/server.go
                            </div>
                            <pre className="p-5 text-xs font-mono text-slate-300 overflow-x-auto leading-loose">
                                <code className="language-go">
                                    {`func streamPTY(ws *websocket.Conn, pty *os.File) {
    // Goroutine 1: Read from PTY, Write to WebSocket (UI)
    go func() {
        buffer := make([]byte, 8192)
        for {
            n, err := pty.Read(buffer)
            if err != nil { return }
            // Push raw binary to React UI. Zero string serialization.
            ws.WriteMessage(websocket.BinaryMessage, buffer[:n])
        }
    }()

    // Goroutine 2: Read from WebSocket (UI), Write to PTY
    go func() {
        for {
            _, msg, err := ws.ReadMessage()
            if err != nil { return }
            pty.Write(msg)
        }
    }()
}`}
                                </code>
                            </pre>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 transition-colors">
                            Notice the absence of JSON parsing or string serialization. Vextor reads the raw byte array from the OS terminal and fires it directly into the <code>xterm.js</code> WebGL canvas. This achieves near-native, zero-latency rendering.
                        </p>
                    </section>

                    {/* SECURITY INTERCEPTOR */}
                    <section id="security-interceptor" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3 transition-colors">
                            <FiShield className="text-cyan-600 dark:text-cyan-500" />
                            03. Deterministic Security Interception
                        </h2>
                        <p className="mb-4">
                            The Go backend is not just a blind pipe; it acts as Vextor AI's absolute security gatekeeper. Because AI models can occasionally hallucinate dangerous commands (e.g., executing a destructive <code>git reset --hard</code> when you asked for a soft reset), executing them blindly is a severe vulnerability.
                        </p>

                        <div className="p-6 rounded-2xl border border-emerald-600/30 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/5 flex gap-5 items-start mt-8 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-emerald-600/10 dark:bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                <FiTerminal className="text-emerald-600 dark:text-emerald-400 w-4 h-4" />
                            </div>
                            <div>
                                <h4 className="text-slate-900 dark:text-white font-bold text-lg mb-2 transition-colors">Application-Layer Firewall</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed transition-colors mb-4">
                                    Before the Go server pipes an AI-generated command into the OS PTY, it parses the buffer against a deterministic array of destructive signatures.
                                </p>
                                <div className="text-xs font-mono bg-emerald-600/10 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 p-3 rounded border border-emerald-600/20 dark:border-emerald-500/20">
                                    BLOCKED: ["rm -rf", "git push --force", "drop table"]
                                </div>
                                <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed transition-colors mt-4">
                                    If a match is found, the Go server halts execution and emits a WebSocket event back to the React UI, forcing the developer to explicitly authorize the command via a physical button click.
                                </p>
                            </div>
                        </div>
                    </section>

                </div>

                {/* Pagination */}
                <div className="mt-20 pt-8 border-t border-slate-200 dark:border-white/5 flex justify-between items-center mb-20 transition-colors">
                    <Link href="/docs/rust-parser" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center gap-3 transition-colors group">
                        <span className="text-2xl group-hover:-translate-x-1 transition-transform">←</span>
                        <div className="text-left">
                            <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Previous</div>
                            <div className="font-medium text-sm">Rust AST Parser</div>
                        </div>
                    </Link>

                    {/* Note: This points to the next logical step (e.g. CLI) or back to home if this is the last page */}
                    <Link href="/docs" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center gap-3 transition-colors group">
                        <div className="text-right">
                            <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Return</div>
                            <div className="font-medium text-sm">Getting Started</div>
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
                        <a href="#node-pty-problem" className="text-sm text-cyan-600 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 transition-colors flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-cyan-600 dark:bg-cyan-500" />
                            The Node PTY Problem
                        </a>
                    </li>
                    <li>
                        <a href="#websocket-ipc" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors pl-3 border-l border-slate-200 dark:border-white/10 ml-0.5">
                            WebSocket Streaming
                        </a>
                    </li>
                    <li>
                        <a href="#security-interceptor" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors pl-3 border-l border-slate-200 dark:border-white/10 ml-0.5">
                            Security Interception
                        </a>
                    </li>
                </ul>
            </aside>

        </div>
    );
}