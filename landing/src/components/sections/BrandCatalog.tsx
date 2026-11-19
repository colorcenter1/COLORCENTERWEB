import { useState } from 'react';
import { ArrowUpRight, MessageCircle, Plus, X } from 'lucide-react';
import { BRAND_CATALOGS } from '../../data/brandCatalogs';
import { productInquiry, whatsappUrl } from '../../lib/whatsapp';

const CATEGORY_NAMES = BRAND_CATALOGS[0].categories.map(({ name }) => name);
const WORK_OPTIONS = [
  { label: 'Preparar o corregir una superficie', categories: ['Masillas', 'Primers', 'Lijas y abrasivos', 'Auxiliares y limpiadores'] },
  { label: 'Aplicar color o acabado', categories: ['Pinturas', 'Barnices', 'Disolventes', 'Catalizadores, endurecedores y aditivos'] },
  { label: 'Pulir o aplicar el producto', categories: ['Pulimento y accesorios de pulido', 'Aerosoles y herramientas'] },
  { label: 'Todavía no estoy seguro', categories: CATEGORY_NAMES },
];
type QuoteItem = { key: string; brand: string; category: string; product: string };

export function BrandCatalog() {
  const [categoryName, setCategoryName] = useState(CATEGORY_NAMES[0]);
  const [brandId, setBrandId] = useState('todas');
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [guideStep, setGuideStep] = useState(0);
  const [workChoice, setWorkChoice] = useState('');
  const [guideCategory, setGuideCategory] = useState('');
  const work = WORK_OPTIONS.find(({ label }) => label === workChoice);
  const guideCategories = work?.categories ?? [];
  const visibleBrands = BRAND_CATALOGS.filter((brand) => brandId === 'todas' || brand.id === brandId);
  const toggleQuote = (item: QuoteItem) => setQuoteItems((current) => current.some(({ key }) => key === item.key)
    ? current.filter(({ key }) => key !== item.key)
    : [...current, item]);
  const quoteMessage = [
    'Hola, Color Center. Quiero cotizar esta lista de productos:',
    ...quoteItems.map((item, index) => `${index + 1}. ${item.brand} — ${item.category}: ${item.product}`),
    'Por favor confírmenme disponibilidad, presentación y precio. Recogería en la sede.',
  ].join('\n');

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

        <div className="catalog-guide">
          <div className="catalog-guide-heading">
            <div><span className="catalog-guide-kicker">Guía rápida · paso {guideStep + 1} de 3</span><h3>¿Qué necesitas hacer?</h3></div>
            {guideStep > 0 && <button className="catalog-guide-reset" type="button" onClick={() => setGuideStep(0)}>Volver al inicio</button>}
          </div>
          {guideStep === 0 && <div className="catalog-guide-options">{WORK_OPTIONS.map(({ label }) => <button type="button" className="catalog-guide-option" key={label} onClick={() => { setWorkChoice(label); setGuideStep(1); }}>{label}<span aria-hidden="true">→</span></button>)}</div>}
          {guideStep === 1 && <div className="catalog-guide-options">{guideCategories.map((name) => <button type="button" className="catalog-guide-option" key={name} onClick={() => { setGuideCategory(name); setGuideStep(2); }}>{name}<span aria-hidden="true">→</span></button>)}</div>}
          {guideStep === 2 && <div className="catalog-guide-options catalog-brand-options"><p>¿Tienes preferencia de marca? La guía solo filtra el catálogo; no sustituye la recomendación del asesor.</p>{[{ id: 'todas', name: 'Ver todas las marcas' }, ...BRAND_CATALOGS].map(({ id, name }) => <button type="button" className="catalog-guide-option" key={id} onClick={() => { setCategoryName(guideCategory); setBrandId(id); setGuideStep(3); }}>{name}<span aria-hidden="true">→</span></button>)}</div>}
          {guideStep === 3 && <div className="catalog-guide-done" role="status"><p>Listo: te mostramos <strong>{guideCategory}</strong>{brandId === 'todas' ? ' de todas las marcas.' : ` de ${BRAND_CATALOGS.find(({ id }) => id === brandId)?.name}.`}</p><button type="button" className="catalog-guide-reset" onClick={() => setGuideStep(0)}>Hacer otra búsqueda</button></div>}
        </div>

        <div className="brand-category-filters" role="group" aria-label="Compara una categoría entre marcas">
          {CATEGORY_NAMES.map((name) => (
            <button key={name} type="button" className="brand-filter" aria-pressed={categoryName === name} onClick={() => setCategoryName(name)}>{name}</button>
          ))}
        </div>
        <div className="catalog-active-filters">
          <h3 className="brand-comparison-title">{categoryName} por marca</h3>
          <label className="catalog-brand-select">Marca
            <select value={brandId} onChange={(event) => setBrandId(event.target.value)}>
              <option value="todas">Todas las marcas</option>
              {BRAND_CATALOGS.map(({ id, name }) => <option value={id} key={id}>{name}</option>)}
            </select>
          </label>
        </div>
        {quoteItems.length > 0 && <aside className="quote-list" aria-label="Tu lista de cotización">
          <div className="quote-list-heading"><div><h3>Tu lista para cotizar</h3><p>{quoteItems.length} {quoteItems.length === 1 ? 'producto' : 'productos'} seleccionados</p></div><button type="button" className="quote-clear" onClick={() => setQuoteItems([])}>Vaciar lista</button></div>
          <ul>{quoteItems.map((item) => <li key={item.key}><span>{item.brand} · {item.product}</span><button type="button" aria-label={`Quitar ${item.product}`} onClick={() => toggleQuote(item)}><X size={17} /></button></li>)}</ul>
          <p className="quote-list-note">La lista se prepara aquí y no se guarda en la página.</p>
          <a className="btn btn-primary" href={whatsappUrl(quoteMessage)} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} aria-hidden="true" /> Cotizar lista por WhatsApp</a>
        </aside>}
        <div className="brand-catalog-grid">
          {visibleBrands.map((brand) => {
            const category = brand.categories.find(({ name }) => name === categoryName);
            const products = category?.products ?? [];
            return (
              <article className={`brand-category${products.length ? '' : ' is-unlisted'}`} key={brand.id}>
                <h3>{brand.name}</h3>
                <p className="brand-market-note">{brand.regionNote}</p>
                <p className="brand-function">{category?.summary ?? 'La fuente consultada no describe esta categoría.'}</p>
                {products.length ? (
                  <ul>{products.map((product) => {
                    const key = `${brand.id}|${categoryName}|${product}`;
                    const chosen = quoteItems.some(({ key: selectedKey }) => selectedKey === key);
                    return <li className="catalog-product-choice" key={product}><span>{product}</span><button type="button" className="catalog-add" aria-pressed={chosen} onClick={() => toggleQuote({ key, brand: brand.name, category: categoryName, product })}>{chosen ? 'Agregado' : 'Agregar a mi lista'}{chosen ? null : <Plus size={14} aria-hidden="true" />}</button></li>;
                  })}</ul>
                ) : (
                  <p className="brand-unlisted">La fuente oficial consultada no lista productos de esta categoría.</p>
                )}
                {category && <a className="brand-source" href={category.source} target="_blank" rel="noopener noreferrer">Ver fuente oficial <ArrowUpRight size={15} aria-hidden="true" /></a>}
                <a className="brand-inquiry" href={whatsappUrl(productInquiry(`${brand.name}: ${categoryName}`))} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} aria-hidden="true" /> Preguntar por WhatsApp</a>
              </article>
            );
          })}
        </div>
        <p className="brand-catalog-disclaimer">Las listas y funciones son informativas y resumen fuentes oficiales regionales; no confirman distribución, inventario ni compatibilidad local. Las fotos y nombres de envases de fabricante no se reutilizan aquí porque sus derechos no están abiertos.</p>
      </div>
    </section>
  );
}
