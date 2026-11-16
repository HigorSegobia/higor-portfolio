import { cvHtml } from './cv';
import { headTags, normalizeSiteUrl, pageUrl, personJsonLd, robotsTxt, sitemapXml } from './seo';

const SITE = 'https://exemplo.dev/portfolio/';

describe('seo', () => {
  it('normaliza a URL do site com barra final', () => {
    expect(normalizeSiteUrl('https://exemplo.dev/portfolio')).toBe(SITE);
    expect(normalizeSiteUrl(' https://exemplo.dev?x=1#a ')).toBe('https://exemplo.dev/');
    expect(() => normalizeSiteUrl('')).toThrow();
  });

  it('cada idioma tem sua URL', () => {
    expect(pageUrl(SITE, 'pt')).toBe(SITE);
    expect(pageUrl(SITE, 'en')).toBe(`${SITE}en/`);
  });

  it('gera título, canonical, Open Graph e Twitter com URLs absolutas', () => {
    const tags = headTags(SITE, 'pt');
    expect(tags).toContain('<title>Higor Segobia · Engenheiro de software sênior</title>');
    expect(tags).toContain(`<link rel="canonical" href="${SITE}" />`);
    expect(tags).toContain(`<meta property="og:url" content="${SITE}" />`);
    expect(tags).toContain(`<meta property="og:image" content="${SITE}og.png" />`);
    expect(tags).toContain('<meta property="og:locale" content="pt_BR" />');
    expect(tags).toContain('<meta name="twitter:card" content="summary_large_image" />');
  });

  it('liga as duas versões com hreflang', () => {
    for (const lang of ['pt', 'en'] as const) {
      const tags = headTags(SITE, lang);
      expect(tags).toContain(`<link rel="alternate" hreflang="pt-BR" href="${SITE}" />`);
      expect(tags).toContain(`<link rel="alternate" hreflang="en" href="${SITE}en/" />`);
      expect(tags).toContain(`<link rel="alternate" hreflang="x-default" href="${SITE}" />`);
    }
    const en = headTags(SITE, 'en');
    expect(en).toContain(`<link rel="canonical" href="${SITE}en/" />`);
    expect(en).toContain('<meta property="og:locale" content="en_US" />');
    expect(en).toContain('Senior software engineer');
  });

  it('JSON-LD descreve a pessoa a partir do perfil', () => {
    const ld = personJsonLd(SITE, 'en');
    expect(ld['@type']).toBe('Person');
    expect(ld.name).toBe('Higor Segobia');
    expect(ld.url).toBe(`${SITE}en/`);
    expect(ld.worksFor?.name).toBe('Santander Brasil');
    expect(ld.sameAs).toContain('https://github.com/HigorSegobia');
    const script = headTags(SITE, 'en').match(/<script type="application\/ld\+json">(.*)<\/script>/)![1];
    expect(script).not.toMatch(/</);
    expect(JSON.parse(script)).toEqual(ld);
  });

  it('robots aponta para o sitemap, e o sitemap lista os dois idiomas', () => {
    expect(robotsTxt(SITE)).toContain(`Sitemap: ${SITE}sitemap.xml`);
    const xml = sitemapXml(SITE, '2026-11-16');
    expect(xml).toContain(`<loc>${SITE}</loc>`);
    expect(xml).toContain(`<loc>${SITE}en/</loc>`);
    expect(xml.match(/<xhtml:link/g)).toHaveLength(4);
  });
});

describe('currículo', () => {
  it('tem todas as empresas, no idioma pedido', () => {
    const pt = cvHtml('pt', SITE, '../node_modules');
    const en = cvHtml('en', SITE, '../node_modules');
    for (const c of ['Santander Brasil', 'Toro Investimentos', 'paySmart', 'Accesys Solutions']) {
      expect(pt).toContain(c);
      expect(en).toContain(c);
    }
    expect(pt).toContain('<html lang="pt-BR">');
    expect(pt).toContain('Experiência');
    expect(en).toContain('<html lang="en">');
    expect(en).toContain('to present');
    expect(en).toContain(`${SITE}en/`);
  });
});
