"use client";

import { useUser } from "@clerk/nextjs";

export default function ConnectIDEButton({ appLink }: { appLink?: string }) {
    const { user, isLoaded } = useUser();

    const handleOpenIDE = () => {
        if (appLink) {
            // 1. If they just logged in and the URL has the link, use it!
            window.location.href = appLink;
        } else if (user) {
            // 2. If they are just browsing the dashboard normally, dynamically generate the link!
            const customLink = `vextor://auth?userId=${user.id}&name=${encodeURIComponent(user.firstName || 'Developer')}`;
            window.location.href = customLink;
        }
    };

    // Hide the button until Clerk loads the user data
    if (!isLoaded || (!user && !appLink)) return null;

    return (
        <div className="mb-8 p-5 bg-[#111] border border-[#333] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
            <div>
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                    <span className="text-green-500">✓</span> Ready to Code
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                    Your account is linked. Click the button to send your credentials to the Vextor AI desktop app.
                </p>
            </div>
            <button
                onClick={handleOpenIDE}
                className="shrink-0 bg-white text-black hover:bg-gray-200 font-bold py-3 px-6 rounded-xl transition cursor-pointer shadow-md"
            >
                Open Desktop IDE
            </button>
        </div>
    );
}