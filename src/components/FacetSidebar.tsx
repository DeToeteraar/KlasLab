'use client'

import { cn } from '@/lib/utils'
import { Facetten } from '@/lib/queries'
import { ActieveFilters } from '@/types/database'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

const BLOOM_KLEUR: Record<string, string> = {
  Onthouden: 'bg-slate-100 text-slate-700',
  Begrijpen: 'bg-blue-100 text-blue-700',
  Toepassen: 'bg-green-100 text-green-700',
  Analyseren: 'bg-amber-100 text-amber-700',
  Evalueren: 'bg-orange-100 text-orange-700',
  Creëren: 'bg-red-100 text-red-700',
}

type Props = {
  facetten: Facetten
  filters: ActieveFilters
  totaal: number
  gefilterd: number
  onFilterChange: (update: Partial<ActieveFilters>) => void
  onReset: () => void
}

function FacetGroep({
  titel,
  children,
}: {
  titel: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-1">
        {titel}
      </p>
      {children}
    </div>
  )
}

function FacetOptie({
  label,
  count,
  actief,
  klasse,
  onClick,
}: {
  label: string
  count: number
  actief: boolean
  klasse?: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center justify-between w-full px-2 py-1 rounded text-xs text-left transition-colors',
        actief
          ? 'bg-slate-800 text-white font-medium'
          : 'hover:bg-slate-100 text-slate-700',
        klasse && !actief && klasse
      )}
    >
      <span className="truncate">{label}</span>
      <span className={cn('ml-2 shrink-0 tabular-nums', actief ? 'text-slate-300' : 'text-muted-foreground')}>
        {count}
      </span>
    </button>
  )
}

export function FacetSidebar({ facetten, filters, totaal, gefilterd, onFilterChange, onReset }: Props) {
  const heeftFilters = Object.entries(filters).some(([k, v]) => k !== 'zoekterm' ? v !== null : v !== '')

  return (
    <aside className="w-[260px] shrink-0 h-screen flex flex-col bg-muted border-r overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b">
        <p className="text-sm font-semibold">KlasLab Vragenbank</p>
        <p className="text-xs text-muted-foreground">
          {gefilterd === totaal ? `${totaal} vragen` : `${gefilterd} van ${totaal} vragen`}
        </p>
      </div>

      {/* Zoekbalk */}
      <div className="px-3 py-2">
        <Input
          placeholder="Zoek in vraagteksten..."
          value={filters.zoekterm}
          onChange={(e) => onFilterChange({ zoekterm: e.target.value })}
          className="h-7 text-xs bg-background"
        />
      </div>

      <Separator />

      {/* Facetten */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">

        {facetten.hoofdstukken.length > 0 && (
          <FacetGroep titel="Hoofdstuk">
            {facetten.hoofdstukken.map((h) => (
              <FacetOptie
                key={h.id}
                label={h.label}
                count={h.count}
                actief={filters.hoofdstuk_id === h.id}
                onClick={() => onFilterChange({
                  hoofdstuk_id: filters.hoofdstuk_id === h.id ? null : h.id,
                  paragraaf_id: null,
                  leerdoel: null,
                })}
              />
            ))}
          </FacetGroep>
        )}

        {facetten.paragrafen.length > 0 && (
          <FacetGroep titel="Paragraaf">
            {facetten.paragrafen.map((p) => (
              <FacetOptie
                key={p.id}
                label={p.label}
                count={p.count}
                actief={filters.paragraaf_id === p.id}
                onClick={() => onFilterChange({
                  paragraaf_id: filters.paragraaf_id === p.id ? null : p.id,
                  leerdoel: null,
                })}
              />
            ))}
          </FacetGroep>
        )}

        {facetten.leerdoelen.length > 0 && (
          <FacetGroep titel="Leerdoel">
            {facetten.leerdoelen.map((ld) => (
              <FacetOptie
                key={ld.label}
                label={ld.label}
                count={ld.count}
                actief={filters.leerdoel === ld.label}
                onClick={() => onFilterChange({ leerdoel: filters.leerdoel === ld.label ? null : ld.label })}
              />
            ))}
          </FacetGroep>
        )}

        {facetten.taxonomie.length > 0 && (
          <FacetGroep titel="Bloom-taxonomie">
            {facetten.taxonomie.map((t) => (
              <FacetOptie
                key={t.label}
                label={t.label}
                count={t.count}
                actief={filters.taxonomie === t.label}
                klasse={BLOOM_KLEUR[t.label]}
                onClick={() => onFilterChange({ taxonomie: filters.taxonomie === t.label ? null : t.label })}
              />
            ))}
          </FacetGroep>
        )}

        {facetten.vraagtypes.length > 0 && (
          <FacetGroep titel="Vraagtype">
            {facetten.vraagtypes.map((vt) => (
              <FacetOptie
                key={vt.label}
                label={vt.label}
                count={vt.count}
                actief={filters.vraagtype === vt.label}
                onClick={() => onFilterChange({ vraagtype: filters.vraagtype === vt.label ? null : vt.label })}
              />
            ))}
          </FacetGroep>
        )}

        {facetten.niveaus.length > 0 && (
          <FacetGroep titel="Niveau">
            {facetten.niveaus.map((n) => (
              <FacetOptie
                key={n.label}
                label={n.label}
                count={n.count}
                actief={filters.niveau === n.label}
                onClick={() => onFilterChange({ niveau: filters.niveau === n.label ? null : n.label })}
              />
            ))}
          </FacetGroep>
        )}

        {facetten.statussen.length > 0 && (
          <FacetGroep titel="Status">
            {facetten.statussen.map((s) => (
              <FacetOptie
                key={s.label}
                label={s.label}
                count={s.count}
                actief={filters.status === s.label}
                onClick={() => onFilterChange({ status: filters.status === s.label ? null : s.label })}
              />
            ))}
          </FacetGroep>
        )}
      </div>

      {/* Reset */}
      {heeftFilters && (
        <>
          <Separator />
          <div className="px-3 py-2">
            <button
              onClick={onReset}
              className="text-xs text-muted-foreground hover:text-foreground underline"
            >
              Alle filters wissen
            </button>
          </div>
        </>
      )}
    </aside>
  )
}
