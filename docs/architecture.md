# Architectuur

Hoe de tools in de stack samenwerken.

## Overzicht

```
Browser
  │
  ▼
Vercel (hosting)
  │
  ▼
Next.js (App Router)
  ├── Pagina's (React + Tailwind + Shadcn)
  ├── API Routes (server-side logica)
  │     ├── Zod (validatie van input)
  │     ├── Supabase Client (database queries)
  │     ├── Resend (e-mail versturen)
  │     └── Stripe (betalingen)
  └── Server Components (data ophalen)
        └── Supabase Client
```

## Dataflow

1. **Gebruiker** bezoekt de app via een Vercel-gehoste URL
2. **Next.js** rendert de pagina (server-side of client-side)
3. **React-componenten** (gestyled met Tailwind/Shadcn) tonen de UI
4. **API Routes** verwerken formulieren, acties en externe koppelingen
5. **Zod** valideert alle binnenkomende data in API routes
6. **Supabase** slaat data op en regelt authenticatie
7. **Resend** verstuurt transactionele e-mails
8. **Stripe** verwerkt betalingen (indien van toepassing)

## Projectstructuur

```
src/
├── app/                 ← Next.js App Router (pagina's + layouts)
│   ├── api/             ← API routes
│   ├── (auth)/          ← authenticatie-pagina's (optioneel)
│   └── page.tsx         ← homepage
├── components/          ← herbruikbare React-componenten
│   └── ui/              ← Shadcn-componenten
├── lib/                 ← gedeelde utilities en configuratie
│   ├── supabase.ts      ← Supabase client
│   ├── stripe.ts        ← Stripe configuratie (optioneel)
│   └── resend.ts        ← Resend configuratie (optioneel)
└── types/               ← gedeelde TypeScript types
```

## Relatie tussen tools

- **Next.js** is het centrale raamwerk — alles draait hierbinnen
- **Supabase** wordt altijd via `lib/supabase.ts` benaderd, nooit direct
- **Zod-schema's** worden gedefinieerd naast de API route die ze gebruikt
- **Shadcn-componenten** leven in `components/ui/` en worden niet handmatig aangepast
- **Tailwind** wordt alleen via klassenamen gebruikt, geen custom CSS tenzij noodzakelijk
