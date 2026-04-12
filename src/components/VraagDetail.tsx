'use client'

import { useEffect, useState } from 'react'
import { VraagDetail as VraagDetailType, getVraagDetail } from '@/lib/queries'
import { MetadataBadge } from '@/components/MetadataBadge'
import { Separator } from '@/components/ui/separator'
import { Json } from '@/types/database'
import Image from 'next/image'

function niveauLabel(n: Json): string {
  if (typeof n === 'object' && n !== null && !Array.isArray(n)) {
    const obj = n as Record<string, Json>
    return `${obj.niveau ?? ''}${obj.leerjaar ? obj.leerjaar : ''}`
  }
  return String(n)
}

export function VraagDetail({ vraagId }: { vraagId: string }) {
  const [detail, setDetail] = useState<VraagDetailType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getVraagDetail(vraagId).then((d) => {
      setDetail(d)
      setLoading(false)
    })
  }, [vraagId])

  if (loading) return <div className="p-4 text-sm text-muted-foreground">Laden...</div>
  if (!detail) return <div className="p-4 text-sm text-red-500">Vraag niet gevonden.</div>

  return (
    <div className="space-y-4 p-4">
      {detail.context_tekst && (
        <p className="text-sm text-muted-foreground italic">{detail.context_tekst}</p>
      )}
      <p className="text-sm">{detail.vraag_tekst}</p>

      {detail.subvragen.length > 0 && (
        <div className="space-y-2 pl-4 border-l-2 border-slate-200">
          {detail.subvragen.map((sv) => (
            <div key={sv.id} className="text-sm">
              <span className="font-medium mr-2">{sv.label}.</span>
              {sv.context_tekst && (
                <span className="text-muted-foreground italic mr-2">{sv.context_tekst}</span>
              )}
              {sv.vraag_tekst}
              {sv.aantal_punten != null && (
                <span className="ml-2 text-xs text-muted-foreground">({sv.aantal_punten} pt)</span>
              )}
            </div>
          ))}
        </div>
      )}

      {detail.assets.length > 0 && (
        <div className="space-y-2">
          <Separator />
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Assets</p>
          {detail.assets.map((asset) => (
            <div key={asset.id} className="space-y-1">
              {asset.type === 'afbeelding' || asset.type === 'grafiek' ? (
                <div className="rounded border overflow-hidden max-w-sm">
                  <Image
                    src={asset.url}
                    alt={asset.beschrijving ?? asset.bestandsnaam}
                    width={400}
                    height={300}
                    className="object-contain w-full"
                    unoptimized
                  />
                </div>
              ) : (
                <a
                  href={asset.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 underline"
                >
                  {asset.bestandsnaam}
                </a>
              )}
              {asset.beschrijving && (
                <p className="text-xs text-muted-foreground">{asset.beschrijving}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {detail.correctievoorschrift && (
        <div className="space-y-1">
          <Separator />
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Correctiemodel</p>
          <p className="text-sm whitespace-pre-wrap bg-slate-50 rounded p-3">
            {detail.correctievoorschrift}
          </p>
        </div>
      )}

      {detail.uitwerking && (
        <div className="space-y-1">
          <Separator />
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Uitwerking</p>
          <p className="text-sm whitespace-pre-wrap bg-slate-50 rounded p-3">
            {detail.uitwerking}
          </p>
        </div>
      )}

      {(detail.kernleerdoelen?.length || detail.slo_leerdoelen?.length) ? (
        <div className="space-y-1">
          <Separator />
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Leerdoel-keten</p>
          {detail.kernleerdoelen?.map((k, i) => (
            <p key={i} className="text-xs text-slate-600">↳ {k}</p>
          ))}
          {detail.slo_leerdoelen?.map((s, i) => (
            <p key={i} className="text-xs text-slate-400">↳ SLO: {s}</p>
          ))}
        </div>
      ) : null}

      <Separator />
      <div className="flex flex-wrap gap-1.5">
        {detail.vraagtype && <MetadataBadge type="vraagtype" label={detail.vraagtype} />}
        {detail.aantal_punten != null && (
          <MetadataBadge type="punten" label={`${detail.aantal_punten}pt`} />
        )}
        {detail.niveaus?.map((n, i) => (
          <MetadataBadge key={i} type="niveau" label={niveauLabel(n)} />
        ))}
        {detail.taxonomielabels?.map((t, i) => (
          <MetadataBadge key={i} type="bloom" label={t} />
        ))}
        {detail.status && <MetadataBadge type="status" label={detail.status} />}
        {detail.gemaakt_door === 'ai' && <MetadataBadge type="ai" label="ai" />}
      </div>
    </div>
  )
}
