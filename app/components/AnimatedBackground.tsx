"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function AnimatedBackground() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // 1. Data Flow Effect: Makes the lines look like they are actively drawing/moving
        gsap.fromTo(".vector-path", 
            { strokeDashoffset: 3000 },
            {
                strokeDashoffset: 0,
                duration: 35,
                repeat: -1,
                ease: "none",
            }
        );

        // 2. Gentle Floating: Both groups move in unison to maintain the exact gap
        gsap.to(".vector-group", {
            y: 20, // Moves up and down by 20px
            duration: 6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
        
        // 3. Ambient Glow Breathing: Subtle pulsing in the background
        gsap.to(".ambient-glow", {
            opacity: 0.6,
            scale: 1.05,
            duration: 8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

    }, { scope: containerRef });

    return (
        <div 
            ref={containerRef} 
            className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
        >
            {/* 
                Radial Gradients 
                Mapped exactly from body background-image, using Tailwind for primary color opacity 
            */}
            {/* <div className="ambient-glow absolute inset-0 transition-opacity duration-500 opacity-100">
                <div 
                    className="absolute w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-primary rounded-full blur-[100px] opacity-[0.07]"
                    style={{ top: '0%', left: '15%', transform: 'translate(-50%, -50%)' }}
                />
                <div 
                    className="absolute w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[#6EE7FF] rounded-full blur-[100px] opacity-[0.06]"
                    style={{ top: '15%', left: '85%', transform: 'translate(-50%, -50%)' }}
                />
            </div> */}

            {/* 
                Vector Field SVG 
                Coordinates matched perfectly to HTML. Groups are animated together.
            */}
            <svg 
                className="w-full h-full opacity-60 dark:opacity-80 transition-opacity duration-500" 
                viewBox="0 0 1440 900" 
                preserveAspectRatio="none" 
                xmlns="http://www.w3.org/2000/svg" 
                aria-hidden="true"
            >
                <defs>
                    <linearGradient id="vgrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.55"/>
                        <stop offset="100%" stopColor="#6EE7FF" stopOpacity="0"/>
                    </linearGradient>
                </defs>
                
                {/* TOP LINE & DOT */}
                <g className="vector-group">
                    <path 
                        className="vector-path"
                        d="M -100 180 C 300 60, 600 260, 1000 90 S 1500 40, 1600 160" 
                        stroke="url(#vgrad)" 
                        strokeWidth="1.2" 
                        fill="none" 
                        opacity="0.6"
                        strokeDasharray="3000"
                    />
                    <circle cx="1000" cy="90" r="3" fill="var(--color-primary)" opacity="0.8"/>
                </g>

                {/* BOTTOM LINE & DOT */}
                <g className="vector-group">
                    <path 
                        className="vector-path"
                        d="M -100 420 C 250 500, 700 300, 1050 460 S 1450 560, 1600 420" 
                        stroke="url(#vgrad)" 
                        strokeWidth="1" 
                        fill="none" 
                        opacity="0.4"
                        strokeDasharray="3000"
                    />
                    <circle cx="1050" cy="460" r="3" fill="#6EE7FF" opacity="0.7"/>
                </g>
            </svg>
        </div>
    );
}