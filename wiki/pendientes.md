---
tipo: pendientes
estado: vigente
creado: 2026-11-06
actualizado: 2026-11-19
tags: [pendientes, bloqueos]
fuentes: [../landing/README.md, ../landing/package.json]
---
# Pendientes

- **Bloqueo para confirmar procedencia:** colocar en la raíz el ZIP original de Google AI Studio. El código ya existe; no se encontró el ZIP.
- **Resuelto, 2026-11-10:** dependencias instaladas y bloqueo generado en `landing/`; lint, build y vista previa comprobados. Ejecutar scripts desde esa carpeta. Ver [[estado-del-proyecto]].
- **Fuentes recibidas en Docs (2026-11-19):** cartel de marca, una foto de envases y mockups de tazas/camisetas. Ver [[documentos-y-activos]]. Falta confirmar si la foto representa productos vigentes y si los mockups corresponden a artículos reales.
- **Pendiente de contenido:** decidir el tratamiento de testimonios “representativos” sin testimonios aprobados; revisar afirmaciones técnicas y promocionales del catálogo con fuentes.
- **Pendiente visual:** revisar los HTML/Markdown e imágenes restantes de AI Studio antes de usarlos como activos.
- **Pendiente de publicación:** destino y estado desconocidos; no se ha publicado.
- **Sugerencia pequeña para que el propietario elija:** ocultar la sección de testimonios hasta recibir casos reales aprobados; es una corrección focalizada y reversible.
- **Pendiente del carrito:** catálogos por marca en avance, ver [[catalogo-por-marcas]]; el modelo 3D genérico se aprobó y se integró. El carrito sigue fuera de la página; seguir [Plan del carrito](../PLAN%20DE%20MEJORA/06-color-center-valledupar/plan-carrito.md) para sus pasos.
- **Confirmado en el código:** no existe carrito ni pago en línea; el catálogo actual consulta por WhatsApp. No hay precio estructurado ni inventario conectados.
- **Paso 0 de mejoras:** las cinco skills descritas en el plan aparecen en `.agents/skills/`; ejecución/uso se registra al aplicarlas.
- **Paso 2 de mejoras, aprobado:** estructura de secciones en [[estructura-de-la-landing]], aprobada por el propietario e implementada en el rediseño de `landing/`.
- **Paso 3 de mejoras, parcial:** colores aproximados desde el cartel y foto de envases aplicada en una categoría. No hay foto propia de portada, equipo o instalaciones; logo del cartel no está separado como archivo limpio. Verificar con el propietario vigencia y autorización para publicación.

- **Revisión visual 2026-11-10:** corregir la imagen externa de Masillas Poliéster (HTTP 404) con un activo autorizado y revisar solapamientos de la cabecera en escritorio/móvil. Son problemas del prototipo, anteriores al traslado.
- **Fuentes tras reorganización:** `Docs/Logo.jpg` estuvo presente en la revisión del 2026-11-10, pero no aparece en la revisión del 2026-11-19; inventario y materiales nuevos constan en [[documentos-y-activos]].

## Tras el rediseño (2026-11-10)
- **WhatsApp, resuelto 2026-11-19:** propietario confirmó como oficial `+57 300 442 6477`; el helper de enlaces usa ese número y crea consultas generales, por producto y por color. Falta prueba interactiva desde celular, que requiere vista previa funcionando.
- **Horario de atención:** no se publica hasta confirmarlo; la ficha de Maps tampoco lo tiene. Valorar reclamar/verificar la ficha de Google (acción del propietario con su cuenta) y añadir teléfono y horario allí.
- **Dominio real:** necesario para canónica, `og:url`, imagen para redes y sitemap. Publicación no autorizada todavía.
- **Fotos propias:** al llegar a `Docs/`, revisar y valorar su uso en portada, productos y ubicación.
- **Marcas y referencias de producto:** no se muestran; incorporar solo con catálogo confirmado. Revisar también si la mención a Sherwin-Williams se puede respaldar.
- **Validar la paleta** de 20 tonos con la carta del negocio, en especial «Gris ratón» y «Negro nebuloso». Siguen siendo orientativos.
- **Enlaces legales:** no existen; la página no recoge datos personales. Si se añade un formulario, aplicar la skill `tratamiento-datos-landing`.
- **Calculadora de cantidades:** fuera de la versión pública hasta validar coeficientes.
- **Resueltos el 2026-11-10:** testimonios de muestra, imagen rota de Masillas, solapamientos de cabecera y skills de diseño (instaladas).
- **Testimonios (bloqueante para el lanzamiento público):** sustituir los cinco textos de referencia de `landing/src/data/testimonials.ts` por testimonios reales con autorización de cada cliente. Hasta entonces, mantener el enlace provisional con `noindex`.
- **Vercel (resuelto 2026-11-11):** enlace provisional en https://color-center-landing.vercel.app (cuenta del propietario). Para actualizarlo: `npm.cmd run build`, copiar `dist/` a `.vercel/output/static/` y `npx vercel deploy --prebuilt --prod` desde `landing/`. Al lanzar con dominio real, quitar la cabecera `noindex` (en `vercel.json` y en `.vercel/output/config.json`). El proyecto no quedó conectado a GitHub (sin despliegues automáticos).
- **Privacidad:** el propietario indicó persona natural, nombre comercial Colorcenter Valledupar, la dirección que ya figuraba en la página y confirmó `colorcenter.valledupar@gmail.com` para derechos de datos. Falta razón legal completa, cotejar domicilio con el RUT y responder qué tratamientos hay fuera de la web. El NIT compartido no se guarda en la wiki.
- **Material local 2026-11-19:** ver [[documentos-y-activos]]. La foto de envases ya se usa en la categoría destacada; los montajes de camisetas/tazas quedan catalogados y no se publican. Falta revisar visualmente el cambio en vista local.
- **Catálogos de marcas, avance 2026-11-19:** filtro interactivo de Sherwin-Williams, baslac e Industrias Autolack S.A.S. implementado con categorías de pinturas, barnices, masillas, primers, lijas/abrasivos y disolventes. El propietario confirmó que la tercera marca es Autolack de Colombia. No se presume stock, precio ni distribución local; las fuentes consultadas no muestran lijas para baslac ni primers/lijas de Autolack. Ver [[catalogo-por-marcas]].
- **Catálogo extendido, 2026-11-19:** el propietario confirmó las familias 1–4. Se incorporaron también a Sherwin-Williams y baslac donde corresponden según sus respectivas páginas oficiales. La opción 5 (madera/industrial/epóxica) queda pendiente de confirmar. Stock, precio, presentaciones locales y distribución por marca siguen pendientes de cotejar con Color Center.
- **Interfaz comparativa, 2026-11-19:** propietario escogió comparar una categoría entre las tres marcas y pidió describir brevemente la función. Implementado en código local; falta compilar/revisar visualmente cuando estén disponibles `vite` y `tsc` en `landing/`.
- **Ideas competitivas elegidas e implementadas en código local (2026-11-19):** el propietario eligió «1-2-3»: lista de cotización multi-producto por WhatsApp, mini guía que filtra categorías/marca y código de pintura opcional en la consulta de color. Falta compilar, revisar en navegador y probar las interacciones. Referencias consultadas: [ATR](https://ciatr.com/index.html), [Metallanos](https://metallanos.com/tienda/) y [Mostry](https://mostrypinturas.com/catalogo/).
- **Imágenes de catálogo:** la foto de aplicación de pintura de Pexels está incorporada, revisada y etiquetada como ilustrativa; faltan fotos propias/autorizadas de envases exactos si se quiere mostrar producto empaquetado. Créditos en `landing/public/catalog/CREDITOS.md`.
- **Simulador del automóvil, avance 2026-11-19:** usuario eligió modelo 3D genérico; el GLB CC BY 4.0 de Khronos está integrado bajo demanda y los botones de la paleta activan/recolorean el modelo. Falta build/lint y revisión visual/funcional del modelo en escritorio y móvil; el archivo pesa ~11.8 MB.
- **Rama y estado local:** `main` incluye `origin/main` en `5bb926b` más los commits locales `7d1c4b9` y `6bd8265`; está dos commits delante del remoto y no se ha hecho push. El stash `respaldo-local-previo-sync-2026-11-19` se conserva como respaldo. Los seis archivos de la carpeta del plan siguen sin seguimiento y no se incluyeron en esos commits.
