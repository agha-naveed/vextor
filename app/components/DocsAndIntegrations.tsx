import React from 'react';
import { CheckCircle2, Github, Gitlab, Hexagon, Cloud, Box, Zap, Users, Wrench } from 'lucide-react';

export default function DocsAndIntegrations() {
    const notes = [
        'Enhanced contextual awareness',
        'Docker container live inspection',
        'Native database management UI',
        'Expanded Python support'
    ];

    const integrations = [Github, Gitlab, Hexagon, Cloud, Box, Zap, Users, Wrench];

    return (
        <section className="max-w-7xl mx-auto px-6 mb-24 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Docs Column */}
            <div>
                <h3 className="text-xl font-bold text-white mb-6">Docs</h3>
                <ul className="space-y-3 text-sm text-slate-400">
                    <li className="flex items-center gap-2 text-indigo-400 font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                        Getting Started
                    </li>
                    <li className="hover:text-white cursor-pointer transition-colors">Autocomplete Guide</li>
                    <li className="hover:text-white cursor-pointer transition-colors">Refactoring Guide</li>
                    <li className="hover:text-white cursor-pointer transition-colors">Integrations</li>
                    <li className="hover:text-white cursor-pointer transition-colors">API Reference</li>
                </ul>
            </div>

            {/* What's New Column */}
            <div className="bg-[#11141d] p-6 rounded-xl border border-white/5">
                <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-6">What's New in V1.2.0</h3>
                <ul className="space-y-4 text-sm text-slate-400 mb-6">
                    {notes.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
                <button className="bg-indigo-600/10 text-indigo-400 hover:bg-indigo-600/20 px-4 py-2 rounded text-xs font-bold transition-colors">
                    READ FULL NOTES
                </button>
            </div>

            {/* Integration Grid */}
            <div className="bg-[#11141d] p-6 rounded-xl border border-white/5">
                <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-6">Integration Grid</h3>
                <div className="grid grid-cols-4 gap-3">
                    {integrations.map((Icon, i) => (
                        <div key={i} className="aspect-square bg-[#1a1d29] rounded flex items-center justify-center hover:bg-indigo-500/10 transition-colors cursor-pointer border border-white/5">
                            <Icon className="w-6 h-6 text-slate-400" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}