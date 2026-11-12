import type { LucideIcon } from 'lucide-react'

export interface Student {
  firstName: string
  lastName: string
  id: string
  career: string
  campus: string
  level: number
  period: string
  average: number
  enrollmentStatus: 'matriculado' | 'pendiente' | 'no-matriculado'
}

export type ServiceCategory = 'academico' | 'matricula' | 'finanzas' | 'tramites' | 'cuenta' | 'datos'

export interface Service {
  id: string
  name: string
  description: string
  href: string
  category: ServiceCategory
  icon: LucideIcon
  /** Abre otra aplicación de la universidad fuera del portal */
  external?: boolean
  keywords?: string[]
}

export interface Installment {
  invoice: string
  concept: string
  dueDate: string // ISO yyyy-mm-dd
  amount: number
  balance: number
  earlyDiscount: number
}

export type InstallmentStatus = 'pagada' | 'vencida' | 'proxima' | 'pendiente'

export type LibraryKind = 'bases' | 'bibliotecas' | 'abierto' | 'revistas' | 'fondos' | 'patentes'

export interface LibraryResource {
  name: string
  href: string
  kind: LibraryKind
  description: string
}

export interface ClassSession {
  day: number // 1 = lunes ... 6 = sábado
  start: string
  end: string
  course: string
  room: string
  teacher: string
}

export interface Notice {
  id: string
  title: string
  body: string
  date: string
  kind: 'pago' | 'academico' | 'sistema'
  read: boolean
}
