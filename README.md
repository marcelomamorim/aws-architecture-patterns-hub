# AWS Architecture Patterns Hub

Catálogo bilíngue de padrões arquiteturais com foco editorial, explicações visuais e exemplos práticos usando serviços da AWS.

## Stack

- Astro 6
- MDX
- GitHub Pages
- Conteúdo versionado em `src/content/patterns`

## Rodando localmente

```bash
npm install
npm run dev
```

Abra:

```text
http://localhost:4321/aws-architecture-patterns-hub/
```

## Build e preview

```bash
npm run build
npm run preview
```

## Estrutura principal

- `src/pages/[lang]`: home, catálogo e detalhe dos padrões
- `src/content/patterns`: conteúdo bilíngue em MDX
- `public/media`: SVGs, GIFs, vídeos e outros assets locais
- `.github/workflows/deploy.yml`: pipeline de deploy para GitHub Pages

## Conteúdo inicial da v1

- Fanout
- CQRS
- Saga
- Event Sourcing
- Queue-Based Load Leveling
- Circuit Breaker
- Cache-Aside
- Strangler Fig

## Deploy

O repositório está configurado para buildar e publicar automaticamente no GitHub Pages a cada push em `main`.
