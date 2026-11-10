import { BUSINESS, FULL_ADDRESS, NAV_LINKS } from '../../data/business';
import { generalInquiry, whatsappUrl } from '../../lib/whatsapp';
import { BrandMark } from '../ui/BrandMark';

const YEAR = 2026;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <BrandMark />
            <p style={{ marginTop: '1rem', maxWidth: '38ch' }}>
              Venta de pinturas e insumos automotrices en Valledupar. No prestamos servicios de pintura, latonería ni
              mantenimiento.
            </p>
          </div>
          <div>
            <h2>Contacto</h2>
            <ul>
              <li>
                <a href={whatsappUrl(generalInquiry())} target="_blank" rel="noopener noreferrer">
                  WhatsApp {BUSINESS.whatsappDisplay}
                </a>
              </li>
              <li>
                <a href={BUSINESS.mapsUrl} target="_blank" rel="noopener noreferrer">
                  {FULL_ADDRESS}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2>En esta página</h2>
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
              <li>
                <a href="#preguntas">Preguntas frecuentes</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {YEAR} Color Center · Valledupar</p>
          <p>Colores del simulador: referencia visual aproximada.</p>
        </div>
      </div>
    </footer>
  );
}
