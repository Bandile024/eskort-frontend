import type { InfoImageItemBlock } from '../../types/contentBlocks';
import { firstLink } from '../../utils/links';
import { firstMedia } from '../../utils/media';
import { CmsLink } from '../ui/CmsLink';
import { MediaImage } from '../ui/MediaImage';
import { TitlePair } from '../ui/TitlePair';

/** The gold "discover" band: the artwork on one side, the headline on the other. */
export function InfoImageBlock({ block }: { block: InfoImageItemBlock }) {
  const p = block.properties;
  return (
    <section className="discover-area">
      <div className="banner">
        <MediaImage media={firstMedia(p.image)} alt={p.imageAltText} />
      </div>
      <div className="title">
        <TitlePair as="h2" titleOne={p.titleOne} titleTwo={p.titleTwo} />
        {p.subTitle && <p>{p.subTitle}</p>}
        <div className="cta-holder">
          <CmsLink link={firstLink(p.button)} variant="black" />
        </div>
      </div>
    </section>
  );
}
