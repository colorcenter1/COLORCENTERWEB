---
tipo: catálogo-de-fuentes
estado: vigente
creado: 2026-11-06
actualizado: 2026-11-10
tags: [fuentes, activos, docs]
fuentes: [../AGENTS.md, ../landing/src/data/mockData.ts, ../landing/index.html]
---
# Documentos y activos

`Docs/` es la ubicación de originales empresariales. La revisión recursiva del 2026-11-10 encontró `Docs/Logo.jpg`; se puede depositar allí información empresarial, fotos, catálogos y referencias. Los originales se conservan intactos.

## Originales de empresa
| Ruta | Categoría | Descripción / información | Fecha o versión | Uso posible | Pendiente |
|---|---|---|---|---|---|
| `Docs/Logo.jpg` | Identidad visual | JPEG 150 × 150 inspeccionado: emblema cian y automóvil blanco/amarillo sobre azul; procedencia: archivo añadido por el propietario a Docs, autoría/licencia sin confirmar | Detectado 2026-11-10; sin versión declarada | Referencia empresarial; original intacto, no copiado a la web | Confirmar aprobación y aportar versión de mayor resolución si se reemplaza el logo actual |

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

No se encontró carpeta `fuentes/` ni ZIP original de Google AI Studio en la raíz. Los ZIP y la guía de instalación antes registrados ya no están en su ruta anterior: la revisión actual solo encuentra `plan-carrito.md` y `plan-mejoras.md` allí. Las filas anteriores conservan su procedencia histórica; ubicación actual de ZIP/guía pendiente. No se copiaron gráficos a `landing/public/` ni originales a `Docs/organizados/`; las únicas copias nuevas están en `.agents/skills/`, vinculadas arriba a sus ZIP de origen.

## Revisión de reorganización, 2026-11-10
- Todas las rutas de código y activos web pasan a landing/; los originales empresariales siguen en Docs/.
- La imagen externa de Masillas Poliéster (photo-1486006920555-c77dce18193b, Unsplash) responde HTTP 404. Pendiente de sustituto autorizado; no se cambió el catálogo.
