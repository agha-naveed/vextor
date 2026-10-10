import Link from "next/link";
import { FAQ } from "@/lib/seo";

// Server component: all of this text is in the static HTML for search engines.
const pillars = [
  {
    title: "Three-process architecture",
    text: "A thin React and Electron interface only paints pixels. A Rust engine handles parsing and analysis. A Go host runs terminals. Because heavy work never touches the UI thread, typing stays smooth in huge repositories.",
  },
  {
    title: "Natural language terminal",
    text: "Describe what you want in plain English and Vextor Code turns it into exact shell commands. Deterministic guardrails block dangerous commands before they run.",
  },
  {
    title: "Local-first, private AI",
    text: "Run GGUF models through llama.cpp on your own machine, or bring your own key for Groq, OpenRouter or Cerebras. Use .vextorignore to keep files out of AI context.",
  },
  {
    title: "Sandboxed extensions",
    text: "Extensions run in isolation instead of with full editor trust, and the marketplace scans uploads for risky code. Vextor Code stays compatible with the VS Code and Open VSX ecosystem.",
  },
  {
    title: "Built for flow",
    text: "Focus mode removes distractions. A built-in REST client replaces a separate API tool. A code flow graph shows how your code connects, and the editor remembers past bugs per project.",
  },
  {
    title: "Free to start",
    text: "The Hobby plan is free forever. Pro adds higher limits, multi-file refactoring and full repository indexing for $20 per month, and Teams adds billing and audit logs for $40 per user per month.",
  },
];

export default function VextorOverview() {
  return (
    <section
      id="overview"
      aria-labelledby="overview-heading"
      className="max-w-6xl mx-auto px-6 py-24 relative z-10 scroll-mt-24"
    >
      <div className="max-w-3xl mb-14">
        <span className="text-xs font-mono font-bold text-primary uppercase tracking-[0.3em] block mb-4">
          About Vextor Code
        </span>
        <h2
          id="overview-heading"
          className="text-3xl md:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tighter leading-tight mb-6"
        >
          What is Vextor Code?
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg leading-relaxed mb-4">
          <strong className="text-neutral-900 dark:text-white">Vextor Code</strong> is a native, AI-powered
          polyglot IDE for developers who want an editor that stays fast, private and in their control. It
          combines a React and Electron interface with a Rust AST engine and a Go terminal host, so analysis,
          autocomplete and shell sessions run in separate processes instead of competing with the UI.
        </p>
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg leading-relaxed">
          Use it as a VS Code alternative that accepts the same extensions, or as an AI editor that can run
          fully offline. Vextor Code is available for Windows, macOS and Linux, and you can read how every
          layer works in the{" "}
          <Link href="/docs" className="text-primary font-semibold underline underline-offset-4">
            documentation
          </Link>
          .
        </p>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
        {pillars.map((p) => (
          <li
            key={p.title}
            className="p-7 rounded-3xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/[0.02]"
          >
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-3">{p.title}</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{p.text}</p>
          </li>
        ))}
      </ul>

      <div id="faq" className="max-w-3xl mx-auto scroll-mt-24">
        <h2 className="text-2xl md:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight mb-8 text-center">
          Frequently asked questions
        </h2>
        <div className="divide-y divide-neutral-200 dark:divide-white/10 rounded-3xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/[0.02] overflow-hidden">
          {FAQ.map((item) => (
            <details key={item.q} className="group p-6">
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-semibold text-neutral-900 dark:text-white">
                <h3 className="text-base font-semibold">{item.q}</h3>
                <span className="text-primary text-xl transition-transform group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
