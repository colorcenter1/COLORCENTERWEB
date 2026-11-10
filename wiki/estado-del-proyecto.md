---
tipo: estado
estado: vigente
creado: 2026-11-06
actualizado: 2026-11-10
tags: [proyecto, estado]
fuentes: [../PLAN%20TRABAJO.md, ../landing/package.json, ../landing/README.md, ../landing/src/App.tsx]
---
# Estado del proyecto

## Rediseño según el plan de trabajo (2026-11-10)

- **Implementado localmente:** rediseño completo de la landing siguiendo `PLAN TRABAJO.md`. Estructura: encabezado → portada → simulador → productos y categorías → asesoría → cómo comprar → preguntas → ubicación y contacto → pie. Ver [[estructura-de-la-landing]].
- **Retirado del sitio:** testimonios de muestra, usuarios «en línea», panel de analíticas, botones Auto/Móvil/Escritorio, checklist técnico, cambio de tema, calculadora de cantidades, mapa ilustrativo y rótulo «Waze», faros, techo bitono y simulación de latas, y toda mención a Sherwin-Williams como distribuidor (no confirmada).
- **Simulador:** la biblioteca 3D no se descarga hasta pulsar «Probar colores». Vehículos sedán, hatchback y pickup **modelados por código para Color Center** (sin marcas ni licencias de terceros), a petición del propietario tras descartar los modelos gratuitos disponibles. Veinte tonos orientativos, color libre con HEX validado, giro con arrastre o botones, selección conservada al cambiar de carrocería, alternativa estática si falla el 3D y consulta por WhatsApp con carrocería y color.
- **Versión recuperable:** commit `4685827` con etiqueta local `antes-del-rediseno` (estado previo al rediseño, sin `Docs/`, dependencias ni compilados).
- **Ejecución:** Node 24.18.0, npm 12.0.2 vía `npm.cmd`. Servidor de desarrollo en http://127.0.0.1:3000/ y vista previa de producción en http://127.0.0.1:4173/ (`npm.cmd run preview`).

## Verificación local realizada (2026-11-10)

- **Compilación y tipos:** `npm.cmd run lint` y `npm.cmd run build` (con prerender) correctos. `npm.cmd test`: 16 pruebas unitarias aprobadas.
- **Pesos (compilación de producción):** carga inicial ≈ 433 KB sin comprimir (HTML 39 KB, JS 252 KB, CSS 24 KB, fuente 90 KB, logo 28 KB); transferido medido ≈ 207 KB. Descarga adicional del simulador ≈ 575 KB sin comprimir / 146 KB transferidos, sin archivos de modelo. Objetivos del plan: 1 MB y 2 MB.
- **Rendimiento (local, 390 × 844, red 150 ms/1,6 Mbps, CPU 4×, 3 cargas):** LCP 0,76–1,20 s; CLS 0,037; activación del simulador 3,3 s. Medición local, no equivale a datos de campo.
- **Diseño:** 320, 360, 390, 768 y 1440 px sin desplazamiento horizontal. Revisión visual en escritorio y móvil.
- **Accesibilidad:** orden de tabulación con enlace «Saltar al contenido», foco visible (3 px), radios navegables con flechas, preguntas con teclado, menú móvil con `aria-expanded` y cierre con Escape, zoom permitido, `prefers-reduced-motion` desactiva la animación del abanico y el desplazamiento suave. Contrastes de los pares principales entre 6,0:1 y 13,3:1.
- **Simulador:** tres carrocerías, paleta, color libre (HEX inválido muestra error), conservación de la selección, giro, y alternativa ante descarga bloqueada y ante WebGL no disponible; la paleta y WhatsApp siguen funcionando.
- **Enlaces:** todos los de ubicación apuntan a `https://maps.app.goo.gl/p52X8eboDhx3h83GA`; todos los de WhatsApp a `wa.me/573004426477`, con `rel="noopener noreferrer"`. No se enviaron mensajes.
- **SEO:** HTML inicial con H1, categorías, preguntas, dirección y aviso de color; JSON-LD `Store` válido solo con datos confirmados. Script de la skill SEO ejecutado sobre `dist/index.html`: canónica pendiente.
- **Consola:** sin errores en uso normal.

## Publicación

- **No publicado.** Sin push, dominio, DNS ni costos. Canónica, `og:url`, imagen social y sitemap pendientes del dominio real.
