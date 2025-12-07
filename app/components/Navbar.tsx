"use client"
import Image from "next/image"
import Link from "next/link"
import logo from "@/images/logo.png"
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useThemeContext } from "./ThemeContext"

export default function Navbar() {
    
    const { isDarkMode, toggleDarkMode } = useThemeContext();

    return (
        <nav className={`fixed top-0 flex justify-between w-full px-10 py-8 z-[1000000] ${isDarkMode ? "text-white" : "text-black"}`}>
            <div className="container mx-auto flex justify-between items-center">
                <Link href={"/"} title="Vextor AI - Home" className="flex gap-4 items-center select-none">
                    <Image src={logo} alt="Vextor AI Logo" className="w-[35px]" />
                    <span className="text-[26px] font-medium">Vextor AI</span>
                </Link>
                <ul className="flex gap-10">
                    <li>
                        <Link href="/" className={`transition-all ${isDarkMode ? "hover:text-shadow-[0_0_25px_#ffffff87]" : ""}`}>Docs</Link>
                    </li>
                    <li>
                        <Link href="/" className={`transition-all ${isDarkMode ? "hover:text-shadow-[0_0_25px_#ffffff87]" : ""}`}>Updates</Link>
                    </li>
                    <li>
                        <Link href="/" className={`transition-all ${isDarkMode ? "hover:text-shadow-[0_0_25px_#ffffff87]" : ""}`}>Blog</Link>
                    </li>
                    <li>
                        <Link href="/" className={`transition-all ${isDarkMode ? "hover:text-shadow-[0_0_25px_#ffffff87]" : ""}`}>FAQ</Link>
                    </li>
                </ul>
                <div className="flex gap-5 items-center max-h-[40px]">
                    <DarkModeSwitch
                        style={{ marginBottom: '2rem' }}
                        checked={isDarkMode}
                        onChange={toggleDarkMode}
                        size={26}
                        className={`translate-y-4 ${isDarkMode ? "text-white" : "text-black"}`}
                    />
                    <div className="relative inline-block z-10 group">
                        <div style={{transition: "0.2s linear"}} className="absolute inset-0 z-[-1] rounded-md blur-xl bg-gradient-to-r from-[#3185ff] to-[#bc5bf9] opacity-0 group-hover:opacity-50"></div>

                        <button className="bg-gradient-to-r from-[#3185ff] to-[#bc5bf9] py-[7px] px-[18px] rounded-md bg-[length:200%_100%] bg-left hover:bg-right transition-all duration-500 cursor-pointer text-white">
                            Download
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}