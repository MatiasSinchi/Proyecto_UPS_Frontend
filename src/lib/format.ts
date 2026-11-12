import type { Installment, InstallmentStatus } from '../types'

const money = new Intl.NumberFormat('es-EC', { style: 'currency', currency: 'USD' })
export const formatMoney = (n: number) => money.format(n)

const longDate = new Intl.DateTimeFormat('es-EC', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
const shortDate = new Intl.DateTimeFormat('es-EC', { day: 'numeric', month: 'short', timeZone: 'UTC' })
export const formatDate = (iso: string) => longDate.format(new Date(iso))
export const formatShortDate = (iso: string) => shortDate.format(new Date(iso))

export const daysBetween = (fromIso: string, toIso: string) =>
  Math.round((Date.parse(toIso) - Date.parse(fromIso)) / 86_400_000)

/** Estado de cada cuota: la primera con saldo y fecha futura es la "próxima". */
export function withStatus(items: Installment[], today: string) {
  const nextDue = items
    .filter((i) => i.balance > 0 && i.dueDate >= today)
    .reduce<string | null>((min, i) => (min === null || i.dueDate < min ? i.dueDate : min), null)

  return items.map((i) => {
    let status: InstallmentStatus
    if (i.balance === 0) status = 'pagada'
    else if (i.dueDate < today) status = 'vencida'
    else if (i.dueDate === nextDue) status = 'proxima'
    else status = 'pendiente'
    return { ...i, status, toPay: Math.max(i.balance - i.earlyDiscount, 0) }
  })
}

export function paymentSummary(items: Installment[], today: string) {
  const rows = withStatus(items, today)
  const owed = rows.reduce((s, r) => s + r.balance, 0)
  const overdue = rows.filter((r) => r.status === 'vencida').reduce((s, r) => s + r.balance, 0)
  const savings = rows.filter((r) => r.balance > 0).reduce((s, r) => s + r.earlyDiscount, 0)
  const next = rows.filter((r) => r.status === 'proxima')
  const nextDate = next[0]?.dueDate ?? null
  const nextAmount = next.reduce((s, r) => s + r.toPay, 0)
  return { rows, owed, overdue, savings, nextDate, nextAmount }
}

export const greeting = (hour: number) => (hour < 12 ? 'Buenos días' : hour < 19 ? 'Buenas tardes' : 'Buenas noches')

export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ')
