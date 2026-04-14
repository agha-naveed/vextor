"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import myPic from "@/images/syed-naveed-dp.png";
import ContactOverlay from "./ContactOverlay";
import { LuCodeXml, LuFingerprint, LuQuote, LuZap } from "react-icons/lu";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function AboutDeveloper() {
    const container = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    useGSAP(() => {
        if (!container.current) return;

        gsap.to(".scrolling-signature", {
            xPercent: -20,
            ease: "none",
            scrollTrigger: {
                trigger: container.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            }
        });

        // 2. THE CONTENT REVEAL
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "top 60%",
            }
        });

        tl.from(".creator-img-box", {
            clipPath: "inset(0 100% 0 0)",
            duration: 1.5,
            ease: "expo.inOut"
        })
            .from(".creator-content > *", {
                opacity: 0,
                x: 40,
                stagger: 0.15,
                duration: 1,
                ease: "power3.out"
            }, "-=0.8");

    }, { scope: container });

    return (
        <section
            ref={container}
            className="relative min-h-screen bg-slate-50 dark:bg-[#06070a] flex items-center py-32 px-6 overflow-hidden transition-colors duration-500"
        >

            {/* Background Scrolling Signature */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap pointer-events-none z-0 select-none opacity-5 dark:opacity-[0.03]">
                <span className="scrolling-signature inline-block text-[18vw] font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                    SYED NAVEED ABBAS • SYED NAVEED ABBAS • SYED NAVEED ABBAS •
                </span>
            </div>

            {/* Ambient Glow */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[40vw] h-[40vw] bg-indigo-600/10 dark:bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                {/* Left Column: Image Box */}
                <div className="creator-img-box relative h-[600px] md:h-[850px] w-full group">
                    <div className="relative h-full w-full rounded-3xl overflow-hidden border border-slate-200 dark:border-white/5">
                        <Image
                            src={myPic}
                            alt="Syed Naveed Abbas"
                            fill
                            placeholder="blur"
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        />

                        {/* Blending Gradients - Now Theme Aware */}
                        <div className="absolute inset-0 bg-linear-to-t from-slate-50 dark:from-[#06070a] via-transparent to-transparent opacity-90" />
                        <div className="absolute inset-0 bg-linear-to-r from-slate-50 dark:from-[#06070a] via-transparent to-transparent opacity-40 lg:block hidden" />

                        {/* System Architect Badge */}
                        <div className="absolute bottom-8 left-8 flex items-center gap-3 px-4 py-2 bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-full shadow-lg dark:shadow-none">
                            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_10px_#6366f1]" />
                            <span className="text-[10px] font-mono font-bold text-slate-900 dark:text-white tracking-[0.2em] uppercase transition-colors">System Architect</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Content */}
                <div className="creator-content space-y-10">

                    <div className="space-y-4">
                        <div className="flex items-center gap-4 text-indigo-600 dark:text-indigo-400">
                            <div className="h-px w-10 bg-indigo-500" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">The Lone Architect</span>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-bold text-slate-900 dark:text-white tracking-tighter leading-[0.9] transition-colors">
                            Coding <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500 italic font-serif pr-4">
                                Alone.
                            </span>
                        </h2>
                    </div>

                    <div className="relative">
                        <LuQuote className="absolute -top-10 -left-10 w-20 h-20 text-indigo-500/10 -z-10" />
                        <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 font-light leading-relaxed transition-colors">
                            "Vextor AI isn't just a project—it's my answer to the friction of modern development.
                            As the sole developer, I don't compromise on speed, security, or the tiny details
                            that other tools overlook."
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-10 pt-4">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold uppercase text-[10px] tracking-widest transition-colors">
                                <LuZap className="w-4 h-4 text-indigo-500" />
                                Performance
                            </div>
                            <p className="text-slate-600 dark:text-slate-500 text-xs leading-relaxed transition-colors">
                                Engineered in Rust for zero-latency neural suggestions.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold uppercase text-[10px] tracking-widest transition-colors">
                                <LuFingerprint className="w-4 h-4 text-indigo-500" />
                                Integrity
                            </div>
                            <p className="text-slate-600 dark:text-slate-500 text-xs leading-relaxed transition-colors">
                                Your code never leaves your machine. Local-first by design.
                            </p>
                        </div>
                    </div>

                    <div className="pt-10 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-8 transition-colors">
                        <div className="group cursor-default">
                            <div className="text-slate-900 dark:text-white font-serif text-4xl group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-500">
                                Syed Naveed Abbas
                            </div>
                            <div className="text-slate-500 dark:text-slate-600 text-[10px] uppercase tracking-[0.4em] mt-2 transition-colors">Founder & Solo Engineer</div>
                        </div>

                        {/* Inverse Button Logic for Themes */}
                        <button onClick={() => setIsOpen(true)} className="group relative flex items-center gap-3 px-8 py-4 bg-slate-900 text-white dark:bg-white dark:text-black font-bold text-xs uppercase tracking-widest rounded-full overflow-hidden transition-all duration-300 hover:pr-12 hover:bg-indigo-600 dark:hover:bg-indigo-500 dark:hover:text-white">
                            <span>Let's Build</span>
                            <LuCodeXml className="w-4 h-4 absolute right-4 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                        </button>
                    </div>

                </div>

            </div>
            <ContactOverlay
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </section>
    );
}