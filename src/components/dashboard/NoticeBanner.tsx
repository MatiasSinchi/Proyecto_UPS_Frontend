import { useState } from 'react'
import { ExternalLink, FileText, Megaphone, X } from 'lucide-react'
import { manuals } from '../../data/services'

const KEY = 'ups:notice-matricula-2026'

function isDismissed() {
  try {
    return localStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

/** Reemplaza el bloque de texto de matrícula de la portada por un aviso descartable. */
export function NoticeBanner() {
  const [hidden, setHidden] = useState(isDismissed)
  if (hidden) return null

  const dismiss = () => {
    setHidden(true)
    try {
      localStorage.setItem(KEY, '1')
    } catch {
      /* ignorado */
    }
  }

  return (
    <section className="relative overflow-hidden rounded-2xl border border-accent-300 bg-accent-100/70 p-5 dark:border-accent-500/30 dark:bg-accent-500/10" aria-labelledby="notice-title">
      <button onClick={dismiss} className="absolute right-3 top-3 rounded-lg p-1.5 text-accent-700 hover:bg-accent-300/40 dark:text-accent-300" aria-label="Cerrar aviso">
        <X className="size-4" />
      </button>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-500 text-brand-900">
          <Megaphone className="size-5" aria-hidden />
        </span>
        <div className="min-w-0 flex-1 pr-6">
          <h2 id="notice-title" className="font-semibold text-slate-900 dark:text-white">
            La matrícula del período 2026 - 2027 es 100 % en línea
          </h2>
          <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
            Revisa los requisitos, genera tu anticipo y matricúlate desde el portal. Si tienes dudas, consulta los manuales.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <a
              href="https://appwfpc.ups.edu.ec/mat"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-800"
            >
              Ir a matrícula en línea <ExternalLink className="size-4" aria-hidden />
            </a>
            <details className="group">
              <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-brand-700 hover:bg-white/60 dark:text-brand-200 dark:hover:bg-white/5">
                <FileText className="size-4" aria-hidden /> Manuales de usuario ({manuals.length})
              </summary>
              <ul className="mt-2 grid gap-1 sm:grid-cols-2">
                {manuals.map((m) => (
                  <li key={m.name}>
                    <a href={m.href} target="_blank" rel="noreferrer" className="text-sm text-slate-700 underline-offset-2 hover:underline dark:text-slate-300">
                      {m.name} <span className="text-xs text-slate-500">(PDF)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </div>
      </div>
    </section>
  )
}
