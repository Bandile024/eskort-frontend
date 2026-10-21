interface TitlePairProps {
  titleOne: string;
  titleTwo: string;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
}

/** The brand's two-line headline: condensed caps over the hand-lettered line. */
export function TitlePair({ titleOne, titleTwo, as: Tag = 'h2', className = '' }: TitlePairProps) {
  return (
    <Tag className={`title-pair ${className}`.trim()}>
      <span className="title-pair__one">{titleOne}</span>
      <span className="title-pair__two">{titleTwo}</span>
    </Tag>
  );
}
