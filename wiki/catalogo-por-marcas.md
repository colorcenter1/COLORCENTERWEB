---
tipo: catálogo-comercial
estado: provisional
creado: 2026-11-19
actualizado: 2026-11-19
tags: [catálogo, marcas, automotriz]
fuentes: [../landing/src/data/brandCatalogs.ts, https://sherwin-auto.com.br/en/produtos/, https://www.baslac.com/en-emea/products-systems, https://autolack.com.co/productos/productos.html]
---
# Catálogo por marcas

## Confirmado por fuentes oficiales consultadas
- **Sherwin-Williams:** su catálogo automotriz brasileño publica pinturas, barnices, masillas, primers, diluentes/auxiliares y abrasivos. La página consultada no acredita que todas las referencias estén disponibles en Color Center, ni que la oferta brasileña sea la de Colombia. [[documentos-y-activos]]
- **baslac:** la información oficial EMEA presenta pinturas base/topcoat, barnices, primers y masilla. En las fichas técnicas se documentan reductores/disolventes. La fuente consultada no confirma una línea de lijas/abrasivos ni distribución o inventario en Valledupar.
- **Tercera marca confirmada por el propietario:** Industrias Autolack S.A.S. de Colombia. El sitio oficial muestra líneas Poliéster Core Colors, Azul Especial, Poliéster Premium y Barniz HS; su familia Auxiliares incluye masillas y solventes. La página de productos no expone referencias concretas de primers ni lijas en el índice consultado, así que quedan como no confirmadas.
- **Nuevas familias confirmadas por el propietario (respuesta “del 1 al 4”):** el negocio vende catalizadores/endurecedores/aditivos; auxiliares/limpiadores; pulimento y accesorios de pulido; aerosoles/pistolas/herramientas. Se añadieron a las tres marcas **solo donde la fuente de esa marca publica productos o línea**. No se asumió que los cuatro grupos existan para cada fabricante.
- **Imágenes:** el sitio usa una foto de proceso de aplicación de pintura de Gustavo Fring, Pexels, gratuita según la página de origen. Es ilustrativa y no muestra envases ni representa productos de las marcas. No se reutilizan fotos oficiales de envases porque no se halló permiso abierto.
- **Atención comercial:** precios, presentaciones, existencias y disponibilidad local se confirman por WhatsApp; no son datos integrados.

## Patrones de interfaz que se pueden adaptar
- **Sherwin-Williams:** jerarquía clara de familias y subfamilias (pinturas, barnices, primers, masillas, auxiliares, equipos/abrasivos), útil para que el cliente llegue a una categoría conocida.
- **baslac:** fichas de producto en bloques con nombre/código, uso y enlaces a ficha técnica/seguridad, útil para la comparación y orientación antes de consultar.
- **Autolack:** líneas agrupadas como catálogo visual y nombres directos de líneas/variantes; útil para navegar por familia sin presentar toda la información de fabricante como si fuera inventario de Color Center.
- **Interfaz confirmada por el propietario:** comparar una categoría entre las tres marcas en una vista. La persona elige una familia y ve una tarjeta por marca, con resumen breve de función, productos conocidos, región de referencia y enlaces a fuente y WhatsApp. Los resúmenes no son instrucciones de aplicación; para mezclas y compatibilidad se consulta la ficha técnica oficial.
- **Adaptación local ya implementada:** diez filtros por categoría y tres tarjetas comparativas. Si una fuente no lista productos, la tarjeta lo indica. Se conserva la identidad Color Center; no se copiaron logos, textos promocionales ni fotografías de envases de fabricantes.
- **Por decidir con el propietario:** confirmar si vende productos de madera/industrial/epóxica (opción 5); no se añadieron.

## Páginas consultadas
- [Sherwin-Williams Automotive Finishes Brasil — Productos](https://sherwin-auto.com.br/en/produtos/) (catálogo regional consultado 2026-11-19).
- [Sherwin-Williams Brasil — abrasivos](https://sherwin-auto.com.br/en/produto/equipment-and-accessories/equipment-and-accessories-preparation-and-painting/).
- [baslac — sistemas EMEA](https://www.baslac.com/en-emea/products-systems), [aditivos, endurecedores, reductores y limpiadores](https://www.baslac.com/en-emea/baslac-additives), [pinturas](https://www.baslac.com/en-emea/baslac-base-and-topcoats), [barnices](https://www.baslac.com/en-emea/baslac-clearcoats-0), [masillas](https://www.baslac.com/en-emea/baslac-putty) y [fichas técnicas](https://www.baslac.com/en-emea/technical-data-sheets).
- [Pinturas Everest — línea automotriz](https://pinturaseverest.com/categoria-producto/linea-principal/linea-automotriz/) y [Industrias Autolack SAS](https://autolack.com.co/), usadas solo para distinguir la marca pendiente.
- [Industrias Autolack — productos](https://autolack.com.co/productos/productos.html) y [líneas](https://autolack.com.co/), usados para el tercer catálogo tras confirmación del propietario.
- Foto: [Pexels, Gustavo Fring](https://www.pexels.com/photo/person-using-paint-spray-gun-6870314/); licencia: [Pexels License](https://www.pexels.com/license/); copia local y crédito en `landing/public/catalog/CREDITOS.md`.

## Pendientes
- Confirmar disponibilidad real y referencias en Valledupar antes de presentar estos productos como oferta de la tienda.
- Si se desean fotos de envases exactos, obtener imágenes propias autorizadas o permiso de uso del fabricante/distribuidor.
- baslac no tiene abrasivos, pulido o pistolas identificados en las páginas consultadas; Autolack tampoco publica referencias de primers, abrasivos, pulido o pistolas. Mantener los avisos de «sin línea confirmada».
