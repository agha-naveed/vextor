"use client"
import { useThemeContext } from "./components/ThemeContext";
import { FaWindows } from "react-icons/fa";
import flare from "@/images/purpleFlare.png"
import Image from "next/image";

export default function page() {
  const { isDarkMode, toggleDarkMode } = useThemeContext();
  return (
    <div className={`${isDarkMode ? "bg-main-dark" : "bg-white"} w-full`}>
      <header className="container mx-auto h-full min-h-screen flex flex-col justify-center items-center relative">
        <div className="relative text-center">
          <div className="relative z-20">
            <h1 className={`text-[80px] text-white font-bold`}>Vextor AI Code Editor</h1>
            <h4 className="uppercase text-[28px] text-white relative -top-1 tracking-wider">Shift your coding direction</h4>
            <div className="relative inline-block z-10 group mt-8" title="Download Vextor for Windows">
              <div style={{transition: "0.2s linear"}} className="absolute inset-0 z-[-1] rounded-md blur-xl bg-gradient-to-r from-[#3185ff] to-[#bc5bf9] opacity-0 group-hover:opacity-20"></div>
              <button className="flex gap-2 items-center bg-gradient-to-r from-[#3185ff] to-[#bc5bf9] py-3 px-6 rounded-lg bg-[length:200%_100%] bg-left hover:bg-right transition-all duration-500 text-xl cursor-pointer text-white">
                <FaWindows />
                Download for Windows
              </button>
            </div>
          </div>
          <Image src={flare} alt="flare" className="absolute -top-40 animate-flare-fade left-1/2 -translate-x-1/2 w-full h-auto pointer-events-none select-none z-0 outline-none" />
        </div>
      </header>
    </div>
  )
}