import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

// Update this date when the page content meaningfully changes.
const LAST_UPDATED = new Date("2026-10-10");

const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/docs", priority: 0.9, changeFrequency: "monthly" },
  { path: "/docs/getting-started", priority: 0.8, changeFrequency: "monthly" },
  { path: "/docs/architecture", priority: 0.8, changeFrequency: "monthly" },
  { path: "/docs/cli", priority: 0.7, changeFrequency: "monthly" },
  { path: "/docs/go-pty", priority: 0.7, changeFrequency: "monthly" },
  { path: "/docs/rust-parser", priority: 0.7, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.8, changeFrequency: "monthly" },
  { path: "/extension-marketplace", priority: 0.6, changeFrequency: "weekly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${SITE.url}${r.path}`,
    lastModified: LAST_UPDATED,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
