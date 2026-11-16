import { careerYears, courses, education, formatYearMonth, highlights, jobs, LANGS, monthsBetween, profile, skills, type L } from './profile';

/** junta todo par { pt, en } que aparece nos dados */
function allTexts(): L[] {
  const out: L[] = [];
  const walk = (v: unknown) => {
    if (!v || typeof v !== 'object') return;
    const keys = Object.keys(v);
    if (keys.length === 2 && keys.includes('pt') && keys.includes('en') && typeof (v as L).pt === 'string') out.push(v as L);
    else Object.values(v).forEach(walk);
  };
  walk({ profile, highlights, jobs, skills, education, courses });
  return out;
}

describe('dados do perfil', () => {
  it('lista os empregos do mais recente para o mais antigo', () => {
    const starts = jobs.map((j) => j.start.year * 12 + j.start.month);
    expect([...starts].sort((a, b) => b - a)).toEqual(starts);
  });

  it('tem exatamente um emprego atual, e ele é o primeiro', () => {
    const current = jobs.filter((j) => j.end === null);
    expect(current).toHaveLength(1);
    expect(jobs[0].end).toBeNull();
  });

  it('nenhum emprego termina antes de começar', () => {
    for (const j of jobs) {
      if (j.end) expect(monthsBetween(j.start, j.end)).toBeGreaterThan(0);
    }
  });

  it('marca só uma área de competência como principal', () => {
    expect(skills.filter((s) => s.primary)).toHaveLength(1);
  });

  it('todo texto tem as duas traduções preenchidas', () => {
    const texts = allTexts();
    expect(texts.length).toBeGreaterThan(50);
    for (const t of texts) for (const lang of LANGS) expect(t[lang].trim(), JSON.stringify(t)).not.toBe('');
    for (const lang of LANGS) expect(Object.values(profile.statement[lang]).join('').length).toBeGreaterThan(40);
  });
});

describe('utilitários de data', () => {
  it('formata mês e ano em português e em inglês', () => {
    expect(formatYearMonth({ year: 2020, month: 6 })).toBe('jun 2020');
    expect(formatYearMonth({ year: 2025, month: 12 }, 'pt')).toBe('dez 2025');
    expect(formatYearMonth({ year: 2025, month: 12 }, 'en')).toBe('Dec 2025');
  });

  it('conta meses incluindo o mês de início', () => {
    expect(monthsBetween({ year: 2020, month: 6 }, { year: 2020, month: 10 })).toBe(5);
  });

  it('calcula os anos de carreira a partir do primeiro emprego', () => {
    expect(careerYears(jobs, { year: 2026, month: 11 })).toBe(6);
  });
});
