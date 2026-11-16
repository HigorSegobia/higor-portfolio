import { profile } from '../data/profile';
import styles from './Header.module.css';

const NAV = [
  { href: '#destaques', label: 'Destaques' },
  { href: '#experiencia', label: 'Experiência' },
  { href: '#competencias', label: 'Competências' },
  { href: '#formacao', label: 'Formação' },
  { href: '#contato', label: 'Contato' },
];

export function Header() {
  return (
    <header>
      <div className={`wrap g ${styles.bar}`}>
        {profile.available && (
          <span className={styles.available}>
            <i aria-hidden="true" />
            Aberto a novas oportunidades
          </span>
        )}
        <nav className={styles.nav} aria-label="Seções">
          {NAV.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
