import { formatYearMonth, jobs, profile, type Job } from '../data/profile';
import { useLit } from '../hooks/useLit';
import { useLang } from '../i18n/LangContext';
import { SECTION_IDS } from '../i18n/ui';
import { Box } from './Box';
import { Marquee } from './Marquee';
import { SectionTitle } from './SectionTitle';
import styles from './Experience.module.css';

function JobRow({ job }: { job: Job }) {
  const [ref, lit] = useLit<HTMLElement>();
  const current = job.end === null;
  const { t, l, lang } = useLang();

  return (
    <article ref={ref} className={`${styles.job} ${lit ? styles.lit : ''}`} data-testid="job">
      <span className={styles.line} aria-hidden="true" />
      <div className="g">
        <p className={`c-date ${styles.when}`}>
          <b>{formatYearMonth(job.start, lang)}</b> {current ? t.experience.untilNow : formatYearMonth(job.end!, lang)}
        </p>
        <Box className="c-mid">
          <h3>{job.company}</h3>
          <p className={styles.role}>{l(job.role)}</p>
          {current && <span className={styles.now}>{t.experience.current}</span>}
        </Box>
        <Box as="ul" className={`c-r ${styles.list}`}>
          {job.highlight && <li className={styles.key}>{l(job.highlight)}</li>}
          {job.activities.map((a) => (
            <li key={a.pt}>{l(a)}</li>
          ))}
        </Box>
      </div>
    </article>
  );
}

export function Experience() {
  const { t } = useLang();
  return (
    <section className={`band ${styles.section}`} aria-labelledby={SECTION_IDS.experience}>
      <Marquee words={profile.stack} />
      <div className="wrap">
        <SectionTitle id={SECTION_IDS.experience} title={t.experience.title} lead={t.experience.lead} tone="dark" />
        <div>
          {jobs.map((j) => (
            <JobRow key={j.id} job={j} />
          ))}
        </div>
      </div>
    </section>
  );
}
