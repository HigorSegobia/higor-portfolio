/**
 * Todo o conteúdo do portfólio mora aqui. Os componentes só desenham o que este arquivo descreve,
 * então atualizar o currículo é editar dados, não JSX.
 *
 * Todo texto visível vem em par `{ pt, en }`. Os testes garantem que nenhuma tradução fica vazia.
 */

export type Lang = 'pt' | 'en';
export const LANGS: readonly Lang[] = ['pt', 'en'];

/** texto nos dois idiomas */
export type L = Record<Lang, string>;

export type YearMonth = { year: number; month: number };

export interface Job {
  id: string;
  company: string;
  role: L;
  start: YearMonth;
  /** `null` quando é o emprego atual */
  end: YearMonth | null;
  /** primeira linha em destaque, as demais em seguida */
  highlight?: L;
  activities: L[];
}

export interface Highlight {
  id: 'crypto' | 'pix' | 'team';
  context: L;
  title: L;
  text: L;
}

export interface SkillArea {
  area: L;
  tools: L[];
  where: L;
  primary?: boolean;
}

export interface Education {
  title: L;
  school: string;
  start: number;
  end: number;
  ongoing: boolean;
}

export interface Link {
  label: string;
  href: string;
  handle: string;
}

/** mesmo texto nos dois idiomas (nomes próprios, tecnologias) */
const same = (s: string): L => ({ pt: s, en: s });

export const profile = {
  name: { first: 'Higor', last: 'Segobia' },
  available: true,
  title: { pt: 'Engenheiro de software sênior', en: 'Senior software engineer' } satisfies L,
  statement: {
    pt: {
      before: 'Engenheiro de software sênior. Construo ',
      strong1: 'apps em Flutter',
      middle: ' e tudo o que eles precisam por trás, há mais de seis anos, em ',
      strong2: 'produtos financeiros',
      after: '.',
    },
    en: {
      before: 'Senior software engineer. For over six years I have built ',
      strong1: 'Flutter apps',
      middle: ' and everything behind them for ',
      strong2: 'financial products',
      after: '.',
    },
  },
  facts: [
    { label: { pt: 'Hoje', en: 'Now' }, value: { pt: 'Santander, experiência de criptoativos', en: 'Santander, crypto assets experience' } },
    { label: same('Mobile'), value: same('Flutter, Dart, Kotlin, Swift') },
    { label: { pt: 'Web e back-end', en: 'Web and back end' }, value: same('Angular, React, Node.js') },
    { label: { pt: 'Nuvem', en: 'Cloud' }, value: same('AWS Lambda, CloudWatch') },
    { label: { pt: 'Base', en: 'Based in' }, value: { pt: 'Monte Alto, SP', en: 'Monte Alto, SP, Brazil' } },
  ] satisfies { label: L; value: L }[],
  location: { city: 'Monte Alto', region: 'SP', country: 'BR' },
  links: {
    linkedin: { label: 'LinkedIn', href: 'https://www.linkedin.com/in/higor-segobia', handle: 'in/higor-segobia' },
    github: { label: 'GitHub', href: 'https://github.com/HigorSegobia', handle: 'HigorSegobia' },
  } satisfies Record<string, Link>,
  stack: ['Flutter', 'Angular', 'React', 'Node.js', 'AWS', 'Kotlin', 'Swift', 'Dart'],
} as const;

export const highlights: Highlight[] = [
  {
    id: 'crypto',
    context: { pt: 'Toro e Santander', en: 'Toro and Santander' },
    title: { pt: 'Um vertical de negócio do zero', en: 'A business vertical from scratch' },
    text: {
      pt: 'Construção da área de criptoativos, da concepção à evolução contínua, de ponta a ponta: app, web, serviços e AWS.',
      en: 'Building the crypto assets area from concept to continuous evolution, end to end: app, web, services and AWS.',
    },
  },
  {
    id: 'pix',
    context: same('paySmart, 2020'),
    title: { pt: 'PIX no dia do lançamento', en: 'PIX on launch day' },
    text: {
      pt: 'Integração do PIX ao app de conta digital durante o lançamento do sistema pelo Banco Central, dentro do prazo definido pelo Banco Central.',
      en: "Integrated PIX, Brazil's instant payment system, into the digital account app as the Central Bank launched it, within the Central Bank's deadline.",
    },
  },
  {
    id: 'team',
    context: same('paySmart'),
    title: { pt: 'Liderança do time mobile', en: 'Leading the mobile team' },
    text: {
      pt: 'Direcionamento técnico, code review e organização das entregas do app financeiro em Flutter.',
      en: 'Technical direction, code review and delivery planning for the Flutter finance app.',
    },
  },
];

export const jobs: Job[] = [
  {
    id: 'santander',
    company: 'Santander Brasil',
    role: same('Senior Software Development Engineer'),
    start: { year: 2025, month: 7 },
    end: null,
    highlight: {
      pt: 'Construção da experiência de criptoativos, um novo vertical de negócio, da concepção à evolução do produto',
      en: 'Building the crypto assets experience, a new business vertical, from concept to product evolution',
    },
    activities: [
      { pt: 'Mobile em Flutter, web em Angular e React, serviços em Node.js', en: 'Mobile in Flutter, web in Angular and React, services in Node.js' },
      { pt: 'AWS Lambdas, logs e troubleshooting com CloudWatch', en: 'AWS Lambdas, logging and troubleshooting with CloudWatch' },
      { pt: 'Decisões de produto com dados do Mixpanel, junto com Design e Produto', en: 'Product decisions backed by Mixpanel data, together with Design and Product' },
    ],
  },
  {
    id: 'toro',
    company: 'Toro Investimentos',
    role: same('Software Development Engineer'),
    start: { year: 2021, month: 8 },
    end: { year: 2025, month: 6 },
    highlight: {
      pt: 'Engenheiro full stack na construção da área de criptoativos da plataforma',
      en: "Full stack engineer building the platform's crypto assets area",
    },
    activities: [
      { pt: 'Apps em Flutter, front-end em Angular e React, back-end em Node.js', en: 'Flutter apps, Angular and React front end, Node.js back end' },
      { pt: 'AWS Lambdas e investigação de problemas em produção com CloudWatch', en: 'AWS Lambdas and production troubleshooting with CloudWatch' },
      { pt: 'Refinamentos com Design e Produto, guiados por métricas do Mixpanel', en: 'Refinement with Design and Product, guided by Mixpanel metrics' },
    ],
  },
  {
    id: 'paysmart',
    company: 'paySmart',
    role: { pt: 'Mobile Software Engineer e tech lead do time mobile', en: 'Mobile Software Engineer and mobile tech lead' },
    start: { year: 2020, month: 10 },
    end: { year: 2021, month: 7 },
    highlight: {
      pt: 'Integração do PIX ao app durante o lançamento do sistema pelo Banco Central, em 2020',
      en: 'Integrated PIX into the app as the Central Bank launched the system in 2020',
    },
    activities: [
      { pt: 'App de conta digital white label em Flutter', en: 'White-label digital account app in Flutter' },
      { pt: 'Liderança técnica: direcionamento, code review e organização das entregas', en: 'Technical leadership: direction, code review and delivery planning' },
      { pt: 'Testes unitários, publicação nas lojas e plugins nativos em Kotlin e Swift', en: 'Unit tests, store releases and native plugins in Kotlin and Swift' },
    ],
  },
  {
    id: 'accesys',
    company: 'Accesys Solutions',
    role: same('Flutter Developer'),
    start: { year: 2020, month: 6 },
    end: { year: 2020, month: 10 },
    activities: [
      { pt: 'Apps multiplataforma em Flutter para clientes de vários segmentos', en: 'Cross-platform Flutter apps for clients in several industries' },
      { pt: 'APIs REST em Node.js para dar suporte aos apps', en: 'Node.js REST APIs backing the apps' },
      { pt: 'Testes unitários e design das aplicações', en: 'Unit tests and application design' },
    ],
  },
];

export const skills: SkillArea[] = [
  {
    area: same('Mobile'),
    primary: true,
    tools: ['Flutter', 'Dart', 'Android', 'iOS', 'Kotlin', 'Swift'].map(same),
    where: {
      pt: 'Apps financeiros em produção nas quatro empresas, com publicação na App Store e Google Play',
      en: 'Finance apps in production at all four companies, shipped to the App Store and Google Play',
    },
  },
  {
    area: same('Web'),
    tools: ['Angular', 'React', 'TypeScript', 'JavaScript'].map(same),
    where: { pt: 'Plataformas de investimento na Toro e no Santander', en: 'Investment platforms at Toro and Santander' },
  },
  {
    area: { pt: 'Back-end', en: 'Back end' },
    tools: [same('Node.js'), { pt: 'APIs REST', en: 'REST APIs' }],
    where: { pt: 'Serviços de apoio aos apps, da Accesys ao Santander', en: 'Services backing the apps, from Accesys to Santander' },
  },
  {
    area: { pt: 'Nuvem', en: 'Cloud' },
    tools: ['AWS Lambda', 'CloudWatch'].map(same),
    where: { pt: 'Funções serverless, logs e investigação de problemas em produção', en: 'Serverless functions, logging and production troubleshooting' },
  },
  {
    area: { pt: 'Qualidade', en: 'Quality' },
    tools: [same('Clean Architecture'), { pt: 'testes unitários', en: 'unit testing' }, same('CI/CD'), same('Git'), same('code review')],
    where: { pt: 'Padrão de código do time mobile da paySmart e dos times seguintes', en: "Code standards for paySmart's mobile team and the teams after it" },
  },
  {
    area: { pt: 'Produto', en: 'Product' },
    tools: [same('Mixpanel'), same('Scrum'), { pt: 'liderança técnica', en: 'technical leadership' }],
    where: { pt: 'Decisões com Design e Produto na área de cripto', en: 'Decisions with Design and Product in the crypto area' },
  },
];

export const education: Education[] = [
  {
    title: { pt: 'Pós-graduação em Product Management', en: 'Postgraduate degree in Product Management' },
    school: 'Descomplica Faculdade Digital',
    start: 2026,
    end: 2027,
    ongoing: true,
  },
  {
    title: { pt: 'Bacharelado em Sistemas de Informação', en: "Bachelor's in Information Systems" },
    school: 'Faculdade São Luís',
    start: 2018,
    end: 2021,
    ongoing: false,
  },
];

export const courses: L[] = [
  { pt: 'Criação de Apps Android e iOS com Flutter', en: 'Building Android and iOS apps with Flutter' },
  { pt: 'JavaScript Ninja, de Fernando Daciuk', en: 'JavaScript Ninja, by Fernando Daciuk' },
  { pt: 'Web Design com PHP, HTML, CSS e JavaScript', en: 'Web design with PHP, HTML, CSS and JavaScript' },
  { pt: 'Introdução ao Git e Controle de Versões', en: 'Introduction to Git and version control' },
];

/* ---------- utilitários de data ---------- */

const MONTHS: Record<Lang, string[]> = {
  pt: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

export function formatYearMonth({ year, month }: YearMonth, lang: Lang = 'pt'): string {
  return `${MONTHS[lang][month - 1]} ${year}`;
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
