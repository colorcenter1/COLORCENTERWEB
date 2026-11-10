import type { CSSProperties } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight, Layers, MessageCircle, Package, PaintBucket, Palette, Ribbon, Sparkles, SprayCan } from 'lucide-react';
import { CATEGORIES, type Category, type CategoryIcon } from '../../data/catalog';
import { ALL_TONES } from '../../data/palette';
import { productInquiry, whatsappUrl } from '../../lib/whatsapp';

const ICONS: Record<CategoryIcon, LucideIcon> = {
  paint: PaintBucket,
  sand: Layers,
  tape: Ribbon,
  spray: SprayCan,
  shine: Sparkles,
  kit: Package,
};

type ChipStyle = CSSProperties & { '--chip': string };

function ToneStrip() {
  return (
    <div className="tone-strip" aria-hidden="true">
      {ALL_TONES.map((tone) => {
        const style: ChipStyle = { '--chip': tone.hex };
        return <i key={tone.id} style={style} />;
      })}
    </div>
  );
}

interface CategoryTileProps {
  category: Category;
  isFeatured: boolean;
}

function CategoryTile({ category, isFeatured }: CategoryTileProps) {
  const Icon = ICONS[category.icon];
  const titleId = `cat-${category.id}`;
  return (
    <article className={`product-tile${isFeatured ? ' is-featured' : ''}`} aria-labelledby={titleId}>
      {isFeatured && <ToneStrip />}
      <header className="tile-head">
        <span className="tile-icon" aria-hidden="true">
          <Icon size={22} strokeWidth={1.75} />
        </span>
        <div>
          <h3 id={titleId}>{category.name}</h3>
          <p className="tile-intro">{category.intro}</p>
        </div>
      </header>

      <ul className="product-items">
        {category.products.map((product) => (
          <li key={product.id}>
            <div>
              <h4>{product.name}</h4>
              <p>{product.use}</p>
            </div>
            <a
              className="product-cta"
              href={whatsappUrl(productInquiry(product.name))}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Consultar ${product.name} por WhatsApp`}
            >
              Consultar
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>

      {isFeatured && (
        <a className="tile-link" href="#simulador">
          <Palette size={16} aria-hidden="true" />
          Explora los tonos en el simulador
        </a>
      )}
    </article>
  );
}

export function Products() {
  return (
    <section id="productos" className="section products" aria-labelledby="productos-title">
      <div className="wrap">
        <div className="section-head">
          <h2 id="productos-title">Productos para pintar tu vehículo</h2>
          <p className="lede">
            En Color Center encuentras pinturas automotrices, barnices, catalizadores, lijas, cintas de enmascarar,
            pistolas, ceras y complementos. Pregunta por el producto que necesitas y te confirmamos marcas,
            presentaciones, precio y disponibilidad.
          </p>
        </div>

        <div className="product-bento">
          {CATEGORIES.map((category, index) => (
            <CategoryTile key={category.id} category={category} isFeatured={index === 0} />
          ))}
        </div>

        <div className="products-foot">
          <p>
            Cada botón abre WhatsApp con un mensaje listo; tú decides si lo envías. Precios y existencias se confirman
            en la conversación.
          </p>
          <a
            className="btn btn-primary"
            href={whatsappUrl(productInquiry('varios productos para un trabajo de pintura'))}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Consultar una lista de productos
          </a>
        </div>
      </div>
    </section>
  );
}
