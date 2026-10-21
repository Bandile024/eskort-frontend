# Eskort – React frontend for Umbraco Delivery API

1. `npm install`
2. Open `.env` and set `VITE_UMBRACO_API_KEY` (and `VITE_UMBRACO_BASE_URL` if not `https://localhost:44322`)
3. `npm run dev` → http://localhost:5173

In dev, Vite proxies `/umbraco`, `/media` and `/video` to Umbraco, so no CORS setup or
trusted dev certificate is needed. For production builds (`npm run build`) the browser calls
`VITE_UMBRACO_BASE_URL` directly: enable CORS on Umbraco for your site's origin.

**Security:** `VITE_*` variables are bundled into the browser JS, so the Api-Key is visible to
anyone using the site. Use a read-only key, or route calls through your own backend/proxy.

## Structure
src/api/deliveryApi.ts            fetch service, getHomePage(), ApiError
src/types/umbraco.ts              generic Delivery API shapes
src/types/contentBlocks.ts        block interfaces + ContentBlock discriminated union
src/hooks/useHomePage.ts          loading / error / empty / success state
src/components/content/*          one component per block + ContentBlockRenderer
src/components/ui/*               CmsLink, MediaImage, SlideShow, ScrollSlider, TitlePair
src/layouts/MainLayout.tsx        header + <Outlet/> + footer
src/pages/HomePage.tsx            fetches and renders the page

## Adding a block
Add its interface to `contentBlocks.ts` and to the `ContentBlock` union, create the component,
and add it to `componentMap` in `ContentBlockRenderer.tsx` (TypeScript errors until you do).

## Recipes and products on the homepage
The homepage's sliders reference `recipeDetail` and `productPage` nodes, which arrive as empty
shells (`properties: {}`). The full nodes are fetched per id and merged in through
`EnrichmentContext`.

Per-id fetching is required, not a preference:
- the collection endpoint answers HTTP 500 for `recipeDetail` with `expand=properties`
- there are well over a thousand published `productPage` nodes, so no fixed `take` reaches the
  ones the homepage references

`recipeDetail` properties used by the card (read from the live Delivery API):
`headerImage`, `headerImageMobile`, `headerImageAltText`, `videoUrl`, `title`, `cookTime`,
`prepTime`, `serves`.

The recipe card renders what the CMS front-end renders: a "Total" line (prep + cook time), the
header image — or a looping video when the recipe has one — the title and a "View recipe" link.

`productPage` properties used by the card: `price` / `salePrice` (Umbraco Commerce money values),
`sku`, `promoImage`, `images`, `promoImageAltText`. The product card renders the image, the name,
the price and a "View product" link.

These pages are not implemented in this SPA yet, so the links point at the CMS page
(`utils/links.ts` → `cmsContentUrl`). Replace them with react-router `Link`s when the routes
exist, and remove `/recipes` and `/shop-online` from the Vite dev proxy in `vite.config.ts` at the
same time.

### Content the Delivery API cannot deliver
Some recipes answer HTTP 500 because a multi-value picker (`categories`, `timeToCook`,
`productType`) holds a bare string instead of a JSON array, which makes Umbraco fail while
serializing the node. Those cards render as a placeholder with the name only.

List them with:

```
node scripts/check-content.mjs          # the content on the homepage
node scripts/check-content.mjs --all    # every recipeDetail node
```

Fix them in the Umbraco back office by re-saving the affected picker values.
