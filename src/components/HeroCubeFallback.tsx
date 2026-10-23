import React from "react";

/**
 * Lightweight, zero-JS SVG Isometric Wireframe Fallback for Hero 3D Rubik's Assembly.
 * Rendered during SSR, dynamic component loading, on mobile viewports (<768px),
 * and for users requesting prefers-reduced-motion.
 */
export default function HeroCubeFallback() {
  return (
    <div
      className="relative w-full h-full min-h-[380px] sm:min-h-[480px] lg:min-h-[680px] flex items-center justify-center p-8 select-none"
    >
      <svg
        role="img"
        aria-label="Krynex Modular Engineering Cube Visual"
        viewBox="0 0 400 400"
        className="w-full max-w-[360px] sm:max-w-[420px] h-auto drop-shadow-[0_0_35px_rgba(255,255,255,0.12)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Isometric wireframe cube facets */}
        <polygon
          points="200,50 320,120 200,190 80,120"
          fill="#141414"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeOpacity="0.4"
        />
        <polygon
          points="80,120 200,190 200,330 80,260"
          fill="#090909"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeOpacity="0.3"
        />
        <polygon
          points="200,190 320,120 320,260 200,330"
          fill="#0d0d0d"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeOpacity="0.3"
        />
        {/* Grid lines simulating 3x3 Rubik slices */}
        <line x1="120" y1="96" x2="240" y2="166" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.35" />
        <line x1="160" y1="73" x2="280" y2="143" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.35" />
        <line x1="240" y1="73" x2="120" y2="143" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.35" />
        <line x1="280" y1="96" x2="160" y2="166" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.35" />
        <line x1="120" y1="143" x2="120" y2="283" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.25" />
        <line x1="160" y1="166" x2="160" y2="306" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.25" />
        <line x1="240" y1="166" x2="240" y2="306" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.25" />
        <line x1="280" y1="143" x2="280" y2="283" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.25" />
        <line x1="80" y1="166" x2="200" y2="236" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.25" />
        <line x1="80" y1="213" x2="200" y2="283" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.25" />
        <line x1="200" y1="236" x2="320" y2="166" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.25" />
        <line x1="200" y1="283" x2="320" y2="213" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.25" />
      </svg>
    </div>
  );
}
