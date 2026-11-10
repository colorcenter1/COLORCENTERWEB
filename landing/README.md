# Landing de Color Center (Valledupar)

Página de venta de pinturas e insumos automotrices con consulta por WhatsApp, simulador de colores 3D y ubicación. React 19 + TypeScript + Vite; el contenido se prerenderiza en la compilación para que esté disponible sin JavaScript.

## Vista previa local en Windows

Desde la raíz `COLORCENTERWEB`, en PowerShell:

```powershell
cd landing
npm.cmd install
npm.cmd run dev
```

Abrir http://127.0.0.1:3000/. `Ctrl+C` detiene el servidor.

## Comprobaciones (desde `landing/`)

```powershell
npm.cmd run lint      # TypeScript
npm.cmd test          # pruebas unitarias (Vitest)
npm.cmd run build     # compilación + prerender en dist/
npm.cmd run preview   # sirve dist/ en http://127.0.0.1:4173/
```

## Organización

- `src/data/` — datos del negocio (`business.ts`), paleta orientativa (`palette.ts`), categorías y preguntas (`catalog.ts`).
- `src/lib/` — enlaces de WhatsApp y utilidades de color, con sus pruebas.
- `src/components/` — secciones de la página; `simulator/` contiene el simulador. `scene.ts`, `carFactory.ts` y `carSpecs.ts` (Three.js y los vehículos generados por código) solo se descargan cuando el visitante pulsa «Probar colores».
- `scripts/prerender.mjs` — inserta el HTML de React en `dist/index.html`.
- `public/` — logo, tipografía Archivo (licencia OFL incluida).
- `referencias-aistudio/` — archivos de referencia del prototipo de AI Studio; no se publican.

No hay claves ni variables de entorno necesarias. Los enlaces de WhatsApp y Google Maps abren servicios externos; la página no envía mensajes por sí misma.
