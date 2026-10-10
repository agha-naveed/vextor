import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Extension Marketplace",
  description: "Browse and publish sandboxed, security-scanned extensions for Vextor Code.",
  alternates: { canonical: "/extension-marketplace" },
  openGraph: { title: "Extension Marketplace | Vextor Code", description: "Browse and publish sandboxed, security-scanned extensions for Vextor Code.", url: "/extension-marketplace" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
