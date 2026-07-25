"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export default function SmoothScrollLayout({
  children,
}: {
  children: any;
}) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.04,          // Lower = smoother
        duration: 1.8,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.8,
        touchMultiplier: 1.2,
      }}
    >
      {children}
    </ReactLenis>
  );
}