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
- **Pendiente del carrito, confirmado por el propietario:** preparar catálogo de productos/categorías más adelante; solicitar modelos 3D autorizados y confirmar el WhatsApp/dirección de recogida antes de implementar esa parte. Seguir [Plan del carrito](../PLAN%20DE%20MEJORA/06-color-center-valledupar/plan-carrito.md).
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
- **Rama y estado local:** `main` incluye `origin/main` en `5bb926b` más los commits locales `7d1c4b9` y `6bd8265`; está dos commits delante del remoto y no se ha hecho push. El stash `respaldo-local-previo-sync-2026-11-19` se conserva como respaldo. Los seis archivos de la carpeta del plan siguen sin seguimiento y no se incluyeron en esos commits.
