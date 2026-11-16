import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * "Acende" um elemento quando o topo dele passa de uma linha da tela (60% da altura por padrão)
 * e apaga de novo ao voltar a rolagem. Diferente de useReveal, acompanha os dois sentidos.
 */
export function useLit<T extends Element>(line = 0.6) {
  const ref = useRef<T>(null);
  const reduce = usePrefersReducedMotion();
  const [lit, setLit] = useState(true);

  useEffect(() => {
    if (reduce) {
      setLit(true);
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (el) setLit(el.getBoundingClientRect().top < window.innerHeight * line);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [line, reduce]);

  return [ref, lit] as const;
}
