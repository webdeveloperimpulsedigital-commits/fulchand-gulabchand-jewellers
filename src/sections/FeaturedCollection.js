import ImageSlot from '@/components/ImageSlot';
import Reveal from '@/components/Reveal';
import { TextLink } from '@/components/Links';
import { assets } from '@/content/assets';
import ui from '@/components/ui.module.css';
import styles from './FeaturedCollection.module.css';

/** 2 · Featured collection — large on-body frame against a small cut-out. */
export default function FeaturedCollection() {
  return (
    <section className="sec" aria-labelledby="coll-h">
      <div className="wrap">
        <div className={styles.pair}>

          <div className={`${styles.large} ${ui.hallmarkCornerFrame}`}>
            <ImageSlot asset={assets.collectionOnBody} motif="onBody" sizes="(max-width: 820px) 100vw, 55vw" />
          </div>
          <div className={styles.side}>
            <div className={styles.cutout}>
              <ImageSlot asset={assets.collectionCutout} tone="white" motif="earrings" sizes="(max-width: 820px) 60vw, 25vw" />
            </div>
            <Reveal className={styles.copy}>
              <p className="label">New collection</p>
              <h2 className="h1" id="coll-h">The Rajawat Collection</h2>
              <p className="body">
                A signature bridal statement from the house of Fulchand Gulabchand. Handcrafted in hallmarked 22-karat gold with royal uncut polki diamonds, luminous rubies, and tiered pearl drops — sculpted for generational weddings and cherished family traditions.
              </p>
              <div>
                <TextLink href="#explore">See the collection</TextLink>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
