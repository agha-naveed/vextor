"use client";

import { useEffect } from "react";

export default function SilentLauncher({ appLink }: { appLink?: string }) {
    
    useEffect(() => {
        if (appLink) {
            // 1. Create an invisible iframe to force the OS to open Electron
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = appLink;
            document.body.appendChild(iframe);

            // 2. Clean the URL bar so the dashboard looks normal
            window.history.replaceState(null, '', '/dashboard');

            // 3. Clean up the iframe code after 2 seconds
            const cleanup = setTimeout(() => {
                if (document.body.contains(iframe)) {
                    document.body.removeChild(iframe);
                }
            }, 2000);

            return () => clearTimeout(cleanup);
        }
    }, [appLink]);

    return null; 
}