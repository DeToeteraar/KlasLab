-- =============================================================================
-- KlasLab Vragenbank — Testdata Hoofdstuk 4: Elektriciteit
-- Bron: NOVA NaSk 1/2 HAVO/VWO MAX Release 5.1
-- Doel: Testdata voor interface-ontwikkeling
-- =============================================================================
-- LET OP: De niveaus en vraagtypes zijn al ingevoerd via de SQL-editor.
-- Dit script voegt toe: curriculum, leerdoelen, taxonomie, vragen, subvragen.
-- =============================================================================


-- -----------------------------------------------------------------------------
-- VARIABELEN (gebruik CTE's voor verwijzingen)
-- -----------------------------------------------------------------------------

-- Haal bestaande niveau-id's op
-- (niveaus zijn al ingevoerd: Basisonderwijs, VMBO-b, VMBO-k, VMBO-t, HAVO, VWO)


-- =============================================================================
-- 1. CURRICULUM: Vak, Uitgever, Methode, Editie
-- =============================================================================

insert into vak (id, naam) values
  ('a0000000-0000-0000-0000-000000000001', 'Natuurkunde');

insert into uitgever (id, naam) values
  ('b0000000-0000-0000-0000-000000000001', 'Noordhoff');

insert into methode (id, naam, vak_id, uitgever_id) values
  ('c0000000-0000-0000-0000-000000000001', 'NOVA NaSk 1/2', 'a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001');

insert into editie (id, naam, methode_id) values
  ('d0000000-0000-0000-0000-000000000001', 'MAX Release 5.1', 'c0000000-0000-0000-0000-000000000001');


-- =============================================================================
-- 2. HOOFDSTUK & PARAGRAFEN
-- =============================================================================

insert into hoofdstuk (id, titel, nummer, volgorde, editie_id) values
  ('e0000000-0000-0000-0000-000000000004', 'Elektriciteit', 4, 4, 'd0000000-0000-0000-0000-000000000001');

insert into paragraaf (id, titel, nummer, volgorde, hoofdstuk_id) values
  ('f0000000-0000-0000-0000-000000000401', 'Een stroomkring maken', 1, 1, 'e0000000-0000-0000-0000-000000000004'),
  ('f0000000-0000-0000-0000-000000000402', 'Spanningsbronnen', 2, 2, 'e0000000-0000-0000-0000-000000000004'),
  ('f0000000-0000-0000-0000-000000000403', 'Schakelingen', 3, 3, 'e0000000-0000-0000-0000-000000000004'),
  ('f0000000-0000-0000-0000-000000000404', 'Vermogen en energie', 4, 4, 'e0000000-0000-0000-0000-000000000004');


-- =============================================================================
-- 3. TAXONOMIE: Bloom
-- =============================================================================

insert into taxonomiesysteem (id, naam) values
  ('10000000-0000-0000-0000-000000000001', 'Bloom');

insert into taxonomielabel (id, naam, taxonomiesysteem_id) values
  ('11000000-0000-0000-0000-000000000001', 'Onthouden', '10000000-0000-0000-0000-000000000001'),
  ('11000000-0000-0000-0000-000000000002', 'Begrijpen', '10000000-0000-0000-0000-000000000001'),
  ('11000000-0000-0000-0000-000000000003', 'Toepassen', '10000000-0000-0000-0000-000000000001'),
  ('11000000-0000-0000-0000-000000000004', 'Analyseren', '10000000-0000-0000-0000-000000000001');


-- =============================================================================
-- 4. ONDERWERPEN
-- =============================================================================

insert into onderwerp (id, naam, ouder_id) values
  ('12000000-0000-0000-0000-000000000001', 'Elektriciteit', null),
  ('12000000-0000-0000-0000-000000000002', 'Stroomkringen', '12000000-0000-0000-0000-000000000001'),
  ('12000000-0000-0000-0000-000000000003', 'Spanningsbronnen', '12000000-0000-0000-0000-000000000001'),
  ('12000000-0000-0000-0000-000000000004', 'Schakelingen', '12000000-0000-0000-0000-000000000001'),
  ('12000000-0000-0000-0000-000000000005', 'Vermogen en energie', '12000000-0000-0000-0000-000000000001');


-- =============================================================================
-- 5. KERNLEERDOELEN
-- =============================================================================

-- §4.1 kernleerdoelen
insert into leerdoel_kern (id, omschrijving) values
  ('20000000-0000-0000-0000-000000000101', 'De leerling kan uitleggen hoe een gesloten stroomkring werkt'),
  ('20000000-0000-0000-0000-000000000102', 'De leerling kan onderdelen van een stroomkring benoemen'),
  ('20000000-0000-0000-0000-000000000103', 'De leerling kan het verschil tussen geleiders en isolatoren beschrijven'),
  ('20000000-0000-0000-0000-000000000104', 'De leerling kan geleiders en isolatoren benoemen'),
  ('20000000-0000-0000-0000-000000000105', 'De leerling kan uitleggen hoe de stroomsterkte wordt gemeten'),
  ('20000000-0000-0000-0000-000000000106', 'De leerling kan uitleggen wat een led is en hoe deze werkt');

-- §4.2 kernleerdoelen
insert into leerdoel_kern (id, omschrijving) values
  ('20000000-0000-0000-0000-000000000201', 'De leerling kan spanningsbronnen noemen'),
  ('20000000-0000-0000-0000-000000000202', 'De leerling kan uitleggen wat spanning is'),
  ('20000000-0000-0000-0000-000000000203', 'De leerling kan beschrijven hoe spanning wordt gemeten'),
  ('20000000-0000-0000-0000-000000000204', 'De leerling kan uitleggen wat stroomsterkte is'),
  ('20000000-0000-0000-0000-000000000205', 'De leerling kan de spanning berekenen als batterijen in serie zijn geschakeld'),
  ('20000000-0000-0000-0000-000000000206', 'De leerling kent veelvoorkomende spanningsbronnen en kan beoordelen of deze veilig zijn'),
  ('20000000-0000-0000-0000-000000000207', 'De leerling kan beschrijven welke apparaten op een lagere spanning werken'),
  ('20000000-0000-0000-0000-000000000208', 'De leerling kan uitleggen hoe de schadelijkheid van batterijen kan worden verminderd');

-- §4.3 kernleerdoelen
insert into leerdoel_kern (id, omschrijving) values
  ('20000000-0000-0000-0000-000000000301', 'De leerling kan schakelsymbolen benoemen en gebruiken in een schakelschema'),
  ('20000000-0000-0000-0000-000000000302', 'De leerling kan het verschil uitleggen tussen een serie- en parallelschakeling'),
  ('20000000-0000-0000-0000-000000000303', 'De leerling kan het schakelschema tekenen van eenvoudige serie- en parallelschakelingen'),
  ('20000000-0000-0000-0000-000000000304', 'De leerling kan uitleggen waarom elektrische apparaten bijna altijd parallel geschakeld worden'),
  ('20000000-0000-0000-0000-000000000305', 'De leerling kan de stroomsterkte beredeneren in een schakeling'),
  ('20000000-0000-0000-0000-000000000306', 'De leerling kan een gemengde schakeling beschrijven');

-- §4.4 kernleerdoelen
insert into leerdoel_kern (id, omschrijving) values
  ('20000000-0000-0000-0000-000000000401', 'De leerling kan uitleggen wat het vermogen van een apparaat is'),
  ('20000000-0000-0000-0000-000000000402', 'De leerling kan het vermogen van een apparaat berekenen'),
  ('20000000-0000-0000-0000-000000000403', 'De leerling kan uitleggen waarom een apparaat met groter vermogen meer energie verbruikt'),
  ('20000000-0000-0000-0000-000000000404', 'De leerling kan twee manieren beschrijven waarmee je kunt meten hoe leeg of vol een batterij is');


-- =============================================================================
-- 6. METHODE-LEERDOELEN (gekoppeld aan paragraaf + kernleerdoel)
-- =============================================================================

-- §4.1 methode-leerdoelen
insert into leerdoel_methode (id, omschrijving, paragraaf_id, leerdoel_kern_id) values
  ('30000000-0000-0000-0000-000000000101', '4.1.1 Je kunt uitleggen hoe je een gesloten stroomkring maakt.', 'f0000000-0000-0000-0000-000000000401', '20000000-0000-0000-0000-000000000101'),
  ('30000000-0000-0000-0000-000000000102', '4.1.2 Je kunt de verschillende onderdelen van een stroomkring benoemen.', 'f0000000-0000-0000-0000-000000000401', '20000000-0000-0000-0000-000000000102'),
  ('30000000-0000-0000-0000-000000000103', '4.1.3 Je kunt het verschil tussen geleiders en isolatoren beschrijven.', 'f0000000-0000-0000-0000-000000000401', '20000000-0000-0000-0000-000000000103'),
  ('30000000-0000-0000-0000-000000000104', '4.1.4 Je kunt een aantal geleiders en isolatoren benoemen.', 'f0000000-0000-0000-0000-000000000401', '20000000-0000-0000-0000-000000000104'),
  ('30000000-0000-0000-0000-000000000105', '4.1.5 Je kunt uitleggen op welke manier je de stroomsterkte meet.', 'f0000000-0000-0000-0000-000000000401', '20000000-0000-0000-0000-000000000105'),
  ('30000000-0000-0000-0000-000000000106', '4.1.6 Je kunt uitleggen wat een led is en hoe een led werkt.', 'f0000000-0000-0000-0000-000000000401', '20000000-0000-0000-0000-000000000106');

-- §4.2 methode-leerdoelen
insert into leerdoel_methode (id, omschrijving, paragraaf_id, leerdoel_kern_id) values
  ('30000000-0000-0000-0000-000000000201', '4.2.1 Je kunt een aantal spanningsbronnen noemen.', 'f0000000-0000-0000-0000-000000000402', '20000000-0000-0000-0000-000000000201'),
  ('30000000-0000-0000-0000-000000000202', '4.2.2 Je kunt uitleggen wat spanning is.', 'f0000000-0000-0000-0000-000000000402', '20000000-0000-0000-0000-000000000202'),
  ('30000000-0000-0000-0000-000000000203', '4.2.3 Je kunt beschrijven hoe je spanning meet.', 'f0000000-0000-0000-0000-000000000402', '20000000-0000-0000-0000-000000000203'),
  ('30000000-0000-0000-0000-000000000204', '4.2.4 Je kunt uitleggen wat stroomsterkte is.', 'f0000000-0000-0000-0000-000000000402', '20000000-0000-0000-0000-000000000204'),
  ('30000000-0000-0000-0000-000000000205', '4.2.5 Je kunt de spanning berekenen als je batterijen in serie schakelt.', 'f0000000-0000-0000-0000-000000000402', '20000000-0000-0000-0000-000000000205'),
  ('30000000-0000-0000-0000-000000000206', '4.2.6 Je kunt van enkele veelvoorkomende spanningsbronnen aangeven of deze veilig of onveilig zijn.', 'f0000000-0000-0000-0000-000000000402', '20000000-0000-0000-0000-000000000206'),
  ('30000000-0000-0000-0000-000000000207', '4.2.7 Je kunt beschrijven wat je nodig hebt om apparaten die op een lagere spanning werken op een stopcontact te kunnen aansluiten.', 'f0000000-0000-0000-0000-000000000402', '20000000-0000-0000-0000-000000000207'),
  ('30000000-0000-0000-0000-000000000208', '4.2.8 Je kunt uitleggen op welke manieren je de schadelijkheid van het gebruik van batterijen kunt verminderen.', 'f0000000-0000-0000-0000-000000000402', '20000000-0000-0000-0000-000000000208');

-- §4.3 methode-leerdoelen
insert into leerdoel_methode (id, omschrijving, paragraaf_id, leerdoel_kern_id) values
  ('30000000-0000-0000-0000-000000000301', '4.3.1 Je kunt de symbolen benoemen die je gebruikt om een schakelschema te maken.', 'f0000000-0000-0000-0000-000000000403', '20000000-0000-0000-0000-000000000301'),
  ('30000000-0000-0000-0000-000000000302', '4.3.2 Je kunt het verschil uitleggen tussen een serie- en parallelschakeling.', 'f0000000-0000-0000-0000-000000000403', '20000000-0000-0000-0000-000000000302'),
  ('30000000-0000-0000-0000-000000000303', '4.3.3 Je kunt het schakelschema tekenen van eenvoudige serie- en parallelschakelingen.', 'f0000000-0000-0000-0000-000000000403', '20000000-0000-0000-0000-000000000303'),
  ('30000000-0000-0000-0000-000000000304', '4.3.4 Je kunt uitleggen waarom elektrische apparaten bijna altijd parallel geschakeld worden.', 'f0000000-0000-0000-0000-000000000403', '20000000-0000-0000-0000-000000000304'),
  ('30000000-0000-0000-0000-000000000305', '4.3.5 Je kunt de grootte van de stroomsterkte beredeneren in een schakeling.', 'f0000000-0000-0000-0000-000000000403', '20000000-0000-0000-0000-000000000305'),
  ('30000000-0000-0000-0000-000000000306', '4.3.6 Je kunt een gemengde schakeling beschrijven.', 'f0000000-0000-0000-0000-000000000403', '20000000-0000-0000-0000-000000000306');

-- §4.4 methode-leerdoelen
insert into leerdoel_methode (id, omschrijving, paragraaf_id, leerdoel_kern_id) values
  ('30000000-0000-0000-0000-000000000401', '4.4.1 Je kunt uitleggen wat het vermogen van een apparaat is.', 'f0000000-0000-0000-0000-000000000404', '20000000-0000-0000-0000-000000000401'),
  ('30000000-0000-0000-0000-000000000402', '4.4.2 Je kunt het vermogen van een apparaat berekenen.', 'f0000000-0000-0000-0000-000000000404', '20000000-0000-0000-0000-000000000402'),
  ('30000000-0000-0000-0000-000000000403', '4.4.3 Je kunt uitleggen waarom een apparaat met een groter vermogen meer elektrische energie verbruikt.', 'f0000000-0000-0000-0000-000000000404', '20000000-0000-0000-0000-000000000403'),
  ('30000000-0000-0000-0000-000000000404', '4.4.4 Je kunt twee manieren beschrijven waarmee je kunt meten hoe leeg of vol een batterij is.', 'f0000000-0000-0000-0000-000000000404', '20000000-0000-0000-0000-000000000404');


-- =============================================================================
-- 7. KERNLEERDOEL ↔ ONDERWERP KOPPELINGEN
-- =============================================================================

-- §4.1 kernleerdoelen → Stroomkringen
insert into leerdoel_kern_onderwerp (leerdoel_kern_id, onderwerp_id) values
  ('20000000-0000-0000-0000-000000000101', '12000000-0000-0000-0000-000000000002'),
  ('20000000-0000-0000-0000-000000000102', '12000000-0000-0000-0000-000000000002'),
  ('20000000-0000-0000-0000-000000000103', '12000000-0000-0000-0000-000000000002'),
  ('20000000-0000-0000-0000-000000000104', '12000000-0000-0000-0000-000000000002'),
  ('20000000-0000-0000-0000-000000000105', '12000000-0000-0000-0000-000000000002'),
  ('20000000-0000-0000-0000-000000000106', '12000000-0000-0000-0000-000000000002');

-- §4.2 kernleerdoelen → Spanningsbronnen
insert into leerdoel_kern_onderwerp (leerdoel_kern_id, onderwerp_id) values
  ('20000000-0000-0000-0000-000000000201', '12000000-0000-0000-0000-000000000003'),
  ('20000000-0000-0000-0000-000000000202', '12000000-0000-0000-0000-000000000003'),
  ('20000000-0000-0000-0000-000000000203', '12000000-0000-0000-0000-000000000003'),
  ('20000000-0000-0000-0000-000000000204', '12000000-0000-0000-0000-000000000003'),
  ('20000000-0000-0000-0000-000000000205', '12000000-0000-0000-0000-000000000003'),
  ('20000000-0000-0000-0000-000000000206', '12000000-0000-0000-0000-000000000003'),
  ('20000000-0000-0000-0000-000000000207', '12000000-0000-0000-0000-000000000003'),
  ('20000000-0000-0000-0000-000000000208', '12000000-0000-0000-0000-000000000003');

-- §4.3 kernleerdoelen → Schakelingen
insert into leerdoel_kern_onderwerp (leerdoel_kern_id, onderwerp_id) values
  ('20000000-0000-0000-0000-000000000301', '12000000-0000-0000-0000-000000000004'),
  ('20000000-0000-0000-0000-000000000302', '12000000-0000-0000-0000-000000000004'),
  ('20000000-0000-0000-0000-000000000303', '12000000-0000-0000-0000-000000000004'),
  ('20000000-0000-0000-0000-000000000304', '12000000-0000-0000-0000-000000000004'),
  ('20000000-0000-0000-0000-000000000305', '12000000-0000-0000-0000-000000000004'),
  ('20000000-0000-0000-0000-000000000306', '12000000-0000-0000-0000-000000000004');

-- §4.4 kernleerdoelen → Vermogen en energie
insert into leerdoel_kern_onderwerp (leerdoel_kern_id, onderwerp_id) values
  ('20000000-0000-0000-0000-000000000401', '12000000-0000-0000-0000-000000000005'),
  ('20000000-0000-0000-0000-000000000402', '12000000-0000-0000-0000-000000000005'),
  ('20000000-0000-0000-0000-000000000403', '12000000-0000-0000-0000-000000000005'),
  ('20000000-0000-0000-0000-000000000404', '12000000-0000-0000-0000-000000000005');


-- =============================================================================
-- 8. KERNLEERDOEL ↔ NIVEAU + LEERJAAR
-- =============================================================================

-- Alle kernleerdoelen van H4 zijn voor HAVO leerjaar 2 en VWO leerjaar 2
-- Eerst de niveau-id's ophalen
do $$
declare
  v_havo_id uuid;
  v_vwo_id uuid;
  v_kern_id uuid;
begin
  select id into v_havo_id from niveau where naam = 'HAVO';
  select id into v_vwo_id from niveau where naam = 'VWO';

  for v_kern_id in
    select id from leerdoel_kern
    where id::text like '20000000-0000-0000-0000-0000000001%'
       or id::text like '20000000-0000-0000-0000-0000000002%'
       or id::text like '20000000-0000-0000-0000-0000000003%'
       or id::text like '20000000-0000-0000-0000-0000000004%'
  loop
    insert into leerdoel_kern_niveau_leerjaar (leerdoel_kern_id, niveau_id, leerjaar)
    values (v_kern_id, v_havo_id, 2), (v_kern_id, v_vwo_id, 2)
    on conflict do nothing;
  end loop;
end $$;


-- =============================================================================
-- 9. PARAGRAAF ↔ ONDERWERP KOPPELINGEN
-- =============================================================================

insert into paragraaf_onderwerp (paragraaf_id, onderwerp_id) values
  ('f0000000-0000-0000-0000-000000000401', '12000000-0000-0000-0000-000000000002'),
  ('f0000000-0000-0000-0000-000000000402', '12000000-0000-0000-0000-000000000003'),
  ('f0000000-0000-0000-0000-000000000403', '12000000-0000-0000-0000-000000000004'),
  ('f0000000-0000-0000-0000-000000000404', '12000000-0000-0000-0000-000000000005');


-- =============================================================================
-- 10. VRAGEN
-- =============================================================================

-- Haal vraagtype-id's op via variabelen
do $$
declare
  vt_open uuid;
  vt_invul uuid;
  vt_berekening uuid;
  v_havo_id uuid;
  v_vwo_id uuid;
  bloom_onthouden uuid := '11000000-0000-0000-0000-000000000001';
  bloom_begrijpen uuid := '11000000-0000-0000-0000-000000000002';
  bloom_toepassen uuid := '11000000-0000-0000-0000-000000000003';
begin
  select id into vt_open from vraagtype where naam = 'open';
  select id into vt_invul from vraagtype where naam = 'invul';
  select id into vt_berekening from vraagtype where naam = 'berekening';
  select id into v_havo_id from niveau where naam = 'HAVO';
  select id into v_vwo_id from niveau where naam = 'VWO';

  -- =========================================================================
  -- VRAAG 1: §4.1 Opgave 1 — Leerstof, Onthouden
  -- "Beantwoord de volgende vragen."
  -- =========================================================================
  insert into vraag (id, vraagtype_id, vraag_tekst, aantal_punten, status, gemaakt_door, versie)
  values ('40000000-0000-0000-0000-000000000001', vt_open,
    'Beantwoord de volgende vragen over stroomkringen.',
    4, 'concept', 'mens', 1);

  insert into subvraag (id, vraag_id, label, volgorde, vraag_tekst, aantal_punten) values
    ('50000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000001', 'a', 1, 'Wat moet je doen om een klein lampje te laten branden op een batterij?', 1),
    ('50000000-0000-0000-0000-000000000002', '40000000-0000-0000-0000-000000000001', 'b', 2, 'Welke groep stoffen bestaat volledig uit goede geleiders van elektriciteit?', 1),
    ('50000000-0000-0000-0000-000000000003', '40000000-0000-0000-0000-000000000001', 'c', 3, 'Hoe noem je stoffen die een elektrische stroom niet of heel slecht doorlaten?', 1),
    ('50000000-0000-0000-0000-000000000004', '40000000-0000-0000-0000-000000000001', 'd', 4, 'Yasmine heeft een stroomkring gemaakt waarin ze een lampje in en uit kan schakelen. Noem de drie onderdelen (naast het lampje) die Yasmine zeker in de schakeling heeft moeten opnemen.', 1);

  insert into vraag_leerdoel_kern (vraag_id, leerdoel_kern_id) values
    ('40000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000101'),
    ('40000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000102'),
    ('40000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000103');
  insert into vraag_taxonomielabel (vraag_id, taxonomielabel_id) values
    ('40000000-0000-0000-0000-000000000001', bloom_onthouden);
  insert into vraag_onderwerp (vraag_id, onderwerp_id) values
    ('40000000-0000-0000-0000-000000000001', '12000000-0000-0000-0000-000000000002');
  insert into vraag_niveau_leerjaar (vraag_id, niveau_id, leerjaar) values
    ('40000000-0000-0000-0000-000000000001', v_havo_id, 2),
    ('40000000-0000-0000-0000-000000000001', v_vwo_id, 2);


  -- =========================================================================
  -- VRAAG 2: §4.1 Opgave 2 — Leerstof, Onthouden (invul)
  -- "Vul in."
  -- =========================================================================
  insert into vraag (id, vraagtype_id, vraag_tekst, aantal_punten, status, gemaakt_door, versie)
  values ('40000000-0000-0000-0000-000000000002', vt_invul,
    'Vul in.',
    3, 'concept', 'mens', 1);

  insert into subvraag (id, vraag_id, label, volgorde, vraag_tekst, aantal_punten) values
    ('50000000-0000-0000-0000-000000000005', '40000000-0000-0000-0000-000000000002', 'a', 1, 'Een elektrische stroom bestaat uit ___ die door ___ materialen beweegt.', 1),
    ('50000000-0000-0000-0000-000000000006', '40000000-0000-0000-0000-000000000002', 'b', 2, 'Met een ___ kun je meten hoe groot de stroomsterkte in een stroomkring is.', 1),
    ('50000000-0000-0000-0000-000000000007', '40000000-0000-0000-0000-000000000002', 'c', 3, 'De sterkte van de elektrische stroom wordt gemeten in ___, afgekort met de letter ___.', 1);

  insert into vraag_leerdoel_kern (vraag_id, leerdoel_kern_id) values
    ('40000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000101'),
    ('40000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000105');
  insert into vraag_taxonomielabel (vraag_id, taxonomielabel_id) values
    ('40000000-0000-0000-0000-000000000002', bloom_onthouden);
  insert into vraag_onderwerp (vraag_id, onderwerp_id) values
    ('40000000-0000-0000-0000-000000000002', '12000000-0000-0000-0000-000000000002');
  insert into vraag_niveau_leerjaar (vraag_id, niveau_id, leerjaar) values
    ('40000000-0000-0000-0000-000000000002', v_havo_id, 2),
    ('40000000-0000-0000-0000-000000000002', v_vwo_id, 2);


  -- =========================================================================
  -- VRAAG 3: §4.1 Opgave 3 — Leerstof, Begrijpen
  -- "Welke van deze stoffen zijn geleiders?"
  -- =========================================================================
  insert into vraag (id, vraagtype_id, vraag_tekst, aantal_punten, status, gemaakt_door, versie)
  values ('40000000-0000-0000-0000-000000000003', vt_open,
    'Welke van deze stoffen zijn geleiders? glas – ijzer – koper – lucht – plastic – rubber',
    1, 'concept', 'mens', 1);

  insert into vraag_leerdoel_kern (vraag_id, leerdoel_kern_id) values
    ('40000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000104');
  insert into vraag_taxonomielabel (vraag_id, taxonomielabel_id) values
    ('40000000-0000-0000-0000-000000000003', bloom_begrijpen);
  insert into vraag_onderwerp (vraag_id, onderwerp_id) values
    ('40000000-0000-0000-0000-000000000003', '12000000-0000-0000-0000-000000000002');
  insert into vraag_niveau_leerjaar (vraag_id, niveau_id, leerjaar) values
    ('40000000-0000-0000-0000-000000000003', v_havo_id, 2),
    ('40000000-0000-0000-0000-000000000003', v_vwo_id, 2);


  -- =========================================================================
  -- VRAAG 4: §4.1 Opgave 7 — Toepassing, Berekening
  -- "Bereken. (mA omrekenen naar A en andersom)"
  -- =========================================================================
  insert into vraag (id, vraagtype_id, vraag_tekst, aantal_punten, status, gemaakt_door, versie)
  values ('40000000-0000-0000-0000-000000000004', vt_berekening,
    'Bereken.',
    10, 'concept', 'mens', 1);

  insert into subvraag (id, vraag_id, label, volgorde, vraag_tekst, aantal_punten) values
    ('50000000-0000-0000-0000-000000000008', '40000000-0000-0000-0000-000000000004', 'a', 1, '37 mA = ___ A', 1),
    ('50000000-0000-0000-0000-000000000009', '40000000-0000-0000-0000-000000000004', 'b', 2, '452 mA = ___ A', 1),
    ('50000000-0000-0000-0000-000000000010', '40000000-0000-0000-0000-000000000004', 'c', 3, '0,250 A = ___ mA', 1),
    ('50000000-0000-0000-0000-000000000011', '40000000-0000-0000-0000-000000000004', 'd', 4, '0,032 A = ___ mA', 1),
    ('50000000-0000-0000-0000-000000000012', '40000000-0000-0000-0000-000000000004', 'e', 5, '3 mA = ___ A', 1),
    ('50000000-0000-0000-0000-000000000013', '40000000-0000-0000-0000-000000000004', 'f', 6, '950 mA = ___ A', 1),
    ('50000000-0000-0000-0000-000000000014', '40000000-0000-0000-0000-000000000004', 'g', 7, '0,072 A = ___ mA', 1),
    ('50000000-0000-0000-0000-000000000015', '40000000-0000-0000-0000-000000000004', 'h', 8, '0,008 A = ___ mA', 1),
    ('50000000-0000-0000-0000-000000000016', '40000000-0000-0000-0000-000000000004', 'i', 9, '1282 mA = ___ A', 1),
    ('50000000-0000-0000-0000-000000000017', '40000000-0000-0000-0000-000000000004', 'j', 10, '0,125 A = ___ mA', 1);

  insert into vraag_leerdoel_kern (vraag_id, leerdoel_kern_id) values
    ('40000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000105');
  insert into vraag_taxonomielabel (vraag_id, taxonomielabel_id) values
    ('40000000-0000-0000-0000-000000000004', bloom_toepassen);
  insert into vraag_onderwerp (vraag_id, onderwerp_id) values
    ('40000000-0000-0000-0000-000000000004', '12000000-0000-0000-0000-000000000002');
  insert into vraag_niveau_leerjaar (vraag_id, niveau_id, leerjaar) values
    ('40000000-0000-0000-0000-000000000004', v_havo_id, 2),
    ('40000000-0000-0000-0000-000000000004', v_vwo_id, 2);


  -- =========================================================================
  -- VRAAG 5: §4.1 Opgave 8 — Toepassing, Begrijpen
  -- "Leg uit of lucht een geleider of isolator is."
  -- =========================================================================
  insert into vraag (id, vraagtype_id, vraag_tekst, aantal_punten, status, gemaakt_door, versie)
  values ('40000000-0000-0000-0000-000000000005', vt_open,
    'Als je een lichtschakelaar op UIT zet, wordt de stroomkring verbroken. Tussen de geleidende delen van de schakelaar zit dan lucht. Leg uit hoe je hieruit kunt concluderen of lucht een geleider of een isolator is.',
    2, 'concept', 'mens', 1);

  insert into vraag_leerdoel_kern (vraag_id, leerdoel_kern_id) values
    ('40000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000103');
  insert into vraag_taxonomielabel (vraag_id, taxonomielabel_id) values
    ('40000000-0000-0000-0000-000000000005', bloom_begrijpen);
  insert into vraag_onderwerp (vraag_id, onderwerp_id) values
    ('40000000-0000-0000-0000-000000000005', '12000000-0000-0000-0000-000000000002');
  insert into vraag_niveau_leerjaar (vraag_id, niveau_id, leerjaar) values
    ('40000000-0000-0000-0000-000000000005', v_havo_id, 2),
    ('40000000-0000-0000-0000-000000000005', v_vwo_id, 2);


  -- =========================================================================
  -- VRAAG 6: §4.2 Opgave 1 — Leerstof, Onthouden
  -- "Beantwoord de volgende vragen."
  -- =========================================================================
  insert into vraag (id, vraagtype_id, vraag_tekst, aantal_punten, status, gemaakt_door, versie)
  values ('40000000-0000-0000-0000-000000000006', vt_open,
    'Beantwoord de volgende vragen over spanningsbronnen.',
    4, 'concept', 'mens', 1);

  insert into subvraag (id, vraag_id, label, volgorde, vraag_tekst, aantal_punten) values
    ('50000000-0000-0000-0000-000000000018', '40000000-0000-0000-0000-000000000006', 'a', 1, 'Welke vier soorten spanningsbronnen worden in deze paragraaf genoemd?', 1),
    ('50000000-0000-0000-0000-000000000019', '40000000-0000-0000-0000-000000000006', 'b', 2, 'Hoe kun je de spanning uitrekenen van vier in serie geschakelde batterijen?', 1),
    ('50000000-0000-0000-0000-000000000020', '40000000-0000-0000-0000-000000000006', 'c', 3, 'Waarom moeten apparaten die op 230 V werken, goed geïsoleerd worden?', 1),
    ('50000000-0000-0000-0000-000000000021', '40000000-0000-0000-0000-000000000006', 'd', 4, 'Wat heb je nodig om de netspanning om te zetten in een lagere spanning?', 1);

  insert into vraag_leerdoel_kern (vraag_id, leerdoel_kern_id) values
    ('40000000-0000-0000-0000-000000000006', '20000000-0000-0000-0000-000000000201'),
    ('40000000-0000-0000-0000-000000000006', '20000000-0000-0000-0000-000000000205'),
    ('40000000-0000-0000-0000-000000000006', '20000000-0000-0000-0000-000000000206');
  insert into vraag_taxonomielabel (vraag_id, taxonomielabel_id) values
    ('40000000-0000-0000-0000-000000000006', bloom_onthouden);
  insert into vraag_onderwerp (vraag_id, onderwerp_id) values
    ('40000000-0000-0000-0000-000000000006', '12000000-0000-0000-0000-000000000003');
  insert into vraag_niveau_leerjaar (vraag_id, niveau_id, leerjaar) values
    ('40000000-0000-0000-0000-000000000006', v_havo_id, 2),
    ('40000000-0000-0000-0000-000000000006', v_vwo_id, 2);


  -- =========================================================================
  -- VRAAG 7: §4.2 Opgave 3 — Leerstof, Onthouden (invul)
  -- "Vul in."
  -- =========================================================================
  insert into vraag (id, vraagtype_id, vraag_tekst, aantal_punten, status, gemaakt_door, versie)
  values ('40000000-0000-0000-0000-000000000007', vt_invul,
    'Vul in.',
    4, 'concept', 'mens', 1);

  insert into subvraag (id, vraag_id, label, volgorde, vraag_tekst, aantal_punten) values
    ('50000000-0000-0000-0000-000000000022', '40000000-0000-0000-0000-000000000007', 'a', 1, 'Met een ___ kun je meten hoeveel spanning een spanningsbron levert.', 1),
    ('50000000-0000-0000-0000-000000000023', '40000000-0000-0000-0000-000000000007', 'b', 2, 'De grootte van de spanning wordt gemeten in ___, afgekort met de letter ___.', 1),
    ('50000000-0000-0000-0000-000000000024', '40000000-0000-0000-0000-000000000007', 'c', 3, 'In Nederland is de ___ (de spanning die op de stopcontacten staat) 230 V.', 1),
    ('50000000-0000-0000-0000-000000000025', '40000000-0000-0000-0000-000000000007', 'd', 4, 'Een bruikbare vuistregel is dat spanningen tot ___ V geen risico opleveren.', 1);

  insert into vraag_leerdoel_kern (vraag_id, leerdoel_kern_id) values
    ('40000000-0000-0000-0000-000000000007', '20000000-0000-0000-0000-000000000202'),
    ('40000000-0000-0000-0000-000000000007', '20000000-0000-0000-0000-000000000203');
  insert into vraag_taxonomielabel (vraag_id, taxonomielabel_id) values
    ('40000000-0000-0000-0000-000000000007', bloom_onthouden);
  insert into vraag_onderwerp (vraag_id, onderwerp_id) values
    ('40000000-0000-0000-0000-000000000007', '12000000-0000-0000-0000-000000000003');
  insert into vraag_niveau_leerjaar (vraag_id, niveau_id, leerjaar) values
    ('40000000-0000-0000-0000-000000000007', v_havo_id, 2),
    ('40000000-0000-0000-0000-000000000007', v_vwo_id, 2);


  -- =========================================================================
  -- VRAAG 8: §4.3 Opgave 1 — Leerstof, Onthouden
  -- "Beantwoord de volgende vragen."
  -- =========================================================================
  insert into vraag (id, vraagtype_id, vraag_tekst, aantal_punten, status, gemaakt_door, versie)
  values ('40000000-0000-0000-0000-000000000008', vt_open,
    'Beantwoord de volgende vragen over schakelingen.',
    4, 'concept', 'mens', 1);

  insert into subvraag (id, vraag_id, label, volgorde, vraag_tekst, aantal_punten) values
    ('50000000-0000-0000-0000-000000000026', '40000000-0000-0000-0000-000000000008', 'a', 1, 'Hoe moet je lampen schakelen om je apart aan en uit te kunnen zetten? In serie of parallel?', 1),
    ('50000000-0000-0000-0000-000000000027', '40000000-0000-0000-0000-000000000008', 'b', 2, 'In welk soort schakeling is de stroomsterkte op alle plaatsen even groot?', 1),
    ('50000000-0000-0000-0000-000000000028', '40000000-0000-0000-0000-000000000008', 'c', 3, 'Waarom worden elektrische apparaten bijna altijd parallel geschakeld?', 1),
    ('50000000-0000-0000-0000-000000000029', '40000000-0000-0000-0000-000000000008', 'd', 4, 'Wat wordt bedoeld met de totale stroomsterkte in een parallelschakeling?', 1);

  insert into vraag_leerdoel_kern (vraag_id, leerdoel_kern_id) values
    ('40000000-0000-0000-0000-000000000008', '20000000-0000-0000-0000-000000000302'),
    ('40000000-0000-0000-0000-000000000008', '20000000-0000-0000-0000-000000000304'),
    ('40000000-0000-0000-0000-000000000008', '20000000-0000-0000-0000-000000000305');
  insert into vraag_taxonomielabel (vraag_id, taxonomielabel_id) values
    ('40000000-0000-0000-0000-000000000008', bloom_onthouden);
  insert into vraag_onderwerp (vraag_id, onderwerp_id) values
    ('40000000-0000-0000-0000-000000000008', '12000000-0000-0000-0000-000000000004');
  insert into vraag_niveau_leerjaar (vraag_id, niveau_id, leerjaar) values
    ('40000000-0000-0000-0000-000000000008', v_havo_id, 2),
    ('40000000-0000-0000-0000-000000000008', v_vwo_id, 2);


  -- =========================================================================
  -- VRAAG 9: §4.3 Opgave 4 — Toepassing, Toepassen
  -- "Dilano schakelt drie identieke lampjes in serie."
  -- =========================================================================
  insert into vraag (id, vraagtype_id, vraag_tekst, aantal_punten, status, gemaakt_door, versie)
  values ('40000000-0000-0000-0000-000000000009', vt_open,
    'Dilano schakelt drie identieke lampjes in serie. Hij sluit de lampjes daarna aan op een batterij van 9 V.',
    5, 'concept', 'mens', 1);

  insert into subvraag (id, vraag_id, label, volgorde, vraag_tekst, aantal_punten) values
    ('50000000-0000-0000-0000-000000000030', '40000000-0000-0000-0000-000000000009', 'a', 1, 'Beredeneer hoe groot de spanning is die elk lampje dan krijgt.', 1),
    ('50000000-0000-0000-0000-000000000031', '40000000-0000-0000-0000-000000000009', 'b', 2, 'Dilano ziet dat de lampjes maar flauw branden. Zijn docent zegt dat de lampjes beter zullen branden als Dilano de bronspanning verhoogt tot 18 V. "Pak maar een tweede batterij," zegt hij, "daarmee lijkt het wel!" Leg uit hoe Dilano de twee batterijen dan moet schakelen.', 1),
    ('50000000-0000-0000-0000-000000000032', '40000000-0000-0000-0000-000000000009', 'c', 3, 'Op welke spanning brandt elk lampje als de bronspanning 18 V is?', 1),
    ('50000000-0000-0000-0000-000000000033', '40000000-0000-0000-0000-000000000009', 'd', 4, 'In een huiskamer branden twee staande lampen en een bureaulamp, die alle drie zijn aangesloten op een stopcontact. Eén van de staande lampen gaat kapot. Blijft de andere staande lamp branden? ja / nee', 1),
    ('50000000-0000-0000-0000-000000000034', '40000000-0000-0000-0000-000000000009', 'e', 5, 'Blijft de bureaulamp branden? ja / nee. Hoe zijn de stopcontacten in huis dus geschakeld? In serie / parallel?', 1);

  insert into vraag_leerdoel_kern (vraag_id, leerdoel_kern_id) values
    ('40000000-0000-0000-0000-000000000009', '20000000-0000-0000-0000-000000000302'),
    ('40000000-0000-0000-0000-000000000009', '20000000-0000-0000-0000-000000000305');
  insert into vraag_taxonomielabel (vraag_id, taxonomielabel_id) values
    ('40000000-0000-0000-0000-000000000009', bloom_toepassen);
  insert into vraag_onderwerp (vraag_id, onderwerp_id) values
    ('40000000-0000-0000-0000-000000000009', '12000000-0000-0000-0000-000000000004');
  insert into vraag_niveau_leerjaar (vraag_id, niveau_id, leerjaar) values
    ('40000000-0000-0000-0000-000000000009', v_havo_id, 2),
    ('40000000-0000-0000-0000-000000000009', v_vwo_id, 2);


  -- =========================================================================
  -- VRAAG 10: §4.4 Opgave 1 — Leerstof, Onthouden
  -- "Beantwoord de volgende vragen."
  -- =========================================================================
  insert into vraag (id, vraagtype_id, vraag_tekst, aantal_punten, status, gemaakt_door, versie)
  values ('40000000-0000-0000-0000-000000000010', vt_open,
    'Beantwoord de volgende vragen over vermogen en energie.',
    4, 'concept', 'mens', 1);

  insert into subvraag (id, vraag_id, label, volgorde, vraag_tekst, aantal_punten) values
    ('50000000-0000-0000-0000-000000000035', '40000000-0000-0000-0000-000000000010', 'a', 1, 'Van welke factoren hangt het vermogen van een elektrisch apparaat af?', 1),
    ('50000000-0000-0000-0000-000000000036', '40000000-0000-0000-0000-000000000010', 'b', 2, 'Met welke formule kun je het vermogen van zo''n apparaat berekenen?', 1),
    ('50000000-0000-0000-0000-000000000037', '40000000-0000-0000-0000-000000000010', 'c', 3, 'Waarom wordt het vermogen van een telefoon zo laag mogelijk gehouden?', 1),
    ('50000000-0000-0000-0000-000000000038', '40000000-0000-0000-0000-000000000010', 'd', 4, 'Hoe helpt de software van een telefoon om het vermogen laag te houden?', 1);

  insert into vraag_leerdoel_kern (vraag_id, leerdoel_kern_id) values
    ('40000000-0000-0000-0000-000000000010', '20000000-0000-0000-0000-000000000401'),
    ('40000000-0000-0000-0000-000000000010', '20000000-0000-0000-0000-000000000402');
  insert into vraag_taxonomielabel (vraag_id, taxonomielabel_id) values
    ('40000000-0000-0000-0000-000000000010', bloom_onthouden);
  insert into vraag_onderwerp (vraag_id, onderwerp_id) values
    ('40000000-0000-0000-0000-000000000010', '12000000-0000-0000-0000-000000000005');
  insert into vraag_niveau_leerjaar (vraag_id, niveau_id, leerjaar) values
    ('40000000-0000-0000-0000-000000000010', v_havo_id, 2),
    ('40000000-0000-0000-0000-000000000010', v_vwo_id, 2);


  -- =========================================================================
  -- VRAAG 11: §4.4 Voorbeeldopdracht 1 — Toepassing, Toepassen (MET ASSET)
  -- "Controleer of het vermogen van de lamp juist is berekend."
  -- =========================================================================
  insert into vraag (id, vraagtype_id, context_tekst, vraag_tekst, aantal_punten, status, gemaakt_door, versie)
  values ('40000000-0000-0000-0000-000000000011', vt_berekening,
    'Op een website kun je ledlampen kopen voor decoratief gebruik (figuur 3). Controleer of het vermogen van de lamp in figuur 3 juist is berekend.',
    'Gegeven: U = 12 V, I = 220 mA = 0,22 A. Gevraagd: P = ? Bereken het vermogen en controleer of de waarde op de website klopt.',
    2, 'gepubliceerd', 'mens', 1);

  insert into correctievoorschrift (id, vraag_id, tekst) values
    ('60000000-0000-0000-0000-000000000011', '40000000-0000-0000-0000-000000000011',
    'P = U · I = 12 × 0,22 = 2,64 W. Dit klopt met de waarde die op de website vermeld staat (1 punt voor juiste formule, 1 punt voor juiste uitkomst).');

  insert into uitwerking (id, vraag_id, tekst) values
    ('70000000-0000-0000-0000-000000000011', '40000000-0000-0000-0000-000000000011',
    'uitwerking: P = U · I = 12 × 0,22 = 2,64 W. Dit klopt met de waarde die op de website vermeld staat.');

  insert into vraag_leerdoel_kern (vraag_id, leerdoel_kern_id) values
    ('40000000-0000-0000-0000-000000000011', '20000000-0000-0000-0000-000000000402');
  insert into vraag_taxonomielabel (vraag_id, taxonomielabel_id) values
    ('40000000-0000-0000-0000-000000000011', bloom_toepassen);
  insert into vraag_onderwerp (vraag_id, onderwerp_id) values
    ('40000000-0000-0000-0000-000000000011', '12000000-0000-0000-0000-000000000005');
  insert into vraag_niveau_leerjaar (vraag_id, niveau_id, leerjaar) values
    ('40000000-0000-0000-0000-000000000011', v_havo_id, 2),
    ('40000000-0000-0000-0000-000000000011', v_vwo_id, 2);

  -- Asset voor vraag 11 — wordt handmatig geüpload naar Supabase Storage
  -- Bestandsnaam: testdata_asset_ledlamp_figuur3.png (staat in projectroot)
  insert into asset (id, type, bestandsnaam, url, beschrijving) values
    ('80000000-0000-0000-0000-000000000011', 'afbeelding', 'testdata_asset_ledlamp_figuur3.png',
     'afbeeldingen/testdata_asset_ledlamp_figuur3.png',
     'Advertentie van een ledlamp op een website: spanning 12 V, stroom 220 mA, vermogen 2,64 W, prijs € 2,95');

  insert into vraag_asset (vraag_id, asset_id) values
    ('40000000-0000-0000-0000-000000000011', '80000000-0000-0000-0000-000000000011');

end $$;
