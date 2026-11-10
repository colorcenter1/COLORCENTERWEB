---
tipo: catálogo-de-fuentes
estado: vigente
creado: 2026-11-06
actualizado: 2026-11-10
tags: [fuentes, activos, docs]
fuentes: [../AGENTS.md, ../src/data/mockData.ts, ../index.html]
---
# Documentos y activos

`Docs/` es la ubicación de originales empresariales. Al revisar, estaba vacía; se puede depositar allí información empresarial, logos, fotos, catálogos y referencias. Los originales se conservan intactos.

## Originales de empresa
| Ruta | Categoría | Descripción / información | Fecha o versión | Uso posible | Pendiente |
|---|---|---|---|---|---|
| `Docs/` (sin archivos al revisar) | Fuentes empresariales | Carpeta disponible, sin documentos inventariables | N/A | Fuente de verdad para validar negocio y activos | Añadir originales cuando estén disponibles |

## Fuentes del proyecto y activos existentes
| Ruta | Categoría | Descripción / información | Fecha o versión | Uso posible | Pendiente |
|---|---|---|---|---|---|
| `src/data/mockData.ts` | Oferta, contacto, referencias | Datos de contacto, catálogo, horarios, imágenes externas y testimonios; contenido codificado, no documento empresarial aprobado | N/A | Contenido actual de la landing | Validar datos y afirmaciones técnicas/promocionales |
| `src/components/TestimonialsSection.tsx` | Referencias | La interfaz los llama “testimonios representativos”; no hay fuente de clientes adjunta | N/A | Ninguno hasta tener testimonios autorizados | No presentarlos como testimonios reales; obtener aprobación o retirar sección |
| `public/assets/aistudio/image_dab9c635.png` | Identidad visual | PNG inspeccionado: emblema azul/cian con automóvil estilizado sobre fondo oscuro, sin texto legible | N/A | Favicon y logo actual | Confirmar origen y autorización |
| `public/assets/aistudio/Image_1_d4084f42.png` | Activo visual | Imagen PNG en recursos AI Studio; no inspeccionada visualmente | N/A | Por determinar | Revisar visualmente antes de usar |
| `public/assets/aistudio/Image_2_3ff83ca7.html`, `Image_4_3fd16fe4.html`, `Image_5_11e772d5.markdown` | Activos/fuentes AI Studio | Archivos HTML/Markdown asociados a imagen; contenido no revisado aún | N/A | Por determinar | Abrir y catalogar antes de reutilizar |
| `.aistudio/artifacts/brain/f02fa02d-69ed-42e8-9692-ca268544e05f/.tempmediaStorage/` | Temporales AI Studio | Contiene cuatro PNG temporales; no inspeccionados ni seleccionados para publicación | N/A | No usar hasta identificar | Confirmar correspondencia con archivos de origen si se requiere |
| `package.json`, `README.md`, `index.html` | Configuración | Dependencias, scripts declarados, instrucciones AI Studio y metadatos de página | Versión de proyecto `0.0.0` | Operación y contenido SEO | npm disponible; aún sin lockfile ni `node_modules` |
| `PLAN DE MEJORA/06-color-center-valledupar/plan-mejoras.md` | Plan de proyecto | Secuencia de 11 pasos para continuar sobre el prototipo y pedir aprobación antes de cambiar la estructura | Recibido 2026-11-10 | Seguimiento de los pasos 0–11 | Paso 2 pendiente de aprobación; pasos visuales esperan material gráfico |
| `PLAN DE MEJORA/06-color-center-valledupar/instalar-skills.md` | Guía de herramientas | Guía para instalar dos skills desde ZIP y tres skills de diseño desde repositorios oficiales | Recibido 2026-11-10 | Preparación de pasos SEO, datos, diseño y móvil | Skills externas de diseño aún no instaladas |
| `PLAN DE MEJORA/06-color-center-valledupar/seo-organico-ia.zip` → `.agents/skills/seo-organico-ia/` | Skill / SEO | Fuente ZIP preservada; copia instalada en el proyecto con SKILL.md, referencias y script de inspección estática | ZIP recibido 2026-11-10; skill revisada 2026-11-10 | Paso 10 SEO | Referencias detalladas pendientes de consulta; script no ejecutado |
| `PLAN DE MEJORA/06-color-center-valledupar/tratamiento-datos-landing.zip` → `.agents/skills/tratamiento-datos-landing/` | Skill / datos personales | Fuente ZIP preservada; copia instalada con SKILL.md y cuatro referencias | ZIP recibido 2026-11-10; skill revisada 2026-11-10 | Paso 9, tras inventariar datos y completar datos empresariales | No redactar/publicar política sin la información exigida y revisión correspondiente |
| `.agents/skills/seo-organico-ia/scripts/inspeccionar_html.py` | Script de apoyo | Inspección estática local de metadatos HTML y archivos sitemap/robots; no hace red ni escribe | Copiado del ZIP 2026-11-10; contenido revisado | Paso 10 SEO si se solicita | No ejecutado; no acredita indexación ni vista DOM renderizada |
| `PLAN DE MEJORA/06-color-center-valledupar/entrega-color-center.zip` | Paquete fuente | Archivo original que contiene plan, guía y los dos ZIP de skills. No se extrajo ni modificó | Recibido 2026-11-10 | Procedencia del material del plan | Conservar intacto |

No se encontró carpeta `fuentes/` ni ZIP original de Google AI Studio en la raíz. Sí se recibieron los ZIP del plan en `PLAN DE MEJORA/06-color-center-valledupar/`. No se copiaron gráficos a `public/` ni originales a `Docs/organizados/`; las únicas copias nuevas están en `.agents/skills/`, vinculadas arriba a sus ZIP de origen.
