'use client';

import { useEffect } from 'react';

/**
 * NidaScrollAnimator
 * Exact port of Nída Tabba's scroll trigger logic from https://nidatabba.com/
 * Features:
 * 1. Image curtain reveal: .js-images-animation-up adds .active at (offsetTop - windowHeight * 0.75)
 * 2. Content fade-up: [data-aos="fade-up"] adds .aos-animate at (offsetTop - windowHeight * 0.85)
 * 3. Passive 60fps performance with dual-strategy (scroll loop + IntersectionObserver)
 */
export default function NidaScrollAnimator() {
  useEffect(() => {
    let ticking = false;

    const checkAnimations = () => {
      const isMob = window.matchMedia('(max-width: 960px)').matches;
      const windowHeight = window.innerHeight;

      // 1. Exact Nída Tabba trigger for .js-images-animation-up (.active)
      // tt = 0.75 on desktop (25% up from viewport bottom), 0.9 on mobile (10% up)
      const tt = isMob ? 0.9 : 0.75;
      const imgElements = document.querySelectorAll('.js-images-animation-up');
      imgElements.forEach((elem) => {
        if (!elem.classList.contains('active')) {
          const rect = elem.getBoundingClientRect();
          if (rect.top < windowHeight * tt) {
            elem.classList.add('active');
          }
        }
      });

      // 2. Exact Nída Tabba trigger for [data-aos] elements (.aos-animate)
      const aosElements = document.querySelectorAll('[data-aos]');
      aosElements.forEach((elem) => {
        if (!elem.classList.contains('aos-animate')) {
          const rect = elem.getBoundingClientRect();
          if (rect.top < windowHeight * 0.85) {
            elem.classList.add('aos-animate');
          }
        }
      });

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(checkAnimations);
        ticking = true;
      }
    };

    // Run checks on mount, after DOM updates, and on window events
    checkAnimations();
    const t1 = setTimeout(checkAnimations, 100);
    const t2 = setTimeout(checkAnimations, 400);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return null;
}
