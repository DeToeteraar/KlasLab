# KlasLab Vragenbank — Requirements

## 1. Projectoverzicht

**Naam:** KlasLab Vragenbank
**Type:** Webapplicatie
**Doel:** Een complete, kwalitatieve vragenbank voor het gehele voortgezet onderwijs — alle vakken, alle niveaus, alle leerjaren, alle hoofdstukken en paragrafen — gevuld en continu verbeterd via AI.
**Scope fase 1:** Database bouwen en vullen met vragen voor natuurkunde. Koppeling aan curriculum (methodes, leerdoelen, taxonomie).
**Toekomstvisie:** Uitgroeien tot het toonaangevende Nederlandse onderwijsplatform voor toetsvragen. De database wordt aangeboden aan scholen, docenten en mogelijk gelicenseerd aan partijen zoals uitgevers of toetsplatformen. Dit is een ondernemersproject met grootse ambities.

---

## 2. Projectfilosofie

De kern is een goed gestructureerde, kwalitatieve vragenbank. In fase 1 staat niet de interface of de gebruiker centraal, maar de kwaliteit en structuur van de data zelf.

Vragen worden door AI gegenereerd op basis van doordachte, zorgvuldig ontwikkelde skills — niet gekopieerd uit methodes. Eén vraag kan gekoppeld zijn aan meerdere methodes, paragrafen en leerdoelen.

De database wordt continu verbeterd via een feedbackloop: docenten en leerlingen geven feedback op vragen die ze gebruiken, AI analyseert die feedback en doet verbetervoorstellen, en beheerders of redacteuren voeren die verbeteringen door. Kwaliteit is geen eindpunt maar een doorlopend proces.

---

## 3. Gebruikers & Rollen

| Rol | Rechten |
|-----|---------|
| Beheerder | Volledige toegang — vragen aanmaken, bewerken, verwijderen, AI-voorstellen beoordelen |
| Overige gebruikers | Nog te bepalen |

**Authenticatie:** Nog te bepalen — volgt zodra gebruikersrollen duidelijk zijn.

---

## 4. Functionaliteiten

### Fase 1 (must-have)
- Vragen opslaan met alle eigenschappen (zie datamodel)
- Koppeling aan methode, hoofdstuk, paragraaf
- Koppeling aan leerdoelen (SLO en methode-eigen)
- Koppeling aan onderwerpen (hiërarchisch)
- Koppeling aan taxonomie (Bloom, RTTI)
- Subvragen ondersteunen (a, b, c...)
- Assets koppelen aan vragen en subvragen (afbeelding, grafiek, tabel, formule, video, audio)
- Correctievoorschrift en uitwerking per vraag
- Versiegeschiedenis per vraag

### Fase 2 (nog te bepalen)
- Interface voor eindgebruikers
- Zoeken en filteren in de vragenbank
- Exporteren van vragen (Word, PDF)
- Toetsen samenstellen vanuit de bank

### Fase 3 (toekomst)
- Feedbacksysteem voor docenten en leerlingen op individuele vragen
- AI-analyse van feedback met verbetervoorstellen
- Community-functies: gedeelde vragenbanken, samenwerking tussen scholen
- Licentiemodel voor externe partijen (uitgevers, toetsplatformen)

---

## 5. Tech Stack

| Component | Technologie |
|-----------|-------------|
| Framework | Next.js + React + TypeScript |
| Styling | Tailwind CSS + Shadcn |
| Database | Supabase (PostgreSQL) |
| Auth | Nog te bepalen |
| AI | Claude API |
| Hosting | Vercel |
| Domein | klaslab.nl / klaslab.com (via Vimexx) |

---

## 6. Projectstructuur
src/
├── app/
│   ├── api/             ← API routes
│   └── page.tsx         ← homepage
├── components/
│   └── ui/              ← Shadcn-componenten
├── lib/
│   └── supabase.ts      ← Supabase client
└── types/               ← gedeelde TypeScript types
---

## 7. Design

Geen afwijkingen van de standaard conventies in `docs/conventions.md`.

---

## 8. Fasering

| Fase | Wat | Status |
|------|-----|--------|
| 1 | Requirements & ontwerp | Afgerond |
| 2 | Database opzetten in Supabase + migraties schrijven en uitvoeren | Afgerond |
| 3 | Mapping NOVA invoeren (hoofdstukken, paragrafen, leerdoelen) | — |
| 4 | AI-skills bouwen voor het genereren van kwalitatieve vragen met volledige metadata | — |
| 5 | Database vullen met AI-gegenereerde vragen voor natuurkunde (alle niveaus, leerjaren, paragrafen) | — |
| 6 | Kwaliteitsreview en verfijning van gegenereerde vragen | — |
| 7 | Interface voor beheerders: vragen inzien, bewerken, AI-voorstellen beoordelen | — |
| 8 | Uitbreiding naar andere vakken en methodes | — |
| 9 | Gebruikersinterface, feedbacksysteem en community | Nog te bepalen |
| 10 | Licentiemodel en externe partnerships | Nog te bepalen |

---

## 9. Open vragen

- [ ] Mapping van NOVA uitwerken (hoofdstukken, paragrafen, leerdoelen, onderwerpen)
- [ ] Vaste opbouw van het correctievoorschrift ontwerpen
- [ ] Wie zijn de gebruikers en hoe wordt de database aangeboden?
- [ ] Authenticatie en toegangsbeheer (volgt zodra gebruikers bekend zijn)
- [ ] Hoe ziet het feedbacksysteem er technisch uit?
- [ ] Welk licentiemodel past bij de commerciële ambities?