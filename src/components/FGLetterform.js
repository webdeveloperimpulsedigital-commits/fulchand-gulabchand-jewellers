'use client';

import { useEffect, useRef, useState } from 'react';
import {
  FG_LETTER_F_PATH,
  FG_LETTER_G_PATH,
  FG_MONOGRAM_PATH,
} from '@/content/fgBrandPaths';
import styles from './FGLetterform.module.css';

/**
 * FGLetterform — Architectural Luxury Brand Watermark Motif
 * 
 * Recreates the subtle, oversized, stone-grey architectural letterform motif
 * from reference designs (Nída Tabba newsletter watermark / FG monogram).
 * 
 * Sits quietly in the background without harsh brand colors,
 * drawing its outline softly on scroll, then fading in a gentle pale stone wash.
 */
export default function FGLetterform({
  letter = 'F', // 'F' (Signature calligraphic F) | 'monogram' (Intertwined FG) | 'G'
  tone = 'stone', // 'stone' (Soft architectural neutral watermark matching reference) | 'champagne' | 'gold'
  position = 'right', // 'right' | 'right-section' | 'left' | 'center' | 'custom'
  size = 'clamp(560px, 54vw, 920px)',
  strokeWidth = 0.9,
  fill = true,
  fillOpacity = 1,
  opacity = 1,
  delay = 300,
  duration = 2.4,
  stroke = null,
  fillColor = null,
  className = '',
  style = {},
  observeSelf = false,
  isDrawn: controlledIsDrawn = undefined,
}) {
  const containerRef = useRef(null);
  const [internalIsDrawn, setInternalIsDrawn] = useState(false);
  const isDrawn = controlledIsDrawn !== undefined ? controlledIsDrawn : internalIsDrawn;

  useEffect(() => {
    if (controlledIsDrawn !== undefined) return;

    const el = containerRef.current;
    if (!el) return;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setInternalIsDrawn(true);
      return;
    }

    // Observe the enclosing section/footer, or observe this specific element
    const target = observeSelf ? el : (el.closest('footer') || el.closest('section') || el);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInternalIsDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -5% 0px' }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [controlledIsDrawn, observeSelf]);

  // Soft architectural neutral tones (matching reference mockup — no harsh brand red)
  const strokeColor =
    stroke ||
    (tone === 'champagne'
      ? '#DECFA8'
      : tone === 'gold'
      ? '#CBB892'
      : tone === 'stone' || tone === 'architectural'
      ? '#D8D4CC'
      : '#DECFA8');

  const resolvedFillColor =
    fillColor ||
    (tone === 'champagne'
      ? '#ECE5D8'
      : tone === 'gold'
      ? '#F2EBDC'
      : tone === 'stone' || tone === 'architectural'
      ? '#EAE8E2'
      : '#ECE5D8');

  // Select path
  const pathData =
    letter === 'G'
      ? FG_LETTER_G_PATH
      : letter === 'F'
      ? FG_LETTER_F_PATH
      : FG_MONOGRAM_PATH;

  // ViewBox tight fit
  const viewBox =
    letter === 'G'
      ? '240 220 220 210'
      : letter === 'F'
      ? '140 170 270 230'
      : '140 170 320 260';

  const positionClass =
    position === 'right'
      ? styles.posRight
      : position === 'right-section'
      ? styles.posRightSection
      : position === 'left'
      ? styles.posLeft
      : position === 'center'
      ? styles.posCenter
      : '';

  const sizeStyle = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      ref={containerRef}
      className={`${styles.letterContainer} ${positionClass} ${
        isDrawn ? styles.isDrawn : ''
      } ${className}`}
      style={{
        width: sizeStyle,
        height: sizeStyle,
        opacity,
        '--target-fill-opacity': fill ? fillOpacity : 0,
        ...style,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svgLetter}
      >
        <path
          d={pathData}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={fill ? resolvedFillColor : 'none'}
          pathLength="1"
          className={styles.letterPath}
          style={{
            transitionDuration: `${duration}s, 1.2s`,
            transitionDelay: `${delay}ms, ${delay + 1400}ms`,
          }}
        />
      </svg>
    </div>
  );
}
