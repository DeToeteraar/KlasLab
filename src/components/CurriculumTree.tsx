'use client'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { HoofdstukMetParagrafen } from '@/lib/queries'
import { useState } from 'react'

type Props = {
  hoofdstukken: HoofdstukMetParagrafen[]
  geselecteerdeParagraafId: string | null
  onSelectParagraaf: (id: string) => void
}

export function CurriculumTree({ hoofdstukken, geselecteerdeParagraafId, onSelectParagraaf }: Props) {
  const [openHoofdstukken, setOpenHoofdstukken] = useState<Set<string>>(
    new Set(hoofdstukken.map((h) => h.id))
  )

  const toggleHoofdstuk = (id: string) => {
    setOpenHoofdstukken((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="space-y-0.5">
      {hoofdstukken.map((h) => {
        const isOpen = openHoofdstukken.has(h.id)
        return (
          <Collapsible key={h.id} open={isOpen} onOpenChange={() => toggleHoofdstuk(h.id)}>
            <CollapsibleTrigger className="flex items-center gap-1 w-full px-2 py-1.5 text-left hover:bg-slate-100 rounded text-sm font-medium">
              <ChevronRight
                className={cn('h-3.5 w-3.5 text-muted-foreground transition-transform shrink-0', isOpen && 'rotate-90')}
              />
              <span className="flex-1 truncate">
                {h.nummer != null ? `H${h.nummer} ` : ''}{h.titel}
              </span>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="ml-4 space-y-0.5 mt-0.5">
                {h.paragrafen.map((p) => {
                  const actief = p.id === geselecteerdeParagraafId
                  const heeftVragen = p.vraagCount > 0
                  return (
                    <button
                      key={p.id}
                      onClick={() => onSelectParagraaf(p.id)}
                      className={cn(
                        'flex items-center gap-1.5 w-full px-2 py-1 text-left rounded text-xs',
                        actief
                          ? 'bg-slate-200 text-slate-900 font-medium'
                          : 'hover:bg-slate-100 text-slate-700'
                      )}
                    >
                      <span className={cn('text-base leading-none', heeftVragen ? 'text-blue-500' : 'text-slate-300')}>
                        {heeftVragen ? '●' : '○'}
                      </span>
                      <span className="flex-1 truncate">
                        {p.nummer != null ? `§${p.nummer} ` : ''}{p.titel}
                      </span>
                      <span className="text-muted-foreground shrink-0">{p.vraagCount}</span>
                    </button>
                  )
                })}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )
      })}
    </div>
  )
}
