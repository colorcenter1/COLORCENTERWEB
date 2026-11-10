import { MapPin, MessageCircle, Palette, Store } from 'lucide-react';
import { BUSINESS } from '../../data/business';
import { generalInquiry, whatsappUrl } from '../../lib/whatsapp';
import { ChipFan } from './ChipFan';

interface HeroProps {
  onTryColors: () => void;
}

export function Hero({ onTryColors }: HeroProps) {
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1 id="hero-title">
            Pinturas e insumos automotrices <span>en Valledupar</span>
          </h1>
          <p className="lede">
            Barnices, catalizadores, cintas, lijas, pistolas, ceras y complementos para pintar tu vehículo.
            Consulta por WhatsApp, confirma precio y disponibilidad, y recoge en nuestra sede.
          </p>
          <div className="hero-actions">
            <a
              className="btn btn-primary"
              href={whatsappUrl(generalInquiry())}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Consultar productos
            </a>
            <a className="btn btn-ghost" href="#simulador" onClick={onTryColors}>
              <Palette size={18} aria-hidden="true" />
              Probar colores
            </a>
          </div>
          <ul className="hero-facts">
            <li>
              <MapPin size={16} aria-hidden="true" />
              {BUSINESS.streetAddress}, {BUSINESS.locality}
            </li>
            <li>
              <Store size={16} aria-hidden="true" />
              Venta de productos con recogida en sede
            </li>
          </ul>
        </div>
        <ChipFan />
      </div>
    </section>
  );
}
