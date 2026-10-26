'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAssetUrl } from '@/utils/basePath';
import ChapterCrest from '@/components/ChapterCrest';
import styles from './CampaignSlider.module.css';

const CAMPAIGN_SLIDES = [
  {
    id: 'campaign-01',
    title: 'ROYAL POLKI CHOKER',
    image: '/images/campaign/fgj-polki-choker.jpg',
    alt: 'Fulchand Gulabchand uncut polki diamonds and 22k gold choker with Colombian emerald drops',
    ctaText: 'EXPLORE',
    href: '/#explore',
  },
  {
    id: 'campaign-02',
    title: 'TEMPLE NAKSHI KADAS',
    image: '/images/campaign/fgj-temple-kadas.jpg',
    alt: 'Fulchand Gulabchand handcrafted 22k solid gold nakshi kadas and gemstone bangles',
    ctaText: 'EXPLORE',
    href: '/#explore',
  },
  {
    id: 'campaign-03',
    title: 'ROYAL BRIDAL TROUSSEAU',
    image: '/images/campaign/fgj-bridal-trousseau.jpg',
    alt: 'Fulchand Gulabchand multi-layered bridal kundan, basra pearls, and ruby necklace ensemble',
    ctaText: 'EXPLORE',
    href: '/#explore',
  },
  {
    id: 'campaign-04',
    title: 'SACRED TEMPLE GOLD',
    image: '/images/campaign/fgj-temple-necklace.jpg',
    alt: 'Fulchand Gulabchand sacred Lakshmi temple gold repoussé necklace and Kolhapuri saaj',
    ctaText: 'EXPLORE',
    href: '/#explore',
  },
  {
    id: 'campaign-05',
    title: 'HAUTE JOAILLERIE',
    image: '/images/campaign/fgj-diamond-cascade.jpg',
    alt: 'Fulchand Gulabchand brilliant-cut natural diamond fringe collar with Colombian emerald teardrops',
    ctaText: 'EXPLORE',
    href: '/#explore',
  },
];

/**
 * CampaignSlider — Cinematic Full-Width Luxury Editorial Auto-Slider
 * Changes automatically every 4 seconds.
 * 
 * Features:
 * - ChapterCrest divider and grand black paragraph above
 * - Centered Heading + official brand Crimson red "EXPLORE" button
 * - Clean presentation: zero arrow buttons, zero line indicators
 * - Smooth crossfade changing every 4 seconds (4000ms)
 */
export default function CampaignSlider() {
  const [slideState, setSlideState] = useState({ active: 0, prev: null });
  const touchStartX = useRef(null);

  // Auto-advance slides every 4 seconds (4000ms) with smooth luxury dissolve
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideState((curr) => ({
        prev: curr.active,
        active: (curr.active + 1) % CAMPAIGN_SLIDES.length,
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      touchStartX.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null || !e.changedTouches || !e.changedTouches[0]) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swipe left -> Next
        setSlideState((curr) => ({
          prev: curr.active,
          active: (curr.active + 1) % CAMPAIGN_SLIDES.length,
        }));
      } else {
        // Swipe right -> Prev
        setSlideState((curr) => ({
          prev: curr.active,
          active: (curr.active - 1 + CAMPAIGN_SLIDES.length) % CAMPAIGN_SLIDES.length,
        }));
      }
    }
    touchStartX.current = null;
  };

  return (
    <section className={styles.sectionWrapper} aria-label="High Jewellery Campaign Gallery">
      {/* Chapter Crest Royal Brand Divider */}
      <ChapterCrest />

      {/* Editorial Prelude: Single grand paragraph in big black brand font */}
      <div className={styles.introWrap}>
        <p className={styles.introPara} data-aos="fade-up">
          A cinematic exploration of our master artisans’ grandest expressions — uniting royal Colombian emeralds, uncut polki diamonds, and certified 22-karat gold in timeless harmony.
        </p>
      </div>

      {/* Full-Width Auto-Sliding Stage with Smooth 4-Second Dissolve */}
      <div
        className={styles.sliderStage}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles.slidesTrack}>
          {CAMPAIGN_SLIDES.map((slide, idx) => {
            const isActive = idx === slideState.active;
            const isPrev = idx === slideState.prev;
            return (
              <div
                key={slide.id}
                className={`${styles.slide} ${isActive ? styles.slideActive : ''} ${isPrev ? styles.slidePrev : ''}`}
                aria-hidden={!isActive}
              >
                {/* Background Image Container */}
                <div className={styles.imageWrap}>
                  <Image
                    src={getAssetUrl(slide.image)}
                    alt={slide.alt}
                    fill
                    priority={idx === 0 || idx === 1}
                    sizes="100vw"
                    quality={92}
                    className={styles.image}
                  />
                </div>

                {/* Subtle Contrast Overlay for legibility */}
                <div className={styles.overlay} aria-hidden="true" />

                {/* Centered Heading & Brand Crimson Red Explore Button */}
                <div className={styles.content}>
                  <h2 className={styles.slideTitle}>{slide.title}</h2>
                  <Link href={slide.href} className={styles.ctaButton}>
                    {slide.ctaText}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
