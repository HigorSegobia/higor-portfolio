import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className="band">
      <div className={`wrap g ${styles.footer}`}>
        <span className="c-l">© {new Date().getFullYear()} Higor Segobia</span>
        <span className="c-r">Feito em React e TypeScript, numa grade de 12 colunas</span>
      </div>
    </footer>
  );
}
