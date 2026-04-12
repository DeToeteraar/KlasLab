import { cn } from '@/lib/utils'

type BadgeType =
  | 'vraagtype'
  | 'punten'
  | 'niveau'
  | 'bloom'
  | 'status'
  | 'asset'
  | 'subvraag'
  | 'correctie'
  | 'uitwerking'
  | 'ai'

const bloomKleur: Record<string, string> = {
  Onthouden: 'bg-slate-100 text-slate-700',
  Begrijpen: 'bg-blue-100 text-blue-700',
  Toepassen: 'bg-green-100 text-green-700',
  Analyseren: 'bg-amber-100 text-amber-700',
  Evalueren: 'bg-orange-100 text-orange-700',
  Creëren: 'bg-red-100 text-red-700',
}

const statusKleur: Record<string, string> = {
  concept: 'bg-amber-100 text-amber-700',
  gepubliceerd: 'bg-green-100 text-green-700',
  gearchiveerd: 'bg-gray-100 text-gray-500',
}

function getKlassen(type: BadgeType, label: string): string {
  const base = 'inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium'

  switch (type) {
    case 'bloom':
      return cn(base, bloomKleur[label] ?? 'bg-slate-100 text-slate-600')
    case 'status':
      return cn(base, statusKleur[label] ?? 'bg-gray-100 text-gray-600')
    case 'vraagtype':
      return cn(base, 'border border-slate-300 text-slate-600 bg-transparent')
    case 'ai':
      return cn(base, 'bg-purple-100 text-purple-700')
    default:
      return cn(base, 'bg-slate-100 text-slate-600')
  }
}

export function MetadataBadge({ type, label }: { type: BadgeType; label: string }) {
  return <span className={getKlassen(type, label)}>{label}</span>
}
