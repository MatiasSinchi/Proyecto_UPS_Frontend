# Rediseño de la Página Personal — Portal UPS

Prototipo funcional del front de la **Página Personal** del portal estudiantil de la Universidad Politécnica Salesiana, con mejoras visuales, de usabilidad (heurísticas de Nielsen), accesibilidad y rendimiento.

> Los datos del estudiante, cuotas y horario son **ficticios**. Los enlaces a servicios y recursos apuntan a las URL reales del portal.

## Qué cambia respecto a la página actual

| Antes | Ahora |
| --- | --- |
| 29 enlaces en un menú lateral siempre expandido | 4 secciones + favoritos fijados por el estudiante |
| Sin buscador | Búsqueda global con `Ctrl/⌘ + K` (sin tildes ni mayúsculas) |
| Tabla de 12 cuotas sin estados ni totales | Cuotas agrupadas por factura, con estado, total, vencido y ahorro por pronto pago; tarjetas en móvil |
| 11 acordeones abiertos con más de 50 logos en base64 (564 KB) | Catálogo de biblioteca filtrable por tipo, monogramas en lugar de imágenes |
| Redes sociales como primer elemento de navegación | Redes en el pie de página |
| Texto fijo de matrícula | Aviso descartable con acceso directo y manuales |
| — | Horario del día, notificaciones, modo oscuro y modo privado (oculta montos) |
| HTML de ~740 KB + YUI/AUI/jQuery | Portada de ~85 KB comprimida, rutas secundarias cargadas bajo demanda |

## Stack

- **React 18 + TypeScript** — componentes publicables como *client extensions* de Liferay 7.4.
- **Vite** — servidor de desarrollo y build con división por rutas.
- **Tailwind CSS 4** — tokens de marca UPS (`brand` azul `#173B6E`, `accent` amarillo) en `src/index.css`.
- **React Router** y **Lucide** (iconos SVG).

## Uso

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # genera dist/
npm run preview   # sirve el build
```

## Estructura

```
src/
├── components/
│   ├── layout/        AppShell, Sidebar, Topbar, Footer
│   ├── dashboard/     StatCard, PaymentsTable, TodaySchedule, NoticeBanner
│   ├── ui/            Card, Badge, ExternalMark
│   ├── CommandPalette.tsx
│   └── ServiceTile.tsx
├── data/              services, library, student (datos ficticios)
├── lib/               format (dinero, fechas, estados de cuota), preferences (tema, privacidad, favoritos)
├── pages/             Home, Payments, Services, Library, NotFound
└── types.ts
```

En producción, `src/data/` se sustituye por llamadas a los servicios REST que hoy alimentan los portlets de Liferay.

## Informe

La propuesta de mejora y el análisis de viabilidad están en el documento del informe (ver `docs/`).
