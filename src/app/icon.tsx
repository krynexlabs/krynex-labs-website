import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: "6px",
          border: "1px solid rgba(255, 255, 255, 0.35)",
        }}
      >
        <span
          style={{
            fontSize: "17px",
            fontWeight: 900,
            color: "#ffffff",
            fontFamily: "sans-serif",
            letterSpacing: "-0.5px",
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
