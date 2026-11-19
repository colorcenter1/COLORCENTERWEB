/** Contenido cotejado en catálogos oficiales; el país/disponibilidad local no se infieren. */
export interface BrandCatalogCategory {
  name: string;
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
      { name: 'Pinturas', products: ['Base poliéster', 'Base poliuretano', 'Base agua', 'Esmalte sintético', 'Epóxico', 'Laca nitrocelulosa'], source: 'https://sherwin-auto.com.br/en/produtos/' },
      { name: 'Barnices', products: ['Barniz de alto desempeño', 'Barniz poliuretano', 'Barniz monocomponente'], source: 'https://sherwin-auto.com.br/en/produtos/' },
      { name: 'Masillas', products: ['Masa poliéster', 'Masa rápida', 'Masa sintética', 'Adhesivo plástico', 'Masa para pequeñas correcciones'], source: 'https://sherwin-auto.com.br/en/produtos/' },
      { name: 'Primers', products: ['Primer poliuretano', 'Primer 1K', 'Primer epóxico', 'Primer de línea rápida'], source: 'https://sherwin-auto.com.br/en/produtos/' },
      { name: 'Lijas y abrasivos', products: ['Abrasivos (la ficha pública no especifica granos ni referencias)'], source: 'https://sherwin-auto.com.br/en/produto/equipment-and-accessories/equipment-and-accessories-preparation-and-painting/' },
      { name: 'Disolventes', products: ['Diluentes y auxiliares (línea/código por confirmar)'], source: 'https://sherwin-auto.com.br/en/produtos/' },
    ],
  },
  {
    id: 'baslac',
    name: 'baslac',
    regionNote: 'Información oficial EMEA. Las referencias regionales pueden cambiar; confirmar producto y existencia con el asesor.',
    categories: [
      { name: 'Pinturas', products: ['Basecoat 45 (base agua)', 'Basecoat 35', 'Topcoat 30'], source: 'https://www.baslac.com/en-emea/baslac-base-and-topcoats' },
      { name: 'Barnices', products: ['40-10 2K Panel Clear', '40-40 2K Universal Clear', '40-440 2K Clear VOC', '40-450 HS Universal Clear VOC', '40-510 Ambient Clear VOC'], source: 'https://www.baslac.com/en-emea/baslac-clearcoats-0' },
      { name: 'Masillas', products: ['12-20 Universal Bodyfiller'], source: 'https://www.baslac.com/en-emea/baslac-putty' },
      { name: 'Primers', products: ['20-22 2K Primerfiller', '20-24 / 20-34 / 20-94 2K Primerfiller'], source: 'https://www.baslac.com/en-emea/technical-data-sheets' },
      { name: 'Lijas y abrasivos', products: [], source: 'https://www.baslac.com/en-emea/products-systems' },
      { name: 'Disolventes', products: ['Reductores / reducers disponibles en documentación técnica; nombres, códigos y región deben confirmarse'], source: 'https://www.baslac.com/en-emea/technical-data-sheets' },
    ],
  },
];
