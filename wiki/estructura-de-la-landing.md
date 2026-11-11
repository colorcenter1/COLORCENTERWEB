---
tipo: estructura-de-pagina
estado: implementada-localmente
creado: 2026-11-10
actualizado: 2026-11-10
tags: [landing, estructura]
fuentes: [../PLAN%20TRABAJO.md, ../landing/src/App.tsx]
---
# Estructura de la landing

Estructura aprobada en `PLAN TRABAJO.md` e implementada el 2026-11-10. El propietario aprobó la composición visual (fondos claros, azul de marca, tipografía Archivo, abanico de 20 tonos). La revisión anterior del prototipo queda en el historial de Git (etiqueta `antes-del-rediseno`).

| Orden | Sección | Contenido | Archivo |
|---|---|---|---|
| 1 | Encabezado | Logo, Productos, Simulador, Cómo comprar, Ubicación, WhatsApp; menú móvil | `layout/SiteHeader.tsx` |
| 2 | Portada | «Pinturas e insumos automotrices en Valledupar»; «Consultar productos» (WhatsApp) y «Probar colores» (activa el simulador); abanico gráfico con los 20 tonos | `hero/Hero.tsx` |
| 3 | Simulador | Izquierda: carrocería encima del visor 3D y, debajo, «Consultar este color por WhatsApp» y aviso de vista aproximada. Derecha: solo color (paleta en dos columnas de tres familias, color libre y selección) | `simulator/` |
| 4 | Productos | Vitrina en seis categorías con los ocho productos confirmados (pinturas automotrices, barnices, catalizadores, lijas, cintas de enmascarar, pistolas de pintura, ceras y complementos), su uso y botón «Consultar» propio; botón para consultar una lista; sin marcas, precios ni fotos no confirmadas | `sections/Products.tsx` |
| 5 | Asesoría | Qué compartir al consultar; aclara que la aplicación depende del cliente o su pintor | `sections/Advice.tsx` |
| 6 | Cómo comprar | Consultar → confirmar precio/disponibilidad → recoger en sede | `sections/HowToBuy.tsx` |
| 6b | Testimonios | Carrusel accesible de cinco testimonios: avanza uno cada 20 s, con pausa, flechas y puntos; se detiene al pasar el cursor o enfocar. **Textos de referencia** en `src/data/testimonials.ts`, pendientes de sustituir por testimonios reales autorizados | `sections/Testimonials.tsx` |
| 7 | Preguntas | Seis respuestas limitadas a lo acordado, incluida la aclaración de que no se prestan servicios | `sections/Faq.tsx` |
| 8 | Ubicación | Dirección de la ficha de Maps, mapa de Google incrustado (carga diferida), enlace exacto, WhatsApp y cierre | `sections/Location.tsx` |
| 9 | Pie | Contacto, navegación y aclaraciones; sin enlaces legales porque aún no existen | `layout/SiteFooter.tsx` |

Además, en móvil hay un botón fijo «Consultar por WhatsApp».

## Contenido gráfico

- Sin fotos propias todavía: la portada usa una composición geométrica (abanico de muestras) y el simulador una muestra plana de color; no se presentan fotos ajenas como del negocio.
- Al recibir fotos autorizadas en `Docs/`, revisar, catalogar y valorar su uso en portada, productos y ubicación.
