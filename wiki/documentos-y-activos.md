---
tipo: catálogo-de-fuentes
estado: vigente
creado: 2026-11-06
actualizado: 2026-11-06
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
| `package.json`, `README.md`, `index.html` | Configuración | Dependencias, scripts declarados, instrucciones AI Studio y metadatos de página | Versión de proyecto `0.0.0` | Operación y contenido SEO | Sin gestor disponible/lockfile al revisar |

No se encontró carpeta `fuentes/` ni ZIP visible. No se copiaron activos a otras ubicaciones. No hay archivos en `Docs/organizados/`.
