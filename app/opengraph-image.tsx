import { ImageResponse } from "next/og";

export const alt = "Vextor Code - AI-powered native IDE built with Rust and Go";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #090C15 0%, #0b1b1a 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, color: "#33F2C0", fontSize: 28, letterSpacing: 6 }}>
          <div style={{ width: 16, height: 16, borderRadius: 16, background: "#33F2C0" }} />
          VEXTOR CODE
        </div>
        <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.05, marginTop: 28, display: "flex" }}>
          Code without fear.
        </div>
        <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.05, color: "#33F2C0", display: "flex" }}>
          Understand without limits.
        </div>
        <div style={{ fontSize: 32, color: "#9aa3bf", marginTop: 36, display: "flex" }}>
          Native AI IDE · Rust AST engine · Go terminal · Local-first AI
        </div>
      </div>
    ),
    size
  );
}
