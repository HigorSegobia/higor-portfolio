import { useEffect, useState } from 'react';
import { useGuides } from '../context/GuidesContext';
import styles from './GuidesToggle.module.css';

export function GuidesToggle() {
  const { on, toggle } = useGuides();
  const [hint, setHint] = useState(false);

  useEffect(() => {
    if (!on) {
      setHint(false);
      return;
    }
    setHint(true);
    const t = window.setTimeout(() => setHint(false), 3200);
    return () => window.clearTimeout(t);
  }, [on]);

  return (
    <>
      <div className={`${styles.hint} ${hint ? styles.show : ''}`} role="status">
        {hint ? 'Como o debug paint do Flutter: veja a grade de 12 colunas e o tamanho de cada bloco.' : ''}
      </div>
      <button type="button" className={styles.button} aria-pressed={on} onClick={toggle}>
        <span className={styles.switch} aria-hidden="true" />
        Guias de layout
      </button>
    </>
  );
}
