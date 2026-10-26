'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAssetUrl } from '@/utils/basePath';
import styles from './HomeCollections.module.css';

const PRIMARY_COLLECTIONS = [
  {
    id: 'royal-polki',
    name: 'Royal Polki & Kundan',
    href: '/#explore',
    image: '/images/editorial/fgj-polki-choker.jpg',
    alt: 'Fulchand Gulabchand Royal Polki & Kundan Collection',
  },
  {
    id: 'temple-nakshi',
    name: 'Temple Gold & Nakshi',
    href: '/#explore',
    image: '/images/editorial/fgj-temple-necklace.jpg',
    alt: 'Fulchand Gulabchand Temple Gold & Nakshi Collection',
  },
  {
    id: 'bridal-trousseau',
    name: 'Maharashtrian Bridal Heritage',
    href: '/#explore',
    image: '/images/editorial/fgj-bridal-trousseau.jpg',
    alt: 'Fulchand Gulabchand Maharashtrian Bridal Heritage Collection',
  },
  {
    id: 'everyday-gold',
    name: 'Contemporary 22K Everyday Gold',
    href: '/#explore',
    image: '/images/editorial/fgj-everyday-gold.jpg',
    alt: 'Fulchand Gulabchand Contemporary 22K Everyday Gold Collection',
  },
];

const EXTENDED_COLLECTIONS = [
  {
    id: 'imperial-kadas',
    name: 'Imperial Kadas & Royal Bangles',
    href: '/#explore',
    image: '/images/editorial/fgj-temple-kadas.jpg',
    alt: 'Fulchand Gulabchand Imperial Kadas & Royal Bangles Collection',
  },
  {
    id: 'haute-solitaires',
    name: 'Solitaires & Haute Joaillerie',
    href: '/#explore',
    image: '/images/editorial/fgj-diamond-cascade.jpg',
    alt: 'Fulchand Gulabchand Solitaires & Haute Joaillerie Collection',
  },
];

export default function HomeCollections() {
  const [showAll, setShowAll] = useState(false);

  const displayedCollections = showAll
    ? [...PRIMARY_COLLECTIONS, ...EXTENDED_COLLECTIONS]
    : PRIMARY_COLLECTIONS;

  return (
    <section className={styles.homeCollections} id="collections" aria-label="Collections">
      {/* Title & Description Header Block — Starts flush with the logo line */}
      <div className={styles.titleDesc} data-aos="fade-up">
        <h2 className={styles.title}>Collections</h2>
        <p className={styles.lead}>
          Each collection from the House of Fulchand Gulabchand represents seven decades of sacred goldsmithing mastery. Select harmonious suites sculpted in certified 22-karat pure gold, uncut polki diamonds, and precious gemstones crafted for a lifetime of elegance.
        </p>
      </div>

      {/* Alternating Editorial Grid (40.86% / 57.7% rhythm matching https://nidatabba.com/) */}
      <div className={styles.collectionsList}>
        {displayedCollections.map((col, idx) => (
          <Link
            key={col.id}
            href={col.href}
            className={styles.collectionItem}
            data-aos="fade-up"
            data-aos-delay={(idx % 2) * 120}
          >
            {/* Image Wrap with Clean Editorial Image & Hover Vignette */}
            <div className={styles.imageWrap}>
              <Image
                src={getAssetUrl(col.image)}
                alt={col.alt}
                fill
                priority={idx < 2}
                sizes="(max-width: 960px) 100vw, 58vw"
                className={styles.cardImg}
              />
              <div className={styles.overlay} />
            </div>

            {/* Bottom-Left Caption with Sliding "View collection" Line Link */}
            <div className={styles.nameMore}>
              <h3 className={styles.collectionName}>{col.name}</h3>
              <span className={styles.collectionMore}>View collection</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Centered Explore All Collections CTA */}
      <div className={styles.bottomCta} data-aos="fade-up">
        <button
          type="button"
          onClick={() => setShowAll((prev) => !prev)}
          className={styles.exploreAllBtn}
          aria-label={showAll ? 'Show fewer collections' : 'Explore all collections'}
        >
          <span>{showAll ? 'Show fewer collections' : 'Explore All Collections (6)'}</span>
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={showAll ? styles.arrowUp : styles.arrowDown}
            aria-hidden="true"
          >
            <path
              d={showAll ? 'M19 15L12 8L5 15' : 'M5 12H19M19 12L12 5M19 12L12 19'}
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
