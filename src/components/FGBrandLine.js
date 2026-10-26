'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './FGBrandLine.module.css';

/**
 * FGBrandLine — Luxury Calligraphic Vector Line Art.
 * Directly crafted from reference designs (Nída Tabba & Fulchand Gulabchand monogram).
 *
 * Variants:
 * - 'contour-exact': Exact organic contour shape from Reference Screenshot 1 (for white background content).
 * - 'banner-contour': Flowing organic contour curve from Reference Screenshot 2 (for hero/banner images).
 * - 'drape': Sweeping curve that bridges photography and copy.
 * - 'editorial': Organic contour loop sitting behind typography.
 * - 'monogram': Delicate single-line trace of cursive FG letters.
 * - 'pedestal': Framing product showcases.
 */
export default function FGBrandLine({
  variant = 'contour-exact',
  tone = 'dark', // 'dark' | 'gold' | 'crimson' | 'champagne'
  className = '',
  animate = true,
  opacity = 1,
  style = {},
}) {
  const lineRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!animate) {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    if (lineRef.current) {
      observer.observe(lineRef.current);
    }

    return () => observer.disconnect();
  }, [animate]);

  // Stroke color based on tone
  const strokeColor =
    tone === 'dark'
      ? 'var(--ink, #1c1917)'
      : tone === 'crimson'
      ? 'var(--crimson, #A70000)'
      : tone === 'champagne'
      ? 'var(--champagne, #E7C59E)'
      : 'var(--gold, #B08D3F)';

  return (
    <div
      ref={lineRef}
      className={`${styles.lineContainer} ${styles[variant] || ''} ${
        inView ? styles.revealed : ''
      } ${className}`}
      style={{ opacity, ...style }}
      aria-hidden="true"
    >
      {/* ── VARIANT: CONTOUR-EXACT (Exact Shape from User Screenshot 1) ── */}
      {variant === 'contour-exact' && (
        <svg
          viewBox="0 0 640 560"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.svgLine}
        >
          {/* Exact continuous single-line contour from user reference image 1 */}
          <path
            d="M 285,235 C 275,200 245,170 205,175 C 160,180 135,225 125,285 C 115,350 115,405 135,445 C 150,475 190,485 220,470 C 245,455 250,430 250,405 C 250,380 230,370 215,370 C 230,365 265,365 300,385 C 360,420 440,465 510,435 C 570,405 585,325 565,245 C 540,150 470,60 380,45 C 300,30 220,95 240,185 C 248,220 270,245 285,235 Z"
            stroke={strokeColor}
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.drawPath}
          />
        </svg>
      )}

      {/* ── VARIANT: BANNER-CONTOUR (Exact Gold Contour from User Screenshot 2 on Hero Banner) ── */}
      {variant === 'banner-contour' && (
        <svg
          viewBox="0 0 680 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.svgLine}
        >
          {/* Organic 3-lobe contour draping across model hand/jewellery and under title */}
          <path
            d="M 190,200 C 130,210 90,280 110,360 C 130,440 200,475 270,455 C 330,435 365,395 385,360 C 435,360 480,310 485,230 C 490,140 420,95 340,110 C 270,125 240,185 190,200 Z"
            stroke={strokeColor}
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.drawPath}
          />
        </svg>
      )}

      {/* ── VARIANT: DRAPE (Over/Across Images & Content) ── */}
      {variant === 'drape' && (
        <svg
          viewBox="0 0 680 480"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.svgLine}
        >
          <path
            d="M 120,40 C 240,10 440,30 520,110 C 600,190 620,310 540,380 C 460,450 340,430 260,390 C 180,350 90,390 40,330 C -10,270 20,180 80,140 C 120,110 180,120 220,150 C 260,180 290,240 350,260 C 410,280 470,240 460,180 C 450,120 370,80 290,90"
            stroke={strokeColor}
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.drawPath}
          />
        </svg>
      )}

      {/* ── VARIANT: EDITORIAL ── */}
      {variant === 'editorial' && (
        <svg
          viewBox="0 0 600 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.svgLine}
        >
          <path
            d="M 210,70 C 180,90 150,140 130,200 C 105,275 90,330 140,355 C 190,380 260,340 310,290 C 360,240 420,290 480,300 C 540,310 570,250 540,190 C 505,120 420,90 350,130 C 295,160 260,190 220,175 C 190,160 170,110 205,75 C 220,60 250,55 280,70"
            stroke={strokeColor}
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.drawPath}
          />
        </svg>
      )}

      {/* ── VARIANT: PEDESTAL ── */}
      {variant === 'pedestal' && (
        <svg
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.svgLine}
        >
          <path
            d="M 80,250 C 80,140 170,70 250,70 C 340,70 420,150 420,250 C 420,360 330,430 250,430 C 180,430 110,380 90,310 C 70,240 120,180 170,180 C 220,180 250,220 250,260 C 250,300 220,330 190,320"
            stroke={strokeColor}
            strokeWidth="1.2"
            strokeLinecap="round"
            className={styles.drawPath}
          />
        </svg>
      )}
    </div>
  );
}
