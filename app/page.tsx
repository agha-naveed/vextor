import type { Metadata } from "next";
import HomeClient from "./components/HomeClient";
import TrustedBySection from "./components/TrustedBy";
import VextorOverview from "./components/VextorOverview";
import JsonLd from "./components/JsonLd";

// Server component: metadata, JSON-LD and the long-form description are all in the initial HTML.
export const metadata: Metadata = {
  title: { absolute: "Vextor Code | AI-Powered Native IDE built with Rust & Go" },
  description:
    "Vextor Code is a free native AI IDE for Windows, macOS and Linux. Rust AST engine, Go terminal, natural language commands, sandboxed extensions and offline-first AI.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return (
    <main>
      <JsonLd />
      <HomeClient overview={<VextorOverview />} trustedBy={<TrustedBySection />} />
    </main>
  );
}
