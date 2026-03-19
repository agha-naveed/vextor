import { LuSparkles, LuUsers, LuWrench, LuZap } from 'react-icons/lu';

export default function FeaturesGrid() {
    const features = [
        {
            icon: LuSparkles,
            title: "PREDICTIVE AUTOCOMPLETE",
            color: "text-purple-600 dark:text-purple-400",
            bg: "bg-purple-600/10 dark:bg-purple-400/10"
        },
        {
            icon: LuWrench,
            title: "SMART REFACTORING",
            color: "text-blue-600 dark:text-blue-400",
            bg: "bg-blue-600/10 dark:bg-blue-400/10"
        },
        {
            icon: LuUsers,
            title: "REAL-TIME PAIR PROGRAMMING",
            color: "text-amber-600 dark:text-amber-400",
            bg: "bg-amber-600/10 dark:bg-amber-400/10"
        },
        {
            icon: LuZap,
            title: "EXTENSIVE INTEGRATIONS",
            color: "text-emerald-600 dark:text-emerald-400",
            bg: "bg-emerald-600/10 dark:bg-emerald-400/10"
        }
    ];

    return (
        <section className="gsap-features-section max-w-7xl mx-auto px-6 mb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
                <div
                    key={i}
                    className="gsap-feature-card bg-white dark:bg-[#11141d] border border-slate-200 dark:border-white/5 p-6 rounded-xl hover:border-slate-300 dark:hover:border-white/10 shadow-sm hover:shadow-md dark:shadow-none"
                >
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors ${feature.bg}`}>
                        <feature.icon className={`w-6 h-6 transition-colors ${feature.color}`} />
                    </div>
                    <h3 className="text-slate-900 dark:text-white font-bold text-sm mb-3 transition-colors">
                        {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-500 text-sm leading-relaxed transition-colors">
                        Accelerate your workflow with intelligent suggestions and seamless integrations tailored to your stack.
                    </p>
                </div>
            ))}
        </section>
    );
}