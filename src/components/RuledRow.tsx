import type { ReactNode } from 'react';
import { useReveal } from '../hooks/useReveal';

interface Props {
  className?: string;
  delay?: number;
  role?: string;
  children: ReactNode;
  as?: 'div' | 'li';
}

/** linha cuja régua de baixo se desenha da esquerda para a direita quando entra na tela */
export function RuledRow({ className = '', delay = 0, role, children, as = 'div' }: Props) {
  const [ref, state] = useReveal<HTMLDivElement & HTMLLIElement>();
  const Tag = as;
  return (
    <Tag ref={ref} role={role} className={className} data-state={state} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}
