import { Fragment } from 'react'
import { Badge } from '../ui/Badge'
import { formatDate, formatMoney, formatShortDate, withStatus } from '../../lib/format'
import type { Installment, InstallmentStatus } from '../../types'

const statusBadge: Record<InstallmentStatus, { label: string; tone: 'success' | 'danger' | 'warning' | 'neutral' }> = {
  pagada: { label: 'Pagada', tone: 'success' },
  vencida: { label: 'Vencida', tone: 'danger' },
  proxima: { label: 'Próxima', tone: 'warning' },
  pendiente: { label: 'Pendiente', tone: 'neutral' },
}

interface Props {
  items: Installment[]
  today: string
  /** Solo cuotas con saldo (vista resumida de la portada) */
  onlyPending?: boolean
}

export function PaymentsTable({ items, today, onlyPending }: Props) {
  const rows = withStatus(items, today).filter((r) => !onlyPending || r.balance > 0)
  const invoices = [...new Set(rows.map((r) => r.invoice))]

  return (
    <>
      {/* Escritorio: tabla agrupada por factura */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-sm">
          <caption className="sr-only">Cuotas del período académico agrupadas por factura</caption>
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wider text-slate-500 dark:border-slate-800">
              <th scope="col" className="py-2 pr-4 font-medium">Vence</th>
              <th scope="col" className="py-2 pr-4 font-medium">Estado</th>
              <th scope="col" className="py-2 pr-4 text-right font-medium">Valor cuota</th>
              <th scope="col" className="py-2 pr-4 text-right font-medium">Saldo</th>
              <th scope="col" className="py-2 pr-4 text-right font-medium">Pronto pago</th>
              <th scope="col" className="py-2 text-right font-medium">A pagar</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => {
              const group = rows.filter((r) => r.invoice === inv)
              return (
                <Fragment key={inv}>
                  <tr>
                    <th scope="rowgroup" colSpan={6} className="pb-1 pt-4 text-left text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {group[0].concept} <span className="font-normal text-slate-400">· Factura {inv}</span>
                    </th>
                  </tr>
                  {group.map((r) => (
                    <tr key={r.invoice + r.dueDate} className="border-b border-slate-100 last:border-0 dark:border-slate-800/70">
                      <td className="py-2.5 pr-4 text-slate-700 dark:text-slate-300">{formatDate(r.dueDate)}</td>
                      <td className="py-2.5 pr-4">
                        <Badge tone={statusBadge[r.status].tone}>{statusBadge[r.status].label}</Badge>
                      </td>
                      <td className="py-2.5 pr-4 text-right tabular-nums" data-sensitive>{formatMoney(r.amount)}</td>
                      <td className="py-2.5 pr-4 text-right tabular-nums" data-sensitive>{formatMoney(r.balance)}</td>
                      <td className="py-2.5 pr-4 text-right tabular-nums text-emerald-700 dark:text-emerald-400" data-sensitive>
                        {r.earlyDiscount > 0 && r.balance > 0 ? `−${formatMoney(r.earlyDiscount)}` : '—'}
                      </td>
                      <td className="py-2.5 text-right font-semibold tabular-nums text-slate-900 dark:text-white" data-sensitive>
                        {formatMoney(r.toPay)}
                      </td>
                    </tr>
                  ))}
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Móvil: tarjetas en lugar de una tabla que desborda */}
      <ul className="space-y-2 md:hidden">
        {rows.map((r) => (
          <li key={r.invoice + r.dueDate} className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 p-3 dark:border-slate-800">
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-900 dark:text-white">{formatShortDate(r.dueDate)} · {r.concept}</p>
              <div className="mt-1">
                <Badge tone={statusBadge[r.status].tone}>{statusBadge[r.status].label}</Badge>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold tabular-nums" data-sensitive>{formatMoney(r.toPay)}</p>
              {r.earlyDiscount > 0 && r.balance > 0 && (
                <p className="text-xs text-emerald-700 dark:text-emerald-400" data-sensitive>ahorras {formatMoney(r.earlyDiscount)}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
