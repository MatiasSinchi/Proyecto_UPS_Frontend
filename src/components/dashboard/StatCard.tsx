import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '../../lib/format'

interface StatCardProps {
  label: string
  value: ReactNode
  detail?: ReactNode
  icon: LucideIcon
  tone?: 'brand' | 'accent' | 'success' | 'danger'
  sensitive?: boolean
}

const toneClasses = {
  brand: 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-200',
  accent: 'bg-accent-100 text-accent-700 dark:bg-accent-500/15 dark:text-accent-300',
  success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300',
  danger: 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300',
}

export function StatCard({ label, value, detail, icon: Icon, tone = 'brand', sensitive }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
        <span className={cn('grid size-9 place-items-center rounded-xl', toneClasses[tone])}>
          <Icon className="size-5" aria-hidden />
        </span>
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white" data-sensitive={sensitive || undefined}>
        {value}
      </p>
      {detail && <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{detail}</div>}
    </div>
  )
}
