"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaApple, FaWindows, FaLinux } from "react-icons/fa";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function DownloadCTA() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.fromTo(containerRef.current, 
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                }
            }
        );
    }, { scope: containerRef });

    return (
        <section className="px-6 py-24 relative z-10">
            <div 
                ref={containerRef}
                className="relative overflow-hidden max-w-5xl mx-auto backdrop-blur-sm text-center rounded-3xl py-20 px-8 border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-2xl dark:shadow-none"
            >
                {/* Radial Top Glow dynamically fetching the primary color via CSS color-mix */}
                <div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[500px] pointer-events-none" 
                    style={{ background: 'radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--color-primary) 12%, transparent), transparent 60%)' }}
                />
                
                <div className="relative z-10">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight mb-4">
                        Your next commit starts here.
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 text-lg mb-10">
                        Free to install, ready in under two minutes.
                    </p>
                    
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <button className="flex items-center gap-3 px-6 py-3 rounded-xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-neutral-200 text-sm font-medium hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors group cursor-pointer">
                            <FaApple className="w-5 h-5 text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
                            macOS
                        </button>
                        <button className="flex items-center gap-3 px-6 py-3 rounded-xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-neutral-200 text-sm font-medium hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors group cursor-pointer">
                            <FaWindows className="w-5 h-5 text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
                            Windows
                        </button>
                        <button className="flex items-center gap-3 px-6 py-3 rounded-xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-neutral-200 text-sm font-medium hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors group cursor-pointer">
                            <FaLinux className="w-5 h-5 text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
                            Linux
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}