import { formatYearMonth, jobs, profile, type Job } from '../data/profile';
import { useLit } from '../hooks/useLit';
import { Box } from './Box';
import { Marquee } from './Marquee';
import { SectionTitle } from './SectionTitle';
import styles from './Experience.module.css';

function JobRow({ job }: { job: Job }) {
  const [ref, lit] = useLit<HTMLElement>();
  const current = job.end === null;

  return (
    <article ref={ref} className={`${styles.job} ${lit ? styles.lit : ''}`} data-testid="job">
      <span className={styles.line} aria-hidden="true" />
      <div className="g">
        <p className={`c-date ${styles.when}`}>
          <b>{formatYearMonth(job.start)}</b> {current ? 'até hoje' : formatYearMonth(job.end!)}
        </p>
        <Box className="c-mid">
          <h3>{job.company}</h3>
          <p className={styles.role}>{job.role}</p>
          {current && <span className={styles.now}>Emprego atual</span>}
        </Box>
        <Box as="ul" className={`c-r ${styles.list}`}>
          {job.highlight && <li className={styles.key}>{job.highlight}</li>}
          {job.activities.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </Box>
      </div>
    </article>
  );
}

export function Experience() {
  return (
    <section className={`band ${styles.section}`} aria-labelledby="experiencia">
      <Marquee words={profile.stack} />
      <div className="wrap">
        <SectionTitle id="experiencia" title="Experiência" lead="Quatro empresas desde 2020. Em todas, Flutter no centro e a mão no produto." tone="dark" />
        <div>
          {jobs.map((j) => (
            <JobRow key={j.id} job={j} />
          ))}
        </div>
      </div>
    </section>
  );
}
