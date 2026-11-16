# Portfólio · Higor Segobia

Portfólio pessoal de Higor Segobia, engenheiro de software sênior (Flutter, Angular, React, Node.js, AWS).
Feito em **React 18 + TypeScript + Vite**, com testes em **Vitest + Testing Library** e deploy automático no **GitHub Pages** via GitHub Actions.

## Rodando localmente

```bash
npm install
npm run dev        # servidor de desenvolvimento em http://localhost:5173
npm test           # roda os testes uma vez
npm run build      # checa tipos e gera a versão de produção em dist/
npm run preview    # serve o build localmente
npm run og         # regera public/og.png e o ícone (precisa de Chrome ou Edge)
```

Requer Node 18 ou mais novo (o CI usa Node 22).

## Como o projeto é organizado

```
src/
  data/profile.ts          todo o conteúdo do currículo, tipado
  context/GuidesContext    estado do modo "Guias de layout"
  hooks/                   useReveal, useLit, useElementSize, useScrollProgress, usePrefersReducedMotion
  components/              uma pasta plana, cada componente com seu CSS Module
    drawings/              os três desenhos SVG da seção Destaques
  styles/                  tokens de design e a grade de 12 colunas
  seo.ts                   canonical, Open Graph, Twitter, JSON-LD, robots.txt e sitemap.xml
scripts/                   HTML de origem da imagem de prévia e do ícone, e o script que os renderiza
public/                    og.png e apple-touch-icon.png, copiados como estão para o build
```

**Para atualizar o currículo, edite só `src/data/profile.ts`.** Os componentes desenham o que está nos dados, e os testes
conferem regras básicas (ordem dos empregos, um único emprego atual, datas coerentes).

## Decisões de design

- **Uma grade de 12 colunas** para a página inteira: títulos nas colunas 1 a 6, conteúdo nas 7 a 12, datas nas 1 e 2.
- **Uma família tipográfica** (Archivo), variando largura e peso em vez de trocar de fonte.
- **Concreto e grafite** com um único acento, o laranja de segurança.
- **Guias de layout:** um botão liga um modo inspirado no debug paint do Flutter. Cada bloco (`<Box>`) se contorna e mostra
  sua medida em pixels, atualizada ao vivo com `ResizeObserver`, e as 12 colunas aparecem por cima da página.
- **Movimento com propósito:** o nome se expande e recebe um brilho metálico; títulos repetem esse gesto ao entrar na tela;
  réguas se desenham; empresas "acendem" conforme a rolagem; a faixa de tecnologias acelera com a velocidade da rolagem.
- **Nada fica escondido esperando animação.** `useReveal` só prepara elementos que estão abaixo da dobra no carregamento.
- **Acessibilidade:** `prefers-reduced-motion` desliga as animações, foco visível em tudo, um único `h1`, links externos com `rel="noopener"`.

## Deploy no GitHub Pages

1. Crie um repositório no GitHub e envie este projeto para a branch `main`.
2. Em **Settings → Pages**, escolha **GitHub Actions** como fonte.
3. Cada push na `main` roda tipos, testes e build e publica o site. Pull requests rodam só as verificações.

## SEO e prévia de link

As tags do `<head>` (URL canônica, Open Graph, Twitter e dados estruturados `Person`) são geradas no build a partir de
`src/data/profile.ts`, junto com `robots.txt` e `sitemap.xml`. Elas precisam do endereço público do site, que fica em
`SITE_URL` no `.env`. No GitHub Actions esse valor é trocado automaticamente pelo endereço real do Pages, inclusive com
domínio próprio. Se o repositório não se chamar `higor-portfolio`, ajuste o `.env` para o build local ficar igual ao publicado.

O `vite.config.ts` usa `base: './'`, então o mesmo build funciona em `usuario.github.io/repositorio`, num domínio próprio ou em qualquer subpasta.
