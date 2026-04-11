# Next.js

## Wat
Hoofdraamwerk voor webapplicaties. Combineert React met routing, server-side rendering, API routes en optimalisaties.

## Wanneer gebruiken
Altijd — dit is het fundament van elk project.

## Kernconcepten
- **App Router** — bestandsgebaseerde routing via `src/app/`
- **Server Components** — standaard, renderen op de server
- **Client Components** — met `"use client"` directive voor interactiviteit
- **API Routes** — `src/app/api/*/route.ts` voor server-side logica
- **Layouts** — gedeelde UI via `layout.tsx`
- **Loading/Error states** — via `loading.tsx` en `error.tsx`

## Configuratie
- App Router (niet Pages Router)
- `src/` directory
- TypeScript
- Tailwind CSS
- Absolute imports via `@/`

## Veelgebruikte commando's
```bash
npx create-next-app@latest        # nieuw project
npm run dev                        # development server
npm run build                      # productie build
npm run start                      # productie server
```

## Links
- [Next.js Docs](https://nextjs.org/docs)
- [App Router](https://nextjs.org/docs/app)
