interface BrandMarkProps {
  size?: number;
  className?: string;
}

/**
 * Krynex Labs geometric mark — an original, provisional identity element
 * (a faceted diamond with an engineered "K" notch). Not a supplied official logo;
 * replace with approved brand artwork when available.
 */
export default function BrandMark({ size = 28, className }: BrandMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M16 1.5 30.5 16 16 30.5 1.5 16Z" stroke="currentColor" strokeWidth="1.25" opacity="0.45" />
      <path d="M11 8.5v15" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
      <path d="M21.5 8.5 14 16l7.5 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
      <circle cx="16" cy="16" r="1.4" fill="currentColor" />
    </svg>
  );
}
