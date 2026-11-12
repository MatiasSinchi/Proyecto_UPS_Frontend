import {
  Award,
  BadgeCheck,
  BookOpen,
  CalendarClock,
  ClipboardList,
  CreditCard,
  Database,
  FileCheck2,
  FileSignature,
  FileText,
  GraduationCap,
  History,
  IdCard,
  KeyRound,
  Mail,
  Network,
  Receipt,
  RefreshCcw,
  ScrollText,
  ShieldCheck,
  ShieldX,
  Star,
  UserCog,
  Users,
  Wallet,
  Briefcase,
  FileSpreadsheet,
  ListChecks,
  ClipboardPen,
} from 'lucide-react'
import type { Service, ServiceCategory } from '../types'

export const categoryLabels: Record<ServiceCategory, string> = {
  academico: 'Académico',
  matricula: 'Matrícula',
  finanzas: 'Pagos y finanzas',
  tramites: 'Trámites y certificados',
  cuenta: 'Mi cuenta',
  datos: 'Protección de datos',
}

// Los 29 enlaces del menú lateral original más correo, Quipux y AVAC, reagrupados por tarea.
export const services: Service[] = [
  // Académico
  { id: 'calificaciones', name: 'Calificaciones', description: 'Notas del período en curso', href: 'https://portal.ups.edu.ec/estudiante-calificaciones', category: 'academico', icon: Award, keywords: ['notas'] },
  { id: 'record', name: 'Récord académico', description: 'Historial completo de asignaturas', href: 'https://portal.ups.edu.ec/estudiante-record', category: 'academico', icon: History, keywords: ['historial'] },
  { id: 'horarios', name: 'Horarios', description: 'Clases, aulas y docentes', href: 'https://portal.ups.edu.ec/estudiante-horario-clases', category: 'academico', icon: CalendarClock },
  { id: 'malla', name: 'Malla curricular', description: 'Plan de estudios de tu carrera', href: 'https://portal.ups.edu.ec/estudiante-malla-curricular', category: 'academico', icon: Network },
  { id: 'cambio-grupo', name: 'Cambio de grupo', description: 'Solicita cambiar de paralelo', href: 'https://portal.ups.edu.ec/estudiante-cambio-grupo', category: 'academico', icon: RefreshCcw },
  { id: 'avac', name: 'AVAC', description: 'Aula virtual de aprendizaje', href: 'https://avac.ups.edu.ec/', category: 'academico', icon: GraduationCap, external: true, keywords: ['aula virtual', 'moodle'] },
  { id: 'evaluacion', name: 'Evaluación docente', description: 'Evalúa a tus docentes académicos y paracadémicos', href: 'https://appwfpc.ups.edu.ec/eva/', category: 'academico', icon: Star, external: true },
  { id: 'paracademicos', name: 'Cursos paracadémicos', description: 'Inscripción en cursos complementarios', href: 'https://appwfpc.ups.edu.ec/mat/', category: 'academico', icon: BookOpen, external: true },
  { id: 'practicas', name: 'Práctica preprofesional', description: 'Estado de tus prácticas', href: 'https://portal.ups.edu.ec/practica-preprofesional-estudiante', category: 'academico', icon: Briefcase },
  { id: 'registro-practicas', name: 'Registro de actividades de prácticas', description: 'Registra horas y actividades', href: 'https://appwfp.ups.edu.ec/vis/pages/actividades-grado/index.xhtml', category: 'academico', icon: ClipboardList, external: true },

  // Matrícula
  { id: 'matricula', name: 'Matrícula en línea', description: 'Inscríbete en las asignaturas del período', href: 'https://appwfpc.ups.edu.ec/mat', category: 'matricula', icon: ClipboardPen, external: true },
  { id: 'requisitos', name: 'Requisitos para matrícula', description: 'Verifica qué te falta antes de matricularte', href: 'https://appwfp.ups.edu.ec/ins-pub/insestudiante/requisitosPostulante.xhtml', category: 'matricula', icon: ListChecks, external: true },
  { id: 'anticipo', name: 'Generar anticipo de matrícula', description: 'Genera la orden de pago del anticipo', href: 'https://appwfp.ups.edu.ec/ins-pub/insestudiante/', category: 'matricula', icon: Receipt, external: true },
  { id: 'info-complementaria', name: 'Información complementaria', description: 'Formulario obligatorio de datos complementarios', href: 'https://appwfp.ups.edu.ec/sbe/sbeFicha/index.xhtml', category: 'matricula', icon: FileSpreadsheet, external: true },
  { id: 'ficha-socio', name: 'Ficha socioeconómica ampliada', description: 'Necesaria para becas y ayudas', href: 'https://sbe.ups.edu.ec/fichaAmpliada', category: 'matricula', icon: FileText, external: true, keywords: ['beca'] },

  // Finanzas
  { id: 'estado-cuenta', name: 'Estado de cuenta', description: 'Saldo, cuotas y pagos realizados', href: 'https://portal.ups.edu.ec/estudiante-estado-cuenta', category: 'finanzas', icon: Wallet },
  { id: 'pagos', name: 'Pagos en línea', description: 'Paga con tarjeta de crédito o débito', href: 'https://servicesvpos.ups.edu.ec/pag/', category: 'finanzas', icon: CreditCard, external: true },
  { id: 'comprobante', name: 'Comprobante de pago', description: 'Descarga comprobantes de cuotas', href: 'https://portal.ups.edu.ec/estudiante-comprobante-pago', category: 'finanzas', icon: Receipt },
  { id: 'comprobantes-e', name: 'Comprobantes electrónicos', description: 'Facturas electrónicas SRI', href: 'https://portal.ups.edu.ec/comprobantes-electronicos', category: 'finanzas', icon: FileCheck2, keywords: ['factura'] },

  // Trámites
  { id: 'solicitudes', name: 'Sistema de solicitudes', description: 'Trámites académicos y administrativos', href: 'https://portal.ups.edu.ec/estudiante-solicitud', category: 'tramites', icon: ScrollText },
  { id: 'certificado', name: 'Certificado electrónico', description: 'Certificados con firma electrónica', href: 'https://appwfp.ups.edu.ec/cel/', category: 'tramites', icon: BadgeCheck, external: true },
  { id: 'carnet', name: 'Carnetización UPS', description: 'Solicita o renueva tu carné', href: 'https://portal.ups.edu.ec/estudiante-carnetizacion', category: 'tramites', icon: IdCard },
  { id: 'terceros', name: 'Autorización a terceros', description: 'Autoriza a alguien a realizar trámites por ti', href: 'https://portal.ups.edu.ec/estudiante-autorizacion-terceros', category: 'tramites', icon: Users },
  { id: 'quipux', name: 'Quipux', description: 'Gestión documental institucional', href: 'https://portal.ups.edu.ec/group/guest/quipux', category: 'tramites', icon: FileSignature },

  // Cuenta
  { id: 'correo', name: 'Correo institucional', description: 'Tu buzón @est.ups.edu.ec', href: 'https://portal.ups.edu.ec/group/guest/email_institucional', category: 'cuenta', icon: Mail },
  { id: 'datos-personales', name: 'Datos personales', description: 'Actualiza dirección, teléfono y contacto', href: 'https://portal.ups.edu.ec/estudiante-datos-personales', category: 'cuenta', icon: UserCog },
  { id: 'clave', name: 'Cambio de clave', description: 'Cambia tu contraseña del portal', href: 'https://portal.ups.edu.ec/cambio-clave', category: 'cuenta', icon: KeyRound, keywords: ['contraseña'] },
  { id: 'bases-datos', name: 'Bases de datos', description: 'Acceso a recursos de investigación', href: 'https://portal.ups.edu.ec/bases-datos', category: 'cuenta', icon: Database },

  // Protección de datos
  { id: 'politica', name: 'Política de datos', description: 'Cómo tratamos tus datos personales', href: 'https://portal.ups.edu.ec/politica-tratamiento-uso-datos', category: 'datos', icon: ShieldCheck },
  { id: 'aceptacion', name: 'Aceptación de la política', description: 'Revisa o acepta la política vigente', href: 'https://portal.ups.edu.ec/aceptacion-politica', category: 'datos', icon: FileCheck2 },
  { id: 'revocatoria', name: 'Revocar aceptación', description: 'Solicita revocar tu aceptación', href: 'https://portal.ups.edu.ec/revocatoria-aceptacion-politica', category: 'datos', icon: ShieldX },
  { id: 'historial-politica', name: 'Historial de acciones', description: 'Registro de tus decisiones sobre tus datos', href: 'https://portal.ups.edu.ec/historial-politica', category: 'datos', icon: History },
]

export const defaultFavorites = ['calificaciones', 'horarios', 'pagos', 'avac', 'solicitudes', 'correo']

export const manuals = [
  { name: 'Matrícula en línea', href: 'https://portal.ups.edu.ec/documents/20121/50896/Matriculas+online+proyectos+nuevos.pdf' },
  { name: 'Incremento de asignaturas', href: 'https://portal.ups.edu.ec/documents/20121/50896/Manual+Incremento+de+Asignatura.pdf' },
  { name: 'Cambio de grupo en línea', href: 'https://portal.ups.edu.ec/documents/20121/50896/Manual+Cambio+de+grupo+online.pdf' },
  { name: 'Sistema de solicitudes', href: 'https://portal.ups.edu.ec/documents/20121/50896/Manual+de+Sistema+de+Solicitudes.pdf' },
  { name: 'Pagos en línea', href: 'https://portal.ups.edu.ec/documents/20121/50896/Manual+Pagos+Online+2.pdf.docx' },
  { name: 'Solicitud de presencialidad', href: 'https://portal.ups.edu.ec/documents/20121/50896/Solicitud+de+presencialidad.pdf' },
]
