/// <reference types="vitest" />
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { cvHtml } from './src/cv';
import { LANGS, type Lang } from './src/data/profile';
import { headTags, normalizeSiteUrl, robotsTxt, sitemapXml } from './src/seo';

/** idioma de cada página HTML, pelo caminho dela */
const langOf = (path: string): Lang => (path.replace(/^\//, '').startsWith('en/') ? 'en' : 'pt');

/**
 * Injeta título e tags de SEO no <head> de cada idioma e pré-carrega a fonte.
 * No build, gera também robots.txt, sitemap.xml e o HTML do currículo de cada idioma (que scripts/cv.mjs transforma em PDF).
 */
function seo(siteUrl: string): Plugin {
  const fontOf = (bundle: object | undefined) => Object.keys(bundle ?? {}).find((f) => /archivo-latin-wdth-normal.*\.woff2$/.test(f));
  return {
    name: 'seo',
    transformIndexHtml(html, ctx) {
      const lang = langOf(ctx.path);
      const root = lang === 'en' ? '../' : './';
      // pré-carrega o arquivo latino da Archivo, o único que a página sempre usa
      const font = fontOf(ctx.bundle);
      const preload = font ? `\n    <link rel="preload" href="${root}${font}" as="font" type="font/woff2" crossorigin />` : '';
      return html.replace('<!-- seo -->', headTags(siteUrl, lang) + preload);
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robotsTxt(siteUrl) });
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapXml(siteUrl, new Date().toISOString().slice(0, 10)) });
      // o HTML do currículo fica em dist/ só até o scripts/cv.mjs imprimir; as fontes vêm direto do node_modules
      for (const lang of LANGS) {
        this.emitFile({ type: 'asset', fileName: `cv-${lang}.html`, source: cvHtml(lang, siteUrl, '../node_modules') });
      }
    },
  };
}

// base relativa: o mesmo build funciona no GitHub Pages, num domínio próprio ou em qualquer subpasta.
// SITE_URL (endereço público, usado nas tags absolutas) vem do .env ou do CI, que lê o endereço real do GitHub Pages.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: './',
    plugins: [react(), seo(normalizeSiteUrl(env.SITE_URL))],
    build: {
      rollupOptions: {
        input: { pt: 'index.html', en: 'en/index.html' },
      },
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/test/setup.ts',
      css: { modules: { classNameStrategy: 'non-scoped' } },
    },
  };
});
