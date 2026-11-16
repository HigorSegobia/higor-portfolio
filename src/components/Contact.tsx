import { profile } from '../data/profile';
import { useReveal } from '../hooks/useReveal';
import { Box } from './Box';
import styles from './Contact.module.css';

export function Contact() {
  const [ref, state] = useReveal<HTMLHeadingElement>();
  const links = Object.values(profile.links);
  return (
    <section className={`band section ${styles.contact}`} aria-labelledby="contato">
      <div className="wrap g">
        <Box as="h2" id="contato" ref={ref} className={`c-l ${styles.title}`} data-state={state}>
          Vamos conversar.
        </Box>
        <Box className={`c-r ${styles.links}`}>
          {links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label} <span>{l.handle}</span>
            </a>
          ))}
        </Box>
      </div>
    </section>
  );
}
