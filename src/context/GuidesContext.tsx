import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

interface GuidesValue {
  on: boolean;
  toggle: () => void;
}

const GuidesContext = createContext<GuidesValue | null>(null);

/**
 * Estado do modo "Guias de layout", inspirado no debug paint do Flutter.
 * Qualquer componente pode ler `on` para se contornar e se medir.
 */
export function GuidesProvider({ children }: { children: ReactNode }) {
  const [on, setOn] = useState(false);
  const toggle = useCallback(() => setOn((v) => !v), []);

  useEffect(() => {
    document.body.classList.toggle('guides', on);
  }, [on]);

  const value = useMemo(() => ({ on, toggle }), [on, toggle]);
  return <GuidesContext.Provider value={value}>{children}</GuidesContext.Provider>;
}

export function useGuides(): GuidesValue {
  const ctx = useContext(GuidesContext);
  if (!ctx) throw new Error('useGuides precisa estar dentro de <GuidesProvider>');
  return ctx;
}
