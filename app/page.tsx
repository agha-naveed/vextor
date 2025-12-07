"use client"
import { useThemeContext } from "./components/ThemeContext";
import { FaWindows } from "react-icons/fa";
import flare from "@/images/purpleFlare.png"
import Image from "next/image";

export default function Page() {
  const { isDarkMode } = useThemeContext();
  return (
    <div className={`${isDarkMode ? "bg-main-dark" : "bg-white"} w-full relative overflow-hidden`}>
      {
        isDarkMode ?
        <div className="w-full min-h-screen absolute top-0 left-0 " style={{backgroundImage: "linear-gradient(135deg, rgb(19, 19, 19) 0%, rgb(35, 36, 37) 25%, transparent 50%, black 100%)"}}></div>
        :
        <div className="w-full min-h-screen absolute top-0 left-0 " style={{backgroundImage: "linear-gradient(135deg, rgb(243, 244, 246) 0%, rgb(229, 231, 235) 25%, rgb(215, 215, 219) 50%, rgb(40, 44, 52) 100%)"}}></div>  
      }

      <div className="absolute inset-0 opacity-20"
        style={{backgroundImage: "linear-gradient(to right, rgba(220, 220, 230, 0.15) 1px, transparent 1px), linear-gradient(rgba(220, 220, 230, 0.15) 1px, transparent 1px)", backgroundSize: "30px 30px", zIndex: "1000"}}></div>


      <header className="container mx-auto h-full min-h-screen flex flex-col justify-center items-center relative z-[99999]">

        <div className="relative text-center">
          <div className="relative z-20 place-items-center">
            
            <h1 className={`text-[80px] font-bold ${isDarkMode ? "text-white" : "text-black"}`}>Vextor AI Code Editor</h1>

            <Image src={flare} alt="flare" loading="lazy" className={`absolute -top-80 -right-90 ${isDarkMode ? "animate-flare-fade" : "animate-dark-flare-fade"} w-full h-auto select-none z-[-1] outline-none`} />
            

            <h4 className={`uppercase text-[28px] ${isDarkMode ? "text-white" : "text-black"} relative -top-1 tracking-wider`}>Shift your coding direction</h4>
            <button className="flex gap-2 items-center bg-gradient-to-r from-[#3185ff] to-[#bc5bf9] py-3 px-6 rounded-lg  bg-left hover:bg-right bg-[length:200%_100%] text-xl cursor-pointer text-white mt-7 center_btn" title="Download Vextor for Windows">
              {/* bg-[length:200%_100%] */}
              <FaWindows />
              Download for Windows
            </button>
            
          </div>
        </div>
      </header>
    </div>
  )
}