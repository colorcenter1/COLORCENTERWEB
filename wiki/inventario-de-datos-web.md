---
tipo: inventario-de-datos
estado: revisión-técnica-inicial
creado: 2026-11-10
actualizado: 2026-11-19
tags: [privacidad, datos-personales, landing]
fuentes: [../landing/src/services/analytics.ts, ../landing/src/components/PaintCalculatorModal.tsx, ../landing/src/components/CarPaintSimulator.tsx, ../landing/src/components/ColorStudioModal.tsx, ../landing/src/components/StepsSection.tsx, ../landing/src/components/ProductCatalog.tsx, ../landing/index.html, ../.agents/skills/tratamiento-datos-landing/SKILL.md]
---
# Inventario técnico de datos de la landing

Revisión estática del código para preparar el Paso 9. No es una conclusión legal ni una política; no se inspeccionaron cookies o solicitudes del navegador porque no se abrió una vista previa.

| Zona/acción | Datos que el código usa | Dónde se guardan o envían | Estado/observación |
|---|---|---|---|
| Catálogo: búsqueda | Texto de búsqueda de productos | Estado temporal de React mientras la página está abierta | No se encontró envío al servidor ni registro de la consulta |
| Calculadora de pintura | Tipo de vehículo, sistema de pintura, piezas seleccionadas y opciones de primer/masilla; calcula cantidades estimadas | Estado temporal de React. Solo al pulsar el botón se compone un mensaje con esos datos para `wa.me` | No pide nombre, documento, correo, teléfono ni dirección. El usuario decide si envía el mensaje |
| Simulador/laboratorio de color | Modelo ilustrativo, color/HEX, acabado y opción bitono | Estado temporal; algunas interacciones se registran localmente. El botón de cotizar arma un mensaje para WhatsApp | No envía el color a un servidor propio en el código revisado |
| Consulta de producto/segmento/FAQ | Producto, categoría o texto fijo de consulta | Enlaces a `https://wa.me/573004426477` con mensajes prellenados | El código contiene el número, todavía pendiente de confirmación como canal oficial y para privacidad |
| Instrucción de enviar placa/VIN | La web invita a enviar por WhatsApp foto de la placa del vehículo (puede mostrar VIN/código y otra información identificadora) | El sitio no carga la foto; el usuario la enviaría voluntariamente por WhatsApp | Tratar como posible dato personal cuando pueda asociarse a una persona. El tratamiento de WhatsApp debe describirse en la política |
| Analítica propia de demostración | Evento, etiqueta, hora, categoría/producto/color, tipo de dispositivo por ancho de ventana y métricas agregadas | `localStorage` del navegador, clave `color_center_analytics`; no se encontró API o servidor de analítica. Incluye valores iniciales simulados | No aparece identificador de persona en el código; los números precargados y usuarios “online” son simulados, no tráfico real |
| Preferencia visual | Tema claro/oscuro | `localStorage`, clave `color_center_theme` | Preferencia local, sin cuenta de usuario |
| Copiar color | Código HEX de color seleccionado | Portapapeles solo tras acción explícita | No se encontró otro dato en esa acción |
| Recursos externos | Solicitudes de fuentes Google Fonts, imágenes de Unsplash y recurso de mapa alojado en Google; enlaces a Maps y WhatsApp | Proveedores externos mediante carga de recurso o clic | No se encontró píxel de seguimiento ni analítica externa; confirmar tratamiento y datos técnicos con proveedores antes de publicar política |

## Hallazgos y límites

- No se encontraron formularios de contacto, campos de nombre/correo/dirección, cuentas, pagos, base de datos, cookies propias, API de envío, Google Analytics ni casillas de consentimiento en el código revisado.
- El panel “Analíticas” usa datos locales de ejemplo/simulados y exporta un archivo JSON bajo acción del usuario; no es un panel conectado a tráfico real.
- El pie no contiene enlace a política de privacidad ni aviso junto a los enlaces de WhatsApp.
- No se abrió el DOM renderizado, no se hizo captura de red y no se verificó qué cookies establecen proveedores externos. La política debe reflejar esta revisión técnica cuando se complete, además de los tratamientos del negocio fuera de la web.

## Datos empresariales pendientes para la etapa de política

En la revisión del 2026-11-12, `Docs/` estaba vacía. El propietario informó el 2026-11-12 que es persona natural, usa el nombre comercial Colorcenter Valledupar, señala como domicilio de privacidad la dirección publicada en la página y confirma `colorcenter.valledupar@gmail.com` para consultas de datos. La razón social/nombre legal completo y el cotejo de dirección con el RUT siguen pendientes. El NIT se compartió en el chat y no se copia a la wiki ni al repositorio; si deposita el RUT en `Docs/`, permanece excluida de Git. También falta conocer tratamientos fuera de la página (por ejemplo clientes atendidos en sede, empleados/proveedores, cámaras, publicidad, conservación y terceros). No publicar política con estos puntos incompletos.

## Actualización estática 2026-11-19 — herramientas ligeras

- **Catálogo y guía:** las selecciones de producto viven solo en el estado temporal de React mientras la página está abierta. Un enlace arma una lista para cotizar y el visitante decide si abre y envía el mensaje a WhatsApp. No pide nombre, documento, dirección u otro dato personal.
- **Código de pintura:** campo opcional en el simulador, estado temporal de React; si la persona pulsa WhatsApp, se agrega al texto prellenado. La foto no se selecciona ni sube desde la web; podrá adjuntarse por decisión del visitante en WhatsApp.
- **No se añadió:** base de datos, cuenta, formulario de contacto, envío automático, almacenamiento de la cotización/código ni pago.
- Es una inspección estática del código fuente; falta comprobar DOM, comportamiento y solicitudes de red en navegador. Tratamientos fuera de la web y proveedores externos siguen pendientes; no se ha redactado ni publicado política.
