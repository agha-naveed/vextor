import Image from "next/image";
import an from "@/images/an.png";
import aura from "@/images/aura-academy.png";
import dzinnr from "@/images/dzinnr.png";

export default function TrustedBySection() {
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
