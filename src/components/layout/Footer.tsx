const socials = [
  { name: 'Facebook', href: 'https://www.facebook.com/pages/Universidad-Politecnica-Salesiana/' },
  { name: 'X / Twitter', href: 'https://twitter.com/upsalesianaec' },
  { name: 'YouTube', href: 'https://www.youtube.com/channel/UCVtRZLpPa8CFkqXq7aTYiFA' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/universidad-politecnica-salesiana' },
  { name: 'Instagram', href: 'https://www.instagram.com/upsalesianaec' },
  { name: 'TikTok', href: 'https://tiktok.com/@upsalesianaec' },
]

// Las redes sociales pasan del menú principal al pie: no son una tarea del estudiante.
export function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 px-4 py-6 text-sm text-slate-500 sm:px-6 dark:border-slate-800">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Universidad Politécnica Salesiana · Prototipo de rediseño</p>
        <ul className="flex flex-wrap gap-x-4 gap-y-1">
          {socials.map((s) => (
            <li key={s.name}>
              <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-brand-600 hover:underline dark:hover:text-brand-300">
                {s.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
