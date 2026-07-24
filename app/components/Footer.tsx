"use client";

import { FaGithub, FaLinkedin, FaArrowUp } from "react-icons/fa";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import logo from "@/images/logo2.png"
import Image from "next/image";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <footer className="relative bg-neutral-50 dark:bg-[#06070a] pt-24 pb-12 px-6 border-t border-neutral-200 dark:border-white/5 transition-colors duration-500 overflow-hidden">

            <div className="max-w-7xl mx-auto">

                <div className="flex justify-between mb-16">
                    <p className="text-neutral-600 dark:text-neutral-400 text-2xl leading-relaxed max-w-sm transition-colors">
                        Engineered from the ground up to remove friction from the modern development stack.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 w-full md:w-auto">
                        <div className="space-y-6">
                            <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-widest transition-colors">Platform</h4>
                            <ul className="space-y-4">
                                <li><a href="#" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Features</a></li>
                                <li><a href="#" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Integrations</a></li>
                                <li><a href="#" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Performance</a></li>
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-widest transition-colors">Resources</h4>
                            <ul className="space-y-4">
                                <li><a href="#" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Documentation</a></li>
                                <li><a href="#" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Manifesto</a></li>
                                <li><a href="#" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Community</a></li>
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-widest transition-colors">Architect</h4>
                            <ul className="space-y-4">
                                <li><a href="#" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Syed Naveed Abbas</a></li>
                                <li><a href="#" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Direct Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Giant Brand Typography Header */}
                <div className="py-8 text-center select-none overflow-hidden">
                    <h1 className="text-[11rem] sm:text-[14rem] md:text-[17rem] font-semibold text-neutral-900/10 dark:text-white/10 tracking-tighter leading-none">
                        Vexto<span className="relative bottom-[20px] sm:bottom-[30px] md:bottom-[40px]">r</span> AI
                    </h1>
                </div>

                <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 pt-8 border-t border-neutral-200 dark:border-white/5 transition-colors">

                    <div className="md:col-span-5 space-y-6">
                        <div className="flex items-center gap-3 text-neutral-900 dark:text-white transition-colors">
                            <Image src={logo} alt="Vextor Logo" width={30} height={30} />
                            <span className="text-2xl font-semibold tracking-tighter">Vextor AI</span>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-xs text-neutral-500 dark:text-neutral-400 font-mono transition-colors">
                        <span>© {currentYear} Vextor AI. All rights reserved.</span>
                        <span className="hidden md:inline">•</span>
                        <span>Engineered by <span className="text-neutral-900 dark:text-white font-bold transition-colors">Syed Naveed Abbas</span></span>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-4">
                            <Link href="https://github.com/agha-naveed" target="_blank" className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                                <FaGithub className="w-5 h-5" />
                            </Link>
                            <Link href="https://x.com/naveed_kazmi31" target="_blank" className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                                <FaXTwitter className="w-5 h-5" />
                            </Link>
                            <Link href="https://linkedin.com/in/agha-naveed" target="_blank" className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                                <FaLinkedin className="w-5 h-5" />
                            </Link>
                        </div>

                        <div className="w-px h-6 bg-neutral-200 dark:bg-white/10 transition-colors" />

                        <button
                            onClick={scrollToTop}
                            className="group flex items-center justify-center w-10 h-10 rounded-full bg-neutral-200 dark:bg-white/5 hover:bg-neutral-900 dark:hover:bg-white text-neutral-600 dark:text-neutral-400 hover:text-white dark:hover:text-neutral-900 transition-all duration-300 cursor-pointer"
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