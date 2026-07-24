"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    const container = useRef<HTMLDivElement>(null);
    const [currentAction, setCurrentAction] = useState("INITIALIZING_ENGINE");

    // Simulated high-speed parsing logs tailored to your HTML messaging
    const bootSequence = [
        "INDEXING_WORKSPACE_FILES",
        "PARSING_SRC/CHECKOUT.SERVICE.TS",
        "ANALYZING_TESTS/CART.TEST.TS",
        "RESOLVING_AST_DEPENDENCIES",
        "COMPILING_CONTEXT_GRAPH",
        "VEXTOR_2.4_READY"
    ];

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: () => onComplete()
        });

        // 1. Cycle through the text rapidly to simulate fast processing
        bootSequence.forEach((action, index) => {
            tl.call(() => setCurrentAction(action), [], index * 0.35);
        });

        // 2. Animate the razor-thin progress line
        tl.to(".loader-line", {
            width: "100%",
            duration: 2.1,
            ease: "power2.inOut",
        }, 0);

        // 3. Pulse the core parsing node (cyan dot)
        tl.to(".core-node", {
            scale: 2,
            opacity: 0,
            duration: 0.7,
            repeat: 2,
            yoyo: true,
            ease: "power1.inOut"
        }, 0);

        // 4. Spin the dashed outer ring slowly
        gsap.to(".outer-ring", {
            rotation: 360,
            duration: 4,
            repeat: -1,
            ease: "linear",
        });

        // 5. Exit Animation: Fade out and slide up sharply
        tl.to(".loader-content", {
            opacity: 0,
            y: -20,
            duration: 0.4,
            ease: "power3.in"
        }, 2.2)
        .to(container.current, {
            yPercent: -100,
            duration: 0.7,
            ease: "expo.inOut",
        }, ">");

    }, { scope: container });

    return (
        <div 
            ref={container} 
            className="fixed inset-0 z-[9999] bg-[#090C15] flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Ambient Cyan Glow matching HTML CSS */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-[#33F2C0]/5 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="loader-content relative z-10 flex flex-col items-center w-full max-w-sm px-6">
                
                {/* Abstract Data Node Graphic */}
                <div className="relative w-14 h-14 mb-8 flex items-center justify-center">
                    <div className="core-node absolute w-2 h-2 bg-[#33F2C0] rounded-full shadow-[0_0_12px_#33F2C0]" />
                    <svg className="outer-ring w-full h-full text-[#7981A0] opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <circle cx="12" cy="12" r="11" strokeDasharray="4 4" />
                    </svg>
                </div>

                {/* Razor-thin Progress Bar */}
                <div className="w-full h-[1px] bg-[#1B2138] mb-4 relative overflow-hidden">
                    <div className="loader-line absolute top-0 left-0 h-full bg-gradient-to-r from-[#33F2C0] to-[#6EE7FF] w-0" />
                </div>

                {/* Terminal Monospace Text */}
                <div className="w-full flex justify-between items-center text-[10px] font-mono tracking-widest text-[#7981A0]">
                    <span>{currentAction}</span>
                    <span className="text-[#33F2C0] ml-4 shrink-0">v2.4</span>
                </div>

            </div>
        </div>
    );
}