import { useReveal } from '../hooks/useReveal';
import { Box } from './Box';
import styles from './SectionTitle.module.css';

interface Props {
  id: string;
  title: string;
  lead: string;
  tone?: 'light' | 'dark';
}

/** título de seção: repete o gesto do nome, de estreito para largo, ao entrar na tela */
export function SectionTitle({ id, title, lead, tone = 'light' }: Props) {
  const [ref, state] = useReveal<HTMLHeadingElement>();
  return (
    <div className={`g ${styles.title} ${tone === 'dark' ? styles.dark : ''}`}>
      <Box as="h2" id={id} ref={ref} className={`c-l ${styles.h2}`} data-state={state}>
        {title}
      </Box>
      <Box as="p" className={`c-r ${styles.lead}`}>
        {lead}
      </Box>
    </div>
  );
}
