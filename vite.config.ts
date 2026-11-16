/// <reference types="vitest" />
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { headTags, normalizeSiteUrl, robotsTxt, sitemapXml } from './src/seo';

/** injeta as tags de SEO no <head> e, no build, gera robots.txt e sitemap.xml com a URL pública do site */
function seo(siteUrl: string): Plugin {
  return {
    name: 'seo',
    transformIndexHtml: (html) => html.replace('<!-- seo -->', headTags(siteUrl)),
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robotsTxt(siteUrl) });
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapXml(siteUrl, new Date().toISOString().slice(0, 10)) });
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
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/test/setup.ts',
      css: { modules: { classNameStrategy: 'non-scoped' } },
    },
  };
});
