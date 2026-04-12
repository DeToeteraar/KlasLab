import { supabase } from '@/lib/supabase'
import {
  Vraag,
  NiveauLeerjaar,
  ParagraafRef,
  HoofdstukRef,
  ActieveFilters,
  Json,
} from '@/types/database'

// ---------------------------------------------------------------------------
// Edities
// ---------------------------------------------------------------------------

export type EditieMetMethode = {
  id: string
  naam: string
  methode: { naam: string; vak: { naam: string }; uitgever: { naam: string } }
}

export async function getEdities(): Promise<EditieMetMethode[]> {
  const { data, error } = await supabase
    .from('editie')
    .select('id, naam, methode ( naam, vak ( naam ), uitgever ( naam ) )')
    .order('naam')
  if (error) throw error
  return (data ?? []) as unknown as EditieMetMethode[]
}

// ---------------------------------------------------------------------------
// Alle vragen ophalen (één query, client-side filteren)
// ---------------------------------------------------------------------------

function parseNiveaus(raw: Json[] | null): NiveauLeerjaar[] {
  if (!raw) return []
  return raw
    .filter((n): n is Record<string, Json> => typeof n === 'object' && n !== null && !Array.isArray(n))
    .map((n) => ({ niveau: String(n.niveau ?? ''), leerjaar: Number(n.leerjaar ?? 0) }))
}

function parseRefs<T>(raw: Json[] | null): T[] {
  if (!raw) return []
  return raw.filter(
    (r): r is Record<string, Json> => typeof r === 'object' && r !== null && !Array.isArray(r)
  ) as unknown as T[]
}

export async function getAlleVragen(editieId: string): Promise<Vraag[]> {
  // Stap 1: haal alle paragraaf-IDs op die bij deze editie horen
  const { data: paragraafData, error: pErr } = await supabase
    .from('paragraaf')
    .select('id, hoofdstuk!inner ( editie_id )')
    .eq('hoofdstuk.editie_id', editieId)

  if (pErr) throw pErr
  const editieParagraafIds = (paragraafData ?? []).map((p) => (p as unknown as { id: string }).id)
  if (editieParagraafIds.length === 0) return []

  // Stap 2: vind vraag-IDs die bij deze editie horen (via leerdoel_methode → paragraaf)
  const { data: koppelData, error: kErr } = await supabase
    .from('leerdoel_methode')
    .select('leerdoel_kern_id')
    .in('paragraaf_id', editieParagraafIds)

  if (kErr) throw kErr
  const kernIds = [...new Set((koppelData ?? []).map((k) => k.leerdoel_kern_id))]
  if (kernIds.length === 0) return []

  const { data: vraagKoppel, error: vkErr } = await supabase
    .from('vraag_leerdoel_kern')
    .select('vraag_id')
    .in('leerdoel_kern_id', kernIds)

  if (vkErr) throw vkErr
  const vraagIds = [...new Set((vraagKoppel ?? []).map((v) => v.vraag_id))]
  if (vraagIds.length === 0) return []

  // Stap 3: haal de volledige vraagdata op uit de view
  const { data, error } = await supabase
    .from('vraag_volledig')
    .select('*')
    .in('id', vraagIds)

  if (error) throw error
  if (!data) return []

  // Stap 4: verrijk met aanwezigheid van subvragen, assets, etc.
  const [
    { data: subData },
    { data: assetData },
    { data: correctieData },
    { data: uitwerkingData },
  ] = await Promise.all([
    supabase.from('subvraag').select('vraag_id').in('vraag_id', vraagIds),
    supabase.from('vraag_asset').select('vraag_id').in('vraag_id', vraagIds),
    supabase.from('correctievoorschrift').select('vraag_id').in('vraag_id', vraagIds),
    supabase.from('uitwerking').select('vraag_id').in('vraag_id', vraagIds),
  ])

  const heeftSub = new Set((subData ?? []).map((r) => r.vraag_id))
  const heeftAsset = new Set((assetData ?? []).map((r) => r.vraag_id))
  const heeftCorrectie = new Set((correctieData ?? []).map((r) => r.vraag_id))
  const heeftUitwerking = new Set((uitwerkingData ?? []).map((r) => r.vraag_id))

  return data
    .filter((v) => v.id != null)
    .map((v): Vraag => ({
      id: v.id!,
      vraag_tekst: v.vraag_tekst ?? '',
      context_tekst: v.context_tekst ?? null,
      aantal_punten: v.aantal_punten ?? null,
      status: v.status ?? 'concept',
      gemaakt_door: v.gemaakt_door ?? 'mens',
      ai_model: v.ai_model ?? null,
      vraagtype: v.vraagtype ?? null,
      taxonomielabels: (v.taxonomielabels ?? []) as string[],
      niveaus: parseNiveaus(v.niveaus),
      kernleerdoelen: (v.kernleerdoelen ?? []) as string[],
      methode_leerdoelen: (v.methode_leerdoelen ?? []) as string[],
      paragraaf_ids: (v.paragraaf_ids ?? []) as string[],
      paragrafen: parseRefs<ParagraafRef>(v.paragrafen),
      hoofdstuk_ids: (v.hoofdstuk_ids ?? []) as string[],
      hoofdstukken: parseRefs<HoofdstukRef>(v.hoofdstukken),
      heeftSubvragen: heeftSub.has(v.id!),
      heeftAssets: heeftAsset.has(v.id!),
      heeftCorrectiemodel: heeftCorrectie.has(v.id!),
      heeftUitwerking: heeftUitwerking.has(v.id!),
    }))
}

// ---------------------------------------------------------------------------
// Client-side filteren
// ---------------------------------------------------------------------------

export function filterVragen(vragen: Vraag[], filters: ActieveFilters): Vraag[] {
  return vragen.filter((v) => {
    if (filters.zoekterm) {
      const zoek = filters.zoekterm.toLowerCase()
      if (!v.vraag_tekst.toLowerCase().includes(zoek) &&
          !v.context_tekst?.toLowerCase().includes(zoek)) return false
    }
    if (filters.hoofdstuk_id && !v.hoofdstuk_ids.includes(filters.hoofdstuk_id)) return false
    if (filters.paragraaf_id && !v.paragraaf_ids.includes(filters.paragraaf_id)) return false
    if (filters.leerdoel && !v.methode_leerdoelen.includes(filters.leerdoel)) return false
    if (filters.taxonomie && !v.taxonomielabels.includes(filters.taxonomie)) return false
    if (filters.vraagtype && v.vraagtype !== filters.vraagtype) return false
    if (filters.niveau && !v.niveaus.some((n) => n.niveau === filters.niveau)) return false
    if (filters.status && v.status !== filters.status) return false
    return true
  })
}

// ---------------------------------------------------------------------------
// Facetten berekenen uit de gefilterde vragenlijst
// ---------------------------------------------------------------------------

export type Facetten = {
  hoofdstukken: { id: string; label: string; volgorde: number; count: number }[]
  paragrafen: { id: string; label: string; volgorde: number; hoofdstuk_id: string; count: number }[]
  leerdoelen: { label: string; count: number }[]
  taxonomie: { label: string; count: number }[]
  vraagtypes: { label: string; count: number }[]
  niveaus: { label: string; count: number }[]
  statussen: { label: string; count: number }[]
}

export function berekenFacetten(alleVragen: Vraag[], gefilterd: Vraag[], filters: ActieveFilters): Facetten {
  // Voor elk facet: tel hoeveel vragen overblijven als we DAT filter toevoegen
  // aan de huidige filters (minus het filter zelf)

  function telMet<T>(
    items: Vraag[],
    extract: (v: Vraag) => T[],
    key: (item: T) => string
  ): Map<string, number> {
    const counts = new Map<string, number>()
    for (const v of items) {
      const uniq = new Set(extract(v).map(key))
      for (const k of uniq) counts.set(k, (counts.get(k) ?? 0) + 1)
    }
    return counts
  }

  // Hoofdstukken: tel op basis van vragen zonder hoofdstuk-filter
  const zonderHoofdstuk = filterVragen(alleVragen, { ...filters, hoofdstuk_id: null, paragraaf_id: null, leerdoel: null })
  const hCounts = telMet(zonderHoofdstuk, (v) => v.hoofdstukken, (h) => h.id)

  // Verzamel unieke hoofdstukken gesorteerd
  const alleHoofdstukken = new Map<string, { id: string; label: string; volgorde: number }>()
  for (const v of alleVragen) {
    for (const h of v.hoofdstukken) {
      if (!alleHoofdstukken.has(h.id)) {
        alleHoofdstukken.set(h.id, {
          id: h.id,
          label: h.nummer != null ? `H${h.nummer} ${h.titel}` : h.titel,
          volgorde: h.volgorde,
        })
      }
    }
  }

  // Paragrafen: afhankelijk van geselecteerd hoofdstuk
  const zonderParagraaf = filterVragen(alleVragen, { ...filters, paragraaf_id: null, leerdoel: null })
  const pCounts = telMet(zonderParagraaf, (v) => v.paragrafen, (p) => p.id)

  const alleParagrafen = new Map<string, { id: string; label: string; volgorde: number; hoofdstuk_id: string }>()
  for (const v of alleVragen) {
    for (const p of v.paragrafen) {
      if (!alleParagrafen.has(p.id)) {
        // Zoek de bijbehorende hoofdstuk_id
        const hId = v.hoofdstuk_ids[v.paragraaf_ids.indexOf(p.id)] ?? ''
        alleParagrafen.set(p.id, {
          id: p.id,
          label: p.nummer != null ? `§${p.nummer} ${p.titel}` : p.titel,
          volgorde: p.volgorde,
          hoofdstuk_id: hId,
        })
      }
    }
  }

  // Leerdoelen: afhankelijk van paragraaf-filter
  const zonderLeerdoel = filterVragen(alleVragen, { ...filters, leerdoel: null })
  const ldCounts = new Map<string, number>()
  for (const v of zonderLeerdoel) {
    for (const ld of v.methode_leerdoelen) ldCounts.set(ld, (ldCounts.get(ld) ?? 0) + 1)
  }

  // Taxonomie
  const zonderTaxonomie = filterVragen(alleVragen, { ...filters, taxonomie: null })
  const taxCounts = new Map<string, number>()
  for (const v of zonderTaxonomie) {
    for (const t of v.taxonomielabels) taxCounts.set(t, (taxCounts.get(t) ?? 0) + 1)
  }

  // Vraagtype
  const zonderType = filterVragen(alleVragen, { ...filters, vraagtype: null })
  const typeCounts = new Map<string, number>()
  for (const v of zonderType) {
    if (v.vraagtype) typeCounts.set(v.vraagtype, (typeCounts.get(v.vraagtype) ?? 0) + 1)
  }

  // Niveau
  const zonderNiveau = filterVragen(alleVragen, { ...filters, niveau: null })
  const nCounts = new Map<string, number>()
  for (const v of zonderNiveau) {
    for (const n of v.niveaus) nCounts.set(n.niveau, (nCounts.get(n.niveau) ?? 0) + 1)
  }

  // Status
  const zonderStatus = filterVragen(alleVragen, { ...filters, status: null })
  const stCounts = new Map<string, number>()
  for (const v of zonderStatus) stCounts.set(v.status, (stCounts.get(v.status) ?? 0) + 1)

  const BLOOM_VOLGORDE = ['Onthouden', 'Begrijpen', 'Toepassen', 'Analyseren', 'Evalueren', 'Creëren']

  return {
    hoofdstukken: [...alleHoofdstukken.values()]
      .filter((h) => (hCounts.get(h.id) ?? 0) > 0)
      .sort((a, b) => a.volgorde - b.volgorde)
      .map((h) => ({ ...h, count: hCounts.get(h.id) ?? 0 })),

    paragrafen: [...alleParagrafen.values()]
      .filter((p) => {
        if (filters.hoofdstuk_id && p.hoofdstuk_id !== filters.hoofdstuk_id) return false
        return (pCounts.get(p.id) ?? 0) > 0
      })
      .sort((a, b) => a.volgorde - b.volgorde)
      .map((p) => ({ ...p, count: pCounts.get(p.id) ?? 0 })),

    leerdoelen: [...ldCounts.entries()]
      .filter(([, c]) => c > 0)
      .map(([label, count]) => ({ label, count })),

    taxonomie: BLOOM_VOLGORDE
      .filter((t) => taxCounts.has(t))
      .map((t) => ({ label: t, count: taxCounts.get(t) ?? 0 })),

    vraagtypes: [...typeCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([label, count]) => ({ label, count })),

    niveaus: [...nCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([label, count]) => ({ label, count })),

    statussen: [...stCounts.entries()]
      .map(([label, count]) => ({ label, count })),
  }
}

// ---------------------------------------------------------------------------
// Vraagdetail (subvragen, correctie, uitwerking, assets)
// ---------------------------------------------------------------------------

export type VraagDetail = Vraag & {
  subvragen: { id: string; label: string; volgorde: number; context_tekst: string | null; vraag_tekst: string; aantal_punten: number | null }[]
  correctievoorschrift: string | null
  uitwerking: string | null
  assets: { id: string; type: string; bestandsnaam: string; url: string; beschrijving: string | null }[]
}

export async function getVraagDetail(vraag: Vraag): Promise<VraagDetail> {
  const [
    { data: subvragen },
    { data: correctie },
    { data: uitwerking },
    { data: assetKoppels },
  ] = await Promise.all([
    supabase.from('subvraag').select('id, label, volgorde, context_tekst, vraag_tekst, aantal_punten').eq('vraag_id', vraag.id).order('volgorde'),
    supabase.from('correctievoorschrift').select('tekst').eq('vraag_id', vraag.id).maybeSingle(),
    supabase.from('uitwerking').select('tekst').eq('vraag_id', vraag.id).maybeSingle(),
    supabase.from('vraag_asset').select('asset_id').eq('vraag_id', vraag.id),
  ])

  const assetIds = (assetKoppels ?? []).map((a) => a.asset_id)
  let assets: { id: string; type: string; bestandsnaam: string; url: string; beschrijving: string | null }[] = []
  if (assetIds.length > 0) {
    const { data: ad } = await supabase.from('asset').select('id, type, bestandsnaam, url, beschrijving').in('id', assetIds)
    assets = ad ?? []
  }

  return {
    ...vraag,
    subvragen: subvragen ?? [],
    correctievoorschrift: correctie?.tekst ?? null,
    uitwerking: uitwerking?.tekst ?? null,
    assets,
  }
}
