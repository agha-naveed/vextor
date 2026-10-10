import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rust AST Parser",
  description: "Inside the Rust AST parser that powers sub-millisecond autocomplete and code analysis in Vextor Code.",
  alternates: { canonical: "/docs/rust-parser" },
  openGraph: { title: "Rust AST Parser | Vextor Code", description: "Inside the Rust AST parser that powers sub-millisecond autocomplete and code analysis in Vextor Code.", url: "/docs/rust-parser" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
