import { useLang } from '../i18n/LangContext';
import styles from './Footer.module.css';

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="band">
      <div className={`wrap g ${styles.footer}`}>
        <span className="c-l">© {new Date().getFullYear()} Higor Segobia</span>
        <span className="c-r">{t.footer}</span>
      </div>
    </footer>
  );
}
