import { env } from '../config/env';
import type { HomePageItem } from '../types/contentBlocks';
import type { CollectionPage, ProductPage, RecipeDetail } from '../types/contentTypes';
import type { ContentItemRoot, DeliveryListResponse } from '../types/umbraco';

const DELIVERY_PATH = '/umbraco/delivery/api/v2/content';
const DELIVERY_ITEM_PATH = '/umbraco/delivery/api/v2/content/item';

export type ApiErrorKind = 'config' | 'network' | 'http' | 'invalid-json' | 'invalid-shape';

export class ApiError extends Error {
  constructor(
    public readonly kind: ApiErrorKind,
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

function assertConfigured(): void {
  if (!env.baseUrl || !env.apiKey) {
    throw new ApiError(
      'config',
      'Missing VITE_UMBRACO_BASE_URL or VITE_UMBRACO_API_KEY. Set them in .env and restart the dev server.',
    );
  }
}

/**
 * Generic Delivery API GET. Throws `ApiError` for every failure mode.
 * `path` overrides the collection path — used for the single-item endpoint.
 */
async function deliveryGet<T>(
  query: Record<string, string>,
  signal?: AbortSignal,
  path: string = DELIVERY_PATH,
): Promise<T> {
  assertConfigured();

  const url = `${env.origin}${path}?${new URLSearchParams(query).toString()}`;

  let response: Response;
  try {
    response = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json', 'Api-Key': env.apiKey },
      signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error;
    throw new ApiError('network', 'Could not reach the content service. Check your connection and that Umbraco is running.');
  }

  if (!response.ok) {
    throw new ApiError(
      'http',
      response.status === 401 || response.status === 403
        ? 'The content service rejected the API key.'
        : `The content service returned ${response.status} ${response.statusText}.`.trim(),
      response.status,
    );
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new ApiError('invalid-json', 'The content service returned a response that is not valid JSON.');
  }
}

function isListResponse<T>(value: unknown): value is DeliveryListResponse<T> {
  return (
    typeof value === 'object' &&
    value !== null &&
    Array.isArray((value as { items?: unknown }).items)
  );
}

/**
 * Fetches the home page with its block list expanded.
 * Resolves to `null` when Umbraco has no published home page (empty response).
 */
export async function getHomePage(signal?: AbortSignal): Promise<HomePageItem | null> {
  const data = await deliveryGet<unknown>(
    {
      filter: 'contentType:homePage',
      expand: 'properties[content]',
    },
    signal,
  );

  if (!isListResponse<HomePageItem>(data)) {
    throw new ApiError('invalid-shape', 'The content service response did not have the expected structure.');
  }
  return data.items[0] ?? null;
}

/**
 * Fetches all published `collectionPage` nodes with their properties expanded
 * (gives us `logo`, `image`, etc.).
 *
 * A list request is enough here: there are only a couple of dozen categories,
 * so the whole collection fits in one response. Returns a map of
 * id → CollectionPage for O(1) enrichment lookup on the homepage category strip.
 */
export async function getCollectionPageMap(
  signal?: AbortSignal,
): Promise<Map<string, CollectionPage>> {
  const data = await deliveryGet<unknown>(
    {
      filter: 'contentType:collectionPage',
      expand: 'properties',
      take: '1000',
    },
    signal,
  );

  if (!isListResponse<CollectionPage>(data)) {
    throw new ApiError('invalid-shape', 'Unexpected response shape for collectionPage.');
  }
  return new Map(data.items.map((item) => [item.id, item]));
}

// ── Referenced content, fetched one node at a time ───────────────────────

/**
 * Why a node could not be fully fetched.
 *
 * `invalid-content` means the node exists and is published, but the Delivery
 * API cannot serialize its properties (HTTP 500 from Umbraco). That is a CMS
 * content-data problem — a picker value stored as a bare string instead of a
 * JSON array — and it has to be fixed in the back office.
 */
export type ContentFailureReason = 'invalid-content' | 'not-found' | 'network' | 'http';

export interface ContentFetchFailure {
  id: string;
  name: string;
  status?: number;
  reason: ContentFailureReason;
  detail?: string;
}

export interface ContentFetchResult<T> {
  /** Fully-fetched nodes, plus shells for the ones that failed to expand. */
  items: Map<string, T>;
  /** Nodes that could not be fully fetched. */
  failures: ContentFetchFailure[];
}

/** Per-node request budget — a hung request must not stall the homepage. */
const ITEM_REQUEST_TIMEOUT_MS = 8000;

interface ItemFetchOutcome<T> {
  item?: T;
  status?: number;
  reason?: ContentFailureReason;
  detail?: string;
  /** The caller aborted (navigation) — the caller must re-throw. */
  aborted?: boolean;
}

/**
 * Fetches one node with its properties expanded.
 *
 * The collection endpoint cannot be used for this: `expand=properties` on
 * `content?filter=contentType:recipeDetail` returns 500, and a single
 * unserialisable node poisons the whole collection. It also cannot be paged
 * reliably — there are well over a thousand `productPage` nodes, so any fixed
 * `take` misses the ones the homepage actually references. The single-item
 * endpoint is used instead: one request per referenced id, nothing else.
 */
async function fetchItemById<T>(
  id: string,
  path: string,
  signal?: AbortSignal,
): Promise<ItemFetchOutcome<T>> {
  assertConfigured();

  const controller = new AbortController();
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, ITEM_REQUEST_TIMEOUT_MS);

  const onOuterAbort = () => controller.abort();
  signal?.addEventListener('abort', onOuterAbort);

  try {
    const url = `${env.origin}${path}/${id}?expand=properties`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json', 'Api-Key': env.apiKey },
      signal: controller.signal,
    });

    if (!response.ok) {
      return {
        status: response.status,
        reason:
          response.status === 404
            ? 'not-found'
            : response.status === 500
              ? 'invalid-content'
              : 'http',
        detail: `The content service returned ${response.status} ${response.statusText}.`.trim(),
      };
    }

    const data = (await response.json()) as unknown as T;
    return { item: data };
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      if (!timedOut) return { aborted: true };
      return { reason: 'network', detail: `Timed out after ${ITEM_REQUEST_TIMEOUT_MS}ms.` };
    }
    return { reason: 'network', detail: 'Could not reach the content service.' };
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', onOuterAbort);
  }
}

/**
 * Fetches the minimal shell of a node (id, name, route). `fields` makes the
 * Delivery API skip property serialization, so this still works for nodes
 * whose properties cannot be expanded.
 */
async function fetchItemShell<T>(
  id: string,
  path: string,
  signal?: AbortSignal,
): Promise<T | undefined> {
  try {
    const data = await deliveryGet<unknown>(
      { fields: 'id,name,route' },
      signal,
      `${path}/${id}`,
    );
    if (typeof data !== 'object' || data === null) return undefined;
    return data as unknown as T;
  } catch {
    return undefined;
  }
}

/**
 * Fetches the nodes referenced by the homepage.
 *
 * A node that cannot be expanded still contributes its shell, so the card
 * keeps its name and link, and is reported in `failures` so the missing
 * content can be fixed in the CMS.
 */
export async function fetchItemsById<T>(
  ids: readonly string[],
  path: string,
  signal?: AbortSignal,
): Promise<ContentFetchResult<T>> {
  const items = new Map<string, T>();
  const failures: ContentFetchFailure[] = [];

  if (ids.length === 0) return { items, failures };

  await Promise.all(
    ids.map(async (id) => {
      const outcome = await fetchItemById<T>(id, path, signal);

      if (outcome.aborted) {
        throw new DOMException('Aborted', 'AbortError');
      }

      if (outcome.item) {
        const node = outcome.item as unknown as { id: string };
        items.set(node.id, outcome.item);
        return;
      }

      const shell = await fetchItemShell<T>(id, path, signal);
      if (shell) items.set(id, shell);

      failures.push({
        id,
        name: (shell as unknown as { name?: string } | undefined)?.name ?? id,
        status: outcome.status,
        reason: outcome.reason ?? 'http',
        detail: outcome.detail,
      });
    }),
  );

  return { items, failures };
}

/**
 * Fetches the recipes referenced by the homepage.
 *
 * Only the ids that appear on the homepage are fetched — no unnecessary work.
 */
export function getRecipeDetailMap(
  ids: readonly string[],
  signal?: AbortSignal,
): Promise<ContentFetchResult<RecipeDetail>> {
  return fetchItemsById<RecipeDetail>(ids, DELIVERY_ITEM_PATH, signal);
}

/**
 * Fetches the products referenced by the homepage.
 *
 * Fetched per id for the same reason as the recipes: there are over a thousand
 * published `productPage` nodes, so the collection endpoint cannot be paged
 * to find the handful the homepage references.
 */
export function getProductPageMap(
  ids: readonly string[],
  signal?: AbortSignal,
): Promise<ContentFetchResult<ProductPage>> {
  return fetchItemsById<ProductPage>(ids, DELIVERY_ITEM_PATH, signal);
}

/** Re-exported so the type of a fully-fetched node stays in one place. */
export type { ContentItemRoot };
