import { createContext, useContext, type ReactNode } from 'react';
import type { L, Lang } from '../data/profile';
import { LANG_PATH, ui, type Ui } from './ui';

interface LangValue {
  lang: Lang;
  /** textos da interface no idioma atual */
  t: Ui;
  /** escolhe o idioma atual de um par `{ pt, en }` */
  l: (text: L) => string;
  /** caminho relativo da página atual até a raiz do site, para links como o do PDF */
  root: string;
}

const LangContext = createContext<LangValue | null>(null);

/** o idioma vem do `<html lang>` de cada página (index.html em pt, en/index.html em en) */
export function langFromDocument(): Lang {
  return typeof document !== 'undefined' && document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'pt';
}

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const depth = LANG_PATH[lang].split('/').filter(Boolean).length;
  const value: LangValue = {
    lang,
    t: ui[lang],
    l: (text) => text[lang],
    root: depth ? '../'.repeat(depth) : './',
  };
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang precisa estar dentro de <LangProvider>');
  return ctx;
}
