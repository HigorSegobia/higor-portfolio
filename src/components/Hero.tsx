import { useLayoutEffect, useRef, useState } from 'react';
import { profile } from '../data/profile';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { Box } from './Box';
import styles from './Hero.module.css';

/** largura real do nome, recalculada quando a fonte carrega ou a tela muda */
function useNameWidth() {
  const ref = useRef<HTMLHeadingElement>(null);
  const [width, setWidth] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const spans = el.querySelectorAll('span');
      const last = spans[spans.length - 1];
      if (!last) return;
      setWidth(Math.round(last.getBoundingClientRect().right - el.getBoundingClientRect().left));
    };
    measure();
    const timer = window.setTimeout(measure, 1600); // depois da animação de largura
    document.fonts?.ready.then(measure);
    window.addEventListener('resize', measure);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('resize', measure);
    };
  }, []);

  return [ref, width] as const;
}

export function Hero() {
  const [nameRef, width] = useNameWidth();
  const reduce = usePrefersReducedMotion();
  /* passa o brilho metálico de novo, reiniciando só a animação de brilho */
  const replay = () => {
    const el = nameRef.current;
    if (!el || reduce) return;
    el.classList.remove(styles.again);
    void el.offsetWidth;
    el.classList.add(styles.again);
  };
  const { statement: s, links } = profile;

  return (
    <section className={styles.hero}>
      <div className="wrap g">
        <span className={`${styles.crop} ${styles.tl}`} aria-hidden="true" />
        <span className={`${styles.crop} ${styles.tr}`} aria-hidden="true" />
        <span className={`${styles.crop} ${styles.bl}`} aria-hidden="true" />
        <span className={`${styles.crop} ${styles.br}`} aria-hidden="true" />

        <Box as="h1" ref={nameRef} className={styles.name} onPointerEnter={replay}>
          <span>{profile.name.first}</span> <span>{profile.name.last}</span>
        </Box>

        <div className={styles.dim} style={width ? { width } : undefined} aria-hidden="true">
          <span>{width ?? '—'} px</span>
        </div>

        <Box className={`c-l ${styles.fade}`}>
          <p className={styles.statement}>
            {s.before}
            <b>{s.strong1}</b>
            {s.middle}
            <b>{s.strong2}</b>
            {s.after}
          </p>
          <div className={styles.actions}>
            <a className={`${styles.btn} ${styles.solid}`} href={links.linkedin.href} target="_blank" rel="noopener noreferrer">
              Falar comigo no LinkedIn
            </a>
            <a className={styles.btn} href="#experiencia">
              Ver experiência
            </a>
          </div>
        </Box>

        <Box as="dl" className={`c-r ${styles.facts}`}>
          {profile.facts.map((f, i) => (
            <div key={f.label} style={{ animationDelay: `${0.55 + i * 0.07}s` }}>
              <dt>{f.label}</dt>
              <dd style={{ animationDelay: `${0.6 + i * 0.07}s` }}>{f.value}</dd>
            </div>
          ))}
        </Box>
      </div>
    </section>
  );
}
