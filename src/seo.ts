/**
 * Metadados para buscadores e para a prévia de link (LinkedIn, WhatsApp, Slack...).
 * Tudo sai de `profile.ts`; o plugin em `vite.config.ts` injeta no <head> e gera robots.txt e sitemap.xml no build.
 */
import { courses, education, jobs, profile } from './data/profile';

export const SITE_TITLE = `${profile.name.first} ${profile.name.last}`;
export const SITE_DESCRIPTION =
  'Higor Segobia, engenheiro de software sênior. Apps em Flutter e produtos financeiros de ponta a ponta.';
export const OG_IMAGE = { path: 'og.png', width: 1200, height: 630, alt: 'Higor Segobia, engenheiro de software sênior' };

/** garante protocolo e barra final, para que `new URL('og.png', base)` funcione em subpastas */
export function normalizeSiteUrl(raw: string): string {
  const url = new URL(raw.trim());
  if (!url.pathname.endsWith('/')) url.pathname += '/';
  url.search = '';
  url.hash = '';
  return url.toString();
}

export function personJsonLd(siteUrl: string) {
  const current = jobs.find((j) => j.end === null);
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_TITLE,
    url: siteUrl,
    image: new URL(OG_IMAGE.path, siteUrl).toString(),
    description: SITE_DESCRIPTION,
    jobTitle: current?.role ?? 'Engenheiro de software',
    ...(current && { worksFor: { '@type': 'Organization', name: current.company } }),
    address: { '@type': 'PostalAddress', addressLocality: 'Monte Alto', addressRegion: 'SP', addressCountry: 'BR' },
    alumniOf: [...new Set(education.map((e) => e.school))].map((name) => ({ '@type': 'EducationalOrganization', name })),
    knowsAbout: [...profile.stack, 'AWS Lambda', 'Node.js', 'Product Management'].filter((v, i, a) => a.indexOf(v) === i),
    hasCredential: courses.map((name) => ({ '@type': 'EducationalOccupationalCredential', name })),
    sameAs: Object.values(profile.links).map((l) => l.href),
  };
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** tags do <head>, uma por linha */
export function headTags(siteUrl: string): string {
  const image = new URL(OG_IMAGE.path, siteUrl).toString();
  const meta: [string, string, string][] = [
    ['name', 'description', SITE_DESCRIPTION],
    ['property', 'og:type', 'profile'],
    ['property', 'og:locale', 'pt_BR'],
    ['property', 'og:site_name', SITE_TITLE],
    ['property', 'og:title', SITE_TITLE],
    ['property', 'og:description', SITE_DESCRIPTION],
    ['property', 'og:url', siteUrl],
    ['property', 'og:image', image],
    ['property', 'og:image:type', 'image/png'],
    ['property', 'og:image:width', String(OG_IMAGE.width)],
    ['property', 'og:image:height', String(OG_IMAGE.height)],
    ['property', 'og:image:alt', OG_IMAGE.alt],
    ['property', 'profile:first_name', profile.name.first],
    ['property', 'profile:last_name', profile.name.last],
    ['name', 'twitter:card', 'summary_large_image'],
    ['name', 'twitter:title', SITE_TITLE],
    ['name', 'twitter:description', SITE_DESCRIPTION],
    ['name', 'twitter:image', image],
    ['name', 'twitter:image:alt', OG_IMAGE.alt],
  ];
  // "<" escapado para o JSON nunca fechar a tag <script> por acidente
  const ld = JSON.stringify(personJsonLd(siteUrl)).replace(/</g, '\\u003c');
  return [
    `<link rel="canonical" href="${esc(siteUrl)}" />`,
    ...meta.map(([attr, key, value]) => `<meta ${attr}="${key}" content="${esc(value)}" />`),
    `<script type="application/ld+json">${ld}</script>`,
  ].join('\n    ');
}

export function robotsTxt(siteUrl: string): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap.xml', siteUrl)}\n`;
}

export function sitemapXml(siteUrl: string, lastmod: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${esc(siteUrl)}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>
</urlset>
`;
}
