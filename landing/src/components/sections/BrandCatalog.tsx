import { useState } from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { BRAND_CATALOGS } from '../../data/brandCatalogs';
import { productInquiry, whatsappUrl } from '../../lib/whatsapp';

const CATEGORY_NAMES = BRAND_CATALOGS[0].categories.map(({ name }) => name);

export function BrandCatalog() {
  const [categoryName, setCategoryName] = useState(CATEGORY_NAMES[0]);

  return (
    <section className="section brand-catalog" aria-labelledby="brand-catalog-title">
      <div className="wrap">
        <div className="section-head">
          <h2 id="brand-catalog-title">Compara productos por categoría</h2>
          <p className="lede">
            Elige qué necesitas y revisa qué publica cada marca. Las descripciones resumen la función indicada por el fabricante; un asesor confirma referencias, precio y existencia en Color Center.
          </p>
        </div>
        <figure className="brand-catalog-photo">
          <img src="/catalog/proceso-pintura-ilustrativo.jpg" alt="Aplicación ilustrativa de pintura automotriz con pistola" width="1200" height="1800" loading="lazy" decoding="async" />
          <figcaption>Foto ilustrativa de proceso, no corresponde a un producto de las marcas listadas. Gustavo Fring / Pexels.</figcaption>
        </figure>
        <div className="brand-category-filters" role="group" aria-label="Compara una categoría entre marcas">
          {CATEGORY_NAMES.map((name) => (
            <button key={name} type="button" className="brand-filter" aria-pressed={categoryName === name} onClick={() => setCategoryName(name)}>{name}</button>
          ))}
        </div>
        <h3 className="brand-comparison-title">{categoryName} por marca</h3>
        <div className="brand-catalog-grid">
          {BRAND_CATALOGS.map((brand) => {
            const category = brand.categories.find(({ name }) => name === categoryName);
            const products = category?.products ?? [];
            return (
              <article className={`brand-category${products.length ? '' : ' is-unlisted'}`} key={brand.id}>
                <h3>{brand.name}</h3>
                <p className="brand-market-note">{brand.regionNote}</p>
                <p className="brand-function">{category?.summary ?? 'La fuente consultada no describe esta categoría.'}</p>
                {products.length ? (
                  <ul>{products.map((product) => <li key={product}>{product}</li>)}</ul>
                ) : (
                  <p className="brand-unlisted">La fuente oficial consultada no lista productos de esta categoría.</p>
                )}
                {category && (
                  <a className="brand-source" href={category.source} target="_blank" rel="noopener noreferrer">
                    Ver fuente oficial <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                )}
                <a className="brand-inquiry" href={whatsappUrl(productInquiry(`${brand.name}: ${categoryName}`))} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={16} aria-hidden="true" /> Preguntar por WhatsApp
                </a>
              </article>
            );
          })}
        </div>
        <p className="brand-catalog-disclaimer">Las listas y funciones son informativas y resumen fuentes oficiales regionales; no confirman distribución, inventario ni compatibilidad local. Las fotos y nombres de envases de fabricante no se reutilizan aquí porque sus derechos no están abiertos.</p>
      </div>
    </section>
  );
}
