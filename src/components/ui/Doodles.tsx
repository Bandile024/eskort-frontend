import React from 'react';

// Flame doodle above "SIZZLING SPECIALS"
export const FlameDoodle: React.FC<{ className?: string }> = ({ className = 'w-10 h-10 text-red-600' }) => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M24 4C24 4 15 15 15 26C15 32 19 38 24 42C29 38 33 32 33 26C33 15 24 4 24 4Z" />
    <path d="M24 18C24 18 19 25 19 30C19 33.5 21 36.5 24 38.5C27 36.5 29 33.5 29 30C29 25 24 18 24 18Z" strokeWidth="2" />
    <path d="M12 28C10 26 8 23 9 20" strokeWidth="2" strokeDasharray="2 3" />
    <path d="M36 28C38 26 40 23 39 20" strokeWidth="2" strokeDasharray="2 3" />
  </svg>
);

// Sunburst doodle above "QUALITY YOU CAN TASTE" and "SOUTH AFRICAS FAVOURITES"
export const SunburstDoodle: React.FC<{ className?: string }> = ({ className = 'w-16 h-8 text-white' }) => (
  <svg viewBox="0 0 80 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={className}>
    <line x1="40" y1="36" x2="40" y2="12" />
    <line x1="28" y1="36" x2="18" y2="16" />
    <line x1="52" y1="36" x2="62" y2="16" />
    <line x1="18" y1="38" x2="6" y2="24" />
    <line x1="62" y1="38" x2="74" y2="24" />
    <line x1="34" y1="36" x2="28" y2="14" strokeWidth="2" />
    <line x1="46" y1="36" x2="52" y2="14" strokeWidth="2" />
  </svg>
);

// Crossed knife and fork doodle above "RECIPES MADE EASY"
export const CutleryDoodle: React.FC<{ className?: string }> = ({ className = 'w-12 h-12 text-white' }) => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Fork */}
    <path d="M14 6V16C14 18.5 16 20.5 18.5 20.5L34 38M14 6V12M18 6V12M22 6V16C22 17.5 21 19 19.5 19.8" />
    {/* Knife */}
    <path d="M34 6C34 6 26 14 26 22L14 38M34 6L30 10" />
    <line x1="32" y1="36" x2="36" y2="40" strokeWidth="3" />
    <line x1="12" y1="36" x2="16" y2="40" strokeWidth="3" />
  </svg>
);

// Steam doodle with "YUMMY" sketch
export const YummySteamDoodle: React.FC<{ className?: string }> = ({ className = 'w-24 h-16 text-white' }) => (
  <svg viewBox="0 0 100 60" fill="none" className={className}>
    <path d="M20 50C15 40 25 35 20 25C17 20 22 15 18 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
    <path d="M32 52C28 42 38 36 32 26C30 20 35 15 30 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <text x="35" y="44" fill="currentColor" fontFamily="Permanent Marker, Caveat, cursive" fontSize="16" transform="rotate(-12 35 44)">
      YUMMY
    </text>
  </svg>
);

// Pig + Map Pin + Fork/Knife sketch above "FIND AN ESKORT NEAR YOU"
export const FindPigDoodle: React.FC<{ className?: string }> = ({ className = 'w-44 h-20 text-white' }) => (
  <svg viewBox="0 0 200 80" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Pig sketch */}
    <g transform="translate(10, 15) scale(0.9)">
      <path d="M15 32C10 30 5 24 5 18C5 10 14 6 22 7C25 3 32 2 38 4C45 2 54 4 60 9C68 12 72 20 70 28C68 36 60 42 50 42L48 50L42 50L43 42L28 42L26 50L20 50L22 42C16 40 13 36 15 32Z" />
      <circle cx="58" cy="18" r="1.5" fill="currentColor" />
      {/* curly tail */}
      <path d="M5 18C2 17 1 13 4 12C6 11 6 15 3 16" />
      {/* snout */}
      <ellipse cx="68" cy="22" rx="4" ry="3" />
      {/* ear */}
      <path d="M52 6L54 12" />
    </g>

    {/* Map pin */}
    <g transform="translate(90, 8)">
      <path d="M12 4C6 4 2 8 2 14C2 22 12 34 12 34C12 34 22 22 22 14C22 8 18 4 12 4Z" strokeWidth="2.2" />
      <circle cx="12" cy="14" r="4" strokeWidth="2" />
    </g>

    {/* Crossed Fork & Knife */}
    <g transform="translate(140, 12)">
      <path d="M8 4V14C8 16 10 18 12 18L24 34M8 4V10M12 4V10M16 4V14" />
      <path d="M24 4C24 4 16 12 16 18L6 34" />
    </g>

    {/* Sunburst dash accents */}
    <line x1="8" y1="20" x2="2" y2="22" strokeDasharray="2 2" />
    <line x1="185" y1="20" x2="192" y2="24" strokeDasharray="2 2" />
    <line x1="184" y1="36" x2="194" y2="40" strokeDasharray="2 2" />
  </svg>
);

// Pig doodle with heart for footer and badges
export const PigMascotHeart: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <div className={`relative inline-block ${className}`}>
    <svg viewBox="0 0 100 80" fill="none" className="w-full h-full">
      {/* Floating heart */}
      <path
        d="M50 12 C48 6, 40 6, 40 12 C40 18, 50 24, 50 24 C50 24, 60 18, 60 12 C60 6, 52 6, 50 12 Z"
        fill="#FFDE6B"
        stroke="#1A1A1A"
        strokeWidth="1.5"
      />
      {/* Cute Pig Body */}
      <g stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#FFAEC9">
        <path d="M22 45C16 42 12 35 12 28C12 18 24 14 34 15C38 10 48 9 56 12C66 9 78 12 85 18C94 22 98 32 95 42C92 52 82 58 70 58L68 68L60 68L62 58L40 58L38 68L30 68L32 58C25 56 21 51 22 45Z" />
        {/* Snout */}
        <ellipse cx="92" cy="34" rx="6" ry="4" fill="#FF8CA3" />
        <circle cx="90" cy="34" r="1" fill="#1A1A1A" />
        <circle cx="94" cy="34" r="1" fill="#1A1A1A" />
        {/* Eye */}
        <circle cx="78" cy="26" r="2.5" fill="#1A1A1A" />
        {/* Ear */}
        <path d="M72 13L74 21" strokeWidth="2.5" />
        {/* Curly tail */}
        <path d="M12 28C8 26 6 22 10 20C13 19 13 24 9 25" strokeWidth="2" fill="none" />
      </g>
    </svg>
  </div>
);
