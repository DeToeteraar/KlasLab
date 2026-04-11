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

### PostgreSQL boven Neo4j voor KlasLab Vragenbank
**Datum:** 2026-04-12
**Beslissing:** PostgreSQL via Supabase is de databasekeuze voor de KlasLab Vragenbank, ook al heeft het datamodel veel relaties en koppelingen.
**Motivatie:**
Het datamodel is relatierijk maar structureel voorspelbaar — het is een hiërarchie (Vak → Methode → Editie → Hoofdstuk → Paragraaf) met many-to-many uitbreidingen daarop. Dat is geen echte graaf met willekeurige verbindingen in alle richtingen. PostgreSQL handelt dit goed af met de juiste indexen en een `vraag_volledig` view die complexe joins voor AI en applicatie vereenvoudigt.

Daarnaast biedt Supabase veel meer dan alleen een database: ingebouwde storage (voor assets), authenticatie, realtime en pgvector voor semantisch zoeken. Al deze onderdelen zijn nodig voor dit project en zouden bij Neo4j apart opgelost moeten worden.

pgvector is voor AI-gebruik sterker dan graph traversal: semantisch zoeken op vraag-inhoud ("geef vragen die lijken op deze vraag") is een realistischere AI-feature dan graph-pathfinding.

Neo4j zou pas meerwaarde hebben bij echte graph-queries: overlappingen tussen methodes detecteren, curriculum-gaten vinden, aanbevelingen op basis van leerpatronen. Dit zijn fase 4+ features die nog niet in scope zijn. Als die behoefte ontstaat, kan Neo4j naast Supabase worden toegevoegd.

**Alternatieven overwogen:** Neo4j — sterker bij willekeurige graph traversal en curriculum-analyse, maar vereist aparte oplossingen voor storage, auth en AI-search. Niet nodig voor de huidige scope en schaal.

---

### AGENTS.md als centrale ingang
**Datum:** 2026-04-11
**Beslissing:** Alle AI-agents lezen eerst AGENTS.md, AI-bestanden zijn dun
**Motivatie:** Voorkomt dubbele kennis, maakt het makkelijk om nieuwe AI-tools toe te voegen
**Alternatieven overwogen:** Kennis per AI-bestand (leidt tot inconsistentie en duplicatie)
