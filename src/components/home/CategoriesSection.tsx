import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  label: string;
  image: string;
  link: string;
}

interface CategoriesSectionProps {
  titleOne?: string;
  titleTwo?: string;
  categories?: CategoryItem[];
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  titleOne = 'BROWSE YOUR',
  titleTwo = 'FAVOURITES',
  categories = [
    {
      id: 'cat-breakfast',
      name: 'Breakfast',
      label: 'BREAKFAST',
      image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=400&q=80',
      link: '#breakfast',
    },
    {
      id: 'cat-lunch',
      name: 'Lunch',
      label: 'LUNCH',
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80',
      link: '#lunch',
    },
    {
      id: 'cat-dinner',
      name: 'Dinner',
      label: 'DINNER',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
      link: '#dinner',
    },
  ],
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -260 : 260;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-[#1A1A1A] py-10 sm:py-14 select-none relative z-10 border-b border-[#222]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Centered Title Pair */}
        <div className="text-center space-y-0.5 mb-8 sm:mb-10">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-wider leading-none">
            {titleOne}
          </h2>
          <div className="font-script text-3xl sm:text-4xl lg:text-5xl text-[#FFDE6B] leading-none">
            {titleTwo}
          </div>
        </div>

        {/* Carousel Container with Left/Right Chevrons */}
        <div className="relative flex items-center justify-center">
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll('left')}
            className="hidden sm:flex absolute left-0 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/80 border border-white/20 hover:border-white text-white items-center justify-center transition-all shadow-lg active:scale-95"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Cards Track */}
          <div
            ref={scrollRef}
            className="flex items-center gap-6 sm:gap-12 md:gap-16 overflow-x-auto no-scrollbar scroll-smooth px-4 py-2"
          >
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={cat.link}
                className="group flex flex-col items-center shrink-0 transition-transform duration-200 hover:-translate-y-1"
              >
                {/* Circular Dish Plate with Food Image and subtle outer glow */}
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-tr from-amber-600/40 via-yellow-400/30 to-white/30 shadow-xl group-hover:shadow-yellow-500/20 transition-all">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/80 bg-neutral-900">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Category Label with Right Arrow */}
                <div className="mt-3.5 flex items-center gap-1.5 text-white group-hover:text-[#FFD200] transition-colors">
                  <span className="font-display font-black text-xs sm:text-sm tracking-wider">
                    {cat.label}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 stroke-[3] text-white group-hover:text-[#FFD200]" />
                </div>
              </a>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => scroll('right')}
            className="hidden sm:flex absolute right-0 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/80 border border-white/20 hover:border-white text-white items-center justify-center transition-all shadow-lg active:scale-95"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </section>
  );
};
