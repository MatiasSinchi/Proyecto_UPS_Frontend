import { Clock, MapPin } from 'lucide-react'
import { schedule } from '../../data/student'
import type { ClassSession } from '../../types'

const dayNames = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']

export function classesFor(day: number): ClassSession[] {
  return schedule.filter((c) => c.day === day).sort((a, b) => a.start.localeCompare(b.start))
}

export function TodaySchedule({ day, now }: { day: number; now: string }) {
  const classes = classesFor(day)

  if (classes.length === 0) {
    return <p className="text-sm text-slate-500">No tienes clases este {dayNames[day]}.</p>
  }

  return (
    <ol className="relative space-y-3 border-l border-slate-200 pl-5 dark:border-slate-800">
      {classes.map((c) => {
        const current = now >= c.start && now < c.end
        const past = now >= c.end
        return (
          <li key={c.course + c.start} className={past ? 'opacity-55' : undefined}>
            <span
              className={`absolute -left-[5px] mt-1.5 size-2.5 rounded-full ring-4 ring-white dark:ring-slate-900 ${current ? 'bg-accent-500' : 'bg-brand-600'}`}
              aria-hidden
            />
            <p className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Clock className="size-3.5" aria-hidden /> {c.start} – {c.end}
              {current && <span className="rounded-full bg-accent-100 px-2 text-accent-700 dark:bg-accent-500/15 dark:text-accent-300">En curso</span>}
            </p>
            <p className="font-medium text-slate-900 dark:text-white">{c.course}</p>
            <p className="flex items-center gap-1 text-sm text-slate-500">
              <MapPin className="size-3.5" aria-hidden /> {c.room} · {c.teacher}
            </p>
          </li>
        )
      })}
    </ol>
  )
}
