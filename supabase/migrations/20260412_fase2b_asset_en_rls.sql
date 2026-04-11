-- =============================================================================
-- KlasLab Vragenbank — Asset type uitbreiding + RLS policies
-- Fase 2b
-- Datum: 2026-04-12
-- =============================================================================


-- -----------------------------------------------------------------------------
-- ASSET TYPE UITBREIDING
-- Audio toegevoegd voor luistertoetsen.
-- YouTube en externe video-URLs worden opgeslagen als tekst in de url-kolom
-- met type 'video' — geen apart bestand in Storage nodig.
-- -----------------------------------------------------------------------------

alter table asset drop constraint asset_type_check;

alter table asset add constraint asset_type_check
  check (type in ('afbeelding', 'grafiek', 'tabel', 'formule', 'video', 'audio'));


-- -----------------------------------------------------------------------------
-- RLS POLICIES
-- Tijdelijke open policy voor ontwikkeling: alle operaties toegestaan.
-- Vervang dit zodra authenticatie en gebruikersrollen zijn ingericht.
-- -----------------------------------------------------------------------------

create policy "ontwikkeling_alles" on vak for all using (true) with check (true);
create policy "ontwikkeling_alles" on uitgever for all using (true) with check (true);
create policy "ontwikkeling_alles" on methode for all using (true) with check (true);
create policy "ontwikkeling_alles" on editie for all using (true) with check (true);
create policy "ontwikkeling_alles" on hoofdstuk for all using (true) with check (true);
create policy "ontwikkeling_alles" on paragraaf for all using (true) with check (true);
create policy "ontwikkeling_alles" on niveau for all using (true) with check (true);
create policy "ontwikkeling_alles" on onderwerp for all using (true) with check (true);
create policy "ontwikkeling_alles" on leerdoel_slo for all using (true) with check (true);
create policy "ontwikkeling_alles" on leerdoel_kern for all using (true) with check (true);
create policy "ontwikkeling_alles" on leerdoel_methode for all using (true) with check (true);
create policy "ontwikkeling_alles" on vaardigheid for all using (true) with check (true);
create policy "ontwikkeling_alles" on taxonomiesysteem for all using (true) with check (true);
create policy "ontwikkeling_alles" on taxonomielabel for all using (true) with check (true);
create policy "ontwikkeling_alles" on vraagtype for all using (true) with check (true);
create policy "ontwikkeling_alles" on vraag for all using (true) with check (true);
create policy "ontwikkeling_alles" on vraag_versie for all using (true) with check (true);
create policy "ontwikkeling_alles" on subvraag for all using (true) with check (true);
create policy "ontwikkeling_alles" on correctievoorschrift for all using (true) with check (true);
create policy "ontwikkeling_alles" on uitwerking for all using (true) with check (true);
create policy "ontwikkeling_alles" on asset for all using (true) with check (true);
create policy "ontwikkeling_alles" on vraag_leerdoel_kern for all using (true) with check (true);
create policy "ontwikkeling_alles" on vraag_onderwerp for all using (true) with check (true);
create policy "ontwikkeling_alles" on vraag_vaardigheid for all using (true) with check (true);
create policy "ontwikkeling_alles" on vraag_taxonomielabel for all using (true) with check (true);
create policy "ontwikkeling_alles" on vraag_niveau_leerjaar for all using (true) with check (true);
create policy "ontwikkeling_alles" on vraag_asset for all using (true) with check (true);
create policy "ontwikkeling_alles" on subvraag_asset for all using (true) with check (true);
create policy "ontwikkeling_alles" on uitwerking_asset for all using (true) with check (true);
create policy "ontwikkeling_alles" on paragraaf_onderwerp for all using (true) with check (true);
create policy "ontwikkeling_alles" on leerdoel_kern_onderwerp for all using (true) with check (true);
create policy "ontwikkeling_alles" on leerdoel_kern_niveau_leerjaar for all using (true) with check (true);
