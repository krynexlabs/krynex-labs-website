import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          borderRadius: "40px",
          border: "2px solid rgba(255, 255, 255, 0.35)",
          boxShadow: "inset 0 0 40px rgba(255, 255, 255, 0.08)",
        }}
      >
        <span
          style={{
            fontSize: "92px",
            fontWeight: 900,
            color: "#ffffff",
            fontFamily: "sans-serif",
            letterSpacing: "-3px",
            lineHeight: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          KL
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}
