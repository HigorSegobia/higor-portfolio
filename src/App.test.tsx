import { render, screen } from '@testing-library/react';
import { App } from './App';
import type { Lang } from './data/profile';
import { LangProvider } from './i18n/LangContext';

const renderApp = (lang: Lang = 'pt') =>
  render(
    <LangProvider lang={lang}>
      <App />
    </LangProvider>,
  );

describe('página', () => {
  it('tem um único h1 com o nome', () => {
    renderApp();
    const h1 = screen.getAllByRole('heading', { level: 1 });
    expect(h1).toHaveLength(1);
    expect(h1[0]).toHaveTextContent('Higor Segobia');
  });

  it('todo link do menu aponta para uma seção que existe', () => {
    const { container } = renderApp();
    const nav = screen.getByRole('navigation', { name: 'Seções' });
    for (const a of nav.querySelectorAll('a')) {
      const id = a.getAttribute('href')!.slice(1);
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    }
  });

  it('links externos abrem em nova aba com segurança', () => {
    renderApp();
    for (const a of screen.getAllByRole('link').filter((l) => l.getAttribute('href')?.startsWith('http'))) {
      expect(a).toHaveAttribute('target', '_blank');
      expect(a.getAttribute('rel')).toMatch(/noopener/);
    }
  });

  it('oferece o currículo em PDF do idioma da página', () => {
    renderApp();
    const pdf = screen.getAllByRole('link').filter((l) => l.getAttribute('href')?.endsWith('.pdf'));
    expect(pdf.length).toBeGreaterThan(0);
    for (const a of pdf) {
      expect(a).toHaveAttribute('href', './higor-segobia-cv-pt.pdf');
      expect(a).toHaveAttribute('download');
    }
  });
});

describe('versão em inglês', () => {
  it('troca os textos e mantém as âncoras das seções', () => {
    const { container } = renderApp('en');
    expect(screen.getByRole('heading', { name: 'Experience', level: 2 })).toBeInTheDocument();
    expect(screen.getByText('Current role')).toBeInTheDocument();
    expect(container.querySelector('#experiencia')).not.toBeNull();
    expect(screen.queryByText('Emprego atual')).toBeNull();
  });

  it('aponta o PDF e a troca de idioma para a raiz do site', () => {
    renderApp('en');
    expect(screen.getByRole('link', { name: /português/i })).toHaveAttribute('href', '../');
    for (const a of screen.getAllByRole('link').filter((l) => l.getAttribute('href')?.endsWith('.pdf'))) {
      expect(a).toHaveAttribute('href', '../higor-segobia-cv-en.pdf');
    }
  });

  it('a versão em português leva para /en/', () => {
    renderApp('pt');
    expect(screen.getByRole('link', { name: /english/i })).toHaveAttribute('href', './en/');
  });
});
