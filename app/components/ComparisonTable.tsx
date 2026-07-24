export default function ComparisonTable() {
    return (
        <section className="max-w-5xl mx-auto px-6 py-24">
            <div className="text-center mb-16">
                <h2 className="text-xs font-black text-primary tracking-[0.4em] uppercase mb-4">Vextor vs. the rest</h2>
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tighter">Built as an editor first, assistant second.</h3>
                <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm md:text-base max-w-2xl mx-auto">A quick look at how Vextor stacks up against a typical AI-wrapped editor and a traditional IDE.</p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#121729] shadow-xl dark:shadow-none">
                <table className="w-full text-sm border-collapse whitespace-nowrap md:whitespace-normal">
                    <thead>
                        <tr className="border-b border-slate-200 dark:border-white/10">
                            <th className="p-5 text-left font-semibold text-slate-900 dark:text-white bg-slate-50 dark:bg-[#161C33]">Capability</th>
                            <th className="p-5 text-center font-bold text-primary bg-primary/10">Vextor</th>
                            <th className="p-5 text-center font-semibold text-slate-900 dark:text-white bg-slate-50 dark:bg-[#161C33]">Typical AI editor</th>
                            <th className="p-5 text-center font-semibold text-slate-900 dark:text-white bg-slate-50 dark:bg-[#161C33]">Traditional IDE</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                        <tr>
                            <td className="p-5 text-left text-slate-600 dark:text-slate-300">Full-repo semantic index</td>
                            <td className="p-5 text-center font-bold text-primary bg-primary/5">Yes</td>
                            <td className="p-5 text-center text-slate-500">Partial</td>
                            <td className="p-5 text-center text-slate-500">No</td>
                        </tr>

                        <tr>
                            <td className="p-5 text-left text-slate-600 dark:text-slate-300">Background agents with sandboxed checkouts</td>
                            <td className="p-5 text-center font-bold text-primary bg-primary/5">Yes</td>
                            <td className="p-5 text-center text-slate-500">Limited</td>
                            <td className="p-5 text-center text-slate-500">—</td>
                        </tr>

                        <tr>
                            <td className="p-5 text-left text-slate-600 dark:text-slate-300">Offline / local model support</td>
                            <td className="p-5 text-center font-bold text-primary bg-primary/5">Yes</td>
                            <td className="p-5 text-center text-slate-500">Rare</td>
                            <td className="p-5 text-center font-bold text-primary">Yes</td>
                        </tr>

                        <tr>
                            <td className="p-5 text-left text-slate-600 dark:text-slate-300">Native debugger & profiler</td>
                            <td className="p-5 text-center font-bold text-primary bg-primary/5">Yes</td>
                            <td className="p-5 text-center text-slate-500">Basic</td>
                            <td className="p-5 text-center font-bold text-primary">Yes</td>
                        </tr>

                        <tr>
                            <td className="p-5 text-left text-slate-600 dark:text-slate-300">Median suggestion latency</td>
                            <td className="p-5 text-center font-semibold text-slate-900 dark:text-white bg-primary/5">38ms</td>
                            <td className="p-5 text-center text-slate-600 dark:text-slate-400">~300ms</td>
                            <td className="p-5 text-center text-slate-500">n/a</td>
                        </tr>

                        <tr>
                            <td className="p-5 text-left text-slate-600 dark:text-slate-300">Open extension format</td>
                            <td className="p-5 text-center font-bold text-primary bg-primary/5">Yes (VSIX-compatible)</td>
                            <td className="p-5 text-center font-bold text-primary">Yes</td>
                            <td className="p-5 text-center font-bold text-primary">Yes</td>
                        </tr>

                        <tr>
                            <td className="p-5 text-left text-slate-600 dark:text-slate-300">Free tier</td>
                            <td className="p-5 text-center font-bold text-primary bg-primary/5">Unlimited local, generous cloud</td>
                            <td className="p-5 text-center text-slate-500">Trial only</td>
                            <td className="p-5 text-center font-bold text-primary">Yes</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
}