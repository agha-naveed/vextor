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
import ComparisonTable from "./components/ComparisonTable";
import DownloadCTA from "./components/DownloadCTA";
import Pricing from "./components/Pricing";
import { FiBookOpen, FiCode, FiMonitor, FiTerminal } from "react-icons/fi";
import Image from "next/image";
import an from "@/images/an.png"
import aura from "@/images/aura-academy.png"
import dzinnr from "@/images/dzinnr.png"

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
      <ComparisonTable />
      <Community />
      <IntegrationGrid />
      <TrustedBySection />
      <Pricing />
      <AboutDeveloper />
      <DownloadCTA />
      <Footer />
    </div>
  );
}

function TrustedBySection() {
  const logos = [
    {
      src: aura,
      alt: "Aura Tech Academy",
      width: 120,
      height: 60,
      className: "max-h-10 max-w-28",
    },
    {
      src: dzinnr,
      alt: "Dzinnr",
      width: 120,
      height: 60,
      className: "max-h-9 max-w-28",
    },
    {
      src: an,
      alt: "AN",
      width: 100,
      height: 100,
      className: "max-h-12 max-w-20",
    },
  ];

  return (
    <section className="relative z-10 w-full overflow-hidden bg-[#06070a] py-16">
      <style>{`
        .trusted-marquee {
          display: flex;
          width: max-content;
          animation: trusted-scroll 18s linear infinite;
          will-change: transform;
        }

        .trusted-group {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          gap: 56px;
          padding-right: 56px;
        }

        .trusted-logo {
          display: flex;
          width: 112px;
          height: 56px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
        }

        @keyframes trusted-scroll {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-33.333333%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .trusted-marquee {
            animation: none;
          }
        }
      `}</style>

      {/* Heading */}
      <div className="mx-auto mb-8 max-w-7xl px-6 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
          Empowering the next generation of developers
        </p>
      </div>

      {/* Marquee */}
      <div
        className="relative mx-auto w-full max-w-5xl overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div className="trusted-marquee">

          {/* =====================================================
              GROUP 1
          ====================================================== */}
          <div className="trusted-group">
            {logos.map((logo, index) => (
              <div
                key={`group1-${index}`}
                className="trusted-logo group"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className={`
                    h-auto w-auto object-contain
                    grayscale opacity-70
                    transition-all duration-300
                    group-hover:grayscale-0
                    group-hover:opacity-100
                    ${logo.className}
                  `}
                />
              </div>
            ))}
          </div>

          {/* =====================================================
              GROUP 2
          ====================================================== */}
          <div
            className="trusted-group"
            aria-hidden="true"
          >
            {logos.map((logo, index) => (
              <div
                key={`group2-${index}`}
                className="trusted-logo group"
              >
                <Image
                  src={logo.src}
                  alt=""
                  width={logo.width}
                  height={logo.height}
                  className={`
                    h-auto w-auto object-contain
                    grayscale opacity-70
                    transition-all duration-300
                    group-hover:grayscale-0
                    group-hover:opacity-100
                    ${logo.className}
                  `}
                />
              </div>
            ))}
          </div>

          {/* =====================================================
              GROUP 3
          ====================================================== */}
          <div
            className="trusted-group"
            aria-hidden="true"
          >
            {logos.map((logo, index) => (
              <div
                key={`group3-${index}`}
                className="trusted-logo group"
              >
                <Image
                  src={logo.src}
                  alt=""
                  width={logo.width}
                  height={logo.height}
                  className={`
                    h-auto w-auto object-contain
                    grayscale opacity-70
                    transition-all duration-300
                    group-hover:grayscale-0
                    group-hover:opacity-100
                    ${logo.className}
                  `}
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}