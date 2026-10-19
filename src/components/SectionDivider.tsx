"use client";

import React from "react";

export default function SectionDivider() {
  return (
    <div className="relative w-full overflow-hidden py-2 select-none pointer-events-none">
      {/* Soft upward white radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[40px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_70%)]" />
      {/* 1px Silver Horizon Divider Line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}
