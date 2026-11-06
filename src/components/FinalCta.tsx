import React from 'react';
import { STORE_INFO } from '../data/mockData';
import { analytics } from '../services/analytics';
import { MessageCircle, ArrowRight, CheckCircle2, Car } from 'lucide-react';

export const FinalCta: React.FC = () => {
  const handleFinalWhatsApp = () => {
    analytics.recordEvent('whatsapp_trigger', 'Banner Final Automotriz WhatsApp Click', {
      source: 'final_cta_banner',
    });
  };

  return (
    <section className="py-12 sm:py-16 bg-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#00236f] via-[#003882] to-[#006398] text-white overflow-hidden p-7 sm:p-12 lg:p-16 shadow-2xl border border-blue-600/30">
          {/* Decorative ambient bubbles */}
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-sky-400/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl flex flex-col items-start space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-sky-200 text-xs font-bold border border-white/20">
              <Car className="w-3.5 h-3.5 text-amber-300" />
              <span>Atención Exprés a Talleres de Valledupar</span>
            </div>

            <h2 className="font-headline text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Pinta con el brillo y calidad Sherwin-Williams Automotive
            </h2>

            <p className="font-body text-sm sm:text-lg text-blue-100/90 leading-relaxed">
              Asesoría de coloristas certificados, igualación 100% exacta por código de chasis o espectrofotómetro, y entrega exprés en tu taller hoy mismo.
            </p>

            {/* Quick check benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-sky-100 pt-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Despacho a cabina en menos de 20 min</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Facturación electrónica DIAN inmediata</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Bases bicapa OEM y barnices 2K HS</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Precios especiales para latoneros y talleres</span>
              </div>
            </div>

            <div className="pt-3">
              <a
                href={`${STORE_INFO.whatsappUrl}?text=${encodeURIComponent('Hola Color Center Automotriz Valledupar, estoy listo para comprar y deseo cotizar pintura para un vehículo ahora.')}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleFinalWhatsApp}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-headline text-base sm:text-lg font-bold shadow-xl hover:scale-102 active:scale-95 transition-all min-h-[48px]"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Escribir ahora por WhatsApp</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
