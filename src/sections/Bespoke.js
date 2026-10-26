import ImageSlot from '@/components/ImageSlot';
import Reveal from '@/components/Reveal';
import { TextLink } from '@/components/Links';
import { assets } from '@/content/assets';
import styles from './Bespoke.module.css';

/** 8 · Bespoke — on the Ivory band, sketch-to-piece. Crimson headline is this screen's One Crimson. */
export default function Bespoke() {
  return (
    <section className="sec" id="bespoke" aria-labelledby="besp-h">
      <div className="wrap">
        <div className={styles.grid}>
          <Reveal className={styles.copy}>
            <p className="label">Bespoke</p>
            <h2 className={`h1 ${styles.h}`} id="besp-h">
              Made for one.
            </h2>
            <p className="body">
              Every bespoke heirloom begins with an intimate conversation — sketching your vision, selecting ethically certified gemstones, and hand-forging pure gold into a one-of-a-kind legacy.
            </p>
            <div>
              <TextLink href="#visit">Begin a bespoke conversation</TextLink>
            </div>
          </Reveal>
          <div className={styles.media}>
            <ImageSlot asset={assets.bespoke} tone="blush" motif="bespoke" sizes="(max-width: 820px) 100vw, 48vw" />
          </div>
        </div>
      </div>
    </section>
  );
}
