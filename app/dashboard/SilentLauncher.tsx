"use client";

import { useEffect } from "react";

export default function SilentLauncher({ appLink }: { appLink?: string }) {
    
    useEffect(() => {
        if (appLink) {
            // 1. Silently fire the deep link to wake up Electron
            window.location.href = appLink;
            
            // 2. Instantly remove "?app_link=..." from the browser URL bar to keep it clean!
            window.history.replaceState(null, '', '/dashboard');
        }
    }, [appLink]);

    // 🚀 Returns null so it is completely invisible on your dashboard
    return null; 
}