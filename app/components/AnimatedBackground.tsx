"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function AnimatedBackground() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // 1. Flowing Data Effect (Animates the stroke of the path)
        gsap.fromTo(".vector-path", 
            { strokeDashoffset: 3000 },
            {
                strokeDashoffset: 0,
                duration: 40,
                repeat: -1,
                ease: "none",
            }
        );

        // 2. Float Top Line
        gsap.to(".vector-group-1", {
            y: 25,
            duration: 7,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // 3. Float Bottom Line 
        // (Moves in the same direction with a slight delay to maintain the gap)
        gsap.to(".vector-group-2", {
            y: 25,
            duration: 7,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 0.5 
        });
        
        // 4. Subtle background gradient breathing
        gsap.to(".ambient-glow", {
            opacity: 0.5,
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
            {/* Ambient Radial Gradients */}
            <div 
                className="ambient-glow absolute inset-0 transition-opacity duration-500 opacity-80"
                style={{
                    backgroundImage: `
                        radial-gradient(circle at 15% 0%, rgba(51,242,192,0.07), transparent 40%),
                        radial-gradient(circle at 85% 15%, rgba(110,231,255,0.06), transparent 45%)
                    `
                }}
            />

            <svg 
                className="w-full h-full opacity-60 dark:opacity-80 transition-opacity duration-500" 
                viewBox="0 0 1440 900" 
                preserveAspectRatio="none" 
                xmlns="http://www.w3.org/2000/svg" 
                aria-hidden="true"
            >
                <defs>
                    <linearGradient id="vgrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#33F2C0" stopOpacity="0.55"/>
                        <stop offset="100%" stopColor="#6EE7FF" stopOpacity="0"/>
                    </linearGradient>
                </defs>
                
                {/* TOP LINE: Positioned exactly as it was in the HTML */}
                <g className="vector-group-1">
                    <path 
                        className="vector-path"
                        d="M -100 180 C 300 60, 600 260, 1000 90 S 1500 40, 1600 160" 
                        stroke="url(#vgrad)" 
                        strokeWidth="1.2" 
                        fill="none" 
                        opacity="0.6"
                        strokeDasharray="3000"
                    />
                    <circle cx="1000" cy="90" r="3" fill="#33F2C0" opacity="0.8"/>
                </g>

                {/* BOTTOM LINE: Y-coordinates pushed down by 250px to guarantee a large gap */}
                <g className="vector-group-2">
                    <path 
                        className="vector-path"
                        d="M -100 670 C 250 750, 700 550, 1050 710 S 1450 810, 1600 670" 
                        stroke="url(#vgrad)" 
                        strokeWidth="1" 
                        fill="none" 
                        opacity="0.4"
                        strokeDasharray="3000"
                    />
                    <circle cx="1050" cy="710" r="3" fill="#6EE7FF" opacity="0.7"/>
                </g>
            </svg>
        </div>
    );
}