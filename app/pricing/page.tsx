import Link from "next/link";
import { FiCheck, FiCpu, FiZap, FiShield, FiUsers, FiLayers } from "react-icons/fi";

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-[#06070a] text-white relative overflow-hidden">
            {/* Background Glow Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10" style={{ backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`, backgroundSize: "40px 40px", color: "inherit" }} />

            <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32">
                
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                        Scale your workflow with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Vextor AI</span>
                    </h1>
                    <p className="text-lg text-neutral-400">
                        Whether you are hacking on the weekend or building enterprise software, we have a plan for you.
                    </p>
                </div>

                {/* Pricing Cards (3 Columns) */}
                <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
                    
                    {/* 1. Hobby Plan */}
                    <div className="rounded-3xl border border-white/10 bg-[#111]/50 backdrop-blur-xl p-8 flex flex-col transition hover:border-white/20">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-white mb-2">Hobby</h2>
                            <p className="text-neutral-400 text-sm">Perfect for weekend projects and testing the waters.</p>
                        </div>
                        <div className="mb-8 flex items-baseline gap-2">
                            <span className="text-4xl font-extrabold text-white">Free</span>
                        </div>
                        
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-neutral-300">
                                <FiCheck className="text-neutral-500 shrink-0" />
                                <span>1,000 Compute Credits / month</span>
                            </li>
                            <li className="flex items-center gap-3 text-neutral-300">
                                <FiCheck className="text-neutral-500 shrink-0" />
                                <span>Standard AI Models</span>
                            </li>
                            <li className="flex items-center gap-3 text-neutral-300">
                                <FiCheck className="text-neutral-500 shrink-0" />
                                <span>Basic Code Autocomplete</span>
                            </li>
                            <li className="flex items-center gap-3 text-neutral-300">
                                <FiCheck className="text-neutral-500 shrink-0" />
                                <span>Community Support</span>
                            </li>
                        </ul>

                        <Link 
                            href="/dashboard"
                            className="w-full py-3 px-6 rounded-xl font-bold text-center border border-white/10 hover:bg-white/5 transition block"
                        >
                            Current Plan
                        </Link>
                    </div>

                    {/* 2. Pro Plan (Highlighted in the middle) */}
                    <div className="rounded-3xl border border-blue-500/50 bg-blue-900/10 backdrop-blur-xl p-8 flex flex-col relative transform lg:-translate-y-4 shadow-2xl shadow-blue-900/20">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 text-black text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                            Most Popular
                        </div>

                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-white mb-2">Pro Developer</h2>
                            <p className="text-blue-200/70 text-sm">For professionals who need maximum power and speed.</p>
                        </div>
                        <div className="mb-8 flex items-baseline gap-2">
                            <span className="text-4xl font-extrabold text-white">$15</span>
                            <span className="text-neutral-400">/ month</span>
                        </div>
                        
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-white font-medium">
                                <FiZap className="text-blue-400 shrink-0" />
                                <span>10,000 Compute Credits / month</span>
                            </li>
                            <li className="flex items-center gap-3 text-white">
                                <FiCpu className="text-blue-400 shrink-0" />
                                <span>Premium Models (GPT-4o, Claude 3.5)</span>
                            </li>
                            <li className="flex items-center gap-3 text-white">
                                <FiLayers className="text-blue-400 shrink-0" />
                                <span>Advanced Codebase Indexing</span>
                            </li>
                            <li className="flex items-center gap-3 text-white">
                                <FiShield className="text-blue-400 shrink-0" />
                                <span>Priority Support</span>
                            </li>
                        </ul>

                        <button 
                            className="w-full py-3 px-6 rounded-xl font-bold text-center bg-blue-600 hover:bg-blue-500 text-white transition shadow-lg shadow-blue-600/20 cursor-pointer"
                        >
                            Upgrade to Pro
                        </button>
                    </div>

                    {/* 3. Team Plan */}
                    <div className="rounded-3xl border border-white/10 bg-[#111]/50 backdrop-blur-xl p-8 flex flex-col transition hover:border-white/20">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-white mb-2">Team</h2>
                            <p className="text-neutral-400 text-sm">For startups and agencies collaborating on codebases.</p>
                        </div>
                        <div className="mb-8 flex items-baseline gap-2">
                            <span className="text-4xl font-extrabold text-white">$39</span>
                            <span className="text-neutral-400">/ user / month</span>
                        </div>
                        
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-neutral-300">
                                <FiUsers className="text-neutral-400 shrink-0" />
                                <span>Shared Team Workspaces</span>
                            </li>
                            <li className="flex items-center gap-3 text-neutral-300">
                                <FiZap className="text-neutral-400 shrink-0" />
                                <span>Pooled Compute Credits</span>
                            </li>
                            <li className="flex items-center gap-3 text-neutral-300">
                                <FiLayers className="text-neutral-400 shrink-0" />
                                <span>Centralized Billing & Admin</span>
                            </li>
                            <li className="flex items-center gap-3 text-neutral-300">
                                <FiShield className="text-neutral-400 shrink-0" />
                                <span>Dedicated Account Manager</span>
                            </li>
                        </ul>

                        <button 
                            className="w-full py-3 px-6 rounded-xl font-bold text-center border border-white/20 bg-white/5 hover:bg-white/10 transition cursor-pointer"
                        >
                            Start Team Trial
                        </button>
                    </div>

                </div>

                {/* Footer / Trust Section */}
                <div className="mt-24 text-center">
                    <p className="text-neutral-500 text-sm">
                        Payments processed securely. You can cancel your subscription at any time.
                    </p>
                </div>

            </div>
        </main>
    );
}