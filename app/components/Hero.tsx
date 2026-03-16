import React from 'react';

export default function Hero() {
    return (
        <header className="text-center pt-24 pb-16 px-4 relative z-10">
            <h1 className="text-3xl md:text-5xl font-roboto! lg:text-6xl font-bold text-white mb-6 leading-[62px]">
                THE INTELLIGENT IDE: <br />
                CODE SMARTER, FASTER, TOGETHER.
            </h1>
            <p className="max-w-2xl mx-auto text-slate-400 text-lg mb-10">
                Code faster with AI-powered autocomplete, automated refactoring, and seamless team collaboration.
            </p>
            <div className="flex justify-center gap-4">
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded text-sm font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                    DOWNLOAD FOR FREE
                </button>
                <button className="text-slate-300 hover:text-white px-8 py-3 rounded text-sm font-bold tracking-wide transition-colors">
                    VIEW FEATURES
                </button>
            </div>
        </header>
    );
}