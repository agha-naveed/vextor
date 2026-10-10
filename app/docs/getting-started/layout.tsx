import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Getting Started",
  description: "Install Vextor Code, connect a local GGUF model or a cloud AI provider, and open your first workspace.",
  alternates: { canonical: "/docs/getting-started" },
  openGraph: { title: "Getting Started | Vextor Code", description: "Install Vextor Code, connect a local GGUF model or a cloud AI provider, and open your first workspace.", url: "/docs/getting-started" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
