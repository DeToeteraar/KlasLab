'use client'

import { useEffect, useState } from 'react'
import { LeerdoelAccordion, FilterState } from '@/components/LeerdoelAccordion'
import { FilterBar } from '@/components/FilterBar'
import { LeerdoelMetVragen, getLeerdoelen } from '@/lib/queries'
import { Separator } from '@/components/ui/separator'

type Props = {
  paragraafId: string | null
  paragraafTitel: string | null
  paragraafNummer: number | null
  zoekterm: string
  filters: FilterState
  onZoektermChange: (v: string) => void
  onFilterChange: (key: keyof FilterState, value: string) => void
  onReset: () => void
}

export function ParagraafView({
  paragraafId,
  paragraafTitel,
  paragraafNummer,
  zoekterm,
  filters,
  onZoektermChange,
  onFilterChange,
  onReset,
}: Props) {
  const [leerdoelen, setLeerdoelen] = useState<LeerdoelMetVragen[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!paragraafId) return
    setLoading(true)
    getLeerdoelen(paragraafId).then((l) => {
      setLeerdoelen(l)
      setLoading(false)
    })
  }, [paragraafId])

  if (!paragraafId) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
        Selecteer een paragraaf in de sidebar.
      </div>
    )
  }

  return (
    <div className="max-w-[900px] mx-auto px-6 py-6 space-y-4">
      <div className="space-y-3">
        <h1 className="text-lg font-semibold">
          {paragraafNummer != null ? `§${paragraafNummer} ` : ''}{paragraafTitel}
        </h1>
        <FilterBar
          zoekterm={zoekterm}
          filters={filters}
          onZoektermChange={onZoektermChange}
          onFilterChange={onFilterChange}
          onReset={onReset}
        />
        <Separator />
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Laden...</p>
      ) : (
        <LeerdoelAccordion leerdoelen={leerdoelen} zoekterm={zoekterm} filters={filters} />
      )}
    </div>
  )
}
