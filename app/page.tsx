"use client"
import { useTheme } from "next-themes"

export default function page() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="bg-main h-screen grid place-content-center">
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="px-3 py-1 bg-white rounded-md cursor-pointer text-black">Click Me</button>
    </div>
  )
}