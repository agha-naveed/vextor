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
                <button className="gsap-hero-btn bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-lg cursor-pointer text-sm font-bold tracking-wide shadow-[0_0_20px_rgba(79,70,229,0.4)]">
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
                <span className="inline-block w-[0.12em] h-[1em] bg-indigo-500 ml-1 align-text-bottom animate-pulse" />
            )}
        </span>
    );
};