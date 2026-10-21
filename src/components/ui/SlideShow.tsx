import { useEffect, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight, PauseIcon, PlayIcon } from './Icons';

export interface Slide {
  key: string;
  node: ReactNode;
}

interface SlideShowProps {
  label: string;
  slides: Slide[];
  autoplayMs?: number;
  arrows?: boolean;
  className?: string;
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** One-slide-at-a-time carousel with optional autoplay and a pause control. */
export function SlideShow({ label, slides, autoplayMs, arrows = false, className = '' }: SlideShowProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(prefersReducedMotion);
  const count = slides.length;

  useEffect(() => {
    if (!autoplayMs || paused || count < 2) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % count), autoplayMs);
    return () => window.clearInterval(timer);
  }, [autoplayMs, paused, count]);

  const active = slides[index % Math.max(count, 1)];
  if (!active) return null;
  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);

  return (
    <div className={`carousel ${className}`.trim()} role="region" aria-roledescription="carousel" aria-label={label}>
      {arrows && count > 1 && (
        <div className="carousel__nav">
          <button type="button" className="carousel__arrow" onClick={() => go(-1)} aria-label="Previous slide">
            <ChevronLeft width={14} height={14} />
          </button>
          <button type="button" className="carousel__arrow" onClick={() => go(1)} aria-label="Next slide">
            <ChevronRight width={14} height={14} />
          </button>
        </div>
      )}

      <div className="carousel__slide" key={active.key} aria-live={autoplayMs && !paused ? 'off' : 'polite'}>
        {active.node}
      </div>

      {autoplayMs && count > 1 && (
        <>
          <div className="carousel__dots">
            {slides.map((slide, i) => (
              <button
                key={slide.key}
                type="button"
                className={`carousel__dot${i === index ? ' is-active' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
              />
            ))}
          </div>
          <button
            type="button"
            className="carousel__pause"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
          >
            {paused ? <PlayIcon /> : <PauseIcon />}
          </button>
        </>
      )}
    </div>
  );
}
