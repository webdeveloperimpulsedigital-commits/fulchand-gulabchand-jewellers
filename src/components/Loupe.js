'use client';

import { useCallback, useRef, useState } from 'react';
import styles from './Loupe.module.css';

/**
 * Through the Loupe.
 * - No photograph yet: the approved static ring (decorative).
 * - With `src`: a circular 2.5× magnifier follows the pointer on desktop;
 *   touch users tap to place it. The image itself carries the alt text.
 */
export default function Loupe({ src, zoom = 2.5 }) {
  const ref = useRef(null);
  const [pos, setPos] = useState(null);

  const move = useCallback((e) => {
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    const x = Math.min(Math.max(e.clientX - box.left, 0), box.width);
    const y = Math.min(Math.max(e.clientY - box.top, 0), box.height);
    setPos({ x, y, w: box.width, h: box.height });
  }, []);

  if (!src) return <div className={styles.ring} aria-hidden="true" />;

  return (
    <div ref={ref} className={styles.area} onPointerMove={move} onPointerDown={move} onPointerLeave={() => setPos(null)} aria-hidden="true">
      {pos && (
        <div
          className={styles.lens}
          style={{
            left: pos.x,
            top: pos.y,
            backgroundImage: `url(${src})`,
            backgroundSize: `${pos.w * zoom}px ${pos.h * zoom}px`,
            backgroundPosition: `${-(pos.x * zoom - 66)}px ${-(pos.y * zoom - 66)}px`,
          }}
        />
      )}
    </div>
  );
}
