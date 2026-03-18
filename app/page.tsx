"use client";

import { useRef, useState, useEffect } from "react";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import IdeMockup from "./components/IdeMockup";
import FeaturesGrid from "./components/FeaturesGrid";
import Community from "./components/Community";
import DocsAndIntegrations from "./components/DocsAndIntegrations";
import Footer from "./components/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Page() {
  const container = useRef<HTMLDivElement>(null);

  // 1. We start by assuming the loader is NOT finished
  const [loaderFinished, setLoaderFinished] = useState(false);
  const heroTl = useRef<gsap.core.Timeline | null>(null);

  // 2. Add an effect to check sessionStorage the moment the page loads
  useEffect(() => {
    const hasVisited = sessionStorage.getItem("vextor_visited");

    if (hasVisited) {
      // If they've been here before, skip the loader immediately
      setLoaderFinished(true);
    }
  }, []);

  useGSAP(() => {
    heroTl.current = gsap.timeline({ paused: true });

    heroTl.current
      .from(".gsap-hero-text", { opacity: 0, y: 30, duration: 0.8 })
      .from(".gsap-hero-btn", { opacity: 0, y: 20, duration: 0.5, stagger: 0.1 }, "-=0.4")
      .from(".gsap-ide", { opacity: 0, y: 40, duration: 1, ease: "power3.out" }, "-=0.2");

    gsap.from(".gsap-feature-card", {
      scrollTrigger: {
        trigger: ".gsap-features-section",
        start: "top 80%",
      },
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out"
    });

  }, { scope: container });

  useEffect(() => {
    if (loaderFinished && heroTl.current) {
      heroTl.current.play();
    }
  }, [loaderFinished]);

  // 3. Update our onComplete handler to save the visit in sessionStorage
  const handleLoaderComplete = () => {
    sessionStorage.setItem("vextor_visited", "true");
    setLoaderFinished(true);
  };

  return (
    <div ref={container} className="relative overflow-hidden bg-[#090A0F]">

      {/* 4. Only show the preloader if they haven't visited yet */}
      {!loaderFinished && (
        <Preloader onComplete={handleLoaderComplete} />
      )}

      <Navbar />
      <Hero />
      <IdeMockup />
      <FeaturesGrid />
      <Community />
      <DocsAndIntegrations />
      <Footer />
    </div>
  );
}