import ImageSlot from '@/components/ImageSlot';
import Reveal from '@/components/Reveal';
import { assets } from '@/content/assets';
import styles from './Craft.module.css';

/** 6 · The craft — the making, shown at the bench. Top paragraph only, bottom clean widescreen imagery. */
export default function Craft() {
  return (
    <section className="sec" id="craft" aria-label="Craftsmanship">
      <div className="wrap">
        <div className={styles.container}>
          {/* Top Paragraph Only */}
          <Reveal className={styles.header}>
            <p className={styles.paragraph}>
              Our karigars shape sheets of 22-karat gold over natural lac beds using miniature punches and hammers, engraving sacred Indian motifs and filigree with unhurried precision.
            </p>
          </Reveal>

          {/* Bottom Widescreen Master Imagery (Clean, No Badges) */}
          <div className={styles.mediaWrap}>
            <div className={styles.mediaFrame}>
              <ImageSlot
                asset={assets.craft}
                motif="craft"
                sizes="(max-width: 820px) 100vw, 1200px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
