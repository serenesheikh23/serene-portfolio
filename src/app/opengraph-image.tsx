import { ImageResponse } from "next/og";

export const alt = "Serene Sheikhalard — full-stack and front-end software engineer based in Dallas–Fort Worth, open to relocation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "64px",
          background: "#f4efe6",
          color: "#171512",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "monospace",
            fontSize: 18,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#5a544b",
          }}
        >
          <span>Portfolio / 2026</span>
          <span>Irving, Texas</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 100,
              lineHeight: 0.88,
              letterSpacing: -5,
            }}
          >
            Serene Sheikhalard
          </div>
          <div style={{ display: "flex", width: 120, height: 8, background: "#b02e1a" }} />
          <div
            style={{
              display: "flex",
              maxWidth: 900,
              fontSize: 32,
              lineHeight: 1.25,
              color: "#3e3932",
            }}
          >
            Software engineer who builds fast, accessible interfaces and the
            Laravel backends behind them.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 20,
            borderTop: "1px solid #d5ccbd",
            fontFamily: "monospace",
            fontSize: 18,
            color: "#5a544b",
          }}
        >
          <span>Full-stack · Front-end</span>
          <span>Dallas–Fort Worth · Open to relocation</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
