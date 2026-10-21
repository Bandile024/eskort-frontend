import type { CategoryContainerBlock as Block } from '../../types/contentBlocks';
import { ContentCardRenderer } from './cards/ContentCardRenderer';
import { ScrollSlider } from '../ui/ScrollSlider';
import { TitlePair } from '../ui/TitlePair';

/**
 * Renders the homepage's category strip. The categories are `collectionPage`
 * references — content the homepage does not own — so each one is rendered
 * through the composition layer (`ContentCardRenderer`) rather than inline.
 */
export function CategoryContainerBlock({ block }: { block: Block }) {
  const { titleOne, titleTwo, categories } = block.properties;
  if (categories.length === 0) return null;

  // Show only the first three categories on the homepage.
  const visibleCategories = categories.slice(0, 3);

  return (
    <section className="our-categories">
      <div className="title">
        <TitlePair as="h3" titleOne={titleOne} titleTwo={titleTwo} className="title-pair--center" />
      </div>
      <ScrollSlider label={`${titleOne} ${titleTwo}`} className="category-carousel" dots={false}>
        {visibleCategories.map((category) => (
          <ContentCardRenderer key={category.id} item={category} />
        ))}
      </ScrollSlider>
    </section>
  );
}
