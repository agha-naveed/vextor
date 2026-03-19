"use client";

import { FaGithub, FaLinkedin, FaArrowUp } from "react-icons/fa";
import logo from "@/images/logo.png"
import Image from "next/image";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <footer className="relative bg-slate-50 dark:bg-[#06070a] pt-24 pb-12 px-6 border-t border-slate-200 dark:border-white/5 transition-colors duration-500 overflow-hidden">

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/5 dark:bg-indigo-500/5 blur-[150px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto">

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20">

                    <div className="md:col-span-5 space-y-6">
                        <div className="flex items-center gap-3 text-slate-900 dark:text-white transition-colors">
                            <Image src={logo} alt="Vextor Logo" width={30} height={30} />
                            <span className="text-2xl font-bold tracking-tighter">Vextor AI</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-sm transition-colors">
                            The universal, zero-latency runtime. Engineered from the ground up to remove friction from the modern development stack.
                        </p>
                    </div>

                    <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        <div className="space-y-6">
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest transition-colors">Platform</h4>
                            <ul className="space-y-4">
                                <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Features</a></li>
                                <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Integrations</a></li>
                                <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Performance</a></li>
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest transition-colors">Resources</h4>
                            <ul className="space-y-4">
                                <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Documentation</a></li>
                                <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Manifesto</a></li>
                                <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Community</a></li>
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest transition-colors">Architect</h4>
                            <ul className="space-y-4">
                                <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Syed Naveed Abbas</a></li>
                                <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Direct Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 pt-8 border-t border-slate-200 dark:border-white/5 transition-colors">

                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-xs text-slate-500 dark:text-slate-600 font-mono transition-colors">
                        <span>© {currentYear} Vextor AI. All rights reserved.</span>
                        <span className="hidden md:inline">•</span>
                        <span>Engineered by <span className="text-slate-900 dark:text-white font-bold transition-colors">Syed Naveed Abbas</span></span>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-4">
                            <Link href="https://github.com/agha-naveed" target="_blank" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                                <FaGithub className="w-5 h-5" />
                            </Link>
                            <Link href="https://x.com/naveed_kazmi31" target="_blank" className="text-slate-400 dark:hover:text-white hover:text-black transition-colors">
                                <FaXTwitter className="w-5 h-5" />
                            </Link>
                            <Link href="https://linkedin.com/in/agha-naveed" target="_blank" className="text-slate-400 dark:hover:text-white hover:text-[#0A66C2] transition-colors">
                                <FaLinkedin className="w-5 h-5" />
                            </Link>
                        </div>

                        <div className="w-px h-6 bg-slate-200 dark:bg-white/10 transition-colors" />

                        <button
                            onClick={scrollToTop}
                            className="group flex items-center justify-center w-10 h-10 rounded-full bg-slate-200 dark:bg-white/5 hover:bg-indigo-600 dark:hover:bg-indigo-500 text-slate-600 dark:text-slate-400 hover:text-white transition-all duration-300"
                            aria-label="Scroll to top"
                        >
                            <FaArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
                        </button>
                    </div>

                </div>

            </div>
        </footer>
    );
}