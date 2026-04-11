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

### Tabeloverzicht

| Tabel | Wat het is |
|---|---|
| `vak` | Een schoolvak, bijv. Natuurkunde |
| `uitgever` | Een educatieve uitgever, bijv. Noordhoff |
| `methode` | Een lesmethode van een uitgever voor een vak, bijv. NOVA |
| `editie` | Een versie van een methode, bijv. NOVA Release 5.1 |
| `hoofdstuk` | Een hoofdstuk binnen een editie |
| `paragraaf` | Een paragraaf binnen een hoofdstuk |
| `niveau` | Een onderwijsniveau, bijv. HAVO |
| `onderwerp` | Een inhoudsthema, hiërarchisch via ouder_id |
| `leerdoel_slo` | Een officieel SLO-leerdoel, optioneel hiërarchisch |
| `leerdoel_kern` | Een gestandaardiseerd kernleerdoel — de spil tussen SLO en methode |
| `leerdoel_methode` | Een methode-eigen leerdoel, gekoppeld aan een paragraaf en altijd aan een kernleerdoel |
| `vaardigheid` | Een vaardigheid, bijv. "formule omschrijven" |
| `taxonomiesysteem` | Een taxonomiesysteem, bijv. Bloom of RTTI |
| `taxonomielabel` | Een label binnen een systeem, bijv. "Toepassen" |
| `vraagtype` | Het type vraag, bijv. meerkeuze of open |
| `vraag` | Een onderwijsvraag — de kernentiteit |
| `vraag_versie` | Snapshot van een vraag op het moment van een wijziging |
| `subvraag` | Een deelvraag (a, b, c...) onder een hoofdvraag |
| `correctievoorschrift` | Beoordelingsmodel bij een vraag, alleen tekst |
| `uitwerking` | Uitgewerkte oplossing bij een vraag, tekst en/of assets |
| `asset` | Een bestand (afbeelding, grafiek, tabel, formule, video) in Supabase Storage |

---

### Entiteiten en eigenschappen

#### Curriculum & Methode

| Tabel | Eigenschappen |
|---|---|
| `vak` | `id`, `naam` |
| `uitgever` | `id`, `naam` |
| `methode` | `id`, `naam`, `vak_id`, `uitgever_id` |
| `editie` | `id`, `naam`, `methode_id` |
| `hoofdstuk` | `id`, `titel`, `nummer` (integer, optioneel), `volgorde`, `editie_id` |
| `paragraaf` | `id`, `titel`, `nummer` (integer, optioneel), `volgorde`, `hoofdstuk_id` |


#### Niveau

| Tabel | Eigenschappen |
|---|---|
| `niveau` | `id`, `naam` |

Vaste waarden: Basisonderwijs, VMBO-b, VMBO-k, VMBO-t, HAVO, VWO. MBO/HBO/WO volgen later.

Leerjaren per niveau (als richtlijn, niet afgedwongen in de database):
- Basisonderwijs: 1–8
- VMBO-b/k/t: 1–4
- HAVO: 1–5
- VWO: 1–6

#### Inhoud & Doelen

| Tabel | Eigenschappen |
|---|---|
| `onderwerp` | `id`, `naam`, `ouder_id` (optioneel, zelfverwijzend) |
| `leerdoel_slo` | `id`, `omschrijving`, `ouder_id` (optioneel, zelfverwijzend) |
| `leerdoel_kern` | `id`, `omschrijving`, `leerdoel_slo_id` (optioneel FK naar `leerdoel_slo`) |
| `leerdoel_methode` | `id`, `omschrijving`, `paragraaf_id`, `leerdoel_kern_id` (verplichte FK naar `leerdoel_kern`), `ouder_id` (optioneel, zelfverwijzend) |
| `vaardigheid` | `id`, `naam` |

> `leerdoel_methode` heeft een FK naar `paragraaf` — de editie volgt impliciet via de hiërarchie paragraaf → hoofdstuk → editie.

#### Taxonomie

| Tabel | Eigenschappen |
|---|---|
| `taxonomiesysteem` | `id`, `naam` |
| `taxonomielabel` | `id`, `naam`, `taxonomiesysteem_id` |

#### Vragen

| Tabel | Eigenschappen |
|---|---|
| `vraagtype` | `id`, `naam` |
| `vraag` | zie hieronder |
| `subvraag` | `id`, `vraag_id`, `label`, `volgorde`, `context_tekst` (optioneel), `vraag_tekst`, `aantal_punten` |
| `correctievoorschrift` | `id`, `vraag_id`, `tekst` |
| `uitwerking` | `id`, `vraag_id`, `tekst` (optioneel) |
| `asset` | `id`, `type`, `bestandsnaam`, `url`, `beschrijving` |

**Eigenschappen van `vraag`:**

| Eigenschap | Type | Toelichting |
|---|---|---|
| `id` | UUID | Unieke identifier |
| `vraagtype_id` | UUID | FK naar `vraagtype` |
| `context_tekst` | Text | Optionele inleidende tekst |
| `vraag_tekst` | Text | De vraagtekst |
| `aantal_punten` | Integer | Maximale score |
| `status` | Enum | `concept` / `gepubliceerd` / `gearchiveerd` — default: `concept` |
| `gemaakt_door` | Enum | `mens` / `ai` |
| `ai_model` | Text | Optioneel — welk model heeft de vraag gegenereerd, bijv. "claude-sonnet-4-6" |
| `skill_ref` | Text | Optioneel — verwijzing naar de skill die de vraag heeft gegenereerd |
| `versie` | Integer | Versienummer |
| `aangemaakt_op` | Timestamp | |
| `laatst_gewijzigd` | Timestamp | |
| `gewijzigd_door` | Text | Naam of ID van laatste wijziger |

**Eigenschappen van `vraag_versie`:**

Bevat een volledige snapshot van de kernvelden van `vraag` op het moment van een wijziging. Wordt alleen opgehaald wanneer expliciet gevraagd.

| Eigenschap | Type | Toelichting |
|---|---|---|
| `id` | UUID | |
| `vraag_id` | UUID | FK naar de huidige vraag |
| `vraag_tekst` | Text | |
| `context_tekst` | Text | |
| `aantal_punten` | Integer | |
| `status` | Enum | |
| `gemaakt_door` | Enum | |
| `versie` | Integer | Het versienummer van deze snapshot |
| `opgeslagen_op` | Timestamp | |
| `opgeslagen_door` | Text | |

**Eigenschappen van `asset`:**

| Eigenschap | Type | Toelichting |
|---|---|---|
| `id` | UUID | |
| `type` | Enum | `afbeelding` / `grafiek` / `tabel` / `formule` / `video` |
| `bestandsnaam` | Text | |
| `url` | Text | Locatie in Supabase Storage |
| `beschrijving` | Text | Alt-tekst of toelichting |

---

### Relaties

#### Directe relaties (één-op-veel)

| Van | Naar | Toelichting |
|---|---|---|
| `vak` → | `methode` | Een vak heeft meerdere methodes |
| `uitgever` → | `methode` | Een uitgever heeft meerdere methodes |
| `methode` → | `editie` | Een methode heeft meerdere edities |
| `editie` → | `hoofdstuk` | Een editie heeft meerdere hoofdstukken |
| `paragraaf` → | `leerdoel_methode` | Leerdoelen zijn gekoppeld aan een paragraaf |
| `leerdoel_kern` → | `leerdoel_methode` | Elk methode-leerdoel verwijst verplicht naar een kernleerdoel |
| `leerdoel_slo` ← | `leerdoel_kern` | Een kernleerdoel verwijst optioneel naar zijn SLO-bron |
| `hoofdstuk` → | `paragraaf` | Een hoofdstuk heeft meerdere paragrafen |
| `taxonomiesysteem` → | `taxonomielabel` | Een systeem heeft meerdere labels |
| `vraagtype` → | `vraag` | Een vraagtype hoort bij meerdere vragen |
| `vraag` → | `subvraag` | Een vraag heeft meerdere subvragen (optioneel) |
| `vraag` → | `correctievoorschrift` | Één correctievoorschrift per vraag (optioneel) |
| `vraag` → | `uitwerking` | Één uitwerking per vraag (optioneel) |
| `vraag` → | `vraag_versie` | Een vraag heeft meerdere versie-snapshots |

Zelfverwijzende hiërarchie:

| Tabel | Via |
|---|---|
| `onderwerp` | `ouder_id` → `onderwerp.id` (optioneel, onbeperkt diep) |
| `leerdoel_slo` | `ouder_id` → `leerdoel_slo.id` (optioneel) |
| `leerdoel_methode` | `ouder_id` → `leerdoel_methode.id` (optioneel) |

#### Koppeltabellen (veel-op-veel)

| Koppeltabel | Verbindt | Toelichting |
|---|---|---|
| `vraag_leerdoel_kern` | `vraag` ↔ `leerdoel_kern` | Primaire leerdoelkoppeling — altijd via de kern |
| `vraag_onderwerp` | `vraag` ↔ `onderwerp` | Optioneel |
| `paragraaf_onderwerp` | `paragraaf` ↔ `onderwerp` | Inhoudelijke classificatie van een paragraaf |
| `leerdoel_kern_onderwerp` | `leerdoel_kern` ↔ `onderwerp` | Inhoudelijke classificatie van een kernleerdoel |
| `vraag_vaardigheid` | `vraag` ↔ `vaardigheid` | Optioneel |
| `vraag_taxonomielabel` | `vraag` ↔ `taxonomielabel` | Optioneel |
| `vraag_niveau_leerjaar` | `vraag` ↔ `niveau` + `leerjaar` | Gecombineerd: `vraag_id`, `niveau_id`, `leerjaar` (integer) |
| `vraag_asset` | `vraag` ↔ `asset` | Optioneel |
| `subvraag_asset` | `subvraag` ↔ `asset` | Optioneel |
| `uitwerking_asset` | `uitwerking` ↔ `asset` | Optioneel |
| `leerdoel_kern_niveau_leerjaar` | `leerdoel_kern` ↔ `niveau` + `leerjaar` | Gecombineerd: `leerdoel_kern_id`, `niveau_id`, `leerjaar` (integer) |

> Een vraag koppelt uitsluitend aan `leerdoel_kern`. Via de kern zijn alle methode-leerdoelen en het SLO-leerdoel bereikbaar. Directe koppelingen van vraag naar `leerdoel_slo` of `leerdoel_methode` bestaan niet.

> Zoekpaden:
> - Vraag → kern → methode-leerdoel
> - Vraag → kern → SLO-leerdoel
> - Methode-leerdoel → kern → vraag
> - SLO-leerdoel → kern → vraag

> Een vraag koppelen aan een `paragraaf` loopt via `leerdoel_methode` → `paragraaf`. Directe koppeling van vraag naar paragraaf is niet nodig.

> Alle koppelingen vanuit `vraag` zijn optioneel behalve `leerdoel_kern` — een vraag heeft altijd minstens één kernleerdoel.

---

### Ontwerpkeuzes

| Onderwerp | Beslissing |
|---|---|
| Uitwerking | Aparte tabel (niet velden op `vraag`) — houdt ruimte open voor toekomstige structuur |
| Correctievoorschrift | Aparte tabel, alleen tekst — vaste opbouw nog te ontwerpen |
| Leerdoel_Methode | FK naar `paragraaf` — leerdoelen zijn paragraaf-specifiek, editie volgt impliciet via de hiërarchie |
| Leerjaar + niveau | Gecombineerde koppeltabel `vraag_niveau_leerjaar` — voorkomt dat niveau en leerjaar los van elkaar betekenis krijgen |
| Volgorde | `volgorde` integer op `subvraag`, `hoofdstuk` en `paragraaf`. `nummer` is optioneel (integer) voor het boekgetal — `volgorde` is altijd aanwezig voor sortering. |
| AI-traceerbaarheid | `ai_model` en `skill_ref` op `vraag` — traceerbaar welk model en welke skill een vraag heeft gegenereerd |
| Status | `status` enum op `vraag`: concept / gepubliceerd / gearchiveerd — essentieel voor AI-workflows |
| Opzoeken door AI | AI navigeert op naam — geen aparte `code`-kolom nodig |
| Onderwerphiërarchie | Één tabel `onderwerp` met optionele `ouder_id` — onbeperkt diep |
| Taxonomie | Aparte tabellen voor systeem én label — flexibel voor meerdere systemen per vraag |
| Assets | Opgeslagen in Supabase Storage (buckets per type), database bevat alleen de URL. Deelbaar via koppeltabellen. |
| Hergebruik | Één vraag koppelbaar aan meerdere methodes, paragrafen en leerdoelen |
| Leerdoel_kern | Spil tussen SLO en methode. Bevat optionele FK naar `leerdoel_slo`. Elk methode-leerdoel heeft verplichte FK naar `leerdoel_kern`. Een vraag koppelt altijd aan `leerdoel_kern` — nooit direct aan SLO of methode-leerdoel. |
| Kernleerdoelen ontstaan | Primair uit SLO-leerdoelen. Bij invoer van methode-leerdoelen zoekt AI naar passend kernleerdoel — anders nieuw kernleerdoel aanmaken. |
| Optionaliteit | Alle koppelingen vanuit `vraag` zijn optioneel behalve `leerdoel_kern` — een vraag heeft altijd minstens één kernleerdoel. |
| Leerdoel_kern + niveau/leerjaar | Koppeltabel `leerdoel_kern_niveau_leerjaar` — één kernleerdoel kan voor meerdere niveaus en leerjaren gelden. |
| Eerste methode | NOVA 1/2 HAVO/VWO MAX Release 5.1 |

---

### Supabase-specifieke beslissingen

| Onderwerp | Beslissing |
|---|---|
| Row Level Security | Aanzetten op alle tabellen vanaf dag 1, ook als er nu maar één rol is. Voorkomt een zware migratie later. |
| Full-text search | `tsvector`-kolom op `vraag` voor zoeken in fase 2 — PostgreSQL-ingebouwd, geen externe dienst nodig |
| Vector embeddings | `embedding vector(1536)` kolom op `vraag` nu al toevoegen, ook al wordt hij nog niet gebruikt. Later toevoegen aan een grote tabel is kostbaar. |
| Views | `vraag_volledig` view die alle gekoppelde data samenvoegt — maakt AI-queries eenvoudig en betrouwbaar |
| Storage buckets | Aparte buckets per assettype: `afbeeldingen`, `videos`, `formules` |
| Migraties | Opgeslagen in `supabase/migrations/` als SQL-bestanden — tegelijk documentatie en uitvoerbaar schema |
| Edge Functions | Voor AI-generatie pipeline (Claude API aanroepen) — houdt API-sleutels server-side |

---

## 8. Design

Geen afwijkingen van de standaard conventies in `docs/conventions.md`.

---

## 9. Fasering

| Fase | Wat | Status |
|------|-----|--------|
| 1 | Requirements & ontwerp | Afgerond |
| 2 | Database opzetten in Supabase + migraties schrijven en uitvoeren | — |
| 3 | Mapping NOVA invoeren (hoofdstukken, paragrafen, leerdoelen) | — |
| 4 | Vragen invoeren en koppelen | — |
| 5 | Interface en gebruikersrollen | Nog te bepalen |

---

## 10. Open vragen

- [x] Relaties tussen nodes volledig uitwerken — zie sectie 7
- [x] Hoe leerjaar + niveau technisch als koppeltabel opzetten? — gecombineerde tabel `vraag_niveau_leerjaar`
- [ ] Mapping van NOVA uitwerken (hoofdstukken, paragrafen, leerdoelen, onderwerpen)
- [ ] Vaste opbouw van het correctievoorschrift ontwerpen
- [ ] Wie zijn de gebruikers en hoe wordt de database aangeboden?
- [ ] Authenticatie en toegangsbeheer (volgt zodra gebruikers bekend zijn)
