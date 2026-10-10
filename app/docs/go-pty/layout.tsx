import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Go PTY Terminal Host",
  description: "Learn how the Go PTY host and WebSocket bridge keep the Vextor Code terminal fast and crash-proof.",
  alternates: { canonical: "/docs/go-pty" },
  openGraph: { title: "Go PTY Terminal Host | Vextor Code", description: "Learn how the Go PTY host and WebSocket bridge keep the Vextor Code terminal fast and crash-proof.", url: "/docs/go-pty" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
