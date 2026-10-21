import React, { useState } from 'react';
import { ChevronRight, Pause, Play } from 'lucide-react';
import heroHotdogImg from '../../assets/images/hero_hotdog_mustard_1792599846261.jpg';

interface HeroSectionProps {
  titleOne?: string;
  titleTwo?: string;
  subTitle?: string;
  buttonOneText?: string;
  buttonTwoText?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  titleOne = 'FROM OUR TABLE',
  titleTwo = 'TO YOURS',
  subTitle = "Whether it's a weekday breakfast, a family dinner or a weekend braai, discover delicious products made with the quality South Africans have trusted for over 100 years.",
  buttonOneText = 'SHOP PRODUCTS',
  buttonTwoText = 'VIEW SPECIALS',
}) => {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <section className="relative w-full h-[540px] sm:h-[620px] lg:h-[700px] overflow-hidden select-none bg-[#1A1A1A]">
      {/* Background Hero Image with Appetizing Culinary Photography */}
      <div className="absolute inset-0">
        <img
          src={heroHotdogImg}
          alt="Eskort fresh grilled sausage hotdog with mustard drizzle"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        {/* Dark Vignette / Contrast Scrim for Pristine Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
      </div>

      {/* Main Container Content */}
      <div className="relative max-w-[1440px] mx-auto h-full px-4 sm:px-6 lg:px-12 flex flex-col justify-center">
        <div className="max-w-xl z-20 space-y-5">
          {/* Headline Pair: Bold Condensed + Gold Brush Script */}
          <div className="space-y-1">
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-wider leading-[0.95] drop-shadow-md">
              {titleOne}
            </h1>
            <div className="font-script text-4xl sm:text-6xl lg:text-7xl text-[#FFDE6B] tracking-wide leading-[1.05] drop-shadow-lg">
              {titleTwo}
            </div>
          </div>

          {/* Subtitle / Paragraph */}
          <p className="text-sm sm:text-base text-gray-200 font-medium leading-relaxed max-w-lg drop-shadow">
            {subTitle}
          </p>

          {/* Action Pill Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <a
              href="#products"
              className="inline-flex items-center gap-2 bg-[#FFD200] hover:bg-[#F2C400] text-[#1A1A1A] font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{buttonOneText}</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </a>

            <a
              href="#specials"
              className="inline-flex items-center gap-2 bg-black/40 hover:bg-black/60 border border-white/60 hover:border-white text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full backdrop-blur-sm transition-all duration-200 shadow-md hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{buttonTwoText}</span>
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </a>
          </div>
        </div>

        {/* Floating Sticker 1: Bottom Left "TOP CLASS BACON TJOP ~ TJOP" */}
        <div className="absolute bottom-10 left-4 sm:left-8 z-20 pointer-events-none hidden sm:block transform -rotate-12 hover:rotate-0 transition-transform duration-300">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#111111] border-2 border-white/90 p-2 shadow-2xl flex flex-col items-center justify-center text-center">
            <span className="text-[9px] font-extrabold text-[#FFD200] tracking-wider leading-tight">
              TOP CLASS
            </span>
            <span className="text-xs font-display font-black text-white tracking-widest leading-none">
              BACON
            </span>
            <div className="w-8 h-1 bg-[#DC2626] my-0.5" />
            <span className="text-[10px] font-script text-white leading-none">
              TJOP ~ TJOP
            </span>
          </div>
        </div>

        {/* Floating Sticker 2: Top Right "THE OG POLONY" with SA Flag Heart */}
        <div className="absolute top-12 right-6 sm:right-16 z-20 pointer-events-none transform rotate-6">
          <div className="relative flex flex-col items-center">
            {/* Tiny floating heart doodle */}
            <div className="text-[#FFDE6B] text-xl font-script animate-bounce select-none">
              ♥
            </div>
            {/* Pig Mascot Silhouette with Badge */}
            <div className="bg-[#DC2626] text-white px-3.5 py-2 rounded-2xl border-2 border-white shadow-2xl flex items-center gap-2">
              <span className="text-base select-none">🇿🇦</span>
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-yellow-300 uppercase leading-none tracking-tight">
                  The Official
                </span>
                <span className="text-xs font-display tracking-wider font-black text-white leading-tight">
                  OG POLONY
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Playback Controller (Right side) */}
        <div className="absolute bottom-10 right-4 sm:right-12 z-20 flex items-center gap-4">
          <div className="flex items-center gap-3">
            {/* Progress track */}
            <div className="w-24 sm:w-36 h-0.5 bg-white/40 rounded-full overflow-hidden relative">
              <div className="h-full bg-white w-2/3 rounded-full" />
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 rounded-full border border-white/60 hover:border-white bg-black/30 hover:bg-black/60 flex items-center justify-center text-white transition-colors"
              aria-label={isPlaying ? 'Pause banner slideshow' : 'Play banner slideshow'}
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 fill-current" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
