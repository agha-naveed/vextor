import { Box, Search, Gitlab, Sparkles } from 'lucide-react';

export default function IdeMockup() {
    return (
        <section className="relative max-w-5xl mx-auto px-4 mb-24 isolate">
            {/* Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-linear-to-r from-indigo-500/20 via-purple-500/20 to-indigo-500/20 blur-3xl rounded-full pointer-events-none z-0" />

            {/* Editor Container */}
            <div className="rounded-xl overflow-hidden bg-[#0d1017] border border-indigo-500/30 shadow-2xl relative z-20">
                {/* Editor Header */}
                <div className="h-8 bg-[#161a24] border-b border-white/5 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                    <div className="mx-auto text-xs text-slate-500 font-mono">App.tsx - Vector</div>
                </div>
                {/* Editor Body */}
                <div className="flex text-sm font-mono text-slate-400 h-[400px]">
                    {/* Sidebar */}
                    <div className="w-12 bg-[#0f121a] border-r border-white/5 flex flex-col items-center py-4 gap-4">
                        <Box className="w-5 h-5 text-indigo-400" />
                        <Search className="w-5 h-5 text-slate-600" />
                        <Gitlab className="w-5 h-5 text-slate-600" />
                    </div>
                    {/* Code Area */}
                    <div className="p-6 overflow-hidden relative w-full">
                        <div className="text-indigo-300 mb-2">import <span className="text-white">React</span> from <span className="text-emerald-300">'react'</span>;</div>
                        <div className="text-indigo-300 mb-6">import <span className="text-white">{"{ Button }"}</span> from <span className="text-emerald-300">'@vector/ui'</span>;</div>

                        <div className="text-purple-400">export default function <span className="text-blue-300">Dashboard</span>() {"{"}</div>
                        <div className="pl-4 text-slate-300">return (</div>
                        <div className="pl-8 text-slate-300">{"<div className=\"dashboard-container\">"}</div>
                        <div className="pl-12 text-slate-300">{"<Header />"}</div>
                        <div className="pl-12 text-slate-300">{"<MainContent>"}</div>

                        {/* Autocomplete Popup */}
                        <div className="ml-16 mt-2 bg-[#1e2330] border border-indigo-500/50 rounded-md shadow-xl w-80 text-xs overflow-hidden absolute z-10">
                            <div className="px-3 py-2 bg-indigo-600 text-white flex items-center gap-2">
                                <Sparkles className="w-3 h-3" />
                                <span>Generate Chart Component</span>
                            </div>
                            <div className="px-3 py-2 border-b border-white/5 hover:bg-white/5 cursor-pointer">Generate Data Table</div>
                            <div className="px-3 py-2 hover:bg-white/5 cursor-pointer">Generate User List</div>
                        </div>

                        <div className="pl-12 text-slate-300 mt-24">{"</MainContent>"}</div>
                        <div className="pl-8 text-slate-300">{"</div>"}</div>
                        <div className="pl-4 text-slate-300">)</div>
                        <div className="text-purple-400">{"}"}</div>
                    </div>
                </div>
            </div>
        </section>
    );
}