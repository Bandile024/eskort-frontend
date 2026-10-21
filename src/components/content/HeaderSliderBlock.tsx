import type { HeaderSliderContainerBlock, HeaderSliderItemContent } from '../../types/contentBlocks';
import { firstLink } from '../../utils/links';
import { firstMedia, resolveAssetUrl } from '../../utils/media';
import { CmsLink } from '../ui/CmsLink';
import { MediaImage } from '../ui/MediaImage';
import { SlideShow } from '../ui/SlideShow';
import { TitlePair } from '../ui/TitlePair';

function HeaderSlide({ item, first }: { item: HeaderSliderItemContent; first: boolean }) {
  const p = item.properties;
  const image = p.useImage ? firstMedia(p.image) : undefined;
  const videoSrc = p.useImage ? undefined : resolveAssetUrl(p.videoUrl);

  return (
    <div className="slide">
      <div className="media-holder">
        {videoSrc ? (
          <video src={videoSrc} autoPlay muted loop playsInline aria-label={p.videoAltText ?? undefined} />
        ) : (
          <MediaImage media={image} alt={p.imageAltText} loading={first ? 'eager' : 'lazy'} />
        )}
      </div>
      <div className="info">
        <TitlePair as={first ? 'h1' : 'h2'} titleOne={p.titleOne} titleTwo={p.titleTwo} />
        {p.useStickers && p.stickers && p.stickers.length > 0 && (
          <div className="hero-stickers">
            {p.stickers.map((sticker) => (
              <MediaImage key={sticker.id} media={sticker} alt={null} className="hero-sticker" />
            ))}
          </div>
        )}
        {p.subTitle && <p>{p.subTitle}</p>}
        <div className="cta-holder">
          <CmsLink link={firstLink(p.buttonOne)} variant="primary" />
          <CmsLink link={firstLink(p.buttonTwo)} variant="secondary" />
        </div>
      </div>
    </div>
  );
}

/** The homepage hero — a full-bleed media carousel with the headline overlay. */
export function HeaderSliderBlock({ block }: { block: HeaderSliderContainerBlock }) {
  const slides = block.properties.items.items.map(({ content }, i) => ({
    key: content.id,
    node: <HeaderSlide item={content} first={i === 0} />,
  }));
  if (slides.length === 0) return null;

  return (
    <section className="home-intro" aria-label="Featured">
      <SlideShow label="Featured" slides={slides} autoplayMs={7000} className="home-carousel" arrows />
    </section>
  );
}
