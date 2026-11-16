import { useGuides } from '../context/GuidesContext';
import styles from './GridOverlay.module.css';

/** as 12 colunas da página, desenhadas por cima quando o modo guias está ligado */
export function GridOverlay() {
  const { on } = useGuides();
  return (
    <div className={`${styles.overlay} ${on ? styles.on : ''}`} aria-hidden="true">
      <div className="wrap" style={{ height: '100%' }}>
        <div className={`g ${styles.cols}`}>
          {Array.from({ length: 12 }, (_, i) => (
            <i key={i} style={{ transitionDelay: `${i * 30}ms` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
