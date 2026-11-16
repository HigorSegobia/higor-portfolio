/**
 * Todo o conteúdo do portfólio mora aqui. Os componentes só desenham o que este arquivo descreve,
 * então atualizar o currículo é editar dados, não JSX.
 */

export type YearMonth = { year: number; month: number };

export interface Job {
  id: string;
  company: string;
  role: string;
  start: YearMonth;
  /** `null` quando é o emprego atual */
  end: YearMonth | null;
  /** primeira linha em destaque, as demais em seguida */
  highlight?: string;
  activities: string[];
}

export interface Highlight {
  id: 'crypto' | 'pix' | 'team';
  context: string;
  title: string;
  text: string;
}

export interface SkillArea {
  area: string;
  tools: string[];
  where: string;
  primary?: boolean;
}

export interface Education {
  title: string;
  school: string;
  period: string;
  status: 'em andamento' | 'concluído';
}

export interface Link {
  label: string;
  href: string;
  handle: string;
}

export const profile = {
  name: { first: 'Higor', last: 'Segobia' },
  available: true,
  statement: {
    before: 'Engenheiro de software sênior. Construo ',
    strong1: 'apps em Flutter',
    middle: ' e tudo o que eles precisam por trás, há mais de seis anos, em ',
    strong2: 'produtos financeiros',
    after: '.',
  },
  facts: [
    { label: 'Hoje', value: 'Santander, experiência de criptoativos' },
    { label: 'Mobile', value: 'Flutter, Dart, Kotlin, Swift' },
    { label: 'Web e back-end', value: 'Angular, React, Node.js' },
    { label: 'Nuvem', value: 'AWS Lambda, CloudWatch' },
    { label: 'Base', value: 'Monte Alto, SP' },
  ],
  links: {
    linkedin: { label: 'LinkedIn', href: 'https://www.linkedin.com/in/higor-segobia', handle: 'in/higor-segobia' },
    github: { label: 'GitHub', href: 'https://github.com/HigorSegobia', handle: 'HigorSegobia' },
  } satisfies Record<string, Link>,
  stack: ['Flutter', 'Angular', 'React', 'Node.js', 'AWS', 'Kotlin', 'Swift', 'Dart'],
} as const;

export const highlights: Highlight[] = [
  {
    id: 'crypto',
    context: 'Toro e Santander',
    title: 'Um vertical de negócio do zero',
    text: 'Construção da área de criptoativos, da concepção à evolução contínua, de ponta a ponta: app, web, serviços e AWS.',
  },
  {
    id: 'pix',
    context: 'paySmart, 2020',
    title: 'PIX no dia do lançamento',
    text: 'Integração do PIX ao app de conta digital durante o lançamento do sistema pelo Banco Central, dentro do prazo definido pelo Banco Central.',
  },
  {
    id: 'team',
    context: 'paySmart',
    title: 'Liderança do time mobile',
    text: 'Direcionamento técnico, code review e organização das entregas do app financeiro em Flutter.',
  },
];

export const jobs: Job[] = [
  {
    id: 'santander',
    company: 'Santander Brasil',
    role: 'Senior Software Development Engineer',
    start: { year: 2025, month: 7 },
    end: null,
    highlight: 'Construção da experiência de criptoativos, um novo vertical de negócio, da concepção à evolução do produto',
    activities: [
      'Mobile em Flutter, web em Angular e React, serviços em Node.js',
      'AWS Lambdas, logs e troubleshooting com CloudWatch',
      'Decisões de produto com dados do Mixpanel, junto com Design e Produto',
    ],
  },
  {
    id: 'toro',
    company: 'Toro Investimentos',
    role: 'Software Development Engineer',
    start: { year: 2021, month: 8 },
    end: { year: 2025, month: 6 },
    highlight: 'Engenheiro full stack na construção da área de criptoativos da plataforma',
    activities: [
      'Apps em Flutter, front-end em Angular e React, back-end em Node.js',
      'AWS Lambdas e investigação de problemas em produção com CloudWatch',
      'Refinamentos com Design e Produto, guiados por métricas do Mixpanel',
    ],
  },
  {
    id: 'paysmart',
    company: 'paySmart',
    role: 'Mobile Software Engineer e tech lead do time mobile',
    start: { year: 2020, month: 10 },
    end: { year: 2021, month: 7 },
    highlight: 'Integração do PIX ao app durante o lançamento do sistema pelo Banco Central, em 2020',
    activities: [
      'App de conta digital white label em Flutter',
      'Liderança técnica: direcionamento, code review e organização das entregas',
      'Testes unitários, publicação nas lojas e plugins nativos em Kotlin e Swift',
    ],
  },
  {
    id: 'accesys',
    company: 'Accesys Solutions',
    role: 'Flutter Developer',
    start: { year: 2020, month: 6 },
    end: { year: 2020, month: 10 },
    activities: [
      'Apps multiplataforma em Flutter para clientes de vários segmentos',
      'APIs REST em Node.js para dar suporte aos apps',
      'Testes unitários e design das aplicações',
    ],
  },
];

export const skills: SkillArea[] = [
  {
    area: 'Mobile',
    primary: true,
    tools: ['Flutter', 'Dart', 'Android', 'iOS', 'Kotlin', 'Swift'],
    where: 'Apps financeiros em produção nas quatro empresas, com publicação na App Store e Google Play',
  },
  { area: 'Web', tools: ['Angular', 'React', 'TypeScript', 'JavaScript'], where: 'Plataformas de investimento na Toro e no Santander' },
  { area: 'Back-end', tools: ['Node.js', 'APIs REST'], where: 'Serviços de apoio aos apps, da Accesys ao Santander' },
  { area: 'Nuvem', tools: ['AWS Lambda', 'CloudWatch'], where: 'Funções serverless, logs e investigação de problemas em produção' },
  {
    area: 'Qualidade',
    tools: ['Clean Architecture', 'testes unitários', 'CI/CD', 'Git', 'code review'],
    where: 'Padrão de código do time mobile da paySmart e dos times seguintes',
  },
  { area: 'Produto', tools: ['Mixpanel', 'Scrum', 'liderança técnica'], where: 'Decisões com Design e Produto na área de cripto' },
];

export const education: Education[] = [
  { title: 'Pós-graduação em Product Management', school: 'Descomplica Faculdade Digital', period: '2026 a 2027', status: 'em andamento' },
  { title: 'Bacharelado em Sistemas de Informação', school: 'Faculdade São Luís', period: '2018 a 2021', status: 'concluído' },
];

export const courses: string[] = [
  'Criação de Apps Android e iOS com Flutter',
  'JavaScript Ninja, de Fernando Daciuk',
  'Web Design com PHP, HTML, CSS e JavaScript',
  'Introdução ao Git e Controle de Versões',
];

/* ---------- utilitários de data ---------- */

const MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

export function formatYearMonth({ year, month }: YearMonth): string {
  return `${MONTHS[month - 1]} ${year}`;
}

/** meses entre duas datas, contando o mês de início */
export function monthsBetween(start: YearMonth, end: YearMonth): number {
  return (end.year - start.year) * 12 + (end.month - start.month) + 1;
}

/** anos de carreira a partir do primeiro emprego, arredondados para baixo */
export function careerYears(list: Job[], today: YearMonth): number {
  const first = list.reduce((min, j) => (j.start.year * 12 + j.start.month < min.year * 12 + min.month ? j.start : min), list[0].start);
  return Math.floor((monthsBetween(first, today) - 1) / 12);
}
