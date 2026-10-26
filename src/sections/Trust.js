'use client';

import { useState } from 'react';
import { stories } from '@/content/site';
import { ArrowShort, QuoteMark } from '@/components/Icons';
import ui from '@/components/ui.module.css';
import styles from './Trust.module.css';

/**
 * 9 · Trust — one customer story at a time, changed only by the visitor
 * (never auto-advancing), and a quiet press row. All content client-supplied.
 */
export default function Trust() {
  const [i, setI] = useState(0);
  const n = stories.length;
  const story = stories[i];
  const pad = (x) => String(x).padStart(2, '0');

  return (
    <section className={styles.section} id="stories" aria-labelledby="trust-h">
      <div className="wrap">
        <div className={styles.grid}>
          <div className={styles.side}>
            <p className="label">In their words</p>
            <h2 className="h2" id="trust-h">
              Customer stories
            </h2>
            <p className="caption" aria-live="polite">
              {pad(i + 1)} / {pad(n)}
            </p>
            <div className={ui.arrows}>
              <button type="button" className={ui.arrow} aria-label="Previous story" onClick={() => setI((i + n - 1) % n)}>
                <ArrowShort direction="left" />
              </button>
              <button type="button" className={ui.arrow} aria-label="Next story" onClick={() => setI((i + 1) % n)}>
                <ArrowShort />
              </button>
            </div>
          </div>
          <figure className={styles.quoteWrap}>
            <QuoteMark />
            <blockquote className={styles.quote}>
              {story.text}
            </blockquote>
            <figcaption className="label">{story.by}</figcaption>
          </figure>
        </div>

        <div className={styles.press} aria-label="Press coverage — logos to come">
          {[1, 2, 3, 4, 5].map((k) => (
            <div key={k} className={styles.pressSlot}>
              Press logo
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
