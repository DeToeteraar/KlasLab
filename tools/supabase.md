# Supabase

## Wat
Open-source Firebase-alternatief. Relationele database (PostgreSQL), authenticatie, realtime subscriptions en ingebouwde API.

## Wanneer gebruiken
Standaardkeuze voor elk project dat een database nodig heeft.

## Kernconcepten
- **PostgreSQL** — volwaardige relationele database
- **Auth** — ingebouwde authenticatie (email, OAuth, magic links)
- **Row Level Security (RLS)** — autorisatie op databaseniveau
- **Realtime** — live updates via subscriptions
- **Storage** — bestandsopslag (afbeeldingen, documenten)
- **Edge Functions** — server-side logica (Deno)

## Configuratie
- Maak een project aan op [supabase.com](https://supabase.com)
- Sla de URL en anon key op in `.env.local`:
  ```
  NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
  ```
- Client configuratie in `src/lib/supabase.ts`

## Installatie
```bash
npm install @supabase/supabase-js
npm install @supabase/ssr          # voor Next.js server-side
```

## Afspraken
- Altijd RLS inschakelen op productietabellen
- Migraties bijhouden in `supabase/migrations/`
- Supabase client altijd via `src/lib/supabase.ts`
- Database tabellen in snake_case

## Links
- [Supabase Docs](https://supabase.com/docs)
- [Next.js integratie](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
