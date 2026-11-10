import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight, Layers, PaintBucket, Package, SprayCan, Sparkles, Ribbon } from 'lucide-react';
import { CATEGORIES, type CategoryIcon } from '../../data/catalog';
import { categoryInquiry, whatsappUrl } from '../../lib/whatsapp';

const ICONS: Record<CategoryIcon, LucideIcon> = {
  paint: PaintBucket,
  sand: Layers,
  tape: Ribbon,
  spray: SprayCan,
  shine: Sparkles,
  kit: Package,
};

export function Products() {
  return (
    <section id="productos" className="section products" aria-labelledby="productos-title">
      <div className="wrap">
        <div className="section-head">
          <h2 id="productos-title">Lo que encuentras en Color Center</h2>
          <p className="lede">
            Elige una categoría y escríbenos. Te confirmamos referencias, presentaciones, precio y disponibilidad
            antes de que vengas a recoger.
          </p>
        </div>

        <ul className="category-list">
          {CATEGORIES.map((category) => {
            const Icon = ICONS[category.icon];
            return (
              <li key={category.id}>
                <a
                  className="category-link"
                  href={whatsappUrl(categoryInquiry(category.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="category-icon" aria-hidden="true">
                    <Icon size={22} strokeWidth={1.75} />
                  </span>
                  <span>
                    <h3>{category.name}</h3>
                    <p>{category.summary}</p>
                  </span>
                  <span className="category-go">
                    <span>Consultar</span>
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <p className="products-note">
          Cada enlace abre WhatsApp con un mensaje listo para enviar; tú decides si lo envías. Las referencias y
          marcas disponibles se confirman en la conversación.
        </p>
      </div>
    </section>
  );
}
