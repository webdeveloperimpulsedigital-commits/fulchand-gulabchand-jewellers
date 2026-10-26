import Link from 'next/link';
import Image from 'next/image';
import { getAssetUrl } from '@/utils/basePath';
import { footerLinks, store } from '@/content/site';
import FGLetterform from '@/components/FGLetterform';
import styles from './Footer.module.css';

function LinkList({ items }) {
  return (
    <ul>
      {items.map((l) => (
        <li key={l.label}>
          <Link href={l.href}>{l.label}</Link>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  return (
    <footer className={styles.ftr}>
      <div className={`wrap ${styles.wrapContainer}`}>
        {/* Grand Footer Foundation Watermark — Anchored to content columns, half-cropped */}
        <FGLetterform
          letter="monogram"
          tone="champagne"
          position="custom"
          size="clamp(640px, 58vw, 880px)"
          strokeWidth={0.8}
          fill={true}
          delay={200}
          duration={2.4}
          className={styles.footerWatermark}
          style={{ height: 'auto', aspectRatio: '320 / 260' }}
        />

        <div className={styles.grid}>
          <div className={styles.brand}>
            <Image
              src={getAssetUrl('/images/brand/fgj-stacked.png')}
              alt={store.name}
              width={1200}
              height={1430}
              sizes="150px"
              className={styles.logo}
            />
            <p className={styles.brandTagline}>
              Seven decades of trust and uncompromising 22K gold artistry.
            </p>
          </div>
          <div className={styles.colJ}>
            <h2 className={styles.h}>Jewellery</h2>
            <LinkList items={footerLinks.jewellery} />
          </div>
          <div className={styles.colH}>
            <h2 className={styles.h}>The House</h2>
            <LinkList items={footerLinks.house} />
          </div>
          <div className={styles.colV}>
            <h2 className={styles.h}>Visit</h2>
            <p className={styles.addr}>
              {store.streetAddress}, {store.locality} (W)
              <br />
              {store.hours[0]} · {store.phone}
            </p>
            <ul>
              <li><Link href="/#visit">Plan your visit</Link></li>
              <li><a href={`https://wa.me/${store.whatsapp}?text=${encodeURIComponent('Hello Fulchand Gulabchand Jewellers, I would like to inquire about your jewellery collections.')}`} target="_blank" rel="noopener noreferrer">WhatsApp the store</a></li>
              <li><a href={store.instagram} target="_blank" rel="noopener noreferrer">Instagram (@fulchandgulabchand)</a></li>
              <li><a href={store.mapsUrl} target="_blank" rel="noopener noreferrer">Get directions</a></li>
              <li><Link href="/#visit">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.legal}>
          <span>© 2026 {store.name}. Certified Hallmarked Pure Gold.</span>
          <span className={styles.legalLinks}>
            {footerLinks.legal.map((l) => (
              <Link key={l.label} href={l.href}>
                {l.label}
              </Link>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
