'use client';

import { useEffect, useRef, useState } from 'react';
import ImageSlot from '@/components/ImageSlot';
import { TextLink } from '@/components/Links';
import { editSources } from '@/content/assets';
import styles from './ProductEdit.module.css';

const EDIT_PIECES = [
  { id: 'EDIT-01', name: 'The Rajawat Royal Choker', motif: 'necklace' },
  { id: 'EDIT-02', name: 'Kundan Polki Jhumkas', motif: 'jhumka' },
  { id: 'EDIT-03', name: 'Mayura Filigree Bangles', motif: 'bangle' },
  { id: 'EDIT-04', name: 'Padma Ruby Signet Ring', motif: 'ring' },
  { id: 'EDIT-05', name: 'Aarohi Navratna Pendant', motif: 'pendant' },
  { id: 'EDIT-06', name: 'Virasat Temple Gold Chain', motif: 'chain' },
];

// Tripled array for seamless infinite marquee loop
const TILES = [...EDIT_PIECES, ...EDIT_PIECES, ...EDIT_PIECES];

/** 7 · The Edit — Large luxury showcase with continuous infinite auto-scroll loop. */
export default function ProductEdit() {
  const railRef = useRef(null);
  const isHoveredRef = useRef(false);
  const isInteractingRef = useRef(false);
  const [isPaused, setIsPaused] = useState(false);

  // Smooth continuous auto-scrolling loop
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let animId;
    let lastTime = performance.now();

    const scrollLoop = (time) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!isHoveredRef.current && !isInteractingRef.current && rail) {
        // Continuous smooth gliding speed (faster, lively pace)
        const speed = 0.12;
        rail.scrollLeft += speed * delta;

        // Infinite loop seamless wrap
        const oneThird = rail.scrollWidth / 3;
        if (rail.scrollLeft >= oneThird * 2) {
          rail.scrollLeft -= oneThird;
        } else if (rail.scrollLeft <= 5) {
          rail.scrollLeft += oneThird;
        }
      }

      animId = requestAnimationFrame(scrollLoop);
    };

    animId = requestAnimationFrame(scrollLoop);

    const onEnter = () => {
      isHoveredRef.current = true;
      setIsPaused(true);
    };
    const onLeave = () => {
      isHoveredRef.current = false;
      setIsPaused(false);
    };
    const onTouchStart = () => {
      isInteractingRef.current = true;
    };
    const onTouchEnd = () => {
      setTimeout(() => {
        isInteractingRef.current = false;
      }, 1200);
    };

    rail.addEventListener('mouseenter', onEnter);
    rail.addEventListener('mouseleave', onLeave);
    rail.addEventListener('touchstart', onTouchStart, { passive: true });
    rail.addEventListener('touchend', onTouchEnd);

    return () => {
      cancelAnimationFrame(animId);
      rail.removeEventListener('mouseenter', onEnter);
      rail.removeEventListener('mouseleave', onLeave);
      rail.removeEventListener('touchstart', onTouchStart);
      rail.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <section className={`sec ${styles.section}`} aria-labelledby="edit-h">
      <div className="wrap">
        <div className={styles.head}>
          <div className={styles.titles}>
            <p className="label">The Edit</p>
            <h2 className="h2" id="edit-h">The Atelier Selection</h2>
          </div>
          <div className={styles.controls}>
            <TextLink href="#explore" arrow={false}>
              Explore all
            </TextLink>
          </div>
        </div>

        {/* Continuous Auto-Scrolling Slider Rail */}
        <div
          className={styles.rail}
          ref={railRef}
          role="list"
          aria-label="Curated Atelier Edit pieces"
        >
          {TILES.map((t, idx) => (
            <article key={`${t.id}-${idx}`} className={styles.tile} role="listitem">
              <div className={styles.imageCard}>
                <ImageSlot
                  asset={{
                    id: t.id,
                    src: editSources[t.id],
                    ratio: '1 / 1',
                    alt: `${t.name} on white`,
                    tag: [t.id, '1:1'],
                  }}
                  tone="white"
                  motif={t.motif}
                  reveal={false}
                  sizes="(max-width: 820px) 75vw, 420px"
                />
              </div>
              <div className={styles.meta}>
                <h3 className={styles.name}>{t.name}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
