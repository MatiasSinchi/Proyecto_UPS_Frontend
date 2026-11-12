import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { libraryKindLabels, libraryResources } from '../data/library'
import { cn } from '../lib/format'
import { ExternalMark } from '../components/ui/ExternalMark'
import type { LibraryKind } from '../types'

const normalize = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
const kinds = Object.keys(libraryKindLabels) as LibraryKind[]

// Color estable por recurso para el monograma (sustituye a los logos en base64).
const palette = ['bg-brand-700', 'bg-brand-500', 'bg-sky-700', 'bg-teal-700', 'bg-indigo-700', 'bg-slate-700']
const colorFor = (name: string) => palette[[...name].reduce((h, ch) => h + ch.charCodeAt(0), 0) % palette.length]
const initials = (name: string) => name.replace(/[^A-Za-z0-9 ]/g, '').split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()

export function Library() {
  const [query, setQuery] = useState('')
  const [kind, setKind] = useState<LibraryKind | 'todos'>('todos')

  const filtered = useMemo(() => {
    const q = normalize(query.trim())
    return libraryResources.filter(
      (r) => (kind === 'todos' || r.kind === kind) && (!q || normalize(`${r.name} ${r.description}`).includes(q)),
    )
  }, [query, kind])

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Biblioteca e investigación</h1>
        <p className="text-sm text-slate-500">Accede con tu cuenta institucional. Fuera del campus se te pedirá iniciar sesión.</p>
      </header>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <label className="relative w-full lg:w-80 lg:shrink-0">
          <span className="sr-only">Buscar recursos</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ej. ingeniería, derecho, salud…"
            className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-brand-400 dark:border-slate-700 dark:bg-slate-900"
          />
        </label>
        <div className="flex min-w-0 gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Tipo de recurso">
          {(['todos', ...kinds] as const).map((k) => (
            <button
              key={k}
              role="tab"
              aria-selected={kind === k}
              onClick={() => setKind(k)}
              className={cn(
                'shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors',
                kind === k ? 'bg-brand-700 text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-700',
              )}
            >
              {k === 'todos' ? `Todos (${libraryResources.length})` : libraryKindLabels[k]}
            </button>
          ))}
        </div>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((r) => (
          <li key={r.name}>
            <a
              href={r.href}
              target="_blank"
              rel="noreferrer"
              className="flex h-full items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <span className={cn('grid size-10 shrink-0 place-items-center rounded-xl text-sm font-bold text-white', colorFor(r.name))} aria-hidden>
                {initials(r.name)}
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
                  <span className="truncate">{r.name}</span> <ExternalMark />
                </span>
                <span className="block text-sm text-slate-500 dark:text-slate-400">{r.description}</span>
                <span className="mt-1 block text-xs text-brand-600 dark:text-brand-300">{libraryKindLabels[r.kind]}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
      {filtered.length === 0 && <p className="py-12 text-center text-slate-500">Sin recursos para “{query}”.</p>}
    </div>
  )
}
