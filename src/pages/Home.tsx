import { Link } from 'react-router-dom'
import { AlertTriangle, ArrowRight, BookOpen, CalendarClock, CalendarDays, CreditCard, GraduationCap, TrendingUp } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { StatCard } from '../components/dashboard/StatCard'
import { NoticeBanner } from '../components/dashboard/NoticeBanner'
import { PaymentsTable } from '../components/dashboard/PaymentsTable'
import { TodaySchedule, classesFor } from '../components/dashboard/TodaySchedule'
import { ServiceTile } from '../components/ServiceTile'
import { installments, student, TODAY } from '../data/student'
import { services } from '../data/services'
import { libraryResources } from '../data/library'
import { usePreferences } from '../lib/preferences'
import { daysBetween, formatDate, formatMoney, formatShortDate, greeting, paymentSummary } from '../lib/format'

export function Home() {
  const { favorites } = usePreferences()
  const now = new Date()
  const time = now.toTimeString().slice(0, 5)
  const day = new Date(TODAY + 'T12:00:00').getDay()
  const summary = paymentSummary(installments, TODAY)
  const todayClasses = classesFor(day)
  const nextClass = todayClasses.find((c) => c.end > time)
  const favoriteServices = services.filter((s) => favorites.includes(s.id))
  const daysLeft = summary.nextDate ? daysBetween(TODAY, summary.nextDate) : null

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-slate-500">{formatDate(TODAY)}</p>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            {greeting(now.getHours())}, {student.firstName}
          </h1>
        </div>
        <p className="text-sm text-slate-500">
          {student.career} · {student.level}.º nivel · {student.campus}
        </p>
      </div>

      <NoticeBanner />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Próximo pago"
          icon={CreditCard}
          tone="accent"
          sensitive
          value={summary.nextDate ? formatMoney(summary.nextAmount) : 'Sin pagos'}
          detail={summary.nextDate && `${formatShortDate(summary.nextDate)} · en ${daysLeft} días`}
        />
        {summary.overdue > 0 ? (
          <StatCard label="Saldo vencido" icon={AlertTriangle} tone="danger" sensitive value={formatMoney(summary.overdue)} detail={<Link to="/pagos" className="font-medium text-red-700 hover:underline dark:text-red-300">Regularizar ahora</Link>} />
        ) : (
          <StatCard label="Matrícula" icon={GraduationCap} tone="success" value="Matriculado" detail={`Período ${student.period}`} />
        )}
        <StatCard
          label="Clases hoy"
          icon={CalendarClock}
          value={todayClasses.length}
          detail={nextClass ? `Siguiente: ${nextClass.course} ${nextClass.start}` : 'Terminaste por hoy'}
        />
        <StatCard label="Promedio del período" icon={TrendingUp} tone="success" sensitive value={student.average.toFixed(2)} detail="sobre 10 puntos" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card
          className="lg:col-span-2"
          title="Cuotas pendientes"
          description="Solo cuotas con saldo, con el ahorro por pronto pago ya calculado"
          action={
            <a
              href="https://servicesvpos.ups.edu.ec/pag/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-700 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-800"
            >
              Pagar en línea
            </a>
          }
        >
          <div className="mb-4 grid grid-cols-3 gap-3 rounded-xl bg-slate-50 p-3 text-center dark:bg-slate-800/50">
            <div>
              <p className="text-xs text-slate-500">Total adeudado</p>
              <p className="font-semibold tabular-nums" data-sensitive>{formatMoney(summary.owed)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Vencido</p>
              <p className="font-semibold tabular-nums text-red-700 dark:text-red-400" data-sensitive>{formatMoney(summary.overdue)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Ahorro pronto pago</p>
              <p className="font-semibold tabular-nums text-emerald-700 dark:text-emerald-400" data-sensitive>{formatMoney(summary.savings)}</p>
            </div>
          </div>
          <PaymentsTable items={installments} today={TODAY} onlyPending />
          <Link to="/pagos" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline dark:text-brand-300">
            Ver historial completo <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Card>

        <Card title="Horario de hoy" description={new Intl.DateTimeFormat('es-EC', { weekday: 'long' }).format(new Date(TODAY + 'T12:00:00'))} action={<CalendarDays className="size-5 text-slate-400" aria-hidden />}>
          <TodaySchedule day={day} now={time} />
          <a href="https://portal.ups.edu.ec/estudiante-horario-clases" className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline dark:text-brand-300">
            Horario semanal <ArrowRight className="size-4" aria-hidden />
          </a>
        </Card>
      </div>

      <Card
        title="Mis accesos rápidos"
        description="Marca con la estrella los servicios que más usas"
        action={
          <Link to="/servicios" className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-brand-600 hover:underline dark:text-brand-300">
            Todos los servicios <ArrowRight className="size-4" aria-hidden />
          </Link>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {favoriteServices.map((s) => (
            <ServiceTile key={s.id} service={s} compact />
          ))}
        </div>
      </Card>

      <Card
        title="Biblioteca e investigación"
        description={`${libraryResources.length} recursos con tu cuenta institucional`}
        action={
          <Link to="/biblioteca" className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-brand-600 hover:underline dark:text-brand-300">
            Explorar <ArrowRight className="size-4" aria-hidden />
          </Link>
        }
      >
        <ul className="flex flex-wrap gap-2">
          {['Scopus', 'IEEE Xplore', 'ScienceDirect', 'e-Libro', 'Springer', 'EBSCO Discovery Service', 'AVAC'].map((name) => {
            const res = libraryResources.find((r) => r.name === name) ?? { name, href: 'https://avac.ups.edu.ec/' }
            return (
              <li key={name}>
                <a href={res.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-sm hover:border-brand-300 hover:bg-brand-50 dark:border-slate-700 dark:hover:bg-brand-500/10">
                  <BookOpen className="size-3.5 text-brand-600 dark:text-brand-300" aria-hidden /> {name}
                </a>
              </li>
            )
          })}
        </ul>
      </Card>
    </div>
  )
}
