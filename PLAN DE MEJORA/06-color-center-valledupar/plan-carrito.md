---
tipo: plan-de-mejora
estado: borrador-pendiente-de-respuestas
creado: 2026-11-06
actualizado: 2026-11-06
tags: [carrito, tienda, whatsapp, mejoras]
fuentes: [./plan-mejoras.md, ./instalar-skills.md, ./validacion-con-cliente.md, ../../src/components/ProductCatalog.tsx, ../../src/data/mockData.ts, ../../src/types.ts, ../../src/components/MobileNavDock.tsx]
---
# Plan de mejora: carrito de pedidos

## Lo que encontré

- **Confirmado en el código:** la página usa React y TypeScript. `ProductCatalog` muestra productos automotrices y enlaza cada ficha a WhatsApp; `MobileNavDock` tiene una opción “Tienda” que lleva a la sección de la sede. No hay carrito, estado de pedido, sistema de inventario ni pasarela de pago implementados.
- **Confirmado en el código:** los productos viven en `src/data/mockData.ts`. `ProductItem.sizes` es una lista de rótulos, sin identificador de variante ni precio estructurado; el catálogo actual es automotriz. El catálogo aprobado de pintura general no está en `Docs/`.
- **Provisional, requiere confirmación:** el WhatsApp actual en el código es `+57 300 442 6477`. No hay una fuente empresarial en `Docs/` que confirme número, precios, inventario o condiciones de entrega.
- **Pendiente de definir:** si el carrito será una lista para cotizar por WhatsApp o una tienda con cobro en línea. La segunda opción requiere ampliar el sistema, no solo diseñar una interfaz.

## Alcance recomendado para empezar

**Supuesto para este borrador:** carrito sencillo de consulta que agrupa productos, presentaciones y cantidades y genera un mensaje para que la persona lo envíe al WhatsApp del negocio. No confirma una compra, no reserva inventario y no cobra. Esto encaja con el flujo de contacto que ya tiene la landing y evita mostrar precios o existencias no confirmados.

## Paso a paso

1. **Definir el flujo y validar los datos.** Resolver las preguntas al final de este documento: cotización o pago, productos/categorías, presentaciones, origen de precios y stock, entrega/retiro y qué significa “tree.js”. No cambiar la web hasta delimitarlo.
2. **Preparar un catálogo apto para pedidos.** Partir de productos aprobados, con identificador, categoría, nombre, presentación/variante y unidad de venta. Añadir precio o disponibilidad solo si se confirma una fuente vigente. Separar pintura automotriz y general solo cuando exista catálogo real para ambas.
3. **Diseñar el acceso al carrito.** Añadir un control visible con el número de unidades y una vista de pedido compatible con escritorio y móvil, siguiendo los colores actuales. Incluir estados vacío y con productos, detalle de variante, selector de cantidad, quitar producto y vaciar.
4. **Implementar la lógica en React.** Mantener una sola línea por producto y variante, recalcular cantidades/resumen al instante y conservar el borrador localmente entre recargas si el cliente acepta ese comportamiento. No usar `three.js` para guardar, calcular o enviar el carrito.
5. **Conectar el envío de consulta.** En el alcance recomendado, preparar un mensaje legible con productos, presentaciones, cantidades y datos de entrega que el cliente haya escrito. Abrir el WhatsApp oficial confirmado. Si no hay precios aprobados, el mensaje pide cotización y no muestra totales inventados. El envío sigue siendo voluntario del cliente; no es un bot.
6. **Cuidar uso y datos.** Comprobar botones táctiles, teclado, lectores de pantalla, mensajes largos, caracteres especiales, cantidades inválidas y que el borrador no guarde información personal innecesaria.
7. **Verificar antes de darlo por listo.** Probar agregar, repetir, cambiar cantidad/variante, quitar, vaciar, recargar, carrito vacío, mensaje de WhatsApp y diseño en móvil/escritorio con datos ficticios. Ejecutar los scripts reales de lint/compilación cuando npm o el gestor disponible esté operativo; ahora mismo npm no está disponible y no hay archivo de bloqueo.
8. **Guardar el resultado y reportar el estado.** Registrar únicamente los archivos de la tarea en Git. Distinguir compilación, revisión visual, prueba funcional y publicación. No publicar ni activar cobros como parte de este plan.

## Si se quiere cobrar en línea

Eso requiere decidir y diseñar por separado: proveedor de pagos para Colombia, backend seguro y persistencia de pedidos, cálculo de envío, disponibilidad, confirmación de pago, facturación, reembolsos, protección de datos y soporte. No se deben guardar datos de tarjeta en la web. El carrito no debe mostrar “pedido confirmado” hasta que el servidor valide el pago. Este alcance se cotiza/delimita antes de implementarlo.

## Sobre `tree.js` / `three.js`

La guía local de validación dice que GSAP y Three.js no son necesarios para los pasos previstos. La documentación oficial describe Three.js como biblioteca 3D; sirve para una visualización tridimensional si ese es el objetivo, no para el estado del carrito, precios, inventario o pagos. Recomendación: implementar el carrito con React/TypeScript que el proyecto ya usa y considerar Three.js solo como mejora visual independiente si se confirma un caso concreto.

La guía de skills (`instalar-skills.md`) no contiene una skill de carrito. Indica skills de diseño y de SEO/datos; no ejecuté ni instalé ninguna. Las skills SEO y de tratamiento de datos siguen dentro de sus ZIP y `.agents/skills/` no existe. La skill de diseño para futuras mejoras visuales se puede evaluar después de acordar el alcance.

## Preguntas para completar el diseño

1. **Cierre del carrito:** ¿quieres que el cliente envíe una lista para cotizar por el WhatsApp actual, o necesitas cobro y confirmación de compra en la página? (Recomiendo WhatsApp para la primera versión.)
2. **Catálogo:** ¿qué productos y categorías deben entrar al carrito? El código actual solo contiene repintado automotriz; el plan general también menciona pintura general, pero no hay catálogo de esta línea en `Docs/`.
3. **Precio y existencias:** ¿se mostrarán precios/precios por presentación y stock disponible, o confirmará todo el asesor? ¿En qué sistema actual se consultan esos datos (POS/ERP, hoja, otro)?
4. **Entrega y contacto:** ¿el pedido se recoge en la sede, se entrega a domicilio o ambas? ¿Qué zonas y cargos aplican? Confirma también si el WhatsApp vigente sigue siendo `+57 300 442 6477`.
5. **“tree.js”:** ¿te refieres a **Three.js** y quieres una visualización 3D de productos/colores, o tienes otra herramienta llamada `tree.js` en mente? El carrito no necesita 3D para funcionar.
