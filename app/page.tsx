"use client"
import { useTheme } from "next-themes"
import Navbar from "./components/Navbar"

export default function page() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="bg-main h-screen">
      <div className="container mx-auto">
        {
          <Navbar />
        }
      </div>
    </div>
  )
}