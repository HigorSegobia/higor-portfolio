import { skills } from '../data/profile';
import { RuledRow } from './RuledRow';
import { SectionTitle } from './SectionTitle';
import styles from './Skills.module.css';

export function Skills() {
  return (
    <section className="section" aria-labelledby="competencias">
      <div className="wrap">
        <SectionTitle id="competencias" title="Competências" lead="O que uso para levar uma funcionalidade do design até produção, e onde usei." />
        <div className={styles.table} role="table" aria-label="Competências">
          <div className={`g ${styles.row} ${styles.head}`} role="row">
            <span className="c-date" role="columnheader">Área</span>
            <span className="c-mid" role="columnheader">Ferramentas</span>
            <span className="c-r" role="columnheader">Onde usei</span>
          </div>
          {skills.map((s, i) => (
            <RuledRow key={s.area} role="row" delay={i * 70} className={`g ${styles.row} ${s.primary ? styles.primary : ''}`}>
              <span className={`c-date ${styles.area}`} role="rowheader">{s.area}</span>
              <span className={`c-mid ${styles.tools}`} role="cell">{s.tools.join(', ')}</span>
              <span className={`c-r ${styles.where}`} role="cell">{s.where}</span>
            </RuledRow>
          ))}
        </div>
      </div>
    </section>
  );
}
