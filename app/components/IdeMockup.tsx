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

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Simulated Code Contexts
const FILES = {
    'App.jsx': {
        icon: '⚛', color: 'text-blue-400',
        code: (
            <>
                <div><span className="text-purple-400">import</span> <span className="text-amber-300">"./App.css"</span>;</div>
                <div className="h-6"></div>
                <div><span className="text-purple-400">import</span> <span className="text-blue-300">Navbar</span> <span className="text-purple-400">from</span> <span className="text-amber-300">"./components/Navbar"</span>;</div>
                <div><span className="text-purple-400">import</span> <span className="text-blue-300">Hero</span> <span className="text-purple-400">from</span> <span className="text-amber-300">"./components/Hero"</span>;</div>
                <div><span className="text-purple-400">import</span> <span className="text-blue-300">Services</span> <span className="text-purple-400">from</span> <span className="text-amber-300">"./components/Services"</span>;</div>
                <div className="h-6"></div>
                <div><span className="text-purple-400">export default function</span> <span className="text-amber-200">App</span>() {'{'}</div>
                <div className="pl-4"><span className="text-purple-400">return</span> (</div>
                <div className="pl-8 text-slate-400">{'<>'}</div>
                <div className="bg-white/5 border border-white/10 -ml-2 pl-2 w-full rounded relative group cursor-text">
                    <span className="text-slate-400 pl-8">{'<'}</span><span className="text-blue-300">Navbar</span><span className="text-slate-400"> {'/>'}</span>
                    <span className="inline-block w-[2px] h-4 bg-slate-300 absolute mt-1 ml-1 animate-pulse"></span>
                </div>
                <div className="pl-8"><span className="text-slate-400">{'<'}</span><span className="text-blue-300">Hero</span><span className="text-slate-400"> {'/>'}</span></div>
                <div className="pl-8"><span className="text-slate-400">{'<'}</span><span className="text-blue-300">Services</span><span className="text-slate-400"> {'/>'}</span></div>
                <div className="pl-8 text-slate-400">{'</>'}</div>
                <div className="pl-4">);</div>
                <div>{'}'}</div>
            </>
        )
    },
    'main.py': {
        icon: '🐍', color: 'text-emerald-400',
        code: (
            <>
                <div><span className="text-purple-400">from</span> fastapi <span className="text-purple-400">import</span> FastAPI</div>
                <div><span className="text-purple-400">from</span> pydantic <span className="text-purple-400">import</span> BaseModel</div>
                <div className="h-6"></div>
                <div>app = FastAPI(title=<span className="text-amber-300">"Vextor AI Server"</span>)</div>
                <div className="h-6"></div>
                <div><span className="text-purple-400">class</span> <span className="text-amber-200">CodeRequest</span>(BaseModel):</div>
                <div className="pl-4">source: <span className="text-emerald-300">str</span></div>
                <div className="pl-4">model: <span className="text-emerald-300">str</span> = <span className="text-amber-300">"Llama 3.3"</span></div>
                <div className="h-6"></div>
                <div className="text-slate-500 italic"># Initialize AI Routes</div>
                <div><span className="text-blue-300">@app.post</span>(<span className="text-amber-300">"/api/v1/analyze"</span>)</div>
                <div><span className="text-purple-400">async def</span> <span className="text-blue-300">analyze_code</span>(req: CodeRequest):</div>
                <div className="pl-4"><span className="text-purple-400">return</span> {"{"}<span className="text-amber-300">"status"</span>: <span className="text-amber-300">"success"</span>, <span className="text-amber-300">"ast"</span>: []{"}"}</div>
                <div className="h-6"></div>
            </>
        )
    }
};

export default function IdeMockup() {
    const [activeSidebar, setActiveSidebar] = useState<'explorer' | 'git' | 'extensions' | 'timeMachine'>('explorer');
    const [activeFile, setActiveFile] = useState<'App.jsx' | 'main.py'>('App.jsx');
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
    const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
    const [activeModel, setActiveModel] = useState('Llama 3.3');
    const [terminalOutput, setTerminalOutput] = useState(false);
    const containerRef = useRef<HTMLElement>(null);
    
    // Simulate Terminal output when opened
    useEffect(() => {
        if (isTerminalOpen) {
            setTerminalOutput(false);
            const timer = setTimeout(() => setTerminalOutput(true), 600);
            return () => clearTimeout(timer);
        }
    }, [isTerminalOpen]);

    useGSAP(() => {
        gsap.to(".ide-window", {
            scale: 1.08, 
            ease: "power2.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 50%",  
                end: "top 15%", 
                scrub: 0.5,          
                toggleActions: "play reverse play reverse"
            }
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="gsap-ide relative max-w-[1200px] mx-auto px-4 mb-32 isolate">
            <style>{`
                .ide-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
                .ide-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .ide-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 4px; }
                .ide-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }
            `}</style>

            {/* Background Glow utilizing primary color */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 blur-[100px] rounded-full pointer-events-none z-0" />

            {/* Main IDE Window */}
            <div className="ide-window rounded-xl overflow-hidden bg-[#0A0D14] border border-white/10 shadow-2xl shadow-primary/10 relative z-20 flex flex-col h-[750px] font-mono text-sm text-slate-300">

                {/* Top Menu Bar - Windows Style */}
                <div className="h-9 w-full bg-[#0A0D14] border-b border-white/5 flex items-center justify-between pl-4 select-none">
                    <div className="flex items-center gap-1 shrink-0">
                        <span className="text-primary text-lg font-black mr-2">❯</span>
                        <div className="flex items-center gap-4 text-xs text-slate-400 font-sans">
                            <span className="hover:text-white cursor-pointer transition-colors">File</span>
                            <span className="hover:text-white cursor-pointer transition-colors">Edit</span>
                            <span className="hover:text-white cursor-pointer transition-colors">View</span>
                            <span className="hover:text-white cursor-pointer transition-colors">AI Tools</span>
                            <span className="hover:text-white cursor-pointer transition-colors">Help</span>
                        </div>
                    </div>
                    <div className="text-xs text-slate-500 font-sans absolute left-1/2 -translate-x-1/2 hidden md:block">
                        chat - Vextor AI
                    </div>
                    {/* Windows Native Controls */}
                    <div className="flex items-center h-full">
                        <div className="h-full px-4 flex items-center hover:bg-white/10 cursor-pointer text-slate-400 transition-colors"><VscChromeMinimize /></div>
                        <div className="h-full px-4 flex items-center hover:bg-white/10 cursor-pointer text-slate-400 transition-colors"><VscChromeMaximize /></div>
                        <div className="h-full px-4 flex items-center hover:bg-red-500 hover:text-white cursor-pointer text-slate-400 transition-colors"><VscClose /></div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex flex-1 overflow-hidden">

                    {/* Left Activity Bar */}
                    <div className="w-12 bg-[#0A0D14] border-r border-white/5 flex flex-col items-center py-4 justify-between z-10 shrink-0">
                        <div className="flex flex-col gap-6 w-full items-center">
                            <button onClick={() => setActiveSidebar('explorer')} className={`w-full flex justify-center border-l-2 ${activeSidebar === 'explorer' ? 'text-primary border-primary' : 'text-slate-500 border-transparent hover:text-slate-300'} transition-all`}>
                                <VscFiles className="w-6 h-6" />
                            </button>
                            <button className="w-full flex justify-center border-l-2 border-transparent text-slate-500 hover:text-slate-300 transition-colors">
                                <FiSearch className="w-5 h-5" />
                            </button>
                            <button onClick={() => setActiveSidebar('git')} className={`w-full flex justify-center border-l-2 ${activeSidebar === 'git' ? 'text-primary border-primary' : 'text-slate-500 border-transparent hover:text-slate-300'} transition-all`}>
                                <VscSourceControl className="w-5 h-5" />
                            </button>
                            <button onClick={() => setActiveSidebar('extensions')} className={`w-full flex justify-center border-l-2 ${activeSidebar === 'extensions' ? 'text-primary border-primary' : 'text-slate-500 border-transparent hover:text-slate-300'} transition-all`}>
                                <VscExtensions className="w-5 h-5" />
                            </button>
                            <button onClick={() => setActiveSidebar('timeMachine')} className={`w-full flex justify-center border-l-2 ${activeSidebar === 'timeMachine' ? 'text-primary border-primary' : 'text-slate-500 border-transparent hover:text-slate-300'} transition-all`}>
                                <VscHistory className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex flex-col gap-6 w-full items-center">
                            <button onClick={() => setIsChatOpen(!isChatOpen)} className={`w-full flex justify-center relative ${isChatOpen ? 'text-primary' : 'text-slate-500 hover:text-slate-300'} transition-colors`}>
                                <VscCommentDiscussion className="w-5 h-5" />
                                {isChatOpen && <div className="absolute top-0 right-2 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_var(--color-primary)]"></div>}
                            </button>
                            <button onClick={() => setIsTerminalOpen(!isTerminalOpen)} className={`w-full flex justify-center ${isTerminalOpen ? 'text-primary' : 'text-slate-500 hover:text-slate-300'} transition-colors`}>
                                <VscTerminal className="w-5 h-5" />
                            </button>
                            <button onClick={() => setIsThemeModalOpen(true)} className="w-full flex justify-center text-slate-500 hover:text-slate-300 transition-colors">
                                <VscSettingsGear className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Secondary Sidebar */}
                    <div className="w-64 bg-[#0F131A] border-r border-white/5 shrink-0 flex flex-col ide-scrollbar overflow-y-auto">

                        {/* 1. File Explorer */}
                        {activeSidebar === 'explorer' && (
                            <div className="py-4">
                                <div className="px-4 text-xs font-semibold text-slate-400 mb-2 tracking-wider">EXPLORER</div>
                                <div className="flex flex-col text-[13px] select-none">
                                    <div className="flex items-center gap-1 text-slate-300 px-4 py-1 hover:bg-white/5 cursor-pointer"><VscChevronDown className="w-4 h-4" /> .vextor</div>
                                    <div className="flex items-center gap-1 text-slate-300 px-4 py-1 hover:bg-white/5 cursor-pointer"><VscChevronDown className="w-4 h-4" /> node_modules</div>
                                    <div className="flex items-center gap-1 text-slate-300 px-4 py-1 hover:bg-white/5 cursor-pointer"><VscChevronDown className="w-4 h-4" /> server</div>

                                    <div
                                        onClick={() => setActiveFile('main.py')}
                                        className={`flex items-center gap-2 pl-8 pr-4 py-1 cursor-pointer transition-colors ${activeFile === 'main.py' ? 'bg-primary/10 text-primary border-l-2 border-primary' : 'text-slate-400 hover:bg-white/5 border-l-2 border-transparent'}`}
                                    >
                                        <span className="text-emerald-400">🐍</span> main.py
                                    </div>

                                    <div className="flex items-center gap-1 text-slate-300 px-4 py-1 hover:bg-white/5 cursor-pointer"><VscChevronDown className="w-4 h-4" /> src</div>

                                    <div
                                        onClick={() => setActiveFile('App.jsx')}
                                        className={`flex items-center gap-2 pl-8 pr-4 py-1 cursor-pointer transition-colors ${activeFile === 'App.jsx' ? 'bg-primary/10 text-primary border-l-2 border-primary' : 'text-slate-400 hover:bg-white/5 border-l-2 border-transparent'}`}
                                    >
                                        <span className="text-blue-400">⚛</span> App.jsx
                                    </div>

                                    <div className="flex items-center gap-2 pl-8 pr-4 py-1 text-slate-400 hover:bg-white/5 cursor-pointer border-l-2 border-transparent"><span className="text-blue-400">#</span> index.css</div>
                                    <div className="flex items-center gap-2 px-4 py-1 text-slate-400 hover:bg-white/5 cursor-pointer"><span className="text-slate-500">⚙</span> .env</div>
                                </div>
                            </div>
                        )}

                        {/* Git Panel */}
                        {activeSidebar === 'git' && (
                            <div className="p-4 flex flex-col h-full animate-in slide-in-from-left-4 duration-300">
                                <div className="text-xs font-semibold text-slate-400 mb-4 tracking-wider flex justify-between items-center">
                                    SOURCE CONTROL
                                    <div className="flex gap-2">
                                        <VscCloudUpload className="w-4 h-4 hover:text-white cursor-pointer" />
                                        <VscHistory className="w-4 h-4 hover:text-white cursor-pointer" />
                                    </div>
                                </div>
                                <textarea className="w-full bg-[#0A0D14] border border-white/10 rounded p-2 text-sm text-white resize-none outline-none focus:border-primary transition-colors h-24 mb-3 ide-scrollbar" placeholder="Message (Ctrl+Enter to commit)"></textarea>
                                <button className="w-full bg-primary hover:opacity-90 transition-opacity text-white rounded py-1.5 text-sm font-medium mb-6">✓ Stage files & commit</button>
                                <div className="flex-1 flex items-center justify-center text-slate-500 text-sm">No active changes.</div>
                            </div>
                        )}

                        {/* Extensions Panel */}
                        {activeSidebar === 'extensions' && (
                            <div className="p-4 flex flex-col h-full animate-in slide-in-from-left-4 duration-300">
                                <div className="text-xs font-semibold text-slate-400 mb-4 tracking-wider">MARKETPLACE</div>
                                <div className="relative mb-4">
                                    <input type="text" defaultValue="tailwind" className="w-full bg-[#0A0D14] border border-primary/50 rounded p-1.5 pl-2 text-sm text-white outline-none focus:border-primary transition-colors" />
                                </div>
                                <div className="flex flex-col gap-4">
                                    {[{ name: "Tailwind CSS Intelli...", author: "bradl", dl: "1,708,868" }, { name: "ESLint", author: "Microsoft", dl: "32,109,221" }].map((ext, i) => (
                                        <div key={i} className="flex flex-col gap-1.5 border-b border-white/5 pb-4">
                                            <div className="flex gap-2 items-center">
                                                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded shrink-0"></div>
                                                <div className="min-w-0">
                                                    <div className="font-semibold text-slate-200 text-[13px] truncate">{ext.name}</div>
                                                    <div className="text-xs text-slate-500">{ext.author}</div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center mt-1 text-xs text-slate-500">
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
                                <div className="text-xs font-semibold text-slate-400 mb-4 tracking-wider">TIME MACHINE</div>
                                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded py-2 text-sm font-medium transition-colors mb-6 shadow-[0_0_15px_rgba(37,99,235,0.3)]">📸 Save Current State</button>
                                <div className="relative pl-4 border-l-2 border-primary/30">
                                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1 shadow-[0_0_10px_var(--color-primary)]"></div>
                                    <div className="mb-1 text-slate-200 text-sm">Just Now</div>
                                    <div className="text-xs text-slate-500 mb-2">Manual Snapshot</div>
                                    <button className="text-xs bg-white/5 border border-white/10 px-3 py-1 rounded hover:bg-white/10 transition-colors flex items-center gap-2"><VscFiles /> View Code</button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Main Editor & Terminal Flex */}
                    <div className="flex-1 flex flex-col bg-[#0A0D14] min-w-0">
                        {/* Editor Tabs */}
                        <div className="h-10 bg-[#0A0D14] border-b border-white/5 flex items-center justify-between pr-4 select-none overflow-x-auto ide-scrollbar">
                            <div className="flex h-full">
                                {Object.entries(FILES).map(([filename, data]) => (
                                    <div
                                        key={filename}
                                        onClick={() => setActiveFile(filename as 'App.jsx' | 'main.py')}
                                        className={`flex items-center gap-2 px-4 text-[13px] border-r border-white/5 cursor-pointer transition-colors
                                            ${activeFile === filename ? 'bg-[#11151E] border-t-2 border-t-primary text-primary' : 'text-slate-500 hover:bg-white/5 border-t-2 border-t-transparent'}
                                        `}
                                    >
                                        <span className={data.color}>{data.icon}</span> {filename}
                                        <VscClose className={`ml-2 rounded p-0.5 ${activeFile === filename ? 'hover:bg-white/10' : 'opacity-0 hover:opacity-100 group-hover:opacity-100'}`} />
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                                <VscPlay className="w-4 h-4 text-emerald-400 cursor-pointer hover:text-emerald-300" />
                                <div className="flex items-center gap-1.5 text-xs bg-primary/10 text-primary border border-primary/20 px-2 py-1 rounded cursor-pointer hover:bg-primary/20 transition-colors shadow-[0_0_10px_var(--color-primary)]">
                                    <IoSparklesSharp className="w-3 h-3" /> AI Scan
                                </div>
                            </div>
                        </div>

                        {/* Code Editor */}
                        <div className="flex-1 overflow-auto p-4 flex font-mono text-[14px] leading-6 select-text ide-scrollbar">
                            <div className="flex flex-col text-slate-700 text-right pr-4 select-none">
                                {[...Array(25)].map((_, i) => <div key={i}>{i + 1}</div>)}
                            </div>
                            <div className="flex-1 text-slate-300 whitespace-pre animate-in fade-in duration-300">
                                {FILES[activeFile].code}
                            </div>
                        </div>

                        {/* Terminal Panel */}
                        {isTerminalOpen && (
                            <div className="h-64 border-t border-white/5 bg-[#0A0D14] flex flex-col shrink-0 animate-in slide-in-from-bottom-4 duration-300">
                                <div className="flex items-center justify-between px-4 h-9 border-b border-white/5 bg-[#0F131A]">
                                    <div className="flex gap-4">
                                        <div className="text-xs text-primary border-b-2 border-primary py-2 flex items-center gap-2 cursor-pointer">
                                            CMD + AI <VscClose className="text-slate-500 hover:text-white" />
                                        </div>
                                    </div>
                                    <VscClose onClick={() => setIsTerminalOpen(false)} className="text-slate-500 hover:text-white cursor-pointer" />
                                </div>
                                <div className="p-4 text-[13px] font-mono overflow-y-auto ide-scrollbar flex-1">
                                    <div className="flex items-center gap-2 text-slate-400 mb-4 bg-white/5 w-max px-3 py-1.5 rounded text-xs border border-white/5">
                                        <IoSparklesSharp className="text-primary" /> Ask AI to run a command (e.g., 'kill port 3000')
                                    </div>
                                    <div className="flex flex-col text-slate-300 gap-1">
                                        <div className="flex">
                                            <span className="text-emerald-400 mr-2">C:\Users\Syed Naveed Abbas\Desktop\Projects\chat{'>'}</span>
                                            <span>npm run dev</span>
                                        </div>
                                        {terminalOutput && (
                                            <div className="animate-in fade-in duration-500">
                                                <div className="text-slate-500">&gt; vextor-chat@1.0.0 dev</div>
                                                <div className="text-slate-500">&gt; vite</div>
                                                <br />
                                                <div className="text-emerald-400 font-bold">VITE v5.0.0 <span className="text-slate-400 font-normal">ready in 240 ms</span></div>
                                                <br />
                                                <div className="text-slate-300">➜  Local:   <span className="text-cyan-400 hover:underline cursor-pointer">http://localhost:5173/</span></div>
                                                <div className="text-slate-300">➜  Network: use --host to expose</div>
                                                <div className="flex mt-2">
                                                    <span className="text-emerald-400 mr-2">C:\Users\Syed Naveed Abbas\Desktop\Projects\chat{'>'}</span>
                                                    <span className="w-2 h-4 bg-slate-300 animate-pulse"></span>
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
                        <div className="w-80 bg-[#0F131A] border-l border-white/5 flex flex-col shrink-0 relative animate-in slide-in-from-right-8 duration-300">
                            <div className="h-12 flex items-center justify-between px-4 border-b border-white/5">
                                <div className="flex items-center gap-2 font-bold text-sm tracking-tight text-white">
                                    <span className="text-primary text-lg font-black">{'❯'}</span> VEXTOR AI
                                </div>
                                <VscClose onClick={() => setIsChatOpen(false)} className="text-slate-500 hover:text-white cursor-pointer" />
                            </div>

                            <div className="flex-1 p-4 overflow-y-auto ide-scrollbar flex flex-col gap-4">
                                <div className="self-end bg-primary text-white px-4 py-2 rounded-xl rounded-tr-sm text-sm shadow-lg shadow-primary/20 max-w-[85%]">
                                    What is React?
                                </div>
                                <div className="bg-[#161a24] border border-white/5 rounded-xl p-4 text-sm text-slate-300 leading-relaxed shadow-lg">
                                    **React** is a popular, open-source, front-end JavaScript library...
                                </div>
                            </div>

                            {/* Dropdown Overlay */}
                            {isModelDropdownOpen && (
                                <div className="absolute bottom-16 left-4 right-4 bg-[#1e2330] border border-primary/30 rounded-lg shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                                    {['Llama 3.3', 'GPT 3.5', 'Liquid AI'].map((model) => (
                                        <div
                                            key={model}
                                            onClick={() => { setActiveModel(model); setIsModelDropdownOpen(false); }}
                                            className="px-4 py-2 hover:bg-white/5 cursor-pointer text-sm text-slate-300 flex items-center gap-3 transition-colors"
                                        >
                                            <IoSparklesSharp className={activeModel === model ? "text-primary w-4 h-4" : "text-slate-600 w-4 h-4"} /> {model}
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="p-3 border-t border-white/5 bg-[#0A0D14]">
                                <div className="bg-[#161a24] border border-white/10 rounded-lg flex items-center px-3 py-2 focus-within:border-primary/50 transition-colors">
                                    <button
                                        onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                                        className="flex items-center gap-1 text-primary hover:opacity-80 transition-opacity text-xs font-semibold pr-2 border-r border-white/10 mr-2"
                                    >
                                        <IoSparklesSharp /> <VscChevronDown className="w-3 h-3" />
                                    </button>
                                    <input
                                        type="text"
                                        placeholder="Ask the AI..."
                                        className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder:text-slate-500"
                                    />
                                    <button className="text-slate-500 hover:text-primary transition-colors ml-2">
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.20308 1.04312C1.00481 0.954998 0.772341 1.00432 0.627577 1.16641C0.482813 1.3285 0.458494 1.56455 0.567162 1.75381L4.54228 8.68597L0.865955 13.5654C0.730303 13.7455 0.734898 13.9961 0.877685 14.1718C1.02047 14.3475 1.26622 14.3986 1.47209 14.2957L14.4721 7.79573C14.6596 7.70195 14.7812 7.50974 14.7812 7.30002C14.7812 7.09031 14.6596 6.8981 14.4721 6.80432L1.20308 1.04312ZM2.75306 2.76634L12.5976 7.04312L5.80282 8.35824L2.75306 2.76634ZM5.4859 9.35246L11.8398 7.56846L3.41443 12.0182L5.4859 9.35246Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                {/* Status Bar */}
                <div className="h-6 bg-blue-600 flex items-center justify-between px-3 text-[11px] text-white select-none shrink-0">
                    <div className="flex items-center gap-4">
                        <span>{activeFile} | {activeFile.split('.')[1]}</span>
                        <div className="bg-blue-700/50 px-2 py-0.5 rounded flex items-center gap-1 cursor-pointer hover:bg-blue-700 transition-colors">
                            Developer: Syed Naveed Abbas
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="cursor-pointer hover:text-white/80 transition-colors">Code Flow</span>
                        <span className="cursor-pointer hover:text-white/80 transition-colors">Blast Radius</span>
                        <span>Ln 12, Col 17</span>
                        <span className="flex items-center gap-1 font-semibold"><div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse"></div> ONLINE</span>
                    </div>
                </div>

                {/* Theme Modal Overlay */}
                {isThemeModalOpen && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-[#161a24] border border-white/10 rounded-xl w-[400px] shadow-2xl p-6 relative animate-in zoom-in-95 duration-200">
                            <VscClose onClick={() => setIsThemeModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer w-5 h-5" />
                            <h2 className="text-lg font-bold text-white mb-6">Theme & Appearance</h2>
                            <div className="mb-6">
                                <label className="block text-xs text-slate-400 mb-2">Select Active Theme</label>
                                <div className="relative">
                                    <select className="w-full bg-[#0A0D14] border border-white/10 rounded-lg p-3 text-sm text-white appearance-none outline-none focus:border-primary cursor-pointer">
                                        <option>GITHUB-DARK</option>
                                        <option>VEXTOR-DEFAULT</option>
                                    </select>
                                    <VscChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
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