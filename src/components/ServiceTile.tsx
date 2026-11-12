import { Star } from 'lucide-react'
import type { Service } from '../types'
import { usePreferences } from '../lib/preferences'
import { cn } from '../lib/format'
import { ExternalMark } from './ui/ExternalMark'

export function ServiceTile({ service, compact }: { service: Service; compact?: boolean }) {
  const { isFavorite, toggleFavorite } = usePreferences()
  const fav = isFavorite(service.id)
  const Icon = service.icon

  return (
    <div className="group relative flex rounded-2xl border border-slate-200 bg-white transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-500/50">
      <a
        href={service.href}
        target={service.external ? '_blank' : undefined}
        rel={service.external ? 'noreferrer' : undefined}
        className={cn('flex min-w-0 flex-1 items-start gap-3 rounded-2xl', compact ? 'p-3' : 'p-4')}
      >
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-700 group-hover:text-white dark:bg-brand-500/15 dark:text-brand-200">
          <Icon className="size-5" aria-hidden />
        </span>
        <span className="min-w-0 pr-6">
          <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-white">
            <span className="truncate">{service.name}</span>
            {service.external && <ExternalMark />}
          </span>
          {!compact && <span className="mt-0.5 block text-sm text-slate-500 dark:text-slate-400">{service.description}</span>}
        </span>
      </a>
      <button
        onClick={() => toggleFavorite(service.id)}
        className={cn(
          'absolute right-2 top-2 rounded-lg p-1.5 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800',
          fav ? 'text-accent-500' : 'text-slate-300 dark:text-slate-600',
        )}
        aria-pressed={fav}
        aria-label={fav ? `Quitar ${service.name} de favoritos` : `Añadir ${service.name} a favoritos`}
      >
        <Star className="size-4" fill={fav ? 'currentColor' : 'none'} />
      </button>
    </div>
  )
}
