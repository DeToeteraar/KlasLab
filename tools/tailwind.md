# Tailwind CSS

## Wat
Utility-first CSS framework. Styling via klassenamen direct in JSX.

## Wanneer gebruiken
Altijd — standaard styling-oplossing.

## Kernconcepten
- **Utility classes** — `flex`, `p-4`, `text-lg`, `bg-blue-500`
- **Responsive** — `sm:`, `md:`, `lg:`, `xl:` prefixes
- **Dark mode** — `dark:` prefix
- **Hover/focus** — `hover:`, `focus:` prefixes
- **Custom waarden** — `w-[300px]` voor eenmalige waarden

## Afspraken
- Geen custom CSS tenzij het echt niet anders kan
- Gebruik Shadcn-componenten voor veelvoorkomende UI-patronen
- Configureer kleuren en fonts in `tailwind.config.ts`
- Gebruik `cn()` utility (uit Shadcn) voor conditionele klassen

## Links
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
