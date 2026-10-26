'use client';

import { useEffect, useRef } from 'react';
import { getAssetUrl } from '@/utils/basePath';
import styles from './StoreTour.module.css';

/**
 * StoreTour — Pure, Clean, Continuous Autoplaying Store Tour Video
 * 
 * - Plays continuously on infinite loop.
 * - Permanently 100% muted (zero audio/music).
 * - 100% clean: zero buttons, zero badges, zero overlays.
 * - Autoplays when in view; pauses if scrolled far past.
 */
export default function StoreTour() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video is strictly muted and starts playing
    video.muted = true;
    video.play().catch(() => {});

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={styles.tourSection}
      id="store-tour"
      aria-label="Flagship Store Tour"
    >
      <div className={styles.videoWrapper} data-preset="scale">
        <video
          ref={videoRef}
          src={getAssetUrl('/videos/store-tour.mp4')}
          className={styles.video}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
      </div>
    </section>
  );
}
