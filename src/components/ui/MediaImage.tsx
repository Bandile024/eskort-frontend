import type { ImgHTMLAttributes } from 'react';
import type { MediaItem } from '../../types/umbraco';
import { focalPointStyle, resolveAssetUrl } from '../../utils/media';

interface MediaImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  media: MediaItem | undefined;
  /** `null` / undefined renders a decorative image (empty alt). */
  alt?: string | null;
}

export function MediaImage({ media, alt, style, ...rest }: MediaImageProps) {
  if (!media) return null;
  return (
    <img
      src={resolveAssetUrl(media.url)}
      alt={alt ?? ''}
      width={media.width}
      height={media.height}
      loading="lazy"
      decoding="async"
      style={{ ...focalPointStyle(media), ...style }}
      {...rest}
    />
  );
}
