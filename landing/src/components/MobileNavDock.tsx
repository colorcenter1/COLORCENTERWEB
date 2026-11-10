import React from 'react';
import { STORE_INFO } from '../data/mockData';
import { analytics } from '../services/analytics';
import { Car, Palette, MessageCircle, Store, BarChart3 } from 'lucide-react';

interface MobileNavDockProps {
  onOpenColorStudio: () => void;
  onOpenAnalytics: () => void;
}

export const MobileNavDock: React.FC<MobileNavDockProps> = ({
  onOpenColorStudio,
  onOpenAnalytics,
}) => {
  const handleNav = (sectionId: string, label: string) => {
    analytics.recordEvent('page_view', `Mobile Dock: ${label}`, { section: sectionId });
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsApp = () => {
    analytics.recordEvent('whatsapp_trigger', 'Mobile Dock Central WhatsApp Automotriz', {
      source: 'mobile_dock',
    });
  };

  return (
    <>
      {/* Floating Desktop WhatsApp Trigger Button */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 items-center group">
        <div className="flex items-center mr-3 px-3.5 py-1.5 rounded-full bg-white text-slate-800 shadow-xl text-xs font-bold border border-slate-200 opacity-90 group-hover:opacity-100 transition-opacity pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-[#25D366] mr-2 animate-ping"></span>
          ¡Cotiza por código de chasis o foto!
        </div>
        <a
          href={`${STORE_INFO.whatsappUrl}?text=${encodeURIComponent('Hola Color Center Automotriz Valledupar, vengo de su página web y deseo cotizar pintura para mi vehículo.')}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsApp}
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
          aria-label="Abrir WhatsApp con Color Center Automotriz"
        >
          <MessageCircle className="w-7 h-7 fill-white" />
        </a>
      </div>

      {/* Mobile Fixed Bottom Navigation Bar (Docked White Aesthetic) */}
      <nav
        aria-label="Navegación inferior móvil"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 pb-safe bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-[0_-2px_12px_rgba(0,0,0,0.06)] transition-colors duration-300"
      >
        <div className="h-16 px-2 sm:px-4 flex items-center justify-around">
          {/* Catalogo */}
          <button
            type="button"
            onClick={() => handleNav('productos', 'Catálogo Automotriz')}
            className="flex flex-col items-center justify-center min-w-[50px] min-h-[44px] text-slate-700 hover:text-[#00236f] transition-colors"
          >
            <Car className="w-5 h-5 text-[#006398]" />
            <span className="text-[10px] font-bold mt-1">Líneas Auto</span>
          </button>

          {/* Colores */}
          <button
            type="button"
            onClick={() => {
              analytics.recordEvent('color_select', 'Abrió Simulador de Color desde dock');
              onOpenColorStudio();
            }}
            className="flex flex-col items-center justify-center min-w-[50px] min-h-[44px] text-slate-700 hover:text-[#00236f] transition-colors"
          >
            <Palette className="w-5 h-5 text-amber-500" />
            <span className="text-[10px] font-bold mt-1">Simulador</span>
          </button>

          {/* Center Prominent WhatsApp Button */}
          <a
            href={`${STORE_INFO.whatsappUrl}?text=${encodeURIComponent('Hola Color Center Automotriz Valledupar, solicito asesoría en pinturas y barniz Sherwin-Williams.')}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsApp}
            className="flex items-center justify-center gap-1.5 bg-[#25D366] text-white px-3.5 py-2.5 rounded-full min-h-[44px] shadow-[0_4px_12px_rgba(37,211,102,0.35)] active:scale-95 transition-transform"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span className="text-xs font-bold text-white tracking-wide">WhatsApp</span>
          </a>

          {/* Tienda */}
          <button
            type="button"
            onClick={() => handleNav('visitanos', 'Tienda')}
            className="flex flex-col items-center justify-center min-w-[50px] min-h-[44px] text-slate-700 hover:text-[#00236f] transition-colors"
          >
            <Store className="w-5 h-5" />
            <span className="text-[10px] font-bold mt-1">Sede</span>
          </button>

          {/* Analytics shortcut */}
          <button
            type="button"
            onClick={onOpenAnalytics}
            className="flex flex-col items-center justify-center min-w-[50px] min-h-[44px] text-slate-700 hover:text-emerald-600 transition-colors"
          >
            <BarChart3 className="w-5 h-5 text-emerald-600" />
            <span className="text-[10px] font-bold mt-1">Métricas</span>
          </button>
        </div>
      </nav>
    </>
  );
};
