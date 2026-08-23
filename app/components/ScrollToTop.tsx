"use client";

import { useEffect, useState } from "react";
import { FaAnglesUp } from "react-icons/fa6";

export default function ScrollToTop() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed bottom-6 right-6 z-50
        flex h-12 w-12 items-center justify-center
        rounded-full
        bg-white/10
        backdrop-blur-md
        border border-white/20
        text-white
        shadow-xl
        transition-all duration-300
        hover:bg-secondary hover:text-white
        hover:-translate-y-1
        ${
          showButton
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-75 opacity-0"
        }
      `}
    >
      <FaAnglesUp size={20} />
    </button>
  );
}