'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { CurriculumTree } from '@/components/CurriculumTree'
import { EditieMetMethode, HoofdstukMetParagrafen, getHoofdstukken } from '@/lib/queries'

type Props = {
  edities: EditieMetMethode[]
  onParagraafSelect: (id: string, titel: string, nummer: number | null) => void
}

export function CurriculumSidebar({ edities, onParagraafSelect }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const editieId = searchParams.get('editie') ?? edities[0]?.id ?? ''
  const paragraafId = searchParams.get('paragraaf') ?? ''

  const [hoofdstukken, setHoofdstukken] = useState<HoofdstukMetParagrafen[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!editieId) return
    setLoading(true)
    getHoofdstukken(editieId).then((h) => {
      setHoofdstukken(h)
      setLoading(false)
    })
  }, [editieId])

  const geselecteerdeEditie = edities.find((e) => e.id === editieId)
  const editieLabel = geselecteerdeEditie
    ? `${geselecteerdeEditie.methode.naam} — ${geselecteerdeEditie.naam}`
    : 'Kies editie...'

  const handleEditieChange = useCallback(
    (id: string | null) => {
      if (!id) return
      const params = new URLSearchParams(searchParams.toString())
      params.set('editie', id)
      params.delete('paragraaf')
      router.push(`/?${params.toString()}`)
    },
    [router, searchParams]
  )

  const handleParagraafSelect = useCallback(
    (id: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('paragraaf', id)
      if (editieId) params.set('editie', editieId)
      router.push(`/?${params.toString()}`)

      const paragraaf = hoofdstukken
        .flatMap((h) => h.paragrafen)
        .find((p) => p.id === id)
      if (paragraaf) {
        onParagraafSelect(id, paragraaf.titel, paragraaf.nummer)
      }
    },
    [router, searchParams, editieId, hoofdstukken, onParagraafSelect]
  )

  return (
    <aside className="w-[280px] shrink-0 h-screen flex flex-col bg-muted border-r">
      <div className="p-4 space-y-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Editie</p>
        <Select value={editieId} onValueChange={handleEditieChange}>
          <SelectTrigger className="h-8 text-xs bg-background w-full">
            <span className="flex-1 truncate text-left">{editieLabel}</span>
          </SelectTrigger>
          <SelectContent>
            {edities.map((e) => (
              <SelectItem key={e.id} value={e.id}>
                {e.methode.naam} — {e.naam}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <ScrollArea className="flex-1 px-3 py-2">
        {loading ? (
          <p className="text-xs text-muted-foreground p-2">Laden...</p>
        ) : (
          <CurriculumTree
            hoofdstukken={hoofdstukken}
            geselecteerdeParagraafId={paragraafId}
            onSelectParagraaf={handleParagraafSelect}
          />
        )}
      </ScrollArea>
    </aside>
  )
}
