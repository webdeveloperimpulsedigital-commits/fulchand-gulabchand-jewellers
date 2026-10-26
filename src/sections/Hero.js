'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { getAssetUrl } from '@/utils/basePath';
import styles from './Hero.module.css';

const HERO_SLIDES = [
  {
    id: 'mystery-of-mexico',
    src: '/images/editorial/home-mexico.jpg',
    thumb: '/images/editorial/collection-cover-mexico.jpg',
    alt: 'Mystery of Mexico collection handcrafted jewellery',
    title: 'Mystery of Mexico',
    lead: 'Discover the vibrant soul of Mexico through our exquisite collection, where each piece tells a story of culture, tradition, and the artistry of a diverse nation.',
    cta: 'Explore',
    href: '#explore',
    objectPosition: 'center 42%',
    contourPath:
      'M484 424.5C464 388.502 460.604 311.497 523 309.001C598 306.001 715.5 319 778.5 412.501C826.339 483.5 819.5 519.501 802 549.001C816.333 571.001 864 637.002 802 750.002C792.884 766.617 731 771.002 644 719.502C580.112 681.682 558.5 649.501 558.5 649.501C558.5 649.501 522.766 658.511 473 690.001C384.5 746 313.792 694.959 302 605.001C284.5 471.501 383 424.5 484 424.5Z',
  },
  {
    id: 'indus-valley',
    src: '/images/editorial/home-necklace.jpg',
    thumb: '/images/editorial/collection-cover-indus.jpg',
    alt: 'Indus Valley masterwork necklace draped gracefully',
    title: 'Indus Valley',
    lead: 'Discover the vibrant soul of Indus Valley through our exquisite collection, where each piece tells a story of culture, tradition, and the artistry of a diverse region.',
    cta: 'Explore',
    href: '#explore',
    objectPosition: 'center 32%',
    contourPath:
      'M474.5 81.9994C475.7 30.3994 524.167 -2.66656 547.5 -10.9999C688.833 -24.8332 988.8 -42.8015 1000 -18.0015C1014 12.9985 1035.84 32.0635 1058 46.9994C1104 78.0003 1082.84 102.019 1100.5 153.499C1118 204.499 1098.29 188.805 1118 257.999C1140.5 336.999 1038.17 375.195 1058 397.499C1094 437.999 1089 497 1089 549.999C1089 628.359 1112.79 624.5 1096.5 659.999C1077 702.499 1028 797.999 979 782.499C930 766.999 837.5 727.499 828 702.499C818.5 677.499 815 582.999 761.5 549.999C708 516.999 710 439.499 677 437.999C644 436.499 593 407.499 591.5 357.499C590 307.499 566.5 299.499 524.5 287.499C482.5 275.499 474 220.499 495 193.499C516 166.499 472.616 163 474.5 81.9994Z',
  },
  {
    id: 'italian-warmth',
    src: '/images/editorial/home-italian.jpg',
    thumb: '/images/editorial/collection-cover-italy.jpg',
    alt: 'Textured statement gold hoop earring worn on ear and jawline',
    title: 'Italian Warmth',
    lead: 'Discover the vibrant soul of Italy through our exquisite collection, where each piece tells a story of culture, tradition, and the artistry of a diverse nation.',
    cta: 'Explore',
    href: '#explore',
    objectPosition: 'center 38%',
    contourPath:
      'M612.5 227.001C568.1 239.401 550 230.5 541 178C532 125.501 467 140.001 472.5 208.001C478 276.001 442 314 419 396.5C411.499 423.407 398.469 479.7 396.377 540.5C392.041 666.5 464.5 762.888 562.5 767.5C671 772.606 777.764 651.128 806.5 551C870.5 328 798.697 175 612.5 227.001Z',
  },
  {
    id: 'signature-collection',
    src: '/images/editorial/home-signature.jpg',
    thumb: '/images/editorial/collection-cover-signature.jpg',
    alt: 'Handcrafted bracelets and bangles on wrist and forearm',
    title: 'Signature Collection',
    lead: 'Discover the vibrant soul of timeless craftsmanship through our exquisite collection, where each piece tells a story of culture, tradition, and the artistry of master goldsmiths.',
    cta: 'Explore',
    href: '#explore',
    objectPosition: 'center 42%',
    contourPath:
      'M1023 250.999C1004.4 226.941 978 204 930.5 207.999C883 211.999 880.5 248.498 834 276.999C807.635 293.158 819.291 314.143 810 333.499C798 358.499 783.148 353.999 771.5 374.499C762.163 390.933 783.441 407.999 774.5 426.999C766.172 444.695 733 444.999 725 468.999C716.571 494.287 757 502.999 745 542.499C740.763 556.447 731.5 599.099 761 634.499C813.083 696.999 846 622.499 930.5 720.999C984.562 784.017 1083.62 753.498 1099.5 659.999C1131.17 473.52 1135.5 396.499 1023 250.999Z',
  },
];

const AUTO_PLAY_INTERVAL = 7500;

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isSmallSliderVisible, setIsSmallSliderVisible] = useState(false);
  const [isCaptionVisible, setIsCaptionVisible] = useState(false);
  const [isShapeDrawn, setIsShapeDrawn] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const isInitialMount = useRef(true);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const goToSlide = useCallback((idx) => {
    setCurrentSlide(idx);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Orchestrated Initial Page Load Entrance (Matching nidatabba.com load mechanics):
  // 1. T = 0ms: Hero background image starts curtain wipe reveal (top to bottom)
  // 2. T = 500ms: Bottom-right 'Discover other collections' slider slides up
  // 3. T = 1000ms: Bottom-left caption block (title, lead, explore button) slides up
  // 4. T = 1000ms: Signature gold contour line begins drawing over 1.5s (easeInOutSine)
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsPageLoaded(true);
    });

    const smallTimer = setTimeout(() => {
      setIsSmallSliderVisible(true);
    }, 500);

    const captionTimer = setTimeout(() => {
      setIsCaptionVisible(true);
    }, 1000);

    const shapeTimer = setTimeout(() => {
      setIsShapeDrawn(true);
    }, 1000);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(smallTimer);
      clearTimeout(captionTimer);
      clearTimeout(shapeTimer);
    };
  }, []);

  // Subsequent carousel slide transitions:
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Instantly hide caption & contour for slide change
    setIsCaptionVisible(false);
    setIsShapeDrawn(false);

    // Reveal new caption after slide track enters
    const captionTimer = setTimeout(() => {
      setIsCaptionVisible(true);
    }, 250);

    // Draw gold contour line once slide settles
    const shapeTimer = setTimeout(() => {
      setIsShapeDrawn(true);
    }, 500);

    return () => {
      clearTimeout(captionTimer);
      clearTimeout(shapeTimer);
    };
  }, [currentSlide]);

  // Continuous, smooth luxury autoplay cadence
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Touch swipe gesture listeners
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const activeSlideData = HERO_SLIDES[currentSlide];

  return (
    <section
      className={styles.homeHeader}
      id="top"
      aria-label="Campaign showcase"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.sliderBigWrap}>
        {/* Horizontal Sliding Track for Silky 60fps Carousel Motion */}
        <div
          className={styles.sliderTrack}
          style={{ transform: `translate3d(-${currentSlide * 100}%, 0, 0)` }}
        >
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === currentSlide;
            const isFirst = idx === 0;
            const imageLoadedClass = isFirst
              ? (isPageLoaded ? styles.imageLoaded : styles.imageInitial)
              : styles.imageLoaded;

            return (
              <div
                key={slide.id}
                className={`${styles.bigSlideItem} ${isActive ? styles.activeSlide : ''}`}
                aria-hidden={!isActive}
              >
                <div className={`${styles.imageStatic} ${imageLoadedClass}`}>
                  <Image
                    src={getAssetUrl(slide.src)}
                    alt={slide.alt}
                    fill
                    priority={idx === 0}
                    className={styles.mainImg}
                    style={{ objectPosition: slide.objectPosition }}
                    sizes="100vw"
                    quality={92}
                  />
                </div>
                {/* Brand Signature Gold Contour Outline — draws with 1.5s easeInOutSine */}
                {slide.contourPath && (
                  <div
                    className={`${styles.dynamic} ${isActive && isShapeDrawn ? styles.dynamicActive : ''}`}
                    aria-hidden="true"
                  >
                    {isActive && isShapeDrawn && (
                      <svg
                        key={`contour-${slide.id}-${currentSlide}`}
                        preserveAspectRatio="xMidYMid slice"
                        viewBox="0 0 1440 800"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.contourSvg}
                      >
                        <path
                          d={slide.contourPath}
                          stroke="#CCAC78"
                          strokeWidth="1.5"
                          className={styles.contourPathActive}
                        />
                      </svg>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>


        {/* Bottom Left Content Block with Choreographed Page Load & Slide Transition */}
        <div
          className={`${styles.titleDesc} ${isCaptionVisible ? styles.titleDescActive : styles.titleDescHidden}`}
          key={`hero-caption-${currentSlide}`}
        >
          <div className={styles.titleMask}>
            <h1 className={styles.title}>{activeSlideData.title}</h1>
          </div>
          <div className={styles.leadMask}>
            <p className={styles.lead}>{activeSlideData.lead}</p>
          </div>
          <div className={styles.actionRow}>
            <a href={activeSlideData.href} className={styles.exploreButton}>
              <span>{activeSlideData.cta}</span>
            </a>
          </div>
        </div>

        {/* Nída Tabba Signature Bottom-Right Carousel with Choreographed Page Load Entrance */}
        <div
          className={`${styles.sliderSmallWrap} ${isSmallSliderVisible ? styles.sliderSmallActive : styles.sliderSmallHidden}`}
        >
          <div className={styles.sliderSmallTrackWrap}>
            <div
              className={styles.sliderSmall}
              style={{
                transform: `translate3d(calc(-${currentSlide} * (var(--card-w) + var(--card-gap))), 0, 0)`,
              }}
            >
              {[...HERO_SLIDES, HERO_SLIDES[0]].map((slide, idx) => {
                const targetIdx = idx % HERO_SLIDES.length;
                const isActive = targetIdx === currentSlide;
                return (
                  <button
                    key={`thumb-${slide.id}-${idx}`}
                    type="button"
                    onClick={() => goToSlide(targetIdx)}
                    className={`${styles.sliderSmallItem} ${isActive ? styles.activeThumb : ''}`}
                    aria-label={`View collection: ${slide.title}`}
                  >
                    <div className={styles.imgWrap}>
                      <Image
                        src={getAssetUrl(slide.thumb || slide.src)}
                        alt={slide.title}
                        fill
                        sizes="(max-width: 1200px) 240px, 340px"
                        className={styles.thumbImg}
                      />
                    </div>
                    <div className={styles.cardName}>{slide.title}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
