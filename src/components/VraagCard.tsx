'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { MetadataBadge } from '@/components/MetadataBadge'
import { VraagDetail } from '@/components/VraagDetail'
import { VraagKaart } from '@/lib/queries'
import { Json } from '@/types/database'
import { cn } from '@/lib/utils'

function niveauLabel(n: Json): string {
  if (typeof n === 'object' && n !== null && !Array.isArray(n)) {
    const obj = n as Record<string, Json>
    return `${obj.niveau ?? ''}${obj.leerjaar ? obj.leerjaar : ''}`
  }
  return String(n)
}

export function VraagCard({ vraag }: { vraag: VraagKaart }) {
  const [open, setOpen] = useState(false)

  return (
    <Card
      className={cn(
        'cursor-pointer transition-shadow hover:shadow-md',
        open && 'ring-1 ring-slate-300'
      )}
      onClick={() => setOpen(!open)}
    >
      <CardContent className="p-3 space-y-2">
        {!open && (
          <p className="text-sm line-clamp-3 text-slate-800">{vraag.vraag_tekst}</p>
        )}

        <div className="flex flex-wrap gap-1">
          {vraag.vraagtype && <MetadataBadge type="vraagtype" label={vraag.vraagtype} />}
          {vraag.aantal_punten != null && (
            <MetadataBadge type="punten" label={`${vraag.aantal_punten}pt`} />
          )}
          {vraag.niveaus?.map((n, i) => (
            <MetadataBadge key={i} type="niveau" label={niveauLabel(n)} />
          ))}
          {vraag.taxonomielabels?.map((t, i) => (
            <MetadataBadge key={i} type="bloom" label={t} />
          ))}
          {vraag.status && <MetadataBadge type="status" label={vraag.status} />}
          {vraag.heeftAssets && <MetadataBadge type="asset" label="1 asset" />}
          {vraag.heeftSubvragen && <MetadataBadge type="subvraag" label="subvragen" />}
          {vraag.heeftCorrectiemodel && <MetadataBadge type="correctie" label="nakijkmodel" />}
          {vraag.heeftUitwerking && <MetadataBadge type="uitwerking" label="uitwerking" />}
          {vraag.gemaakt_door === 'ai' && <MetadataBadge type="ai" label="ai" />}
        </div>

        {open && <VraagDetail vraagId={vraag.id} />}
      </CardContent>
    </Card>
  )
}
