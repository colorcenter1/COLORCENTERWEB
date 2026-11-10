import { useEffect, useId, useState } from 'react';
import { Menu, MessageCircle, X } from 'lucide-react';
import { NAV_LINKS } from '../../data/business';
import { generalInquiry, whatsappUrl } from '../../lib/whatsapp';
import { BrandMark } from '../ui/BrandMark';

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-header">
      <div className="wrap header-row">
        <BrandMark />

        <nav className="main-nav" aria-label="Principal">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <a
            className="btn btn-primary"
            href={whatsappUrl(generalInquiry())}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escribir por WhatsApp (se abre en una pestaña nueva)"
          >
            <MessageCircle size={18} aria-hidden="true" />
            <span className="header-cta-label">WhatsApp</span>
          </a>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={isMenuOpen}
            aria-controls={panelId}
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div id={panelId} className="mobile-panel" data-open={isMenuOpen}>
        <nav className="wrap" aria-label="Principal móvil">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={closeMenu}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
