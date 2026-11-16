import { useEffect, useState, type RefObject } from 'react';

export interface Size {
  width: number;
  height: number;
}

/** mede um elemento com ResizeObserver; só observa enquanto `enabled` for true */
export function useElementSize(ref: RefObject<Element>, enabled = true): Size | null {
  const [size, setSize] = useState<Size | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setSize({ width: Math.round(r.width), height: Math.round(r.height) });
    };
    measure();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref, enabled]);

  return enabled ? size : null;
}
