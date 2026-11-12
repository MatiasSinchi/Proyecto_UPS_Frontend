import { NavLink } from 'react-router-dom'
import { BookMarked, Home, LayoutGrid, Star, Wallet, X } from 'lucide-react'
import { services } from '../../data/services'
import { usePreferences } from '../../lib/preferences'
import { cn } from '../../lib/format'
import { ExternalMark } from '../ui/ExternalMark'

const sections = [
  { to: '/', label: 'Inicio', icon: Home, end: true },
  { to: '/pagos', label: 'Pagos y cuotas', icon: Wallet },
  { to: '/servicios', label: 'Servicios', icon: LayoutGrid },
  { to: '/biblioteca', label: 'Biblioteca', icon: BookMarked },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const { favorites } = usePreferences()
  const favoriteServices = services.filter((s) => favorites.includes(s.id))

  return (
    <>
      {/* Fondo del menú en móvil */}
      <div
        className={cn('fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm transition-opacity lg:hidden', open ? 'opacity-100' : 'pointer-events-none opacity-0')}
        onClick={onClose}
        aria-hidden
      />
      <aside
        id="sidebar"
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform dark:border-slate-800 dark:bg-slate-900 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
        aria-label="Navegación principal"
      >
        <div className="flex h-16 items-center justify-between gap-2 border-b border-slate-100 px-5 dark:border-slate-800">
          <a href="https://www.ups.edu.ec/" className="rounded-lg bg-white px-2 py-1" title="Ir a www.ups.edu.ec">
            <img src={`${import.meta.env.BASE_URL}logo-ups.png`} alt="Universidad Politécnica Salesiana" className="h-8 w-auto" width={107} height={32} />
          </a>
          <button onClick={onClose} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden dark:hover:bg-slate-800" aria-label="Cerrar menú">
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {sections.map(({ to, label, icon: Icon, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-brand-700 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white',
                    )
                  }
                >
                  <Icon className="size-5" aria-hidden />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <h2 className="flex items-center gap-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <Star className="size-3.5" aria-hidden /> Mis favoritos
            </h2>
            {favoriteServices.length === 0 ? (
              <p className="px-3 pt-2 text-sm text-slate-500">Marca servicios con la estrella para verlos aquí.</p>
            ) : (
              <ul className="mt-2 space-y-0.5">
                {favoriteServices.map((s) => (
                  <li key={s.id}>
                    <a
                      href={s.href}
                      target={s.external ? '_blank' : undefined}
                      rel={s.external ? 'noreferrer' : undefined}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                    >
                      <s.icon className="size-4 text-brand-500 dark:text-brand-300" aria-hidden />
                      <span className="flex-1 truncate">{s.name}</span>
                      {s.external && <ExternalMark />}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </nav>

        <div className="border-t border-slate-100 p-4 text-xs text-slate-500 dark:border-slate-800">
          ¿Necesitas ayuda? <a className="font-medium text-brand-600 hover:underline dark:text-brand-300" href="mailto:soporte@ups.edu.ec">Mesa de servicios TI</a>
        </div>
      </aside>
    </>
  )
}
