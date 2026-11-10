# Plan de mejoras · Color Center Valledupar

Guarda este archivo en la carpeta de tu página, junto al código. Pídele a tu agente **un paso a la vez**, en una conversación nueva cada vez, copiando el mensaje del paso. Así gastas menos tokens.

## Reglas para el agente (léelas siempre antes de trabajar)

- Haz **solo el paso que te pidan**. No adelantes otros pasos.
- Continúa sobre el prototipo existente: **no lo rehagas desde cero** ni cambies lo que ya está aprobado.
- Usa el logo, los colores y el branding de Color Center. No me pidas que invente un estilo.
- Usa solo material real de la carpeta `Docs`. **No inventes** productos, marcas, precios, fotos, testimonios ni datos de contacto. Si falta algo, dilo y pregunta (máximo cinco preguntas).
- Antes de cambiar, guarda una versión recuperable (commit de Git o copia de la carpeta).
- Comprueba el resultado en **celular y computador**. Explícame en palabras simples qué cambiaste y qué revisaste.
- Marca el paso con `[x]` en este archivo **solo cuando esté comprobado**. Si quedó algo pendiente, anótalo debajo del paso.

## Antes de empezar

- [ ] **Paso 0 · Instalar skills.** Sigue `instalar-skills.md`. *(Nivel de modelo: medio)*

  **Avance 2026-11-10:** se instalaron las dos skills entregadas en ZIP (`seo-organico-ia` y `tratamiento-datos-landing`) en `.agents/skills/`. Faltan las tres skills de diseño indicadas desde repositorios externos; el paso 0 sigue pendiente y no se marca como completado.

---

- [x] **Paso 1 · Encontrar el prototipo** *(Nivel de modelo: alto)*

  > Lee `plan-mejoras.md` y haz solo el paso 1. Revisa esta carpeta y `Docs` y dime si está el prototipo de Color Center: qué archivos tiene, cómo se abre y qué secciones muestra. Si solo hay un enlace de AI Studio o un ZIP, dime el paso exacto para obtener el código en esta carpeta. Dime también qué material tengo y qué falta para los pasos siguientes. No cambies nada.

  **Quedó bien si:** el agente abre el proyecto, o sabes exactamente qué falta para tenerlo.

  **Revisión 2026-11-10:** hay código React/TypeScript/Vite extraído con portada, catálogo y secciones; no se encontró el ZIP original de AI Studio. Node v26.13.0 y `npm.cmd` 11.20.0 están disponibles, pero no hay `node_modules` ni archivo de bloqueo; falta instalar dependencias para abrir la vista previa. La estructura está resumida en la wiki.
  **Si no hay prototipo ni código:** avísale a tu facilitador antes de seguir.

- [ ] **Paso 2 · Revisar la estructura contigo** *(Nivel de modelo: medio)*

  > Lee `plan-mejoras.md` y haz solo el paso 2. Muéstrame en una lista las secciones de la página en orden, con una línea de qué tiene cada una. Señala las fotos, videos o textos de muestra que haya. Propón qué quitar, qué juntar y dónde vale la pena poner fotos o videos propios. No cambies nada hasta que yo apruebe la estructura.

  **Quedó bien si:** apruebas una estructura clara antes de seguir.

  **Revisión 2026-11-10:** inventario y propuesta guardados en `wiki/estructura-de-la-landing.md`; no se cambió la página. Este paso sigue pendiente hasta que el propietario apruebe o ajuste el orden sugerido.

- [ ] **Paso 3 · Marca y portada** *(Nivel de modelo: medio)*

  > Lee `plan-mejoras.md` y haz solo el paso 3. Pon el logo y los colores de Color Center de `Docs` en toda la página. Cambia la portada y las imágenes de muestra por fotos y videos propios del negocio. Usa solo el material autorizado. Si hay video, que no suene solo, se pueda pausar y no impida navegar.

  **Necesitas en Docs:** logo, colores y fotos o videos propios.
  **Estado:** el propietario espera subir material gráfico dentro de las próximas 72 horas desde 2026-11-10. Inventariar y revisar cada archivo antes de usarlo.
  **Quedó bien si:** reconoces tu negocio y no queda ninguna imagen ajena.

- [ ] **Paso 4 · Pinturas: automotriz y general** *(Nivel de modelo: alto)*

  > Lee `plan-mejoras.md` y haz solo el paso 4. Organiza el catálogo en las categorías de `Docs`, separando pintura automotriz y pintura general. Usa las descripciones de `Docs` y que cada foto corresponda a su producto. Quita productos repetidos o de ejemplo. Usa la skill impeccable para que la identidad de pinturas se vea ordenada.

  **Necesitas en Docs:** catálogo con categorías y descripciones.
  **Quedó bien si:** un cliente encuentra rápido el tipo de pintura que busca.

- [ ] **Paso 5 · Contacto por WhatsApp** *(Nivel de modelo: medio)*

  > Lee `plan-mejoras.md` y haz solo el paso 5. Haz que todos los botones de contacto abran el WhatsApp oficial de `Docs`. Desde cada producto o categoría, el mensaje debe decir qué producto o necesidad consulta el cliente. Prueba cada botón desde el celular.

  **Necesitas en Docs:** número de WhatsApp oficial.
  **Quedó bien si:** la consulta llega a tu WhatsApp diciendo qué producto le interesa al cliente.

- [ ] **Paso 6 · Pulido visual** *(Nivel de modelo: alto)*

  > Lee `plan-mejoras.md` y haz solo el paso 6. Usa la skill emil-design-eng para que la página sea fácil de usar: botones claros, catálogo ordenado y contacto siempre a mano. No cambies contenidos, logo ni colores de la marca.

  **Quedó bien si:** la página se ve más cuidada y sigue siendo tu marca.

- [ ] **Paso 7 · Revisión en celular** *(Nivel de modelo: medio)*

  > Lee `plan-mejoras.md` y haz solo el paso 7. Usa la skill mobile-native para revisar en celular: menú, catálogo, fotos, videos y botones de WhatsApp. Corrige lo que sea incómodo de tocar o se vea descuadrado.

  **Quedó bien si:** todo se usa cómodamente desde el teléfono.

- [ ] **Paso 8 · Transiciones suaves (opcional)** *(Nivel de modelo: medio)*

  > Lee `plan-mejoras.md` y haz solo el paso 8. Agrega transiciones suaves al cambiar de categoría y al tocar el contacto. La información debe aparecer enseguida, funcionar sin animación y con teclado, y respetar a quien tiene desactivado el movimiento.

  **Quedó bien si:** se siente más fluido y nada tarda ni distrae.

- [ ] **Paso 9 · Política de tratamiento de datos** *(Nivel de modelo: alto)*

  > Lee `plan-mejoras.md` y haz solo el paso 9. Usa la skill tratamiento-datos-landing. Revisa qué datos personales recoge mi página, hazme las preguntas que falten para la política y, cuando la tengas, ponla en su propia página con un enlace en el pie. No publiques la política si faltan los datos de la empresa.

  **Necesitas en Docs:** NIT o RUT, dirección y un correo para temas de datos.
  **Quedó bien si:** la política abre desde el pie de página.

- [ ] **Paso 10 · SEO: que te encuentren en Google** *(Nivel de modelo: medio)*

  > Lee `plan-mejoras.md` y haz solo el paso 10. Usa la skill seo-organico-ia para revisar mi página y aplicar las mejoras básicas: título, descripción, textos de las imágenes y datos del negocio en Valledupar. No inventes direcciones ni horarios; pregúntame lo que falte.

  **Quedó bien si:** el agente te explica qué mejoró y qué datos faltan.

- [ ] **Paso 11 · Revisión final** *(Nivel de modelo: medio)*

  > Lee `plan-mejoras.md` y haz solo el paso 11. Revisa toda la página en celular y computador. Haz una consulta de prueba de pintura automotriz y otra de pintura general. Dime qué comprobaste de verdad y guarda la versión final.

  **Quedó bien si:** las dos consultas llegan bien y tienes la versión guardada.

---

Cuando termines todos los pasos, avísale a tu facilitador para revisar y publicar.
