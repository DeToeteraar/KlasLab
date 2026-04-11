# AGENTS.md

## Projectbeschrijving

**KlasLab Vragenbank** is een gestructureerde, doorzoekbare database met onderwijsvragen voor het voortgezet onderwijs, te beginnen bij natuurkunde. De kern van het project is de kwaliteit en structuur van de data — niet de interface. Vragen worden door AI gegenereerd op basis van doordachte skills en zijn koppelbaar aan methodes, leerdoelen, onderwerpen en taxonomie.

Het centrale requirements- en ontwerpdocument staat in `docs/klaslab-vragenbank-requirements.md`.

---

## Navigatie per taak

| Taak | Lees eerst |
|------|-----------|
| Begrijpen welke tools we gebruiken | `docs/stack.md` |
| Begrijpen hoe tools samenwerken | `docs/architecture.md` |
| Code schrijven (naamgeving, structuur) | `docs/conventions.md` |
| Architectuurbeslissing nemen of bekijken | `docs/decisions.md` |
| Requirements en ontwerp bekijken | `docs/klaslab-vragenbank-requirements.md` |
| Specifieke tool opzoeken | `tools/[tool].md` |
| Skill uitvoeren (component, API, etc.) | `skills/[skill].md` |
| Feature bouwen | `workflows/nieuwe-feature.md` |
| Deployen | `workflows/deployen.md` |
| Database migratie | `workflows/database-migratie.md` |

---

## Update-instructies

Houd deze kennisbank actueel. Bij wijzigingen:

- **Nieuwe tool toegevoegd?** Update `docs/stack.md` en maak `tools/[tool].md` aan
- **Architectuurbeslissing genomen?** Log het in `docs/decisions.md`
- **Nieuwe werkwijze ontwikkeld?** Voeg het toe aan `skills/` of `workflows/`
- **Conventie gewijzigd?** Update `docs/conventions.md`
- **Nieuw AI-gereedschap toegevoegd?** Maak een dun AI-bestand aan dat naar dit bestand verwijst

---

## Belangrijke afspraken

- **Vercel boven Netlify** — Vercel is de hostingkeuze
- **Supabase is de standaard database** — Neo4j alleen bij grafrelaties
- **Een database per project** — niet beide tegelijk tenzij echt nodig
- **Zod altijd toevoegen** — TypeScript dekt geen runtime validatie
- **Resend voor e-mail** — integreert het best met de stack
- **AGENTS.md is altijd de ingang** — geen enkele agent slaat dit over
- **AI-bestanden zijn dun** — projectkennis staat nooit in een AI-bestand
- **Skills en workflows worden ingevuld naarmate je ze doorloopt**
- **Docs klein en gericht houden** — een onderwerp per bestand
