import { useEffect } from 'react';
import { ApiError } from '../api/deliveryApi';
import { ContentBlockRenderer } from '../components/content/ContentBlockRenderer';
import { EnrichmentContext } from '../context/EnrichmentContext';
import { useHomePage } from '../hooks/useHomePage';
import type { HomePageProperties } from '../types/contentBlocks';

function PageStatus({ title, message, onRetry }: { title: string; message: string; onRetry?: () => void }) {
  return (
    <div className="status" role="status">
      <h1>{title}</h1>
      <p>{message}</p>
      {onRetry && <button type="button" className="btn btn--primary" onClick={onRetry}>Try again</button>}
    </div>
  );
}

/** Applies title / description / robots from the page's SEO properties. */
function usePageMeta(properties: HomePageProperties | undefined) {
  useEffect(() => {
    if (!properties) return;
    document.title = properties.pageTitle || properties.siteName;

    let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!tag) {
      tag = document.createElement('meta');
      tag.name = 'description';
      document.head.appendChild(tag);
    }
    tag.content = properties.metaDescription;
  }, [properties]);
}

export function HomePage() {
  const state = useHomePage();
  usePageMeta(state.status === 'success' ? state.page.properties : undefined);

  switch (state.status) {
    case 'loading':
      return <div className="status" role="status" aria-busy="true"><div className="spinner" /><p>Loading…</p></div>;

    case 'error':
      return (
        <PageStatus
          title="We couldn't load this page"
          message={state.error.message}
          onRetry={state.error instanceof ApiError && state.error.kind === 'config' ? undefined : state.reload}
        />
      );

    case 'empty':
      return <PageStatus title="Nothing to show yet" message="No published home page was found in Umbraco." />;

    case 'success': {
      const blocks = state.page.properties.content.items;
      if (blocks.length === 0) {
        return <PageStatus title="This page has no content yet" message="Add content blocks to the home page in Umbraco and publish it." />;
      }
      return (
        // Provide fully-fetched enrichment maps to all block components so
        // CategoryCard, ProductCard, RecipeCard can render logos / images.
        <EnrichmentContext.Provider value={state.enrichment}>
          <ContentBlockRenderer blocks={blocks} />
        </EnrichmentContext.Provider>
      );
    }
  }
}
