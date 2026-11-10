---
tipo: estado
estado: vigente
creado: 2026-11-06
actualizado: 2026-11-10
tags: [proyecto, estado]
fuentes: [../landing/package.json, ../landing/package-lock.json, ../landing/README.md, ../landing/src/App.tsx]
---
# Estado del proyecto

- **Confirmado, 2026-11-10:** el propietario trasladó la aplicación a `landing/`. Código en `landing/src/`, activos en `landing/public/`, configuración y scripts en `landing/`. Wiki, `Docs/`, planes y Git permanecen en la raíz. La comparación de hashes con HEAD confirmó que todos los archivos trasladados conservaban su contenido antes de los ajustes de esta revisión.
- **Ejecución comprobada:** Node `v24.18.0`, npm `12.0.2` mediante `npm.cmd`. Dependencias instaladas (179 paquetes) y bloqueo generado en `landing/package-lock.json`. Ejecutar `npm.cmd run dev` desde `landing/`; no desde la raíz.
- **Corrección necesaria:** Vite `8.3.7` rechazó esbuild `^0.25.0`; se actualizó a `^0.28.2`, compatible con su dependencia opcional declarada. Se mantuvo `.gitignore` en la raíz para proteger también los archivos privados/temporales fuera de `landing/`.
- **Compilación:** `npm.cmd run build` finalizó correctamente y generó `landing/dist/`. Vite avisa sobre el uso futuro de `__dirname` en su configuración; actualmente compila y arranca.
- **Tipos:** `npm.cmd run lint` (`tsc --noEmit`) finalizó correctamente.
- **Vista previa:** servidor de desarrollo iniciado en `http://127.0.0.1:3000/`, enlazado solo a la máquina local. Abierto y conservado en el navegador integrado. Página y logo local respondieron HTTP 200. Mantener el proceso activo mientras se previsualiza.
- **Revisión visual y funcional:** escritorio y viewport móvil de 390 × 844; sin desbordamiento horizontal móvil. Probados filtros del catálogo, apertura/cierre de calculadora y selección de todas las piezas, selección de tono en el laboratorio y apertura/navegación del menú móvil. Sin errores/advertencias en los registros de consola capturados. Se revisaron los destinos de enlaces WhatsApp; no se enviaron mensajes ni se probó atención externa.
- **Limitaciones visuales previas:** la imagen externa de Masillas Poliéster devuelve HTTP 404 (`photo-1486006920555-c77dce18193b` en Unsplash); la cabecera presenta solapamientos de marca y controles. Estas referencias/diseño ya estaban en el código antes del traslado. No se sustituyeron imágenes ni se rediseñó la página.
- **Original nuevo inventariado:** `Docs/Logo.jpg`, JPEG de 150 × 150, inspeccionado; emblema cian y automóvil sobre fondo azul. Se conserva intacto y no se incorpora automáticamente a la web. Ver [[documentos-y-activos]].
- **Publicación:** no realizada; no se hizo commit ni push. Git muestra los traslados del propietario como eliminaciones en la raíz y archivos nuevos en `landing/`, todavía sin preparar.
- **Contenido empresarial provisional:** catálogo, contactos, horarios, testimonios y afirmaciones comerciales proceden del prototipo y requieren validación. Las métricas se simulan localmente; no son evidencia de visitas reales.
- **Procedencia pendiente:** no se encontró ZIP original de AI Studio. Las skills locales SEO y datos están en `.agents/skills/`; los ZIP del plan antes inventariados ya no están en su ruta anterior tras la reorganización y no se localizaron en el árbol revisado.
- **Planes vigentes:** carrito para cotización WhatsApp, confirmación manual de precio/stock, recogida en sede y visor Three.js. Catálogo detallado y modelos autorizados pendientes. Paso 1 revisado; Paso 0 parcial por skills externas; propuesta de estructura pendiente de aprobación; no se cambiaron secciones.
- **Siguiente paso:** usar la vista previa local; resolver imagen externa y cabecera como cambios focalizados cuando se aborde la presentación. Mantener pendientes de negocio y del plan en [[pendientes]].
