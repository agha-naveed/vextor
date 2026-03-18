"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// We pass an onComplete callback so the main page knows when to start its own animations
export default function Preloader({ onComplete }: { onComplete: () => void }) {
    const container = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState("Initializing core environment...");

    // Simulated terminal statuses
    const statuses = [
        "Initializing core environment...",
        "Loading neural completion models...",
        "Connecting to language servers...",
        "Compiling workspace assets...",
        "Vextor Engine Ready."
    ];

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                // Tell the parent component we are done
                onComplete();
            }
        });

        // 1. Animate the counter from 0 to 100
        tl.to({ val: 0 }, {
            val: 100,
            duration: 2.5,
            ease: "power2.inOut",
            onUpdate: function () {
                const currentProgress = Math.round(this.targets()[0].val);
                setProgress(currentProgress);

                // Update the fake terminal text based on progress
                if (currentProgress > 20 && currentProgress < 40) setStatus(statuses[1]);
                if (currentProgress >= 40 && currentProgress < 70) setStatus(statuses[2]);
                if (currentProgress >= 70 && currentProgress < 95) setStatus(statuses[3]);
                if (currentProgress >= 95) setStatus(statuses[4]);
            }
        });

        // 2. Pulse the glowing "V" logo while loading
        tl.to(".loader-logo", {
            scale: 1.05,
            opacity: 1,
            duration: 0.5,
            yoyo: true,
            repeat: 4,
            ease: "sine.inOut"
        }, "<"); // The "<" means play this at the same time as the previous animation

        // 3. The Exit Animation: Slide the content down and pull the curtain up
        tl.to(".loader-content", {
            y: 50,
            opacity: 0,
            duration: 0.6,
            ease: "power3.in"
        })
            .to(container.current, {
                yPercent: -100, // Slides the entire black overlay up and off the screen
                duration: 1,
                ease: "expo.inOut",
                borderRadius: "0 0 50% 50%" // Gives it a nice curving effect as it leaves
            }, "-=0.2"); // Overlap slightly with the content fade

    }, { scope: container });

    return (
        <div
            ref={container}
            className="fixed inset-0 z-[9999] bg-[#030014] flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Background ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="loader-content relative z-10 flex flex-col items-center w-full max-w-md px-6">

                {/* Glowing Logo Element */}
                <div className="loader-logo opacity-80 mb-12 relative flex items-center justify-center w-24 h-24">
                    <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-50 rounded-full" />
                    <div className="relative text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-purple-500">
                        V
                    </div>
                </div>

                {/* Progress Numbers */}
                <div className="flex items-baseline justify-between w-full mb-2">
                    <span className="text-white text-6xl font-black tracking-tighter tabular-nums">
                        {progress}
                    </span>
                    <span className="text-indigo-500 font-bold text-xl">%</span>
                </div>

                {/* Progress Bar Line */}
                <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden mb-6">
                    <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Terminal Status Text */}
                <div className="w-full flex items-center justify-start gap-3 text-slate-400 font-mono text-xs uppercase tracking-widest">
                    <div className="w-2 h-2 bg-indigo-500 animate-pulse rounded-sm" />
                    {status}
                </div>
            </div>
        </div>
    );
}