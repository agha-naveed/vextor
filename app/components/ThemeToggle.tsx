"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div className="hidden lg:block w-14 h-7 rounded-full bg-[#13151f] border border-white/10" />
    }

    const isDark = theme === "dark" || theme === "system"

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="hidden lg:flex relative items-center cursor-pointer w-14 h-7 bg-[#13151f] rounded-full border border-white/10 hover:border-white/20 transition-colors focus:outline-none"
            aria-label="Toggle Dark Mode"
        >
            <div className="absolute w-full flex justify-between px-1.5 pointer-events-none">
                <Moon className="w-3.5 h-3.5 text-slate-400" />
                <Sun className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <div
                className={`w-5 h-5 rounded-full bg-indigo-500 shadow-md transform transition-transform duration-300 ease-spring z-10 ${isDark ? "translate-x-1" : "translate-x-8"
                    }`}
            />
        </button>
    )
}