import { supabase } from '@/lib/supabase'
import { Json } from '@/types/database'

export type EditieMetMethode = {
  id: string
  naam: string
  methode: {
    naam: string
    vak: { naam: string }
    uitgever: { naam: string }
  }
}

export type ParagraafMetVraagCount = {
  id: string
  titel: string
  nummer: number | null
  volgorde: number
  vraagCount: number
}

export type HoofdstukMetParagrafen = {
  id: string
  titel: string
  nummer: number | null
  volgorde: number
  paragrafen: ParagraafMetVraagCount[]
}

export type LeerdoelMetVragen = {
  id: string
  omschrijving: string
  leerdoel_kern_id: string
  vraagCount: number
}

export type VraagKaart = {
  id: string
  vraag_tekst: string
  context_tekst: string | null
  aantal_punten: number | null
  status: string | null
  gemaakt_door: string | null
  ai_model: string | null
  vraagtype: string | null
  taxonomielabels: string[] | null
  niveaus: Json[] | null
  kernleerdoelen: string[] | null
  heeftAssets: boolean
  heeftSubvragen: boolean
  heeftCorrectiemodel: boolean
  heeftUitwerking: boolean
}

export type VraagDetail = VraagKaart & {
  subvragen: {
    id: string
    label: string
    volgorde: number
    context_tekst: string | null
    vraag_tekst: string
    aantal_punten: number | null
  }[]
  correctievoorschrift: string | null
  uitwerking: string | null
  assets: {
    id: string
    type: string
    bestandsnaam: string
    url: string
    beschrijving: string | null
  }[]
  slo_leerdoelen: string[] | null
}

export async function getEdities(): Promise<EditieMetMethode[]> {
  const { data, error } = await supabase
    .from('editie')
    .select(`
      id, naam,
      methode (
        naam,
        vak ( naam ),
        uitgever ( naam )
      )
    `)
    .order('naam')

  if (error) throw error
  return (data ?? []) as unknown as EditieMetMethode[]
}

export async function getHoofdstukken(editieId: string): Promise<HoofdstukMetParagrafen[]> {
  const { data, error } = await supabase
    .from('hoofdstuk')
    .select(`
      id, titel, nummer, volgorde,
      paragraaf (
        id, titel, nummer, volgorde,
        leerdoel_methode ( leerdoel_kern_id )
      )
    `)
    .eq('editie_id', editieId)
    .order('volgorde')

  if (error) throw error
  if (!data) return []

  type RawHoofdstuk = {
    id: string; titel: string; nummer: number | null; volgorde: number
    paragraaf: { id: string; titel: string; nummer: number | null; volgorde: number; leerdoel_methode: { leerdoel_kern_id: string }[] }[]
  }

  const hoofdstukken: HoofdstukMetParagrafen[] = []

  for (const h of (data as unknown as RawHoofdstuk[])) {
    const paragrafen: ParagraafMetVraagCount[] = []

    for (const p of (h.paragraaf ?? [])) {
      const kernIds = (p.leerdoel_methode ?? []).map((lm) => lm.leerdoel_kern_id)
      let vraagCount = 0

      if (kernIds.length > 0) {
        const { count } = await supabase
          .from('vraag_leerdoel_kern')
          .select('vraag_id', { count: 'exact', head: true })
          .in('leerdoel_kern_id', kernIds)
        vraagCount = count ?? 0
      }

      paragrafen.push({
        id: p.id,
        titel: p.titel,
        nummer: p.nummer,
        volgorde: p.volgorde,
        vraagCount,
      })
    }

    paragrafen.sort((a, b) => a.volgorde - b.volgorde)

    hoofdstukken.push({
      id: h.id,
      titel: h.titel,
      nummer: h.nummer,
      volgorde: h.volgorde,
      paragrafen,
    })
  }

  return hoofdstukken
}

export async function getLeerdoelen(paragraafId: string): Promise<LeerdoelMetVragen[]> {
  const { data, error } = await supabase
    .from('leerdoel_methode')
    .select('id, omschrijving, leerdoel_kern_id')
    .eq('paragraaf_id', paragraafId)

  if (error) throw error
  if (!data) return []

  const leerdoelen: LeerdoelMetVragen[] = []

  for (const lm of data) {
    const { count } = await supabase
      .from('vraag_leerdoel_kern')
      .select('vraag_id', { count: 'exact', head: true })
      .eq('leerdoel_kern_id', lm.leerdoel_kern_id)

    leerdoelen.push({
      id: lm.id,
      omschrijving: lm.omschrijving,
      leerdoel_kern_id: lm.leerdoel_kern_id,
      vraagCount: count ?? 0,
    })
  }

  return leerdoelen
}

export async function getVragen(leerdoelKernId: string): Promise<VraagKaart[]> {
  // Haal vraag-IDs op via de koppeltabel
  const { data: koppelingen, error: kError } = await supabase
    .from('vraag_leerdoel_kern')
    .select('vraag_id')
    .eq('leerdoel_kern_id', leerdoelKernId)

  if (kError) throw kError
  if (!koppelingen || koppelingen.length === 0) return []

  const vraagIds = koppelingen.map((k) => k.vraag_id)

  const { data, error } = await supabase
    .from('vraag_volledig')
    .select('*')
    .in('id', vraagIds)

  if (error) throw error
  if (!data) return []

  // Verrijk met subvraag/asset/correctie/uitwerking aanwezigheid
  const result: VraagKaart[] = []

  for (const v of data) {
    if (!v.id) continue

    const [
      { count: subCount },
      { count: assetCount },
      { count: correctieCount },
      { count: uitwerkingCount },
    ] = await Promise.all([
      supabase.from('subvraag').select('id', { count: 'exact', head: true }).eq('vraag_id', v.id),
      supabase.from('vraag_asset').select('asset_id', { count: 'exact', head: true }).eq('vraag_id', v.id),
      supabase.from('correctievoorschrift').select('id', { count: 'exact', head: true }).eq('vraag_id', v.id),
      supabase.from('uitwerking').select('id', { count: 'exact', head: true }).eq('vraag_id', v.id),
    ])

    result.push({
      id: v.id,
      vraag_tekst: v.vraag_tekst ?? '',
      context_tekst: v.context_tekst,
      aantal_punten: v.aantal_punten,
      status: v.status,
      gemaakt_door: v.gemaakt_door,
      ai_model: v.ai_model,
      vraagtype: v.vraagtype,
      taxonomielabels: v.taxonomielabels,
      niveaus: v.niveaus,
      kernleerdoelen: v.kernleerdoelen,
      heeftAssets: (assetCount ?? 0) > 0,
      heeftSubvragen: (subCount ?? 0) > 0,
      heeftCorrectiemodel: (correctieCount ?? 0) > 0,
      heeftUitwerking: (uitwerkingCount ?? 0) > 0,
    })
  }

  return result
}

export async function getVraagDetail(vraagId: string): Promise<VraagDetail | null> {
  const { data: vv, error: vvError } = await supabase
    .from('vraag_volledig')
    .select('*')
    .eq('id', vraagId)
    .single()

  if (vvError || !vv) return null

  const [
    { data: subvragen },
    { data: correctie },
    { data: uitwerking },
    { data: assets },
  ] = await Promise.all([
    supabase
      .from('subvraag')
      .select('id, label, volgorde, context_tekst, vraag_tekst, aantal_punten')
      .eq('vraag_id', vraagId)
      .order('volgorde'),
    supabase
      .from('correctievoorschrift')
      .select('tekst')
      .eq('vraag_id', vraagId)
      .maybeSingle(),
    supabase
      .from('uitwerking')
      .select('tekst')
      .eq('vraag_id', vraagId)
      .maybeSingle(),
    supabase
      .from('vraag_asset')
      .select('asset_id')
      .eq('vraag_id', vraagId),
  ])

  // Assets ophalen via aparte query
  const assetIds = (assets ?? []).map((a) => a.asset_id)
  let assetData: { id: string; type: string; bestandsnaam: string; url: string; beschrijving: string | null }[] = []
  if (assetIds.length > 0) {
    const { data: ad } = await supabase.from('asset').select('id, type, bestandsnaam, url, beschrijving').in('id', assetIds)
    assetData = ad ?? []
  }

  return {
    id: vv.id ?? '',
    vraag_tekst: vv.vraag_tekst ?? '',
    context_tekst: vv.context_tekst,
    aantal_punten: vv.aantal_punten,
    status: vv.status,
    gemaakt_door: vv.gemaakt_door,
    ai_model: vv.ai_model,
    vraagtype: vv.vraagtype,
    taxonomielabels: vv.taxonomielabels,
    niveaus: vv.niveaus,
    kernleerdoelen: vv.kernleerdoelen,
    slo_leerdoelen: vv.slo_leerdoelen,
    heeftAssets: assetIds.length > 0,
    heeftSubvragen: (subvragen?.length ?? 0) > 0,
    heeftCorrectiemodel: !!correctie?.tekst,
    heeftUitwerking: !!uitwerking?.tekst,
    subvragen: subvragen ?? [],
    correctievoorschrift: correctie?.tekst ?? null,
    uitwerking: uitwerking?.tekst ?? null,
    assets: assetData,
  }
}
