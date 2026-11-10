---
tipo: decisiones
estado: vigente
creado: 2026-11-06
actualizado: 2026-11-10
tags: [decisiones]
fuentes: [../AGENTS.md, ../landing/package.json, ../landing/src/components/TestimonialsSection.tsx]
---
# Decisiones

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
