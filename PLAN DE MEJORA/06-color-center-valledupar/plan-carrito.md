---
tipo: plan-de-mejora
estado: alcance-inicial-confirmado-catalogo-pendiente
creado: 2026-11-06
actualizado: 2026-11-06
tags: [carrito, tienda, whatsapp, mejoras]
fuentes: [./plan-mejoras.md, ./instalar-skills.md, ./validacion-con-cliente.md, ../../src/components/ProductCatalog.tsx, ../../src/data/mockData.ts, ../../src/types.ts, ../../src/components/MobileNavDock.tsx]
---
# Plan de mejora: carrito de pedidos

## Lo que encontré y confirmaste

- **Confirmado en el código:** la página usa React y TypeScript. `ProductCatalog` muestra productos automotrices y enlaza cada ficha a WhatsApp; `MobileNavDock` tiene una opción “Tienda” que lleva a la sección de la sede. No hay carrito, estado de pedido, sistema de inventario ni pasarela de pago implementados.
- **Confirmado en el código:** los productos viven en `src/data/mockData.ts`. `ProductItem.sizes` es una lista de rótulos, sin identificador de variante ni precio estructurado; el catálogo actual es automotriz. El catálogo aprobado de pintura general no está en `Docs/`.
- **Provisional, requiere confirmación:** el WhatsApp actual en el código es `+57 300 442 6477`; aún falta confirmar si es el número oficial. La dirección publicada también debe confirmarse antes de usarla como lugar de recogida.

### Decisiones confirmadas por el propietario

- **Confirmado:** el carrito no cobrará en línea; preparará una consulta/cotización que el cliente enviará por WhatsApp.
- **Confirmado:** el asesor confirma precio y disponibilidad por WhatsApp. No se mostrarán importes, totales ni existencias como confirmados mientras no haya una fuente conectada.
- **Confirmado:** el cliente recoge el pedido en la sede; no se planean envíos a domicilio en este alcance.
- **Confirmado:** se desea visualizar productos con Three.js dentro de la experiencia del carrito. Se interpreta “tree.js” como Three.js para visualización 3D, no como lógica comercial.
- **Pendiente por indicación del propietario:** las categorías/productos se definirán más adelante. No preguntar de nuevo en esta etapa.

## Alcance acordado para planificar

**Alcance aprobado para planificar:** carrito de consulta que agrupa productos, presentaciones y cantidades y permite al cliente enviar una solicitud de cotización por WhatsApp. No confirma compra ni reserva inventario, y no cobra. El cliente recoge en la sede. El catálogo detallado se añadirá cuando esté disponible.

## Paso a paso

1. **Completar el catálogo más adelante.** Cuando el propietario lo tenga, añadir los productos/categorías aprobados, identificadores, presentaciones/variantes y unidades. Mantener precios y stock fuera del carrito: el asesor los confirma por WhatsApp. No rellenar categorías o detalles comerciales de memoria.
2. **Preparar visuales 3D aprobados.** Revisar si hay modelos 3D propios (por ejemplo `.glb`/`.gltf`) en `Docs/`. No se encontró ninguno en el inventario actual. Si no existen, el carrito funciona inicialmente con fotos autorizadas y el visor 3D queda pendiente hasta recibir modelos; no convertir imágenes de muestra en representaciones oficiales.
3. **Diseñar el acceso al carrito.** Añadir un control visible con número de unidades y una vista de pedido adaptable a escritorio/móvil, con estados vacío y con productos, variante/presentación, selector de cantidad, quitar y vaciar.
4. **Implementar la lógica del carrito en React.** Mantener una línea por producto y presentación; recalcular cantidades/resumen sin precios y conservar el borrador local entre recargas solo si se confirma ese comportamiento. La lógica comercial queda en React/TypeScript.
5. **Añadir el visor de productos con Three.js dentro del carrito.** Cargar el modelo 3D autorizado del producto seleccionado, con controles simples de rotación y fallback a foto si falta el modelo o WebGL. Cargarlo bajo demanda para no ralentizar la página; optimizar controles para móvil y dejar alternativa accesible sin interacción 3D.
6. **Preparar la solicitud para WhatsApp.** Mostrar producto/presentación, cantidad y la nota “precio y disponibilidad por confirmar”. Abrir el número oficial, que sigue pendiente de confirmación; no poner precio total ni indicar que la compra quedó confirmada. La recogida es en la sede; validar la dirección publicada antes del lanzamiento.
7. **Verificar accesibilidad, persistencia y móviles.** Probar agregar, duplicar, cambiar cantidad/variante, quitar, vaciar, recargar, carrito vacío, mensaje codificado y fallback 3D en móvil/escritorio. Ejecutar lint/compilación cuando npm o el gestor esté disponible; hoy npm no está disponible y no existe archivo de bloqueo.
8. **Guardar el resultado y reportar el estado.** Registrar solo los archivos de esta mejora en Git. Distinguir compilación, revisión visual, prueba funcional y publicación. No publicar ni activar pagos como parte del plan.

## Si se quiere cobrar en línea

Eso requiere decidir y diseñar por separado: proveedor de pagos para Colombia, backend seguro y persistencia de pedidos, cálculo de envío, disponibilidad, confirmación de pago, facturación, reembolsos, protección de datos y soporte. No se deben guardar datos de tarjeta en la web. El carrito no debe mostrar “pedido confirmado” hasta que el servidor valide el pago. Este alcance se cotiza/delimita antes de implementarlo.

## Sobre `tree.js` / `three.js`

La documentación oficial describe Three.js como biblioteca 3D. Se incluirá para la visualización de productos que el propietario pidió; no llevará el estado del carrito, precios ni pagos. La guía local original decía que Three.js no era necesario para su plan de diseño; esta petición concreta cambia ese alcance solo para el visor 3D.

La guía de skills (`instalar-skills.md`) no contiene una skill de carrito. Indica skills de diseño y de SEO/datos; no ejecuté ni instalé ninguna. Las skills SEO y de tratamiento de datos siguen dentro de sus ZIP y `.agents/skills/` no existe. La skill de diseño para futuras mejoras visuales se puede evaluar después de acordar el alcance.

## Pendientes para una conversación posterior

- **Catálogo:** preguntar más adelante qué productos/categorías se incluyen y pedir catálogo aprobado con presentaciones/unidades.
- **Modelo 3D:** solicitar los modelos propios/autorizados de los productos a visualizar (o acordar una alternativa de fotografía si no hay modelos).
- **Datos del punto de recogida y contacto:** confirmar la dirección de la sede publicada y si sigue vigente `+57 300 442 6477` antes de codificar el enlace final.
