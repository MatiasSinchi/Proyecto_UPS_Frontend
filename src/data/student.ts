import type { ClassSession, Installment, Notice, Student } from '../types'

// Datos ficticios. En producción se obtienen de los servicios que hoy alimentan los portlets.
export const student: Student = {
  firstName: 'Andrea',
  lastName: 'Morales Quito',
  id: '0105XXXXXX',
  career: 'Ingeniería en Computación',
  campus: 'Sede Cuenca',
  level: 6,
  period: '2026 - 2027',
  average: 8.7,
  enrollmentStatus: 'matriculado',
}

export const installments: Installment[] = [
  { invoice: '1720451', concept: 'Colegiatura', dueDate: '2026-10-02', amount: 0, balance: 0, earlyDiscount: 0 },
  { invoice: '1720451', concept: 'Colegiatura', dueDate: '2026-10-08', amount: 135.4, balance: 0, earlyDiscount: 0 },
  { invoice: '1720451', concept: 'Colegiatura', dueDate: '2026-11-05', amount: 135.4, balance: 0, earlyDiscount: 0 },
  { invoice: '1720451', concept: 'Colegiatura', dueDate: '2026-12-03', amount: 135.4, balance: 135.4, earlyDiscount: 6.77 },
  { invoice: '1720451', concept: 'Colegiatura', dueDate: '2026-12-29', amount: 135.4, balance: 135.4, earlyDiscount: 6.77 },
  { invoice: '1720451', concept: 'Colegiatura', dueDate: '2027-01-28', amount: 135.4, balance: 135.4, earlyDiscount: 6.77 },
  { invoice: '40211', concept: 'Matrícula y servicios', dueDate: '2026-10-02', amount: 100, balance: 0, earlyDiscount: 0 },
  { invoice: '40211', concept: 'Matrícula y servicios', dueDate: '2026-10-08', amount: 268.5, balance: 0, earlyDiscount: 0 },
  { invoice: '40211', concept: 'Matrícula y servicios', dueDate: '2026-11-05', amount: 268.5, balance: 268.5, earlyDiscount: 0 },
  { invoice: '40211', concept: 'Matrícula y servicios', dueDate: '2026-12-03', amount: 268.5, balance: 268.5, earlyDiscount: 13.43 },
  { invoice: '40211', concept: 'Matrícula y servicios', dueDate: '2026-12-29', amount: 268.5, balance: 268.5, earlyDiscount: 13.43 },
  { invoice: '40211', concept: 'Matrícula y servicios', dueDate: '2027-01-28', amount: 268.5, balance: 268.5, earlyDiscount: 13.43 },
]

export const schedule: ClassSession[] = [
  { day: 1, start: '07:00', end: '09:00', course: 'Sistemas Operativos', room: 'Bloque C · 203', teacher: 'Ing. P. Vázquez' },
  { day: 1, start: '09:00', end: '11:00', course: 'Redes de Computadoras I', room: 'Lab. Redes 2', teacher: 'Ing. M. Cárdenas' },
  { day: 2, start: '11:00', end: '13:00', course: 'Ingeniería de Software', room: 'Bloque B · 105', teacher: 'Mgtr. L. Ortiz' },
  { day: 3, start: '07:00', end: '09:00', course: 'Sistemas Operativos', room: 'Bloque C · 203', teacher: 'Ing. P. Vázquez' },
  { day: 3, start: '14:00', end: '16:00', course: 'Inteligencia Artificial', room: 'Lab. Cómputo 4', teacher: 'PhD. R. Peña' },
  { day: 4, start: '07:00', end: '09:00', course: 'Redes de Computadoras I', room: 'Lab. Redes 2', teacher: 'Ing. M. Cárdenas' },
  { day: 4, start: '11:00', end: '13:00', course: 'Ingeniería de Software', room: 'Bloque B · 105', teacher: 'Mgtr. L. Ortiz' },
  { day: 4, start: '16:00', end: '18:00', course: 'Ética y Ciudadanía', room: 'Bloque A · 012', teacher: 'Lcdo. J. Andrade' },
  { day: 5, start: '09:00', end: '11:00', course: 'Inteligencia Artificial', room: 'Lab. Cómputo 4', teacher: 'PhD. R. Peña' },
]

export const notices: Notice[] = [
  { id: 'n1', title: 'Cuota vencida', body: 'La cuota de Matrícula y servicios del 5 de noviembre tiene saldo pendiente.', date: '2026-11-06', kind: 'pago', read: false },
  { id: 'n2', title: 'Pronto pago disponible', body: 'Paga antes del 3 de diciembre y ahorra 5 % en tus próximas cuotas.', date: '2026-11-10', kind: 'pago', read: false },
  { id: 'n3', title: 'Calificaciones publicadas', body: 'Ya puedes ver la nota del primer interciclo de Ingeniería de Software.', date: '2026-11-09', kind: 'academico', read: true },
  { id: 'n4', title: 'Evaluación docente abierta', body: 'Evalúa a tus docentes hasta el 30 de noviembre.', date: '2026-11-03', kind: 'academico', read: true },
]

/** Fecha de referencia del prototipo, para que los estados de las cuotas sean reproducibles. */
export const TODAY = '2026-11-12'
