'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { VraagDetail as VraagDetailType, getVraagDetail } from '@/lib/queries'
import { Vraag } from '@/types/database'
import { MetadataBadge } from '@/components/MetadataBadge'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'

// ---------------------------------------------------------------------------
// Compacte rij
// ---------------------------------------------------------------------------

type VraagRijProps = {
  vraag: Vraag
  index: number
}

export function VraagRij({ vraag, index }: VraagRijProps) {
  const [open, setOpen] = useState(false)
  const [detail, setDetail] = useState<VraagDetailType | null>(null)
  const [loading, setLoading] = useState(false)

  const toggle = async () => {
    if (!open && !detail) {
      setLoading(true)
      const d = await getVraagDetail(vraag)
      setDetail(d)
      setLoading(false)
    }
    setOpen(!open)
  }

  const eersteBloom = vraag.taxonomielabels[0] ?? null
  const eersteNiveau = vraag.niveaus[0] ?? null

  return (
    <div className={cn('border-b last:border-b-0', open && 'bg-slate-50')}>
      {/* Compacte rij */}
      <button
        onClick={toggle}
        className="w-full flex items-baseline gap-3 px-4 py-2.5 text-left hover:bg-slate-50 transition-colors group"
      >
        {/* Index */}
        <span className="text-[10px] text-muted-foreground tabular-nums w-5 shrink-0 pt-0.5">
          {index + 1}
        </span>

        {/* Vraagtype badge */}
        {vraag.vraagtype && (
          <span className="shrink-0">
            <MetadataBadge type="vraagtype" label={vraag.vraagtype} />
          </span>
        )}

        {/* Vraagtekst */}
        <span className="flex-1 text-sm text-slate-800 line-clamp-2 min-w-0">
          {vraag.vraag_tekst}
        </span>

        {/* Badges rechts */}
        <span className="flex items-center gap-1 shrink-0">
          {eersteBloom && <MetadataBadge type="bloom" label={eersteBloom} />}
          {eersteNiveau && (
            <MetadataBadge type="niveau" label={`${eersteNiveau.niveau}${eersteNiveau.leerjaar}`} />
          )}
          {vraag.aantal_punten != null && (
            <MetadataBadge type="punten" label={`${vraag.aantal_punten}pt`} />
          )}
          {vraag.status !== 'gepubliceerd' && (
            <MetadataBadge type="status" label={vraag.status} />
          )}
          {vraag.heeftSubvragen && (
            <MetadataBadge type="subvraag" label="sub" />
          )}
        </span>
      </button>

      {/* Uitklapbaar detail */}
      {open && (
        <div className="px-12 pb-4 space-y-3">
          {loading ? (
            <p className="text-xs text-muted-foreground">Laden...</p>
          ) : detail ? (
            <VraagDetailPanel detail={detail} />
          ) : null}
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Detail-paneel
// ---------------------------------------------------------------------------

function VraagDetailPanel({ detail }: { detail: VraagDetailType }) {
  return (
    <div className="space-y-3 pt-1">
      {/* Context + volledige tekst */}
      {detail.context_tekst && (
        <p className="text-xs text-muted-foreground italic">{detail.context_tekst}</p>
      )}
      <p className="text-sm">{detail.vraag_tekst}</p>

      {/* Subvragen */}
      {detail.subvragen.length > 0 && (
        <div className="space-y-1.5 pl-3 border-l-2 border-slate-200">
          {detail.subvragen.map((sv) => (
            <div key={sv.id} className="text-sm">
              <span className="font-medium mr-1.5">{sv.label}.</span>
              {sv.context_tekst && (
                <span className="text-muted-foreground italic mr-1.5">{sv.context_tekst}</span>
              )}
              {sv.vraag_tekst}
              {sv.aantal_punten != null && (
                <span className="ml-1.5 text-xs text-muted-foreground">({sv.aantal_punten} pt)</span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Assets */}
      {detail.assets.length > 0 && (
        <div className="space-y-2">
          {detail.assets.map((asset) => (
            <div key={asset.id}>
              {asset.type === 'afbeelding' || asset.type === 'grafiek' ? (
                <div className="rounded border overflow-hidden max-w-xs">
                  <Image
                    src={asset.url}
                    alt={asset.beschrijving ?? asset.bestandsnaam}
                    width={360}
                    height={240}
                    className="object-contain w-full"
                    unoptimized
                  />
                </div>
              ) : (
                <a href={asset.url} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-blue-600 underline">
                  {asset.bestandsnaam}
                </a>
              )}
              {asset.beschrijving && (
                <p className="text-xs text-muted-foreground mt-0.5">{asset.beschrijving}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Correctiemodel */}
      {detail.correctievoorschrift && (
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Correctiemodel
          </p>
          <p className="text-xs whitespace-pre-wrap bg-white border rounded p-2.5">
            {detail.correctievoorschrift}
          </p>
        </div>
      )}

      {/* Uitwerking */}
      {detail.uitwerking && (
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Uitwerking
          </p>
          <p className="text-xs whitespace-pre-wrap bg-white border rounded p-2.5">
            {detail.uitwerking}
          </p>
        </div>
      )}

      {/* Leerdoel-keten */}
      {detail.methode_leerdoelen.length > 0 && (
        <div>
          <Separator className="mb-2" />
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Leerdoel
          </p>
          {detail.methode_leerdoelen.map((ld, i) => (
            <p key={i} className="text-xs text-slate-600">{ld}</p>
          ))}
        </div>
      )}

      {/* Alle metadata */}
      <Separator />
      <div className="flex flex-wrap gap-1">
        {detail.vraagtype && <MetadataBadge type="vraagtype" label={detail.vraagtype} />}
        {detail.aantal_punten != null && <MetadataBadge type="punten" label={`${detail.aantal_punten}pt`} />}
        {detail.niveaus.map((n, i) => (
          <MetadataBadge key={i} type="niveau" label={`${n.niveau}${n.leerjaar}`} />
        ))}
        {detail.taxonomielabels.map((t, i) => (
          <MetadataBadge key={i} type="bloom" label={t} />
        ))}
        <MetadataBadge type="status" label={detail.status} />
        {detail.gemaakt_door === 'ai' && <MetadataBadge type="ai" label="ai" />}
        {detail.heeftAssets && <MetadataBadge type="asset" label="asset" />}
        {detail.heeftCorrectiemodel && <MetadataBadge type="correctie" label="nakijkmodel" />}
        {detail.heeftUitwerking && <MetadataBadge type="uitwerking" label="uitwerking" />}
      </div>
    </div>
  )
}
