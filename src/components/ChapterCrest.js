'use client';

import { useEffect, useRef, useState } from 'react';
import { FG_MONOGRAM_PATH } from '@/content/fgBrandPaths';
import styles from './ChapterCrest.module.css';

/**
 * ChapterCrest — Editorial Royal Brand Divider
 * 
 * Features:
 * - Concentric double gold circle crest with inner dashed ring and calligraphic FG monogram.
 * - Flanked by delicate gold hairlines with terminal gold dot markers.
 * - Subtle letterspaced heritage metadata underneath.
 * - Gentle scroll entrance transition.
 */
export default function ChapterCrest({
  className = '',
  style = {},
}) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      role="separator"
      aria-label="Fulchand Gulabchand Brand Crest"
      className={`${styles.crestWrap} ${isVisible ? styles.visible : ''} ${className}`}
      style={style}
    >
      <div className="wrap">
        <div className={styles.crestRow}>
          {/* Left Hairline & Terminal Dot */}
          <div className={styles.lineTrack}>
            <div className={styles.line} />
            <span className={styles.dot} />
          </div>

          {/* Central Gold Crest Seal */}
          <div className={styles.seal}>
            <svg
              viewBox="0 0 600 600"
              className={styles.sealSvg}
              aria-hidden="true"
            >
              {/* Outer Thin Gold Border */}
              <circle
                cx="300"
                cy="300"
                r="285"
                fill="#FFFFFF"
                stroke="var(--gold, #B08D3F)"
                strokeWidth="12"
              />
              {/* Centered Calligraphic FG Monogram in Brand Crimson Red */}
              <path
                d={FG_MONOGRAM_PATH}
                fill="var(--crimson, #A70000)"
                stroke="var(--crimson-deep, #7A0000)"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          {/* Right Hairline & Terminal Dot */}
          <div className={styles.lineTrack}>
            <span className={styles.dot} />
            <div className={styles.line} />
          </div>
        </div>
      </div>
    </div>
  );
}
