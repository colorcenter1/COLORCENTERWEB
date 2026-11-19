/** Contenido cotejado en catálogos oficiales; el país/disponibilidad local no se infieren. */
export interface BrandCatalogCategory {
  name: string;
  summary: string;
  products: string[];
  source: string;
}

export interface BrandCatalog {
  id: string;
  name: string;
  regionNote: string;
  categories: BrandCatalogCategory[];
}

export const BRAND_CATALOGS: BrandCatalog[] = [
  {
    id: 'sherwin-williams',
    name: 'Sherwin-Williams',
    regionNote: 'Catálogo automotriz oficial de Brasil. Referencias y disponibilidad en Valledupar por confirmar.',
    categories: [
      { name: 'Pinturas', summary: 'Sistemas de color y acabado para repintado automotriz; la familia define la base y el tipo de acabado.', products: ['Base poliéster', 'Base poliuretano', 'Base agua', 'Esmalte sintético', 'Epóxico', 'Laca nitrocelulosa'], source: 'https://sherwin-auto.com.br/en/produtos/' },
      { name: 'Barnices', summary: 'Capas transparentes de terminación, con opciones de alto desempeño, poliuretano y monocomponente.', products: ['Barniz de alto desempeño', 'Barniz poliuretano', 'Barniz monocomponente'], source: 'https://sherwin-auto.com.br/en/produtos/' },
      { name: 'Masillas', summary: 'Productos de relleno y corrección para preparar irregularidades de la superficie.', products: ['Masa poliéster', 'Masa rápida', 'Masa sintética', 'Adhesivo plástico', 'Masa para pequeñas correcciones'], source: 'https://sherwin-auto.com.br/en/produtos/' },
      { name: 'Primers', summary: 'Fondos de preparación que sirven de base para las capas de acabado, según el sistema indicado.', products: ['Primer poliuretano', 'Primer 1K', 'Primer epóxico', 'Primer de línea rápida'], source: 'https://sherwin-auto.com.br/en/produtos/' },
      { name: 'Lijas y abrasivos', summary: 'Abrasivos para trabajos de preparación; la fuente consultada no indica granos ni referencias.', products: ['Abrasivos (la ficha pública no especifica granos ni referencias)'], source: 'https://sherwin-auto.com.br/en/produto/equipment-and-accessories/equipment-and-accessories-preparation-and-painting/' },
      { name: 'Disolventes', summary: 'Diluentes y auxiliares relacionados con la preparación o aplicación; el producto exacto depende de la ficha técnica.', products: ['Diluentes y auxiliares (línea/código por confirmar)'], source: 'https://sherwin-auto.com.br/en/produtos/' },
      { name: 'Catalizadores, endurecedores y aditivos', summary: 'Endurecedores asociados a sistemas de poliuretano, epóxico, primers y barnices; la proporción depende de cada ficha.', products: ['Endurecedores de poliuretano y epóxicos', 'Endurecedores para primers y barnices'], source: 'https://sherwin-auto.com.br/en/produtos/' },
      { name: 'Auxiliares y limpiadores', summary: 'Diluentes y auxiliares de proceso; la página consultada no detalla limpiadores por referencia.', products: ['Diluentes y auxiliares (la página no detalla limpiadores por referencia)'], source: 'https://sherwin-auto.com.br/en/produtos/' },
      { name: 'Pulimento y accesorios de pulido', summary: 'Productos y herramientas para la etapa de pulido del acabado.', products: ['Compuesto para pulir', 'Pulidora', 'Boina de pulido'], source: 'https://sherwin-auto.com.br/en/produtos/' },
      { name: 'Aerosoles y herramientas', summary: 'Spray de color, pistolas y herramientas para aplicación y preparación del trabajo.', products: ['Spray Color', 'Pistolas Devilbiss, BYP y Fastline', 'Herramienta de color y accesorios de preparación'], source: 'https://sherwin-auto.com.br/en/produtos/' },
    ],
  },
  {
    id: 'baslac',
    name: 'baslac',
    regionNote: 'Información oficial EMEA. Las referencias regionales pueden cambiar; confirmar producto y existencia con el asesor.',
    categories: [
      { name: 'Pinturas', summary: 'Bases para color y capas de acabado; baslac 45 es base agua, 35 es base de color y 30 es topcoat 2K.', products: ['Basecoat 45 (base agua)', 'Basecoat 35', 'Topcoat 30'], source: 'https://www.baslac.com/en-emea/baslac-base-and-topcoats' },
      { name: 'Barnices', summary: 'Capas transparentes para el acabado; las líneas publicadas incluyen opciones para reparaciones pequeñas y universales.', products: ['40-10 2K Panel Clear', '40-40 2K Universal Clear', '40-440 2K Clear VOC', '40-450 HS Universal Clear VOC', '40-510 Ambient Clear VOC'], source: 'https://www.baslac.com/en-emea/baslac-clearcoats-0' },
      { name: 'Masillas', summary: 'Material de relleno para reparar y alisar superficies metálicas antes del acabado.', products: ['12-20 Universal Bodyfiller'], source: 'https://www.baslac.com/en-emea/baslac-putty' },
      { name: 'Primers', summary: 'Fondos de preparación y relleno para servir de base a las capas de color y acabado.', products: ['20-22 2K Primerfiller', '20-24 / 20-34 / 20-94 2K Primerfiller'], source: 'https://www.baslac.com/en-emea/technical-data-sheets' },
      { name: 'Lijas y abrasivos', summary: 'La fuente oficial consultada no muestra productos de esta familia.', products: [], source: 'https://www.baslac.com/en-emea/products-systems' },
      { name: 'Disolventes', summary: 'Reductores para ajustar productos del sistema según temperatura y proceso; revisar ficha técnica del producto.', products: ['Reductores 60-05, 60-10, 60-20, 60-30, 60-40 y 65-10'], source: 'https://www.baslac.com/en-emea/baslac-additives' },
      { name: 'Catalizadores, endurecedores y aditivos', summary: 'Endurecedores y aditivos para ajustar el proceso, el secado o la aplicación según el sistema.', products: ['50-05, 50-10, 50-15, 50-20 y 50-30 Hardeners', '57-10 Additive Washprimer', '80-10 Additive Flex', '80-20 Additive Mat'], source: 'https://www.baslac.com/en-emea/baslac-additives' },
      { name: 'Auxiliares y limpiadores', summary: 'Limpiadores para preparar superficies y reductores para el proceso de aplicación.', products: ['70-10 Silicone Remover', '70-20 Plastic Cleaner', '70-45 Cleaner Basecoat 45'], source: 'https://www.baslac.com/en-emea/baslac-additives' },
      { name: 'Pulimento y accesorios de pulido', summary: 'La fuente oficial consultada no muestra una línea de pulimento o accesorios.', products: [], source: 'https://www.baslac.com/en-emea/products-systems' },
      { name: 'Aerosoles y herramientas', summary: 'Herramientas digitales de búsqueda y selección de color; no se listan pistolas ni aerosoles en la fuente consultada.', products: ['e-finder star', 'Color Finder', 'Tinting Chart and Mixing Machine'], source: 'https://www.baslac.com/en-emea/products-systems' },
    ],
  },
  {
    id: 'autolack',
    name: 'Industrias Autolack S.A.S.',
    regionNote: 'Fabricante colombiano. Este resumen se basa en las líneas y productos visibles en su sitio oficial; Color Center confirma disponibilidad local por WhatsApp.',
    categories: [
      { name: 'Pinturas', summary: 'Líneas de color y acabado automotriz; el fabricante publica Poliéster Core Colors, Azul Especial y Poliéster Premium.', products: ['Poliéster Core Colors (base de color)', 'Azul Especial (línea Core Colors)', 'Poliéster Premium'], source: 'https://autolack.com.co/' },
      { name: 'Barnices', summary: 'Barniz HS para acabado transparente; la página de lanzamiento menciona secado rápido y brillo.', products: ['Barniz HS'], source: 'https://autolack.com.co/' },
      { name: 'Masillas', summary: 'La línea Auxiliares incluye masillas; el índice público no detalla referencias ni usos específicos.', products: ['Masillas (línea Auxiliares; referencias no publicadas en el índice)'], source: 'https://autolack.com.co/productos/productos.html' },
      { name: 'Primers', summary: 'La fuente oficial consultada no muestra una línea de primers con referencias.', products: [], source: 'https://autolack.com.co/productos/productos.html' },
      { name: 'Lijas y abrasivos', summary: 'La fuente oficial consultada no muestra una línea de lijas o abrasivos.', products: [], source: 'https://autolack.com.co/productos/productos.html' },
      { name: 'Disolventes', summary: 'La línea Auxiliares incluye solventes; el índice público no especifica referencias.', products: ['Solventes (línea Auxiliares; referencias no publicadas en el índice)'], source: 'https://autolack.com.co/productos/productos.html' },
      { name: 'Catalizadores, endurecedores y aditivos', summary: 'La línea Auxiliares incluye aditivos; no se encontraron referencias públicas de endurecedores/catalizadores.', products: ['Aditivos (línea Auxiliares; referencias no publicadas en el índice)'], source: 'https://autolack.com.co/productos/productos.html' },
      { name: 'Auxiliares y limpiadores', summary: 'Auxiliares como solventes y aditivos para procesos de repintado; no se encontraron limpiadores por referencia.', products: ['Solventes y aditivos (línea Auxiliares)'], source: 'https://autolack.com.co/productos/productos.html' },
      { name: 'Pulimento y accesorios de pulido', summary: 'La fuente oficial consultada no muestra una línea de pulimento o accesorios.', products: [], source: 'https://autolack.com.co/productos/productos.html' },
      { name: 'Aerosoles y herramientas', summary: 'La fuente oficial consultada no muestra aerosoles, pistolas o herramientas de aplicación.', products: [], source: 'https://autolack.com.co/productos/productos.html' },
    ],
  },
];
