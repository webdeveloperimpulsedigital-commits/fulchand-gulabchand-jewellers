'use client';

import { useEffect, useRef } from 'react';
import { getAssetUrl } from '@/utils/basePath';
import styles from './InspirationalLooks.module.css';

const SLIDES_DATA = [
  {
    id: 'slide-01',
    variantClass: styles.slideRegular,
    images: [
      {
        src: '/images/editorial/main-slider-1.jpg',
        alt: 'Fulchand Gulabchand fine jewellery high-fashion portrait',
        className: styles.image1,
      },
      {
        src: '/images/editorial/main-slider-2.jpg',
        alt: 'Handcrafted gold kada bangle held in hands',
        className: styles.image2,
      },
      {
        src: '/images/editorial/main-slider-3.jpg',
        alt: 'Semi-precious stone terminals and layered gold cuffs',
        className: styles.image3,
      },
    ],
  },
  {
    id: 'slide-02',
    variantClass: styles.slideVar2,
    images: [
      {
        src: '/images/editorial/main-slider-4.jpg',
        alt: 'Model holding artisanal diamond and white gold bracelet',
        className: styles.image1,
      },
      {
        src: '/images/editorial/main-slider-5.jpg',
        alt: 'Detailed artisan gold and emerald earring',
        className: styles.image2,
      },
      {
        src: '/images/editorial/main-slider-6.jpg',
        alt: 'Gold medallion statement pendant necklace worn on model',
        className: styles.image3,
      },
    ],
  },
  {
    id: 'slide-03',
    variantClass: styles.slideRegular,
    images: [
      {
        src: '/images/editorial/main-slider-7.jpg',
        alt: 'Editorial bridal portrait with handcrafted gold jhumkas',
        className: styles.image1,
      },
      {
        src: '/images/editorial/main-slider-8.jpg',
        alt: 'Layered gemstone and 22k gold bangle stacks on arm',
        className: styles.image2,
      },
      {
        src: '/images/editorial/main-slider-9.jpg',
        alt: 'Architectural ring and diamond detail',
        className: styles.image3,
      },
    ],
  },
];

const lerp = (a, b, t) => (1 - t) * a + t * b;

function wrap(min, max, v) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

/**
 * InspirationalLooks — Exact Nída Tabba "home-bottom-slider" Section
 * Direct reproduction of https://nidatabba.com/
 *
 * Features:
 * - Grand editorial philosophy typography spanning ~79vw
 * - Magazine collage with -11.8vw negative top margin overlapping under typography
 * - Automatic continuous seamless infinite sliding (auto-slide)
 * - Zero CTA buttons (no arrows, no dots, no counter)
 * - Interactive click/touch drag with inertial lerp smoothing
 */
export default function InspirationalLooks() {
  const containerRef = useRef(null);
  const slidesRef = useRef([]);

  const isDragging = useRef(false);
  const lastX = useRef(0);
  const dragOffset = useRef(0);
  const currentY = useRef(0);
  const targetY = useRef(0);
  const time = useRef(0);
  const isHovered = useRef(false);
  const rAF = useRef(null);

  useEffect(() => {
    let isMobile = window.innerWidth <= 960;
    const handleResize = () => {
      isMobile = window.innerWidth <= 960;
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      const itemWidth = window.innerWidth;
      const wrapWidth = SLIDES_DATA.length * itemWidth;

      // Auto slide step: continuous smooth movement
      const step = isHovered.current ? 0.4 : isMobile ? 0.5 : 0.9;
      time.current += step;

      targetY.current = dragOffset.current - time.current;
      currentY.current = lerp(currentY.current, targetY.current, 0.12);

      slidesRef.current.forEach((el, idx) => {
        if (!el) return;
        const rawX = idx * itemWidth + currentY.current;
        const wrappedX = wrap(-itemWidth, wrapWidth - itemWidth, rawX);
        el.style.transform = `translate3d(${wrappedX}px, 0, 0)`;
      });

      rAF.current = requestAnimationFrame(render);
    };

    rAF.current = requestAnimationFrame(render);

    // Global drag end listener
    const handleGlobalMouseUp = () => {
      if (isDragging.current) {
        isDragging.current = false;
        if (containerRef.current) {
          containerRef.current.classList.remove(styles.isDragging);
        }
      }
    };

    const handleGlobalMouseMove = (e) => {
      if (!isDragging.current) return;
      const delta = e.clientX - lastX.current;
      lastX.current = e.clientX;
      dragOffset.current += delta * 1.15;
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      if (rAF.current) cancelAnimationFrame(rAF.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    lastX.current = e.clientX;
    if (containerRef.current) {
      containerRef.current.classList.add(styles.isDragging);
    }
  };

  const handleTouchStart = (e) => {
    if (!e.touches || e.touches.length === 0) return;
    isDragging.current = true;
    lastX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current || !e.touches || e.touches.length === 0) return;
    const clientX = e.touches[0].clientX;
    const delta = clientX - lastX.current;
    lastX.current = clientX;
    dragOffset.current += delta * 1.15;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  return (
    <section
      className={styles.homeBottomSlider}
      aria-label="Inspirational Looks & Cultural Heritage"
      onMouseEnter={() => {
        isHovered.current = true;
      }}
      onMouseLeave={() => {
        isHovered.current = false;
      }}
    >
      {/* Editorial Title Wrap: Fulchand Gulabchand Typography */}
      <div className={styles.titleWrap}>
        <div className={styles.textMarkup}>
          <h2 data-aos="fade-up" className={styles.heading}>
            Fulchand Gulabchand jewelry is built upon the profound cultural heritage of diverse traditions,
            yet tailored for contemporary individuals and the modern city.
            Incorporate it into your daily attire to enrich your
            <br />
            identity and express your unique personality.
            <br />
            Explore our collection for inspirational looks.
          </h2>
        </div>
      </div>

      {/* Slider Container with Magazine Overlap & Auto-Slide (No CTA) */}
      <div
        ref={containerRef}
        className={styles.sliderContainer}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles.bottomSlider}>
          {SLIDES_DATA.map((slide, slideIdx) => (
            <div
              key={slide.id}
              ref={(el) => (slidesRef.current[slideIdx] = el)}
              className={`${styles.bottomSlide} ${slide.variantClass}`}
            >
              {slide.images.map((img, imgIdx) => (
                <div key={imgIdx} className={img.className} data-preset="scale">
                  <img
                    src={getAssetUrl(img.src)}
                    alt={img.alt}
                    loading={slideIdx === 0 ? 'eager' : 'lazy'}
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
