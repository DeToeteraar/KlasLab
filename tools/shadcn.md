# Shadcn

## Wat
Verzameling herbruikbare React-componenten gebouwd op Radix UI en Tailwind CSS. Componenten worden gekopieerd naar je project, niet geinstalleerd als dependency.

## Wanneer gebruiken
Altijd — standaard componentbibliotheek.

## Kernconcepten
- **Copy-paste model** — componenten worden naar `src/components/ui/` gekopieerd
- **Radix UI** — toegankelijke, ongestylde primitieven als basis
- **Aanpasbaar** — je kunt de code wijzigen, maar doe dit spaarzaam
- **`cn()` utility** — combineert Tailwind classes conditioneel

## Installatie
```bash
npx shadcn@latest init              # initialiseer in project
npx shadcn@latest add button        # voeg een component toe
npx shadcn@latest add dialog card   # meerdere tegelijk
```

## Afspraken
- Shadcn-componenten leven in `src/components/ui/`
- Pas ze niet handmatig aan tenzij noodzakelijk
- Bouw project-specifieke componenten in `src/components/` die Shadcn-componenten wrappen

## Links
- [Shadcn Docs](https://ui.shadcn.com)
- [Beschikbare componenten](https://ui.shadcn.com/docs/components)
