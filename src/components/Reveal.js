'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Reveal.module.css';

/**
 * Editorial Scroll Reveal Component
 * Seamlessly animates content & images as they enter the viewport.
 * Supported variants: 'fade' (upward glide), 'mask' (curtain wipe), 'scale' (subtle zoom-in).
 */
export default function Reveal({
  children,
  variant = 'fade',
  as: Tag = 'div',
  className = '',
  delay = 0,
}) {
  const ref = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsRevealed(true);
      return undefined;
    }

    if (!('IntersectionObserver' in window)) {
      setIsRevealed(true);
      return undefined;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -50px 0px', threshold: 0.08 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`${styles.reveal} ${styles[variant] || styles.fade} ${isRevealed ? styles.revealed : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
