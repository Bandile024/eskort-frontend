import type {
  PromotionBannerContainerBlock,
  PromotionBannerItemContent,
} from '../../types/contentBlocks';
import { firstMedia, resolveAssetUrl } from '../../utils/media';
import { ScrollSlider } from '../ui/ScrollSlider';

function PromotionSlide({ item }: { item: PromotionBannerItemContent }) {
  const p = item.properties;
  const desktop = firstMedia(p.image);
  const mobile = firstMedia(p.mobileImage);
  if (!desktop && !mobile) return null;
  const fallback = desktop ?? mobile;

  return (
    <li className="specials-slide">
      <div className={`specials-slide__media specials-slide__media--${p.backgroundColour.toLowerCase()}`}>
        {desktop && (
          <img
            className="specials-slide__desktop"
            src={resolveAssetUrl(desktop.url)}
            width={desktop.width}
            height={desktop.height}
            alt={p.imageAltText ?? ''}
            loading="lazy"
          />
        )}
        {mobile && (
          <img
            className="specials-slide__mobile"
            src={resolveAssetUrl(mobile.url)}
            width={mobile.width}
            height={mobile.height}
            alt={p.mobileImageAltText ?? ''}
            loading="lazy"
          />
        )}
        {!desktop && mobile && <span className="visually-hidden">{fallback?.name}</span>}
      </div>
    </li>
  );
}

/** The "our specials" promotion carousel. */
export function PromotionBannerBlock({ block }: { block: PromotionBannerContainerBlock }) {
  const slides = block.properties.items.items.filter(
    ({ content }) => (content.properties.image ?? []).length > 0 || (content.properties.mobileImage ?? []).length > 0,
  );
  if (slides.length === 0) return null;

  return (
    <section className="our-specials" aria-label="Specials">
      <ScrollSlider label="Specials" className="specials-carousel">
        {slides.map(({ content }) => (
          <PromotionSlide key={content.id} item={content} />
        ))}
      </ScrollSlider>
    </section>
  );
}
