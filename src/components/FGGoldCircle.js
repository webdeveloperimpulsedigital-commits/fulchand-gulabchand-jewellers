'use client';

import { useEffect, useRef, useState } from 'react';
import { FG_CIRCLES } from '@/content/fgBrandPaths';
import styles from './FGGoldCircle.module.css';

/**
 * FGGoldCircle
 * Reusable animated SVG reproducing the thin, double concentric gold circle border
 * from the official Fulchand Gulabchand Jewellers logo.
 * 
 * Traces the circumference smoothly when entering the viewport.
 */
export default function FGGoldCircle({
  size = 600,
  double = true,
  arcOnly = false,
  arcAngle = 220,
  strokeWidth = FG_CIRCLES.strokeWidth,
  color = 'var(--gold, #B08D3F)',
  opacity = 0.85,
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

  const sizeStyle = typeof size === 'number' ? `${size}px` : size;

  // Arc path generator for framing edges/photos
  const describeArc = (cx, cy, r, startAngle, endAngle) => {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const arcSweep = endAngle - startAngle <= 180 ? '0' : '1';
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${arcSweep} 0 ${end.x} ${end.y}`;
  };

  const polarToCartesian = (cx, cy, r, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: cx + r * Math.cos(angleInRadians),
      y: cy + r * Math.sin(angleInRadians),
    };
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.circleContainer} ${isDrawn ? styles.isDrawn : ''} ${className}`}
      style={{
        width: sizeStyle,
        height: sizeStyle,
        opacity,
        ...style,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox={FG_CIRCLES.viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svgCircle}
      >
        {arcOnly ? (
          <>
            <path
              d={describeArc(FG_CIRCLES.cx, FG_CIRCLES.cy, FG_CIRCLES.rOuter, 0, arcAngle)}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              pathLength="1"
              className={styles.circleRing}
              style={{
                transitionDuration: `${duration}s`,
                transitionDelay: `${delay}ms`,
              }}
            />
            {double && (
              <path
                d={describeArc(FG_CIRCLES.cx, FG_CIRCLES.cy, FG_CIRCLES.rInner, 10, arcAngle - 10)}
                stroke={color}
                strokeWidth={strokeWidth * 0.9}
                strokeLinecap="round"
                pathLength="1"
                className={styles.innerRing}
                style={{
                  transitionDuration: `${duration * 1.1}s`,
                  transitionDelay: `${delay + 200}ms`,
                }}
              />
            )}
          </>
        ) : (
          <>
            {/* Outer Gold Concentric Ring from Logo */}
            <circle
              cx={FG_CIRCLES.cx}
              cy={FG_CIRCLES.cy}
              r={FG_CIRCLES.rOuter}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              pathLength="1"
              className={styles.circleRing}
              style={{
                transitionDuration: `${duration}s`,
                transitionDelay: `${delay}ms`,
              }}
            />

            {/* Inner Gold Concentric Ring from Logo */}
            {double && (
              <circle
                cx={FG_CIRCLES.cx}
                cy={FG_CIRCLES.cy}
                r={FG_CIRCLES.rInner}
                stroke={color}
                strokeWidth={strokeWidth * 0.85}
                strokeLinecap="round"
                pathLength="1"
                className={styles.innerRing}
                style={{
                  transitionDuration: `${duration * 1.1}s`,
                  transitionDelay: `${delay + 220}ms`,
                }}
              />
            )}
          </>
        )}
      </svg>
    </div>
  );
}
