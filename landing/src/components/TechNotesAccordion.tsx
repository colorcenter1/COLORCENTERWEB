import React, { useState } from 'react';
import { ChevronDown, CheckCircle2, ClipboardList } from 'lucide-react';

export const TechNotesAccordion: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const checklistItems = [
    'Fondo blanco integral y contrastes óptimos basados en la paleta oficial (Azul Cobalto, Cyan Eléctrico, Ámbar de Faros y Blanco Puro).',
    'Simulador 3D y Laboratorio de Color Automotriz en estudio fotográfico blanco de alta gama con modelos Coupé GT, Pickup 4x4 y Sedán.',
    'Logotipo oficial de la empresa integrado y adaptado con insignia Color Center Automotriz en Header, Footer, Favicon y parrilla frontal.',
    'Calculadora de materiales automotrices por pieza (Bicapa OEM, Barniz 2K HS, Primer 2K, Thinner PU y Masilla liviana).',
    'Integración directa a WhatsApp (+57 300 442 6477) con mensajes semánticos para talleres de colisión, latoneros y particulares.',
    'Áreas de toque táctiles mínimas de 48px para ergonomía móvil con una sola mano en taller.',
    'Georreferenciación de sede Valledupar (barrio Pablo VI) optimizada con enlace directo a Google Maps y Waze.',
    'Panel de analíticas en tiempo real para monitoreo de usuarios y cotizaciones.',
  ];

  return (
    <section className="pb-8 pt-2 bg-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full p-4 flex items-center justify-between text-left text-xs sm:text-sm font-bold text-slate-700 min-h-[48px]"
            aria-expanded={isOpen}
          >
            <div className="flex items-center gap-2.5">
              <ClipboardList className="w-4 h-4 text-[#006398]" />
              <span>Notas Técnicas y Checklist de Lanzamiento Automotriz</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {isOpen && (
            <div className="p-4 pt-1 border-t border-slate-200 space-y-2.5 text-xs text-slate-600 bg-white">
              {checklistItems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
