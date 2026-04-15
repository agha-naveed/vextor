"use client";

import { useRef, useState, useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Preloader from "./components/Preloader";
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
    // 🚀 FIX 1: Removed the early return! 
    // GSAP must run immediately on mount so it can set opacity: 0 before the user sees anything.

    heroTl.current = gsap.timeline({ paused: true });

    heroTl.current
      .from(".gsap-hero-subtext", { opacity: 0, y: 20, duration: 0.6 })
      .from(".gsap-hero-btn", { opacity: 0, y: 20, duration: 0.5, stagger: 0.1 }, "-=0.3")
      .from(".gsap-ide", { opacity: 0, y: 40, duration: 1, ease: "power3.out" }, "-=0.2");

    gsap.fromTo(".gsap-feature-card",
      {
        opacity: 0,
        y: 40
      },
      {
        scrollTrigger: {
          trigger: ".gsap-features-section",
          start: "top 80%",
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      }
    );

    const fadeUpSections = gsap.utils.toArray(".gsap-fade-up", container.current) as HTMLElement[];
    fadeUpSections.forEach((section) => {
      gsap.fromTo(section,
        {
          opacity: 0,
          y: 40
        },
        {
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        }
      );
    });

  // 🚀 FIX 2: Removed `dependencies: [loaderFinished]`.
  // This prevents GSAP from cleaning up and restarting when the loader finishes, which was causing the flash!
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
    
    // 🚀 FIX 3: Refresh ScrollTrigger right after the Preloader unmounts
    // so it knows the new layout height.
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  return (
    <div ref={container} className="relative overflow-hidden">
      {!loaderFinished && <Preloader onComplete={handleLoaderComplete} />}

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