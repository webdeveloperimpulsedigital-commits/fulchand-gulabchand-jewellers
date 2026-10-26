'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { ButtonLink } from '@/components/Links';
import { getAssetUrl } from '@/utils/basePath';
import styles from './Forward.module.css';

const ERA_DURATION = 7500; // 7.5 seconds per era before auto-advancing

const ERAS = [
  {
    id: 'era-1948',
    year: '1948',
    eyebrow: 'THE GENESIS',
    title: 'The Foundation of Pure Gold',
    oneLiner: 'Founded on Gokhale Road, Thane, by Bhavana Ben on absolute 22-karat purity and enduring familial trust.',
    badge: 'ESTD 1948 · NAUPADA, THANE',
    video: getAssetUrl('/videos/era-1948.mp4'),
    image: getAssetUrl('/images/ai-jewellery/archive-vintage-goldsmith.webp'),
    alt: 'Archival 1948 photograph of traditional master goldsmith at wooden workbench in Thane atelier',
  },
  {
    id: 'era-craft',
    year: '1975',
    eyebrow: 'THREE GENERATIONS',
    title: 'Three Generations of Unbroken Craft',
    oneLiner: 'Seven decades shaping royal wedding suites, passing ancient Nakshi chasing, Jadau, and lac work from parent to child.',
    badge: 'HAND-CHASED KARIGARI · 22KT HALLMARKED',
    video: getAssetUrl('/videos/era-1975.mp4'),
    image: getAssetUrl('/images/ai-jewellery/craft-goldsmith-bench.webp'),
    alt: 'Master goldsmith bench with handcrafted tools, gold wire, and delicate repoussé chasing',
  },
  {
    id: 'era-today',
    year: 'TODAY',
    eyebrow: 'THE MODERN ERA',
    title: 'Carrying the Legacy Forward',
    oneLiner: 'Diksha carries the house into a new golden era — sculpting contemporary bridal couture for the modern woman.',
    badge: 'DIKSHA’S ERA · THE HOUSE OF GOLD',
    video: getAssetUrl('/videos/era-today.mp4'),
    image: getAssetUrl('/images/ai-jewellery/collection-necklace-on-body.webp'),
    alt: 'Modern Indian woman draped in elegance, wearing signature handcrafted 22KT gold bridal jewellery',
    cta: true,
  },
];

/**
 * Forward — Single-Screen Cinema Storyboard (100vh)
 * No scroll-lock. Displays in one clean viewport height with automated luxury sequential playback
 * and instant interactive era selection.
 */
export default function Forward() {
  const videoRefs = useRef([]);
  const [activeEraIndex, setActiveEraIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Advance to next era
  const nextEra = useCallback(() => {
    setActiveEraIndex((prev) => (prev + 1) % ERAS.length);
    setProgress(0);
  }, []);

  // Jump to specific era
  const selectEra = (idx) => {
    setActiveEraIndex(idx);
    setProgress(0);
  };

  // Automated timer that fills the active era progress bar and transitions to the next
  useEffect(() => {
    if (isPaused) return;

    const intervalTime = 50; // update every 50ms for buttery smooth progress
    const increment = (intervalTime / ERA_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + increment >= 100) {
          nextEra();
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPaused, nextEra]);

  // Video playback control: play active video from start, pause others
  useEffect(() => {
    videoRefs.current.forEach((videoEl, idx) => {
      if (!videoEl) return;
      if (idx === activeEraIndex) {
        videoEl.currentTime = 0;
        videoEl.play().catch(() => {});
      } else {
        videoEl.pause();
      }
    });
  }, [activeEraIndex]);

  const currentEra = ERAS[activeEraIndex];

  return (
    <section
      className={styles.cinemaSection}
      id="house"
      aria-label="Our Heritage: Three Generations"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top Header Ribbon: One-line story & segmented era progress */}
      <header className={styles.topHeader}>
        <div className={styles.topHeaderInner}>
          {/* Left: Era Switcher Pills */}
          <div className={styles.eraNav}>
            <span className={styles.labelPrefix}>THE HOUSE</span>
            <div className={styles.pillGroup}>
              {ERAS.map((era, idx) => {
                const isActive = idx === activeEraIndex;
                return (
                  <button
                    key={era.id}
                    type="button"
                    className={`${styles.eraNavBtn} ${isActive ? styles.eraNavBtnActive : ''}`}
                    onClick={() => selectEra(idx)}
                    aria-label={`Jump to ${era.year} story`}
                  >
                    <span className={styles.navDot} />
                    <span>{era.year}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center: Dynamic Single-Line Narrative */}
          <div className={styles.singleLineWrap}>
            {ERAS.map((era, idx) => {
              const isActive = idx === activeEraIndex;
              return (
                <div
                  key={era.id}
                  className={`${styles.oneLineCard} ${isActive ? styles.oneLineCardActive : ''}`}
                  aria-hidden={!isActive}
                >
                  <span className={styles.yearTag}>{era.year}</span>
                  <span className={styles.sepDot}>·</span>
                  <strong className={styles.titleText}>{era.title}</strong>
                  <span className={styles.sepDash}>—</span>
                  <span className={styles.descText}>{era.oneLiner}</span>
                </div>
              );
            })}
          </div>

          {/* Right: Badge Pill & Counter */}
          <div className={styles.topMeta}>
            <span className={styles.badgePill}>{currentEra.badge}</span>
            <div className={styles.eraCounter}>
              <span className={styles.counterNum}>0{activeEraIndex + 1}</span>
              <span className={styles.counterDiv}>/</span>
              <span className={styles.counterNum}>03</span>
            </div>
          </div>
        </div>

        {/* 3-Segment Luxury Progress Bar */}
        <div className={styles.timelineBar} aria-hidden="true">
          {ERAS.map((era, idx) => {
            let fillWidth = 0;
            if (idx < activeEraIndex) {
              fillWidth = 100;
            } else if (idx === activeEraIndex) {
              fillWidth = progress;
            }
            return (
              <div
                key={era.id}
                className={styles.timelineSegment}
                onClick={() => selectEra(idx)}
              >
                <div className={styles.segmentFill} style={{ width: `${fillWidth}%` }} />
              </div>
            );
          })}
        </div>
      </header>

      {/* Expansive Cinema Stage: Full Width Video in 1 Viewport */}
      <div className={styles.cinemaStage}>
        {ERAS.map((era, idx) => {
          const isActive = idx === activeEraIndex;
          return (
            <div
              key={era.id}
              className={`${styles.cinemaLayer} ${isActive ? styles.cinemaLayerActive : ''}`}
            >
              {/* Era Video (Autoplays and loops when active) */}
              <video
                ref={(el) => (videoRefs.current[idx] = el)}
                src={getAssetUrl(era.video)}
                className={styles.cinemaVideo}
                autoPlay={isActive}
                loop
                muted
                playsInline
                preload="auto"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
                aria-label={era.title}
              />

              {/* Fallback Archival Photography */}
              <div className={styles.imageFallback}>
                <Image
                  src={era.image}
                  alt={era.alt}
                  fill
                  priority={idx === 0}
                  sizes="100vw"
                  className={styles.bgImage}
                />
              </div>
            </div>
          );
        })}

        {/* Cinematic Scrim */}
        <div className={styles.cinemaScrim} aria-hidden="true" />

        {/* Bottom Bar: Film Recording & CTA & Next/Prev Controls */}
        <div className={styles.bottomBar}>
          <div className={styles.filmIndicator}>
            <span className={styles.recDot} />
            <span>HERITAGE ARCHIVE · {currentEra.year}</span>
          </div>

          {currentEra.cta && (
            <div className={styles.ctaWrap}>
              <ButtonLink href="#visit">Plan Your Visit to the Atelier</ButtonLink>
            </div>
          )}

          {/* Interactive Prev / Next era arrows */}
          <div className={styles.eraControls}>
            <button
              type="button"
              className={styles.arrowBtn}
              onClick={() => selectEra((activeEraIndex - 1 + ERAS.length) % ERAS.length)}
              aria-label="Previous era"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <span className={styles.controlHint}>{isPaused ? 'PAUSED' : 'AUTO-PLAYING'}</span>
            <button
              type="button"
              className={styles.arrowBtn}
              onClick={() => selectEra((activeEraIndex + 1) % ERAS.length)}
              aria-label="Next era"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
