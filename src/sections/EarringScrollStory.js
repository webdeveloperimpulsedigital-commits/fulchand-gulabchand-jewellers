'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAssetUrl } from '@/utils/basePath';
import styles from './EarringScrollStory.module.css';

/**
 * EarringScrollStory — Interactive Scroll-Driven Masterpiece Showcase
 * 
 * Flow:
 * 1. Macro Exhibition: The Royal Kundan Chandbali floats in majestic macro size
 *    alongside artisanal purity specifications.
 * 2. The Flight: As user scrolls, the earring glides across the stage and scales down
 *    to wearable life size.
 * 3. The Docking: The earring settles gracefully onto the high-fashion editorial
 *    model's earlobe, locking in place with a golden hallmark shimmer.
 * 4. Full Reveal: Final editorial story copy and official Brand Red CTA appear.
 */
export default function EarringScrollStory() {
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const earAnchorRef = useRef(null);
  const earringRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isDocked, setIsDocked] = useState(false);

  useEffect(() => {
    let rAFId;

    const updateScroll = () => {
      if (!trackRef.current || !stageRef.current) return;

      const trackRect = trackRef.current.getBoundingClientRect();
      const stageRect = stageRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const windowW = window.innerWidth;

      // Check if section is currently active on screen
      const active = trackRect.top < windowH && trackRect.bottom > 0;
      setIsInView(active);

      if (!active) return;

      // Calculate scroll progress through the track (0.0 to 1.0)
      const totalScrollable = trackRect.height - windowH;
      const scrolled = -trackRect.top;
      const rawProgress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);
      setProgress(rawProgress);

      // Determine flight progress (smooth ease between 25% and 80% scroll)
      const flightStart = 0.22;
      const flightEnd = 0.78;
      const t = Math.min(Math.max((rawProgress - flightStart) / (flightEnd - flightStart), 0), 1);
      // Smooth luxury cubic ease
      const easeT = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const docked = t >= 0.98;
      setIsDocked(docked);

      // Compute geometric coordinates for earring glide
      if (earringRef.current && earAnchorRef.current) {
        const isMobile = windowW <= 960;
        const earringBaseSize = isMobile ? 240 : 340;
        const targetScale = isMobile ? 0.36 : 0.40;

        // Start position (Macro Showcase)
        const startX = isMobile
          ? stageRect.left + stageRect.width * 0.5 - earringBaseSize / 2
          : stageRect.left + stageRect.width * 0.22 - earringBaseSize / 2;
        const startY = isMobile
          ? stageRect.top + stageRect.height * 0.40 - earringBaseSize / 2
          : stageRect.top + stageRect.height * 0.52 - earringBaseSize / 2;

        // Target position (Model earlobe anchor)
        const anchorRect = earAnchorRef.current.getBoundingClientRect();
        // Pivot from the top hook of the earring (50% horizontal, 10% vertical)
        const targetX = anchorRect.left + anchorRect.width / 2 - (earringBaseSize * targetScale * 0.5);
        const targetY = anchorRect.top - (earringBaseSize * targetScale * 0.08);

        // Interpolated current transform
        const currentX = startX + (targetX - startX) * easeT;
        const currentY = startY + (targetY - startY) * easeT;
        const currentScale = 1.0 + (targetScale - 1.0) * easeT;
        const currentRot = 0 + (-4 - 0) * easeT;

        earringRef.current.style.width = `${earringBaseSize}px`;
        earringRef.current.style.height = `${earringBaseSize}px`;
        earringRef.current.style.left = `${currentX}px`;
        earringRef.current.style.top = `${currentY}px`;
        earringRef.current.style.transform = `scale(${currentScale}) rotate(${currentRot}deg)`;
        earringRef.current.style.opacity = active ? 1 : 0;
      }
    };

    const onScrollOrResize = () => {
      if (rAFId) cancelAnimationFrame(rAFId);
      rAFId = requestAnimationFrame(updateScroll);
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);
    updateScroll();

    return () => {
      if (rAFId) cancelAnimationFrame(rAFId);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, []);

  // Opacity calculations for cross-fading typography
  const macroOpacity = Math.max(1 - progress * 2.6, 0);
  const dockedOpacity = Math.min(Math.max((progress - 0.72) * 3.5, 0), 1);

  return (
    <section ref={trackRef} className={styles.scrollTrack} aria-label="Interactive Earring Craft Journey">
      {/* Sticky Fullscreen Stage */}
      <div ref={stageRef} className={styles.stage}>
        <div className={styles.bgWatermark} aria-hidden="true" />

        <div className={styles.container}>
          {/* Left Column: Macro Specs & Final Story */}
          <div className={styles.leftStoryCol}>
            {/* Phase 1: Macro Showcase Typography */}
            <div
              className={styles.macroTextWrap}
              style={{
                opacity: macroOpacity,
                transform: `translate3d(0, ${progress * -30}px, 0)`,
                pointerEvents: macroOpacity < 0.1 ? 'none' : 'auto',
              }}
            >
              <div className={styles.kicker}>
                <span className={styles.kickerDot} />
                <span>Atelier Masterwork · Chapter IV</span>
              </div>
              <h2 className={styles.mainTitle}>
                The Royal Kundan Chandbali
              </h2>
              <p className={styles.mainSubtitle}>
                Sculpted by master goldsmiths in 22-karat certified gold, uncut polki diamonds, and carved Colombian emerald teardrops.
              </p>

              <div className={styles.featurePills}>
                <div className={styles.pillItem}>
                  <span className={styles.pillDot} />
                  <span className={styles.pillText}>22KT BIS Hallmarked Pure Gold</span>
                </div>
                <div className={styles.pillItem}>
                  <span className={styles.pillDot} />
                  <span className={styles.pillText}>Uncut Polki Diamonds · Jadau Setting</span>
                </div>
                <div className={styles.pillItem}>
                  <span className={styles.pillDot} />
                  <span className={styles.pillText}>Carved Colombian Emeralds & Basra Pearls</span>
                </div>
              </div>

              <div className={styles.scrollCue}>
                <span>Scroll to see it worn</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Phase 3: Final Docked Look Typography */}
            <div
              className={`${styles.dockedStoryWrap} ${dockedOpacity > 0.1 ? styles.dockedActive : ''}`}
              style={{
                opacity: dockedOpacity,
                transform: `translateY(calc(-50% + ${(1 - dockedOpacity) * 20}px))`,
              }}
            >
              <div className={styles.dockedKicker}>
                Adorning Royal Grace
              </div>
              <h3 className={styles.dockedTitle}>
                From The Bench To Living Splendour
              </h3>
              <p className={styles.dockedPara}>
                Created to balance imperial weight with featherlight ergonomic comfort. A signature heirloom crafted to illuminate celebrations, weddings, and milestones for generations.
              </p>
              <Link href="/#explore" className={styles.ctaBtn}>
                <span>Explore This Piece</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Column: Editorial Model Portrait */}
          <div className={styles.rightModelCol}>
            <div
              className={styles.modelFrame}
              style={{
                opacity: Math.min(progress * 2.2 + 0.35, 1),
                transform: `scale(${0.96 + Math.min(progress * 0.04, 0.04)})`,
              }}
            >
              <Image
                src={getAssetUrl('/images/editorial/fgj-model-profile.jpg')}
                alt="Fulchand Gulabchand high jewellery editorial model side profile"
                fill
                sizes="(max-width: 960px) 76vw, 42vw"
                quality={92}
                className={styles.modelImg}
                priority
              />

              {/* Exact Target Earlobe Anchor Point */}
              <div ref={earAnchorRef} className={styles.earAnchor}>
                {/* Golden Halo Shimmer when docked */}
                <div className={`${styles.dockGlow} ${isDocked ? styles.dockGlowActive : ''}`} />
              </div>
            </div>
          </div>
        </div>

        {/* Floating Earring Element that glides across the stage */}
        <div
          ref={earringRef}
          className={styles.floatingEarring}
          style={{
            display: isInView ? 'block' : 'none',
          }}
          aria-hidden="true"
        >
          <img
            src={getAssetUrl('/images/editorial/fgj-earring-isolated.png')}
            alt="Handcrafted 22K Royal Gold Chandbali Earring"
            className={styles.earringImg}
            draggable={false}
          />

          {/* Micro Sparkle Flash when Earring Locks in place */}
          <div className={`${styles.sparkleOverlay} ${isDocked ? styles.sparkleActive : ''}`}>
            <svg viewBox="0 0 24 24" fill="var(--gold, #B08D3F)">
              <polygon points="12,0 15,9 24,12 15,15 12,24 9,15 0,12 9,9" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
