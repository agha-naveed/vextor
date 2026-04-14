import DocsSidebar from "@/components/DocsSidebar"; // Adjust this path if your components folder is elsewhere!

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen text-slate-900 dark:text-slate-300 font-sans selection:bg-indigo-500/30 flex flex-col transition-colors duration-300">
            <div className="max-w-screen-2xl mx-auto flex w-full flex-1 relative overflow-hidden">

                {/* 🚀 INJECT YOUR NEW SIDEBAR COMPONENT HERE */}
                <DocsSidebar />

                {/* MAIN CONTENT AREA */}
                <main className="flex-1 h-[calc(100vh-[73px])] overflow-y-auto relative custom-scrollbar">
                    {children}
                </main>

            </div>
        </div>
    );
}