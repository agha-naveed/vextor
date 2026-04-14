"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DocsSidebar() {
    const pathname = usePathname();

    // Helper function to check if the link is active
    const isActive = (path: string) => pathname === path;

    return (
        <aside className="hidden lg:block w-72 shrink-0 border-r border-slate-200 dark:border-white/5 h-[calc(100vh-[73px])] sticky top-[73px] overflow-y-auto py-8 pr-6 custom-scrollbar transition-colors duration-300">
            <nav className="space-y-8 pl-6">

                <div>
                    <h4 className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">Introduction</h4>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/docs" className={`block text-sm transition-colors ${isActive("/docs") ? "text-indigo-600 dark:text-indigo-400 font-medium" : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"}`}>Getting Started</Link>
                        </li>
                        <li>
                            <Link href="/docs/architecture" className={`block text-sm transition-colors ${isActive("/docs/architecture") ? "text-indigo-600 dark:text-indigo-400 font-medium" : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"}`}>Polyglot Architecture</Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">Core Engine</h4>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/docs/ui" className={`block text-sm transition-colors ${isActive("/docs/ui") ? "text-indigo-600 dark:text-indigo-400 font-medium" : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"}`}>React & Electron UI</Link>
                        </li>
                        <li>
                            <Link href="/docs/rust-parser" className={`block text-sm transition-colors ${isActive("/docs/rust-parser") ? "text-indigo-600 dark:text-indigo-400 font-medium" : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"}`}>Rust AST Parser</Link>
                        </li>
                        <li>
                            <Link href="/docs/go-pty" className={`block text-sm transition-colors ${isActive("/docs/go-pty") ? "text-indigo-600 dark:text-indigo-400 font-medium" : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"}`}>Go PTY Terminal</Link>
                        </li>
                    </ul>
                </div>

            </nav>
        </aside>
    );
}