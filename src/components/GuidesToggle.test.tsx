import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GuidesProvider } from '../context/GuidesContext';
import { LangProvider } from '../i18n/LangContext';
import { Box } from './Box';
import { GuidesToggle } from './GuidesToggle';

function setup() {
  render(
    <LangProvider lang="pt">
      <GuidesProvider>
        <Box data-testid="bloco">conteúdo</Box>
        <GuidesToggle />
      </GuidesProvider>
    </LangProvider>,
  );
  return { button: screen.getByRole('button', { name: /guias de layout/i }), bloco: screen.getByTestId('bloco') };
}

describe('Guias de layout', () => {
  it('começa desligado', () => {
    const { button } = setup();
    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(document.body).not.toHaveClass('guides');
  });

  it('liga e desliga pelo botão', async () => {
    const user = userEvent.setup();
    const { button } = setup();
    await user.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(document.body).toHaveClass('guides');
    await user.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(document.body).not.toHaveClass('guides');
  });

  it('mostra a medida dos blocos quando ligado', async () => {
    const user = userEvent.setup();
    const { button, bloco } = setup();
    expect(bloco.textContent).toBe('conteúdo');
    await user.click(button);
    expect(bloco.textContent).toMatch(/conteúdo\d+ × \d+/);
  });

  it('explica o que o modo faz', async () => {
    const user = userEvent.setup();
    const { button } = setup();
    await user.click(button);
    expect(screen.getByRole('status')).toHaveTextContent(/debug paint do Flutter/i);
  });
});
