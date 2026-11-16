# Portfólio · Higor Segobia

Portfólio pessoal de Higor Segobia, engenheiro de software sênior (Flutter, Angular, React, Node.js, AWS).
Feito em **React 18 + TypeScript + Vite**, com testes em **Vitest + Testing Library** e deploy automático no **GitHub Pages** via GitHub Actions.

## Rodando localmente

```bash
npm install
npm run dev        # servidor de desenvolvimento em http://localhost:5173
npm test           # roda os testes uma vez
npm run build      # checa tipos, gera a versão de produção em dist/ e imprime os currículos em PDF
npm run preview    # serve o build localmente
npm run og         # regera public/og.png e o ícone
```

Requer Node 18 ou mais novo (o CI usa Node 22). Os PDFs e as imagens são renderizados com Chrome ou Edge em modo headless;
sem nenhum dos dois, o build local avisa e segue sem PDF (no CI ele falha). Para indicar outro navegador, use `CHROME_PATH`.

## Como o projeto é organizado

```
index.html, en/index.html  uma página por idioma; o <html lang> de cada uma define o idioma do app
src/
  data/profile.ts          todo o conteúdo do currículo, tipado, com cada texto em { pt, en }
  i18n/                    textos fixos da interface (ui.ts) e o contexto de idioma
  context/GuidesContext    estado do modo "Guias de layout"
  hooks/                   useReveal, useLit, useElementSize, useScrollProgress, usePrefersReducedMotion
  components/              uma pasta plana, cada componente com seu CSS Module
    drawings/              os três desenhos SVG da seção Destaques
  styles/                  tokens de design e a grade de 12 colunas
  seo.ts                   título, canonical, hreflang, Open Graph, Twitter, JSON-LD, robots.txt e sitemap.xml
  cv.ts                    o currículo de uma página, em HTML para impressão
scripts/                   og.mjs (imagem de prévia e ícone) e cv.mjs (currículos em PDF), com o Chrome headless
public/                    og.png e apple-touch-icon.png, copiados como estão para o build
```

**Para atualizar o currículo, edite só `src/data/profile.ts`.** O site nos dois idiomas, os PDFs e as tags de SEO saem
desses dados. Os testes conferem regras básicas (ordem dos empregos, um único emprego atual, datas coerentes) e acusam
qualquer texto sem tradução. Textos da interface, como títulos de seção e botões, ficam em `src/i18n/ui.ts`, e o TypeScript
acusa qualquer chave que falte em inglês.

## Idiomas e currículo em PDF

- O site tem duas versões: português em `/` e inglês em `/en/`. Elas se ligam por `hreflang`, e um selo no cabeçalho troca de uma para a outra.
- Os ids das seções (`#experiencia`, `#contato`...) são os mesmos nas duas versões.
- O build imprime `higor-segobia-cv-pt.pdf` e `higor-segobia-cv-en.pdf` na raiz do site. Eles não existem no `npm run dev`:
  para testar o link, use `npm run build` e `npm run preview`.
- No PDF, o corpo usa os arquivos estáticos da Archivo (`@fontsource/archivo`). Com a fonte variável, o Chrome perde os
  espaços na camada de texto do PDF, que é o que os sistemas de recrutamento (ATS) leem.

## Decisões de design

- **Uma grade de 12 colunas** para a página inteira: títulos nas colunas 1 a 6, conteúdo nas 7 a 12, datas nas 1 e 2.
- **Uma família tipográfica** (Archivo), variando largura e peso em vez de trocar de fonte. Ela vem com o próprio site
  (`@fontsource-variable/archivo`), sem Google Fonts, e o arquivo latino é pré-carregado.
- **Concreto e grafite** com um único acento, o laranja de segurança. Como texto, o laranja usa `--signal-ink` sobre o
  concreto e `--signal-on-dark` sobre o grafite, os dois com contraste acima de 4.5:1.
- **Guias de layout:** um botão liga um modo inspirado no debug paint do Flutter. Cada bloco (`<Box>`) se contorna e mostra
  sua medida em pixels, atualizada ao vivo com `ResizeObserver`, e as 12 colunas aparecem por cima da página.
- **Movimento com propósito:** o nome se expande e recebe um brilho metálico; títulos repetem esse gesto ao entrar na tela;
  réguas se desenham; empresas "acendem" conforme a rolagem; a faixa de tecnologias acelera com a velocidade da rolagem.
- **Nada fica escondido esperando animação.** `useReveal` só prepara elementos que estão abaixo da dobra no carregamento.
- **Acessibilidade:** `prefers-reduced-motion` desliga as animações, foco visível em tudo, um único `h1`, links externos
  com `rel="noopener"`. No celular, o botão das guias vira um quadrado de 44px para não cobrir o texto.
- **Lighthouse** (celular, nas duas versões): desempenho 99, acessibilidade 100, boas práticas 100, SEO 100.

## Deploy no GitHub Pages

1. Crie um repositório no GitHub e envie este projeto para a branch `main`.
2. Em **Settings → Pages**, escolha **GitHub Actions** como fonte.
3. Cada push na `main` roda tipos, testes e build e publica o site. Pull requests rodam só as verificações.

## SEO e prévia de link

As tags do `<head>` (título, URL canônica, `hreflang`, Open Graph, Twitter e dados estruturados `Person`), uma versão por idioma, são geradas no build a partir de
`src/data/profile.ts`, junto com `robots.txt` e `sitemap.xml`. Elas precisam do endereço público do site, que fica em
`SITE_URL` no `.env`. No GitHub Actions esse valor é trocado automaticamente pelo endereço real do Pages, inclusive com
domínio próprio. Se o repositório não se chamar `higor-portfolio`, ajuste o `.env` para o build local ficar igual ao publicado.

O `vite.config.ts` usa `base: './'`, então o mesmo build funciona em `usuario.github.io/repositorio`, num domínio próprio ou em qualquer subpasta.
