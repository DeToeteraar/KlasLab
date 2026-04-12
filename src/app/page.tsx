'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { CurriculumSidebar } from '@/components/CurriculumSidebar'
import { ParagraafView } from '@/components/ParagraafView'
import { FilterState } from '@/components/LeerdoelAccordion'
import { EditieMetMethode, HoofdstukMetParagrafen, getEdities, getHoofdstukken } from '@/lib/queries'

const DEFAULT_FILTERS: FilterState = { niveau: '', taxonomie: '', status: '', vraagtype: '' }

function AppInner() {
  const searchParams = useSearchParams()
  const paragraafId = searchParams.get('paragraaf')

  const [edities, setEdities] = useState<EditieMetMethode[]>([])
  const [zoekterm, setZoekterm] = useState('')
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const [paragraafInfo, setParagraafInfo] = useState<{
    id: string; titel: string; nummer: number | null
  } | null>(null)

  useEffect(() => {
    getEdities().then(setEdities)
  }, [])

  // Herstel paragraaf-info wanneer URL een paragraafId bevat maar info nog niet geladen is
  useEffect(() => {
    if (!paragraafId || paragraafInfo?.id === paragraafId || edities.length === 0) return
    const editieId = searchParams.get('editie') ?? edities[0]?.id
    if (!editieId) return

    getHoofdstukken(editieId).then((hoofdstukken: HoofdstukMetParagrafen[]) => {
      const p = hoofdstukken.flatMap((h) => h.paragrafen).find((pf) => pf.id === paragraafId)
      if (p) setParagraafInfo({ id: p.id, titel: p.titel, nummer: p.nummer })
    })
  }, [paragraafId, edities, paragraafInfo, searchParams])

  const handleParagraafSelect = (id: string, titel: string, nummer: number | null) => {
    setParagraafInfo({ id, titel, nummer })
  }

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleReset = () => {
    setZoekterm('')
    setFilters(DEFAULT_FILTERS)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <CurriculumSidebar
        edities={edities}
        onParagraafSelect={handleParagraafSelect}
      />
      <main className="flex-1 overflow-y-auto bg-white">
        <ParagraafView
          paragraafId={paragraafInfo?.id ?? paragraafId}
          paragraafTitel={paragraafInfo?.titel ?? null}
          paragraafNummer={paragraafInfo?.nummer ?? null}
          zoekterm={zoekterm}
          filters={filters}
          onZoektermChange={setZoekterm}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
        />
      </main>
    </div>
  )
}

export default function Home() {
  return (
    <Suspense>
      <AppInner />
    </Suspense>
  )
}
