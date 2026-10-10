// Single source of truth for all SEO data (metadata, JSON-LD, visible copy).
export const SITE = {
  name: "Vextor Code",
  shortName: "Vextor",
  url: "https://vextor.vercel.app",
  tagline: "The AI-powered native IDE built with Rust and Go",
  description:
    "Vextor Code is a native, AI-powered polyglot IDE with a Rust AST engine, a Go terminal host, a crash-proof natural language terminal, sandboxed extensions and local-first AI. Free for Windows, macOS and Linux.",
  author: {
    name: "Syed Naveed Abbas",
    url: "https://github.com/agha-naveed",
    github: "https://github.com/agha-naveed",
    x: "https://x.com/naveed_kazmi31",
    linkedin: "https://linkedin.com/in/agha-naveed",
  },
  twitterHandle: "@naveed_kazmi31",
  keywords: [
    "Vextor Code",
    "Vextor IDE",
    "AI IDE",
    "AI code editor",
    "native IDE",
    "polyglot IDE",
    "Rust AST parser",
    "Go PTY terminal",
    "natural language terminal",
    "offline AI coding",
    "local LLM IDE",
    "GGUF llama.cpp editor",
    "VS Code alternative",
    "Cursor alternative",
    "Open VSX extensions",
    "sandboxed extensions",
    "code flow graph",
    "developer tools",
  ],
} as const;

export const FAQ = [
  {
    q: "What is Vextor Code?",
    a: "Vextor Code is a native, AI-powered polyglot IDE. Its interface is built with React and Electron, its code analysis runs in a Rust AST engine and its terminal runs in a Go PTY host, so the editor stays responsive even in very large workspaces.",
  },
  {
    q: "Is Vextor Code free?",
    a: "Yes. The Hobby plan is free forever and includes the core editor, local autocomplete and support for your own free API keys. Pro is $20 per month and Teams is $40 per user per month.",
  },
  {
    q: "Can Vextor Code run AI offline?",
    a: "Yes. Vextor Code supports local GGUF models through llama.cpp, so autocomplete and the natural language terminal can run on your own machine without sending code to the cloud.",
  },
  {
    q: "Which AI providers does Vextor Code support?",
    a: "You can choose between Groq, OpenRouter, Cerebras and custom providers, or use a local model. Vextor is not tied to a single vendor.",
  },
  {
    q: "Does Vextor Code work with VS Code extensions?",
    a: "Vextor Code is compatible with the VS Code and Open VSX extension ecosystem. Unlike VS Code, extensions run in an isolated sandbox, and extensions uploaded to the Vextor marketplace are scanned for risky code.",
  },
  {
    q: "What is the natural language terminal?",
    a: "It lets you type your intent in plain English. Vextor translates it into exact shell syntax and runs it through the Go terminal host. Deterministic guardrails block dangerous commands before they execute.",
  },
  {
    q: "What does .vextorignore do?",
    a: "It works like .gitignore for the AI. Files and folders listed in .vextorignore are excluded from indexing and AI context, which keeps secrets and private code out of prompts.",
  },
  {
    q: "Which platforms and languages does Vextor Code support?",
    a: "Vextor Code is available for Windows, macOS and Linux. It supports JavaScript, TypeScript, Python, Java, C++, HTML, JSON, Markdown, Docker, Node.js, React and more.",
  },
] as const;
