-- =============================================================================
-- KlasLab Vragenbank — Uitbreiding view vraag_volledig
-- Fase 2c: Paragraaf- en hoofdstuk-informatie toegevoegd voor facetfilter
-- Datum: 2026-04-12
-- =============================================================================
-- Voer dit bestand uit in de Supabase SQL-editor.
-- =============================================================================

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

  -- Kernleerdoelen (tekst)
  array(
    select lk.omschrijving
    from vraag_leerdoel_kern vlk
    join leerdoel_kern lk on vlk.leerdoel_kern_id = lk.id
    where vlk.vraag_id = v.id
  ) as kernleerdoelen,

  -- Kernleerdoel IDs (voor filteren)
  array(
    select vlk.leerdoel_kern_id::text
    from vraag_leerdoel_kern vlk
    where vlk.vraag_id = v.id
  ) as leerdoel_kern_ids,

  -- Methode-leerdoelen (omschrijving — dichter bij de leerling)
  array(
    select distinct lm.omschrijving
    from vraag_leerdoel_kern vlk
    join leerdoel_methode lm on vlk.leerdoel_kern_id = lm.leerdoel_kern_id
    where vlk.vraag_id = v.id
  ) as methode_leerdoelen,

  -- SLO-leerdoelen (via kern)
  array(
    select distinct ls.omschrijving
    from vraag_leerdoel_kern vlk
    join leerdoel_kern lk on vlk.leerdoel_kern_id = lk.id
    join leerdoel_slo ls on lk.leerdoel_slo_id = ls.id
    where vlk.vraag_id = v.id
  ) as slo_leerdoelen,

  -- Paragraaf IDs (voor filteren)
  array(
    select distinct p.id::text
    from vraag_leerdoel_kern vlk
    join leerdoel_methode lm on vlk.leerdoel_kern_id = lm.leerdoel_kern_id
    join paragraaf p on lm.paragraaf_id = p.id
    where vlk.vraag_id = v.id
  ) as paragraaf_ids,

  -- Paragraaf info (voor weergave in sidebar en lijst)
  array(
    select distinct json_build_object('id', p.id, 'titel', p.titel, 'nummer', p.nummer)
    from vraag_leerdoel_kern vlk
    join leerdoel_methode lm on vlk.leerdoel_kern_id = lm.leerdoel_kern_id
    join paragraaf p on lm.paragraaf_id = p.id
    where vlk.vraag_id = v.id
  ) as paragrafen,

  -- Hoofdstuk IDs (voor filteren)
  array(
    select distinct h.id::text
    from vraag_leerdoel_kern vlk
    join leerdoel_methode lm on vlk.leerdoel_kern_id = lm.leerdoel_kern_id
    join paragraaf p on lm.paragraaf_id = p.id
    join hoofdstuk h on p.hoofdstuk_id = h.id
    where vlk.vraag_id = v.id
  ) as hoofdstuk_ids,

  -- Hoofdstuk info (voor weergave in sidebar)
  array(
    select distinct json_build_object('id', h.id, 'titel', h.titel, 'nummer', h.nummer)
    from vraag_leerdoel_kern vlk
    join leerdoel_methode lm on vlk.leerdoel_kern_id = lm.leerdoel_kern_id
    join paragraaf p on lm.paragraaf_id = p.id
    join hoofdstuk h on p.hoofdstuk_id = h.id
    where vlk.vraag_id = v.id
  ) as hoofdstukken,

  -- Onderwerpen
  array(
    select o.naam
    from vraag_onderwerp vo
    join onderwerp o on vo.onderwerp_id = o.id
    where vo.vraag_id = v.id
  ) as onderwerpen,

  -- Taxonomielabels (Bloom etc.)
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
