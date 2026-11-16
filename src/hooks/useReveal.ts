import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

export type RevealState = 'idle' | 'waiting' | 'revealed';

interface Options {
  threshold?: number;
  rootMargin?: string;
}

/**
 * Revela um elemento quando ele entra na tela, uma única vez.
 * O que já está visível no carregamento nunca é escondido: só elementos abaixo da dobra
 * passam pelo estado "waiting". Assim a página está completa mesmo sem JavaScript ou com scroll parado.
 */
export function useReveal<T extends Element>({ threshold = 0.2, rootMargin = '0px 0px -8% 0px' }: Options = {}) {
  const ref = useRef<T>(null);
  const reduce = usePrefersReducedMotion();
  const [state, setState] = useState<RevealState>('idle');

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce || typeof IntersectionObserver === 'undefined') {
      setState('revealed');
      return;
    }
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
      setState('revealed');
      return;
    }
    setState('waiting');
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('revealed');
          io.disconnect();
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce, threshold, rootMargin]);

  return [ref, state] as const;
}
