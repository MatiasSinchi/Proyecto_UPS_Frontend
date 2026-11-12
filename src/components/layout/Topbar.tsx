import { useEffect, useRef, useState } from 'react'
import { Bell, Eye, EyeOff, LogOut, Menu, Moon, Search, Sun, UserRound } from 'lucide-react'
import { notices, student } from '../../data/student'
import { usePreferences } from '../../lib/preferences'
import { cn, formatShortDate } from '../../lib/format'

interface TopbarProps {
  onMenu: () => void
  onSearch: () => void
}

function useClickOutside(open: boolean, close: () => void) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && close()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, close])
  return ref
}

const iconButton =
  'relative rounded-xl p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'

export function Topbar({ onMenu, onSearch }: TopbarProps) {
  const { theme, toggleTheme, privacy, togglePrivacy } = usePreferences()
  const [panel, setPanel] = useState<'notices' | 'user' | null>(null)
  const [readIds, setReadIds] = useState(() => notices.filter((n) => n.read).map((n) => n.id))
  const close = () => setPanel(null)
  const noticesRef = useClickOutside(panel === 'notices', close)
  const userRef = useClickOutside(panel === 'user', close)
  const unread = notices.filter((n) => !readIds.includes(n.id)).length
  const isMac = typeof navigator !== 'undefined' && /Mac/.test(navigator.platform)

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-2 border-b border-slate-200 bg-white/85 px-4 backdrop-blur sm:px-6 dark:border-slate-800 dark:bg-slate-900/85">
      <button onClick={onMenu} className={cn(iconButton, 'lg:hidden')} aria-label="Abrir menú" aria-controls="sidebar">
        <Menu className="size-5" />
      </button>

      <button
        onClick={onSearch}
        className="flex h-10 min-w-0 flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 text-left text-sm text-slate-500 transition-colors hover:border-slate-300 sm:max-w-md dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-400"
      >
        <Search className="size-4 shrink-0" aria-hidden />
        <span className="flex-1 truncate">Buscar servicios, trámites o recursos…</span>
        <kbd className="hidden rounded-md border border-slate-200 bg-white px-1.5 py-0.5 font-sans text-xs sm:inline dark:border-slate-600 dark:bg-slate-700">
          {isMac ? '⌘' : 'Ctrl'} K
        </kbd>
      </button>

      <div className="ml-auto flex items-center gap-1">
        <button
          onClick={togglePrivacy}
          className={iconButton}
          aria-pressed={privacy}
          title={privacy ? 'Mostrar montos' : 'Ocultar montos (modo privado)'}
        >
          {privacy ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
          <span className="sr-only">Modo privado</span>
        </button>
        <button onClick={toggleTheme} className={iconButton} title={theme === 'dark' ? 'Tema claro' : 'Tema oscuro'}>
          {theme === 'dark' ? <Sun className="size-5" /> : <Moon className="size-5" />}
          <span className="sr-only">Cambiar tema</span>
        </button>

        <div ref={noticesRef} className="relative">
          <button
            onClick={() => setPanel(panel === 'notices' ? null : 'notices')}
            className={iconButton}
            aria-expanded={panel === 'notices'}
            aria-haspopup="true"
          >
            <Bell className="size-5" />
            {unread > 0 && (
              <span className="absolute right-1 top-1 grid size-4 place-items-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                {unread}
              </span>
            )}
            <span className="sr-only">Notificaciones, {unread} sin leer</span>
          </button>
          {panel === 'notices' && (
            <div className="absolute right-0 mt-2 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                <p className="text-sm font-semibold">Notificaciones</p>
                <button
                  className="text-xs font-medium text-brand-600 hover:underline dark:text-brand-300"
                  onClick={() => setReadIds(notices.map((n) => n.id))}
                >
                  Marcar todo como leído
                </button>
              </div>
              <ul className="max-h-96 divide-y divide-slate-100 overflow-y-auto dark:divide-slate-800">
                {notices.map((n) => {
                  const isUnread = !readIds.includes(n.id)
                  return (
                    <li key={n.id} className={cn('flex gap-3 px-4 py-3', isUnread && 'bg-brand-50/60 dark:bg-brand-500/10')}>
                      <span className={cn('mt-1.5 size-2 shrink-0 rounded-full', isUnread ? 'bg-brand-600' : 'bg-transparent')} aria-hidden />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{n.title}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{n.body}</p>
                        <p className="mt-1 text-xs text-slate-400">{formatShortDate(n.date)}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </div>

        <div ref={userRef} className="relative ml-1">
          <button
            onClick={() => setPanel(panel === 'user' ? null : 'user')}
            className="flex items-center gap-2 rounded-xl p-1 pr-2 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-expanded={panel === 'user'}
            aria-haspopup="true"
          >
            <span className="grid size-8 place-items-center rounded-full bg-brand-700 text-sm font-semibold text-white">
              {student.firstName[0]}
              {student.lastName[0]}
            </span>
            <span className="hidden text-sm font-medium md:block">{student.firstName}</span>
          </button>
          {panel === 'user' && (
            <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-900">
              <div className="px-3 py-2">
                <p className="text-sm font-semibold">
                  {student.firstName} {student.lastName}
                </p>
                <p className="text-xs text-slate-500">{student.career}</p>
              </div>
              <a href="https://portal.ups.edu.ec/estudiante-datos-personales" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800">
                <UserRound className="size-4" /> Mis datos personales
              </a>
              <a href="https://portal.ups.edu.ec/c/portal/logout" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10">
                <LogOut className="size-4" /> Cerrar sesión
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
