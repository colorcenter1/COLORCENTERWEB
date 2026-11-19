---
tipo: catálogo-de-fuentes
estado: vigente
creado: 2026-11-06
actualizado: 2026-11-19
tags: [fuentes, activos, docs]
fuentes: [../AGENTS.md, ../landing/src/data/mockData.ts, ../landing/index.html]
---
# Documentos y activos

`Docs/` es la ubicación de originales empresariales. En la revisión del 2026-11-19 se encontraron 14 archivos gráficos. Los originales se conservan intactos y están excluidos de Git. Se puede seguir depositando allí información, fotos, catálogos y referencias.

## Originales de empresa
| Ruta | Categoría | Descripción / información | Fecha o versión | Uso posible | Pendiente |
|---|---|---|---|---|---|
| `Docs/Logo.jpg` | Identidad visual | JPEG 150 × 150 inspeccionado en la revisión histórica; no está presente en la carpeta actual. Se conserva el registro de procedencia anterior | Detectado 2026-11-10; ausente en el inventario 2026-11-19 | Referencia histórica; no copiado a la web | Si se requiere, volver a colocar el original; no reemplazar el logo actual automáticamente |
| `Docs/logo/CARTEL-COLORCENTER.jpg` | Identidad visual / referencia de color | Cartel panorámico con logo Color Center y marcas de proveedores. Inspección visual: azul marino, blanco, amarillo y azules vivos. No es un logo limpio para encabezado | Añadido a Docs; sin versión declarada | Referencia de paleta; colores muestreados `#001250`, `#FFFFFF`, `#FFFF01`, `#0057A7`, `#0051E0`, `#FEC909`; dos acentos CSS se aproximaron a `#001250` y `#FEC909` | Confirmar paleta oficial y autorización de logos de proveedores antes de publicarlos |
| `Docs/disolvente/s.w.jpg` | Foto de producto | Imagen inspeccionada de tres envases de productos para pintura automotriz sobre fondo claro (901 × 857) | Añadido a Docs; sin fecha/version declarada | Copia seleccionada en `landing/public/products/productos-de-pintura.jpg`; usada en la categoría destacada del catálogo | Confirmar que los envases/productos siguen vigentes y que la foto puede mostrarse públicamente; precio/disponibilidad se consultan por WhatsApp |
| `Docs/disolvente/thinner_sherwin_williams_454_para_poliester_poliuretano_5l_1169_1_59665465c92574ab9f9539aaf14f997a.webp` | Foto de producto | Imagen inspeccionada de un envase de thinner 454; nombre de archivo menciona marca y capacidad, no se toma como confirmación comercial | Añadido a Docs; metadatos de archivo muestran 2025-06-17 | Referencia visual alternativa, no publicada | Confirmar vigencia, marca, capacidad, autorización y uso antes de agregar al catálogo |
| `Docs/mokap/351.jpg`, `Docs/mokap/dsfsf.jpg`, `Docs/mokap/fffff.jpg` | Identidad / mockups | Tres montajes visuales de tazas con variantes del logo ColorCenter; inspeccionados visualmente | Añadidos a Docs; sin versión declarada | No publicados; no se consideran fotos de productos automotrices | Confirmar si representan merchandising real y si se desea mostrarlo |
| `Docs/mokap/57893.jpg`, `Docs/mokap/57893.png`, `Docs/mokap/dg.jpg`, `Docs/mokap/dg.png`, `Docs/mokap/gdf.jpg`, `Docs/mokap/gdf.png`, `Docs/mokap/sddfgvdf.jpg`, `Docs/mokap/sddfgvdf.png` | Identidad / mockups | Ocho montajes visuales de camisetas negras con variantes del logo ColorCenter; inspeccionados visualmente | Añadidos a Docs; sin versión declarada | No publicados; no se consideran fotos de equipo o instalaciones | Confirmar si representan merchandising real y si se desea mostrarlo |

## Fuentes del proyecto y activos existentes
| Ruta | Categoría | Descripción / información | Fecha o versión | Uso posible | Pendiente |
|---|---|---|---|---|---|
| `landing/src/data/mockData.ts` | Oferta, contacto, referencias | Datos de contacto, catálogo, horarios, imágenes externas y testimonios; contenido codificado, no documento empresarial aprobado | N/A | Contenido actual de la landing | Validar datos y afirmaciones técnicas/promocionales |
| `landing/src/components/TestimonialsSection.tsx` | Referencias | La interfaz los llama “testimonios representativos”; no hay fuente de clientes adjunta | N/A | Ninguno hasta tener testimonios autorizados | No presentarlos como testimonios reales; obtener aprobación o retirar sección |
| `landing/public/assets/aistudio/image_dab9c635.png` | Identidad visual | PNG inspeccionado: emblema azul/cian con automóvil estilizado sobre fondo oscuro, sin texto legible | N/A | Favicon y logo actual | Confirmar origen y autorización |
| `landing/public/assets/aistudio/Image_1_d4084f42.png` | Activo visual | Imagen PNG en recursos AI Studio; no inspeccionada visualmente | N/A | Por determinar | Revisar visualmente antes de usar |
| `landing/public/assets/aistudio/Image_2_3ff83ca7.html`, `Image_4_3fd16fe4.html`, `Image_5_11e772d5.markdown` | Activos/fuentes AI Studio | Archivos HTML/Markdown asociados a imagen; contenido no revisado aún | N/A | Por determinar | Abrir y catalogar antes de reutilizar |
| `.aistudio/artifacts/brain/f02fa02d-69ed-42e8-9692-ca268544e05f/.tempmediaStorage/` | Temporales AI Studio | Contiene cuatro PNG temporales; no inspeccionados ni seleccionados para publicación | N/A | No usar hasta identificar | Confirmar correspondencia con archivos de origen si se requiere |
| `landing/package.json`, `landing/package-lock.json`, `landing/README.md`, `landing/index.html` | Configuración | Dependencias, scripts declarados, instrucciones AI Studio y metadatos de página | Versión de proyecto `0.0.0` | Operación y contenido SEO | Dependencias instaladas; lint y build correctos; vista previa verificada el 2026-11-10 |
| `PLAN DE MEJORA/06-color-center-valledupar/plan-mejoras.md` | Plan de proyecto | Secuencia de 11 pasos para continuar sobre el prototipo y pedir aprobación antes de cambiar la estructura | Recibido 2026-11-10 | Seguimiento de los pasos 0–11 | Paso 2 pendiente de aprobación; pasos visuales esperan material gráfico |
| `PLAN DE MEJORA/06-color-center-valledupar/instalar-skills.md` | Guía de herramientas | Guía para instalar dos skills desde ZIP y tres skills de diseño desde repositorios oficiales | Recibido 2026-11-10 | Preparación de pasos SEO, datos, diseño y móvil | Skills externas de diseño aún no instaladas |
| `PLAN DE MEJORA/06-color-center-valledupar/seo-organico-ia.zip` → `.agents/skills/seo-organico-ia/` | Skill / SEO | Fuente ZIP preservada; copia instalada en el proyecto con SKILL.md, referencias y script de inspección estática | ZIP recibido 2026-11-10; skill revisada 2026-11-10 | Paso 10 SEO | Referencias detalladas pendientes de consulta; script no ejecutado |
| `PLAN DE MEJORA/06-color-center-valledupar/tratamiento-datos-landing.zip` → `.agents/skills/tratamiento-datos-landing/` | Skill / datos personales | Fuente ZIP preservada; copia instalada con SKILL.md y cuatro referencias | ZIP recibido 2026-11-10; skill revisada 2026-11-10 | Paso 9, tras inventariar datos y completar datos empresariales | No redactar/publicar política sin la información exigida y revisión correspondiente |
| `.agents/skills/seo-organico-ia/scripts/inspeccionar_html.py` | Script de apoyo | Inspección estática local de metadatos HTML y archivos sitemap/robots; no hace red ni escribe | Copiado del ZIP 2026-11-10; contenido revisado | Paso 10 SEO si se solicita | No ejecutado; no acredita indexación ni vista DOM renderizada |
| `PLAN DE MEJORA/06-color-center-valledupar/entrega-color-center.zip` | Paquete fuente | Archivo original que contiene plan, guía y los dos ZIP de skills. No se extrajo ni modificó | Recibido 2026-11-10 | Procedencia del material del plan | Conservar intacto |

No se encontró carpeta `fuentes/` ni ZIP original de Google AI Studio en la raíz. En la revisión actual, los documentos del plan y los ZIP de skills están presentes en `PLAN DE MEJORA/06-color-center-valledupar/`; algunas filas históricas describen su ubicación anterior. No se copiaron originales a `Docs/organizados/`. La única copia técnica nueva es la foto seleccionada indicada arriba; mantiene trazabilidad a su original.

## Revisión de reorganización, 2026-11-10
- Todas las rutas de código y activos web pasan a landing/; los originales empresariales siguen en Docs/.
- La imagen externa de Masillas Poliéster (photo-1486006920555-c77dce18193b, Unsplash) responde HTTP 404. Pendiente de sustituto autorizado; no se cambió el catálogo.

## Rediseño 2026-11-10: skills, activos y modelos
| Ruta | Categoría | Descripción | Fecha o versión | Uso | Pendiente |
|---|---|---|---|---|---|
| `.agents/skills/emil-design-eng/`, `.agents/skills/mobile-native/` | Skills de diseño | Copias completas desde https://github.com/emilkowalski/skills, licencia MIT (`LICENSE.upstream`) | Commit `715c1807e08c497cfd1dc4feb450a2a3300ef2a9` (2026-11-09) | Criterios de animación, interacción y accesibilidad | — |
| `.agents/skills/impeccable/` | Skill de diseño | Copia completa desde https://github.com/pbakaus/impeccable (`.agents/skills/impeccable`), Apache 2.0 (`LICENSE.upstream`, `NOTICE.upstream.md`). Skill v4.8.2, scripts 0.1.22 | Commit `f2baa414a87d9acf1e21ccf776bfaec0262ad6df` (2026-11-10) | Referencias leídas directamente | No se ejecutó su lanzador (descarga un binario) ni se activaron sus hooks |
| `landing/public/brand/logo-color-center.png` | Identidad visual | Logo existente del proyecto (antes `public/assets/aistudio/image_dab9c635.png`), 150 × 150 | Movido 2026-11-10 | Logo y favicon | Versión de mayor resolución |
| `landing/public/fonts/archivo-latin-wdth.woff2` | Tipografía | Archivo variable (subconjunto latino, ancho y peso), autoalojada desde `@fontsource-variable/archivo`; licencia SIL OFL en `archivo-OFL.txt` | 5.3.0 | Tipografía de la web | — |
| `landing/referencias-aistudio/` | Referencias del prototipo | Captura de Stitch, HTML y DESIGN.md con colores de marca (movidos fuera de `public/` para no publicarlos) | Movido 2026-11-10 | Referencia de colores | — |
| `landing/src/components/simulator/carSpecs.ts`, `carFactory.ts` | Modelos 3D propios | Sedán, hatchback y pickup genéricos modelados por código para Color Center; sin marcas ni activos de terceros; no hay archivo de modelo (se generan en el navegador) | 2026-11-10 | Simulador | Aprobados por el propietario el 2026-11-10 |

**Modelos de terceros evaluados y no integrados (2026-11-10):** «Free Low Poly Vehicles Pack» de rgsdev (OpenGameArt, CC0, ~55 KB y ~1.500 triángulos por vehículo; estilo low-poly, descartado por el propietario); Kenney Car Kit (CC0, sin material de carrocería separado); paquetes CC BY de Sketchfab («Generic passenger car pack» de comrade1280; serie de DanielZhabotinsky), que requieren cuenta y no se descargaron; varios descartados por parecido con modelos de marca. Las copias quedaron solo en el directorio temporal de la sesión.
