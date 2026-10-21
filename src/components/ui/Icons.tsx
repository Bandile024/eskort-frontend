import type { SVGProps } from 'react';

const base: SVGProps<SVGSVGElement> = {
  width: 16,
  height: 16,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 3,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export const ChevronRight = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="m9 5 7 7-7 7" /></svg>
);
export const ChevronLeft = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="m15 5-7 7 7 7" /></svg>
);
export const ChevronDown = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="m6 9 6 6 6-6" /></svg>
);
export const SearchIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} strokeWidth={2} {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
);
export const CartIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} strokeWidth={2} {...p}><path d="M3 4h2l2.4 11h10.2L20 7H6" /><circle cx="9" cy="19.5" r="1.3" /><circle cx="17" cy="19.5" r="1.3" /></svg>
);
export const PauseIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} strokeWidth={3} {...p}><path d="M9 6v12M15 6v12" /></svg>
);
export const PlayIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} fill="currentColor" strokeWidth={1} {...p}><path d="M8 5v14l11-7z" /></svg>
);
/** The map-pin the CMS shows next to the store selector. */
export const LocationIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg
    width="15"
    height="18"
    viewBox="0 0 16 19"
    fill="none"
    stroke="currentColor"
    strokeWidth="0.5"
    aria-hidden="true"
    {...p}
  >
    <path
      d="M2.4566 2.44889C-0.485533 5.39102 -0.485533 10.1643 2.4566 13.0858L7.53847 18.1677C7.60019 18.2294 7.70306 18.25 7.78536 18.25C7.86766 18.25 7.97053 18.2294 8.03225 18.1677L13.1141 13.0858C16.0563 10.1437 16.0563 5.37045 13.1141 2.44889C10.172 -0.472668 5.39873 -0.493242 2.4566 2.44889ZM12.6409 12.6126L7.78536 17.4682L2.92981 12.6126C0.255144 9.93796 0.255144 5.59677 2.92981 2.90153C5.60448 0.226861 9.94567 0.226861 12.6409 2.90153C15.3156 5.59677 15.3156 9.93796 12.6409 12.6126Z"
      fill="currentColor"
    />
    <path
      d="M7.78535 5.22647C6.44802 5.22647 5.33701 6.33749 5.33701 7.67482C5.33701 9.01215 6.44802 10.1437 7.78535 10.1437C9.12269 10.1437 10.2337 9.03273 10.2337 7.69539C10.2337 6.35806 9.12269 5.22647 7.78535 5.22647ZM7.78535 9.48536C6.79779 9.48536 5.99539 8.68296 5.99539 7.69539C5.99539 6.70783 6.79779 5.90543 7.78535 5.90543C8.77292 5.90543 9.57532 6.70783 9.57532 7.69539C9.57532 8.68296 8.77292 9.48536 7.78535 9.48536Z"
      fill="currentColor"
    />
  </svg>
);
