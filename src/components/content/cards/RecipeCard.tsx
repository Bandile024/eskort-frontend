import { useEnrichment } from '../../../context/EnrichmentContext';
import type { RecipeDetailItem } from '../../../types/contentTypes';
import { cmsContentUrl } from '../../../utils/links';
import { firstMedia, resolveAssetUrl } from '../../../utils/media';
import { totalTime } from '../../../utils/time';
import { MediaImage } from '../../ui/MediaImage';

/**
 * Renders a `recipeDetail` reference as a recipe card.
 *
 * The inline shell arrives with `properties: {}`; the enrichment context
 * provides the full node, which carries the header image, the video, the
 * times and the alt text.
 *
 * The content matches the CMS front-end: the header image — or a looping
 * video when the recipe has one — with a "Total" badge (prep + cook time)
 * over the top, the recipe title and a "View Recipe" link.
 */
export function RecipeCard({ item }: { item: RecipeDetailItem }) {
  const { recipes } = useEnrichment();
  const full = recipes.get(item.id);
  const properties = full?.properties ?? {};

  const title = properties.title?.trim() || item.name;
  const image = firstMedia(properties.headerImage) ?? firstMedia(properties.headerImageMobile);
  const alt = properties.headerImageAltText?.trim() || title;
  const videoUrl = properties.videoUrl?.trim() || null;
  const total = totalTime(properties.cookTime, properties.prepTime);

  // The recipes page is not part of this SPA yet, so the card points at the
  // CMS page. Swap for a react-router `Link` once the route exists.
  const href = cmsContentUrl(item.route?.path);

  const media = videoUrl ? (
    <video
      src={resolveAssetUrl(videoUrl)}
      muted
      autoPlay
      playsInline
      loop
      preload="metadata"
      aria-label={title}
    />
  ) : image ? (
    <MediaImage media={image} alt={alt} />
  ) : (
    <span className="recipe-card__placeholder" aria-hidden="true" />
  );

  return (
    <li className="recipe-card">
      <a href={href} className="recipe-card__link">
        <div className="recipe-card__body">
          <div className="recipe-card__media">
            {media}
            {total && <span className="recipe-card__timing">Total: {total}</span>}
          </div>
          <div className="recipe-card__info">
            <h4 className="recipe-card__title">{title}</h4>
            <span className="recipe-card__cta">View Recipe</span>
          </div>
        </div>
      </a>
    </li>
  );
}
