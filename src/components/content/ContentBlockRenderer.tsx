import type { ComponentType } from 'react';
import type { BlockOfType, ContentBlock, ContentBlockType } from '../../types/contentBlocks';
import type { BlockItem } from '../../types/umbraco';
import { CategoryContainerBlock } from './CategoryContainerBlock';
import { FindEskortBlock } from './FindEskortBlock';
import { GeneralSliderBlock } from './GeneralSliderBlock';
import { HeaderSliderBlock } from './HeaderSliderBlock';
import { InfoImageBlock } from './InfoImageBlock';
import { PromotionBannerBlock } from './PromotionBannerBlock';
import { SocialEngagementBlock } from './SocialEngagementBlock';
import { StickerMarqueeBlock } from './StickerMarqueeBlock';

/** Umbraco `contentType` alias → component. The mapped type forces every block type to be covered. */
type ComponentMap = { [K in ContentBlockType]: ComponentType<{ block: BlockOfType<K> }> };

const componentMap: ComponentMap = {
  headerSliderContainer: HeaderSliderBlock,
  categoryContainer: CategoryContainerBlock,
  stickerSliderContainer: StickerMarqueeBlock,
  generalSliderContainer: GeneralSliderBlock,
  promotionBannerContainer: PromotionBannerBlock,
  infoImageItemBlock: InfoImageBlock,
  socialEngagementCardContainer: SocialEngagementBlock,
  findEskortBlock: FindEskortBlock,
};

function isKnownType(type: string): type is ContentBlockType {
  return Object.prototype.hasOwnProperty.call(componentMap, type);
}

interface ContentBlockRendererProps {
  blocks: readonly BlockItem<ContentBlock>[];
}

/** Renders blocks in the exact order Umbraco returned them, keyed by the block's own id. */
export function ContentBlockRenderer({ blocks }: ContentBlockRendererProps) {
  return (
    <>
      {blocks.map(({ content }) => {
        // The API can return types newer than our union, so check at runtime.
        if (!isKnownType(content.contentType)) {
          if (import.meta.env.DEV) {
            console.warn(`[ContentBlockRenderer] No component for block type "${String(content.contentType)}" (id ${content.id}).`);
          }
          return null;
        }
        // Correlating the looked-up component with its block is not expressible in TS; the map type guarantees it.
        const Component = componentMap[content.contentType] as ComponentType<{ block: ContentBlock }>;
        return <Component key={content.id} block={content} />;
      })}
    </>
  );
}
