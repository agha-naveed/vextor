import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CLI & Natural Language Terminal",
  description: "Use the Vextor Code CLI and the natural language terminal to turn plain English into safe shell commands.",
  alternates: { canonical: "/docs/cli" },
  openGraph: { title: "CLI & Natural Language Terminal | Vextor Code", description: "Use the Vextor Code CLI and the natural language terminal to turn plain English into safe shell commands.", url: "/docs/cli" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
