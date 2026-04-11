# TypeScript

## Wat
Superset van JavaScript met statische typecontrole. Vangt fouten op tijdens ontwikkeling.

## Wanneer gebruiken
Altijd — elk bestand is `.ts` of `.tsx`.

## Kernconcepten
- **Strict mode** — altijd aan (`strict: true` in tsconfig)
- **Type inference** — laat TypeScript types afleiden waar mogelijk
- **Interfaces vs Types** — gebruik `type` voor unions en intersections, `interface` voor objectvormen
- **Generics** — voor herbruikbare, type-safe functies en componenten
- **`unknown` boven `any`** — gebruik nooit `any`

## Afspraken
- Geen `any` — gebruik `unknown` als het type niet bekend is
- Exporteer types vanuit `src/types/` voor gedeelde types
- Zod-schema's gebruiken voor runtime validatie (TypeScript is alleen compile-time)
- Gebruik `satisfies` operator waar nuttig voor type-checking zonder type-vernauwing te verliezen

## Links
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
