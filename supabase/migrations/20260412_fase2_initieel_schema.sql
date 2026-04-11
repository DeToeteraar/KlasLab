-- =============================================================================
-- KlasLab Vragenbank — Initieel schema
-- Fase 2: Database opzetten
-- Datum: 2026-04-12
-- =============================================================================
-- Voer dit bestand uit in de Supabase SQL-editor om de volledige
-- databasestructuur aan te maken.
-- =============================================================================


-- -----------------------------------------------------------------------------
-- EXTENSIES
-- -----------------------------------------------------------------------------

-- Vector embeddings voor semantisch zoeken (fase 3+)
create extension if not exists vector;


-- -----------------------------------------------------------------------------
-- CURRICULUM & METHODE
-- -----------------------------------------------------------------------------

create table vak (
  id uuid primary key default gen_random_uuid(),
  naam text not null unique
);

create table uitgever (
  id uuid primary key default gen_random_uuid(),
  naam text not null unique
);

-- Methode behoort aan één vak én één uitgever
create table methode (
  id uuid primary key default gen_random_uuid(),
  naam text not null,
  vak_id uuid not null references vak(id),
  uitgever_id uuid not null references uitgever(id),
  unique(naam, vak_id, uitgever_id)
);

-- Editie is een versie van een methode
create table editie (
  id uuid primary key default gen_random_uuid(),
  naam text not null,
  methode_id uuid not null references methode(id),
  unique(naam, methode_id)
);

-- Hoofdstuk binnen een editie
-- nummer: het boekgetal (optioneel, integer)
-- volgorde: voor sortering (altijd aanwezig)
create table hoofdstuk (
  id uuid primary key default gen_random_uuid(),
  titel text not null,
  nummer integer,
  volgorde integer not null,
  editie_id uuid not null references editie(id)
);

-- Paragraaf binnen een hoofdstuk
create table paragraaf (
  id uuid primary key default gen_random_uuid(),
  titel text not null,
  nummer integer,
  volgorde integer not null,
  hoofdstuk_id uuid not null references hoofdstuk(id)
);


-- -----------------------------------------------------------------------------
-- NIVEAU
-- -----------------------------------------------------------------------------

create table niveau (
  id uuid primary key default gen_random_uuid(),
  naam text not null unique
);

-- Vaste waarden — voer deze in na aanmaken van de tabel:
-- insert into niveau (naam) values
--   ('Basisonderwijs'), ('VMBO-b'), ('VMBO-k'), ('VMBO-t'),
--   ('HAVO'), ('VWO');


-- -----------------------------------------------------------------------------
-- ONDERWERP
-- -----------------------------------------------------------------------------

-- Hiërarchisch via ouder_id — onbeperkt diep
create table onderwerp (
  id uuid primary key default gen_random_uuid(),
  naam text not null,
  ouder_id uuid references onderwerp(id)
);


-- -----------------------------------------------------------------------------
-- LEERDOELEN
-- -----------------------------------------------------------------------------

-- Officieel SLO-leerdoel — optioneel hiërarchisch
create table leerdoel_slo (
  id uuid primary key default gen_random_uuid(),
  omschrijving text not null,
  ouder_id uuid references leerdoel_slo(id)
);

-- Kernleerdoel — spil tussen SLO en methode
-- Optionele FK naar leerdoel_slo: traceerbaar waar het vandaan komt
create table leerdoel_kern (
  id uuid primary key default gen_random_uuid(),
  omschrijving text not null,
  leerdoel_slo_id uuid references leerdoel_slo(id)
);

-- Methode-eigen leerdoel — altijd gekoppeld aan een paragraaf én een kernleerdoel
create table leerdoel_methode (
  id uuid primary key default gen_random_uuid(),
  omschrijving text not null,
  paragraaf_id uuid not null references paragraaf(id),
  leerdoel_kern_id uuid not null references leerdoel_kern(id),
  ouder_id uuid references leerdoel_methode(id)
);

-- Vaardigheid — losstaand, bijv. "formule omschrijven"
create table vaardigheid (
  id uuid primary key default gen_random_uuid(),
  naam text not null unique
);


-- -----------------------------------------------------------------------------
-- TAXONOMIE
-- -----------------------------------------------------------------------------

create table taxonomiesysteem (
  id uuid primary key default gen_random_uuid(),
  naam text not null unique
);

create table taxonomielabel (
  id uuid primary key default gen_random_uuid(),
  naam text not null,
  taxonomiesysteem_id uuid not null references taxonomiesysteem(id),
  unique(naam, taxonomiesysteem_id)
);


-- -----------------------------------------------------------------------------
-- VRAGEN
-- -----------------------------------------------------------------------------

create table vraagtype (
  id uuid primary key default gen_random_uuid(),
  naam text not null unique
);

-- Vaste waarden — voer deze in na aanmaken van de tabel:
-- insert into vraagtype (naam) values
--   ('meerkeuze'), ('open'), ('berekening'), ('waar/onwaar'), ('invul');

create table vraag (
  id uuid primary key default gen_random_uuid(),
  vraagtype_id uuid references vraagtype(id),
  context_tekst text,
  vraag_tekst text not null,
  aantal_punten integer,
  status text not null default 'concept' check (status in ('concept', 'gepubliceerd', 'gearchiveerd')),
  gemaakt_door text not null check (gemaakt_door in ('mens', 'ai')),
  ai_model text,        -- bijv. "claude-sonnet-4-6"
  skill_ref text,       -- verwijzing naar de skill die de vraag heeft gegenereerd
  versie integer not null default 1,
  aangemaakt_op timestamptz not null default now(),
  laatst_gewijzigd timestamptz not null default now(),
  gewijzigd_door text,
  -- Full-text search index (automatisch bijgewerkt bij wijziging van vraag_tekst of context_tekst)
  zoekindex tsvector generated always as (
    to_tsvector('dutch', coalesce(vraag_tekst, '') || ' ' || coalesce(context_tekst, ''))
  ) stored,
  -- Vector embedding voor semantisch zoeken (fase 3+)
  embedding vector(1536)
);

-- Versie-snapshot van een vraag
create table vraag_versie (
  id uuid primary key default gen_random_uuid(),
  vraag_id uuid not null references vraag(id),
  vraag_tekst text not null,
  context_tekst text,
  aantal_punten integer,
  status text,
  gemaakt_door text,
  versie integer not null,
  opgeslagen_op timestamptz not null default now(),
  opgeslagen_door text
);

-- Subvraag onder een hoofdvraag
create table subvraag (
  id uuid primary key default gen_random_uuid(),
  vraag_id uuid not null references vraag(id),
  label text not null,     -- bijv. "a", "b", "c"
  volgorde integer not null,
  context_tekst text,
  vraag_tekst text not null,
  aantal_punten integer
);

-- Correctievoorschrift — alleen tekst, optioneel per vraag
create table correctievoorschrift (
  id uuid primary key default gen_random_uuid(),
  vraag_id uuid not null unique references vraag(id),
  tekst text not null
);

-- Uitwerking — tekst en/of assets, optioneel per vraag
create table uitwerking (
  id uuid primary key default gen_random_uuid(),
  vraag_id uuid not null unique references vraag(id),
  tekst text
);

-- Asset — bestand in Supabase Storage
create table asset (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('afbeelding', 'grafiek', 'tabel', 'formule', 'video')),
  bestandsnaam text not null,
  url text not null,
  beschrijving text
);


-- -----------------------------------------------------------------------------
-- KOPPELTABELLEN
-- -----------------------------------------------------------------------------

-- Vraag ↔ Kernleerdoel (primaire leerdoelkoppeling)
create table vraag_leerdoel_kern (
  vraag_id uuid not null references vraag(id),
  leerdoel_kern_id uuid not null references leerdoel_kern(id),
  primary key (vraag_id, leerdoel_kern_id)
);

-- Vraag ↔ Onderwerp
create table vraag_onderwerp (
  vraag_id uuid not null references vraag(id),
  onderwerp_id uuid not null references onderwerp(id),
  primary key (vraag_id, onderwerp_id)
);

-- Vraag ↔ Vaardigheid
create table vraag_vaardigheid (
  vraag_id uuid not null references vraag(id),
  vaardigheid_id uuid not null references vaardigheid(id),
  primary key (vraag_id, vaardigheid_id)
);

-- Vraag ↔ Taxonomielabel
create table vraag_taxonomielabel (
  vraag_id uuid not null references vraag(id),
  taxonomielabel_id uuid not null references taxonomielabel(id),
  primary key (vraag_id, taxonomielabel_id)
);

-- Vraag ↔ Niveau + Leerjaar (gecombineerd)
create table vraag_niveau_leerjaar (
  vraag_id uuid not null references vraag(id),
  niveau_id uuid not null references niveau(id),
  leerjaar integer not null,
  primary key (vraag_id, niveau_id, leerjaar)
);

-- Vraag ↔ Asset
create table vraag_asset (
  vraag_id uuid not null references vraag(id),
  asset_id uuid not null references asset(id),
  primary key (vraag_id, asset_id)
);

-- Subvraag ↔ Asset
create table subvraag_asset (
  subvraag_id uuid not null references subvraag(id),
  asset_id uuid not null references asset(id),
  primary key (subvraag_id, asset_id)
);

-- Uitwerking ↔ Asset
create table uitwerking_asset (
  uitwerking_id uuid not null references uitwerking(id),
  asset_id uuid not null references asset(id),
  primary key (uitwerking_id, asset_id)
);

-- Paragraaf ↔ Onderwerp
create table paragraaf_onderwerp (
  paragraaf_id uuid not null references paragraaf(id),
  onderwerp_id uuid not null references onderwerp(id),
  primary key (paragraaf_id, onderwerp_id)
);

-- Kernleerdoel ↔ Onderwerp
create table leerdoel_kern_onderwerp (
  leerdoel_kern_id uuid not null references leerdoel_kern(id),
  onderwerp_id uuid not null references onderwerp(id),
  primary key (leerdoel_kern_id, onderwerp_id)
);

-- Kernleerdoel ↔ Niveau + Leerjaar
create table leerdoel_kern_niveau_leerjaar (
  leerdoel_kern_id uuid not null references leerdoel_kern(id),
  niveau_id uuid not null references niveau(id),
  leerjaar integer not null,
  primary key (leerdoel_kern_id, niveau_id, leerjaar)
);


-- -----------------------------------------------------------------------------
-- INDEXEN
-- -----------------------------------------------------------------------------

-- Curriculum hiërarchie
create index on methode(vak_id);
create index on methode(uitgever_id);
create index on editie(methode_id);
create index on hoofdstuk(editie_id);
create index on hoofdstuk(volgorde);
create index on paragraaf(hoofdstuk_id);
create index on paragraaf(volgorde);

-- Leerdoelen
create index on leerdoel_kern(leerdoel_slo_id);
create index on leerdoel_methode(paragraaf_id);
create index on leerdoel_methode(leerdoel_kern_id);
create index on onderwerp(ouder_id);
create index on leerdoel_slo(ouder_id);
create index on leerdoel_methode(ouder_id);

-- Vragen
create index on vraag(status);
create index on vraag using gin(zoekindex);
create index on vraag(gemaakt_door);
create index on subvraag(vraag_id);
create index on subvraag(volgorde);

-- Koppeltabellen
create index on vraag_leerdoel_kern(leerdoel_kern_id);
create index on vraag_onderwerp(onderwerp_id);
create index on vraag_taxonomielabel(taxonomielabel_id);
create index on vraag_niveau_leerjaar(niveau_id);
create index on leerdoel_kern_niveau_leerjaar(niveau_id);


-- -----------------------------------------------------------------------------
-- VIEW: vraag_volledig
-- Haalt een vraag op met alle direct gekoppelde metadata.
-- Gebruik deze view voor AI-queries en applicatie-opvragen.
-- -----------------------------------------------------------------------------

create or replace view vraag_volledig as
select
  v.id,
  v.vraag_tekst,
  v.context_tekst,
  v.aantal_punten,
  v.status,
  v.gemaakt_door,
  v.ai_model,
  v.skill_ref,
  v.versie,
  v.aangemaakt_op,
  vt.naam as vraagtype,
  -- Kernleerdoelen
  array(
    select lk.omschrijving
    from vraag_leerdoel_kern vlk
    join leerdoel_kern lk on vlk.leerdoel_kern_id = lk.id
    where vlk.vraag_id = v.id
  ) as kernleerdoelen,
  -- SLO-leerdoelen (via kern)
  array(
    select distinct ls.omschrijving
    from vraag_leerdoel_kern vlk
    join leerdoel_kern lk on vlk.leerdoel_kern_id = lk.id
    join leerdoel_slo ls on lk.leerdoel_slo_id = ls.id
    where vlk.vraag_id = v.id
  ) as slo_leerdoelen,
  -- Onderwerpen
  array(
    select o.naam
    from vraag_onderwerp vo
    join onderwerp o on vo.onderwerp_id = o.id
    where vo.vraag_id = v.id
  ) as onderwerpen,
  -- Taxonomielabels
  array(
    select tl.naam
    from vraag_taxonomielabel vtl
    join taxonomielabel tl on vtl.taxonomielabel_id = tl.id
    where vtl.vraag_id = v.id
  ) as taxonomielabels,
  -- Niveau + leerjaar
  array(
    select json_build_object('niveau', n.naam, 'leerjaar', vnl.leerjaar)
    from vraag_niveau_leerjaar vnl
    join niveau n on vnl.niveau_id = n.id
    where vnl.vraag_id = v.id
  ) as niveaus
from vraag v
left join vraagtype vt on v.vraagtype_id = vt.id;


-- -----------------------------------------------------------------------------
-- STORAGE BUCKETS
-- Maak deze buckets handmatig aan in het Supabase dashboard na uitvoeren van
-- deze migratie: Storage → New bucket
--
--   afbeeldingen   (private)
--   videos         (private)
--   formules       (private)
--
-- Assets in de database verwijzen via de `url`-kolom naar bestanden in deze buckets.
-- -----------------------------------------------------------------------------


-- -----------------------------------------------------------------------------
-- ROW LEVEL SECURITY
-- RLS is ingeschakeld op alle tabellen.
-- Huidige policy: alleen beheerders hebben toegang.
-- Uitbreiden zodra gebruikersrollen bekend zijn.
-- -----------------------------------------------------------------------------

alter table vak enable row level security;
alter table uitgever enable row level security;
alter table methode enable row level security;
alter table editie enable row level security;
alter table hoofdstuk enable row level security;
alter table paragraaf enable row level security;
alter table niveau enable row level security;
alter table onderwerp enable row level security;
alter table leerdoel_slo enable row level security;
alter table leerdoel_kern enable row level security;
alter table leerdoel_methode enable row level security;
alter table vaardigheid enable row level security;
alter table taxonomiesysteem enable row level security;
alter table taxonomielabel enable row level security;
alter table vraagtype enable row level security;
alter table vraag enable row level security;
alter table vraag_versie enable row level security;
alter table subvraag enable row level security;
alter table correctievoorschrift enable row level security;
alter table uitwerking enable row level security;
alter table asset enable row level security;
alter table vraag_leerdoel_kern enable row level security;
alter table vraag_onderwerp enable row level security;
alter table vraag_vaardigheid enable row level security;
alter table vraag_taxonomielabel enable row level security;
alter table vraag_niveau_leerjaar enable row level security;
alter table vraag_asset enable row level security;
alter table subvraag_asset enable row level security;
alter table uitwerking_asset enable row level security;
alter table paragraaf_onderwerp enable row level security;
alter table leerdoel_kern_onderwerp enable row level security;
alter table leerdoel_kern_niveau_leerjaar enable row level security;

-- Tijdelijke open policy voor beheerder tijdens ontwikkeling.
-- Vervang dit zodra authenticatie is ingericht.
-- create policy "beheerder_alles" on [tabel] for all using (true);
