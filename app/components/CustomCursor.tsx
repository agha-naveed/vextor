"use client";

import { useEffect, useState } from "react";

interface TrailPoint {
    x: number;
    y: number;
    id: number;
}

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
    const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
    const [trail, setTrail] = useState<TrailPoint[]>([]);
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches) return;
        setIsVisible(true);

        let animationFrameId: number;
        let counter = 0;

        const handleMouseMove = (e: MouseEvent) => {
            const newX = e.clientX;
            const newY = e.clientY;
            setMousePosition({ x: newX, y: newY });

            // Generate spread trail points
            counter++;
            if (counter % 2 === 0) {
                setTrail((prev) => [
                    { x: newX, y: newY, id: Date.now() + Math.random() },
                    ...prev.slice(0, 14) // Spread length
                ]);
            }

            const target = e.target as HTMLElement;
            const interactiveElement = target.closest("a, button, input, textarea, [role='button']");
            setIsHovered(!!interactiveElement);
        };

        const handleMouseDown = () => setIsClicked(true);
        const handleMouseUp = () => setIsClicked(false);
        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        const updateCursor = () => {
            setCursorPosition((prev) => {
                const dx = mousePosition.x - prev.x;
                const dy = mousePosition.y - prev.y;
                return {
                    x: prev.x + dx * 0.15,
                    y: prev.y + dy * 0.15,
                };
            });
            animationFrameId = requestAnimationFrame(updateCursor);
        };

        animationFrameId = requestAnimationFrame(updateCursor);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
            cancelAnimationFrame(animationFrameId);
        };
    }, [mousePosition.x, mousePosition.y]);

    if (!isVisible) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden lg:block">
            {/* Spread Trailing Particle Nodes */}
            {trail.map((point, index) => {
                const opacity = 1 - index / trail.length;
                const scale = 1 - (index / trail.length) * 0.7;
                return (
                    <div
                        key={point.id}
                        className="absolute rounded-full bg-neutral-400/30 dark:bg-white/20 -translate-x-1/2 -translate-y-1/2 transition-all duration-75"
                        style={{
                            left: `${point.x}px`,
                            top: `${point.y}px`,
                            width: `${14 * scale}px`,
                            height: `${14 * scale}px`,
                            opacity: opacity * 0.4,
                        }}
                    />
                );
            })}

            {/* Precise Core Dot */}
            <div
                className="absolute h-2.5 w-2.5 rounded-full bg-neutral-900 dark:bg-white -translate-x-1/2 -translate-y-1/2 shadow-sm transition-transform duration-75"
                style={{
                    left: `${mousePosition.x}px`,
                    top: `${mousePosition.y}px`,
                    transform: `translate(-50%, -50%) scale(${isClicked ? 0.5 : isHovered ? 1.8 : 1})`,
                }}
            />

            {/* Smooth Floating Outer Ring */}
            <div
                className={`absolute rounded-full border border-neutral-400 dark:border-white/40 -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out ${
                    isHovered 
                        ? "w-20 h-20 bg-neutral-900/5 dark:bg-white/10 border-neutral-900 dark:border-white scale-110" 
                        : "w-12 h-12 scale-100"
                }`}
                style={{
                    left: `${cursorPosition.x}px`,
                    top: `${cursorPosition.y}px`,
                    transform: `translate(-50%, -50%) scale(${isClicked ? 0.8 : isHovered ? 1.25 : 1})`,
                }}
            />
        </div>
    );
}