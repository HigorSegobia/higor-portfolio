import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('página', () => {
  it('tem um único h1 com o nome', () => {
    render(<App />);
    const h1 = screen.getAllByRole('heading', { level: 1 });
    expect(h1).toHaveLength(1);
    expect(h1[0]).toHaveTextContent('Higor Segobia');
  });

  it('todo link do menu aponta para uma seção que existe', () => {
    const { container } = render(<App />);
    const nav = screen.getByRole('navigation', { name: 'Seções' });
    for (const a of nav.querySelectorAll('a')) {
      const id = a.getAttribute('href')!.slice(1);
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    }
  });

  it('links externos abrem em nova aba com segurança', () => {
    render(<App />);
    for (const a of screen.getAllByRole('link').filter((l) => l.getAttribute('href')?.startsWith('http'))) {
      expect(a).toHaveAttribute('target', '_blank');
      expect(a.getAttribute('rel')).toMatch(/noopener/);
    }
  });
});
