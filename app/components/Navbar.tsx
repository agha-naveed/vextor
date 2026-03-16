import { Search, SunMoon } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto border-b border-white/5">
            <div className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
                <div className="w-8 h-8 rounded bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                VECTOR AI
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                <a href="#" className="hover:text-white transition-colors">Features</a>
                <a href="#" className="hover:text-white transition-colors">Docs</a>
                <a href="#" className="hover:text-white transition-colors">Community</a>
                <a href="#" className="hover:text-white transition-colors">Pricing</a>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden lg:flex items-center gap-2 bg-[#13151f] rounded-full px-3 py-1.5 border border-white/10">
                    <SunMoon className="w-4 h-4 text-slate-400" />
                    <div className="w-4 h-4 rounded-full bg-indigo-500"></div>
                </div>
                <div className="relative hidden md:block">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-[#13151f] border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:border-indigo-500 text-white w-48"
                    />
                </div>
                <button className="bg-[#1a1d29] hover:bg-[#252a3b] text-white px-5 py-2 rounded-md text-sm font-medium border border-white/5 transition-colors">
                    Sign In
                </button>
            </div>
        </nav>
    );
}