"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Quote, Zap, Fingerprint, Code2 } from "lucide-react";
import myPic from "@/images/syed-naveed-dp.png"
import ContactOverlay from "./ContactOverlay";
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
            className="relative min-h-screen bg-[#06070a] flex items-center py-32 px-6 overflow-hidden"
        >

            <div className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap pointer-events-none z-0 select-none opacity-[0.03]">
                <span className="scrolling-signature inline-block text-[18vw] font-black text-white uppercase tracking-tighter">
                    SYED NAVEED ABBAS • SYED NAVEED ABBAS • SYED NAVEED ABBAS •
                </span>
            </div>

            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[40vw] h-[40vw] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                <div className="creator-img-box relative h-[600px] md:h-[850px] w-full group">
                    <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5">
                        <Image
                            src={myPic}
                            alt="Syed Naveed Abbas"
                            fill
                            placeholder="blur"
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-linear-to-t from-[#06070a] via-transparent to-transparent opacity-90" />
                        <div className="absolute inset-0 bg-linear-to-r from-[#06070a] via-transparent to-transparent opacity-40 lg:block hidden" />

                        <div className="absolute bottom-8 left-8 flex items-center gap-3 px-4 py-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full">
                            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_10px_#6366f1]" />
                            <span className="text-[10px] font-mono font-bold text-white tracking-[0.2em] uppercase">System Architect</span>
                        </div>
                    </div>
                </div>

                <div className="creator-content space-y-10">

                    <div className="space-y-4">
                        <div className="flex items-center gap-4 text-indigo-400">
                            <div className="h-px w-10 bg-indigo-500" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">The Lone Architect</span>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-bold text-white tracking-tighter leading-[0.9]">
                            Coding <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-500 italic font-serif pr-4">
                                Alone.
                            </span>
                        </h2>
                    </div>

                    <div className="relative">
                        <Quote className="absolute -top-10 -left-10 w-20 h-20 text-indigo-500/10 -z-10" />
                        <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
                            "Vextor AI isn't just a project—it's my answer to the friction of modern development.
                            As the sole developer, I don't compromise on speed, security, or the tiny details
                            that other tools overlook."
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-10 pt-4">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-white font-bold uppercase text-[10px] tracking-widest">
                                <Zap className="w-4 h-4 text-indigo-500" />
                                Performance
                            </div>
                            <p className="text-slate-500 text-xs leading-relaxed">
                                Engineered in Rust for zero-latency neural suggestions.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-white font-bold uppercase text-[10px] tracking-widest">
                                <Fingerprint className="w-4 h-4 text-indigo-500" />
                                Integrity
                            </div>
                            <p className="text-slate-500 text-xs leading-relaxed">
                                Your code never leaves your machine. Local-first by design.
                            </p>
                        </div>
                    </div>

                    <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="group cursor-default">
                            <div className="text-white font-serif text-4xl group-hover:text-indigo-400 transition-colors duration-500">
                                Syed Naveed Abbas
                            </div>
                            <div className="text-slate-600 text-[10px] uppercase tracking-[0.4em] mt-2">Founder & Solo Engineer</div>
                        </div>

                        <button onClick={() => setIsOpen(true)} className="group relative flex items-center gap-3 px-8 py-4 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-full overflow-hidden transition-all duration-300 hover:pr-12">
                            <span>Let's Build</span>
                            <Code2 className="w-4 h-4 absolute right-4 opacity-0 group-hover:opacity-100 transition-all duration-300" />
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