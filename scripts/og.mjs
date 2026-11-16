// Gera as imagens estáticas de public/ a partir dos HTML desta pasta, usando o Chrome ou o Edge em modo headless.
// Uso: npm run og   (ou CHROME_PATH=/caminho/do/navegador npm run og)
import { execFileSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { findBrowser, HEADLESS } from './browser.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const pub = resolve(here, '../public');

const browser = findBrowser();
if (!browser) {
  console.error('Chrome/Edge não encontrado. Defina CHROME_PATH.');
  process.exit(1);
}

const jobs = [
  { src: 'og.html', out: 'og.png', size: [1200, 630] },
  { src: 'icon.html', out: 'apple-touch-icon.png', size: [180, 180] },
];

for (const { src, out, size } of jobs) {
  execFileSync(browser, [
    ...HEADLESS,
    '--force-device-scale-factor=1',
    '--virtual-time-budget=8000', // espera a fonte carregar
    `--window-size=${size.join(',')}`,
    `--screenshot=${resolve(pub, out)}`,
    pathToFileURL(resolve(here, src)).href,
  ], { stdio: 'ignore' });
  console.log(`public/${out}`);
}
