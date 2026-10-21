import type {
  SocialEngagementCardContainerBlock,
  SocialEngagementCardItemContent,
} from '../../types/contentBlocks';
import { firstLink } from '../../utils/links';
import { firstMedia, resolveAssetUrl } from '../../utils/media';
import { CmsLink } from '../ui/CmsLink';
import { MediaImage } from '../ui/MediaImage';
import { TitlePair } from '../ui/TitlePair';

function EngagementCard({ item }: { item: SocialEngagementCardItemContent }) {
  const p = item.properties;
  const videoSrc = p.useImage ? undefined : resolveAssetUrl(p.videoUrl);

  return (
    <li className="info-card">
      <div className="details">
        <div className="thumb">
          {videoSrc ? (
            <video src={videoSrc} autoPlay muted loop playsInline aria-label={p.videoAltText ?? undefined} />
          ) : (
            <MediaImage media={firstMedia(p.image)} alt={p.imageAltText} />
          )}
        </div>
        <div className="info">
          <div className="title">
            {p.badge && <p className="year-est">{p.badge}</p>}
            <TitlePair as="h3" titleOne={p.titleOne} titleTwo={p.titleTwo} />
          </div>
          {p.body && (
            <div className="body">
              <p>{p.body}</p>
            </div>
          )}
          <div className="cta-holder">
            <CmsLink link={firstLink(p.button)} variant="primary" />
          </div>
        </div>
      </div>
    </li>
  );
}

/** The heritage cards — a dark panel over a photo, repeated once per card. */
export function SocialEngagementBlock({ block }: { block: SocialEngagementCardContainerBlock }) {
  const items = block.properties.items.items;
  if (items.length === 0) return null;
  return (
    <ul className="info-card-area">
      {items.map(({ content }) => (
        <EngagementCard key={content.id} item={content} />
      ))}
    </ul>
  );
}
