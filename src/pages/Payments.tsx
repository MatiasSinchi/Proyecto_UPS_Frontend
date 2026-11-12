import { CreditCard, Download, Info } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { PaymentsTable } from '../components/dashboard/PaymentsTable'
import { installments, student, TODAY } from '../data/student'
import { formatMoney, paymentSummary } from '../lib/format'

export function Payments() {
  const s = paymentSummary(installments, TODAY)
  const paid = s.rows.filter((r) => r.status === 'pagada').reduce((t, r) => t + r.amount, 0)
  const total = paid + s.owed
  const pct = total > 0 ? Math.round((paid / total) * 100) : 100

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Pagos y cuotas</h1>
        <p className="text-sm text-slate-500">Período académico {student.period}</p>
      </header>

      <Card>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="flex-1">
            <div className="flex items-baseline justify-between">
              <p className="text-sm font-medium text-slate-500">Avance de pagos del período</p>
              <p className="text-sm font-semibold">{pct} %</p>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Avance de pagos">
              <div className="h-full rounded-full bg-brand-600" style={{ width: `${pct}%` }} />
            </div>
            <p className="mt-2 text-sm text-slate-500">
              Pagado <span data-sensitive className="font-medium text-slate-700 dark:text-slate-300">{formatMoney(paid)}</span> de{' '}
              <span data-sensitive className="font-medium text-slate-700 dark:text-slate-300">{formatMoney(total)}</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href="https://servicesvpos.ups.edu.ec/pag/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-800">
              <CreditCard className="size-4" aria-hidden /> Pagar en línea
            </a>
            <a href="https://portal.ups.edu.ec/estudiante-comprobante-pago" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
              <Download className="size-4" aria-hidden /> Comprobantes
            </a>
          </div>
        </div>
      </Card>

      <Card title="Detalle de cuotas" description="Agrupadas por factura, con el estado de cada una">
        <PaymentsTable items={installments} today={TODAY} />
      </Card>

      <p className="flex items-start gap-2 text-sm text-slate-500">
        <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
        El descuento por pronto pago se aplica si pagas la cuota antes de su fecha de vencimiento. Los valores mostrados en este prototipo son ficticios.
      </p>
    </div>
  )
}
