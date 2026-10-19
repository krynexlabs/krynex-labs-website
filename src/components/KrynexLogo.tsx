import React from "react";

interface KrynexLogoProps {
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function KrynexLogo({
  className = "",
  showTagline = false,
  size = "md",
}: KrynexLogoProps) {
  const sizeClasses = {
    sm: "text-base sm:text-lg",
    md: "text-lg sm:text-xl",
    lg: "text-2xl sm:text-3xl",
  };

  const taglineClasses = {
    sm: "text-[8px] tracking-[0.22em]",
    md: "text-[9px] tracking-[0.25em]",
    lg: "text-[11px] tracking-[0.28em]",
  };

  return (
    <div className={`flex flex-col select-none ${className}`}>
      <div className="flex items-baseline leading-none">
        <span
          className={`font-black tracking-[0.16em] text-white ${sizeClasses[size]} transition-colors group-hover:text-zinc-100`}
          style={{ fontWeight: 900 }}
        >
          KRYNEX
        </span>
        <span
          className={`font-light tracking-[0.22em] text-zinc-400 ${sizeClasses[size]} ml-2 transition-colors group-hover:text-zinc-300`}
          style={{ fontWeight: 300 }}
        >
          LABS
        </span>
      </div>
      {showTagline && (
        <span
          className={`block font-mono text-[#929BAA] uppercase mt-1 ${taglineClasses[size]}`}
        >
          BUILDING WHAT COMES NEXT<span className="text-[#00E5FF]">.</span>
        </span>
      )}
    </div>
  );
}
