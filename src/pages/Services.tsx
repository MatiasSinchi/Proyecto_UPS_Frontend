import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { ServiceTile } from '../components/ServiceTile'
import { categoryLabels, services } from '../data/services'
import { cn } from '../lib/format'
import type { ServiceCategory } from '../types'

const normalize = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
const categories = Object.keys(categoryLabels) as ServiceCategory[]

export function Services() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<ServiceCategory | 'todos'>('todos')

  const filtered = useMemo(() => {
    const q = normalize(query.trim())
    return services.filter(
      (s) =>
        (category === 'todos' || s.category === category) &&
        (!q || normalize(`${s.name} ${s.description} ${s.keywords?.join(' ') ?? ''}`).includes(q)),
    )
  }, [query, category])

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Servicios</h1>
        <p className="text-sm text-slate-500">
          {services.length} servicios en {categories.length} categorías. Los marcados con <span aria-hidden>↗</span> abren otra aplicación.
        </p>
      </header>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <label className="relative w-full lg:w-80 lg:shrink-0">
          <span className="sr-only">Filtrar servicios</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filtrar por nombre…"
            className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-brand-400 dark:border-slate-700 dark:bg-slate-900"
          />
        </label>
        <div className="flex min-w-0 gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Categorías">
          {(['todos', ...categories] as const).map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={category === c}
              onClick={() => setCategory(c)}
              className={cn(
                'shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors',
                category === c ? 'bg-brand-700 text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-700',
              )}
            >
              {c === 'todos' ? 'Todos' : categoryLabels[c]}
            </button>
          ))}
        </div>
      </div>

      {categories
        .filter((c) => filtered.some((s) => s.category === c))
        .map((c) => (
          <section key={c} aria-labelledby={`cat-${c}`}>
            <h2 id={`cat-${c}`} className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">
              {categoryLabels[c]}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {filtered
                .filter((s) => s.category === c)
                .map((s) => (
                  <ServiceTile key={s.id} service={s} />
                ))}
            </div>
          </section>
        ))}

      {filtered.length === 0 && <p className="py-12 text-center text-slate-500">Ningún servicio coincide con “{query}”.</p>}
    </div>
  )
}
