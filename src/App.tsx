import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { Home } from './pages/Home'

// Rutas secundarias cargadas bajo demanda: la portada no descarga su código.
const Payments = lazy(() => import('./pages/Payments').then((m) => ({ default: m.Payments })))
const Services = lazy(() => import('./pages/Services').then((m) => ({ default: m.Services })))
const Library = lazy(() => import('./pages/Library').then((m) => ({ default: m.Library })))
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })))

const Loading = () => (
  <div className="space-y-4" aria-busy="true" aria-label="Cargando">
    <div className="h-8 w-56 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
    <div className="h-40 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
  </div>
)

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Home />} />
        <Route path="pagos" element={<Suspense fallback={<Loading />}><Payments /></Suspense>} />
        <Route path="servicios" element={<Suspense fallback={<Loading />}><Services /></Suspense>} />
        <Route path="biblioteca" element={<Suspense fallback={<Loading />}><Library /></Suspense>} />
        <Route path="*" element={<Suspense fallback={<Loading />}><NotFound /></Suspense>} />
      </Route>
    </Routes>
  )
}
