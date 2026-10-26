'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAssetUrl } from '@/utils/basePath';
import styles from './EditorialTriptych.module.css';

const TRIPTYCH_PANELS = [
  {
    id: 'everyday',
    title: 'Everyday Luxury',
    href: '/#explore',
    poster: '/images/triptych/contemporary.webp',
    video: '/videos/contemporary.mp4',
    alt: 'Everyday luxury contemporary fine gold and diamond drop earrings on Indian model',
  },
  {
    id: 'bridal',
    title: 'Bridal',
    href: '/#explore',
    poster: '/images/triptych/heritage.webp',
    video: '/videos/heritage.mp4',
    alt: 'Royal Indian bridal multi-strand Kundan Polki necklace and wedding jewellery',
  },
  {
    id: 'celebrations',
    title: 'Celebrations',
    href: '/#explore',
    poster: '/images/triptych/high-jewellery.webp',
    video: '/videos/high-jewellery.mp4',
    alt: 'Festive celebrations diamond fringe collar necklace and gala evening jewellery',
  },
];

function TriptychColumn({ panel, index, isActive, hoveredId, setHoveredId }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.load();

    const startPlayback = () => {
      const p = video.play();
      if (p !== undefined) {
        p.then(() => setIsPlaying(true)).catch(() => {});
      }
    };

    video.addEventListener('loadeddata', startPlayback);
    video.addEventListener('canplay', startPlayback);
    video.addEventListener('playing', () => setIsPlaying(true));

    startPlayback();

    return () => {
      video.removeEventListener('loadeddata', startPlayback);
      video.removeEventListener('canplay', startPlayback);
      video.removeEventListener('playing', () => setIsPlaying(true));
    };
  }, [panel.video]);

  const handleInteraction = () => {
    setHoveredId(panel.id);
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      if (video.paused) {
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  const isHovered = hoveredId === panel.id;
  const isDimmed = hoveredId !== null && !isHovered;

  return (
    <article
      className={`${styles.column} ${styles[`col${index}`]} ${isActive ? styles.active : ''} ${isHovered ? styles.columnHovered : ''} ${isDimmed ? styles.columnDimmed : ''}`}
      onMouseEnter={handleInteraction}
      onMouseMove={handleInteraction}
      onMouseLeave={() => setHoveredId(null)}
      onClick={handleInteraction}
      role="region"
      aria-label={`${panel.title} collection`}
    >
      {/* Background Poster Image */}
      <div className={`${styles.posterLayer} ${isPlaying ? styles.posterHidden : ''}`}>
        <Image
          src={getAssetUrl(panel.poster)}
          alt={panel.alt}
          fill
          priority
          sizes="(max-width: 820px) 100vw, 33.33vw"
          className={styles.posterImg}
        />
      </div>

      {/* Video Element */}
      <video
        ref={videoRef}
        src={getAssetUrl(panel.video)}
        className={styles.videoLayer}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label={panel.alt}
      />

      {/* Dark Vignette Scrim */}
      <div className={styles.scrim} aria-hidden="true" />

      {/* Bottom Editorial Caption */}
      <div className={styles.content}>
        <h3 className={styles.title}>{panel.title}</h3>
        <Link href={panel.href} className={styles.viewLink} aria-label={`View more ${panel.title}`}>
          VIEW MORE
        </Link>
      </div>
    </article>
  );
}

/**
 * EditorialTriptych — 3-Column Luxury Fashion Editorial
 * Features smooth scroll entrance animations from clean white background (zero dark voids).
 */
export default function EditorialTriptych() {
  const [hoveredId, setHoveredId] = useState(null);
  const sectionRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true);
        }
      },
      {
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.08,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-label="Collections Showcase">
      <div className={styles.triptychGrid}>
        {TRIPTYCH_PANELS.map((panel, idx) => (
          <TriptychColumn
            key={panel.id}
            panel={panel}
            index={idx}
            isActive={isActive}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
          />
        ))}
      </div>
    </section>
  );
}
