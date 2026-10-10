import { FAQ, SITE } from "@/lib/seo";

// Server component: JSON-LD is rendered straight into the HTML for crawlers.
export default function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#organization`,
        name: SITE.name,
        url: SITE.url,
        logo: `${SITE.url}/favicon.ico`,
        founder: { "@id": `${SITE.url}/#author` },
        sameAs: [SITE.author.github, SITE.author.x, SITE.author.linkedin],
      },
      {
        "@type": "Person",
        "@id": `${SITE.url}/#author`,
        name: SITE.author.name,
        url: SITE.author.url,
        sameAs: [SITE.author.github, SITE.author.x, SITE.author.linkedin],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        description: SITE.description,
        inLanguage: "en",
        publisher: { "@id": `${SITE.url}/#organization` },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE.url}/#software`,
        name: SITE.name,
        url: SITE.url,
        description: SITE.description,
        applicationCategory: "DeveloperApplication",
        applicationSubCategory: "Integrated Development Environment",
        operatingSystem: "Windows, macOS, Linux",
        isAccessibleForFree: true,
        author: { "@id": `${SITE.url}/#author` },
        publisher: { "@id": `${SITE.url}/#organization` },
        featureList: [
          "Natural language terminal",
          "Rust AST engine for sub-millisecond autocomplete",
          "Go PTY terminal host",
          "Local-first AI with GGUF and llama.cpp",
          "Multi-vendor AI: Groq, OpenRouter, Cerebras, custom",
          "Sandboxed VS Code / Open VSX compatible extensions",
          ".vextorignore privacy rules",
          "Deterministic command guardrails",
          "Code flow graph",
          "Built-in REST API client",
          "Focus mode",
        ],
        offers: [
          { "@type": "Offer", name: "Hobby", price: "0", priceCurrency: "USD" },
          {
            "@type": "Offer",
            name: "Pro",
            price: "20",
            priceCurrency: "USD",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "20",
              priceCurrency: "USD",
              unitText: "MONTH",
            },
          },
          {
            "@type": "Offer",
            name: "Teams",
            price: "40",
            priceCurrency: "USD",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "40",
              priceCurrency: "USD",
              unitText: "MONTH per user",
            },
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE.url}/#faq`,
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Escape "<" so the JSON can never close the script tag early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
