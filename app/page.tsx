"use client"
import { useThemeContext } from "./components/ThemeContext";

export default function page() {
  const { isDarkMode, toggleDarkMode } = useThemeContext();
  return (
    <div className={`${isDarkMode ? "bg-main-dark" : "bg-white"} w-full min-h-screen`}>
      
      
    </div>
  )
}