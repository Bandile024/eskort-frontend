import { useCallback, useEffect, useState } from 'react';
import {
  ApiError,
  getCollectionPageMap,
  getHomePage,
  getProductPageMap,
  getRecipeDetailMap,
} from '../api/deliveryApi';
import type { EnrichmentMaps } from '../context/EnrichmentContext';
import type { HomePageItem } from '../types/contentBlocks';

export type HomePageState =
  | { status: 'loading' }
  | { status: 'error'; error: ApiError | Error }
  | { status: 'empty' }
  | { status: 'success'; page: HomePageItem; enrichment: EnrichmentMaps };

/**
 * Extracts every recipeDetail id referenced inside the homepage block list.
 * These are the only recipe ids we need to enrich — no need to fetch all 2985+
 * content nodes.
 */
function extractRecipeIds(page: HomePageItem): string[] {
  const ids = new Set<string>();
  for (const { content: block } of page.properties.content.items) {
    if (block.contentType === 'generalSliderContainer') {
      for (const { content: sliderItem } of block.properties.items.items) {
        for (const recipe of sliderItem.properties.recipes ?? []) {
          ids.add(recipe.id);
        }
      }
    }
  }
  return [...ids];
}

/**
 * Extracts every productPage id referenced inside the homepage block list.
 * The homepage references a couple of dozen products out of well over a
 * thousand published ones, so only these are fetched.
 */
function extractProductIds(page: HomePageItem): string[] {
  const ids = new Set<string>();
  for (const { content: block } of page.properties.content.items) {
    if (block.contentType === 'generalSliderContainer') {
      for (const { content: sliderItem } of block.properties.items.items) {
        for (const product of sliderItem.properties.products ?? []) {
          ids.add(product.id);
        }
      }
    }
  }
  return [...ids];
}

/**
 * Fetches the homepage block layout (required) and, in parallel, fully-expanded
 * data for the three referenced content types (optional enrichment).
 *
 * - collectionPage: fetched as a list with expand=properties (there are only
 *   a couple of dozen)
 * - productPage and recipeDetail: fetched per-id via the single-item endpoint
 *   (the list endpoint returns 500 for recipeDetail, and it cannot be paged to
 *   find the referenced products)
 *
 * All enrichment fetches are non-fatal — if they fail the homepage still renders
 * with shells (neutral plates / name only).
 */
export function useHomePage(): HomePageState & { reload: () => void } {
  const [state, setState] = useState<HomePageState>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    setState({ status: 'loading' });

    // Wrap the optional list fetch so it never rejects.
    function safeMap<T extends object>(
      fn: (sig: AbortSignal) => Promise<Map<string, T>>,
    ): Promise<Map<string, T>> {
      return fn(signal).catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') throw err;
        if (import.meta.env.DEV) {
          console.warn('[useHomePage] Enrichment fetch failed (non-fatal):', err);
        }
        return new Map<string, T>();
      });
    }

    // Step 1: fetch the homepage layout first (required).
    getHomePage(signal)
      .then((page) => {
        if (!page) {
          setState({ status: 'empty' });
          return;
        }

        // Step 2: enrich in parallel. Only the ids the homepage actually
        // references are fetched — never the whole collection.
        const recipeIds = extractRecipeIds(page);
        const productIds = extractProductIds(page);

        Promise.all([
          safeMap(getCollectionPageMap),
          getProductPageMap(productIds, signal),
          getRecipeDetailMap(recipeIds, signal),
        ])
          .then(([categories, productResult, recipeResult]) => {
            const { items: products, failures: productFailures } = productResult;
            const { items: recipes, failures: recipeFailures } = recipeResult;

            if (import.meta.env.DEV) {
              if (productFailures.length > 0) {
                console.warn(
                  `[useHomePage] ${productFailures.length} product(s) could not be expanded — their content is missing until the CMS data is fixed:`,
                  productFailures,
                );
              }
              if (recipeFailures.length > 0) {
                console.warn(
                  `[useHomePage] ${recipeFailures.length} recipe(s) could not be expanded — their content is missing until the CMS data is fixed:`,
                  recipeFailures,
                );
              }
            }

            setState({
              status: 'success',
              page,
              enrichment: {
                categories,
                products,
                recipes,
                productFailures,
                recipeFailures,
              },
            });
          })
          .catch((err: unknown) => {
            if (err instanceof DOMException && err.name === 'AbortError') return;
            // Enrichment failure — still render the page without enrichment.
            setState({
              status: 'success',
              page,
              enrichment: {
                categories: new Map(),
                products: new Map(),
                recipes: new Map(),
                productFailures: [],
                recipeFailures: [],
              },
            });
          });
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setState({
          status: 'error',
          error: error instanceof Error ? error : new Error(String(error)),
        });
      });

    return () => controller.abort();
  }, [attempt]);

  const reload = useCallback(() => setAttempt((n) => n + 1), []);
  return { ...state, reload };
}
