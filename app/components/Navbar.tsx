import logo from "@/images/logo.png"
import ThemeToggle from './ThemeToggle';
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-main max-w-screen-2xl mx-auto border-b dark:border-white/5 border-black/5 w-full">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
                <Image src={logo} className="w-7" alt="Vextor Logo" />
                VEXTOR AI
            </Link>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500 dark:text-slate-400">
                <Link href="/features" className="hover:text-slate-900 dark:hover:text-white transition-colors">Features</Link>
                <Link href="/docs" className="hover:text-slate-900 dark:hover:text-white transition-colors">Docs</Link>
                <Link href="/community" className="hover:text-slate-900 dark:hover:text-white transition-colors">Community</Link>
                <Link href="/pricing" className="hover:text-slate-900 dark:hover:text-white transition-colors">Pricing</Link>
            </div>

            <div className="flex items-center gap-4">

                <ThemeToggle />

                <div className="relative hidden md:block">
                    <BsSearch className="w-3.7 h-3.7 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
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