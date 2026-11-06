import React from 'react';
import { STORE_INFO } from '../data/mockData';
import { analytics } from '../services/analytics';
import { BrandLogo } from './BrandLogo';
import { MapPin, Phone, Clock, ChevronRight, ShieldCheck, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  const handleNav = (id: string, label: string) => {
    analytics.recordEvent('page_view', `Footer click: ${label}`, { section: id });
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-white border-t border-slate-200 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <BrandLogo size="md" variant="dark" />
            <p className="font-body text-xs sm:text-sm text-slate-600 leading-relaxed">
              Su aliado experto en repintado automotriz, sistemas bicapa computarizados OEM, barnices 2K de alto sólidos e insumos de latonería. Distribuidor oficial Sherwin-Williams Automotive Finishes para Valledupar y el Cesar.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#00236f] text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Distribuidor Oficial Autorizado</span>
            </div>
          </div>

          {/* Col 2: Ubicación & Atención */}
          <div className="space-y-3">
            <h4 className="font-headline font-bold text-sm sm:text-base text-[#00236f]">
              Sede y Despacho Valledupar
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#006398] shrink-0 mt-0.5" />
                <span>
                  {STORE_INFO.address}
                  <br />
                  <strong className="text-slate-800">{STORE_INFO.city}</strong>
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#006398] shrink-0" />
                <a href={`tel:${STORE_INFO.phoneRaw}`} className="hover:underline font-bold text-[#00236f]">
                  {STORE_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#006398] shrink-0" />
                <span>Lun - Vie: 7:30 AM - 6:00 PM | Sáb: 8:00 AM - 3:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Navegación Rápida */}
          <div className="space-y-3">
            <h4 className="font-headline font-bold text-sm sm:text-base text-[#00236f]">
              Navegación Rápida
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => handleNav('productos', 'Líneas Automotrices')}
                  className="text-slate-600 hover:text-[#00236f] flex items-center gap-1 transition-colors font-medium"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#006398]" />
                  <span>Líneas y Productos Automotrices</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('por-que-elegirnos', 'Tecnología')}
                  className="text-slate-600 hover:text-[#00236f] flex items-center gap-1 transition-colors font-medium"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#006398]" />
                  <span>Por qué elegirnos (Tecnología)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('como-comprar', 'Cómo pedir por código')}
                  className="text-slate-600 hover:text-[#00236f] flex items-center gap-1 transition-colors font-medium"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#006398]" />
                  <span>Cómo pedir por código de chasis</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('visitanos', 'Sede Valledupar')}
                  className="text-slate-600 hover:text-[#00236f] flex items-center gap-1 transition-colors font-medium"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#006398]" />
                  <span>Sede Valledupar (Pablo VI)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Asesoría Especializada Taller */}
          <div className="space-y-3">
            <h4 className="font-headline font-bold text-sm sm:text-base text-[#00236f]">
              Cotización Rápida Taller
            </h4>
            <p className="font-body text-xs sm:text-sm text-slate-600 leading-relaxed">
              Envíe el código de color de su vehículo o solicite la visita técnica de uno de nuestros coloristas en su taller.
            </p>
            <a
              href={`${STORE_INFO.whatsappUrl}?text=${encodeURIComponent('Hola Color Center Automotriz, solicito cotización formal de materiales para mi taller en Valledupar.')}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => analytics.recordEvent('whatsapp_trigger', 'Footer Cotización Directa Automotriz')}
              className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-[#00236f] hover:bg-[#001b54] text-white text-xs sm:text-sm font-bold transition-all shadow-sm active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Solicitar Cotización Taller</span>
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Color Center Automotriz Valledupar. Todos los derechos reservados. Sherwin-Williams Automotive Finishes® y sus marcas son propiedad registrada.</p>
          <div className="flex items-center gap-3 font-semibold text-[#006398]">
            <span>Fórmulas OEM</span>
            <span>•</span>
            <span>Espectrofotómetro 5 Ángulos</span>
            <span>•</span>
            <span>Despacho a Cabina</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
