'use client'

import { useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { VraagCard } from '@/components/VraagCard'
import { LeerdoelMetVragen, VraagKaart, getVragen } from '@/lib/queries'
import { Json } from '@/types/database'

export type FilterState = {
  niveau: string
  taxonomie: string
  status: string
  vraagtype: string
}

function LeerdoelItem({
  leerdoel,
  zoekterm,
  filters,
}: {
  leerdoel: LeerdoelMetVragen
  zoekterm: string
  filters: FilterState
}) {
  const [vragen, setVragen] = useState<VraagKaart[]>([])
  const [geladen, setGeladen] = useState(false)

  const handleTriggerClick = () => {
    if (!geladen) {
      getVragen(leerdoel.leerdoel_kern_id).then((v) => {
        setVragen(v)
        setGeladen(true)
      })
    }
  }

  const gefilterd = vragen.filter((v) => {
    if (zoekterm && !v.vraag_tekst.toLowerCase().includes(zoekterm.toLowerCase())) return false
    if (filters.niveau) {
      const match = v.niveaus?.some((n) => {
        const obj = n as Record<string, Json>
        return String(obj.niveau ?? '').toLowerCase().includes(filters.niveau.toLowerCase())
      })
      if (!match) return false
    }
    if (filters.taxonomie && !v.taxonomielabels?.some((t) =>
      t.toLowerCase().includes(filters.taxonomie.toLowerCase())
    )) return false
    if (filters.status && v.status !== filters.status) return false
    if (filters.vraagtype && v.vraagtype?.toLowerCase() !== filters.vraagtype.toLowerCase()) return false
    return true
  })

  return (
    <AccordionItem value={leerdoel.id}>
      <AccordionTrigger onClick={handleTriggerClick}>
        <div className="flex items-center justify-between w-full gap-2">
          <span className="text-sm text-left">{leerdoel.omschrijving}</span>
          <span className="text-xs text-muted-foreground whitespace-nowrap mr-2">
            {leerdoel.vraagCount} vragen
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        {!geladen ? (
          <p className="text-xs text-muted-foreground py-2">Laden...</p>
        ) : gefilterd.length === 0 ? (
          <p className="text-xs text-muted-foreground py-2">Geen vragen gevonden.</p>
        ) : (
          <div className="space-y-2 pt-1">
            {gefilterd.map((v) => (
              <VraagCard key={v.id} vraag={v} />
            ))}
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  )
}

export function LeerdoelAccordion({
  leerdoelen,
  zoekterm,
  filters,
}: {
  leerdoelen: LeerdoelMetVragen[]
  zoekterm: string
  filters: FilterState
}) {
  if (leerdoelen.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Geen leerdoelen gevonden voor deze paragraaf.
      </p>
    )
  }

  return (
    <Accordion className="w-full">
      {leerdoelen.map((ld) => (
        <LeerdoelItem key={ld.id} leerdoel={ld} zoekterm={zoekterm} filters={filters} />
      ))}
    </Accordion>
  )
}
