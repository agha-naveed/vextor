import React, { useState, useEffect, useRef } from 'react';
import {
    VscFiles, VscSourceControl, VscExtensions, VscHistory,
    VscTerminal, VscCommentDiscussion, VscSettingsGear,
    VscPlay, VscClose, VscChevronDown, VscCloudUpload, VscChromeMinimize, VscChromeMaximize
} from 'react-icons/vsc';
import { FiSearch } from 'react-icons/fi';
import { IoSparklesSharp } from 'react-icons/io5';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Image from 'next/image';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Simulated Code Contexts with Light/Dark syntax highlighting
const FILES = {
    'App.jsx': {
        icon: 'react', color: 'text-orange-400',
        code: (
            <>
                <div><span className="text-purple-600 dark:text-purple-400">use</span> axum::{"{"}routing::post, Json, Router{"}"};</div>
                <div><span className="text-purple-600 dark:text-purple-400">use</span> serde::Deserialize;</div>
                <div className="h-6"></div>
                <div><span className="text-slate-500 dark:text-slate-400">#[derive(Deserialize)]</span></div>
                <div><span className="text-purple-600 dark:text-purple-400">struct</span> <span className="text-amber-600 dark:text-amber-200">CodeRequest</span> {"{"}</div>
                <div className="pl-4">source: <span className="text-emerald-600 dark:text-emerald-300">String</span>,</div>
                <div className="pl-4">model: <span className="text-emerald-600 dark:text-emerald-300">String</span>,</div>
                <div>{"}"}</div>
                <div className="h-6"></div>
                <div className="text-slate-400 dark:text-slate-500 italic">// Initialize AI Routes</div>
                <div><span className="text-purple-600 dark:text-purple-400">async fn</span> <span className="text-blue-600 dark:text-blue-300">analyze_code</span>(Json(req): Json&lt;CodeRequest&gt;) -&gt; Json&lt;serde_json::Value&gt; {"{"}</div>
                <div className="pl-4"><span className="text-purple-600 dark:text-purple-400">return</span> Json(serde_json::json!({"{"}</div>
                <div className="pl-8"><span className="text-amber-600 dark:text-amber-300">"status"</span>: <span className="text-amber-600 dark:text-amber-300">"success"</span>,</div>
                <div className="pl-8"><span className="text-amber-600 dark:text-amber-300">"ast"</span>: []</div>
                <div className="pl-4">{"}"}));</div>
                <div>{"}"}</div>
                <div className="h-6"></div>
            </>
        )
    },
    'main.rs': {
        icon: "rust", color: 'text-orange-400',
        code: (
            <>
                <div className="text-slate-400 dark:text-slate-500 italic">// Zero-copy SIMD WebSocket stream</div>
                <div><span className="text-purple-600 dark:text-purple-400">pub async fn</span> <span className="text-blue-600 dark:text-blue-300">lsp_stream</span>(ws: <span className="text-emerald-600 dark:text-emerald-300">WebSocket</span>) {"{"}</div>
                <div className="pl-4"><span className="text-purple-600 dark:text-purple-400">while let</span> <span className="text-emerald-600 dark:text-emerald-300">Some</span>(msg) = ws.next().<span className="text-purple-600 dark:text-purple-400">await</span> {"{"}</div>
                <div className="pl-8">tokio::spawn(<span className="text-purple-600 dark:text-purple-400">async move</span> {"{"}</div>
                <div className="pl-12"><span className="text-purple-600 dark:text-purple-400">unsafe</span> {"{"}</div>
                <div className="pl-16"><span className="text-purple-600 dark:text-purple-400">let</span> ptr = msg.unwrap().as_ptr() <span className="text-purple-600 dark:text-purple-400">as</span> *<span className="text-purple-600 dark:text-purple-400">const</span> _;</div>
                <div className="pl-16"><span className="text-purple-600 dark:text-purple-400">let</span> ast = std::arch::x86_64::_mm256_loadu_si256(ptr);</div>
                <div className="pl-16">ws.send(compile(ast)).<span className="text-purple-600 dark:text-purple-400">await</span>;</div>
                <div className="pl-12">{"}"}</div>
                <div className="pl-8">{"}"});</div>
                <div className="pl-4">{"}"}</div>
                <div>{"}"}</div>
            </>
        )
    }
};

export default function IdeMockup() {
    const [activeSidebar, setActiveSidebar] = useState<'explorer' | 'git' | 'extensions' | 'timeMachine'>('explorer');
    const [activeFile, setActiveFile] = useState<'App.jsx' | 'main.rs'>('App.jsx');
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
    const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
    const [activeModel, setActiveModel] = useState('Llama 3.3');
    const [terminalOutput, setTerminalOutput] = useState(false);
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (isTerminalOpen) {
            setTerminalOutput(false);
            const timer = setTimeout(() => setTerminalOutput(true), 600);
            return () => clearTimeout(timer);
        }
    }, [isTerminalOpen]);

    useGSAP(() => {
        gsap.fromTo(".ide-window", 
            { scale: 0.8, opacity: 0.8, y: 0 },
            {
                scale: 1,
                opacity: 1,
                y: 0,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                    end: "center 30%",
                    scrub: 1.1,
                }
            }
        );
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="gsap-ide relative max-w-7xl mx-auto px-4 mb-32 isolate">
            
            {/* Dynamic CSS for Light/Dark Scrollbars */}
            <style>{`
                .ide-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
                .ide-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .ide-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 0, 0, 0.15); border-radius: 4px; }
                .ide-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0, 0, 0, 0.25); }
                .dark .ide-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); }
                .dark .ide-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }
            `}</style>

            {/* Background Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-linear-to-r from-primary/10 via-purple-500/10 to-primary/10 blur-[100px] rounded-full pointer-events-none z-0" />

            {/* Main IDE Window */}
            <div className="ide-window rounded-xl overflow-hidden bg-white dark:bg-[#0A0D14] border border-neutral-200 dark:border-white/10 shadow-2xl shadow-black/10 dark:shadow-primary/10 relative z-20 flex flex-col h-160 font-mono text-sm text-neutral-700 dark:text-slate-300 transition-colors duration-300 w-full transform-gpu">

                {/* Top Menu Bar */}
                <div className="h-9 w-full bg-neutral-100 dark:bg-[#0A0D14] border-b border-neutral-200 dark:border-white/5 flex items-center justify-between pl-4 select-none transition-colors">
                    <div className="flex items-center gap-1 shrink-0">
                        <span className="text-primary text-lg font-black mr-2">
                            <Image src={"/images/logo2.png"} alt='Vextor Logo' width={13} height={13} />
                        </span>
                        <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-slate-400 font-sans hidden sm:flex">
                            <span className="hover:text-neutral-900 dark:hover:text-white cursor-pointer transition-colors">File</span>
                            <span className="hover:text-neutral-900 dark:hover:text-white cursor-pointer transition-colors">Edit</span>
                            <span className="hover:text-neutral-900 dark:hover:text-white cursor-pointer transition-colors">View</span>
                            <span className="hover:text-neutral-900 dark:hover:text-white cursor-pointer transition-colors">AI Tools</span>
                            <span className="hover:text-neutral-900 dark:hover:text-white cursor-pointer transition-colors">Help</span>
                        </div>
                    </div>
                    <div className="text-xs text-neutral-400 dark:text-slate-500 font-sans absolute left-1/2 -translate-x-1/2 hidden md:block">
                        chat - Vextor AI
                    </div>
                    {/* Native Controls */}
                    <div className="flex items-center h-full">
                        <div className="h-full px-4 flex items-center hover:bg-neutral-200 dark:hover:bg-white/10 cursor-pointer text-neutral-500 dark:text-slate-400 transition-colors"><VscChromeMinimize /></div>
                        <div className="h-full px-4 flex items-center hover:bg-neutral-200 dark:hover:bg-white/10 cursor-pointer text-neutral-500 dark:text-slate-400 transition-colors"><VscChromeMaximize /></div>
                        <div className="h-full px-4 flex items-center hover:bg-red-500 hover:text-white cursor-pointer text-neutral-500 dark:text-slate-400 transition-colors"><VscClose /></div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex flex-1 overflow-hidden">

                    {/* Left Activity Bar */}
                    <div className="w-12 bg-neutral-50 dark:bg-[#0A0D14] border-r border-neutral-200 dark:border-white/5 flex flex-col items-center py-4 justify-between z-10 shrink-0 hidden sm:flex transition-colors">
                        <div className="flex flex-col gap-6 w-full items-center">
                            <button onClick={() => setActiveSidebar('explorer')} className={`w-full flex justify-center border-l-2 ${activeSidebar === 'explorer' ? 'text-primary border-primary' : 'text-neutral-400 dark:text-slate-500 border-transparent hover:text-neutral-900 dark:hover:text-slate-300'} transition-all`}>
                                <VscFiles className="w-6 h-6" />
                            </button>
                            <button className="w-full flex justify-center border-l-2 border-transparent text-neutral-400 dark:text-slate-500 hover:text-neutral-900 dark:hover:text-slate-300 transition-colors">
                                <FiSearch className="w-5 h-5" />
                            </button>
                            <button onClick={() => setActiveSidebar('git')} className={`w-full flex justify-center border-l-2 ${activeSidebar === 'git' ? 'text-primary border-primary' : 'text-neutral-400 dark:text-slate-500 border-transparent hover:text-neutral-900 dark:hover:text-slate-300'} transition-all`}>
                                <VscSourceControl className="w-5 h-5" />
                            </button>
                            <button onClick={() => setActiveSidebar('extensions')} className={`w-full flex justify-center border-l-2 ${activeSidebar === 'extensions' ? 'text-primary border-primary' : 'text-neutral-400 dark:text-slate-500 border-transparent hover:text-neutral-900 dark:hover:text-slate-300'} transition-all`}>
                                <VscExtensions className="w-5 h-5" />
                            </button>
                            <button onClick={() => setActiveSidebar('timeMachine')} className={`w-full flex justify-center border-l-2 ${activeSidebar === 'timeMachine' ? 'text-primary border-primary' : 'text-neutral-400 dark:text-slate-500 border-transparent hover:text-neutral-900 dark:hover:text-slate-300'} transition-all`}>
                                <VscHistory className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex flex-col gap-6 w-full items-center">
                            <button onClick={() => setIsChatOpen(!isChatOpen)} className={`w-full flex justify-center relative ${isChatOpen ? 'text-primary' : 'text-neutral-400 dark:text-slate-500 hover:text-neutral-900 dark:hover:text-slate-300'} transition-colors`}>
                                <VscCommentDiscussion className="w-5 h-5" />
                                {isChatOpen && <div className="absolute top-0 right-2 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_var(--color-primary)]"></div>}
                            </button>
                            <button onClick={() => setIsTerminalOpen(!isTerminalOpen)} className={`w-full flex justify-center ${isTerminalOpen ? 'text-primary' : 'text-neutral-400 dark:text-slate-500 hover:text-neutral-900 dark:hover:text-slate-300'} transition-colors`}>
                                <VscTerminal className="w-5 h-5" />
                            </button>
                            <button onClick={() => setIsThemeModalOpen(true)} className="w-full flex justify-center text-neutral-400 dark:text-slate-500 hover:text-neutral-900 dark:hover:text-slate-300 transition-colors">
                                <VscSettingsGear className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Secondary Sidebar */}
                    <div className="w-48 lg:w-64 bg-neutral-50/50 dark:bg-[#0F131A] border-r border-neutral-200 dark:border-white/5 shrink-0 flex flex-col ide-scrollbar overflow-y-auto hidden md:flex transition-colors">

                        {/* File Explorer */}
                        {activeSidebar === 'explorer' && (
                            <div className="py-4 font-sans">
                                <div className="px-4 text-xs font-semibold text-neutral-500 dark:text-slate-400 mb-2 tracking-wider">EXPLORER</div>
                                <div className="flex flex-col text-[13px] select-none">
                                    <div className="flex items-center gap-1 text-neutral-700 dark:text-slate-300 px-4 py-1 hover:bg-neutral-200/50 dark:hover:bg-white/5 cursor-pointer"><VscChevronDown className="w-4 h-4" /> .vextor</div>
                                    <div className="flex items-center gap-1 text-neutral-700 dark:text-slate-300 px-4 py-1 hover:bg-neutral-200/50 dark:hover:bg-white/5 cursor-pointer"><VscChevronDown className="w-4 h-4" /> node_modules</div>
                                    <div className="flex items-center gap-1 text-neutral-700 dark:text-slate-300 px-4 py-1 hover:bg-neutral-200/50 dark:hover:bg-white/5 cursor-pointer"><VscChevronDown className="w-4 h-4" /> server</div>

                                    <div
                                        onClick={() => setActiveFile('main.rs')}
                                        className={`flex items-center gap-2 pl-8 pr-4 py-1 cursor-pointer transition-colors ${activeFile === 'main.rs' ? 'bg-primary/10 text-primary dark:text-white border-l-2 border-primary' : 'text-neutral-600 dark:text-slate-400 hover:bg-neutral-200/50 dark:hover:bg-white/5 border-l-2 border-transparent'}`}
                                    >
                                        <span><RustIcon /></span> main.rs
                                    </div>

                                    <div className="flex items-center gap-1 text-neutral-700 dark:text-slate-300 px-4 py-1 hover:bg-neutral-200/50 dark:hover:bg-white/5 cursor-pointer"><VscChevronDown className="w-4 h-4" /> src</div>

                                    <div
                                        onClick={() => setActiveFile('App.jsx')}
                                        className={`flex items-center gap-2 pl-8 pr-4 py-1 cursor-pointer transition-colors ${activeFile === 'App.jsx' ? 'bg-primary/10 text-primary dark:text-white border-l-2 border-primary' : 'text-neutral-600 dark:text-slate-400 hover:bg-neutral-200/50 dark:hover:bg-white/5 border-l-2 border-transparent'}`}
                                    >
                                        <span className="text-blue-500 dark:text-blue-400"><ReactIcon /></span> App.jsx
                                    </div>

                                    <div className="flex items-center gap-2 pl-8 pr-4 py-1 text-neutral-600 dark:text-slate-400 hover:bg-neutral-200/50 dark:hover:bg-white/5 cursor-pointer border-l-2 border-transparent"><span className="text-blue-500 dark:text-blue-400">#</span> index.css</div>
                                    <div className="flex items-center gap-2 px-4 py-1 text-neutral-600 dark:text-slate-400 hover:bg-neutral-200/50 dark:hover:bg-white/5 cursor-pointer"><span className="text-neutral-400 dark:text-slate-500">⚙</span> .env</div>
                                </div>
                            </div>
                        )}

                        {/* Git Panel */}
                        {activeSidebar === 'git' && (
                            <div className="p-4 flex flex-col h-full animate-in slide-in-from-left-4 duration-300">
                                <div className="text-xs font-semibold text-neutral-500 dark:text-slate-400 mb-4 tracking-wider flex justify-between items-center">
                                    SOURCE CONTROL
                                    <div className="flex gap-2">
                                        <VscCloudUpload className="w-4 h-4 hover:text-neutral-900 dark:hover:text-white cursor-pointer" />
                                        <VscHistory className="w-4 h-4 hover:text-neutral-900 dark:hover:text-white cursor-pointer" />
                                    </div>
                                </div>
                                <textarea className="w-full bg-white dark:bg-[#0A0D14] border border-neutral-300 dark:border-white/10 rounded p-2 text-sm text-neutral-900 dark:text-white resize-none outline-none focus:border-primary transition-colors h-24 mb-3 ide-scrollbar" placeholder="Message (Ctrl+Enter to commit)"></textarea>
                                <button className="w-full bg-primary hover:opacity-90 transition-opacity text-white rounded py-1.5 text-sm font-medium mb-6">✓ Stage files & commit</button>
                                <div className="flex-1 flex items-center justify-center text-neutral-400 dark:text-slate-500 text-sm">No active changes.</div>
                            </div>
                        )}

                        {/* Extensions Panel */}
                        {activeSidebar === 'extensions' && (
                            <div className="p-4 flex flex-col h-full animate-in slide-in-from-left-4 duration-300">
                                <div className="text-xs font-semibold text-neutral-500 dark:text-slate-400 mb-4 tracking-wider">MARKETPLACE</div>
                                <div className="relative mb-4">
                                    <input type="text" defaultValue="tailwind" className="w-full bg-white dark:bg-[#0A0D14] border border-neutral-300 dark:border-primary/50 rounded p-1.5 pl-2 text-sm text-neutral-900 dark:text-white outline-none focus:border-primary transition-colors" />
                                </div>
                                <div className="flex flex-col gap-4">
                                    {[{ name: "Tailwind CSS Intelli...", author: "bradl", dl: "1,708,868" }, { name: "ESLint", author: "Microsoft", dl: "32,109,221" }].map((ext, i) => (
                                        <div key={i} className="flex flex-col gap-1.5 border-b border-neutral-200 dark:border-white/5 pb-4">
                                            <div className="flex gap-2 items-center">
                                                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded shrink-0"></div>
                                                <div className="min-w-0">
                                                    <div className="font-semibold text-neutral-800 dark:text-slate-200 text-[13px] truncate">{ext.name}</div>
                                                    <div className="text-xs text-neutral-500 dark:text-slate-500">{ext.author}</div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center mt-1 text-xs text-neutral-500 dark:text-slate-500">
                                                <span>↓ {ext.dl}</span>
                                                <button className="bg-primary hover:opacity-90 transition-opacity text-white px-3 py-0.5 rounded">Install</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Time Machine */}
                        {activeSidebar === 'timeMachine' && (
                            <div className="p-4 flex flex-col h-full animate-in slide-in-from-left-4 duration-300">
                                <div className="text-xs font-semibold text-neutral-500 dark:text-slate-400 mb-4 tracking-wider">TIME MACHINE</div>
                                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded py-2 text-sm font-medium transition-colors mb-6 shadow-[0_0_15px_rgba(37,99,235,0.3)]">📸 Save Current State</button>
                                <div className="relative pl-4 border-l-2 border-primary/30">
                                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1 shadow-[0_0_10px_var(--color-primary)]"></div>
                                    <div className="mb-1 text-neutral-800 dark:text-slate-200 text-sm">Just Now</div>
                                    <div className="text-xs text-neutral-500 dark:text-slate-500 mb-2">Manual Snapshot</div>
                                    <button className="text-xs bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 px-3 py-1 rounded hover:bg-neutral-200 dark:hover:bg-white/10 transition-colors flex items-center gap-2"><VscFiles /> View Code</button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Main Editor & Terminal Flex */}
                    <div className="flex-1 flex flex-col bg-white dark:bg-[#0A0D14] min-w-0 transition-colors">
                        
                        {/* Editor Tabs */}
                        <div className="h-10 bg-neutral-100 dark:bg-[#0A0D14] border-b border-neutral-200 dark:border-white/5 flex items-center justify-between pr-4 select-none overflow-x-auto ide-scrollbar transition-colors">
                            <div className="flex h-full">
                                {Object.entries(FILES).map(([filename, data]) => (
                                    <div
                                        key={filename}
                                        onClick={() => setActiveFile(filename as 'App.jsx' | 'main.rs')}
                                        className={`flex items-center gap-2 px-4 text-[13px] border-r border-neutral-200 dark:border-white/5 cursor-pointer transition-colors shrink-0
                                            ${activeFile === filename ? 'bg-white dark:bg-[#11151E] border-t-2 border-t-primary text-neutral-900 dark:text-white' : 'text-neutral-500 dark:text-slate-500 hover:bg-neutral-200/50 dark:hover:bg-white/5 border-t-2 border-t-transparent'}
                                        `}
                                    >
                                        <span>{data.icon === "rust" ? <RustIcon /> : <ReactIcon />}</span> {filename}
                                        <VscClose className={`ml-2 rounded p-0.5 ${activeFile === filename ? 'hover:bg-neutral-200 dark:hover:bg-white/10' : 'opacity-0 hover:opacity-100 group-hover:opacity-100'}`} />
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center gap-3 shrink-0 ml-4">
                                <VscPlay className="w-4 h-4 text-emerald-500 dark:text-emerald-400 cursor-pointer hover:text-emerald-600 dark:hover:text-emerald-300" />
                                <div className="flex items-center gap-1.5 text-xs bg-primary/10 text-primary border border-primary/20 px-2 py-1 rounded cursor-pointer hover:bg-primary/20 transition-colors shadow-[0_0_10px_var(--color-primary)]">
                                    <IoSparklesSharp className="w-3 h-3" /> AI Scan
                                </div>
                            </div>
                        </div>

                        {/* Code Editor */}
                        <div className="flex-1 overflow-auto p-4 flex font-mono text-[14px] leading-6 select-text ide-scrollbar">
                            <div className="flex flex-col text-neutral-400 dark:text-slate-700 text-right pr-4 select-none shrink-0">
                                {[...Array(25)].map((_, i) => <div key={i}>{i + 1}</div>)}
                            </div>
                            <div className="flex-1 text-neutral-800 dark:text-slate-300 whitespace-pre animate-in fade-in duration-300 min-w-max">
                                {FILES[activeFile].code}
                            </div>
                        </div>

                        {/* Terminal Panel */}
                        {isTerminalOpen && (
                            <div className="h-64 border-t border-neutral-200 dark:border-white/5 bg-neutral-50 dark:bg-[#0A0D14] flex flex-col shrink-0 animate-in slide-in-from-bottom-4 duration-300 transition-colors">
                                <div className="flex items-center justify-between px-4 h-9 border-b border-neutral-200 dark:border-white/5 bg-neutral-100 dark:bg-[#0F131A]">
                                    <div className="flex gap-4">
                                        <div className="text-xs text-primary border-b-2 border-primary py-2 flex items-center gap-2 cursor-pointer">
                                            CMD + AI <VscClose className="text-neutral-500 dark:text-slate-500 hover:text-neutral-900 dark:hover:text-white" />
                                        </div>
                                    </div>
                                    <VscClose onClick={() => setIsTerminalOpen(false)} className="text-neutral-500 dark:text-slate-500 hover:text-neutral-900 dark:hover:text-white cursor-pointer" />
                                </div>
                                <div className="p-4 text-[13px] font-mono overflow-y-auto ide-scrollbar flex-1">
                                    <div className="flex items-center gap-2 text-neutral-600 dark:text-slate-400 mb-4 bg-black/5 dark:bg-white/5 w-max px-3 py-1.5 rounded text-xs border border-black/5 dark:border-white/5">
                                        <IoSparklesSharp className="text-primary" /> Ask AI to run a command (e.g., 'kill port 3000')
                                    </div>
                                    <div className="flex flex-col text-neutral-700 dark:text-slate-300 gap-1">
                                        <div className="flex flex-wrap">
                                            <span className="text-emerald-600 dark:text-emerald-400 mr-2">C:\Users\Syed Naveed Abbas\Desktop\Projects\chat{'>'}</span>
                                            <span>npm run dev</span>
                                        </div>
                                        {terminalOutput && (
                                            <div className="animate-in fade-in duration-500">
                                                <div className="text-neutral-500 dark:text-slate-500">&gt; vextor-chat@1.0.0 dev</div>
                                                <div className="text-neutral-500 dark:text-slate-500">&gt; vite</div>
                                                <br />
                                                <div className="text-emerald-600 dark:text-emerald-400 font-bold">VITE v5.0.0 <span className="text-neutral-400 dark:text-slate-400 font-normal">ready in 240 ms</span></div>
                                                <br />
                                                <div className="text-neutral-700 dark:text-slate-300">➜  Local:   <span className="text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer">http://localhost:5173/</span></div>
                                                <div className="text-neutral-700 dark:text-slate-300">➜  Network: use --host to expose</div>
                                                <div className="flex mt-2">
                                                    <span className="text-emerald-600 dark:text-emerald-400 mr-2">C:\Users\Syed Naveed Abbas\Desktop\Projects\chat{'>'}</span>
                                                    <span className="w-2 h-4 bg-neutral-800 dark:bg-slate-300 animate-pulse"></span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* AI Chatbot Panel */}
                    {isChatOpen && (
                        <div className="w-64 lg:w-80 bg-neutral-50 dark:bg-[#0F131A] border-l border-neutral-200 dark:border-white/5 flex flex-col shrink-0 relative animate-in slide-in-from-right-8 duration-300 hidden md:flex transition-colors">
                            <div className="h-12 flex items-center justify-between px-4 border-b border-neutral-200 dark:border-white/5">
                                <div className="flex items-center gap-2 font-bold text-sm tracking-tight text-neutral-900 dark:text-white">
                                    <span className="text-primary text-lg font-black">{'❯'}</span> VEXTOR AI
                                </div>
                                <VscClose onClick={() => setIsChatOpen(false)} className="text-neutral-500 dark:text-slate-500 hover:text-neutral-900 dark:hover:text-white cursor-pointer" />
                            </div>

                            <div className="flex-1 p-4 overflow-y-auto ide-scrollbar flex flex-col gap-4">
                                <div className="self-end bg-primary text-white px-4 py-2 rounded-xl rounded-tr-sm text-sm shadow-lg shadow-primary/20 max-w-[85%]">
                                    What is React?
                                </div>
                                <div className="bg-white dark:bg-[#161a24] border border-neutral-200 dark:border-white/5 rounded-xl p-4 text-sm text-neutral-800 dark:text-slate-300 leading-relaxed shadow-lg">
                                    **React** is a popular, open-source, front-end JavaScript library...
                                </div>
                            </div>

                            {/* Dropdown Overlay */}
                            {isModelDropdownOpen && (
                                <div className="absolute bottom-16 left-4 right-4 bg-white dark:bg-[#1e2330] border border-neutral-200 dark:border-primary/30 rounded-lg shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                                    {['Llama 3.3', 'GPT 3.5', 'Liquid AI'].map((model) => (
                                        <div
                                            key={model}
                                            onClick={() => { setActiveModel(model); setIsModelDropdownOpen(false); }}
                                            className="px-4 py-2 hover:bg-neutral-100 dark:hover:bg-white/5 cursor-pointer text-sm text-neutral-800 dark:text-slate-300 flex items-center gap-3 transition-colors"
                                        >
                                            <IoSparklesSharp className={activeModel === model ? "text-primary w-4 h-4" : "text-neutral-400 dark:text-slate-600 w-4 h-4"} /> {model}
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="p-3 border-t border-neutral-200 dark:border-white/5 bg-neutral-100 dark:bg-[#0A0D14]">
                                <div className="bg-white dark:bg-[#161a24] border border-neutral-200 dark:border-white/10 rounded-lg flex items-center px-3 py-2 focus-within:border-primary/50 transition-colors shadow-sm">
                                    <button
                                        onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                                        className="flex items-center gap-1 text-primary hover:opacity-80 transition-opacity text-xs font-semibold pr-2 border-r border-neutral-200 dark:border-white/10 mr-2 shrink-0"
                                    >
                                        <IoSparklesSharp /> <VscChevronDown className="w-3 h-3" />
                                    </button>
                                    <input
                                        type="text"
                                        placeholder="Ask the AI..."
                                        className="flex-1 bg-transparent border-none outline-none text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-slate-500 w-full min-w-0"
                                    />
                                    <button className="text-neutral-400 dark:text-slate-500 hover:text-primary transition-colors ml-2 shrink-0">
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.20308 1.04312C1.00481 0.954998 0.772341 1.00432 0.627577 1.16641C0.482813 1.3285 0.458494 1.56455 0.567162 1.75381L4.54228 8.68597L0.865955 13.5654C0.730303 13.7455 0.734898 13.9961 0.877685 14.1718C1.02047 14.3475 1.26622 14.3986 1.47209 14.2957L14.4721 7.79573C14.6596 7.70195 14.7812 7.50974 14.7812 7.30002C14.7812 7.09031 14.6596 6.8981 14.4721 6.80432L1.20308 1.04312ZM2.75306 2.76634L12.5976 7.04312L5.80282 8.35824L2.75306 2.76634ZM5.4859 9.35246L11.8398 7.56846L3.41443 12.0182L5.4859 9.35246Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                {/* Status Bar (Always Blue) */}
                <div className="h-6 bg-blue-600 flex items-center justify-between px-3 text-[11px] text-white select-none shrink-0 overflow-hidden">
                    <div className="flex items-center gap-4 shrink-0">
                        <span>{activeFile} | {activeFile.split('.')[1]}</span>
                        <div className="bg-blue-700/50 px-2 py-0.5 rounded flex items-center gap-1 cursor-pointer hover:bg-blue-700 transition-colors hidden sm:flex">
                            Developer: Syed Naveed Abbas
                        </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                        <span className="cursor-pointer hover:text-white/80 transition-colors hidden md:inline">Code Flow</span>
                        <span className="cursor-pointer hover:text-white/80 transition-colors hidden md:inline">Blast Radius</span>
                        <span className="hidden sm:inline">Ln 12, Col 17</span>
                        <span className="flex items-center gap-1 font-semibold"><div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse"></div> ONLINE</span>
                    </div>
                </div>

                {/* Theme Modal Overlay */}
                {isThemeModalOpen && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-white dark:bg-[#161a24] border border-neutral-200 dark:border-white/10 rounded-xl w-[90%] max-w-[400px] shadow-2xl p-6 relative animate-in zoom-in-95 duration-200">
                            <VscClose onClick={() => setIsThemeModalOpen(false)} className="absolute top-4 right-4 text-neutral-500 dark:text-slate-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer w-5 h-5" />
                            <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-6">Theme & Appearance</h2>
                            <div className="mb-6">
                                <label className="block text-xs text-neutral-500 dark:text-slate-400 mb-2">Select Active Theme</label>
                                <div className="relative">
                                    <select className="w-full bg-neutral-50 dark:bg-[#0A0D14] border border-neutral-200 dark:border-white/10 rounded-lg p-3 text-sm text-neutral-900 dark:text-white appearance-none outline-none focus:border-primary cursor-pointer">
                                        <option>GITHUB-LIGHT</option>
                                        <option>VEXTOR-DEFAULT (DARK)</option>
                                    </select>
                                    <VscChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                                + Create Custom Theme
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

const RustIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
        <path fill="currentColor" d="m23.835 11.703l-1.008-.623l-.028-.294l.866-.807a.348.348 0 0 0-.116-.578l-1.106-.414a9 9 0 0 0-.087-.285l.69-.96a.346.346 0 0 0-.226-.544l-1.166-.19a9 9 0 0 0-.14-.261l.49-1.076a.34.34 0 0 0-.028-.336a.35.35 0 0 0-.3-.154l-1.185.041a7 7 0 0 0-.188-.227l.273-1.153a.347.347 0 0 0-.417-.417l-1.153.273l-.228-.188l.041-1.184a.344.344 0 0 0-.49-.328l-1.076.49l-.262-.14l-.19-1.167a.348.348 0 0 0-.545-.226l-.96.69a9 9 0 0 0-.285-.086L14.597.453a.348.348 0 0 0-.578-.116l-.807.867a9 9 0 0 0-.294-.028L12.295.168a.346.346 0 0 0-.59 0l-.623 1.008l-.294.028L9.98.337a.346.346 0 0 0-.578.116l-.414 1.106l-.285.086l-.959-.69a.348.348 0 0 0-.545.226l-.19 1.167a9 9 0 0 0-.262.14l-1.076-.49a.346.346 0 0 0-.49.328l.041 1.184a8 8 0 0 0-.228.187l-1.153-.272a.347.347 0 0 0-.417.417l.271 1.153l-.186.227l-1.184-.042a.346.346 0 0 0-.328.49l.49 1.077a9 9 0 0 0-.14.262l-1.166.19a.348.348 0 0 0-.226.544l.69.958l-.087.286l-1.106.414a.348.348 0 0 0-.116.578l.866.807a9 9 0 0 0-.028.294l-1.008.623a.344.344 0 0 0 0 .59l1.008.623q.012.147.028.294l-.866.807a.346.346 0 0 0 .116.578l1.106.415q.042.144.087.285l-.69.959a.345.345 0 0 0 .227.544l1.166.19q.069.132.14.262l-.49 1.076a.346.346 0 0 0 .328.49l1.183-.041q.093.115.187.227l-.27 1.154a.346.346 0 0 0 .416.417l1.153-.272q.113.096.228.187l-.041 1.184a.344.344 0 0 0 .49.327l1.076-.49q.13.073.262.14l.19 1.167a.348.348 0 0 0 .545.227l.959-.69a9 9 0 0 0 .285.086l.414 1.107a.345.345 0 0 0 .578.115l.808-.865l.294.03l.623 1.006a.347.347 0 0 0 .59 0l.623-1.007q.148-.013.294-.03l.807.866a.348.348 0 0 0 .578-.115l.414-1.107a9 9 0 0 0 .285-.087l.959.69a.345.345 0 0 0 .545-.226l.19-1.166l.262-.14l1.076.49a.347.347 0 0 0 .49-.328l-.041-1.184a7 7 0 0 0 .227-.187l1.153.272a.347.347 0 0 0 .417-.416l-.272-1.155q.095-.112.187-.227l1.184.041a.344.344 0 0 0 .328-.49l-.49-1.076q.072-.13.141-.262l1.166-.19a.348.348 0 0 0 .226-.544l-.69-.959l.087-.285l1.106-.414a.346.346 0 0 0 .116-.579l-.866-.807q.016-.147.028-.294l1.008-.624a.344.344 0 0 0 0-.589zm-6.742 8.355a.714.714 0 0 1 .299-1.396a.714.714 0 1 1-.3 1.396zm-.342-2.314a.65.65 0 0 0-.771.5l-.358 1.669a8.7 8.7 0 0 1-3.619.78a8.7 8.7 0 0 1-3.695-.815L7.95 18.21a.65.65 0 0 0-.772-.5l-1.473.317a9 9 0 0 1-.761-.898h7.167c.081 0 .136-.014.136-.088v-2.536c0-.074-.054-.088-.136-.088h-2.096v-1.608h2.268c.206 0 1.106.059 1.393 1.209c.09.353.288 1.504.424 1.873c.134.413.683 1.238 1.268 1.238h3.572a1 1 0 0 0 .13-.013a9 9 0 0 1-.813.952zm-9.914 2.28a.714.714 0 1 1-.3-1.396a.714.714 0 0 1 .3 1.396M4.117 8.997a.714.714 0 1 1-1.303.58a.714.714 0 0 1 1.304-.58m-.834 1.981l1.534-.682a.65.65 0 0 0 .33-.858l-.316-.715h1.244v5.602H3.567a8.8 8.8 0 0 1-.284-3.348zm6.734-.543V8.784h2.96c.153 0 1.08.177 1.08.87c0 .574-.712.78-1.296.78zm10.757 1.486q0 .329-.024.651h-.9c-.09 0-.127.059-.127.148v.413c0 .973-.548 1.184-1.03 1.238c-.457.052-.964-.191-1.027-.472c-.27-1.518-.72-1.843-1.43-2.403c.882-.56 1.799-1.386 1.799-2.492c0-1.193-.82-1.945-1.377-2.315c-.783-.516-1.65-.62-1.883-.62H5.468a8.77 8.77 0 0 1 4.907-2.77l1.098 1.152a.65.65 0 0 0 .918.02l1.227-1.173a8.78 8.78 0 0 1 6.004 4.276l-.84 1.898a.65.65 0 0 0 .33.859l1.618.718q.042.43.042.872zm-9.3-9.6a.713.713 0 1 1 .984 1.032a.714.714 0 0 1-.984-1.031m8.339 6.71a.71.71 0 0 1 .939-.362a.714.714 0 1 1-.94.364z"></path>
    </svg>
)

const ReactIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 128 128">
        <g fill="#61dafb">
            <circle cx={64} cy={64} r={11.4}></circle>
            <path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3c.6-2.4 1.1-4.8 1.5-7.1c2.1-13.2-.2-22.5-6.6-26.1c-1.9-1.1-4-1.6-6.4-1.6c-7 0-15.9 5.2-24.9 13.9c-9-8.7-17.9-13.9-24.9-13.9c-2.4 0-4.5.5-6.4 1.6c-6.4 3.7-8.7 13-6.6 26.1c.4 2.3.9 4.7 1.5 7.1c-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3c-.6 2.4-1.1 4.8-1.5 7.1c-2.1 13.2.2 22.5 6.6 26.1c1.9 1.1 4 1.6 6.4 1.6c7.1 0 16-5.2 24.9-13.9c9 8.7 17.9 13.9 24.9 13.9c2.4 0 4.5-.5 6.4-1.6c6.4-3.7 8.7-13 6.6-26.1c-.4-2.3-.9-4.7-1.5-7.1c2.4-.7 4.7-1.4 6.9-2.3c12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8M92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3c-.3 2.1-.8 4.3-1.4 6.6c-5.2-1.2-10.7-2-16.5-2.5c-3.4-4.8-6.9-9.1-10.4-13c7.4-7.3 14.9-12.3 21-12.3c1.3 0 2.5.3 3.5.9M81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6c-3.7.3-7.4.4-11.2.4c-3.9 0-7.6-.1-11.2-.4q-3.3-4.8-6-9.6c-1.9-3.3-3.7-6.7-5.3-10c1.6-3.3 3.4-6.7 5.3-10c1.8-3.2 3.9-6.4 6.1-9.6c3.7-.3 7.4-.4 11.2-.4c3.9 0 7.6.1 11.2.4q3.3 4.8 6 9.6c1.9 3.3 3.7 6.7 5.3 10c-1.7 3.3-3.4 6.6-5.3 10m8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3c-3.4.8-7 1.4-10.8 1.9c1.2-1.9 2.5-3.9 3.6-6c1.2-2.1 2.3-4.2 3.4-6.2M64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3c2.3.1 4.6.2 6.9.2s4.6-.1 6.9-.2c-2.2 2.9-4.5 5.7-6.9 8.3m-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9c1.1-3.3 2.3-6.8 3.8-10.3c1.1 2 2.2 4.1 3.4 6.1c1.2 2.2 2.4 4.1 3.6 6.1m-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3c3.4-.8 7-1.4 10.8-1.9c-1.2 1.9-2.5 3.9-3.6 6c-1.2 2.1-2.3 4.2-3.4 6.2M64 30.2c2.4 2.6 4.7 5.4 6.9 8.3c-2.3-.1-4.6-.2-6.9-.2s-4.6.1-6.9.2c2.2-2.9 4.5-5.7 6.9-8.3m22.2 21l-3.6-6c3.8.5 7.4 1.1 10.8 1.9c-1.1 3.3-2.3 6.8-3.8 10.3c-1.1-2.1-2.2-4.2-3.4-6.2M31.7 35c-1.7-10.5-.3-17.9 3.8-20.3c1-.6 2.2-.9 3.5-.9c6 0 13.5 4.9 21 12.3c-3.5 3.8-7 8.2-10.4 13c-5.8.5-11.3 1.4-16.5 2.5c-.6-2.3-1-4.5-1.4-6.6M7 64c0-4.7 5.7-9.7 15.7-13.4c2-.8 4.2-1.5 6.4-2.1c1.6 5 3.6 10.3 6 15.6c-2.4 5.3-4.5 10.5-6 15.5C15.3 75.6 7 69.6 7 64m28.5 49.3c-4.1-2.4-5.5-9.8-3.8-20.3c.3-2.1.8-4.3 1.4-6.6c5.2 1.2 10.7 2 16.5 2.5c3.4 4.8 6.9 9.1 10.4 13c-7.4 7.3-14.9 12.3-21 12.3c-1.3 0-2.5-.3-3.5-.9M96.3 93c1.7 10.5.3 17.9-3.8 20.3c-1 .6-2.2.9-3.5.9c-6 0-13.5-4.9-21-12.3c3.5-3.8 7-8.2 10.4-13c5.8-.5 11.3-1.4 16.5-2.5c.6 2.3 1 4.5 1.4 6.6m9-15.6c-2 .8-4.2 1.5-6.4 2.1c-1.6-5-3.6-10.3-6-15.6c2.4-5.3 4.5-10.5 6-15.5c13.8 4 22.1 10 22.1 15.6c0 4.7-5.8 9.7-15.7 13.4"></path>
        </g>
    </svg>
)