import type { Metadata, Viewport } from "next";
import { Open_Sans, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import { Providers } from "./components/theme-provider";
import Navbar from "./components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import AnimatedBackground from "./components/AnimatedBackground";
import CustomCursor from "./components/CustomCursor";
import SmoothScrollLayout from "./components/SmoothScrollLayout";
import ScrollToTop from "./components/ScrollToTop";
import { SITE } from "@/lib/seo";

const openSans = Open_Sans({
  variable: "--font-openSans",
  subsets: ["latin"],
  display: "swap",
});
const roboto = Roboto_Condensed({
  variable: "--font-roboto",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F9FA" },
    { media: "(prefers-color-scheme: dark)", color: "#090A0F" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Vextor Code | AI-Powered Native IDE built with Rust & Go",
    template: "%s | Vextor Code",
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [...SITE.keywords],
  authors: [{ name: SITE.author.name, url: SITE.author.url }],
  creator: SITE.author.name,
  publisher: SITE.name,
  category: "technology",
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
  formatDetection: { email: false, address: false, telephone: false },
  verification: {
    google: "4q3XnFFPqEBtFBFsSNzPLMgsAjkGxAWvK56Jy030V7Y",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: "Vextor Code | AI-Powered Native IDE built with Rust & Go",
    description:
      "Code without fear. Understand without limits. A native polyglot IDE with a crash-proof natural language terminal and local-first AI.",
    // Image comes from app/opengraph-image.tsx automatically.
  },
  twitter: {
    card: "summary_large_image",
    site: SITE.twitterHandle,
    creator: SITE.twitterHandle,
    title: "Vextor Code | AI-Powered Native IDE built with Rust & Go",
    description:
      "A native polyglot IDE with a Rust AST engine, Go terminal host, sandboxed extensions and offline-first AI.",
    // Image comes from app/twitter-image.tsx automatically.
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Runs before first paint: returning visitors never see the loading screen.
const skipLoaderScript = `document.documentElement.classList.add("js");try{if(sessionStorage.getItem("vextor_visited"))document.documentElement.setAttribute("data-visited","1")}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <script dangerouslySetInnerHTML={{ __html: skipLoaderScript }} />
        </head>
        <body
          className={`${openSans.variable} ${roboto.variable} selection:bg-primary selection:text-white dark:selection:text-primary dark:selection:bg-white antialiased w-full bg-main`}
        >
          <Providers>
            <SmoothScrollLayout>
              <ScrollToTop />
              <CustomCursor />
              <Navbar />
              <AnimatedBackground />
              {children}
            </SmoothScrollLayout>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
