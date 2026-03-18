export default function Community() {
    const users = [
        { name: "Alex Chen", role: "Frontend Engineer" },
        { name: "Sarah Lee", role: "Fullstack Developer" },
        { name: "David Kim", role: "DevOps Specialist" }
    ];

    return (
        <section className="gsap-fade-up max-w-7xl mx-auto px-6 mb-24">
            <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-4">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Community</h2>
                    <p className="text-slate-500 text-sm max-w-2xl">
                        Join thousands of developers building the future of software. Share snippets, get help, and collaborate.
                    </p>
                </div>
                <a href="#" className="text-indigo-400 text-sm font-semibold hover:text-indigo-300">See All</a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {users.map((user, i) => (
                    <div key={i} className="bg-[#11141d] p-5 rounded-xl border border-white/5 flex gap-4 items-center">
                        <div className="w-12 h-12 rounded-full bg-slate-800 shrink-0"></div>
                        <div>
                            <h4 className="text-white font-semibold text-sm">{user.name}</h4>
                            <p className="text-slate-500 text-xs">{user.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}