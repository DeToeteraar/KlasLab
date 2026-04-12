'use client'

import { useState, useEffect, useMemo, Suspense } from 'react'
import { FacetSidebar } from '@/components/FacetSidebar'
import { VraagRij } from '@/components/VraagRij'
import { getAlleVragen, filterVragen, berekenFacetten, EditieMetMethode, getEdities } from '@/lib/queries'
import { Vraag, ActieveFilters } from '@/types/database'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'

const DEFAULT_FILTERS: ActieveFilters = {
  zoekterm: '',
  hoofdstuk_id: null,
  paragraaf_id: null,
  leerdoel: null,
  taxonomie: null,
  vraagtype: null,
  niveau: null,
  status: null,
}

function App() {
  const [edities, setEdities] = useState<EditieMetMethode[]>([])
  const [editieId, setEditieId] = useState<string>('')
  const [alleVragen, setAlleVragen] = useState<Vraag[]>([])
  const [filters, setFilters] = useState<ActieveFilters>(DEFAULT_FILTERS)
  const [loading, setLoading] = useState(false)

  // Edities laden
  useEffect(() => {
    getEdities().then((eds) => {
      setEdities(eds)
      if (eds.length > 0) setEditieId(eds[0].id)
    })
  }, [])

  // Vragen laden bij editie-keuze
  useEffect(() => {
    if (!editieId) return
    setLoading(true)
    setAlleVragen([])
    setFilters(DEFAULT_FILTERS)
    getAlleVragen(editieId).then((vragen) => {
      setAlleVragen(vragen)
      setLoading(false)
    })
  }, [editieId])

  const gefilterd = useMemo(
    () => filterVragen(alleVragen, filters),
    [alleVragen, filters]
  )

  const facetten = useMemo(
    () => berekenFacetten(alleVragen, gefilterd, filters),
    [alleVragen, gefilterd, filters]
  )

  const handleFilterChange = (update: Partial<ActieveFilters>) => {
    setFilters((prev) => ({ ...prev, ...update }))
  }

  const handleReset = () => setFilters(DEFAULT_FILTERS)

  const geselecteerdeEditie = edities.find((e) => e.id === editieId)
  const editieLabel = geselecteerdeEditie
    ? `${geselecteerdeEditie.methode.naam} — ${geselecteerdeEditie.naam}`
    : 'Kies editie...'

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <FacetSidebar
        facetten={facetten}
        filters={filters}
        totaal={alleVragen.length}
        gefilterd={gefilterd.length}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
      />

      {/* Hoofdgebied */}
      <main className="flex-1 flex flex-col overflow-hidden bg-white">
        {/* Topbalk met editie-selector */}
        <div className="flex items-center gap-3 px-4 py-2.5 border-b bg-white shrink-0">
          <span className="text-xs text-muted-foreground">Editie</span>
          {edities.length > 0 && (
            <Select value={editieId} onValueChange={(v) => v && setEditieId(v)}>
              <SelectTrigger className="h-7 text-xs w-auto">
                <span>{editieLabel}</span>
              </SelectTrigger>
              <SelectContent>
                {edities.map((e) => (
                  <SelectItem key={e.id} value={e.id}>
                    {e.methode.naam} — {e.naam}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <span className="ml-auto text-xs text-muted-foreground">
            {loading ? 'Laden...' : `${gefilterd.length} vragen`}
          </span>
        </div>

        {/* Vragenlijst */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
              Vragen worden geladen...
            </div>
          ) : gefilterd.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
              Geen vragen gevonden voor deze combinatie van filters.
            </div>
          ) : (
            <div>
              {gefilterd.map((v, i) => (
                <VraagRij key={v.id} vraag={v} index={i} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default function Home() {
  return (
    <Suspense>
      <App />
    </Suspense>
  )
}
