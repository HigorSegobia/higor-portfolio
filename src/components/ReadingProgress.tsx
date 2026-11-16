import { useScrollProgress } from '../hooks/useScrollProgress';
import styles from './ReadingProgress.module.css';

export function ReadingProgress() {
  const progress = useScrollProgress();
  return <div className={styles.bar} style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />;
}
