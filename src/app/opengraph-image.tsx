import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "KRYNEX LABS — Applied AI/ML & Enterprise IT Engineering Company";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 70px",
          background: "#000000",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle background gradient and grid lines */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Top Header: Pure Typographic Wordmark (Zero Icon) */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <span
                style={{
                  fontSize: "32px",
                  fontWeight: 900,
                  letterSpacing: "5px",
                  color: "#ffffff",
                }}
              >
                KRYNEX
              </span>
              <span
                style={{
                  fontSize: "32px",
                  fontWeight: 300,
                  letterSpacing: "6px",
                  color: "#a1a1aa",
                  marginLeft: "12px",
                }}
              >
                LABS
              </span>
            </div>
            <span
              style={{
                fontSize: "10px",
                fontFamily: "monospace",
                letterSpacing: "2.5px",
                color: "#71717a",
                textTransform: "uppercase",
                marginTop: "4px",
              }}
            >
              ARCHITECTING INTELLIGENCE FOR INDUSTRY.
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 18px",
              borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.03)",
              fontSize: "12px",
              color: "#e4e4e7",
              fontFamily: "monospace",
              letterSpacing: "1px",
            }}
          >
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ffffff" }} />
            <span>WWW.KRYNEXLABS.IN • AHMEDABAD (IN)</span>
          </div>
        </div>

        {/* Center Main Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "980px" }}>
          <div
            style={{
              fontSize: "58px",
              fontWeight: 800,
              letterSpacing: "-2px",
              lineHeight: 1.1,
              color: "#ffffff",
            }}
          >
            Engineering Intelligence for Industry Pain Points.
          </div>
          <div style={{ fontSize: "21px", color: "#a1a1aa", lineHeight: 1.4 }}>
            Software Product and SaaS Company researching real operational bottlenecks, engineering focused applications, and operating recurring subscription platforms.
          </div>
        </div>

        {/* Bottom Telemetry Metrics & Footer Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <div style={{ display: "flex", gap: "40px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "11px", color: "#71717a", fontFamily: "monospace", textTransform: "uppercase" }}>
                Location
              </span>
              <span style={{ fontSize: "18px", fontWeight: "bold", color: "#ffffff", fontFamily: "monospace" }}>
                AHMEDABAD (IN)
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "11px", color: "#71717a", fontFamily: "monospace", textTransform: "uppercase" }}>
                Official Contact
              </span>
              <span style={{ fontSize: "18px", fontWeight: "bold", color: "#ffffff", fontFamily: "monospace" }}>
                SUPPORT@KRYNEXLABS.IN
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "11px", color: "#71717a", fontFamily: "monospace", textTransform: "uppercase" }}>
                Availability SLA
              </span>
              <span style={{ fontSize: "18px", fontWeight: "bold", color: "#ffffff", fontFamily: "monospace" }}>
                99.9% Target
              </span>
            </div>
          </div>

          <div
            style={{
              fontSize: "13px",
              color: "#a1a1aa",
              fontFamily: "monospace",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span>WWW.KRYNEXLABS.IN</span>
            <span>•</span>
            <span>AHMEDABAD (IN)</span>
            <span>•</span>
            <span>SUPPORT@KRYNEXLABS.IN</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
