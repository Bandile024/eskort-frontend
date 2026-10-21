import React, { useState } from 'react';
import { MapPin, ChevronDown, Search, ShoppingBag, X } from 'lucide-react';

interface HeaderProps {
  cartCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ cartCount = 0 }) => {
  const [selectedStore, setSelectedStore] = useState('Select Store...');
  const [isStoreOpen, setIsStoreOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const stores = [
    'Eskort Centurion Butchery',
    'Eskort Silverton Butchery',
    'Eskort Heidelberg Butchery',
    'Eskort Nelspruit Butchery',
    'Eskort Durban North',
    'Eskort Kimberley Butchery',
    'Eskort Bloemfontein',
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#1A1A1A] border-b border-[#282828] text-white select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Left: Brand Logo & Store Selector */}
        <div className="flex items-center gap-4 lg:gap-6 shrink-0">
          <a href="/" className="flex items-center gap-2 group">
            {/* Eskort Authentic Red Stencil Wordmark */}
            <div className="bg-[#DC2626] text-white px-3 py-1 font-display tracking-widest text-xl sm:text-2xl font-black rounded-xs shadow-md border-b-2 border-red-800 flex items-center gap-1.5">
              <span>ESKORT</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD200]" />
            </div>
          </a>

          {/* Store Selector */}
          <div className="relative">
            <button
              onClick={() => setIsStoreOpen(!isStoreOpen)}
              className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-300 hover:text-white transition-colors py-1.5 px-2.5 rounded-md hover:bg-neutral-800"
              aria-label="Select store"
            >
              <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="font-medium truncate max-w-[120px] sm:max-w-[160px]">{selectedStore}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            </button>

            {isStoreOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-[#242424] border border-[#333333] rounded-lg shadow-2xl py-2 z-50">
                <div className="px-3 py-1.5 text-xs uppercase tracking-wider text-gray-400 border-b border-[#333333] font-semibold">
                  Choose Your Local Butchery
                </div>
                {stores.map((store) => (
                  <button
                    key={store}
                    onClick={() => {
                      setSelectedStore(store);
                      setIsStoreOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs sm:text-sm hover:bg-[#333333] transition-colors text-gray-200"
                  >
                    {store}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center / Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide">
          <a href="#shop" className="text-gray-200 hover:text-[#FFD200] transition-colors">
            Shop Online
          </a>
          <a href="#recipes" className="text-gray-200 hover:text-[#FFD200] transition-colors">
            Recipes
          </a>
          <a href="#stores" className="text-gray-200 hover:text-[#FFD200] transition-colors">
            Stores
          </a>
        </nav>

        {/* Right: Search, Sign In, Cart */}
        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-1.5 text-gray-300 hover:text-white hover:bg-neutral-800 rounded-full transition-colors"
            aria-label="Search Eskort products"
          >
            <Search className="w-4.5 h-4.5" />
          </button>

          {/* Sign In */}
          <button className="text-xs sm:text-sm font-semibold text-gray-200 hover:text-[#FFD200] transition-colors">
            Sign In
          </button>

          {/* Cart Icon with Counter */}
          <a
            href="#cart"
            className="relative flex items-center justify-center p-2 text-yellow-400 hover:text-yellow-300 transition-colors"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 text-[#FFDE6B]" />
            <span className="absolute -top-0.5 -right-0.5 bg-[#FFD200] text-[#1A1A1A] font-bold text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </a>
        </div>
      </div>

      {/* Slide-down search drawer if open */}
      {isSearchOpen && (
        <div className="bg-[#222222] border-t border-[#333] px-4 py-3 flex items-center gap-3 max-w-[1440px] mx-auto">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search ribs, bacon, sausages, recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white focus:outline-none placeholder-gray-500"
            autoFocus
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-gray-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
};
