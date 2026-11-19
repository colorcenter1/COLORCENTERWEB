---
tipo: decisiones
estado: vigente
creado: 2026-11-06
actualizado: 2026-11-19
tags: [decisiones]
fuentes: [../AGENTS.md, ../landing/package.json, ../landing/src/components/TestimonialsSection.tsx]
---
# Decisiones

## 2026-11-19 — Catálogo de marcas, fuentes y alcance
- **Confirmado por fuente:** iniciar con catálogos informativos Sherwin-Williams y baslac y enlazar cada categoría a su fuente oficial. Las fuentes son Brasil y EMEA respectivamente; no equivalen a inventario confirmado de Valledupar.
- **Decisión de implementación:** solo se reutiliza una foto de proceso de Pexels con licencia gratuita declarada, con crédito, y se identifica como ilustrativa. No se usan fotos de packshots de fabricante sin licencia clara.
- **Pendiente del propietario:** precisar el nombre “Autolac” entre la línea AUTOLAC de Pinturas Everest y la empresa colombiana Industrias Autolack S.A.S.
- Fuente y estado: [[catalogo-por-marcas]], `landing/src/data/brandCatalogs.ts`, páginas oficiales enlazadas en esa página.

## 2026-11-19 — Auto conceptual 3D en simulador
- **Confirmado por el propietario:** opción 1, modelo 3D genérico realista sin marca.
- **Implementado localmente:** modelo Car Concept del repositorio Khronos glTF Sample Assets bajo CC BY 4.0; se ocultan placa/emblema del volante identificados en nodos, se recolorean materiales de carrocería y se conservan giro y color en una descarga diferida al abrir el simulador.
- **Límite:** 11.8 MB de GLB descargados al activar el 3D; faltan revisión en navegador, medición de móvil y comprobación de que no quedan marcas/emblemas visibles en la geometría.
- Fuente y licencia: `landing/public/models/CREDITOS.md`; [[estado-del-proyecto]].

## 2026-11-19 — Paleta rápida basada en reparaciones
- **Confirmado por fuente:** seis tonos y proporciones publicados por CESVI para 2023; representan frecuencia en reparaciones, no demanda nacional de ventas.
- **Decisión de interfaz:** poner esos seis tonos primero y dejar la paleta adicional desplegable; los HEX siguen siendo aproximaciones orientativas.
- Fuente: [[referencias-de-colores-automotrices]].

- **Confirmado, 2026-11-06:** conservar React/TypeScript/Vite y la organización presente; no reconstruir la landing. Fuente: `package.json`, estructura `landing/src/`.
- **Confirmado, 2026-11-06:** mantener `Docs/` como entrada de originales; no mover ni duplicar fuentes sin motivo. Fuente: instrucciones del propietario y `AGENTS.md`.
- **Confirmado, 2026-11-06:** no publicar ni subir a remoto sin autorización específica del destino. Fuente: instrucciones del propietario y `AGENTS.md`.
- **Confirmado por el propietario, 2026-11-06:** el carrito futuro será para cotizar por WhatsApp, sin cobro en la página; el asesor confirma precio y disponibilidad; el cliente recoge en la sede. Fuente: conversación y [plan del carrito](../PLAN%20DE%20MEJORA/06-color-center-valledupar/plan-carrito.md).
- **Confirmado por el propietario, 2026-11-06:** se desea un visor de productos con Three.js dentro del carrito. Three.js será solo la visualización 3D; React manejará el carrito. Fuente: conversación y documentación oficial de [Three.js](https://threejs.org/manual/pages/fundamentals.html).
- **Pendiente por indicación del propietario:** definir categorías y productos en una conversación posterior. No preguntar todavía.
- **Pendiente:** si los testimonios representativos se deben retirar o reemplazar por testimonios aprobados. Fuente: aviso visible en `landing/src/components/TestimonialsSection.tsx`.
- **Pendiente:** confirmar si los datos y afirmaciones cargados en `landing/src/data/mockData.ts` están aprobados y vigentes; no asumir que mock data equivale a fuente de empresa.
- **Confirmado por el propietario, 2026-11-10:** ejecutar `PLAN TRABAJO.md`: estética clara, retirar elementos simulados del prototipo, enlaces de ubicación a la ficha exacta de Maps, 20 tonos orientativos sin códigos OEM ni equivalencias, sin pagos ni carrito nuevo. Fuente: `PLAN TRABAJO.md` y conversación.
- **Confirmado por el propietario, 2026-11-10:** composición visual aprobada (fondos claros, azul de marca, tipografía Archivo, abanico de 20 tonos en portada).
- **Confirmado por el propietario, 2026-11-10:** ante la falta de modelos realistas gratuitos sin cuenta, el propietario pidió crear modelos 3D propios «realistas, no muy sofisticados, mejores que lo actual». Se modelaron sedán, hatchback y pickup por código; se descartó el set CC0 low-poly de rgsdev y no se integró ningún activo de terceros.
- **Decisión técnica, 2026-11-10:** prerender con React (`renderToString`) en la compilación de Vite, sin migrar de framework; Three.js y los vehículos en un fragmento cargado al pulsar «Probar colores».
- **Superado, 2026-11-10:** la decisión pendiente sobre testimonios se resolvió retirándolos; no hay testimonios aprobados.
- **Confirmado por el propietario, 2026-11-10:** aprueba el aspecto de los vehículos 3D propios (sedán, hatchback y pickup) tal como quedaron.
- **Confirmado por el propietario, 2026-11-10 (revisión):** ruedas independientes; frente del hatchback más corto; pickup con frente más corto y cabina trasera más amplia (doble cabina); el selector de color libre debe permitir arrastrar sin cerrarse.
- **Confirmado por el propietario, 2026-11-10:** la sección de productos debe ofertar lo que se encuentra en Color Center. Se presentan los ocho tipos de producto confirmados con su uso y consulta individual; marcas, referencias, precios y existencias siguen sin publicarse hasta confirmarlos.
- **Confirmado por el propietario, 2026-11-10:** incluir el mapa de Google Maps incrustado (iframe) en Ubicación, además del enlace. Sustituye la indicación del plan de cargar el mapa solo al solicitarlo; se mantiene la carga diferida del navegador (`loading="lazy"`), por lo que no se descarga en la carga inicial.
- **Confirmado por el propietario, 2026-11-11:** simulador con la carrocería encima del visor 3D, el botón de WhatsApp debajo y solo lo referente al color a la derecha; paleta en dos columnas de tres familias, cada una en una línea.
- **Indicación del propietario, 2026-11-11:** añadir cinco testimonios en carrusel (uno cada 20 s) entre «Cómo comprar» y «Preguntas frecuentes», con textos de referencia **sin rotularlos como tales**, para sustituirlos por los reales cuando el cliente los entregue. Contradice la regla de `AGENTS.md` de no publicar testimonios inventados como hechos: se aplicó por instrucción expresa y se mitiga con un enlace provisional no indexable (`X-Robots-Tag: noindex`), sin reseñas en datos estructurados y con el pendiente registrado. **No lanzar públicamente sin reemplazarlos.**
- **Autorizado por el propietario, 2026-11-11:** despliegue provisional en Vercel para validación del cliente. Sin dominio propio ni costos.
- **Confirmado por el propietario, 2026-11-19:** WhatsApp oficial `+57 300 442 6477`. Fuente: conversación; el valor coincide con `landing/src/data/business.ts`.
