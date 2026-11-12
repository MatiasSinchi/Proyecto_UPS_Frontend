import { ExternalLink } from 'lucide-react'

/** Marca visible para enlaces que salen del portal (heurística: control y libertad del usuario). */
export function ExternalMark() {
  return (
    <>
      <ExternalLink aria-hidden className="size-3.5 shrink-0 text-slate-400" />
      <span className="sr-only">(abre otra aplicación)</span>
    </>
  )
}
