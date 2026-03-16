"use client"
import { useTheme } from "next-themes"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import IdeMockup from "./components/IdeMockup"
import FeaturesGrid from "./components/FeaturesGrid"
import Community from "./components/Community"
import DocsAndIntegrations from "./components/DocsAndIntegrations"
import Footer from "./components/Footer"

export default function page() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="bg-main h-screen">
      <div className="container mx-auto">
        <Navbar />
        <Hero />
        <IdeMockup />
        <FeaturesGrid />
        <Community />
        <DocsAndIntegrations />
        <Footer />
      </div>
    </div>
  )
}