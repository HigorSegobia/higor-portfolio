import { courses, education } from '../data/profile';
import { Box } from './Box';
import { RuledRow } from './RuledRow';
import { SectionTitle } from './SectionTitle';
import styles from './Education.module.css';

export function Education() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="formacao">
      <div className="wrap">
        <SectionTitle id="formacao" title="Formação" lead="Sistemas de Informação na base. Agora, especialização em produto." />
        <div className={`g ${styles.edu}`}>
          {education.map((e, i) => (
            <Box key={e.title} className={`${i === 0 ? 'c-l' : 'c-r'} ${styles.item}`}>
              <span className={`${styles.state} ${e.status === 'em andamento' ? styles.wip : ''}`}>
                {e.status === 'em andamento' ? 'Em andamento' : 'Concluído'}
              </span>
              <h3>{e.title}</h3>
              <p className={styles.meta}>
                {e.school}, {e.period}
              </p>
            </Box>
          ))}
        </div>
        <div className={`g ${styles.courses}`}>
          <h3 className="c-l">Cursos</h3>
          <ul className="c-r">
            {courses.map((c, i) => (
              <RuledRow as="li" key={c} delay={i * 70}>
                {c}
              </RuledRow>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
