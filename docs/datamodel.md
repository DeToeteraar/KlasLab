# KlasLab Vragenbank — Datamodel

Het volledige databaseontwerp voor de KlasLab Vragenbank.
Het uitvoerbare SQL-schema staat in `supabase/migrations/`.

---

## Tabeloverzicht

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
| `asset` | Een bestand (afbeelding, grafiek, tabel, formule, video, audio) in Supabase Storage |

---

## Entiteiten en eigenschappen

### Curriculum & Methode

| Tabel | Eigenschappen |
|---|---|
| `vak` | `id`, `naam` |
| `uitgever` | `id`, `naam` |
| `methode` | `id`, `naam`, `vak_id`, `uitgever_id` |
| `editie` | `id`, `naam`, `methode_id` |
| `hoofdstuk` | `id`, `titel`, `nummer` (integer, optioneel), `volgorde`, `editie_id` |
| `paragraaf` | `id`, `titel`, `nummer` (integer, optioneel), `volgorde`, `hoofdstuk_id` |

### Niveau

| Tabel | Eigenschappen |
|---|---|
| `niveau` | `id`, `naam` |

Vaste waarden: Basisonderwijs, VMBO-b, VMBO-k, VMBO-t, HAVO, VWO. MBO/HBO/WO volgen later.

Leerjaren per niveau (richtlijn, niet afgedwongen in de database):
- Basisonderwijs: 1–8
- VMBO-b/k/t: 1–4
- HAVO: 1–5
- VWO: 1–6

### Inhoud & Doelen

| Tabel | Eigenschappen |
|---|---|
| `onderwerp` | `id`, `naam`, `ouder_id` (optioneel, zelfverwijzend) |
| `leerdoel_slo` | `id`, `omschrijving`, `ouder_id` (optioneel, zelfverwijzend) |
| `leerdoel_kern` | `id`, `omschrijving`, `leerdoel_slo_id` (optioneel FK naar `leerdoel_slo`) |
| `leerdoel_methode` | `id`, `omschrijving`, `paragraaf_id`, `leerdoel_kern_id` (verplicht), `ouder_id` (optioneel, zelfverwijzend) |
| `vaardigheid` | `id`, `naam` |

> `leerdoel_methode` heeft een FK naar `paragraaf` — de editie volgt impliciet via paragraaf → hoofdstuk → editie.

### Taxonomie

| Tabel | Eigenschappen |
|---|---|
| `taxonomiesysteem` | `id`, `naam` |
| `taxonomielabel` | `id`, `naam`, `taxonomiesysteem_id` |

### Vragen

| Tabel | Eigenschappen |
|---|---|
| `vraagtype` | `id`, `naam` |
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
| `ai_model` | Text | Optioneel — welk model heeft de vraag gegenereerd |
| `skill_ref` | Text | Optioneel — verwijzing naar de skill die de vraag heeft gegenereerd |
| `versie` | Integer | Versienummer |
| `aangemaakt_op` | Timestamp | |
| `laatst_gewijzigd` | Timestamp | |
| `gewijzigd_door` | Text | |
| `zoekindex` | tsvector | Automatisch gegenereerd voor full-text search |
| `embedding` | vector(1536) | Voor semantisch zoeken (fase 3+) |

**Eigenschappen van `vraag_versie`:**

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
| `type` | Enum | `afbeelding` / `grafiek` / `tabel` / `formule` / `video` / `audio` |
| `bestandsnaam` | Text | |
| `url` | Text | Locatie in Supabase Storage |
| `beschrijving` | Text | Alt-tekst of toelichting |

---

## Relaties

### Directe relaties (één-op-veel)

| Van | Naar | Toelichting |
|---|---|---|
| `vak` → | `methode` | Een vak heeft meerdere methodes |
| `uitgever` → | `methode` | Een uitgever heeft meerdere methodes |
| `methode` → | `editie` | Een methode heeft meerdere edities |
| `editie` → | `hoofdstuk` | Een editie heeft meerdere hoofdstukken |
| `hoofdstuk` → | `paragraaf` | Een hoofdstuk heeft meerdere paragrafen |
| `paragraaf` → | `leerdoel_methode` | Leerdoelen zijn paragraaf-specifiek |
| `leerdoel_kern` → | `leerdoel_methode` | Elk methode-leerdoel verwijst verplicht naar een kernleerdoel |
| `leerdoel_slo` ← | `leerdoel_kern` | Een kernleerdoel verwijst optioneel naar zijn SLO-bron |
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

### Koppeltabellen (veel-op-veel)

| Koppeltabel | Verbindt | Toelichting |
|---|---|---|
| `vraag_leerdoel_kern` | `vraag` ↔ `leerdoel_kern` | Primaire leerdoelkoppeling — altijd via de kern |
| `vraag_onderwerp` | `vraag` ↔ `onderwerp` | Optioneel |
| `vraag_vaardigheid` | `vraag` ↔ `vaardigheid` | Optioneel |
| `vraag_taxonomielabel` | `vraag` ↔ `taxonomielabel` | Optioneel |
| `vraag_niveau_leerjaar` | `vraag` ↔ `niveau` + `leerjaar` | `vraag_id`, `niveau_id`, `leerjaar` (integer) |
| `vraag_asset` | `vraag` ↔ `asset` | Optioneel |
| `subvraag_asset` | `subvraag` ↔ `asset` | Optioneel |
| `uitwerking_asset` | `uitwerking` ↔ `asset` | Optioneel |
| `paragraaf_onderwerp` | `paragraaf` ↔ `onderwerp` | Inhoudelijke classificatie van een paragraaf |
| `leerdoel_kern_onderwerp` | `leerdoel_kern` ↔ `onderwerp` | Inhoudelijke classificatie van een kernleerdoel |
| `leerdoel_kern_niveau_leerjaar` | `leerdoel_kern` ↔ `niveau` + `leerjaar` | `leerdoel_kern_id`, `niveau_id`, `leerjaar` (integer) |

> Een vraag koppelt uitsluitend aan `leerdoel_kern`. Via de kern zijn alle methode-leerdoelen en het SLO-leerdoel bereikbaar.

> Zoekpaden:
> - Vraag → kern → methode-leerdoel → paragraaf → hoofdstuk → editie → methode → vak
> - Vraag → kern → SLO-leerdoel
> - Methode-leerdoel → kern → vraag
> - SLO-leerdoel → kern → vraag

> Alle koppelingen vanuit `vraag` zijn optioneel behalve `leerdoel_kern` — een vraag heeft altijd minstens één kernleerdoel.

---

## Ontwerpkeuzes

| Onderwerp | Beslissing |
|---|---|
| Uitwerking | Aparte tabel — houdt ruimte open voor toekomstige structuur |
| Correctievoorschrift | Aparte tabel, alleen tekst — vaste opbouw nog te ontwerpen |
| Leerdoel_kern | Spil tussen SLO en methode. FK naar `leerdoel_slo` optioneel. Elk methode-leerdoel heeft verplichte FK naar `leerdoel_kern`. Een vraag koppelt altijd aan `leerdoel_kern`. |
| Kernleerdoelen ontstaan | Primair uit SLO-leerdoelen. Bij invoer van methode-leerdoelen zoekt AI naar passend kernleerdoel — anders nieuw kernleerdoel aanmaken. |
| Leerdoel_Methode | FK naar `paragraaf` — editie volgt impliciet via de hiërarchie |
| Leerjaar + niveau | Gecombineerde koppeltabel — voorkomt dat niveau en leerjaar los van elkaar betekenis krijgen |
| Volgorde | `volgorde` integer op `subvraag`, `hoofdstuk` en `paragraaf`. `nummer` is optioneel voor het boekgetal. |
| AI-traceerbaarheid | `ai_model` en `skill_ref` op `vraag` |
| Status | `status` enum op `vraag`: concept / gepubliceerd / gearchiveerd |
| Optionaliteit | Alle koppelingen vanuit `vraag` zijn optioneel behalve `leerdoel_kern` |
| Onderwerphiërarchie | Één tabel `onderwerp` met optionele `ouder_id` — onbeperkt diep |
| Taxonomie | Aparte tabellen voor systeem én label — flexibel voor meerdere systemen per vraag |
| Assets | Supabase Storage, database bevat alleen de URL. Deelbaar via koppeltabellen. |
| Eerste methode | NOVA 1/2 HAVO/VWO MAX Release 5.1 |

---

## Supabase-specifieke beslissingen

| Onderwerp | Beslissing |
|---|---|
| Row Level Security | Aan op alle tabellen vanaf dag 1. Tijdelijke open policy tijdens ontwikkeling. |
| Full-text search | `tsvector` kolom `zoekindex` op `vraag` — automatisch gegenereerd |
| Vector embeddings | `embedding vector(1536)` op `vraag` — voor semantisch zoeken (fase 3+) |
| Views | `vraag_volledig` view — maakt AI-queries eenvoudig en betrouwbaar |
| Storage buckets | `afbeeldingen`, `videos`, `audio` — private buckets in Supabase Storage |
| Migraties | `supabase/migrations/` — SQL-bestanden, tegelijk documentatie en uitvoerbaar schema |
| Edge Functions | Voor AI-generatie pipeline (Claude API) — houdt API-sleutels server-side |
