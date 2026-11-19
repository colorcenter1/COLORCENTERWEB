import { useState } from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { BRAND_CATALOGS } from '../../data/brandCatalogs';
import { productInquiry, whatsappUrl } from '../../lib/whatsapp';

export function BrandCatalog() {
  const [brandId, setBrandId] = useState(BRAND_CATALOGS[0].id);
  const brand = BRAND_CATALOGS.find((item) => item.id === brandId) ?? BRAND_CATALOGS[0];

  return (
    <section className="section brand-catalog" aria-labelledby="brand-catalog-title">
      <div className="wrap">
        <div className="section-head">
          <h2 id="brand-catalog-title">Catálogos por marca</h2>
          <p className="lede">Explora las líneas que aparecen en fuentes oficiales. Un asesor confirma qué referencias, precios y existencias están disponibles en Color Center.</p>
        </div>
        <figure className="brand-catalog-photo">
          <img src="/catalog/proceso-pintura-ilustrativo.jpg" alt="Aplicación ilustrativa de pintura automotriz con pistola" width="1200" height="1800" loading="lazy" decoding="async" />
          <figcaption>Foto ilustrativa de proceso, no corresponde a un producto de las marcas listadas. Gustavo Fring / Pexels.</figcaption>
        </figure>
        <div className="brand-tabs" role="group" aria-label="Selecciona una marca">
          {BRAND_CATALOGS.map((item) => (
            <button key={item.id} type="button" aria-pressed={brand.id === item.id} className="brand-tab" onClick={() => setBrandId(item.id)}>{item.name}</button>
          ))}
          <span className="brand-tab brand-tab-pending" aria-disabled="true" title="Pendiente de confirmar la marca">Autolac · por confirmar</span>
        </div>
        <p className="brand-region-note">{brand.regionNote}</p>
        <div className="brand-catalog-grid">
          {brand.categories.map((category) => (
            <article className="brand-category" key={category.name}>
              <h3>{category.name}</h3>
              {category.products.length ? (
                <ul>{category.products.map((product) => <li key={product}>{product}</li>)}</ul>
              ) : <p>La fuente consultada no muestra una línea de esta categoría.</p>}
              <a className="brand-source" href={category.source} target="_blank" rel="noopener noreferrer">Ver fuente oficial <ArrowUpRight size={15} aria-hidden="true" /></a>
              <a className="brand-inquiry" href={whatsappUrl(productInquiry(`${brand.name}: ${category.name}`))} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} aria-hidden="true" /> Consultar esta categoría</a>
            </article>
          ))}
        </div>
        <p className="brand-catalog-disclaimer">Las fotos y nombres de envases de fabricante no se reutilizan aquí porque sus derechos no están abiertos. Las listas son informativas; no son confirmación de distribución, inventario ni compatibilidad local.</p>
      </div>
    </section>
  );
}
