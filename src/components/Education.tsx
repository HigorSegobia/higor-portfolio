import { courses, education } from '../data/profile';
import { useLang } from '../i18n/LangContext';
import { SECTION_IDS } from '../i18n/ui';
import { Box } from './Box';
import { RuledRow } from './RuledRow';
import { SectionTitle } from './SectionTitle';
import styles from './Education.module.css';

export function Education() {
  const { t, l } = useLang();
  return (
    <section className={`section ${styles.section}`} aria-labelledby={SECTION_IDS.education}>
      <div className="wrap">
        <SectionTitle id={SECTION_IDS.education} title={t.education.title} lead={t.education.lead} />
        <div className={`g ${styles.edu}`}>
          {education.map((e, i) => (
            <Box key={e.school} className={`${i === 0 ? 'c-l' : 'c-r'} ${styles.item}`}>
              <span className={`${styles.state} ${e.ongoing ? styles.wip : ''}`}>{e.ongoing ? t.education.ongoing : t.education.done}</span>
              <h3>{l(e.title)}</h3>
              <p className={styles.meta}>
                {e.school}, {t.education.period(e.start, e.end)}
              </p>
            </Box>
          ))}
        </div>
        <div className={`g ${styles.courses}`}>
          <h3 className="c-l">{t.education.courses}</h3>
          <ul className="c-r">
            {courses.map((c, i) => (
              <RuledRow as="li" key={c.pt} delay={i * 70}>
                {l(c)}
              </RuledRow>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
