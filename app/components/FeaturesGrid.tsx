import { LuTerminal, LuShieldCheck } from 'react-icons/lu';
import { FaRust } from 'react-icons/fa';
import { SiGo } from 'react-icons/si';

export default function FeaturesGrid() {
    return (
        <section className="gsap-features-section max-w-7xl mx-auto px-6 mb-24 relative isolate">

            {/* Ambient Background Glow matching your other sections */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-indigo-500/10 dark:bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="text-center mb-16 relative z-10">
                <h2 className="text-xs font-black text-indigo-600 dark:text-indigo-500 tracking-[0.4em] uppercase mb-4">
                    Polyglot Architecture
                </h2>
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tighter">
                    Engineering that defies the ceiling.
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">

                {/* Large Block 1 */}
                <div className="gsap-feature-card md:col-span-2 bg-white dark:bg-[#11141d] border border-slate-200 dark:border-white/5 p-8 rounded-2xl hover:border-indigo-500/40 dark:hover:border-indigo-500/40 shadow-sm hover:shadow-xl dark:shadow-none transition-all duration-500 flex flex-col justify-between group overflow-hidden relative">
                    {/* Inner Hover Glow */}
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/10 blur-[50px] rounded-full pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100" />

                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-indigo-600/10 dark:bg-indigo-400/10 relative z-10 transition-transform duration-500 group-hover:scale-110">
                        <LuTerminal className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Natural Language Terminal</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md leading-relaxed">
                            Type intent in plain English. The AI instantly translates it into exact CMD or PowerShell syntax and pipes it through our Go backend.
                        </p>
                    </div>
                </div>

                {/* Small Block 1 */}
                <div className="gsap-feature-card bg-white dark:bg-[#11141d] border border-slate-200 dark:border-white/5 p-8 rounded-2xl hover:border-amber-500/40 dark:hover:border-amber-500/40 shadow-sm hover:shadow-xl dark:shadow-none transition-all duration-500 flex flex-col justify-between group relative overflow-hidden">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-amber-600/10 dark:bg-amber-400/10 relative z-10 transition-transform duration-500 group-hover:scale-110">
                        <FaRust className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Rust AST Engine</h3>
                        <p className="text-slate-600 dark:text-slate-500 text-xs leading-relaxed">Background parsing offloaded to a memory-safe binary. Zero UI frame drops.</p>
                    </div>
                </div>

                {/* Small Block 2 */}
                <div className="gsap-feature-card bg-white dark:bg-[#11141d] border border-slate-200 dark:border-white/5 p-8 rounded-2xl hover:border-blue-500/40 dark:hover:border-blue-500/40 shadow-sm hover:shadow-xl dark:shadow-none transition-all duration-500 flex flex-col justify-between group relative overflow-hidden">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-blue-600/10 dark:bg-blue-400/10 relative z-10 transition-transform duration-500 group-hover:scale-110">
                        <SiGo className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Concurrent Go PTY</h3>
                        <p className="text-slate-600 dark:text-slate-500 text-xs leading-relaxed">A custom pseudo-terminal host that refuses to crash under heavy I/O workloads.</p>
                    </div>
                </div>

                {/* Large Block 2 */}
                <div className="gsap-feature-card md:col-span-2 bg-white dark:bg-[#11141d] border border-slate-200 dark:border-white/5 p-8 rounded-2xl hover:border-emerald-500/40 dark:hover:border-emerald-500/40 shadow-sm hover:shadow-xl dark:shadow-none transition-all duration-500 flex flex-col justify-between group overflow-hidden relative">
                    {/* Inner Hover Glow */}
                    <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-emerald-500/10 blur-[50px] rounded-full pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100" />

                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-emerald-600/10 dark:bg-emerald-400/10 relative z-10 transition-transform duration-500 group-hover:scale-110">
                        <LuShieldCheck className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Deterministic Security Guardrails</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md leading-relaxed">
                            Built-in application-layer interceptors actively block dangerous AI commands. Tied directly into your <span className="font-mono text-emerald-500 text-xs">.vextorignore</span> configurations.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}