# KlasLab Vragenbank — Requirements

## 1. Projectoverzicht

**Naam:** KlasLab Vragenbank
**Type:** Webapplicatie
**Doel:** Een gestructureerde, doorzoekbare database met onderwijsvragen voor het voortgezet onderwijs, te beginnen bij natuurkunde.
**Scope fase 1:** Database bouwen en vullen met vragen. Koppeling aan curriculum (methodes, leerdoelen, taxonomie).
**Toekomstvisie:** De database uitbreiden naar meerdere vakken en aanbieden aan gebruikers — wie dat precies zijn en hoe, wordt later bepaald.

---

## 2. Projectfilosofie

De kern is een goed gestructureerde vragenbank. Niet de interface of de gebruiker staat centraal in fase 1, maar de kwaliteit en structuur van de data zelf. Vragen worden door AI gegenereerd op basis van doordachte skills — niet gekopieerd uit methodes. Eén vraag kan gekoppeld zijn aan meerdere methodes, paragrafen en leerdoelen.

---

## 3. Gebruikers & Rollen

| Rol | Rechten |
|-----|---------|
| Beheerder | Volledig toegang — vragen aanmaken, bewerken, verwijderen |
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

```
src/
├── app/
│   ├── api/             ← API routes
│   └── page.tsx         ← homepage
├── components/
│   └── ui/              ← Shadcn-componenten
├── lib/
│   └── supabase.ts      ← Supabase client
└── types/               ← gedeelde TypeScript types
```

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
| 4 | Vragen invoeren en koppelen | — |
| 5 | Interface en gebruikersrollen | Nog te bepalen |

---

## 9. Open vragen

- [ ] Mapping van NOVA uitwerken (hoofdstukken, paragrafen, leerdoelen, onderwerpen)
- [ ] Vaste opbouw van het correctievoorschrift ontwerpen
- [ ] Wie zijn de gebruikers en hoe wordt de database aangeboden?
- [ ] Authenticatie en toegangsbeheer (volgt zodra gebruikers bekend zijn)
