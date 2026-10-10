"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Preloader from "./Preloader";
import Hero from "./Hero";
import IdeMockup from "./IdeMockup";
import FeaturesGrid from "./FeaturesGrid";
import Community from "./Community";
import IntegrationGrid from "./IntegrationGrid";
import Footer from "./Footer";
import AboutDeveloper from "./AboutDeveloper";
import ComparisonTable from "./ComparisonTable";
import DownloadCTA from "./DownloadCTA";
import Pricing from "./Pricing";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Client shell: owns the loader + GSAP animations.
 * Server-rendered SEO content is passed in as slots so it stays in the static HTML.
 */
export default function HomeClient({
  overview,
  trustedBy,
}: {
  overview: ReactNode;
  trustedBy: ReactNode;
}) {
  const container = useRef<HTMLDivElement>(null);
  const [loaderFinished, setLoaderFinished] = useState(false);
  const heroTl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("vextor_visited")) setLoaderFinished(true);
    } catch {
      /* storage blocked: just show the loader once */
    }
  }, []);

  useGSAP(() => {
    heroTl.current = gsap.timeline({ paused: true });
    heroTl.current
      .fromTo(".gsap-hero-subtext", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(".gsap-hero-btn", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, "-=0.3")
      .fromTo(".gsap-ide", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.2");

    gsap.fromTo(
      ".gsap-feature-card",
      { opacity: 0, y: 40 },
      {
        scrollTrigger: { trigger: ".gsap-features-section", start: "top 80%" },
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      }
    );

    const fadeUpSections = gsap.utils.toArray(".gsap-fade-up", container.current) as HTMLElement[];
    fadeUpSections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 40 },
        {
          scrollTrigger: { trigger: section, start: "top 85%" },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        }
      );
    });
  }, { scope: container });

  const handleTypingComplete = () => {
    heroTl.current?.play();
    setTimeout(() => ScrollTrigger.refresh(), 100);
  };

  const handleLoaderComplete = () => {
    try {
      sessionStorage.setItem("vextor_visited", "true");
    } catch {
      /* ignore */
    }
    setLoaderFinished(true);
    setTimeout(() => ScrollTrigger.refresh(), 100);
  };

  return (
    <div ref={container} className="relative overflow-hidden">
      {!loaderFinished && <Preloader onComplete={handleLoaderComplete} />}

      <Hero startTyping={loaderFinished} onTypingComplete={handleTypingComplete} />

      <IdeMockup />
      <div id="features" className="scroll-mt-24">
        <FeaturesGrid />
      </div>
      {overview}
      <ComparisonTable />
      <div id="community" className="scroll-mt-24">
        <Community />
      </div>
      <div id="integrations" className="scroll-mt-24">
        <IntegrationGrid />
      </div>
      {trustedBy}
      <div id="pricing" className="scroll-mt-24">
        <Pricing />
      </div>
      <div id="about" className="scroll-mt-24">
        <AboutDeveloper />
      </div>
      <div id="download" className="scroll-mt-24">
        <DownloadCTA />
      </div>
      <Footer />
    </div>
  );
}
