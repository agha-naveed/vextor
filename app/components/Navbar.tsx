import logo from "@/images/logo.png"
import { Search } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import Image from "next/image";

export default function Navbar() {

    return (
        <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto border-b dark:border-white/5 border-black/5">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
                <Image src={logo} className="w-8" alt="Vextor Logo" />
                VEXTOR AI
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500 dark:text-slate-400">
                <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Features</a>
                <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Docs</a>
                <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Community</a>
                <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Pricing</a>
            </div>

            <div className="flex items-center gap-4">

                <ThemeToggle />

                <div className="relative hidden md:block">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-white dark:bg-[#13151f] border border-slate-200 dark:border-white/10 rounded-full pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white w-48 transition-colors"
                    />
                </div>
                <button className="bg-slate-100 hover:bg-slate-200 dark:bg-[#1a1d29] dark:hover:bg-[#252a3b] text-slate-900 dark:text-white px-5 py-2 rounded-md text-sm font-medium border border-slate-200 dark:border-white/5 transition-colors cursor-pointer">
                    Download
                </button>
            </div>
        </nav>
    );
}