import { Children, useEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from './Icons';

interface ScrollSliderProps {
  label: string;
  className?: string;
  /** `<li>` elements. */
  children: ReactNode;
  /** Show the prev/next arrows. */
  arrows?: boolean;
  /** Show the pagination bullets. */
  dots?: boolean;
  /** Bullet colour for use on dark sections. */
  lightDots?: boolean;
}

/**
 * Horizontal scroll-snap carousel — the React equivalent of the CMS's Swiper
 * carousels. Swipeable and scrollable natively, with prev/next arrows and
 * pagination bullets that track the visible slide.
 */
export function ScrollSlider({
  label,
  className = '',
  children,
  arrows = true,
  dots = true,
  lightDots = false,
}: ScrollSliderProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const count = Children.toArray(children).length;

  // Keep the active bullet in sync with the scroll position.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const first = track.firstElementChild as HTMLElement | null;
      const step = first ? first.getBoundingClientRect().width + 20 : track.clientWidth;
      if (step <= 0) return;
      setIndex(Math.min(Math.round(track.scrollLeft / step), Math.max(count - 1, 0)));
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, [count]);

  const scrollTo = (target: number) => {
    const track = trackRef.current;
    if (!track) return;
    const first = track.firstElementChild as HTMLElement | null;
    const step = first ? first.getBoundingClientRect().width + 20 : track.clientWidth;
    track.scrollTo({ left: target * step, behavior: 'smooth' });
  };

  const scrollBy = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <div className={`carousel ${className}`.trim()} role="region" aria-label={label}>
      {arrows && count > 1 && (
        <div className="carousel__nav">
          <button
            type="button"
            className="carousel__arrow"
            onClick={() => scrollBy(-1)}
            aria-label="Previous"
          >
            <ChevronLeft width={14} height={14} />
          </button>
          <button
            type="button"
            className="carousel__arrow"
            onClick={() => scrollBy(1)}
            aria-label="Next"
          >
            <ChevronRight width={14} height={14} />
          </button>
        </div>
      )}

      <ul className="carousel__track" ref={trackRef}>
        {children}
      </ul>

      {dots && count > 1 && (
        <div className="carousel__dots">
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              type="button"
              className={`carousel__dot${lightDots ? ' carousel__dot--light' : ''}${i === index ? ' is-active' : ''}`}
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
            />
          ))}
        </div>
      )}
    </div>
  );
}
