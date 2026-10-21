import type { StickerSliderContainerBlock } from '../../types/contentBlocks';
import { firstMedia } from '../../utils/media';
import { MediaImage } from '../ui/MediaImage';

/** The scrolling sticker belt that separates the homepage sections. */
export function StickerMarqueeBlock({ block }: { block: StickerSliderContainerBlock }) {
  const stickers = block.properties.stickers.items.map(({ content }) => ({
    id: content.id,
    media: firstMedia(content.properties.sticker),
    alt: content.properties.stickerAltText,
  }));
  if (stickers.length === 0) return null;

  // The set is rendered twice so the CSS animation loops seamlessly.
  return (
    <section className="ticker icon-belt" aria-label="Brand stickers">
      <div className="ticker-wrapper">
        {[0, 1].map((copy) => (
          <div className="ticker-content" key={copy} aria-hidden={copy === 1}>
            {stickers.map((sticker) => (
              <MediaImage key={`${sticker.id}-${copy}`} media={sticker.media} alt={copy === 0 ? sticker.alt : null} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
