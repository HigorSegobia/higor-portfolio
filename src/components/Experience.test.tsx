import { render, screen, within } from '@testing-library/react';
import { GuidesProvider } from '../context/GuidesContext';
import { jobs } from '../data/profile';
import { Experience } from './Experience';

describe('Experiência', () => {
  beforeEach(() => {
    render(
      <GuidesProvider>
        <Experience />
      </GuidesProvider>,
    );
  });

  it('mostra todas as empresas, na ordem dos dados', () => {
    const names = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
    expect(names).toEqual(jobs.map((j) => j.company));
  });

  it('marca só o emprego atual', () => {
    expect(screen.getAllByText('Emprego atual')).toHaveLength(1);
    const first = screen.getAllByTestId('job')[0];
    expect(within(first).getByText('Emprego atual')).toBeInTheDocument();
    expect(within(first).getByText(/até hoje/)).toBeInTheDocument();
  });

  it('lista o destaque antes das demais atividades', () => {
    const items = within(screen.getAllByTestId('job')[2]).getAllByRole('listitem');
    expect(items[0]).toHaveTextContent(/PIX/);
  });
});
