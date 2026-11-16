import { headTags, normalizeSiteUrl, personJsonLd, robotsTxt, sitemapXml } from './seo';

const SITE = 'https://exemplo.dev/portfolio/';

describe('seo', () => {
  it('normaliza a URL do site com barra final', () => {
    expect(normalizeSiteUrl('https://exemplo.dev/portfolio')).toBe(SITE);
    expect(normalizeSiteUrl(' https://exemplo.dev?x=1#a ')).toBe('https://exemplo.dev/');
    expect(() => normalizeSiteUrl('')).toThrow();
  });

  it('gera canonical, Open Graph e Twitter com URLs absolutas', () => {
    const tags = headTags(SITE);
    expect(tags).toContain(`<link rel="canonical" href="${SITE}" />`);
    expect(tags).toContain(`<meta property="og:url" content="${SITE}" />`);
    expect(tags).toContain(`<meta property="og:image" content="${SITE}og.png" />`);
    expect(tags).toContain('<meta name="twitter:card" content="summary_large_image" />');
    expect(tags).toMatch(/<meta name="description" content="[^"]+" \/>/);
  });

  it('JSON-LD descreve a pessoa a partir do perfil', () => {
    const ld = personJsonLd(SITE);
    expect(ld['@type']).toBe('Person');
    expect(ld.name).toBe('Higor Segobia');
    expect(ld.worksFor?.name).toBe('Santander Brasil');
    expect(ld.sameAs).toContain('https://github.com/HigorSegobia');
    const script = headTags(SITE).match(/<script type="application\/ld\+json">(.*)<\/script>/)![1];
    expect(script).not.toMatch(/</);
    expect(JSON.parse(script)).toEqual(ld);
  });

  it('robots aponta para o sitemap, e o sitemap para o site', () => {
    expect(robotsTxt(SITE)).toContain(`Sitemap: ${SITE}sitemap.xml`);
    expect(sitemapXml(SITE, '2026-11-16')).toContain(`<loc>${SITE}</loc>`);
  });
});
