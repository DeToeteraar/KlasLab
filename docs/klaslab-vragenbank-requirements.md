# KlasLab Vragenbank — Requirements & Ontwerpdocument

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
- Assets koppelen aan vragen en subvragen (afbeelding, grafiek, tabel, formule, video)
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

## 7. Data & Database

### Nodes (entiteiten)

#### Curriculum & Methode
| Node | Toelichting |
|---|---|
| `Vak` | Bijv. "Natuurkunde", "Scheikunde". Methodes hangen onder een vak. |
| `Methode` | Een lesmethode, bijv. "NOVA". Hangt onder een vak. |
| `Editie` | Versie van een methode, bijv. "NOVA 1/2 HAVO/VWO MAX Release 5.1" |
| `Hoofdstuk` | Hoofdstuk binnen een methode-editie |
| `Paragraaf` | Paragraaf binnen een hoofdstuk |

#### Inhoud & Doelen
| Node | Toelichting |
|---|---|
| `Onderwerp` | Hiërarchisch via `ouder_id`. Bijv. Elektriciteit → Schakelingen → Serieschakeling. |
| `Leerdoel_SLO` | Officieel SLO-leerdoel. Optioneel hiërarchisch via `ouder_id`. |
| `Leerdoel_Methode` | Methode-eigen leerdoel. Optioneel hiërarchisch via `ouder_id`. |
| `Vaardigheid` | Bijv. "formule omschrijven", "onderzoeksvraag formuleren" |

#### Taxonomie
| Node | Toelichting |
|---|---|
| `Taxonomiesysteem` | Bijv. "Bloom", "RTTI" |
| `Taxonomielabel` | Bijv. "Toepassen" (Bloom), "Transfer" (RTTI). Gekoppeld aan een systeem. |

#### Vragen
| Node | Toelichting |
|---|---|
| `Vraagtype` | Bijv. meerkeuze, open, berekening, waar/onwaar, invul |
| `Vraag` | Kernentiteit. Bevat optionele context_tekst als inleiding. |
| `Subvraag` | Deelvraag onder een hoofdvraag (a, b, c...). Optioneel. |
| `Asset` | Afbeelding, grafiek, tabel, formule, video. Koppelbaar aan Vraag én Subvraag. |
| `Correctievoorschrift` | Beoordelingsmodel voor gebruik in toetsen. Krijgt een vaste opbouw (standaard nog te ontwerpen). Optioneel per vraag. |
| `Uitwerking` | Uitgewerkte oplossing voor gebruik in opdrachtenbladen. Kan bestaan uit tekst, een of meerdere assets (video, afbeelding, grafiek, tabel), of een combinatie. Optioneel per vraag. |

### Eigenschappen van Vraag
| Eigenschap | Type | Toelichting |
|---|---|---|
| `id` | UUID | Unieke identifier |
| `context_tekst` | Text | Optionele inleidende tekst |
| `vraag_tekst` | Text | De vraagtekst |
| `aantal_punten` | Integer | Maximale score |
| `gemaakt_door` | Enum | mens / AI |
| `versie` | Integer | Versienummer |
| `aangemaakt_op` | Timestamp | |
| `laatst_gewijzigd` | Timestamp | |
| `gewijzigd_door` | Text | Naam of ID van laatste wijziger |

> Leerjaar en niveau zijn koppelrelaties, geen vaste eigenschappen — één vraag kan meerdere leerjaren en niveaus hebben.

### Eigenschappen van Subvraag
| Eigenschap | Type | Toelichting |
|---|---|---|
| `id` | UUID | |
| `context_tekst` | Text | Optioneel |
| `vraag_tekst` | Text | |
| `label` | Text | Bijv. "a", "b", "c" |
| `aantal_punten` | Integer | |

### Eigenschappen van Asset
| Eigenschap | Type | Toelichting |
|---|---|---|
| `id` | UUID | |
| `type` | Enum | afbeelding / grafiek / tabel / formule / video |
| `bestandsnaam` | Text | |
| `url` | Text | Locatie in opslag |
| `beschrijving` | Text | Alt-tekst of toelichting |

### Versiegeschiedenis
Actuele versie staat in de hoofdtabel `Vraag`. Oude versies worden opgeslagen in `Vraag_Versie` en alleen opgehaald wanneer expliciet gevraagd.

### Ontwerpkeuzes
| Onderwerp | Beslissing |
|---|---|
| Onderwerphiërarchie | Één tabel `Onderwerp` met optionele `ouder_id` — onbeperkt diep |
| Leerdoelhiërarchie | Zelfde aanpak — plat waar mogelijk, hiërarchisch waar SLO dat vereist |
| Taxonomie | Aparte nodes voor systeem én label — flexibel voor meerdere systemen per vraag |
| Vraagtype | Aparte node met eigen eigenschappen |
| Subvragen | Optioneel, met eigen context_tekst |
| Assets | Aparte node, koppelbaar aan zowel Vraag als Subvraag |
| Leerjaar + niveau | Koppelrelaties, geen vaste eigenschappen |
| Hergebruik | Één vraag koppelbaar aan meerdere methodes, paragrafen en leerdoelen |
| Eerste methode | NOVA 1/2 HAVO/VWO MAX Release 5.1 |

---

## 8. Design

Geen afwijkingen van de standaard conventies in `docs/conventions.md`.

---

## 9. Fasering

| Fase | Wat | Status |
|------|-----|--------|
| 1 | Requirements & ontwerp | Afgerond |
| 2 | Database opzetten in Supabase | — |
| 3 | Datamodel uitwerken en migraties uitvoeren | — |
| 4 | Mapping NOVA invoeren | — |
| 5 | Vragen invoeren en koppelen | — |
| 6 | Interface en gebruikersrollen | Nog te bepalen |

---

## 10. Open vragen

- [ ] Relaties tussen nodes volledig uitwerken
- [ ] Mapping van NOVA uitwerken (hoofdstukken, paragrafen, leerdoelen, onderwerpen)
- [ ] Vaste opbouw van het correctievoorschrift ontwerpen
- [ ] Hoe leerjaar + niveau technisch als koppeltabel opzetten?
- [ ] Wie zijn de gebruikers en hoe wordt de database aangeboden?
- [ ] Authenticatie en toegangsbeheer (volgt zodra gebruikers bekend zijn)
