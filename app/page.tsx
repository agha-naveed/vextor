"use client"
import { useThemeContext } from "./components/ThemeContext";
import { FaWindows } from "react-icons/fa";
import flare from "@/images/purpleFlare.png"
import Image from "next/image";
import headerBg from "@/images/headerSpiralBg.svg"

export default function Page() {
  const { isDarkMode } = useThemeContext();
  return (
    <div className={`${isDarkMode ? "bg-main-dark" : "bg-white"} w-full relative`}>
      <video src={"/img/videoplayback1.webm"} muted autoPlay loop className="w-full absolute top-0 mix-blend-screen opacity-10"></video>
      <div className="bg-blur w-full absolute top-0 bg-purple-900/10 backdrop-blur-[3px] h-full z-[999]"></div>
      <header className="container mx-auto h-full min-h-screen flex flex-col justify-center items-center relative z-[99999]">
        <Image src={headerBg} loading="lazy" className="absolute top-0 left-1/2 -translate-x-1/2 mix-blend-soft-light w-[80%] opacity-4" alt="" />
        <div className="relative text-center">
          <div className="relative z-20">
            <h1 className={`text-[80px] font-bold ${isDarkMode ? "text-white" : "text-black"}`}>Vextor AI Code Editor</h1>
            <h4 className={`uppercase text-[28px] ${isDarkMode ? "text-white" : "text-black"} relative -top-1 tracking-wider`}>Shift your coding direction</h4>
            <div className="relative inline-block z-10 group mt-7" title="Download Vextor for Windows">
              <div style={{transition: "0.2s linear"}} className="absolute inset-0 z-[-1] rounded-md blur-xl bg-gradient-to-r from-[#3185ff] to-[#bc5bf9] opacity-0 group-hover:opacity-20"></div>
              <button className="flex gap-2 items-center bg-gradient-to-r from-[#3185ff] to-[#bc5bf9] py-3 px-6 rounded-lg bg-[length:200%_100%] bg-left hover:bg-right transition-all duration-500 text-xl cursor-pointer text-white">
                <FaWindows />
                Download for Windows
              </button>
            </div>
          </div>
          <Image src={flare} alt="flare" loading="lazy" className={`absolute -top-40 ${isDarkMode ? "animate-flare-fade" : "animate-dark-flare-fade"} left-1/2 -translate-x-1/2 w-full h-auto select-none z-0 outline-none`} />
        </div>
      </header>
    </div>
  )
}