import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import styles from './Marquee.module.css';

/** faixa de palavras em contorno; acelera conforme a velocidade da rolagem */
export function Marquee({ words }: { words: readonly string[] }) {
  const track = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const el = track.current;
    if (!el || reduce) return;
    let x = 0;
    let boost = 0;
    let last = window.scrollY;
    let frame = 0;
    const loop = () => {
      const dy = window.scrollY - last;
      last = window.scrollY;
      boost += (Math.min(Math.abs(dy), 60) * 0.12 - boost) * 0.1;
      x -= 0.45 + boost;
      const half = el.scrollWidth / 2;
      if (half > 0 && -x >= half) x += half;
      el.style.transform = `translate3d(${x}px,0,0)`;
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [reduce]);

  const doubled = [...words, ...words];
  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.track} ref={track}>
        {doubled.map((w, i) => (
          <span key={`${w}-${i}`}>{w}</span>
        ))}
      </div>
    </div>
  );
}
