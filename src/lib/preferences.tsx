import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { defaultFavorites } from '../data/services'

type Theme = 'light' | 'dark'

interface Preferences {
  theme: Theme
  toggleTheme: () => void
  privacy: boolean
  togglePrivacy: () => void
  favorites: string[]
  toggleFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
}

const PreferencesContext = createContext<Preferences | null>(null)

// localStorage puede fallar (modo incógnito, cookies bloqueadas): nunca debe romper la página.
function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw === null ? fallback : (JSON.parse(raw) as T)
  } catch {
    return fallback
  }
}
function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* ignorado */
  }
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  )
  const [privacy, setPrivacy] = useState(() => load('ups:privacy', false))
  const [favorites, setFavorites] = useState<string[]>(() => load('ups:favorites', defaultFavorites))

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem('ups:theme-v2', theme)
    } catch {
      /* ignorado */
    }
  }, [theme])

  useEffect(() => {
    document.documentElement.classList.toggle('privacy-on', privacy)
    save('ups:privacy', privacy)
  }, [privacy])

  useEffect(() => save('ups:favorites', favorites), [favorites])

  const toggleFavorite = useCallback(
    (id: string) => setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id])),
    [],
  )

  const value = useMemo<Preferences>(
    () => ({
      theme,
      toggleTheme: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
      privacy,
      togglePrivacy: () => setPrivacy((p) => !p),
      favorites,
      toggleFavorite,
      isFavorite: (id) => favorites.includes(id),
    }),
    [theme, privacy, favorites, toggleFavorite],
  )

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext)
  if (!ctx) throw new Error('usePreferences debe usarse dentro de PreferencesProvider')
  return ctx
}
