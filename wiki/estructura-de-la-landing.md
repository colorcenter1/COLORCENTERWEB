---
tipo: estructura-de-pagina
estado: propuesta-pendiente-de-aprobacion
creado: 2026-11-10
actualizado: 2026-11-10
tags: [landing, estructura, revision]
fuentes: [../landing/src/App.tsx, ../landing/src/components/Header.tsx, ../landing/src/components/HeroSection.tsx, ../landing/src/data/mockData.ts, ../PLAN%20DE%20MEJORA/06-color-center-valledupar/plan-mejoras.md]
---
# Estructura actual y propuesta

La propuesta original se hizo leyendo componentes y datos del código. El 2026-11-10 se abrió y verificó la vista previa después del traslado a `landing/`; ver [[estado-del-proyecto]]. No se ha quitado ni cambiado ninguna sección; la propuesta necesita aprobación.

## Orden actual de la página

1. **Barra de simulación del prototipo:** botones «Auto», «Móvil (390px)» y «Escritorio». Parece una herramienta de vista previa, no contenido para clientes.
2. **Encabezado:** logo, navegación, acceso al panel de analíticas, cambio de tema y WhatsApp.
3. **Portada:** mensaje principal, botón de WhatsApp y simulador/selector de colores; las imágenes de carro y lata vienen de Unsplash.
4. **Franja de confianza:** espectrofotómetro, productos Sherwin-Williams y despacho; son afirmaciones del código aún por validar.
5. **Segmentos de clientes:** talleres, pintores y flotas, con mensajes y beneficios propios.
6. **Por qué elegirnos:** tres bloques que vuelven a hablar de tecnología, productos, precisión y rapidez; se superpone parcialmente con la franja de confianza.
7. **Catálogo automotriz:** filtros, productos, medidas, calculadora de piezas y enlaces a WhatsApp; fotos de muestra externas. No hay catálogo aprobado de pintura general en `Docs/`.
8. **Cómo pedir:** tres pasos relacionados con código de pintura/VIN y contacto por WhatsApp.
9. **Testimonios:** nombres y comentarios cargados en datos de muestra; la misma sección los llama «representativos».
10. **Preguntas frecuentes:** incluye respuestas sobre productos, envíos, pagos y tiempos que aún no se han contrastado con fuentes empresariales.
11. **Sede y contacto:** ubicación, horario, teléfono y mapa; datos actualmente provisionales.
12. **Llamada final a WhatsApp.**
13. **Notas técnicas y checklist de lanzamiento:** lista de implementación de la página, potencialmente útil para el equipo, pero no para clientes.
14. **Pie de página:** marca, sede, navegación y WhatsApp.

Además, hay una barra de navegación móvil fija y ventanas emergentes para el simulador de color, calculadora de pintura y analíticas. El panel muestra métricas generadas localmente, no un sistema real de visitas o pedidos.

## Material de muestra y validación pendiente

- Las imágenes de portada y productos usan URL de Unsplash; la imagen del mapa usa un recurso remoto de Google. No son fotografías aportadas por el negocio.
- Los testimonios incluyen personas y comercios nombrados, pero no hay autorizaciones ni fuentes de clientes. No deben presentarse como experiencias reales.
- El contador de usuarios cambia con cifras simuladas; el panel de analíticas tiene datos locales de ejemplo.
- La barra para simular tamaños de pantalla y el checklist técnico parecen controles/notas del prototipo.
- Hay afirmaciones cuantificadas o comerciales sobre tiempos, precisión, despacho, stock, pagos y facturación que requieren respaldo o aprobación.
- No se encontraron fotos, videos ni catálogos empresariales en `Docs/`.

## Propuesta de orden, pendiente de aprobación

1. **Encabezado simple:** logo, enlaces a productos, cómo pedir, sede y botón de contacto confirmado.
2. **Portada con foto propia:** mensaje breve del negocio y acceso a consultar por WhatsApp; esperar la foto autorizada.
3. **Productos y categorías:** catálogo automotriz aprobado; incorporar pintura general cuando exista su catálogo. Foto específica por producto solo si corresponde y está autorizada.
4. **A quién atiende y qué ofrece:** juntar la franja de confianza, segmentos y “por qué elegirnos” en una explicación compacta, una vez validadas sus afirmaciones.
5. **Cómo pedir o cotizar:** pasos claros y confirmados por el negocio.
6. **Preguntas frecuentes:** conservar solo respuestas validadas.
7. **Sede y contacto:** dirección, horario, retiro en sede y mapa confirmados.
8. **Cierre de contacto y pie:** un llamado a la acción claro y datos esenciales.

## Decisiones que requieren aprobación

- Aprobar este orden general antes de mover o fusionar secciones.
- Ocultar los testimonios de muestra hasta recibir testimonios reales autorizados.
- Retirar de la versión para clientes la barra de simulación y el checklist técnico; reemplazar el panel de usuarios simulados por datos reales o quitar ese indicador.
- Conservar el simulador de color como herramienta visual separada del catálogo, si todavía se desea.
- Esperar las imágenes y videos propios que el propietario espera subir dentro de las próximas 72 horas (informado el 2026-11-10); revisar cada archivo antes de ubicarlo.
