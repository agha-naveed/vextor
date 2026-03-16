import { Sparkles, Wrench, Users, Zap } from 'lucide-react';

export default function FeaturesGrid() {
    const features = [
        { icon: Sparkles, title: "PREDICTIVE AUTOCOMPLETE", color: "text-purple-400", bg: "bg-purple-400/10" },
        { icon: Wrench, title: "SMART REFACTORING", color: "text-blue-400", bg: "bg-blue-400/10" },
        { icon: Users, title: "REAL-TIME PAIR PROGRAMMING", color: "text-amber-400", bg: "bg-amber-400/10" },
        { icon: Zap, title: "EXTENSIVE INTEGRATIONS", color: "text-emerald-400", bg: "bg-emerald-400/10" }
    ];

    return (
        <section className="max-w-7xl mx-auto px-6 mb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
                <div key={i} className="bg-[#11141d] border border-white/5 p-6 rounded-xl hover:border-white/10 transition-colors">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${feature.bg}`}>
                        <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <h3 className="text-white font-bold text-sm mb-3">{feature.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        Accelerate your workflow with intelligent suggestions and seamless integrations tailored to your stack.
                    </p>
                </div>
            ))}
        </section>
    );
}