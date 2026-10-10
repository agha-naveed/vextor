"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Short boot sequence (~1s total). The CSS failsafe in globals.css hides the
// overlay by itself if JavaScript is slow or disabled, so content is never blocked.
const bootSequence = ["INDEXING_WORKSPACE", "PARSING_AST", "VEXTOR_CODE_READY"];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    const container = useRef<HTMLDivElement>(null);
    const [currentAction, setCurrentAction] = useState("INITIALIZING_ENGINE");

    useGSAP(() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) {
            onComplete();
            return;
        }

        const tl = gsap.timeline({ onComplete });

        bootSequence.forEach((action, i) => {
            tl.call(() => setCurrentAction(action), [], i * 0.22);
        });

        tl.to(".loader-line", { width: "100%", duration: 0.7, ease: "power2.out" }, 0)
            .to(".core-node", { scale: 2, opacity: 0, duration: 0.35, repeat: 1, yoyo: true, ease: "power1.inOut" }, 0)
            .to(".loader-content", { opacity: 0, y: -12, duration: 0.2, ease: "power2.in" }, 0.75)
            .to(container.current, { yPercent: -100, duration: 0.4, ease: "expo.inOut" }, 0.9);

        gsap.to(".outer-ring", { rotation: 360, duration: 3, repeat: -1, ease: "linear" });
    }, { scope: container });

    return (
        <div
            ref={container}
            role="status"
            aria-label="Loading Vextor Code"
            className="vextor-preloader fixed inset-0 z-[9999] bg-[#090C15] flex flex-col items-center justify-center overflow-hidden"
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-[#33F2C0]/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="loader-content relative z-10 flex flex-col items-center w-full max-w-sm px-6">
                <div className="relative w-14 h-14 mb-8 flex items-center justify-center">
                    <div className="core-node absolute w-2 h-2 bg-[#33F2C0] rounded-full shadow-[0_0_12px_#33F2C0]" />
                    <svg className="outer-ring w-full h-full text-[#7981A0] opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
                        <circle cx="12" cy="12" r="11" strokeDasharray="4 4" />
                    </svg>
                </div>

                <div className="w-full h-[1px] bg-[#1B2138] mb-4 relative overflow-hidden">
                    <div className="loader-line absolute top-0 left-0 h-full bg-gradient-to-r from-[#33F2C0] to-[#6EE7FF] w-0" />
                </div>

                <div className="w-full flex justify-between items-center text-[10px] font-mono tracking-widest text-[#7981A0]">
                    <span>{currentAction}</span>
                    <span className="text-[#33F2C0] ml-4 shrink-0">v2.4</span>
                </div>
            </div>
        </div>
    );
}
