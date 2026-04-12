'use client'

import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FilterState } from '@/components/LeerdoelAccordion'

type Props = {
  zoekterm: string
  filters: FilterState
  onZoektermChange: (v: string) => void
  onFilterChange: (key: keyof FilterState, value: string) => void
  onReset: () => void
}

const NIVEAUS = ['HAVO', 'VWO', 'VMBO-t', 'VMBO-k', 'VMBO-b', 'Basisonderwijs']
const TAXONOMIE = ['Onthouden', 'Begrijpen', 'Toepassen', 'Analyseren', 'Evalueren', 'Creëren']
const STATUSSEN = ['concept', 'gepubliceerd', 'gearchiveerd']
const VRAAGTYPES = ['meerkeuze', 'open', 'berekening', 'waar/onwaar', 'invul']

const LEEG = '__alle__'

export function FilterBar({ zoekterm, filters, onZoektermChange, onFilterChange, onReset }: Props) {
  const heeftFilters =
    zoekterm || filters.niveau || filters.taxonomie || filters.status || filters.vraagtype

  return (
    <div className="space-y-2 pt-3">
      <Input
        placeholder="Zoek in vraagteksten..."
        value={zoekterm}
        onChange={(e) => onZoektermChange(e.target.value)}
        className="h-8 text-sm"
      />

      <div className="space-y-1.5">
        <Select
          value={filters.niveau || LEEG}
          onValueChange={(v) => onFilterChange('niveau', !v || v === LEEG ? '' : v)}
        >
          <SelectTrigger className="h-8 text-xs">
            <SelectValue placeholder="Niveau" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={LEEG}>Alle niveaus</SelectItem>
            {NIVEAUS.map((n) => <SelectItem key={n} value={n}>{n}</SelectItem>)}
          </SelectContent>
        </Select>

        <Select
          value={filters.taxonomie || LEEG}
          onValueChange={(v) => onFilterChange('taxonomie', !v || v === LEEG ? '' : v)}
        >
          <SelectTrigger className="h-8 text-xs">
            <SelectValue placeholder="Taxonomie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={LEEG}>Alle taxonomie</SelectItem>
            {TAXONOMIE.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>

        <Select
          value={filters.status || LEEG}
          onValueChange={(v) => onFilterChange('status', !v || v === LEEG ? '' : v)}
        >
          <SelectTrigger className="h-8 text-xs">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={LEEG}>Alle statussen</SelectItem>
            {STATUSSEN.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>

        <Select
          value={filters.vraagtype || LEEG}
          onValueChange={(v) => onFilterChange('vraagtype', !v || v === LEEG ? '' : v)}
        >
          <SelectTrigger className="h-8 text-xs">
            <SelectValue placeholder="Vraagtype" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={LEEG}>Alle typen</SelectItem>
            {VRAAGTYPES.map((vt) => <SelectItem key={vt} value={vt}>{vt}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {heeftFilters && (
        <button
          onClick={onReset}
          className="text-xs text-muted-foreground hover:text-foreground underline w-full text-left"
        >
          Wis filters
        </button>
      )}
    </div>
  )
}
