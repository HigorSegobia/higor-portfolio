/**
 * Metadados para buscadores e para a prévia de link (LinkedIn, WhatsApp, Slack...).
 * Tudo sai de `profile.ts`; o plugin em `vite.config.ts` injeta no <head> de cada idioma e gera robots.txt e sitemap.xml no build.
 */
import { courses, education, jobs, LANGS, profile, type L, type Lang } from './data/profile';
import { LANG_PATH } from './i18n/ui';

export const SITE_NAME = `${profile.name.first} ${profile.name.last}`;
export const SITE_DESCRIPTION: L = {
  pt: 'Higor Segobia, engenheiro de software sênior. Apps em Flutter e produtos financeiros de ponta a ponta.',
  en: 'Higor Segobia, senior software engineer. Flutter apps and financial products, end to end.',
};
export const OG_IMAGE = { path: 'og.png', width: 1200, height: 630, alt: { pt: 'Higor Segobia, engenheiro de software sênior', en: 'Higor Segobia, senior software engineer' } };

/** código de idioma para hreflang e <html lang> */
export const HREFLANG: Record<Lang, string> = { pt: 'pt-BR', en: 'en' };
const OG_LOCALE: Record<Lang, string> = { pt: 'pt_BR', en: 'en_US' };

export const pageTitle = (lang: Lang) => `${SITE_NAME} · ${profile.title[lang]}`;

/** garante protocolo e barra final, para que `new URL('og.png', base)` funcione em subpastas */
export function normalizeSiteUrl(raw: string): string {
  const url = new URL(raw.trim());
  if (!url.pathname.endsWith('/')) url.pathname += '/';
  url.search = '';
  url.hash = '';
  return url.toString();
}

export const pageUrl = (siteUrl: string, lang: Lang) => new URL(LANG_PATH[lang], siteUrl).toString();

export function personJsonLd(siteUrl: string, lang: Lang) {
  const current = jobs.find((j) => j.end === null);
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_NAME,
    url: pageUrl(siteUrl, lang),
    image: new URL(OG_IMAGE.path, siteUrl).toString(),
    description: SITE_DESCRIPTION[lang],
    jobTitle: current?.role[lang] ?? profile.title[lang],
    ...(current && { worksFor: { '@type': 'Organization', name: current.company } }),
    address: {
      '@type': 'PostalAddress',
      addressLocality: profile.location.city,
      addressRegion: profile.location.region,
      addressCountry: profile.location.country,
    },
    alumniOf: [...new Set(education.map((e) => e.school))].map((name) => ({ '@type': 'EducationalOrganization', name })),
    knowsAbout: [...new Set([...profile.stack, 'AWS Lambda', 'Product Management'])],
    hasCredential: courses.map((c) => ({ '@type': 'EducationalOccupationalCredential', name: c[lang] })),
    sameAs: Object.values(profile.links).map((l) => l.href),
  };
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** tags do <head> de uma página, uma por linha */
export function headTags(siteUrl: string, lang: Lang): string {
  const url = pageUrl(siteUrl, lang);
  const image = new URL(OG_IMAGE.path, siteUrl).toString();
  const title = pageTitle(lang);
  const description = SITE_DESCRIPTION[lang];
  const meta: [string, string, string][] = [
    ['name', 'description', description],
    ['property', 'og:type', 'profile'],
    ['property', 'og:locale', OG_LOCALE[lang]],
    ...LANGS.filter((x) => x !== lang).map((x): [string, string, string] => ['property', 'og:locale:alternate', OG_LOCALE[x]]),
    ['property', 'og:site_name', SITE_NAME],
    ['property', 'og:title', title],
    ['property', 'og:description', description],
    ['property', 'og:url', url],
    ['property', 'og:image', image],
    ['property', 'og:image:type', 'image/png'],
    ['property', 'og:image:width', String(OG_IMAGE.width)],
    ['property', 'og:image:height', String(OG_IMAGE.height)],
    ['property', 'og:image:alt', OG_IMAGE.alt[lang]],
    ['property', 'profile:first_name', profile.name.first],
    ['property', 'profile:last_name', profile.name.last],
    ['name', 'twitter:card', 'summary_large_image'],
    ['name', 'twitter:title', title],
    ['name', 'twitter:description', description],
    ['name', 'twitter:image', image],
    ['name', 'twitter:image:alt', OG_IMAGE.alt[lang]],
  ];
  // "<" escapado para o JSON nunca fechar a tag <script> por acidente
  const ld = JSON.stringify(personJsonLd(siteUrl, lang)).replace(/</g, '\\u003c');
  return [
    `<title>${esc(title)}</title>`,
    `<link rel="canonical" href="${esc(url)}" />`,
    ...LANGS.map((x) => `<link rel="alternate" hreflang="${HREFLANG[x]}" href="${esc(pageUrl(siteUrl, x))}" />`),
    `<link rel="alternate" hreflang="x-default" href="${esc(pageUrl(siteUrl, 'pt'))}" />`,
    ...meta.map(([attr, key, value]) => `<meta ${attr}="${key}" content="${esc(value)}" />`),
    `<script type="application/ld+json">${ld}</script>`,
  ].join('\n    ');
}

export function robotsTxt(siteUrl: string): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap.xml', siteUrl)}\n`;
}

export function sitemapXml(siteUrl: string, lastmod: string): string {
  const alternates = LANGS.map((x) => `    <xhtml:link rel="alternate" hreflang="${HREFLANG[x]}" href="${esc(pageUrl(siteUrl, x))}" />`).join('\n');
  const urls = LANGS.map(
    (lang) => `  <url>
    <loc>${esc(pageUrl(siteUrl, lang))}</loc>
    <lastmod>${lastmod}</lastmod>
${alternates}
  </url>`,
  ).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}
