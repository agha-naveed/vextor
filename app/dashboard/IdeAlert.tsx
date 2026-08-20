"use client";

import { useEffect, useState } from "react";
import { FaTerminal } from "react-icons/fa6"; // Assuming you use react-icons

export default function IdeAlert({ appLink }: { appLink: string }) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        // Automatically prompt the browser to open the Vextor desktop app
        if (appLink) {
            window.location.href = appLink;
        }
    }, [appLink]);

    if (!show) return null;

    return (
        <div className="bg-primary/10 border border-primary/30 p-4 sm:p-6 rounded-2xl mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg shadow-primary/5">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <FaTerminal className="text-primary text-lg" />
                </div>
                <div>
                    <h3 className="font-bold text-neutral-900 dark:text-white text-lg">Authentication Successful!</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                        Attempting to open Vextor AI automatically. If nothing happens, click the button.
                    </p>
                </div>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
                <button 
                    onClick={() => setShow(false)} 
                    className="px-4 py-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition"
                >
                    Dismiss
                </button>
                <a 
                    href={appLink} 
                    className="flex-1 sm:flex-none text-center bg-primary text-white px-6 py-2 rounded-xl font-bold text-sm shadow-[0_0_15px_var(--color-primary)] hover:opacity-90 transition"
                >
                    Open IDE
                </a>
            </div>
        </div>
    );
}