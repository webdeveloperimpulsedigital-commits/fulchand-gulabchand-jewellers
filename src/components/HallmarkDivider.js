import Image from 'next/image';
import { getAssetUrl } from '@/utils/basePath';
import styles from './HallmarkDivider.module.css';

/**
 * HallmarkDivider — Delicate gold hairline chapter separator featuring the
 * authentic circular FG calligraphic hallmark medallion.
 *
 * @param {Object} props
 * @param {'light'|'dark'} [props.tone='light'] - Background color context
 * @param {string} [props.className] - Additional classes
 */
export default function HallmarkDivider({ tone = 'light', className = '' }) {
  return (
    <div
      className={`${styles.divider} ${styles[tone] || ''} ${className}`}
      role="separator"
      aria-hidden="true"
    >
      <div className={styles.line} />
      <div className={styles.medallion}>
        <div className={styles.sealRing}>
          <Image
            src={getAssetUrl('/images/brand/fgj-mark.png')}
            alt=""
            width={44}
            height={44}
            className={styles.markImg}
            priority={false}
          />
        </div>
      </div>
      <div className={styles.line} />
    </div>
  );
}
