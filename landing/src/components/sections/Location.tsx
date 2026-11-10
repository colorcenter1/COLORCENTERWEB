import { MapPin, MessageCircle, Navigation } from 'lucide-react';
import { BUSINESS } from '../../data/business';
import { generalInquiry, whatsappUrl } from '../../lib/whatsapp';

export function Location() {
  return (
    <section id="ubicacion" className="section location" aria-labelledby="ubicacion-title">
      <div className="wrap">
        <div className="section-head">
          <h2 id="ubicacion-title">Visítanos para recoger tu pedido</h2>
        </div>

        <div className="location-card">
          <div className="location-main">
            <address className="address">
              <strong>{BUSINESS.streetAddress}</strong>
              {BUSINESS.locality}, {BUSINESS.region}
            </address>
            <p className="lede">
              Confirma por WhatsApp que tu pedido está listo antes de venir. El horario de atención se informa por
              ese mismo canal.
            </p>
            <div className="location-actions">
              <a className="btn btn-primary" href={BUSINESS.mapsUrl} target="_blank" rel="noopener noreferrer">
                <Navigation size={18} aria-hidden="true" />
                Abrir en Google Maps
              </a>
              <a
                className="btn btn-ghost"
                href={whatsappUrl(generalInquiry())}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Escribir por WhatsApp
              </a>
            </div>
          </div>
          <div className="location-side">
            <MapPin size={28} aria-hidden="true" />
            <strong>Color Center · Tienda de pinturas</strong>
            <p>La ficha de Google Maps te da la ruta exacta desde donde estés.</p>
            <p className="coords">
              {BUSINESS.geo.latitude.toFixed(5)}, {BUSINESS.geo.longitude.toFixed(5)}
            </p>
          </div>
        </div>

        <div className="closing">
          <h2>¿Ya sabes qué necesitas? Escríbenos y te confirmamos.</h2>
          <a className="btn btn-primary" href={whatsappUrl(generalInquiry())} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={18} aria-hidden="true" />
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
