// Imprime em PDF o currículo de cada idioma que o build deixou em dist/cv-<idioma>.html, e apaga o HTML.
// Roda no fim do `npm run build`. Sem Chrome/Edge, avisa e segue (no CI, falha).
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, rmSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { findBrowser, HEADLESS } from './browser.mjs';

const dist = resolve(dirname(fileURLToPath(import.meta.url)), '../dist');
const pages = readdirSync(dist).filter((f) => /^cv-\w+\.html$/.test(f));
const browser = findBrowser();

if (!browser) {
  const msg = 'Chrome/Edge não encontrado: os PDFs do currículo não foram gerados. Defina CHROME_PATH.';
  if (process.env.CI) {
    console.error(msg);
    process.exit(1);
  }
  console.warn(msg);
} else {
  for (const page of pages) {
    const lang = page.match(/^cv-(\w+)\.html$/)[1];
    const out = resolve(dist, `higor-segobia-cv-${lang}.pdf`);
    execFileSync(browser, [
      ...HEADLESS,
      '--no-pdf-header-footer',
      '--virtual-time-budget=8000', // espera a fonte carregar
      `--print-to-pdf=${out}`,
      pathToFileURL(resolve(dist, page)).href,
    ], { stdio: 'ignore' });
    if (!existsSync(out)) throw new Error(`PDF não gerado: ${out}`);
    console.log(`dist/higor-segobia-cv-${lang}.pdf  ${(statSync(out).size / 1024).toFixed(0)} kB`);
  }
}
for (const page of pages) rmSync(resolve(dist, page));
