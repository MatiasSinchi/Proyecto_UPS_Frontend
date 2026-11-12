import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookMarked, CornerDownLeft, FileText, Search } from 'lucide-react'
import { categoryLabels, manuals, services } from '../data/services'
import { libraryKindLabels, libraryResources } from '../data/library'
import { cn } from '../lib/format'

interface Result {
  id: string
  label: string
  hint: string
  group: string
  href: string
  internal?: boolean
  icon: typeof Search
  keywords?: string[]
}

const pages: Result[] = [
  { id: 'p-inicio', label: 'Inicio', hint: 'Resumen del estudiante', group: 'Páginas', href: '/', internal: true, icon: Search },
  { id: 'p-pagos', label: 'Pagos y cuotas', hint: 'Cuotas, saldos y pronto pago', group: 'Páginas', href: '/pagos', internal: true, icon: Search },
  { id: 'p-servicios', label: 'Todos los servicios', hint: 'Catálogo completo', group: 'Páginas', href: '/servicios', internal: true, icon: Search },
  { id: 'p-biblioteca', label: 'Biblioteca', hint: 'Bases de datos y revistas', group: 'Páginas', href: '/biblioteca', internal: true, icon: Search },
]

const index: Result[] = [
  ...pages,
  ...services.map((s) => ({
    id: s.id,
    label: s.name,
    hint: `${categoryLabels[s.category]} · ${s.description}`,
    group: 'Servicios',
    href: s.href,
    icon: s.icon,
    keywords: s.keywords,
  })),
  ...libraryResources.map((r) => ({
    id: `lib-${r.name}`,
    label: r.name,
    hint: `${libraryKindLabels[r.kind]} · ${r.description}`,
    group: 'Biblioteca',
    href: r.href,
    icon: BookMarked,
  })),
  ...manuals.map((m) => ({ id: `man-${m.name}`, label: `Manual: ${m.name}`, hint: 'PDF de ayuda', group: 'Manuales', href: m.href, icon: FileText })),
]

// Búsqueda sin tildes ni mayúsculas: "matricula" encuentra "Matrícula".
const normalize = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const results = useMemo(() => {
    const q = normalize(query.trim())
    if (!q) return index.filter((r) => r.group === 'Páginas' || r.group === 'Servicios').slice(0, 10)
    return index
      .filter((r) => normalize(`${r.label} ${r.hint} ${r.keywords?.join(' ') ?? ''}`).includes(q))
      .slice(0, 20)
  }, [query])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => setActive(0), [query])

  if (!open) return null

  const go = (r: Result) => {
    onClose()
    if (r.internal) navigate(r.href)
    else window.open(r.href, '_blank', 'noopener')
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter' && results[active]) {
      go(results[active])
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  let lastGroup = ''
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/50 p-4 pt-[12vh] backdrop-blur-sm" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Búsqueda global"
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-slate-100 px-4 dark:border-slate-800">
          <Search className="size-5 text-slate-400" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="¿Qué necesitas hacer?"
            className="h-14 flex-1 bg-transparent text-base outline-none placeholder:text-slate-400"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-results"
            aria-activedescendant={results[active] ? `opt-${results[active].id}` : undefined}
          />
          <kbd className="rounded-md border border-slate-200 px-1.5 py-0.5 text-xs text-slate-400 dark:border-slate-700">Esc</kbd>
        </div>
        <ul id="palette-results" role="listbox" className="max-h-[60vh] overflow-y-auto p-2">
          {results.length === 0 && <li className="px-3 py-8 text-center text-sm text-slate-500">Sin resultados para “{query}”.</li>}
          {results.map((r, i) => {
            const header = r.group !== lastGroup ? r.group : null
            lastGroup = r.group
            return (
              <li key={r.id} role="presentation">
                {header && <p className="px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-wider text-slate-400">{header}</p>}
                <button
                  id={`opt-${r.id}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(r)}
                  className={cn('flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left', i === active && 'bg-brand-50 dark:bg-brand-500/15')}
                >
                  <r.icon className="size-4 shrink-0 text-brand-600 dark:text-brand-300" aria-hidden />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-slate-900 dark:text-white">{r.label}</span>
                    <span className="block truncate text-xs text-slate-500">{r.hint}</span>
                  </span>
                  {i === active && <CornerDownLeft className="size-4 text-slate-400" aria-hidden />}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
