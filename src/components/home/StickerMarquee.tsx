import React from 'react';
import { TornEdge } from '../ui/TornEdge';

interface StickerMarqueeProps {
  topColor?: string;
  bottomColor?: string;
  bgColor?: string;
}

export const StickerMarquee: React.FC<StickerMarqueeProps> = ({
  topColor = '#1A1A1A',
  bottomColor = '#D6EEFF',
  bgColor = '#F5EFE0',
}) => {
  const badgeList = [
    {
      id: 'tjop',
      content: (
        <div className="flex items-center gap-2">
          <span className="text-xl sm:text-2xl select-none">✌️</span>
          <span className="font-script text-base sm:text-lg font-black tracking-wider text-[#1A1A1A]">
            TJOP ~ TJOP
          </span>
        </div>
      ),
    },
    {
      id: 'varking',
      content: (
        <div className="flex items-center gap-2 bg-[#EAE2D2] px-3.5 py-1 rounded-full border border-[#D5C9B0] shadow-xs">
          <span className="text-base select-none">🐷</span>
          <span className="font-display text-xs sm:text-sm font-black tracking-wider text-[#1A1A1A]">
            VARKING GOOD PORK
          </span>
        </div>
      ),
    },
    {
      id: 'mzansi',
      content: (
        <div className="flex items-center gap-2 bg-[#2D6A4F] text-white px-3.5 py-1 rounded-full shadow-xs">
          <span className="text-sm select-none">🇿🇦</span>
          <span className="font-display text-xs sm:text-sm font-black tracking-wider text-[#FFDE6B]">
            MZANSI'S FAVOURITE
          </span>
        </div>
      ),
    },
    {
      id: 'polony',
      content: (
        <div className="flex items-center gap-2 bg-[#DC2626] text-white px-3.5 py-1 rounded-full shadow-xs">
          <span className="text-xs select-none">🌭</span>
          <span className="font-display text-xs sm:text-sm font-black tracking-wider text-white">
            OG POLONY
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="relative overflow-hidden select-none" style={{ backgroundColor: bgColor }}>
      {/* Torn Paper Top Divider */}
      {topColor && <TornEdge color={topColor} position="top" />}

      {/* Scrolling Content Track */}
      <div className="py-2.5 sm:py-3.5 flex overflow-hidden whitespace-nowrap">
        <div className="flex items-center gap-8 sm:gap-14 animate-[marquee_26s_linear_infinite] shrink-0 px-4">
          {[...badgeList, ...badgeList, ...badgeList, ...badgeList].map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="shrink-0 flex items-center">
              {item.content}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-8 sm:gap-14 animate-[marquee_26s_linear_infinite] shrink-0 px-4" aria-hidden="true">
          {[...badgeList, ...badgeList, ...badgeList, ...badgeList].map((item, idx) => (
            <div key={`dup-${item.id}-${idx}`} className="shrink-0 flex items-center">
              {item.content}
            </div>
          ))}
        </div>
      </div>

      {/* Torn Paper Bottom Divider */}
      {bottomColor && <TornEdge color={bottomColor} position="bottom" />}
    </div>
  );
};
