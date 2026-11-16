import { skills } from '../data/profile';
import { useLang } from '../i18n/LangContext';
import { SECTION_IDS } from '../i18n/ui';
import { RuledRow } from './RuledRow';
import { SectionTitle } from './SectionTitle';
import styles from './Skills.module.css';

export function Skills() {
  const { t, l } = useLang();
  return (
    <section className="section" aria-labelledby={SECTION_IDS.skills}>
      <div className="wrap">
        <SectionTitle id={SECTION_IDS.skills} title={t.skills.title} lead={t.skills.lead} />
        <div className={styles.table} role="table" aria-label={t.skills.title}>
          <div className={`g ${styles.row} ${styles.head}`} role="row">
            <span className="c-date" role="columnheader">{t.skills.area}</span>
            <span className="c-mid" role="columnheader">{t.skills.tools}</span>
            <span className="c-r" role="columnheader">{t.skills.where}</span>
          </div>
          {skills.map((s, i) => (
            <RuledRow key={s.area.pt} role="row" delay={i * 70} className={`g ${styles.row} ${s.primary ? styles.primary : ''}`}>
              <span className={`c-date ${styles.area}`} role="rowheader">{l(s.area)}</span>
              <span className={`c-mid ${styles.tools}`} role="cell">{s.tools.map(l).join(', ')}</span>
              <span className={`c-r ${styles.where}`} role="cell">{l(s.where)}</span>
            </RuledRow>
          ))}
        </div>
      </div>
    </section>
  );
}
