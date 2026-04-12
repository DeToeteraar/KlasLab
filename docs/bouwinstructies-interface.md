# KlasLab Vragenbank — Bouwinstructies Interface

## Doel van dit document

Dit document bevat de volledige instructies om de eerste versie van de KlasLab-interface te bouwen. Het is bedoeld als opdracht voor een nieuwe Claude-sessie. Lees eerst `AGENTS.md` en dan dit document volledig door voordat je begint.

---

## Context

KlasLab is een gestructureerde vragenbank voor het voortgezet onderwijs. De database draait al in Supabase en bevat testdata voor hoofdstuk 4 (Elektriciteit) van de methode NOVA NaSk 1/2 MAX Release 5.1.

De interface is voor de beheerder (ontwikkelaar) en eventueel een collega. Het doel is **overzicht krijgen over de mapping**: de structuur van methode → hoofdstuk → paragraaf → leerdoel → vraag bekijken, doorlopen en doorzoeken. Er worden in deze fase geen vragen aangemaakt of bewerkt via de interface.

### Wat er al staat
- Supabase-database met volledig schema (21 tabellen, 11 koppeltabellen)
- RLS-policies (open voor ontwikkeling)
- Testdata: H4 Elektriciteit met 4 paragrafen, 24 leerdoelen, 11 vragen
- Seed-data in `supabase/seed/testdata_h4_elektriciteit.sql`
- Eén asset-afbeelding: `testdata_asset_ledlamp_figuur3.png` (moet nog geüpload naar Supabase Storage bucket `afbeeldingen`)
- Supabase project ref: `pjisyzgxelignytnbdgj`
- View: `vraag_volledig` — haalt alle metadata op in één query

### Wat er nog niet staat
- Geen Next.js-project (geen `package.json`, geen `src/`)
- Geen Supabase client in code
- Geen TypeScript types voor de database

---

## Stap 0: Voorbereiding

### 0.1 Next.js installeren

```bash
cd /Users/SNED/Documents/Programmeer\ projecten/KlasLab
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git
```

Vlaggen:
- `.` — in de huidige map
- `--no-git` — git repo bestaat al

### 0.2 Shadcn UI installeren

```bash
npx shadcn@latest init
```

Kies:
- Style: Default
- Base color: Slate
- CSS variables: yes

Installeer daarna de benodigde componenten:

```bash
npx shadcn@latest add accordion card badge input select collapsible scroll-area separator tooltip
```

### 0.3 Supabase client

```bash
npm install @supabase/supabase-js
```

Maak `.env.local` aan:

```
NEXT_PUBLIC_SUPABASE_URL=https://pjisyzgxelignytnbdgj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<vraag aan de gebruiker>
```

Maak `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### 0.4 TypeScript types genereren

Genereer types vanuit het Supabase-schema. Dit kan via de Supabase MCP-tool `generate_typescript_types` of handmatig:

```bash
npx supabase gen types typescript --project-id pjisyzgxelignytnbdgj > src/types/database.ts
```

Hiervoor is een Supabase access token nodig. Vraag aan de gebruiker of ze dit willen instellen, of genereer de types via de MCP-tool.

### 0.5 Testdata invoegen

De testdata staat in `supabase/seed/testdata_h4_elektriciteit.sql`. De gebruiker moet dit uitvoeren in de Supabase SQL-editor. Herinner de gebruiker eraan als dit nog niet is gedaan.

De gebruiker moet ook de asset-afbeelding `testdata_asset_ledlamp_figuur3.png` uploaden naar de Supabase Storage bucket `afbeeldingen`.

---

## Stap 1: Data-laag (API routes)

### Architectuur

De interface leest data uit Supabase via Next.js **Server Components**. Omdat de interface read-only is, zijn er geen aparte API-routes nodig — de data wordt direct opgehaald in Server Components via de Supabase client.

Voor queries die complexer zijn of die vanuit meerdere componenten worden aangeroepen, maak je functies aan in `src/lib/queries.ts`.

### Benodigde queries

Maak `src/lib/queries.ts` met de volgende functies:

```typescript
// Haal alle edities op met hun methode, vak en uitgever
export async function getEdities()

// Haal de boomstructuur op: hoofdstukken + paragrafen voor een editie
// Inclusief het aantal vragen per paragraaf
export async function getHoofdstukken(editieId: string)

// Haal leerdoelen op voor een paragraaf (methode-leerdoelen)
// Inclusief het aantal vragen per leerdoel
export async function getLeerdoelen(paragraafId: string)

// Haal vragen op voor een specifiek leerdoel
// Met alle metadata: type, punten, niveau, taxonomie, status, assets, subvragen
export async function getVragen(leerdoelKernId: string, paragraafId: string)

// Haal volledige vraagdetails op (voor de uitgeklapte kaart)
// Inclusief subvragen, correctievoorschrift, uitwerking, leerdoel-keten
export async function getVraagDetail(vraagId: string)
```

**Belangrijk**: Gebruik de `vraag_volledig` view waar mogelijk. Voor de boomstructuur en leerdoel-queries zijn directe tabel-queries nodig.

### Voorbeeld query-structuur voor de boom

```typescript
// Hoofdstukken met paragrafen en vraagtelling
const { data } = await supabase
  .from('hoofdstuk')
  .select(`
    id, titel, nummer, volgorde,
    paragraaf (
      id, titel, nummer, volgorde,
      leerdoel_methode (
        leerdoel_kern_id
      )
    )
  `)
  .eq('editie_id', editieId)
  .order('volgorde')
```

De vraagtelling per paragraaf kan via een aparte count-query of via de koppeling leerdoel_methode → leerdoel_kern → vraag_leerdoel_kern.

---

## Stap 2: Interface bouwen

### Pagina-structuur

Er is één pagina: de homepage (`src/app/page.tsx`). Dit is een Server Component.

### Layout

```
┌─ Sidebar (280px, vast) ──────┬─ Hoofdgebied (flex-1) ──────────────────────┐
│                              │                                              │
│  [Editie-selector]           │  §[nr] [Paragraaftitel]                      │
│                              │  ─────────────────────────────────────────── │
│  Boomstructuur:              │                                              │
│  ├─ H1 Titel          ●3    │  ▸ Leerdoeltekst                   3 vragen  │
│  │  ├─ §1.1 Titel     ●2    │                                              │
│  │  └─ §1.2 Titel     ○0    │  ▾ Leerdoeltekst                   2 vragen  │
│  └─ H2 Titel          ●5    │    ┌────────────────────────────────────────┐ │
│     └─ ...                   │    │ Vraagtekst...                         │ │
│                              │    │ MK · 3pt · H3 V3 · ■ Toepassen       │ │
│  [Zoekbalk]                  │    └────────────────────────────────────────┘ │
│  [Filters ▾]                 │                                              │
└──────────────────────────────┴──────────────────────────────────────────────┘
```

### Componentenstructuur

```
src/
├── app/
│   ├── page.tsx                    ← Server Component, haalt data op
│   └── layout.tsx                  ← Root layout
├── components/
│   ├── CurriculumSidebar.tsx       ← De linker sidebar met boomstructuur
│   ├── CurriculumTree.tsx          ← De inklapbare boom (hoofdstukken/paragrafen)
│   ├── ParagraafView.tsx           ← Het hoofdgebied: leerdoelen + vragen
│   ├── LeerdoelAccordion.tsx       ← Eén leerdoel-blok (uitklapbaar)
│   ├── VraagCard.tsx               ← Eén vraagkaart met metadata
│   ├── VraagDetail.tsx             ← Uitgeklapte vraag (subvragen, correctiemodel)
│   ├── MetadataBadge.tsx           ← Herbruikbare badge voor metadata
│   ├── FilterBar.tsx               ← Zoek- en filterfunctionaliteit
│   └── ui/                         ← Shadcn-componenten (niet wijzigen)
├── lib/
│   ├── supabase.ts                 ← Supabase client
│   └── queries.ts                  ← Database queries
└── types/
    └── database.ts                 ← Gegenereerde types
```

### Component-details

#### CurriculumSidebar (Client Component)

- Bevat de editie-selector (Shadcn `Select`)
- Bevat de `CurriculumTree`
- Bevat de `FilterBar`
- Bijhoudt welke paragraaf geselecteerd is (state)
- Communiceert de geselecteerde paragraaf naar de parent via URL search params of state

#### CurriculumTree (Client Component)

- Shadcn `Collapsible` per hoofdstuk
- Onder elk hoofdstuk: lijst van paragrafen
- Per paragraaf: titel + badge met aantal vragen
- `●3` (groen/blauw) als er vragen zijn, `○0` (grijs) als er geen zijn
- Actieve paragraaf visueel gemarkeerd (achtergrondkleur)
- Klik op paragraaf → selecteert die paragraaf

#### ParagraafView (Server Component of Client Component)

- Titel van de geselecteerde paragraaf bovenaan
- Daaronder: een `Accordion` (Shadcn) met alle leerdoelen
- Elk leerdoel is een `AccordionItem`

#### LeerdoelAccordion

- Trigger toont: leerdoeltekst + badge met aantal vragen
- Content toont: lijst van `VraagCard` componenten

#### VraagCard (Client Component)

- Shadcn `Card`
- **Bovenste helft**: vraagtekst (max 3 regels, truncated)
- **Onderste helft**: metadata-balk in vaste volgorde:

| Element | Shadcn component | Weergave |
|---------|-----------------|----------|
| Vraagtype | `Badge` variant outline | `MK` / `Open` / `Ber` / `W/O` / `Inv` |
| Punten | `Badge` | `3pt` |
| Niveau + leerjaar | `Badge` | `H2` / `V2` |
| Taxonomie (Bloom) | `Badge` met kleur | `Onthouden` / `Begrijpen` / `Toepassen` / `Analyseren` |
| Status | `Badge` met kleur | `concept` (amber) / `gepubliceerd` (groen) / `gearchiveerd` (grijs) |
| Assets | `Badge` | `1 asset` (alleen tonen als > 0) |
| Subvragen | `Badge` | `4 subvragen` (alleen tonen als > 0) |
| Correctiemodel | `Badge` | `nakijkmodel` (alleen tonen als aanwezig) |
| Uitwerking | `Badge` | `uitwerking` (alleen tonen als aanwezig) |
| AI-gegenereerd | `Badge` | `ai` (alleen tonen als `gemaakt_door = 'ai'`) |

- Klik op kaart → klapt open naar `VraagDetail`

#### VraagDetail

- Volledige vraagtekst
- Als er subvragen zijn: genummerde lijst (a, b, c...) met per subvraag de tekst en punten
- Correctievoorschrift (als aanwezig): in een apart blok
- Uitwerking (als aanwezig): in een apart blok
- Leerdoel-keten: methode-leerdoel → kernleerdoel → SLO-leerdoel (als beschikbaar)
- Asset-preview (als aanwezig): afbeelding inline tonen
- Alle metadata die ook op de kaart staat, maar nu volledig uitgeschreven

#### MetadataBadge

- Herbruikbaar component
- Props: `type` (bepaalt kleur/variant), `label` (tekst)
- Bloom-kleuren:
  - Onthouden: `bg-slate-100 text-slate-700`
  - Begrijpen: `bg-blue-100 text-blue-700`
  - Toepassen: `bg-green-100 text-green-700`
  - Analyseren: `bg-amber-100 text-amber-700`
  - Evalueren: `bg-orange-100 text-orange-700`
  - Creëren: `bg-red-100 text-red-700`
- Status-kleuren:
  - concept: `bg-amber-100 text-amber-700`
  - gepubliceerd: `bg-green-100 text-green-700`
  - gearchiveerd: `bg-gray-100 text-gray-500`

#### FilterBar

- Zoekbalk: Shadcn `Input` — zoekt in vraagteksten (client-side filtering voor nu)
- Filters: Shadcn `Select` componenten voor:
  - Niveau (HAVO, VWO, etc.)
  - Taxonomie (Onthouden, Begrijpen, etc.)
  - Status (concept, gepubliceerd, gearchiveerd)
  - Vraagtype (open, invul, berekening, etc.)
- Filters beperken wat zichtbaar is binnen de geselecteerde paragraaf
- "Wis filters" knop om alles te resetten

---

## Stap 3: Styling

### Ontwerpprincipes

- **Rustig en overzichtelijk** — veel whitespace, geen visuele ruis
- **Data-gedreven** — de content staat centraal, niet de interface
- **Kleurcodes zijn functioneel** — ze communiceren taxonomie en status
- **Responsive is niet nodig** — dit is een desktop-tool voor de beheerder

### Tailwind-configuratie

- Gebruik de standaard Shadcn/Tailwind kleuren
- Lettertype: standaard (Inter of system font)
- Sidebar: vaste breedte 280px, lichtgrijze achtergrond (`bg-muted`)
- Hoofdgebied: witte achtergrond, maximale breedte 900px gecentreerd
- Kaarten: subtiele border, lichte schaduw bij hover

---

## Stap 4: State management

### Navigatie-state

De app heeft drie niveaus van selectie:
1. **Editie** (nu altijd "MAX Release 5.1" — maar voorbereiden op meerdere)
2. **Paragraaf** (geselecteerd via de boom)
3. **Vraag** (uitgeklapt via klik op kaart)

Gebruik **URL search params** voor editie en paragraaf, zodat de staat behouden blijft bij een refresh:

```
/?editie=d0000000-...&paragraaf=f0000000-...
```

Next.js `useSearchParams` in combinatie met `useRouter` voor navigatie.

### Filter-state

Filters zijn lokale client-state (React `useState`). Ze hoeven niet in de URL.

---

## Stap 5: Server vs. Client Components

| Component | Type | Waarom |
|-----------|------|--------|
| `page.tsx` | Server | Data ophalen bij eerste load |
| `layout.tsx` | Server | Standaard |
| `CurriculumSidebar` | Client | Interactie (klikken, openvouwen) |
| `CurriculumTree` | Client | Interactie |
| `ParagraafView` | Client | Reageert op geselecteerde paragraaf |
| `LeerdoelAccordion` | Client | Uitklapbaar |
| `VraagCard` | Client | Klikbaar, uitklapbaar |
| `VraagDetail` | Client | Dynamisch geladen |
| `FilterBar` | Client | Formulier-state |
| `MetadataBadge` | Server of Client | Puur presentatie |

Data wordt opgehaald via de Supabase client in Client Components (met `useEffect` of een data-fetching pattern). Omdat we geen auth hebben en de RLS open staat, kan de client-side Supabase client direct queries uitvoeren.

---

## Stap 6: Verifiëren

Na het bouwen, controleer:

- [ ] `npm run build` slaagt zonder fouten
- [ ] `npm run dev` start zonder fouten
- [ ] Sidebar toont de boomstructuur: H4 → §4.1, §4.2, §4.3, §4.4
- [ ] Per paragraaf het juiste aantal vragen in de badge
- [ ] Klik op §4.1 → toont 3 leerdoelen met in totaal 5 vragen
- [ ] Vraagkaarten tonen alle metadata-badges
- [ ] Klik op een vraagkaart → toont subvragen en detail
- [ ] Vraag 11 (ledlamp) toont de asset-afbeelding
- [ ] Vraag 11 toont het correctievoorschrift en de uitwerking
- [ ] Bloom-kleuren zijn correct (Onthouden=slate, Begrijpen=blauw, Toepassen=groen)
- [ ] Filters werken (bijv. filter op "Toepassen" → toont alleen toepassen-vragen)

---

## Referenties

| Wat | Waar |
|-----|------|
| Volledige datamodel | `docs/datamodel.md` |
| Database schema (SQL) | `supabase/migrations/20260412_fase2_initieel_schema.sql` |
| RLS policies | `supabase/migrations/20260412_fase2b_asset_en_rls.sql` |
| Testdata | `supabase/seed/testdata_h4_elektriciteit.sql` |
| Asset voor testdata | `testdata_asset_ledlamp_figuur3.png` (projectroot) |
| Naamconventies | `docs/conventions.md` |
| Architectuurbeslissingen | `docs/decisions.md` |
| Requirements | `docs/requirements.md` |
| Supabase project | `pjisyzgxelignytnbdgj` |

---

## Conventies (uit `docs/conventions.md`)

- Bestanden: PascalCase voor componenten, camelCase voor utilities
- Server Components als default, `"use client"` alleen als het moet
- Absolute imports via `@/`
- Geen `any`, gebruik `unknown`
- Tailwind voor styling
- TypeScript strict mode
