export default function ComparisonTable() {
    return (
        <section className="max-w-6xl mx-auto px-6 py-24 relative z-10">
            <div className="text-center mb-16">
                <h2 className="text-xs font-black text-primary tracking-[0.4em] uppercase mb-4">Vextor vs. the rest</h2>
                <h3 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight">Built as an editor first.</h3>
            </div>

            <div className="overflow-x-auto rounded-3xl border backdrop-blur-sm border-neutral-200 dark:border-white/10 bg-white dark:bg-white/2 shadow-2xl dark:shadow-none">
                <table className="w-full text-left text-sm border-collapse whitespace-nowrap md:whitespace-normal">
                    <thead className="bg-neutral-50 dark:bg-white/5 border-b border-neutral-200 dark:border-white/10">
                        <tr>
                            <th className="p-6 font-semibold text-neutral-900 dark:text-white">Capability</th>
                            <th className="p-6 font-bold text-primary bg-primary/10">Vextor</th>
                            <th className="p-6 font-semibold text-neutral-900 dark:text-white">VS Code</th>
                            <th className="p-6 font-semibold text-neutral-900 dark:text-white">Other IDEs (Cursor, Antigravity etc)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-white/5">

                        <tr>
                            <td className="p-6 text-neutral-700 dark:text-neutral-300">Extensions run in an isolated sandbox</td>
                            <td className="p-6 text-primary font-bold bg-primary/5">Yes</td>
                            <td className="p-6 text-neutral-500">No — full editor trust</td>
                            <td className="p-6 text-neutral-500">No — same VS Code trust model</td>
                        </tr>
                        
                        <tr>
                            <td className="p-6 text-neutral-700 dark:text-neutral-300">Custom file exclusion (.vextorignore support)</td>
                            <td className="p-6 text-primary font-bold bg-primary/5">Yes</td>
                            <td className="p-6 text-neutral-500">No (.gitignore only)</td>
                            <td className="p-6 text-neutral-500">Varies</td>
                        </tr>

                        <tr>
                            <td className="p-6 text-neutral-700 dark:text-neutral-300">Focus Mode (Zero-distraction UI)</td>
                            <td className="p-6 text-primary font-bold bg-primary/5">Yes</td>
                            <td className="p-6 text-neutral-500">No</td>
                            <td className="p-6 text-neutral-500">Requires plugins</td>
                        </tr>

                        <tr>
                            <td className="p-6 text-neutral-700 dark:text-neutral-300">Built-in REST/API client</td>
                            <td className="p-6 text-primary font-bold bg-primary/5">Yes</td>
                            <td className="p-6 text-neutral-500">Plugin required</td>
                            <td className="p-6 text-neutral-500">Varies</td>
                        </tr>

                        <tr>
                            <td className="p-6 text-neutral-700 dark:text-neutral-300">Multi-vendor AI model choice</td>
                            <td className="p-6 text-primary font-bold max-w-[300px] bg-primary/5">Yes — Groq / OpenRouter / Cerebras / Custom also</td>
                            <td className="p-6 text-neutral-500">Via Copilot only</td>
                            <td className="p-6 text-neutral-500">Varies</td>
                        </tr>

                        <tr>
                            <td className="p-6 text-neutral-700 dark:text-neutral-300">Code flow graph</td>
                            <td className="p-6 text-primary font-bold bg-primary/5">Yes</td>
                            <td className="p-6 text-neutral-500">No</td>
                            <td className="p-6 text-neutral-500">No</td>
                        </tr>

                        <tr>
                            <td className="p-6 text-neutral-700 dark:text-neutral-300">Remembers past bugs per project</td>
                            <td className="p-6 text-primary font-bold bg-primary/5">Yes</td>
                            <td className="p-6 text-neutral-500">No</td>
                            <td className="p-6 text-neutral-500">Partial</td>
                        </tr>

                        <tr>
                            <td className="p-6 text-neutral-700 dark:text-neutral-300">Compatible with the VS Code / Open VSX extension ecosystem</td>
                            <td className="p-6 text-primary font-bold bg-primary/5">Yes</td>
                            <td className="p-6 text-neutral-500">Yes — native</td>
                            <td className="p-6 text-neutral-500">Yes</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </section>
    );
}