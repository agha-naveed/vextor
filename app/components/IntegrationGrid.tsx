"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaDocker, FaJava, FaMarkdown, FaPython, FaRust } from "react-icons/fa";
import { VscJson } from "react-icons/vsc";
import { FiGithub } from "react-icons/fi";
import { IoLogoJavascript } from "react-icons/io";
import { TbBrandCpp } from "react-icons/tb";
import { DiRedis } from "react-icons/di";
import { FaGolang } from "react-icons/fa6";
import { IoCodeSlashSharp } from "react-icons/io5";

const integrations = [
    { icon: IoLogoJavascript, name: "JavaScript" },
    { icon: FaPython, name: "Python" },
    { icon: VscJson, name: "JSON" },
    { icon: FaDocker, name: "Docker" },
    { icon: FaJava, name: "Java" },
    { icon: TbBrandCpp, name: "C++" },
    { icon: FaRust, name: "Rust" },
    { icon: FaGolang, name: "Go" },
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
        <section className="relative w-full max-w-6xl mx-auto px-6 py-24 isolate">
            {/* Static Section Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-indigo-500/5 blur-[120px] -z-10" />

            <div
                ref={gridRef}
                className="relative grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 rounded-3xl border border-white/5 bg-[#0A0B10]/50 overflow-hidden"
            >
                <div
                    ref={flareRef}
                    className="absolute w-[300px] h-[300px] bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none z-0"
                />

                {integrations.map((item, i) => (
                    <div
                        key={i}
                        className="integration-card group relative aspect-square rounded-2xl bg-[#11141d] border border-white/10 flex flex-col items-center justify-center overflow-hidden z-10 transition-colors duration-500 hover:bg-[#161b26]"
                    >
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                            style={{
                                background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(99, 102, 241, 0.15), transparent 40%)`
                            }}
                        />

                        <div className="relative z-20 mb-3 transition-transform duration-500 group-hover:scale-110">
                            <item.icon
                                className="w-10 h-10 text-slate-600 transition-colors duration-500 group-hover:text-indigo-400"
                                style={{
                                    filter: `drop-shadow(0 0 10px rgba(99, 102, 241, 0.3))`
                                }}
                            />
                        </div>

                        <span className="relative z-20 text-[10px] font-mono tracking-widest uppercase text-slate-500 group-hover:text-white transition-colors duration-500">
                            {item.name}
                        </span>

                        <div
                            className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-transparent"
                            style={{
                                background: `radial-gradient(120px circle at var(--mouse-x) var(--mouse-y), rgba(99, 102, 241, 0.8), transparent 80%)`,
                                WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
                                WebkitMaskComposite: `destination-out`,
                                maskComposite: `exclude`,
                                padding: '1px'
                            }}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}