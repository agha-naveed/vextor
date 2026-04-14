import type { Metadata } from "next";
import { Open_Sans, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import { Providers } from "./components/theme-provider";
import Navbar from "./components/Navbar";

const openSans = Open_Sans({
  variable: "--font-openSans",
  subsets: ["latin"],
});
const roboto = Roboto_Condensed({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Vextor AI | The Native Polyglot IDE",
    template: "%s | Vextor AI",
  },
  description: "Code without fear. Understand without limits. Vextor AI is a native polyglot IDE engineered with Rust and Go, featuring a crash-proof Natural Language Terminal and offline-first AI inference.",
  keywords: [
    "AI IDE",
    "Polyglot IDE",
    "Rust AST Parser",
    "Go PTY Terminal",
    "Natural Language CLI",
    "Offline LLM",
    "Local AI Coding",
    "GGUF",
    "Vextor AI",
    "Developer Tools"
  ],
  authors: [{ name: "Syed Naveed Abbas", url: "https://github.com/agha-naveed" }],
  creator: "Syed Naveed Abbas",
  publisher: "Vextor AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vextor.vercel.app",
    title: "Vextor AI | The Native Polyglot IDE",
    description: "Code without fear. Understand without limits. Experience the first multi-process IDE built for the AI era.",
    siteName: "Vextor AI",
    images: [
      {
        url: "/og-image.jpg", // Create a 1200x630 image of your IDE mockup and place it in the /public folder
        width: 1200,
        height: 630,
        alt: "Vextor AI Interface Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vextor AI | The Native Polyglot IDE",
    description: "Experience the first multi-process IDE built with Rust and Go. Features a crash-proof Natural Language Terminal and offline-first AI.",
    images: ["/og-image.jpg"],
    creator: "@naveed_kazmi31",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${openSans.variable} ${roboto.variable} antialiased w-full bg-main`}
      >
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
