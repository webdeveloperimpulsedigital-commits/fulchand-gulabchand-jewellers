'use client';

import { useEffect, useRef, useState } from 'react';
import {
  FG_MONOGRAM_PATH,
  FG_LETTER_F_PATH,
  FG_LETTER_G_PATH,
} from '@/content/fgBrandPaths';
import styles from './FGMonogramMotif.module.css';

/**
 * FGMonogramMotif
 * Reusable animated SVG rendering the authentic "FG" monogram curves
 * extracted directly from the official Fulchand Gulabchand Jewellers logo.
 * 
 * Draws the outline first on scroll, then softly fades in the fill.
 */
export default function FGMonogramMotif({
  variant = 'full', // 'full' | 'f-only' | 'g-only'
  tone = 'crimson', // 'crimson' | 'gold' | 'champagne' | 'dark'
  size = 380,
  fill = true,
  fillOpacity = 0.08,
  strokeWidth = 1.3,
  delay = 0,
  duration = 2.2,
  className = '',
  style = {},
}) {
  const containerRef = useRef(null);
  const [isDrawn, setIsDrawn] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const color =
    tone === 'crimson'
      ? 'var(--crimson, #A70000)'
      : tone === 'gold'
      ? 'var(--gold, #B08D3F)'
      : tone === 'champagne'
      ? 'var(--champagne, #E7C59E)'
      : 'var(--ink, #1c1917)';

  const pathData =
    variant === 'f-only'
      ? FG_LETTER_F_PATH
      : variant === 'g-only'
      ? FG_LETTER_G_PATH
      : FG_MONOGRAM_PATH;

  const sizeStyle = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      ref={containerRef}
      className={`${styles.monogramContainer} ${isDrawn ? styles.isDrawn : ''} ${className}`}
      style={{
        width: sizeStyle,
        height: sizeStyle,
        '--target-fill-opacity': fill ? fillOpacity : 0,
        ...style,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svgMonogram}
      >
        <path
          d={pathData}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={fill ? color : 'none'}
          pathLength="1"
          className={styles.monogramPath}
          style={{
            transitionDuration: `${duration}s, 0.9s`,
            transitionDelay: `${delay}ms, ${delay + 1200}ms`,
          }}
        />
      </svg>
    </div>
  );
}
