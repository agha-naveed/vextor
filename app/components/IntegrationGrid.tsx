"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaDocker, FaJava, FaMarkdown, FaPython, FaNodeJs, FaReact } from "react-icons/fa";
import { VscJson } from "react-icons/vsc";
import { FiGithub } from "react-icons/fi";
import { IoLogoJavascript } from "react-icons/io";
import { TbBrandCpp } from "react-icons/tb";
import { DiRedis } from "react-icons/di";
import { IoCodeSlashSharp } from "react-icons/io5";

const integrations = [
    { icon: IoLogoJavascript, name: "JavaScript" },
    { icon: FaPython, name: "Python" },
    { icon: VscJson, name: "JSON" },
    { icon: FaDocker, name: "Docker" },
    { icon: FaJava, name: "Java" },
    { icon: TbBrandCpp, name: "C++" },
    { icon: FaNodeJs, name: "Node.js" },
    { icon: FaReact, name: "React" },
    { icon: FiGithub, name: "GitHub" },
    { icon: IoCodeSlashSharp, name: "HTML" },
    { icon: DiRedis, name: "Redis" },
    { icon: FaMarkdown, name: "Markdown" },
];

export default function IntegrationGrid() {
    const gridRef = useRef<HTMLDivElement>(null);
    const flareRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const grid = gridRef.current;
        const flare = flareRef.current;
        if (!grid || !flare) return;

        gsap.set(flare, { xPercent: -50, yPercent: -50, left: "50%", top: "50%" });

        const handleMouseMove = (e: MouseEvent) => {
            const rect = grid.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            gsap.to(flare, {
                x: x - 600,
                y: y - 230,
                duration: 0.6,
                ease: "power2.out",
            });

            const cards = grid.querySelectorAll(".integration-card");
            cards.forEach((card) => {
                const cardRect = card.getBoundingClientRect();
                const cardX = e.clientX - cardRect.left;
                const cardY = e.clientY - cardRect.top;

                (card as HTMLElement).style.setProperty("--mouse-x", `${cardX}px`);
                (card as HTMLElement).style.setProperty("--mouse-y", `${cardY}px`);
            });
        };

        const handleMouseLeave = () => {
            gsap.to(flare, {
                x: "50%",
                y: "50%",
                duration: 1.2,
                ease: "elastic.out(1, 0.3)",
            });
        };

        grid.addEventListener("mousemove", handleMouseMove);
        grid.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            grid.removeEventListener("mousemove", handleMouseMove);
            grid.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, { scope: gridRef });

    return (
        <section className="relative w-full max-w-6xl mx-auto px-6 py-32 isolate">

            {/* Header Section */}
            <div className="text-center mb-16 relative z-10">
                <h2 className="text-xs font-black text-primary tracking-[0.4em] uppercase mb-4">
                    Language support
                </h2>
                <p className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tighter mb-6">
                    Fluent in what your stack already speaks.
                </p>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                    Language servers, formatters, and linters are configured out of the box — install nothing to get started.
                </p>
            </div>

            {/* Static Section Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-primary/10 dark:bg-primary/5 blur-[120px] -z-10 pointer-events-none" />

            {/* The Grid - Now using highly transparent white for dark mode */}
            <div
                ref={gridRef}
                className="relative grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 rounded-3xl border border-neutral-200 dark:border-white/10 bg-neutral-50/50 dark:bg-white/[0.02] overflow-hidden shadow-xl shadow-neutral-200/50 dark:shadow-none"
            >
                {/* Background moving flare */}
                <div
                    ref={flareRef}
                    className="absolute w-[300px] h-[300px] bg-primary/20 dark:bg-primary/10 blur-[80px] rounded-full pointer-events-none z-0"
                />

                {integrations.map((item, i) => (
                    <div
                        key={i}
                        className="integration-card group relative aspect-square rounded-2xl bg-white dark:bg-white/[0.04] backdrop-blur-xl border border-neutral-200 dark:border-white/5 flex flex-col items-center justify-center overflow-hidden z-10 transition-colors duration-500 hover:bg-neutral-50 dark:hover:bg-white/[0.08]"
                    >
                        {/* Hover Background Glow */}
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-primary/15"
                            style={{
                                WebkitMaskImage: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), black, transparent 40%)`,
                                maskImage: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), black, transparent 40%)`
                            }}
                        />

                        {/* Icon */}
                        <div className="relative z-20 mb-3 transition-transform duration-500 group-hover:scale-110 drop-shadow-none group-hover:drop-shadow-[0_0_10px_var(--color-primary)]">
                            <item.icon className="w-10 h-10 text-neutral-400 dark:text-white/60 transition-colors duration-500 group-hover:text-primary" />
                        </div>

                        {/* Label */}
                        <span className="relative z-20 text-[10px] font-mono tracking-widest uppercase text-neutral-500 dark:text-white/40 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors duration-500">
                            {item.name}
                        </span>

                        {/* Hover Border Glow */}
                        <div
                            className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-primary/80"
                            style={{
                                WebkitMaskImage: `radial-gradient(120px circle at var(--mouse-x) var(--mouse-y), black, transparent 80%)`,
                                maskImage: `radial-gradient(120px circle at var(--mouse-x) var(--mouse-y), black, transparent 80%)`
                            }}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}