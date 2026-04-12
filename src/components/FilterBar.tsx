'use client'

import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
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

function FilterSelect({
  waarde,
  placeholder,
  opties,
  onChange,
}: {
  waarde: string
  placeholder: string
  opties: string[]
  onChange: (v: string) => void
}) {
  return (
    <Select value={waarde || '__leeg__'} onValueChange={(v) => onChange(v === '__leeg__' ? '' : (v ?? ''))}>
      <SelectTrigger className="h-8 text-xs w-full">
        <span className={waarde ? 'text-foreground' : 'text-muted-foreground'}>
          {waarde || placeholder}
        </span>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="__leeg__">{placeholder}</SelectItem>
        {opties.map((o) => (
          <SelectItem key={o} value={o}>{o}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export function FilterBar({ zoekterm, filters, onZoektermChange, onFilterChange, onReset }: Props) {
  const heeftFilters = zoekterm || filters.niveau || filters.taxonomie || filters.status || filters.vraagtype

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Input
        placeholder="Zoek in vraagteksten..."
        value={zoekterm}
        onChange={(e) => onZoektermChange(e.target.value)}
        className="h-8 text-xs w-48 shrink-0"
      />
      <FilterSelect
        waarde={filters.niveau}
        placeholder="Alle niveaus"
        opties={NIVEAUS}
        onChange={(v) => onFilterChange('niveau', v)}
      />
      <FilterSelect
        waarde={filters.taxonomie}
        placeholder="Alle taxonomie"
        opties={TAXONOMIE}
        onChange={(v) => onFilterChange('taxonomie', v)}
      />
      <FilterSelect
        waarde={filters.status}
        placeholder="Alle statussen"
        opties={STATUSSEN}
        onChange={(v) => onFilterChange('status', v)}
      />
      <FilterSelect
        waarde={filters.vraagtype}
        placeholder="Alle typen"
        opties={VRAAGTYPES}
        onChange={(v) => onFilterChange('vraagtype', v)}
      />
      {heeftFilters && (
        <button
          onClick={onReset}
          className="text-xs text-muted-foreground hover:text-foreground underline shrink-0"
        >
          Wis filters
        </button>
      )}
    </div>
  )
}
