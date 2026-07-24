"use client"

import React, { useEffect, useRef, useState } from "react";

interface TypewriterTextProps {
    text: string;
    speed?: number;
    start?: boolean;
    onComplete?: () => void;
}

export default function Hero({ startTyping = false, onTypingComplete }: { startTyping?: boolean, onTypingComplete?: () => void }) {
    return (
        <header className="text-center pt-24 pb-16 px-4 relative z-10">
            <div className="gsap-hero-text">
                <h1 className="text-3xl md:text-5xl font-roboto! lg:text-6xl dark:text-white text-zinc-900 font-bold mb-6 leading-[62px] justify-items-center">
                    <TypewriterText
                        text={"THE INTELLIGENT IDE:\nCODE SMARTER, FASTER, TOGETHER."}
                        speed={50}
                        start={startTyping}
                        onComplete={onTypingComplete}
                    />
                </h1>
                <p className="gsap-hero-subtext max-w-2xl mx-auto dark:text-slate-400 text-zinc-600 text-lg mb-10">
                    Code faster with AI-powered autocomplete, automated refactoring, and seamless team collaboration.
                </p>
            </div>
            <div className="flex justify-center gap-4">
                {/* 
                    Fixed: Removed CSS transition classes that were conflicting with GSAP's .from() tween.
                    Swapped hardcoded indigo for bg-primary and var(--color-primary).
                */}
                <button className="gsap-hero-btn bg-primary hover:opacity-90 text-white px-8 py-3 rounded-lg cursor-pointer text-sm font-bold tracking-wide shadow-[0_0_20px] shadow-primary/60">
                    DOWNLOAD FOR FREE
                </button>
                <button className="gsap-hero-btn dark:text-slate-300 dark:hover:text-white text-zinc-700 hover:text-zinc-900 cursor-pointer px-8 py-3 rounded text-sm font-bold tracking-wide transition-colors">
                    VIEW FEATURES
                </button>
            </div>
        </header>
    );
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, speed = 50, start = false, onComplete }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const onCompleteRef = useRef(onComplete);
    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    useEffect(() => {
        if (!start) return;

        let currentLength = 0;
        setDisplayedText("");
        setIsTyping(true);

        setTimeout(() => {
            const typingInterval = setInterval(() => {
                currentLength++;
                setDisplayedText(text.substring(0, currentLength));

                if (currentLength >= text.length) {
                    clearInterval(typingInterval);
                    setIsTyping(false);
                    if (onCompleteRef.current) onCompleteRef.current();
                }
            }, speed);

            return () => clearInterval(typingInterval);
        }, 500)
    }, [text, speed, start]);

    return (
        <span className="text-3xl md:text-5xl font-roboto! lg:text-6xl dark:text-white text-zinc-900 font-bold mb-6 leading-[62px] justify-items-center">
            {displayedText.split("\n").map((line, index, array) => (
                <React.Fragment key={index}>
                    {line}
                    {index < array.length - 1 && <br />}
                </React.Fragment>
            ))}
            {isTyping && (
                <>
                    {/* Fixed: Typing cursor now uses bg-primary */}
                    <span
                        className="inline-block w-[0.12em] h-[1em] bg-primary ml-1 align-text-bottom"
                        style={{ animation: "ideBlink 0.9s step-start infinite" }}
                    />
                    <style>{`
            @keyframes ideBlink {
              50% { opacity: 0; }
            }
          `}</style>
                </>
            )}
        </span>
    );
};