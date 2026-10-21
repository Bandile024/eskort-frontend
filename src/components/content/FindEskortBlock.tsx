import type { FindEskortBlock as Block } from '../../types/contentBlocks';
import { firstLink } from '../../utils/links';
import { CmsLink } from '../ui/CmsLink';
import { TitlePair } from '../ui/TitlePair';

/** The green "find an Eskort near you" band. */
export function FindEskortBlock({ block }: { block: Block }) {
  const p = block.properties;
  return (
    <section className="find-area">
      <div className="title">
        <TitlePair as="h2" titleOne={p.titleOne} titleTwo={p.titleTwo} className="title-pair--center" />
      </div>
      <div className="cta-holder">
        <CmsLink link={firstLink(p.buttonOne)} variant="primary" />
        <CmsLink link={firstLink(p.buttonTwo)} variant="secondary" />
        <CmsLink link={firstLink(p.buttonThree)} variant="secondary" />
      </div>
    </section>
  );
}
