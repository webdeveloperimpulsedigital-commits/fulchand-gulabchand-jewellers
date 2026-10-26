'use client';

import { useEffect } from 'react';

/**
 * NidaScrollAnimator — Limnia-Inspired Luxury Scroll Animation Engine
 * Replicates the smooth, slow, editorial section-by-section reveals from https://limnia.com/
 *
 * Supported Triggers & Presets:
 * 1. [data-preset="opacity,y"]   -> Upward glide with smooth deceleration
 * 2. [data-preset="scale"]       -> High-jewelry image scale un-zoom reveal
 * 3. [data-preset="opacity,scale"] -> Delicate scale & opacity fade for crests/buttons
 * 4. [data-preset="opacity,x"]   -> Lateral glide
 * 5. [data-aos="fade-up"]        -> Backward-compatible editorial typography fade-up
 * 6. .should-animate             -> Limnia signature class hook
 * 7. .js-images-animation-up     -> Editorial curtain reveal
 */
export default function NidaScrollAnimator() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SELECTOR =
      '[data-preset], [data-aos], .should-animate, .js-images-animation-up';

    const animateElement = (el) => {
      el.classList.add('is-animated');
      el.classList.add('aos-animate');
      if (el.classList.contains('js-images-animation-up')) {
        el.classList.add('active');
      }
    };

    // Use IntersectionObserver for 60fps/120fps hardware-accelerated detection
    let observer;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateElement(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: '0px 0px -40px 0px',
          threshold: 0.08,
        }
      );

      const observeAll = () => {
        const elements = document.querySelectorAll(SELECTOR);
        elements.forEach((el) => {
          if (!el.classList.contains('is-animated') && !el.classList.contains('aos-animate')) {
            observer.observe(el);
          }
        });
      };

      observeAll();

      // MutationObserver to automatically catch dynamic items / slides / cards
      const mutationObs = new MutationObserver(() => {
        observeAll();
      });

      mutationObs.observe(document.body, { childList: true, subtree: true });

      // Immediate check for elements already in viewport on initial load
      const initialTimer = setTimeout(() => {
        const windowHeight = window.innerHeight;
        document.querySelectorAll(SELECTOR).forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top < windowHeight * 0.92) {
            animateElement(el);
            if (observer) observer.unobserve(el);
          }
        });
      }, 60);

      return () => {
        clearTimeout(initialTimer);
        observer.disconnect();
        mutationObs.disconnect();
      };
    } else {
      // Fallback for browsers without IntersectionObserver
      const checkFallback = () => {
        const windowHeight = window.innerHeight;
        document.querySelectorAll(SELECTOR).forEach((el) => {
          if (!el.classList.contains('is-animated')) {
            const rect = el.getBoundingClientRect();
            if (rect.top < windowHeight * 0.88) {
              animateElement(el);
            }
          }
        });
      };

      window.addEventListener('scroll', checkFallback, { passive: true });
      checkFallback();

      return () => {
        window.removeEventListener('scroll', checkFallback);
      };
    }
  }, []);

  return null;
}

