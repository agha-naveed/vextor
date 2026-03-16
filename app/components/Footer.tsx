export default function Footer() {
    const columns = [
        { title: "Home", links: ["Home", "Features", "Pricing"] },
        { title: "Features", links: ["Docs", "About AI", "Integrations"] },
        { title: "Community", links: ["Forums", "Discord", "Events"] },
        { title: "Pricing", links: ["Pro", "Teams", "Enterprise"] },
        { title: "Company", links: ["About Us", "Careers", "Contact"] },
    ];

    return (
        <footer className="border-t border-white/5 py-12 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
                {columns.map((col, i) => (
                    <div key={i}>
                        <h4 className="text-white font-semibold mb-4">{col.title}</h4>
                        <ul className="space-y-2 text-slate-500">
                            {col.links.map((link, j) => (
                                <li key={j}><a href="#" className="hover:text-indigo-400 transition-colors">{link}</a></li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </footer>
    );
}