import { useEffect, useRef, useState, type ReactNode } from 'react';
import { highlights, type Highlight } from '../data/profile';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { Box } from './Box';
import { SectionTitle } from './SectionTitle';
import { CandlesDrawing } from './drawings/CandlesDrawing';
import { PixDrawing } from './drawings/PixDrawing';
import { TeamDrawing } from './drawings/TeamDrawing';
import styles from './Highlights.module.css';

function HighlightCard({ item }: { item: Highlight }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();
  // cada incremento remonta o desenho e toca a animação de novo
  const [run, setRun] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun((n) => n + 1);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  const drawings: Record<Highlight['id'], ReactNode> = {
    crypto: <CandlesDrawing />,
    pix: <PixDrawing animate={!reduce} />,
    team: <TeamDrawing />,
  };

  return (
    <Box as="article" ref={ref} className={styles.card} onPointerEnter={() => !reduce && setRun((n) => n + 1)}>
      <figure className={`${styles.figure} ${run > 0 ? styles.run : ''}`} key={run}>
        {drawings[item.id]}
      </figure>
      <div className={styles.text}>
        <span className={styles.context}>{item.context}</span>
        <h3>{item.title}</h3>
        <p>{item.text}</p>
      </div>
    </Box>
  );
}

export function Highlights() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="destaques">
      <div className="wrap">
        <SectionTitle id="destaques" title="Destaques" lead="Três entregas que mostram como trabalho com produto, prazo e time." />
        <div className={`g ${styles.grid}`}>
          {highlights.map((h) => (
            <HighlightCard key={h.id} item={h} />
          ))}
        </div>
      </div>
    </section>
  );
}
