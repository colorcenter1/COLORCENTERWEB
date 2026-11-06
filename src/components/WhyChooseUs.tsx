import React from 'react';
import { STORE_INFO } from '../data/mockData';
import { analytics } from '../services/analytics';
import { Cpu, Sparkles, Truck, MessageCircle, ArrowRight, Shield } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const handleDeliveryCta = () => {
    analytics.recordEvent('whatsapp_trigger', 'Pedir pintura automotriz por WhatsApp', {
      source: 'why_choose_us_cta',
    });
  };

  return (
    <section id="por-que-elegirnos" className="py-14 sm:py-20 bg-[#f8faff] transition-colors duration-300 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs sm:text-sm font-bold text-[#006398] uppercase tracking-widest">
              Tecnología Sherwin-Williams Automotive
            </span>
            <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#00236f] mt-1.5 tracking-tight">
              ¿Por qué elegir Color Center para tu pintura automotriz?
            </h2>
          </div>
          <p className="font-body text-sm sm:text-base text-slate-600 max-w-md leading-relaxed">
            Combinamos formulación computarizada americana de precisión con la atención ágil que los talleres y latoneros de Valledupar necesitan día a día.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1 */}
          <div className="p-7 rounded-3xl bg-white shadow-sm border border-slate-200/90 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#00236f] flex items-center justify-center mb-5 border border-blue-100">
                <Cpu className="w-7 h-7 text-[#006398]" />
              </div>
              <span className="text-xs font-bold text-[#006398] uppercase tracking-wider">
                Precisión 01
              </span>
              <h3 className="font-headline text-lg sm:text-xl font-bold text-[#00236f] mt-1 mb-2">
                Espectrofotómetro y Código OEM
              </h3>
              <p className="font-body text-sm text-slate-600 leading-relaxed">
                Leemos el color de tu vehículo en 5 ángulos o buscamos la receta de fábrica por VIN. Ajustamos tonalidad exacta incluso en carros con pintura envejecida por el sol.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#00236f]">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span>Cero diferencias entre paneles contiguos</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-7 rounded-3xl bg-white shadow-sm border border-slate-200/90 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#006398] flex items-center justify-center mb-5 border border-blue-100">
                <Sparkles className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold text-[#006398] uppercase tracking-wider">
                Rendimiento 02
              </span>
              <h3 className="font-headline text-lg sm:text-xl font-bold text-[#00236f] mt-1 mb-2">
                Barnices 2K de Alto Sólidos (HS)
              </h3>
              <p className="font-body text-sm text-slate-600 leading-relaxed">
                Brillo espejo cristal con resistencia UV formulado para temperaturas superiores a 35°C. Secado rápido, fácil pulido y retención de brillo por años.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#00236f]">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span>Garantía oficial Sherwin-Williams Automotive</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-7 rounded-3xl bg-white shadow-sm border border-slate-200/90 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 border border-emerald-100">
                <Truck className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                Velocidad 03
              </span>
              <h3 className="font-headline text-lg sm:text-xl font-bold text-[#00236f] mt-1 mb-2">
                Despacho Exprés a Cabina
              </h3>
              <p className="font-body text-sm text-slate-600 leading-relaxed">
                Entendemos que los tiempos en cabina son oro. Te enviamos la pintura, barniz o masilla en menos de 20 minutos a cualquier taller o latonería de Valledupar.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-emerald-700">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span>Tu taller no se detiene esperando pintura</span>
            </div>
          </div>
        </div>

        {/* Large Delivery Action Banner */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-blue-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-headline font-bold text-base sm:text-lg text-[#00236f]">
                ¿Tienes un carro en cabina o latonería en este momento?
              </h4>
              <p className="font-body text-xs sm:text-sm text-slate-600">
                Escríbenos la marca, modelo o código de color y te despachamos el pedido de inmediato.
              </p>
            </div>
          </div>

          <a
            href={`${STORE_INFO.whatsappUrl}?text=${encodeURIComponent('Hola Color Center Automotriz, necesito pedir pintura y barniz con despacho exprés a mi taller en Valledupar.')}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleDeliveryCta}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-headline text-sm font-bold shadow-md hover:shadow-lg active:scale-95 transition-all min-h-[48px]"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Pedir con despacho a taller</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
