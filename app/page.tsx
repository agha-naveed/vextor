"use client";

import { useRef, useState, useEffect } from "react";
// ... your imports ...

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import IdeMockup from "./components/IdeMockup";
import FeaturesGrid from "./components/FeaturesGrid";
import Community from "./components/Community";
import IntegrationGrid from "./components/IntegrationGrid";
import Footer from "./components/Footer";
import AboutDeveloper from "./components/AboutDeveloper";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Page() {
  const container = useRef<HTMLDivElement>(null);
  const [loaderFinished, setLoaderFinished] = useState(false);
  const heroTl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("vextor_visited");
    if (hasVisited) {
      setLoaderFinished(true);
    }
  }, []);

  useGSAP(() => {
    heroTl.current = gsap.timeline({ paused: true });

    heroTl.current
      .from(".gsap-hero-subtext", { opacity: 0, y: 20, duration: 0.6 })
      .from(".gsap-hero-btn", { opacity: 0, y: 20, duration: 0.5, stagger: 0.1 }, "-=0.3")
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
      ease: "power2.out",
    });

    const fadeUpSections = gsap.utils.toArray(".gsap-fade-up", container.current) as HTMLElement[];
    fadeUpSections.forEach((section) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
      });
    });
  }, { scope: container });

  const handleTypingComplete = () => {
    if (heroTl.current) {
      heroTl.current.play();
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }
  };

  const handleLoaderComplete = () => {
    sessionStorage.setItem("vextor_visited", "true");
    setLoaderFinished(true);
  };

  return (
    <div ref={container} className="relative overflow-hidden bg-[#090A0F]">
      {!loaderFinished && <Preloader onComplete={handleLoaderComplete} />}

      <Navbar />

      {/* 3. Pass the callback into the Hero */}
      <Hero
        startTyping={loaderFinished}
        onTypingComplete={handleTypingComplete}
      />

      <IdeMockup />
      <FeaturesGrid />
      <Community />
      <IntegrationGrid />
      <AboutDeveloper />
      <Footer />
    </div>
  );
}