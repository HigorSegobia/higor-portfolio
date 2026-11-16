import { createElement, forwardRef, useCallback, useRef, type ElementType, type HTMLAttributes, type ReactNode, type Ref } from 'react';
import { useGuides } from '../context/GuidesContext';
import { useElementSize } from '../hooks/useElementSize';
import styles from './Box.module.css';

type BoxProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  children?: ReactNode;
};

/**
 * Bloco de layout. No modo guias, ganha contorno e mostra a própria medida em pixels,
 * atualizada ao vivo com ResizeObserver.
 */
export const Box = forwardRef(function Box({ as = 'div', className, children, ...rest }: BoxProps, forwarded: Ref<HTMLElement>) {
  const inner = useRef<HTMLElement | null>(null);
  const { on } = useGuides();
  const size = useElementSize(inner, on);

  const setRef = useCallback(
    (node: HTMLElement | null) => {
      inner.current = node;
      if (typeof forwarded === 'function') forwarded(node);
      else if (forwarded) (forwarded as { current: HTMLElement | null }).current = node;
    },
    [forwarded],
  );

  const cls = [className, on ? styles.boxed : ''].filter(Boolean).join(' ') || undefined;

  return createElement(
    as,
    { ...rest, ref: setRef, className: cls },
    children,
    on && size ? (
      <span className={styles.size} aria-hidden="true">
        {size.width} × {size.height}
      </span>
    ) : null,
  );
});
