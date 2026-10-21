import { Link } from 'react-router-dom';
import type { ApiLink } from '../../types/umbraco';
import { resolveLink } from '../../utils/links';
import { ChevronRight } from './Icons';

export type ButtonVariant = 'primary' | 'secondary' | 'black' | 'text' | 'red';

interface CmsLinkProps {
  link: ApiLink | undefined;
  variant?: ButtonVariant;
  /** Hide the trailing chevron (the CMS leaves it off on some CTAs). */
  arrow?: boolean;
}

/** Renders an Umbraco link picker value as a button (router link or external anchor). */
export function CmsLink({ link, variant = 'primary', arrow = true }: CmsLinkProps) {
  if (!link) return null;
  const resolved = resolveLink(link);
  if (!resolved) return null;

  const className = `btn btn--${variant}`;
  const content = (
    <>
      {link.title}
      {arrow && <ChevronRight width={14} height={14} />}
    </>
  );

  if (!resolved.external) {
    return <Link to={resolved.href} className={className}>{content}</Link>;
  }
  const newTab = link.target === '_blank';
  return (
    <a
      href={resolved.href}
      className={className}
      target={link.target ?? undefined}
      rel={newTab ? 'noopener noreferrer' : undefined}
    >
      {content}
    </a>
  );
}
