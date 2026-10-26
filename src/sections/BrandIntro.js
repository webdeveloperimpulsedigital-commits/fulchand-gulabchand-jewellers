'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAssetUrl } from '@/utils/basePath';
import { FG_MONOGRAM_PATH } from '@/content/fgBrandPaths';
import styles from './BrandIntro.module.css';

/**
 * BrandIntro — Exact implementation of Nída Tabba's "home-text-images" & "home-discover" sections.
 * Features:
 * - Content entrance: [data-aos="fade-up"] with staggered timing.
 * - Image entrance: Exact Nída Tabba curtain reveal.
 * - Scroll parallax: Overlapping close-up image and signature organic contour line glide smoothly as you scroll.
 * - Manifesto caption under portrait: exact Nída Tabba styling with pure black solid contrast.
 * - Signature Editorial Banner: "The soul of pure 22K gold at your fingertips." with exact Nída Tabba organic contour alignment and scale.
 */
export default function BrandIntro() {
  const imagesWrapRef = useRef(null);
  const overlapRef = useRef(null);
  const bubbleRef = useRef(null);
  const titleBubbleRef = useRef(null);
  const [isContourDrawn, setIsContourDrawn] = useState(false);

  // Exact Nída Tabba choreography:
  // 1. Headline enters with data-aos="fade-up" as user scrolls to the titleBubble.
  // 2. Once user arrives at this section and headline finishes settling (650ms), the brand SVG gracefully draws.
  useEffect(() => {
    const el = titleBubbleRef.current;
    if (!el) return;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsContourDrawn(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Wait 1 second after the line appears, then start smoothly drawing the SVG monogram shape
          const timer = setTimeout(() => {
            setIsContourDrawn(true);
          }, 1000);

          observer.disconnect();
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.35, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Exact Nída Tabba scroll animation: images-animation-up (parallax-image.js with js-del)
  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      if (window.innerWidth <= 960) {
        if (overlapRef.current) overlapRef.current.style.transform = 'none';
        if (bubbleRef.current) bubbleRef.current.style.transform = 'translate(-50%, -50%)';
        return;
      }

      const scrollTop = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;

      // Parallax for overlapping secondary image
      if (overlapRef.current && imagesWrapRef.current) {
        const parentRect = imagesWrapRef.current.getBoundingClientRect();
        const parentTop = parentRect.top + scrollTop;

        const i = parentTop - windowHeight;
        let l = scrollTop - i;
        if (l < 0) l = 0;
        const overlapHeight = overlapRef.current.offsetHeight || 300;
        const r = 2 * overlapHeight;
        if (l > r) l = r;
        let h = (100 * l) / r;
        h = 100 - h; // Slides upwards from translateY(100%) to translateY(0%)

        overlapRef.current.style.transform = `translate3d(0, ${h.toFixed(2)}%, 0)`;
      }

      // Parallax for the signature contour bubble line (delicate vertical float matching Nída Tabba)
      if (bubbleRef.current) {
        const bubbleRect = bubbleRef.current.getBoundingClientRect();
        const centerDiff = (windowHeight / 2) - (bubbleRect.top + bubbleRect.height / 2);
        const offset = Math.max(-14, Math.min(14, centerDiff * 0.035));
        bubbleRef.current.style.transform = `translate3d(0, calc(-50% + ${offset.toFixed(1)}px), 0)`;
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    handleScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className={styles.brandIntroSection} aria-label="Brand Introduction & Philosophy">
      {/* Upper Two-Column Editorial: Text & Overlapping Imagery */}
      <div className={styles.homeTextImages}>
        {/* Left Column: text-wrap with Nída Tabba data-aos="fade-up" */}
        <div className={styles.textWrap}>
          <div className={styles.textMarkup}>
            <h2 id="brand-intro-h" data-aos="fade-up" className={styles.heading}>
              Generations of mastery
            </h2>
            <p data-aos="fade-up" data-aos-delay="150" className={styles.para}>
              For over seven decades, Fulchand Gulabchand has stood as an authentic bastion of Indian goldsmithing in Naupada, Thane. Born from an uncompromising devotion to pure 22-karat gold and traditional artistry, our house has shaped heirlooms that have graced weddings, celebrations, and life’s most cherished milestones across three generations.
            </p>
            <p data-aos="fade-up" data-aos-delay="250" className={styles.para}>
              Every necklace, kada, and bespoke jewel is an intimate dialogue between time-honored Kundan Jadau techniques and modern aesthetic grace — forged by hand, certified for purity, and created to be treasured for a lifetime.
            </p>
          </div>

          <div data-aos="fade-up" data-aos-delay="350" className={styles.linkWrap}>
            <Link href="/#house" className={styles.lineLink}>
              Discover The House of Fulchand Gulabchand
            </Link>
          </div>
        </div>

        {/* Right Column: images-wrap with smooth scroll parallax */}
        <div ref={imagesWrapRef} className={styles.imagesWrap}>
          {/* Overlapping secondary close-up image with upward scroll float */}
          <div ref={overlapRef} className={`${styles.overlapImage} js-parallax-image js-del`}>
            <Image
              src={getAssetUrl('/images/editorial/main-diversity-of-beauty-1.jpg')}
              alt="Artisan craftsmanship close-up"
              width={503}
              height={629}
              sizes="(max-width: 960px) 37vw, 23.3vw"
              className={styles.img}
            />
          </div>

          {/* Primary portrait image with Nída Tabba fade-up */}
          <div className={styles.mainImageWrap} data-aos="fade-up">
            <Image
              src={getAssetUrl('/images/editorial/main-diversity-of-beauty-2.jpg')}
              alt="Fulchand Gulabchand high jewelry"
              width={888}
              height={1269}
              sizes="(max-width: 960px) 75vw, 41.1vw"
              priority
              className={styles.img}
            />
            {/* Editorial manifesto caption under portrait */}
            <div className={styles.imageDesc}>
              CULTURAL ROOTS ARE ESSENTIAL. IT IS THE SACRED HERITAGE THAT SUPPORTS US FROM THE VERY DEEP STATE OF OUR UNCONSCIOUS MIND. ALLOW YOURSELF TO EMBRACE TIMELESS ELEGANCE, AND DISCOVER THE PURE SOUL OF 22-KARAT GOLD WITH FULCHAND GULABCHAND JEWELLERS.
            </div>
          </div>
        </div>
      </div>

      {/* Signature Editorial Banner: "The soul of pure 22K gold at your fingertips." with Signature Contour Bubble */}
      <div className={styles.homeDiscover}>
        <div ref={titleBubbleRef} className={styles.titleBubble}>
          <h2 data-aos="fade-up" className={styles.discoverTitle}>
            The soul of pure 22K gold at your fingertips.
          </h2>
          <div ref={bubbleRef} className={styles.discoverBubble} aria-hidden="true">
            <svg
              preserveAspectRatio="xMidYMid meet"
              viewBox="120 150 360 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.discoverBubbleSvg}
            >
              <path
                d={FG_MONOGRAM_PATH}
                fill="none"
                stroke="rgba(0, 0, 0, 0.32)"
                strokeWidth="0.95"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                className={isContourDrawn ? styles.pathDrawn : styles.pathHidden}
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
