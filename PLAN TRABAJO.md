# Rediseño de Color Center: una web premium, interactiva y rápida

## 1. Objetivo y dirección acordada

Presentar a Color Center como **vendedor de pinturas e insumos automotrices en Valledupar**, con una estética clara y sofisticada, contacto por WhatsApp y un simulador que ayude a explorar colores.

Conservaremos el logo y los colores de marca. Usaremos fondos claros, azul profundo, tipografía legible, espacios amplios y animaciones discretas. El contenido explicará la venta de productos sin ofrecer servicios de pintura, mantenimiento o latonería.

La implementación continuará sobre React, TypeScript y Vite. Esta propuesta no incluye publicación, pagos ni desarrollo del carrito pendiente.

## 2. Estructura y mejoras propuestas

| Orden | Sección | Propuesta |
|---|---|---|
| 1 | Encabezado | Logo, Productos, Simulador, Cómo comprar, Ubicación y WhatsApp. Corregir solapamientos. |
| 2 | Portada | Mensaje: **“Pinturas e insumos automotrices en Valledupar”**. Botones “Consultar productos” y “Probar colores”. |
| 3 | Simulador de colores | Vista previa ligera; el visitante activa el 3D cuando quiera usarlo. |
| 4 | Productos y categorías | Pinturas, barnices y catalizadores; preparación y abrasivos; cintas y enmascarado; pistolas; ceras y pulido; protección y complementos. Mostrar únicamente productos confirmados. |
| 5 | Asesoría para elegir insumos | Fusionar beneficios y segmentos repetidos. Explicar cómo consultar el producto adecuado sin prometer resultados técnicos no respaldados. |
| 6 | Cómo comprar | Consultar por WhatsApp, confirmar precio/disponibilidad y recoger en sede, conforme al alcance acordado. |
| 7 | Preguntas frecuentes | Respuestas breves sobre compra, colores, presentaciones y recogida, con información validada. |
| 8 | Ubicación y contacto | Enlace a la ficha exacta de Color Center, datos confirmados y llamada final a WhatsApp. |
| 9 | Pie | Contacto, navegación y enlaces legales disponibles. |

**Propongo retirar de la experiencia pública:** testimonios de muestra, usuarios “en línea” simulados, panel de analíticas de demostración, botones Auto/Móvil/Escritorio, checklist técnico y cambio de tema.

La calculadora de cantidades quedará fuera de la versión pública hasta validar sus coeficientes y recomendaciones. Las fotos propias tendrán prioridad; cuando falten, usaremos composiciones gráficas y texto, sin presentar fotos ajenas como material del negocio.

Todos los enlaces de ubicación utilizarán [la ficha que compartiste](https://maps.app.goo.gl/p52X8eboDhx3h83GA). Eliminaremos el mapa ilustrativo actual y el rótulo “Waze” que actualmente abre Google Maps. Un mapa interactivo, si se incorpora, se cargará únicamente al solicitarlo.

## 3. Simulador y propuesta de 20 tonos

**Experiencia:** activar → elegir sedán, hatchback o pickup → seleccionar un tono o color libre → girar el vehículo → consultar por WhatsApp.

- Vehículos genéricos realistas, sin marcas, con licencia que permita su uso comercial.
- Revisar y presentar los tres modelos antes de integrarlos. No comprar activos ni sustituirlos por modelos estilizados sin validación.
- Retirar faros interactivos, techo bitono y simulación de latas para concentrar la experiencia en carrocería y color.
- Conservar la selección al cambiar de vehículo.
- El mensaje de WhatsApp incluirá carrocería y color seleccionado; un color libre se identificará como personalizado.

La investigación de CESVI sobre reparaciones en Colombia respalda priorizar grises, blancos y platas, y menciona rojo diamante y azul eléctrico. Es información sobre reparaciones de 2023, no un ranking actual de veinte referencias. [Fuente: CESVI, Auto Crash](https://www.revistaautocrash.com/wp-content/uploads/2024/10/Autocrash-Ed-74.pdf).

Esta es mi **paleta orientativa para tu validación**:

| Familia | Tonos propuestos |
|---|---|
| Blancos | Blanco puro · Blanco perlado |
| Platas y grises | Plata aluminio · Gris ratón · Gris grafito · Gris cemento |
| Negros | Negro intenso · Negro perlado · Negro nebuloso |
| Rojos | Rojo vivo · Rojo diamante · Vinotinto |
| Azules | Azul eléctrico · Azul oscuro · Azul acero |
| Otros | Beige champaña · Café metalizado · Verde oliva · Amarillo intenso · Naranja cobre |

Estos nombres no se publicarán como referencias oficiales de Sherwin-Williams ni como productos disponibles. “Gris ratón” y “negro nebuloso” conservan tu denominación, pendiente de contrastar con la carta del negocio.

El selector libre permitirá elegir visualmente e introducir un HEX. Mostraremos: **“Vista aproximada. El color y acabado reales deben confirmarse con una muestra y asesoría del negocio.”** Un HEX no se convertirá automáticamente en fórmula de pintura.

## 4. Diseño, rendimiento y SEO

**Skills.** Instalar las versiones oficiales de [Emil Kowalski](https://github.com/emilkowalski/skills) e [Impeccable](https://github.com/pbakaus/impeccable) en el proyecto, revisar su contenido y registrar la versión. Servirán para jerarquía, componentes, interacción, accesibilidad y revisión visual; no se añadirán a la descarga de la web ni se habilitarán automatismos que amplíen permisos.

**Three.js ligero.**

- Cargar biblioteca y primer modelo solo al pulsar “Probar colores”.
- Descargar las otras carrocerías cuando se seleccionen.
- Usar modelos GLB optimizados, materiales compartidos y renderizado bajo demanda, evitando actividad continua cuando el vehículo esté quieto. [Documentación de Three.js](https://threejs.org/manual/pages/rendering-on-demand.html).
- Evitar efectos de posproducción, sombras dinámicas costosas y texturas grandes.
- Si falla el 3D, mantener paleta, selector y consulta con una alternativa estática.
- Objetivos propios del proyecto: carga inicial total de hasta **1 MB** y descarga adicional inicial del simulador de hasta **2 MB**, comprobados sobre la compilación de producción.

**SEO orgánico e IA.**

- Aplicar la skill local `seo-organico-ia`.
- Orientar títulos y textos a la venta de pinturas e insumos automotrices en Valledupar.
- Entregar el contenido principal en HTML mediante prerender de la landing, manteniendo React para las interacciones.
- Usar encabezados semánticos, enlaces reales, imágenes optimizadas y datos empresariales coherentes con la ficha de Maps.
- Incorporar datos estructurados únicamente con información confirmada; no incluir reseñas, precios o existencias ficticias.
- Configurar canónica y sitemap cuando se confirme el dominio real.
- No añadir archivos especiales como supuesto requisito para aparecer en IA: Google mantiene los fundamentos habituales de SEO. [Guía oficial](https://developers.google.com/search/docs/appearance/ai-features).

## 5. Etapas y criterios de aceptación

1. **Validación contigo:** aprobar estructura, paleta y dirección visual; revisar modelos y materiales disponibles.
2. **Base visual:** instalar skills, preparar una versión recuperable y rediseñar portada, navegación y componentes.
3. **Interacción:** integrar simulador, categorías, enlaces de Maps y consultas contextualizadas.
4. **SEO y optimización:** prerender, metadatos, recursos optimizados y revisión de contenido.
5. **Entrega local:** mostrar la versión completa para revisión antes de cualquier publicación.

Comprobaremos:

- Compilación y TypeScript.
- Diseño a 360, 390, 768 y 1440 píxeles, sin solapamientos ni desplazamiento horizontal.
- Navegación con teclado, foco visible, zoom y movimiento reducido.
- Las tres carrocerías, veinte tonos, selector libre, cambio entre modelos y recuperación ante fallos.
- Ausencia de descargas 3D antes del clic.
- Destinos de WhatsApp y ficha exacta de Maps, sin enviar mensajes.
- HTML legible sin JavaScript y coherencia del contenido SEO.

Mediremos rendimiento en producción local con condiciones móviles documentadas. Los objetivos serán LCP ≤ 2,5 s y CLS ≤ 0,1; la experiencia real y el posicionamiento se verificarán después de publicar, sin prometer una puntuación o posición.
