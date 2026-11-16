import { useEffect, useState } from 'react';
import { useGuides } from '../context/GuidesContext';
import { useLang } from '../i18n/LangContext';
import styles from './GuidesToggle.module.css';

export function GuidesToggle() {
  const { on, toggle } = useGuides();
  const [hint, setHint] = useState(false);
  const { t } = useLang();

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
        {hint ? t.guides.hint : ''}
      </div>
      <button type="button" className={styles.button} aria-pressed={on} onClick={toggle}>
        <span className={styles.switch} aria-hidden="true" />
        <span className={styles.label}>{t.guides.label}</span>
      </button>
    </>
  );
}
