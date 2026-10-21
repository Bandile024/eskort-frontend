import { useEnrichment } from '../../../context/EnrichmentContext';
import type { CollectionPageItem } from '../../../types/contentTypes';
import { cmsContentUrl } from '../../../utils/links';
import { firstMedia } from '../../../utils/media';
import { MediaImage } from '../../ui/MediaImage';

/**
 * Renders a `collectionPage` reference as a category tile.  The inline shell
 * arrives with `properties: {}`; the enrichment context provides the full node
 * so the category logo renders instead of the neutral plate.
 */
export function CategoryCard({ item }: { item: CollectionPageItem }) {
  const { categories } = useEnrichment();
  const full = categories.get(item.id);
  const logo = firstMedia(full?.properties.logo);

  // The shop pages are not part of this SPA yet, so the tile points at the
  // CMS page. Swap for a react-router `Link` once the route exists.
  const href = cmsContentUrl(item.route?.path);

  return (
    <li className="category-slide">
      <a href={href}>
        <div className="category-slide__media">
          {logo ? (
            <MediaImage media={logo} alt={full?.properties.logoAltText ?? item.name} />
          ) : (
            <span className="category-slide__plate" aria-hidden="true" />
          )}
        </div>
        <span className="category-slide__label">{item.name}</span>
      </a>
    </li>
  );
}
