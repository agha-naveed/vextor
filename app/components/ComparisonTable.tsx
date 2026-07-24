import { FaCheck } from "react-icons/fa";

export default function ComparisonTable() {
    return (
        <section className="max-w-5xl mx-auto px-6 py-24">
            <div className="text-center mb-16">
                <h2 className="text-xs font-black text-indigo-500 tracking-[0.4em] uppercase mb-4">Vextor vs. the rest</h2>
                <h3 className="text-3xl md:text-4xl font-bold dark:text-white">Built as an editor first.</h3>
            </div>
            
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#121729]">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 dark:bg-[#161C33] border-b border-slate-200 dark:border-white/10">
                        <tr>
                            <th className="p-6 font-semibold dark:text-white">Capability</th>
                            <th className="p-6 font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10">Vextor</th>
                            <th className="p-6 font-semibold dark:text-white">Typical AI editor</th>
                            <th className="p-6 font-semibold dark:text-white">Traditional IDE</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                        <tr>
                            <td className="p-6 dark:text-slate-300">Full-repo semantic index</td>
                            <td className="p-6 text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50/50 dark:bg-indigo-500/5">Yes</td>
                            <td className="p-6 text-slate-500">Partial</td>
                            <td className="p-6 text-slate-500">No</td>
                        </tr>
                        {/* Add remaining rows based on the HTML table */}
                    </tbody>
                </table>
            </div>
        </section>
    );
}