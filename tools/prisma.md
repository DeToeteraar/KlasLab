# Prisma

## Wat
ORM (Object-Relational Mapping) voor TypeScript. Biedt type-safe database queries.

## Wanneer gebruiken
Optioneel — bovenop Supabase wanneer je liever met een ORM werkt dan directe Supabase queries. Niet standaard; alleen toevoegen als het project er baat bij heeft.

## Installatie
```bash
npm install prisma --save-dev
npm install @prisma/client
npx prisma init
```

## Configuratie
```
DATABASE_URL=postgresql://user:password@host:5432/dbname
```

## Kernconcepten
- **Schema** — definieer je datamodel in `prisma/schema.prisma`
- **Migrations** — `npx prisma migrate dev`
- **Client** — type-safe queries via `@prisma/client`
- **Prisma Studio** — visuele database editor: `npx prisma studio`

## Afspraken
- Prisma client configureren in `src/lib/prisma.ts`
- Kies of Prisma of directe Supabase queries — niet beide door elkaar
- Migraties bijhouden in `prisma/migrations/`

## Links
- [Prisma Docs](https://www.prisma.io/docs)
- [Prisma met Supabase](https://supabase.com/docs/guides/integrations/prisma)
