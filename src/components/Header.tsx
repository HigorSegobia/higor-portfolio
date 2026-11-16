import { LANGS, profile } from '../data/profile';
import { useLang } from '../i18n/LangContext';
import { LANG_PATH, SECTION_IDS } from '../i18n/ui';
import styles from './Header.module.css';

const ORDER = ['highlights', 'experience', 'skills', 'education', 'contact'] as const;

export function Header() {
  const { t, lang, root } = useLang();
  const other = LANGS.find((x) => x !== lang)!;
  return (
    <header>
      <div className={`wrap g ${styles.bar}`}>
        {profile.available && (
          <span className={styles.available}>
            <i aria-hidden="true" />
            {t.available}
          </span>
        )}
        <nav className={styles.nav} aria-label={t.navLabel}>
          {ORDER.map((k) => (
            <a key={k} href={`#${SECTION_IDS[k]}`}>
              {t.nav[k]}
            </a>
          ))}
        </nav>
        <a className={styles.lang} href={root + LANG_PATH[other]} hrefLang={other === 'pt' ? 'pt-BR' : 'en'} lang={other === 'pt' ? 'pt-BR' : 'en'} title={t.switchTo.title}>
          <span aria-hidden="true">{t.switchTo.short}</span>
          <span className="sr-only">{t.switchTo.label}</span>
        </a>
      </div>
    </header>
  );
}
