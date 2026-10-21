import type {
  GeneralSliderContainerBlock,
  GeneralSliderLayout,
} from '../../types/contentBlocks';
import type { ContentCardItem } from './cards/ContentCardRenderer';
import { ContentCardRenderer } from './cards/ContentCardRenderer';
import { firstLink } from '../../utils/links';
import { CmsLink } from '../ui/CmsLink';
import { ScrollSlider } from '../ui/ScrollSlider';
import { TitlePair } from '../ui/TitlePair';

/**
 * Layout names chosen in Umbraco → the section the CMS front-end renders.
 * `Product Layout One` is the light-blue product band, `Product Layout Two`
 * the light-green "favourites" band and `Recipe Layout One` the black recipe
 * band. Three and Four also appear on productsPage and map to the same bands.
 */
const LAYOUT_SECTION: Record<GeneralSliderLayout, string> = {
  'Product Layout One': 'product-preview',
  'Product Layout Two': 'product-preview favourites',
  'Product Layout Three': 'product-preview',
  'Product Layout Four': 'product-preview favourites',
  'Recipe Layout One': 'recipes-preview',
};

interface SliderEntry {
  key: string;
  item: ContentCardItem;
}

/**
 * Renders a product / recipe slider. Each slider item picks `productPage` and/or
 * `recipeDetail` references — content the homepage does not own — so cards are
 * resolved through the composition layer (`ContentCardRenderer`) by contentType.
 */
export function GeneralSliderBlock({ block }: { block: GeneralSliderContainerBlock }) {
  const p = block.properties;

  const entries: SliderEntry[] = p.items.items.flatMap(({ content }) => {
    const keyBase = content.id;
    const products = content.properties.products ?? [];
    const recipes = content.properties.recipes ?? [];
    return [
      ...products.map((item): SliderEntry => ({ key: `${keyBase}:${item.id}`, item })),
      ...recipes.map((item): SliderEntry => ({ key: `${keyBase}:${item.id}`, item })),
    ];
  });
  if (entries.length === 0) return null;

  const layout = p.items.items[0]?.content.properties.layout;
  const sectionClass = LAYOUT_SECTION[layout ?? 'Product Layout One'];
  const isRecipe = sectionClass === 'recipes-preview';

  return (
    <section className={sectionClass}>
      <div className="title">
        <TitlePair as="h3" titleOne={p.titleOne} titleTwo={p.titleTwo} />
        {p.subTitle && <p>{p.subTitle}</p>}
        <div className="cta-holder">
          <CmsLink link={firstLink(p.button)} variant={isRecipe ? 'primary' : 'black'} />
        </div>
      </div>
      <ScrollSlider
        label={`${p.titleOne} ${p.titleTwo}`}
        className={isRecipe ? 'recipe-carousel' : 'product-carousel'}
        lightDots={isRecipe}
      >
        {entries.map(({ key, item }) => (
          <ContentCardRenderer key={key} item={item} />
        ))}
      </ScrollSlider>
    </section>
  );
}
