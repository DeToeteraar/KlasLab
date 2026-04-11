# Beslissingen

Log van belangrijke architectuur- en toolkeuzes met motivatie.

## Format

Elke beslissing volgt dit format:

```
### [Titel]
**Datum:** YYYY-MM-DD
**Beslissing:** Wat is er besloten
**Motivatie:** Waarom deze keuze
**Alternatieven overwogen:** Wat is er niet gekozen en waarom niet
```

---

### Vercel als hostingplatform
**Datum:** 2026-04-11
**Beslissing:** Vercel is de standaard hostingkeuze voor alle projecten
**Motivatie:** Optimale integratie met Next.js, automatisch deployen vanuit GitHub, geen configuratie nodig
**Alternatieven overwogen:** Netlify — wordt niet meer gebruikt

### Supabase als standaard database
**Datum:** 2026-04-11
**Beslissing:** Supabase is de standaardkeuze, Neo4j alleen bij grafrelaties
**Motivatie:** Relationele database met ingebouwde auth en API, geen apart backend nodig
**Alternatieven overwogen:** Firebase (vendor lock-in), PlanetScale (minder features)

### Zod altijd toevoegen
**Datum:** 2026-04-11
**Beslissing:** Zod wordt in elk project toegevoegd voor runtime validatie
**Motivatie:** TypeScript biedt alleen compile-time checks, niet runtime — API input moet altijd gevalideerd worden
**Alternatieven overwogen:** Yup (minder TypeScript-integratie), handmatige validatie (foutgevoelig)

### AGENTS.md als centrale ingang
**Datum:** 2026-04-11
**Beslissing:** Alle AI-agents lezen eerst AGENTS.md, AI-bestanden zijn dun
**Motivatie:** Voorkomt dubbele kennis, maakt het makkelijk om nieuwe AI-tools toe te voegen
**Alternatieven overwogen:** Kennis per AI-bestand (leidt tot inconsistentie en duplicatie)
