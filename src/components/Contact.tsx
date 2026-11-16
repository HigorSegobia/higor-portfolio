import { profile } from '../data/profile';
import { useReveal } from '../hooks/useReveal';
import { useLang } from '../i18n/LangContext';
import { cvFile, SECTION_IDS } from '../i18n/ui';
import { Box } from './Box';
import styles from './Contact.module.css';

export function Contact() {
  const [ref, state] = useReveal<HTMLHeadingElement>();
  const { t, lang, root } = useLang();
  const links = Object.values(profile.links);
  return (
    <section className={`band section ${styles.contact}`} aria-labelledby={SECTION_IDS.contact}>
      <div className="wrap g">
        <Box as="h2" id={SECTION_IDS.contact} ref={ref} className={`c-l ${styles.title}`} data-state={state}>
          {t.contact.title}
        </Box>
        <Box className={`c-r ${styles.links}`}>
          {links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label} <span>{l.handle}</span>
            </a>
          ))}
          <a href={root + cvFile(lang)} download>
            {t.contact.cv} <span>{t.contact.cvHandle}</span>
          </a>
        </Box>
      </div>
    </section>
  );
}
