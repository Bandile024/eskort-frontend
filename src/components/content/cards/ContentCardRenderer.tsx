import type { ComponentType } from 'react';
import type {
  CollectionPageItem,
  ProductPageItem,
  RecipeDetailItem,
} from '../../../types/contentTypes';
import { CategoryCard } from './CategoryCard';
import { ProductCard } from './ProductCard';
import { RecipeCard } from './RecipeCard';

/**
 * Any routable content item that can be rendered as a card on the homepage.
 * These are referenced (content-picker) content types the homepage composes in
 * even though it does not own them.
 */
export type ContentCardItem = CollectionPageItem | ProductPageItem | RecipeDetailItem;

interface CardProps {
  item: ContentCardItem;
}

/**
 * Maps a referenced content type to the card that renders it. This is the
 * composition layer's mapping logic: the homepage renders block layout from
 * `homePage` (via ContentBlockRenderer) and composes card content from
 * `collectionPage` / `productPage` / `recipeDetail` (via this registry).
 */
export const cardsRegistry: Record<string, ComponentType<CardProps>> = {
  collectionPage: CategoryCard as ComponentType<CardProps>,
  productPage: ProductCard as ComponentType<CardProps>,
  recipeDetail: RecipeCard as ComponentType<CardProps>,
};

interface ContentCardRendererProps {
  item: ContentCardItem;
}

/**
 * Renders a referenced content item as a card, resolved by its `contentType`.
 * Returns `null` (with a dev-only warning) for unmapped types, mirroring the
 * block renderer so new referenced types fail loudly in development.
 */
export function ContentCardRenderer({ item }: ContentCardRendererProps) {
  const Card = cardsRegistry[item.contentType];
  if (!Card) {
    if (import.meta.env.DEV) {
      console.warn(
        `[ContentCardRenderer] No card for contentType "${String(item.contentType)}" (id ${item.id}).`,
      );
    }
    return null;
  }
  return <Card item={item} />;
}
