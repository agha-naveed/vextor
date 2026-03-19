"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaGithub, FaTwitter } from "react-icons/fa";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Community() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const marqueeTween = useRef<gsap.core.Tween | null>(null);

    // Drag State Refs (Using refs prevents React from re-rendering during drag)
    const isDragging = useRef(false);
    const startX = useRef(0);
    const startProgress = useRef(0);
    const trackHalfWidth = useRef(0);

    const testimonials = [
        {
            name: "Alex Chen",
            role: "Frontend Engineer",
            handle: "@alexc_dev",
            icon: FaTwitter,
            quote: "Vextor AI feels like it reads my mind. The predictive autocomplete doesn't just guess syntax; it anticipates the actual architecture I'm trying to build."
        },
        {
            name: "Sarah Lee",
            role: "Fullstack Developer",
            handle: "@sarahcodes",
            icon: FaGithub,
            quote: "As someone who jumps between Rust and TypeScript daily, having a single, lightning-fast runtime that understands both without configuration is a game changer."
        },
        {
            name: "David Kim",
            role: "DevOps Specialist",
            handle: "@dkim_ops",
            icon: FaTwitter,
            quote: "The fact that this runs locally and my code never leaves my machine was the deciding factor. It's secure, incredibly fast, and beautifully designed."
        },
        {
            name: "Elena Rostova",
            role: "Systems Architect",
            handle: "@erostova",
            icon: FaGithub,
            quote: "I've tried every AI coding assistant on the market. Vextor is the only one that feels like a native extension of my own thought process rather than a clunky plugin."
        }
    ];

    // Duplicate array to create the infinite loop illusion
    const loopedTestimonials = [...testimonials, ...testimonials];

    useGSAP(() => {
        if (!sectionRef.current || !trackRef.current) return;

        // 1. Intro Fade-in Animation
        gsap.fromTo(".testimonial-intro",
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            }
        );

        // 2. The Infinite Marquee Timeline
        marqueeTween.current = gsap.to(trackRef.current, {
            xPercent: -50, // Moves exactly half the width of the duplicated track
            ease: "none",
            duration: 25, // Adjust for speed
            repeat: -1,
        });

    }, { scope: sectionRef });

    // --- DRAG & HOVER LOGIC ---

    const handleMouseEnter = () => {
        if (!isDragging.current) {
            marqueeTween.current?.pause();
        }
    };

    const handleMouseLeave = () => {
        isDragging.current = false;
        marqueeTween.current?.play();
        if (trackRef.current) trackRef.current.style.cursor = "grab";
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!trackRef.current || !marqueeTween.current) return;

        isDragging.current = true;
        startX.current = e.pageX;
        startProgress.current = marqueeTween.current.progress();

        // Cache the width of half the track (1 full loop) for drag math
        trackHalfWidth.current = trackRef.current.scrollWidth / 2;

        marqueeTween.current.pause();
        trackRef.current.style.cursor = "grabbing";
    };

    const handleMouseUp = () => {
        isDragging.current = false;
        if (trackRef.current) trackRef.current.style.cursor = "grab";
        // Note: We don't call play() here because the mouse is still hovering over the track.
        // It will automatically play when the mouse leaves.
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current || !marqueeTween.current) return;
        e.preventDefault(); // Stop text highlighting

        // Calculate how far the mouse has moved
        const deltaX = e.pageX - startX.current;

        // Convert pixel movement to a percentage of the track
        const progressDelta = deltaX / trackHalfWidth.current;

        // Dragging right (positive delta) means going backwards in timeline progress
        let newProgress = startProgress.current - progressDelta;

        // Math magic to perfectly wrap negative and positive progress between 0 and 1
        newProgress = ((newProgress % 1) + 1) % 1;

        // Apply the new position instantly
        marqueeTween.current.progress(newProgress);
    };

    return (
        <section ref={sectionRef} className="max-w-7xl mx-auto px-6 py-32 overflow-hidden select-none">

            {/* Header Section */}
            <div className="testimonial-intro opacity-0 text-center mb-16 relative z-10">
                <h2 className="text-xs font-black text-indigo-600 dark:text-indigo-500 tracking-[0.4em] uppercase mb-4">
                    Community Validated
                </h2>
                <p className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter mb-6">
                    Trusted by engineers.
                </p>
                <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                    Join the developers who have already made the switch to a frictionless workflow.
                </p>
            </div>

            {/* The Interactive Wrapper with Faded Edges */}
            <div
                className="relative w-full -mx-6 px-6 md:mx-0 md:px-0 py-8"
                style={{
                    maskImage: "linear-gradient(to right, transparent, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, transparent)",
                    WebkitMaskImage: "linear-gradient(to right, transparent, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, transparent)"
                }}
            >
                {/* The Track Event Listener 
                    This div captures all mouse movements and applies them to the GSAP tween.
                */}
                <div
                    className="flex w-max"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                >
                    <div
                        ref={trackRef}
                        className="flex w-max gap-6 cursor-grab"
                    >
                        {loopedTestimonials.map((user, i) => (
                            <div
                                key={i}
                                className="w-[300px] md:w-[400px] shrink-0 bg-slate-50 dark:bg-[#0d0e12] p-8 rounded-3xl border border-slate-200 dark:border-white/5 transition-colors hover:border-indigo-500/30 flex flex-col justify-between"
                            >
                                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-8 pointer-events-none">
                                    "{user.quote}"
                                </p>

                                <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-white/5 pointer-events-none">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="text-slate-900 dark:text-white font-bold text-xs">{user.name}</h4>
                                            <p className="text-slate-500 text-[10px] uppercase tracking-wider">{user.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-400">
                                        <span className="text-xs font-mono">{user.handle}</span>
                                        <user.icon className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </section>
    );
}