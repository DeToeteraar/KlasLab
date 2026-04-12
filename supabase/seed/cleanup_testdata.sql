-- =============================================================================
-- KlasLab Vragenbank — Cleanup testdata H4 Elektriciteit
-- Voer dit uit VOORDAT je de seed opnieuw uitvoert.
-- Verwijdert alles in de juiste volgorde (FK-afhankelijkheden eerst).
-- =============================================================================

-- Koppeltabellen eerst (verwijzen naar vragen/assets)
delete from vraag_asset        where asset_id = '80000000-0000-0000-0000-000000000011';
delete from vraag_niveau_leerjaar where vraag_id::text like '40000000-0000-0000-0000-0000000000%';
delete from vraag_taxonomielabel  where vraag_id::text like '40000000-0000-0000-0000-0000000000%';
delete from vraag_onderwerp       where vraag_id::text like '40000000-0000-0000-0000-0000000000%';
delete from vraag_leerdoel_kern   where vraag_id::text like '40000000-0000-0000-0000-0000000000%';

-- Uitwerkingen, correctievoorschriften, subvragen
delete from uitwerking             where vraag_id::text like '40000000-0000-0000-0000-0000000000%';
delete from correctievoorschrift   where vraag_id::text like '40000000-0000-0000-0000-0000000000%';
delete from subvraag               where vraag_id::text like '40000000-0000-0000-0000-0000000000%';

-- Vragen
delete from vraag where id::text like '40000000-0000-0000-0000-0000000000%';

-- Asset
delete from asset where id = '80000000-0000-0000-0000-000000000011';

-- Leerdoel koppelingen
delete from leerdoel_kern_niveau_leerjaar
  where leerdoel_kern_id::text like '20000000-0000-0000-0000-0000000001%'
     or leerdoel_kern_id::text like '20000000-0000-0000-0000-0000000002%'
     or leerdoel_kern_id::text like '20000000-0000-0000-0000-0000000003%'
     or leerdoel_kern_id::text like '20000000-0000-0000-0000-0000000004%';

delete from leerdoel_kern_onderwerp
  where leerdoel_kern_id::text like '20000000-0000-0000-0000-0000000001%'
     or leerdoel_kern_id::text like '20000000-0000-0000-0000-0000000002%'
     or leerdoel_kern_id::text like '20000000-0000-0000-0000-0000000003%'
     or leerdoel_kern_id::text like '20000000-0000-0000-0000-0000000004%';

delete from paragraaf_onderwerp
  where paragraaf_id::text like 'f0000000-0000-0000-0000-0000000004%';

-- Leerdoelen
delete from leerdoel_methode
  where id::text like '30000000-0000-0000-0000-0000000001%'
     or id::text like '30000000-0000-0000-0000-0000000002%'
     or id::text like '30000000-0000-0000-0000-0000000003%'
     or id::text like '30000000-0000-0000-0000-0000000004%';

delete from leerdoel_kern
  where id::text like '20000000-0000-0000-0000-0000000001%'
     or id::text like '20000000-0000-0000-0000-0000000002%'
     or id::text like '20000000-0000-0000-0000-0000000003%'
     or id::text like '20000000-0000-0000-0000-0000000004%';

-- Taxonomie
delete from taxonomielabel    where taxonomiesysteem_id = '10000000-0000-0000-0000-000000000001';
delete from taxonomiesysteem  where id = '10000000-0000-0000-0000-000000000001';

-- Onderwerpen (diepste eerst)
delete from onderwerp where ouder_id = '12000000-0000-0000-0000-000000000001';
delete from onderwerp where id = '12000000-0000-0000-0000-000000000001';

-- Curriculum (van diep naar boven)
delete from paragraaf  where hoofdstuk_id = 'e0000000-0000-0000-0000-000000000004';
delete from hoofdstuk  where id = 'e0000000-0000-0000-0000-000000000004';
delete from editie     where id = 'd0000000-0000-0000-0000-000000000001';
delete from methode    where id = 'c0000000-0000-0000-0000-000000000001';
delete from uitgever   where id = 'b0000000-0000-0000-0000-000000000001';
delete from vak        where id = 'a0000000-0000-0000-0000-000000000001';
