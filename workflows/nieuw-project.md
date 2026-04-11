# Workflow: nieuw project opstarten

## Voorbereiding (buiten Claude Code)

1. Maak een nieuwe GitHub-repo aan
2. Clone de repo lokaal via VS Code
3. Kopieer de project-base structuur naar de nieuwe map
4. Verwijder wat niet van toepassing is
5. Vul `docs/requirements-template.md` in met de projectbeschrijving
6. Pas `AGENTS.md` aan op dit project
7. Maak een Supabase-project aan als de app een database nodig heeft

## Eerste opdracht aan Claude Code

Open Claude Code in de projectmap en geef deze instructie:

> Lees AGENTS.md en de bijbehorende docs. Dit is een nieuw project op basis
> van de project-base template. Initialiseer het project op basis van de
> requirements in docs/requirements-template.md:
>
> 1. Initialiseer Next.js (TypeScript, Tailwind, App Router, src directory)
> 2. Installeer en configureer Shadcn
> 3. Zet de projectstructuur op zoals beschreven in de requirements
> 4. Configureer het design systeem in globals.css
> 5. Maak Supabase-migraties aan als er een database nodig is
> 6. Update AGENTS.md en docs/ waar nodig na de initialisatie
>
> Doe dit stap voor stap en vraag bevestiging voor je verder gaat.

## Tips

- Geef duidelijke, afgebakende opdrachten — een ding tegelijk
- Controleer en test tussendoor voor je verder gaat
- Verwijs naar secties in requirements-template.md voor context
- Typ `/compact` als het gesprek lang wordt om context vrij te maken
- Commit regelmatig naar GitHub zodat je altijd terug kunt
