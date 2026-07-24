"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const canvas = canvasRef.current;
        const ring = ringRef.current;
        if (!canvas || !ring) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        document.documentElement.classList.add("cursor-none");

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const TRAIL_LENGTH = 25; 
        const SPRING = 0.45;

        const mouse = { x: width / 2, y: height / 2 };
        const cursor = { x: mouse.x, y: mouse.y };
        const trail: any[] = Array.from({ length: TRAIL_LENGTH }, () => ({ x: mouse.x, y: mouse.y }));

        let isHovered = false;
        let isClicked = false;
        let animationFrameId: number;

        const onResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        const onMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;

            const target = e.target as HTMLElement;
            isHovered = !!target.closest("a, button, input, textarea, [role='button'], [data-cursor='link']");
        };

        const onMouseDown = () => (isClicked = true);
        const onMouseUp = () => (isClicked = false);

        window.addEventListener("resize", onResize);
        window.addEventListener("mousemove", onMouseMove, { passive: true });
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            cursor.x += (mouse.x - cursor.x) * SPRING;
            cursor.y += (mouse.y - cursor.y) * SPRING;

            trail.push({ x: cursor.x, y: cursor.y });
            if (trail.length > TRAIL_LENGTH) trail.shift();

            const isDark = document.documentElement.classList.contains("dark");
            const cometColor = isDark ? "rgba(255, 255, 255, 1)" : "rgba(15, 15, 15, 1)";
            
            ctx.fillStyle = cometColor;
            
            // Adjusted shadow blur to fit the smaller size
            ctx.shadowBlur = 10;
            ctx.shadowColor = isDark ? "rgba(255, 255, 255, 0.6)" : "rgba(15, 15, 15, 0.4)";

            // Made the base radius smaller (from 14 down to 8)
            const headRadius = isHovered ? 2.5 : 8; 

            if (trail.length > 1) {
                ctx.beginPath();
                let lastAngle = 0;

                for (let i = 0; i < trail.length; i++) {
                    const p = trail[i];
                    const nextP = trail[i + 1] || p;
                    const dx = nextP.x - p.x;
                    const dy = nextP.y - p.y;

                    if (dx === 0 && dy === 0) {
                        p.angle = lastAngle;
                    } else {
                        p.angle = Math.atan2(dy, dx);
                        lastAngle = p.angle;
                    }

                    const progress = i / (trail.length - 1);
                    const eased = Math.pow(progress, 4); 
                    const radius = headRadius * eased; 
                    const finalRadius = Math.max(0.1, radius);

                    p.leftX = p.x + Math.cos(p.angle + Math.PI / 2) * finalRadius;
                    p.leftY = p.y + Math.sin(p.angle + Math.PI / 2) * finalRadius;
                    p.rightX = p.x + Math.cos(p.angle - Math.PI / 2) * finalRadius;
                    p.rightY = p.y + Math.sin(p.angle - Math.PI / 2) * finalRadius;
                    p.radius = finalRadius;
                }

                ctx.moveTo(trail[0].rightX, trail[0].rightY);
                for (let i = 1; i < trail.length; i++) {
                    ctx.lineTo(trail[i].rightX, trail[i].rightY);
                }

                const head = trail[trail.length - 1];
                ctx.arc(head.x, head.y, head.radius, head.angle - Math.PI / 2, head.angle + Math.PI / 2);

                for (let i = trail.length - 2; i >= 0; i--) {
                    ctx.lineTo(trail[i].leftX, trail[i].leftY);
                }

                const tail = trail[0];
                ctx.arc(tail.x, tail.y, tail.radius, tail.angle + Math.PI / 2, tail.angle - Math.PI / 2);

                ctx.fill();
            }

            // THE FIX: Always draw a perfect full circle on top of the head coordinates.
            // This guarantees the front is never flattened into a half-circle when you stop moving.
            ctx.beginPath();
            ctx.arc(cursor.x, cursor.y, headRadius, 0, Math.PI * 2);
            ctx.fill();

            const scale = isClicked ? 0.7 : isHovered ? 1.8 : 1;
            const opacity = isHovered ? 1 : 0;
            ring.style.transform = `translate3d(${cursor.x}px, ${cursor.y}px, 0) translate(-50%, -50%) scale(${scale})`;
            ring.style.opacity = opacity.toString();

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener("resize", onResize);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
            document.documentElement.classList.remove("cursor-none");
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <>
            <canvas
                ref={canvasRef}
                className="pointer-events-none fixed inset-0 z-[9998] hidden lg:block"
            />
            <div
                ref={ringRef}
                className="pointer-events-none fixed left-0 top-0 z-[9999] hidden lg:block h-10 w-10 rounded-full border border-neutral-900/40 dark:border-white/40 bg-neutral-900/5 dark:bg-white/5 transition-all duration-200 ease-out will-change-transform"
                style={{ opacity: 0 }}
            />
        </>
    );
}