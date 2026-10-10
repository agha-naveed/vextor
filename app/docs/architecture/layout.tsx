import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Architecture",
  description: "How Vextor Code splits the React interface, Rust AST engine and Go terminal host into separate processes.",
  alternates: { canonical: "/docs/architecture" },
  openGraph: { title: "Architecture | Vextor Code", description: "How Vextor Code splits the React interface, Rust AST engine and Go terminal host into separate processes.", url: "/docs/architecture" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
