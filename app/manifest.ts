import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vextor Code",
    short_name: "Vextor",
    description: "AI-powered native polyglot IDE built with Rust and Go.",
    start_url: "/",
    display: "standalone",
    background_color: "#090A0F",
    theme_color: "#28AB7B",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
