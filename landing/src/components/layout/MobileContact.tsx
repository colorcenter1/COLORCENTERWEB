import { MessageCircle } from 'lucide-react';
import { generalInquiry, whatsappUrl } from '../../lib/whatsapp';

/** Acceso fijo a WhatsApp en pantallas pequeñas. */
export function MobileContact() {
  return (
    <div className="mobile-contact">
      <a className="btn btn-primary" href={whatsappUrl(generalInquiry())} target="_blank" rel="noopener noreferrer">
        <MessageCircle size={18} aria-hidden="true" />
        Consultar por WhatsApp
      </a>
    </div>
  );
}
