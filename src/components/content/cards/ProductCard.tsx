import { useEnrichment } from '../../../context/EnrichmentContext';
import type { ProductPageItem } from '../../../types/contentTypes';
import { cmsContentUrl } from '../../../utils/links';
import { firstMedia } from '../../../utils/media';
import { ChevronRight } from '../../ui/Icons';
import { MediaImage } from '../../ui/MediaImage';

/**
 * Renders a `productPage` reference as a product card.  The inline shell
 * arrives with `properties: {}`; the enrichment context provides the full node
 * so the product image and price render when available.
 */
export function ProductCard({ item }: { item: ProductPageItem }) {
  const { products } = useEnrichment();
  const full = products.get(item.id);

  // Prefer the dedicated promo image, fall back to first product image.
  const image = firstMedia(full?.properties.promoImage) ?? firstMedia(full?.properties.images);
  const alt = full?.properties.promoImageAltText ?? item.name;

  // Umbraco Commerce money values — the formatted string is what the CMS
  // front-end shows ("R149,99"). A sale price replaces the regular one.
  const price = full?.properties.price;
  const salePrice = full?.properties.salePrice;
  const currentPrice = salePrice?.formatted?.withTax ?? price?.formatted?.withTax ?? null;
  const originalPrice =
    salePrice?.formatted?.withTax ? price?.formatted?.withTax ?? null : null;

  // The shop pages are not part of this SPA yet, so the card points at the CMS
  // page. Swap for a react-router `Link` once the route exists.
  const href = cmsContentUrl(item.route?.path);

  return (
    <li className="product-card">
      <a href={href} className="product-card__link">
        <div className="product-card__media">
          {image ? (
            <MediaImage media={image} alt={alt} />
          ) : (
            // The CMS has no media on its product nodes yet — show a branded
            // placeholder instead of an empty gap.
            <span className="product-card__placeholder" aria-hidden="true">
              <img src="/images/logo.svg" alt="" />
            </span>
          )}
        </div>
        <div className="product-card__body">
          <h4 className="product-card__title">{item.name}</h4>
          {originalPrice && (
            <p className="product-card__was">
              Was <s>{originalPrice}</s>
            </p>
          )}
          {currentPrice && <p className="product-card__price">{currentPrice}</p>}
          <span className="product-card__cta">
            View product <ChevronRight width={12} height={12} />
          </span>
        </div>
      </a>
    </li>
  );
}
