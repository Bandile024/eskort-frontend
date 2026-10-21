import { createContext, useContext } from 'react';
import type { ContentFetchFailure } from '../api/deliveryApi';
import type { CollectionPage, ProductPage, RecipeDetail } from '../types/contentTypes';

/**
 * Holds fully-fetched versions of content types referenced (but not owned) by
 * the homepage — keyed by Umbraco content id.  Components consume this to
 * enrich inline shells (which arrive with `properties: {}`) with logos, images,
 * prices, etc. from the full node.
 */
export interface EnrichmentMaps {
  categories: Map<string, CollectionPage>;
  products: Map<string, ProductPage>;
  recipes: Map<string, RecipeDetail>;
  /**
   * Products whose content the Delivery API could not deliver. They are still
   * present in `products` as shells (name + link), so the homepage renders, but
   * their price and image are missing until the CMS data is fixed.
   */
  productFailures: ContentFetchFailure[];
  /**
   * Recipes whose content the Delivery API could not deliver. Same deal as
   * `productFailures`.
   */
  recipeFailures: ContentFetchFailure[];
}

const defaultMaps: EnrichmentMaps = {
  categories: new Map(),
  products: new Map(),
  recipes: new Map(),
  productFailures: [],
  recipeFailures: [],
};

export const EnrichmentContext = createContext<EnrichmentMaps>(defaultMaps);

/** Convenience hook. */
export function useEnrichment(): EnrichmentMaps {
  return useContext(EnrichmentContext);
}
