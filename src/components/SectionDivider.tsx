"use client";

import React from "react";

export default function SectionDivider() {
  return (
    <div className="relative w-full overflow-hidden py-2 select-none pointer-events-none">
      {/* Soft upward cyan/blue radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[40px] bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.06),transparent_70%)]" />
      {/* 1px Fine Cinematic Divider Line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#202630] via-50% to-transparent" />
    </div>
  );
}

