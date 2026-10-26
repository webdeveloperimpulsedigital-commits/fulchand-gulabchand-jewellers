'use client';

import ImageSlot from '@/components/ImageSlot';
import Loupe from '@/components/Loupe';
import { assets } from '@/content/assets';
import styles from './FeaturedProduct.module.css';

/** 
 * FeaturedProduct — Haute Joaillerie Showcase
 */
export default function FeaturedProduct() {
  const asset = assets.featuredProduct;

  return (
    <section className={styles.section} aria-labelledby="prod-h">
      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        <div className={styles.grid}>
          {/* Left Column: High Jewelry Statement Piece with Loupe */}
          <div className={styles.media} data-aos="fade-up" id="featured-piece">
            <ImageSlot asset={asset} tone="white" motif="product" sizes="(max-width: 820px) 100vw, 55vw" reveal={false}>
              <Loupe src={asset.src} />
            </ImageSlot>
          </div>

          {/* Right Column: Editorial Narrative */}
          <div className={styles.copy}>
            <span data-aos="fade-up" className={styles.eyebrow}>
              Haute Joaillerie Statement
            </span>
            <h2 data-aos="fade-up" data-aos-delay="100" id="prod-h" className={styles.title}>
              The Emerald &amp; Diamond Cascade
            </h2>
            <p data-aos="fade-up" data-aos-delay="200" className={styles.paragraph}>
              Sculpted in lustrous platinum and white gold, this one-of-a-kind high jewelry statement unites vivid Colombian emeralds with cascades of pear and brilliant-cut white diamonds. Hand-set by our master artisans to drape with effortless architectural grace, each gemstone is certified for fire, purity, and exceptional brilliance.
            </p>
            <div data-aos="fade-up" data-aos-delay="300" className={styles.hint}>
              <span className={styles.hintDot} aria-hidden="true" />
              <span>Hover over the necklace with cursor to magnify details</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
