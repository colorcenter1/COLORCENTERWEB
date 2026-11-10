import { MessageCircle, Navigation } from 'lucide-react';
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
            <p className="map-note">El mapa lo muestra Google Maps. Usa «Abrir en Google Maps» para ver la ruta.</p>
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
          <div className="location-map">
            <iframe
              src={BUSINESS.mapsEmbedUrl}
              title="Mapa de Google con la ubicación de Color Center en Cl. 21 #17-96, Valledupar"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
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
