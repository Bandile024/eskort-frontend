import React from 'react';

interface PolonyRollProps {
  className?: string;
  variant?: 'gold' | 'red';
}

/**
 * Signature Eskort polony / braaiwors cylindrical packaging.
 * Features the signature angled black & gold diagonal stripes, metal clip ends,
 * and central Eskort branding emblem.
 */
export const PolonyRoll: React.FC<PolonyRollProps> = ({ className = 'w-48 h-20' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 240 85"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-xl"
      >
        <defs>
          {/* Packaging metallic shading gradient */}
          <linearGradient id="casingShine" x1="0" y1="0" x2="0" y2="85" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2A2A2A" />
            <stop offset="18%" stopColor="#444444" />
            <stop offset="35%" stopColor="#1A1A1A" />
            <stop offset="70%" stopColor="#0F0F0F" />
            <stop offset="100%" stopColor="#050505" />
          </linearGradient>

          {/* Gold foil stripe pattern */}
          <pattern id="hazardGold" width="28" height="28" patternTransform="rotate(35 0 0)" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="14" height="28" fill="#F59E0B" />
            <rect x="14" y="0" width="14" height="28" fill="#B45309" />
          </pattern>

          <filter id="casingDrop" x="-10" y="-10" width="260" height="110">
            <feDropShadow dx="0" dy="6" stdDeviation="5" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Metal twist clip left */}
        <path d="M12 42.5 C12 36, 18 32, 24 35 L24 50 C18 53, 12 49, 12 42.5 Z" fill="#9CA3AF" stroke="#6B7280" strokeWidth="1" />
        <ellipse cx="14" cy="42.5" rx="3" ry="5" fill="#D1D5DB" />

        {/* Metal twist clip right */}
        <path d="M228 42.5 C228 36, 222 32, 216 35 L216 50 C222 53, 228 49, 228 42.5 Z" fill="#9CA3AF" stroke="#6B7280" strokeWidth="1" />
        <ellipse cx="226" cy="42.5" rx="3" ry="5" fill="#D1D5DB" />

        {/* Main Polony Cylinder Body */}
        <rect
          x="22"
          y="10"
          width="196"
          height="65"
          rx="32.5"
          fill="url(#casingShine)"
        />

        {/* Decorative Gold & Orange Angled Ribbons / Stripes */}
        <g opacity="0.9">
          <path d="M44 14 L62 10 L48 74 L30 70 Z" fill="url(#hazardGold)" />
          <path d="M74 10 L94 10 L80 75 L60 75 Z" fill="url(#hazardGold)" />
          <path d="M106 10 L126 10 L112 75 L92 75 Z" fill="url(#hazardGold)" />
          <path d="M148 10 L168 10 L154 75 L134 75 Z" fill="url(#hazardGold)" />
          <path d="M180 10 L200 12 L186 73 L166 75 Z" fill="url(#hazardGold)" />
        </g>

        {/* Specular curved light highlight */}
        <path
          d="M32 20 Q120 14 208 20"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.35"
        />

        {/* Center Eskort Badge Seal */}
        <g transform="translate(120, 42.5)">
          <ellipse cx="0" cy="0" rx="32" ry="24" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2" />
          <ellipse cx="0" cy="0" rx="28" ry="20" fill="#DC2626" stroke="#FFDE6B" strokeWidth="1" />
          <text
            x="0"
            y="4"
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily="Anton, Impact, sans-serif"
            fontSize="12"
            letterSpacing="1"
          >
            ESKORT
          </text>
        </g>
      </svg>
    </div>
  );
};
