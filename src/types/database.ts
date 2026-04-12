export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      asset: {
        Row: { beschrijving: string | null; bestandsnaam: string; id: string; type: string; url: string }
        Insert: { beschrijving?: string | null; bestandsnaam: string; id?: string; type: string; url: string }
        Update: { beschrijving?: string | null; bestandsnaam?: string; id?: string; type?: string; url?: string }
        Relationships: []
      }
      correctievoorschrift: {
        Row: { id: string; tekst: string; vraag_id: string }
        Insert: { id?: string; tekst: string; vraag_id: string }
        Update: { id?: string; tekst?: string; vraag_id?: string }
        Relationships: []
      }
      editie: {
        Row: { id: string; methode_id: string; naam: string }
        Insert: { id?: string; methode_id: string; naam: string }
        Update: { id?: string; methode_id?: string; naam?: string }
        Relationships: []
      }
      hoofdstuk: {
        Row: { editie_id: string; id: string; nummer: number | null; titel: string; volgorde: number }
        Insert: { editie_id: string; id?: string; nummer?: number | null; titel: string; volgorde: number }
        Update: { editie_id?: string; id?: string; nummer?: number | null; titel?: string; volgorde?: number }
        Relationships: []
      }
      leerdoel_kern: {
        Row: { id: string; leerdoel_slo_id: string | null; omschrijving: string }
        Insert: { id?: string; leerdoel_slo_id?: string | null; omschrijving: string }
        Update: { id?: string; leerdoel_slo_id?: string | null; omschrijving?: string }
        Relationships: []
      }
      leerdoel_kern_niveau_leerjaar: {
        Row: { leerdoel_kern_id: string; leerjaar: number; niveau_id: string }
        Insert: { leerdoel_kern_id: string; leerjaar: number; niveau_id: string }
        Update: { leerdoel_kern_id?: string; leerjaar?: number; niveau_id?: string }
        Relationships: []
      }
      leerdoel_kern_onderwerp: {
        Row: { leerdoel_kern_id: string; onderwerp_id: string }
        Insert: { leerdoel_kern_id: string; onderwerp_id: string }
        Update: { leerdoel_kern_id?: string; onderwerp_id?: string }
        Relationships: []
      }
      leerdoel_methode: {
        Row: { id: string; leerdoel_kern_id: string; omschrijving: string; ouder_id: string | null; paragraaf_id: string }
        Insert: { id?: string; leerdoel_kern_id: string; omschrijving: string; ouder_id?: string | null; paragraaf_id: string }
        Update: { id?: string; leerdoel_kern_id?: string; omschrijving?: string; ouder_id?: string | null; paragraaf_id?: string }
        Relationships: []
      }
      leerdoel_slo: {
        Row: { id: string; omschrijving: string; ouder_id: string | null }
        Insert: { id?: string; omschrijving: string; ouder_id?: string | null }
        Update: { id?: string; omschrijving?: string; ouder_id?: string | null }
        Relationships: []
      }
      methode: {
        Row: { id: string; naam: string; uitgever_id: string; vak_id: string }
        Insert: { id?: string; naam: string; uitgever_id: string; vak_id: string }
        Update: { id?: string; naam?: string; uitgever_id?: string; vak_id?: string }
        Relationships: []
      }
      niveau: {
        Row: { id: string; naam: string }
        Insert: { id?: string; naam: string }
        Update: { id?: string; naam?: string }
        Relationships: []
      }
      onderwerp: {
        Row: { id: string; naam: string; ouder_id: string | null }
        Insert: { id?: string; naam: string; ouder_id?: string | null }
        Update: { id?: string; naam?: string; ouder_id?: string | null }
        Relationships: []
      }
      paragraaf: {
        Row: { hoofdstuk_id: string; id: string; nummer: number | null; titel: string; volgorde: number }
        Insert: { hoofdstuk_id: string; id?: string; nummer?: number | null; titel: string; volgorde: number }
        Update: { hoofdstuk_id?: string; id?: string; nummer?: number | null; titel?: string; volgorde?: number }
        Relationships: []
      }
      paragraaf_onderwerp: {
        Row: { onderwerp_id: string; paragraaf_id: string }
        Insert: { onderwerp_id: string; paragraaf_id: string }
        Update: { onderwerp_id?: string; paragraaf_id?: string }
        Relationships: []
      }
      subvraag: {
        Row: { aantal_punten: number | null; context_tekst: string | null; id: string; label: string; volgorde: number; vraag_id: string; vraag_tekst: string }
        Insert: { aantal_punten?: number | null; context_tekst?: string | null; id?: string; label: string; volgorde: number; vraag_id: string; vraag_tekst: string }
        Update: { aantal_punten?: number | null; context_tekst?: string | null; id?: string; label?: string; volgorde?: number; vraag_id?: string; vraag_tekst?: string }
        Relationships: []
      }
      subvraag_asset: {
        Row: { asset_id: string; subvraag_id: string }
        Insert: { asset_id: string; subvraag_id: string }
        Update: { asset_id?: string; subvraag_id?: string }
        Relationships: []
      }
      taxonomielabel: {
        Row: { id: string; naam: string; taxonomiesysteem_id: string }
        Insert: { id?: string; naam: string; taxonomiesysteem_id: string }
        Update: { id?: string; naam?: string; taxonomiesysteem_id?: string }
        Relationships: []
      }
      taxonomiesysteem: {
        Row: { id: string; naam: string }
        Insert: { id?: string; naam: string }
        Update: { id?: string; naam?: string }
        Relationships: []
      }
      uitgever: {
        Row: { id: string; naam: string }
        Insert: { id?: string; naam: string }
        Update: { id?: string; naam?: string }
        Relationships: []
      }
      uitwerking: {
        Row: { id: string; tekst: string | null; vraag_id: string }
        Insert: { id?: string; tekst?: string | null; vraag_id: string }
        Update: { id?: string; tekst?: string | null; vraag_id?: string }
        Relationships: []
      }
      uitwerking_asset: {
        Row: { asset_id: string; uitwerking_id: string }
        Insert: { asset_id: string; uitwerking_id: string }
        Update: { asset_id?: string; uitwerking_id?: string }
        Relationships: []
      }
      vaardigheid: {
        Row: { id: string; naam: string }
        Insert: { id?: string; naam: string }
        Update: { id?: string; naam?: string }
        Relationships: []
      }
      vak: {
        Row: { id: string; naam: string }
        Insert: { id?: string; naam: string }
        Update: { id?: string; naam?: string }
        Relationships: []
      }
      vraag: {
        Row: { aangemaakt_op: string; aantal_punten: number | null; ai_model: string | null; context_tekst: string | null; gemaakt_door: string; gewijzigd_door: string | null; id: string; laatst_gewijzigd: string; skill_ref: string | null; status: string; versie: number; vraag_tekst: string; vraagtype_id: string | null }
        Insert: { aangemaakt_op?: string; aantal_punten?: number | null; ai_model?: string | null; context_tekst?: string | null; gemaakt_door: string; gewijzigd_door?: string | null; id?: string; laatst_gewijzigd?: string; skill_ref?: string | null; status?: string; versie?: number; vraag_tekst: string; vraagtype_id?: string | null }
        Update: { aangemaakt_op?: string; aantal_punten?: number | null; ai_model?: string | null; context_tekst?: string | null; gemaakt_door?: string; gewijzigd_door?: string | null; id?: string; laatst_gewijzigd?: string; skill_ref?: string | null; status?: string; versie?: number; vraag_tekst?: string; vraagtype_id?: string | null }
        Relationships: []
      }
      vraag_asset: {
        Row: { asset_id: string; vraag_id: string }
        Insert: { asset_id: string; vraag_id: string }
        Update: { asset_id?: string; vraag_id?: string }
        Relationships: []
      }
      vraag_leerdoel_kern: {
        Row: { leerdoel_kern_id: string; vraag_id: string }
        Insert: { leerdoel_kern_id: string; vraag_id: string }
        Update: { leerdoel_kern_id?: string; vraag_id?: string }
        Relationships: []
      }
      vraag_niveau_leerjaar: {
        Row: { leerjaar: number; niveau_id: string; vraag_id: string }
        Insert: { leerjaar: number; niveau_id: string; vraag_id: string }
        Update: { leerjaar?: number; niveau_id?: string; vraag_id?: string }
        Relationships: []
      }
      vraag_onderwerp: {
        Row: { onderwerp_id: string; vraag_id: string }
        Insert: { onderwerp_id: string; vraag_id: string }
        Update: { onderwerp_id?: string; vraag_id?: string }
        Relationships: []
      }
      vraag_taxonomielabel: {
        Row: { taxonomielabel_id: string; vraag_id: string }
        Insert: { taxonomielabel_id: string; vraag_id: string }
        Update: { taxonomielabel_id?: string; vraag_id?: string }
        Relationships: []
      }
      vraag_vaardigheid: {
        Row: { vaardigheid_id: string; vraag_id: string }
        Insert: { vaardigheid_id: string; vraag_id: string }
        Update: { vaardigheid_id?: string; vraag_id?: string }
        Relationships: []
      }
      vraag_versie: {
        Row: { aantal_punten: number | null; context_tekst: string | null; gemaakt_door: string | null; id: string; opgeslagen_door: string | null; opgeslagen_op: string; status: string | null; versie: number; vraag_id: string; vraag_tekst: string }
        Insert: { aantal_punten?: number | null; context_tekst?: string | null; gemaakt_door?: string | null; id?: string; opgeslagen_door?: string | null; opgeslagen_op?: string; status?: string | null; versie: number; vraag_id: string; vraag_tekst: string }
        Update: { aantal_punten?: number | null; context_tekst?: string | null; gemaakt_door?: string | null; id?: string; opgeslagen_door?: string | null; opgeslagen_op?: string; status?: string | null; versie?: number; vraag_id?: string; vraag_tekst?: string }
        Relationships: []
      }
      vraagtype: {
        Row: { id: string; naam: string }
        Insert: { id?: string; naam: string }
        Update: { id?: string; naam?: string }
        Relationships: []
      }
    }
    Views: {
      vraag_volledig: {
        Row: {
          id: string | null
          vraag_tekst: string | null
          context_tekst: string | null
          aantal_punten: number | null
          status: string | null
          gemaakt_door: string | null
          ai_model: string | null
          skill_ref: string | null
          versie: number | null
          aangemaakt_op: string | null
          vraagtype: string | null
          kernleerdoelen: string[] | null
          leerdoel_kern_ids: string[] | null
          methode_leerdoelen: string[] | null
          slo_leerdoelen: string[] | null
          paragraaf_ids: string[] | null
          paragrafen: Json[] | null
          hoofdstuk_ids: string[] | null
          hoofdstukken: Json[] | null
          onderwerpen: string[] | null
          taxonomielabels: string[] | null
          niveaus: Json[] | null
        }
        Relationships: []
      }
    }
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type Views<T extends keyof Database['public']['Views']> =
  Database['public']['Views'][T]['Row']

// Handige type-aliassen
export type VraagVolledig = Views<'vraag_volledig'>

// Genormaliseerde vraag voor gebruik in de app
export type Vraag = {
  id: string
  vraag_tekst: string
  context_tekst: string | null
  aantal_punten: number | null
  status: string
  gemaakt_door: string
  ai_model: string | null
  vraagtype: string | null
  taxonomielabels: string[]
  niveaus: NiveauLeerjaar[]
  kernleerdoelen: string[]
  methode_leerdoelen: string[]
  paragraaf_ids: string[]
  paragrafen: ParagraafRef[]
  hoofdstuk_ids: string[]
  hoofdstukken: HoofdstukRef[]
  // Aanwezigheid (apart opgehaald)
  heeftSubvragen: boolean
  heeftAssets: boolean
  heeftCorrectiemodel: boolean
  heeftUitwerking: boolean
}

export type NiveauLeerjaar = { niveau: string; leerjaar: number }
export type ParagraafRef = { id: string; titel: string; nummer: number | null; volgorde: number }
export type HoofdstukRef = { id: string; titel: string; nummer: number | null; volgorde: number }

// Facet-types voor de sidebar
export type FacetOptie = { id: string; label: string; count: number }

export type ActieveFilters = {
  zoekterm: string
  hoofdstuk_id: string | null
  paragraaf_id: string | null
  leerdoel: string | null       // methode-leerdoel omschrijving
  taxonomie: string | null
  vraagtype: string | null
  niveau: string | null
  status: string | null
}
