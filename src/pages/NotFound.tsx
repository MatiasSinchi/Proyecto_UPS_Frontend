import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="py-24 text-center">
      <p className="text-sm font-semibold text-brand-600">404</p>
      <h1 className="mt-2 text-2xl font-semibold">No encontramos esta página</h1>
      <Link to="/" className="mt-6 inline-block rounded-xl bg-brand-700 px-4 py-2 text-sm font-semibold text-white">
        Volver al inicio
      </Link>
    </div>
  )
}
