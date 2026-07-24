import logo from "@/images/logo2.png";
import ThemeToggle from './ThemeToggle';
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";

export default function Navbar() {
    return (
        <div className="w-full bg-main/70 border-b border-neutral-200 dark:border-white/10 backdrop-blur-sm z-200 sticky top-0">
            <nav className="flex items-center justify-between px-6 py-4 max-w-screen-2xl mx-auto">
                <Link href="/" className="flex items-center gap-2 font-semibold text-xl tracking-tight text-neutral-900 dark:text-white">
                    <Image src={logo} className="w-7" alt="Vextor Logo" />
                    VEXTOR AI
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    <Link href="/features" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Features</Link>
                    <Link href="/docs" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Docs</Link>
                    <Link href="/community" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Community</Link>
                    <Link href="/pricing" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Pricing</Link>
                </div>

                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <button className="bg-neutral-100 hover:bg-neutral-200 dark:bg-white/5 dark:hover:bg-white/10 text-neutral-900 dark:text-white px-5 py-2 rounded-md text-sm font-medium border border-neutral-200 dark:border-white/15 transition-colors cursor-pointer">
                        Download
                    </button>
                </div>
            </nav>
        </div>
    );
}