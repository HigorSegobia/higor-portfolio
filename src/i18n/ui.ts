import type { Lang } from '../data/profile';

/** textos fixos da interface; o conteúdo do currículo fica em data/profile.ts */
const pt = {
  available: 'Aberto a novas oportunidades',
  navLabel: 'Seções',
  nav: { highlights: 'Destaques', experience: 'Experiência', skills: 'Competências', education: 'Formação', contact: 'Contato' },
  switchTo: { label: 'English', short: 'EN', title: 'Read in English' },
  hero: { linkedin: 'Falar comigo no LinkedIn', experience: 'Ver experiência', cv: 'Currículo em PDF' },
  highlights: { title: 'Destaques', lead: 'Três entregas que mostram como trabalho com produto, prazo e time.' },
  pixCaption: 'Banco Central, 2020',
  experience: {
    title: 'Experiência',
    lead: 'Quatro empresas desde 2020. Em todas, Flutter no centro e a mão no produto.',
    untilNow: 'até hoje',
    current: 'Emprego atual',
  },
  skills: {
    title: 'Competências',
    lead: 'O que uso para levar uma funcionalidade do design até produção, e onde usei.',
    area: 'Área',
    tools: 'Ferramentas',
    where: 'Onde usei',
  },
  education: {
    title: 'Formação',
    lead: 'Sistemas de Informação na base. Agora, especialização em produto.',
    ongoing: 'Em andamento',
    done: 'Concluído',
    period: (start: number, end: number) => `${start} a ${end}`,
    courses: 'Cursos',
  },
  contact: { title: 'Vamos conversar.', cv: 'Currículo', cvHandle: 'PDF, 1 página' },
  footer: 'Feito em React e TypeScript, numa grade de 12 colunas',
  guides: {
    label: 'Guias de layout',
    hint: 'Como o debug paint do Flutter: veja a grade de 12 colunas e o tamanho de cada bloco.',
  },
};

/** mesmo formato do português: o TypeScript acusa qualquer chave faltando */
const en: Ui = {
  available: 'Open to new opportunities',
  navLabel: 'Sections',
  nav: { highlights: 'Highlights', experience: 'Experience', skills: 'Skills', education: 'Education', contact: 'Contact' },
  switchTo: { label: 'Português', short: 'PT', title: 'Ler em português' },
  hero: { linkedin: 'Message me on LinkedIn', experience: 'See experience', cv: 'Résumé (PDF)' },
  highlights: { title: 'Highlights', lead: 'Three deliveries that show how I work with product, deadlines and people.' },
  pixCaption: 'Central Bank, 2020',
  experience: {
    title: 'Experience',
    lead: 'Four companies since 2020. Flutter at the core of each, and hands on the product.',
    untilNow: 'to present',
    current: 'Current role',
  },
  skills: {
    title: 'Skills',
    lead: 'What I use to take a feature from design to production, and where I used it.',
    area: 'Area',
    tools: 'Tools',
    where: 'Where',
  },
  education: {
    title: 'Education',
    lead: 'Information Systems as the foundation. Now, specializing in product.',
    ongoing: 'In progress',
    done: 'Completed',
    period: (start: number, end: number) => `${start} to ${end}`,
    courses: 'Courses',
  },
  contact: { title: "Let's talk.", cv: 'Résumé', cvHandle: 'PDF, 1 page' },
  footer: 'Built with React and TypeScript on a 12-column grid',
  guides: {
    label: 'Layout guides',
    hint: "Like Flutter's debug paint: see the 12-column grid and the size of every block.",
  },
};

export type Ui = typeof pt;
export const ui: Record<Lang, Ui> = { pt, en };

/** ids das seções, iguais nos dois idiomas para os links funcionarem entre versões */
export const SECTION_IDS = {
  highlights: 'destaques',
  experience: 'experiencia',
  skills: 'competencias',
  education: 'formacao',
  contact: 'contato',
} as const;

/** caminho de cada versão a partir da raiz do site */
export const LANG_PATH: Record<Lang, string> = { pt: '', en: 'en/' };

/** nome do PDF do currículo em cada idioma, na raiz do site */
export const cvFile = (lang: Lang) => `higor-segobia-cv-${lang}.pdf`;
