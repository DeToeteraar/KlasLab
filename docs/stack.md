# Tech Stack

Overzicht van alle tools in de standaard stack, met versie-informatie en motivatie.

## Framework

| Tool | Rol | Waarom gekozen |
|------|-----|----------------|
| **Next.js** | Hoofdraamwerk | Routing, pagina's, API routes, server-side logica — alles-in-een |
| **React** | UI-componenten | Ingebouwd in Next.js |
| **TypeScript** | Typecontrole | Vangt fouten op tijdens ontwikkeling, betere DX |

## Styling

| Tool | Rol | Waarom gekozen |
|------|-----|----------------|
| **Tailwind CSS** | Utility-first CSS | Snel stylen via klassenamen, geen losse CSS-bestanden |
| **Shadcn** | Componentbibliotheek | Kant-en-klare React-componenten op Tailwind, volledig aanpasbaar |

## Backend

| Tool | Rol | Waarom gekozen |
|------|-----|----------------|
| **API Routes (Next.js)** | Server-side logica | Geen apart backend nodig, alles binnen Next.js |

## Database (projectafhankelijk)

| Tool | Rol | Wanneer gebruiken |
|------|-----|-------------------|
| **Supabase** | Relationele DB + auth + API | Standaardkeuze voor de meeste projecten |
| **Neo4j** | Grafendatabase | Alleen bij complexe relaties (kennisgrafen, netwerken) |

## Hosting & Domein

| Tool | Rol | Waarom gekozen |
|------|-----|----------------|
| **Vercel** | Hosting + CI/CD | Automatisch deployen vanuit GitHub, optimaal voor Next.js |
| **Vimexx** | Domeinnamen | Bestaande domeinregistrar |

## Extra tools (projectafhankelijk)

| Tool | Rol | Wanneer gebruiken |
|------|-----|-------------------|
| **Zod** | Runtime datavalidatie | Altijd toevoegen — TypeScript dekt geen runtime validatie |
| **Resend** | E-mail versturen | Wanneer de app e-mails moet verzenden |
| **Stripe** | Betalingen | Bij commerciele projecten |
| **Prisma** | ORM | Optioneel, bovenop Supabase voor TypeScript-gebaseerde queries |
