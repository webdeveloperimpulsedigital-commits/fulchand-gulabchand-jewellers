import Image, { getImageProps } from 'next/image';
import { getAssetUrl } from '@/utils/basePath';
import Motif from './Motif';
import Reveal from './Reveal';
import styles from './ImageSlot.module.css';

const MOBILE_QUERY = '(max-width: 820px)';

/** Art-directed image: a separate crop for phones (e.g. 9:16 hero) via <picture>. */
function ArtDirected({ src, mobileSrc, alt, sizes, priority, position, mobilePosition }) {
  const common = { alt, fill: true, sizes, priority };
  const { props: desktop } = getImageProps({ ...common, src });
  const {
    props: { srcSet: mobileSet },
  } = getImageProps({ ...common, src: mobileSrc, sizes: '100vw' });
  return (
    <picture>
      <source media={MOBILE_QUERY} srcSet={mobileSet} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt is spread from getImageProps */}
      <img
        {...desktop}
        className={styles.art}
        style={{
          ...desktop.style,
          objectFit: 'cover',
          '--pos': position || '50% 50%',
          '--pos-m': mobilePosition || position || '50% 50%',
        }}
      />
    </picture>
  );
}

/**
 * A framed image with a fixed aspect ratio.
 * - With `src`: renders an optimised next/image, cropped with object-position.
 * - Without `src`: renders the approved concept placeholder (ground tone,
 *   gold motif, slot label) so layout and proportions match the design.
 */
export default function ImageSlot({
  asset,
  tone = 'blush',
  motif,
  sizes = '100vw',
  priority = false,
  reveal = true,
  tagTop = false,
  className = '',
  style,
  children,
}) {
  const { src, mobileSrc, ratio, mobileRatio, position, mobilePosition, alt, tag, id } = asset;
  const frameStyle = { '--ratio': ratio, '--ratio-m': mobileRatio || ratio, ...style };

  let media;
  if (src && mobileSrc) {
    media = (
      <ArtDirected
        src={getAssetUrl(src)}
        mobileSrc={getAssetUrl(mobileSrc)}
        alt={alt}
        sizes={sizes}
        priority={priority}
        position={position}
        mobilePosition={mobilePosition}
      />
    );
  } else if (src) {
    media = (
      <Image
        src={getAssetUrl(src)}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectFit: 'cover', objectPosition: position || '50% 50%' }}
      />
    );
  } else {
    media = (
      <div className={styles.placeholder} role="img" aria-label={`Image to come: ${alt}`} data-slot={id}>
        {motif && <Motif name={motif} className={styles.motif} />}
        {tag && (
          <div className={`${styles.tag} ${tagTop ? styles.tagTop : ''}`} aria-hidden="true">
            <span>{tag[0]}</span>
            <span>{tag[1]}</span>
          </div>
        )}
      </div>
    );
  }

  const inner = (
    <div className={`${styles.slot} ${styles[tone] || ''} ${className}`} style={frameStyle} data-filled={src ? 'true' : 'false'}>
      {media}
      {children}
    </div>
  );

  // The hero is above the fold: never delay it behind a reveal.
  return reveal && !priority ? <Reveal variant="mask">{inner}</Reveal> : inner;
}
