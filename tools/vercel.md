# Vercel

## Wat
Hostingplatform geoptimaliseerd voor Next.js. Automatisch deployen vanuit GitHub.

## Wanneer gebruiken
Altijd — standaard hostingkeuze.

## Kernconcepten
- **Git-integratie** — push naar GitHub = automatische deploy
- **Preview deployments** — elke branch/PR krijgt een eigen URL
- **Edge Network** — wereldwijd CDN
- **Environment variables** — configureerbaar per omgeving (dev/preview/prod)
- **Serverless Functions** — API routes draaien als serverless functions

## Configuratie
1. Koppel de GitHub-repo aan Vercel
2. Stel environment variables in via het Vercel dashboard
3. Deploy gebeurt automatisch bij elke push naar main

## Afspraken
- **Vercel, niet Netlify** — dit is een vaste keuze
- Environment variables instellen via Vercel dashboard, niet in code
- Gebruik preview deployments om wijzigingen te testen voor merge

## Links
- [Vercel Docs](https://vercel.com/docs)
- [Next.js op Vercel](https://vercel.com/docs/frameworks/nextjs)
