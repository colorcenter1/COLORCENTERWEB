---
tipo: estado
estado: vigente
creado: 2026-11-06
actualizado: 2026-11-19
tags: [proyecto, estado]
fuentes: [../PLAN%20TRABAJO.md, ../landing/package.json, ../landing/README.md, ../landing/src/App.tsx]
---
# Estado del proyecto

## Rediseño según el plan de trabajo (2026-11-10)

- **Implementado localmente:** rediseño completo de la landing siguiendo `PLAN TRABAJO.md`. Estructura: encabezado → portada → simulador → productos y categorías → asesoría → cómo comprar → preguntas → ubicación y contacto → pie. Ver [[estructura-de-la-landing]].
- **Retirado del sitio:** testimonios de muestra, usuarios «en línea», panel de analíticas, botones Auto/Móvil/Escritorio, checklist técnico, cambio de tema, calculadora de cantidades, mapa ilustrativo y rótulo «Waze», faros, techo bitono y simulación de latas, y toda mención a Sherwin-Williams como distribuidor (no confirmada).
- **Simulador:** la biblioteca 3D no se descarga hasta pulsar «Probar colores». Vehículos sedán, hatchback y pickup **modelados por código para Color Center** (sin marcas ni licencias de terceros), a petición del propietario tras descartar los modelos gratuitos disponibles; aspecto aprobado por el propietario el 2026-11-10. Veinte tonos orientativos, color libre con HEX validado, giro con arrastre o botones, selección conservada al cambiar de carrocería, alternativa estática si falla el 3D y consulta por WhatsApp con carrocería y color.
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

## Ajustes tras la revisión del propietario (2026-11-10)

- **Simulador:** cuatro ruedas independientes (cada una con su propio paso de rueda; antes un cilindro atravesaba el vehículo de lado a lado); hatchback con frente 16 cm más corto; pickup con frente 24 cm más corto y cabina doble más larga (zona de pasajeros traseros ampliada); el selector de color libre ya no se cierra al arrastrar (antes el campo se reconstruía con cada cambio).
- **Productos:** vitrina con los ocho productos confirmados, su uso y consulta individual por WhatsApp.
- **Ubicación:** mapa de Google Maps incrustado; muestra el marcador «Color Center» en Cl. 21 #17-96. Se carga al acercarse a la sección.
- **Verificado localmente:** tipos, 16 pruebas, compilación, sin descargas 3D ni externas en la carga inicial, mapa cargado al llegar a la sección (escritorio y móvil), arrastre simulado del selector de color sin desmontar el campo, conservación del color al cambiar de carrocería, 360–1440 px sin desplazamiento horizontal, sin errores de consola. El selector nativo de color debe confirmarse también con el ratón o el dedo en tu navegador: la prueba automática simula el arrastre.

## Ajustes y despliegue (2026-11-11)

- **Hecho:** simulador reorganizado (carrocería arriba, WhatsApp debajo, color a la derecha); paleta 3+3 con tamaño de muestra adaptado a la columna; carrusel de cinco testimonios de referencia (20 s, pausa y controles accesibles). `.claude/launch.json` permite relanzar los servidores `landing-dev` (3000) y `landing-preview` (4173).
- **Verificado localmente:** tipos, 17 pruebas, compilación con prerender; paleta en una línea por familia de 320 a 1920 px; sin desplazamiento horizontal de 320 a 1440 px; carrusel avanza a los 20 s exactos (reloj simulado), se pausa al pasar el cursor y con el botón; simulador en producción local con mensaje de WhatsApp correcto; sin descargas 3D ni externas en la carga inicial; sin errores de consola.
- **Vercel:** `landing/vercel.json` y `.vercelignore` preparados (compilación con prerender, cabeceras `noindex`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`). La CLI 65.14.0 falló en Windows al crear enlaces simbólicos para compilar localmente; se desplegó la salida ya verificada con `--prebuilt --temporary`. El despliegue anónimo quedó listo pero **devuelve 403 a todos los navegadores** y caduca en 1 h sin reclamar: no sirve como enlace para el cliente. Falta desplegar en la cuenta del propietario.
- **Desplegado (provisional), 2026-11-11:** https://color-center-landing.vercel.app, proyecto `color-center-landing` en la cuenta Vercel del propietario, con la compilación ya verificada (`--prebuilt --prod`). Comprobado desde un navegador sin sesión: HTTP 200, cabecera `X-Robots-Tag: noindex, nofollow`, título y H1 correctos, simulador 3D funcional, 5 testimonios, mapa de Google, sin desplazamiento horizontal en 390 px y sin errores de consola. No hay dominio propio ni conexión con GitHub. El despliegue anónimo previo (403) queda sin uso y caduca solo.
- **Repositorio, 2026-11-11:** `main` sincronizado con `origin/main` (último commit del rediseño `9c01d72`). En espera de la validación del cliente.
- **Sincronización, 2026-11-19:** se descargaron y aplicaron en `main` los ocho commits remotos hasta `5bb926b`, incluido el proyecto actual en `landing/`. Las modificaciones locales de wiki y `.gitignore` se conservaron; `Docs/` permanece fuera de Git. El commit local `7d1c4b9` guarda los cambios de activos y memoria; la rama está un commit por delante del remoto, sin push.
- **Material gráfico, 2026-11-19:** se revisaron 14 archivos locales de `Docs/`. Se copió únicamente `Docs/disolvente/s.w.jpg` a `landing/public/products/productos-de-pintura.jpg`; el resto permanece como fuente original. Se ajustaron dos acentos CSS a colores del cartel de marca.
- **Verificación del cambio:** `git diff --check` sin errores y `Docs/` confirmada excluida por `.gitignore`. `npm.cmd run lint` no pudo ejecutarse porque `tsc` no está disponible; `npm.cmd ci` se bloqueó al intentar retirar una carpeta parcial protegida por Windows. Build, revisión visual en navegador y prueba funcional pendientes. No se publicó la actualización.
- **Contacto, 2026-11-19:** el propietario confirmó `+57 300 442 6477` como WhatsApp oficial. Inspección estática: los enlaces usan el número centralizado y los mensajes de producto/color incluyen su selección. Prueba real desde móvil aún pendiente.

## Catálogo y simulador 3D (2026-11-19)
- **Implementado en el código local:** catálogo interactivo de marcas con categorías solicitadas (pinturas, barnices, masillas, primers, lijas/abrasivos y disolventes), productos/categorías de fuentes oficiales y enlaces fuente por bloque. Están cargados Sherwin-Williams y baslac; Autolac se mantiene por confirmar cuál entidad quiso decir el propietario.
- **Fotos:** se añadió `landing/public/catalog/proceso-pintura-ilustrativo.jpg` (Pexels, Gustavo Fring, gratuita según página oficial), revisada visualmente y presentada como ilustración de proceso, no como producto de marca. Crédito en `landing/public/catalog/CREDITOS.md`.
- **Simulador:** propietario escogió modelo realista genérico. Se integró `landing/public/models/khronos-car-concept.glb`, licencia CC BY 4.0, bajo demanda. Se enlaza crédito visible y el código recolorea materiales exteriores, esconde nodos de placa/emblema nombrados y conserva giro. El GLB pesa 11.78 MB; descarga solo al activar el 3D.
- **Paleta:** seis colores de CESVI 2023 en reparaciones colombianas aparecen primero; proporciones y límites están documentados en [[referencias-de-colores-automotrices]].
- **Verificación actual:** `npm.cmd run lint` y `npm.cmd run build` intentados; ambos se detienen porque `tsc` y `vite` no están disponibles en `landing/node_modules`. No se reinstalaron herramientas. No hay compilación ni revisión visual del cambio confirmada; no está publicado.
- **Git:** rama `main` adelante 4 commits de `origin/main`; sin push. Se conservaron los seis archivos sin seguimiento de `PLAN DE MEJORA/06-color-center-valledupar/`, sin agregarlos. `Docs/` sigue excluida por `.gitignore`. Los archivos del cambio actual aún no se habían comprometido al registrar esta línea.
