# Conventies

Afspraken over naamgeving, mapstructuur en code.

## Naamgeving

| Onderdeel | Conventie | Voorbeeld |
|-----------|-----------|-----------|
| Bestanden (componenten) | PascalCase | `UserCard.tsx` |
| Bestanden (utilities) | camelCase | `formatDate.ts` |
| Bestanden (pagina's) | kebab-case (Next.js conventie) | `app/user-profile/page.tsx` |
| React-componenten | PascalCase | `export function UserCard()` |
| Functies | camelCase | `function getUserById()` |
| Variabelen | camelCase | `const userName = ...` |
| Constanten | UPPER_SNAKE_CASE | `const MAX_RETRIES = 3` |
| TypeScript types/interfaces | PascalCase | `type UserProfile = ...` |
| Database tabellen | snake_case | `user_profiles` |
| API routes | kebab-case | `app/api/user-profile/route.ts` |
| CSS klassen | Tailwind utilities | `className="flex items-center"` |

## Mapstructuur

- `src/app/` — pagina's en API routes (Next.js App Router)
- `src/components/` — herbruikbare componenten
- `src/components/ui/` — Shadcn-componenten (niet handmatig wijzigen)
- `src/lib/` — gedeelde utilities, configuratie, helpers
- `src/types/` — gedeelde TypeScript types

## Code-afspraken

- **TypeScript strict mode** — altijd aan
- **Functionele componenten** — geen class components
- **Server Components als default** — alleen `"use client"` als het moet
- **Zod voor validatie** — alle API input valideren met Zod-schema's
- **Geen `any`** — gebruik `unknown` als het type niet bekend is
- **Imports** — absolute imports via `@/` prefix (bijv. `@/components/UserCard`)
- **Geen barrel exports** — geen `index.ts` bestanden die alles re-exporten
- **Foutafhandeling** — API routes retourneren altijd een gestructureerd JSON-antwoord
- **Environment variables** — staan in `.env.local`, nooit in code

## Git

- **Commits** — korte, duidelijke berichten in het Engels
- **Branches** — `feature/beschrijving`, `fix/beschrijving`
- **Main branch** — altijd deploybaar
