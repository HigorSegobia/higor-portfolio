/**
 * Currículo de uma página, em HTML estático feito para impressão em A4.
 * O build gera um por idioma a partir de profile.ts e o `scripts/cv.mjs` imprime cada um em PDF.
 */
import { courses, education, formatYearMonth, jobs, profile, skills, type Lang } from './data/profile';
import { ui } from './i18n/ui';
import { HREFLANG, pageUrl } from './seo';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const LABELS = {
  pt: { summary: 'Resumo', experience: 'Experiência', skills: 'Competências', education: 'Formação', courses: 'Cursos', site: 'Portfólio' },
  en: { summary: 'Summary', experience: 'Experience', skills: 'Skills', education: 'Education', courses: 'Courses', site: 'Portfolio' },
} satisfies Record<Lang, Record<string, string>>;

/**
 * `fontsDir`: pasta node_modules, relativa ao HTML. O corpo usa os arquivos estáticos da Archivo,
 * porque a fonte variável faz o Chrome perder os espaços na camada de texto do PDF, e é ela que os sistemas de recrutamento leem.
 * Só o nome, grande e curto, usa a variável (para a largura de 125%).
 */
export function cvHtml(lang: Lang, siteUrl: string, fontsDir: string): string {
  const t = ui[lang];
  const lb = LABELS[lang];
  const s = profile.statement[lang];
  const site = pageUrl(siteUrl, lang);
  const contacts = [
    ...Object.values(profile.links).map((l) => `<a href="${esc(l.href)}">${esc(l.href.replace(/^https:\/\/(www\.)?/, ''))}</a>`),
    `<a href="${esc(site)}">${esc(site.replace(/^https:\/\//, '').replace(/\/$/, ''))}</a>`,
    esc(profile.facts[profile.facts.length - 1].value[lang]),
  ];

  const jobsHtml = jobs
    .map((j) => {
      const when = `${formatYearMonth(j.start, lang)} – ${j.end ? formatYearMonth(j.end, lang) : t.experience.untilNow}`;
      const items = [...(j.highlight ? [`<li class="key">${esc(j.highlight[lang])}</li>`] : []), ...j.activities.map((a) => `<li>${esc(a[lang])}</li>`)];
      return `<article class="job">
        <p class="when">${esc(when)}</p>
        <div><h3>${esc(j.company)} <span>${esc(j.role[lang])}</span></h3><ul>${items.join('')}</ul></div>
      </article>`;
    })
    .join('');

  const skillsHtml = skills.map((k) => `<dt>${esc(k.area[lang])}</dt><dd>${esc(k.tools.map((x) => x[lang]).join(', '))}</dd>`).join('');

  const eduHtml = education
    .map(
      (e) =>
        `<li><b>${esc(e.title[lang])}</b><br />${esc(e.school)}, ${esc(t.education.period(e.start, e.end))}${e.ongoing ? ` (${esc(t.education.ongoing.toLowerCase())})` : ''}</li>`,
    )
    .join('');

  return `<!doctype html>
<html lang="${HREFLANG[lang]}">
<head>
<meta charset="UTF-8" />
<title>${esc(`${profile.name.first} ${profile.name.last} · ${profile.title[lang]}`)}</title>
<style>
  @font-face { font-family: 'Archivo Wide'; font-weight: 100 900; font-stretch: 62% 125%; src: url('${fontsDir}/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2') format('woff2'); }
${[400, 600, 700].map((w) => `  @font-face { font-family: 'Archivo'; font-weight: ${w}; src: url('${fontsDir}/@fontsource/archivo/files/archivo-latin-${w}-normal.woff2') format('woff2'); }`).join('\n')}
  @page { size: A4; margin: 13mm 14mm; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font: 9.2pt/1.42 'Archivo', 'Helvetica Neue', Arial, sans-serif; color: #1b1e21; }
  a { color: inherit; text-decoration: none; }
  header { display: grid; grid-template-columns: 1fr auto; align-items: end; padding-bottom: 9pt; border-bottom: 1.6pt solid #1b1e21; }
  h1 { font-family: 'Archivo Wide', 'Archivo', sans-serif; font-size: 30pt; line-height: 0.95; font-weight: 800; font-stretch: 125%; letter-spacing: -0.03em; }
  .role { margin-top: 4pt; font-size: 11.5pt; font-weight: 600; }
  .contacts { text-align: right; color: #4a5056; line-height: 1.55; }
  .mark { width: 22pt; height: 22pt; background: #1b1e21; position: relative; justify-self: end; margin-bottom: 6pt; }
  .mark::after { content: ''; position: absolute; right: 0; bottom: 0; width: 7pt; height: 7pt; background: #f2561d; }
  section { display: grid; grid-template-columns: 27mm 1fr; column-gap: 6mm; padding-top: 9pt; margin-top: 9pt; border-top: 0.5pt solid #a4a8a6; }
  header + section { border-top: 0; margin-top: 0; }
  h2 { font-size: 8pt; font-weight: 700; letter-spacing: 0.02em; text-transform: uppercase; color: #4a5056; padding-top: 1.5pt; }
  .summary { font-size: 10.5pt; line-height: 1.45; }
  .job { display: grid; grid-template-columns: 35mm 1fr; column-gap: 4mm; }
  .job + .job { margin-top: 7pt; }
  .when { white-space: nowrap; color: #4a5056; font-variant-numeric: tabular-nums; padding-top: 1pt; }
  h3 { font-size: 10.5pt; font-weight: 700; }
  h3 span { font-weight: 400; color: #4a5056; font-size: 9.2pt; }
  ul { list-style: none; margin-top: 2pt; }
  li { position: relative; padding-left: 9pt; }
  li::before { content: ''; position: absolute; left: 0; top: 0.62em; width: 4pt; height: 1pt; background: #1b1e21; }
  li.key::before { background: #f2561d; height: 1.6pt; }
  li.key { font-weight: 600; }
  /* o espaço da Archivo em negrito é estreito: sem isto o leitor de PDF (e o ATS) junta as palavras */
  b, li.key, h3, .role, h2, h4 { word-spacing: 0.12em; }
  dl { display: grid; grid-template-columns: 35mm 1fr; column-gap: 4mm; row-gap: 2.5pt; }
  dt { color: #4a5056; }
  .cols { display: grid; grid-template-columns: 1fr 1fr; column-gap: 6mm; }
  .cols ul li + li { margin-top: 3pt; }
  .cols li::before { display: none; }
  .cols li { padding-left: 0; }
  h4 { font-size: 8pt; font-weight: 700; letter-spacing: 0.02em; text-transform: uppercase; color: #4a5056; margin-bottom: 2pt; }
</style>
</head>
<body>
  <header>
    <div>
      <h1>${esc(profile.name.first)} ${esc(profile.name.last)}</h1>
      <p class="role">${esc(profile.title[lang])}</p>
    </div>
    <div>
      <div class="mark"></div>
      <p class="contacts">${contacts.join('<br />')}</p>
    </div>
  </header>
  <section>
    <h2>${lb.summary}</h2>
    <p class="summary">${esc(s.before)}<b>${esc(s.strong1)}</b>${esc(s.middle)}<b>${esc(s.strong2)}</b>${esc(s.after)}</p>
  </section>
  <section>
    <h2>${lb.experience}</h2>
    <div>${jobsHtml}</div>
  </section>
  <section>
    <h2>${lb.skills}</h2>
    <dl>${skillsHtml}</dl>
  </section>
  <section>
    <h2>${lb.education}</h2>
    <div class="cols">
      <ul>${eduHtml}</ul>
      <div><h4>${lb.courses}</h4><ul>${courses.map((c) => `<li>${esc(c[lang])}</li>`).join('')}</ul></div>
    </div>
  </section>
</body>
</html>
`;
}
