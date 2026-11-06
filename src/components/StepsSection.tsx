import React from 'react';
import { STORE_INFO } from '../data/mockData';
import { analytics } from '../services/analytics';
import { MessageCircle, Cpu, Truck, ArrowRight, Camera } from 'lucide-react';

export const StepsSection: React.FC = () => {
  const handleStepsWhatsApp = () => {
    analytics.recordEvent('whatsapp_trigger', 'Iniciar pedido automotriz en 3 pasos', {
      source: 'steps_section_cta',
    });
  };

  return (
    <section id="como-comprar" className="py-14 sm:py-20 bg-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-10">
        {/* Header */}
        <div className="text-left sm:text-center max-w-2xl sm:mx-auto">
          <span className="text-xs sm:text-sm font-bold text-[#006398] uppercase tracking-widest">
            Proceso Rápido y Sin Errores
          </span>
          <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#00236f] mt-1.5 tracking-tight">
            Cómo pedir tu pintura automotriz en 3 pasos
          </h2>
          <p className="font-body text-sm sm:text-base text-slate-600 mt-2">
            Sin margen de error en la tonalidad y con asesoría de coloristas certificados en cada paso.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Step 1 */}
          <div className="bg-slate-50/80 hover:bg-white rounded-3xl p-7 shadow-sm border border-slate-200 flex flex-col relative group hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-6">
              <span className="font-headline text-4xl sm:text-5xl font-black text-blue-100 select-none">
                01
              </span>
              <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center">
                <Camera className="w-6 h-6" />
              </div>
            </div>
            <h3 className="font-headline font-bold text-lg text-[#00236f] mb-2">
              Envíanos el código o la pieza
            </h3>
            <p className="font-body text-sm text-slate-600 leading-relaxed">
              Mándanos por WhatsApp una foto de la plaqueta del chasis (VIN), el código de pintura del fabricante o trae la tapa del tanque de combustible a nuestra tienda.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-50/80 hover:bg-white rounded-3xl p-7 shadow-sm border border-slate-200 flex flex-col relative group hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-6">
              <span className="font-headline text-4xl sm:text-5xl font-black text-blue-100 select-none">
                02
              </span>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#00236f] flex items-center justify-center border border-blue-100">
                <Cpu className="w-6 h-6 text-[#006398]" />
              </div>
            </div>
            <h3 className="font-headline font-bold text-lg text-[#00236f] mb-2">
              Formulación y mezcla en 5 min
            </h3>
            <p className="font-body text-sm text-slate-600 leading-relaxed">
              Dosificamos en nuestra balanza computarizada Sherwin-Williams Automotive con pigmentos, perlas y aluminios genuinos para igualar al 100%.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-50/80 hover:bg-white rounded-3xl p-7 shadow-sm border border-slate-200 flex flex-col relative group hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-6">
              <span className="font-headline text-4xl sm:text-5xl font-black text-blue-100 select-none">
                03
              </span>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                <Truck className="w-6 h-6" />
              </div>
            </div>
            <h3 className="font-headline font-bold text-lg text-[#00236f] mb-2">
              Despacho exprés a cabina o retiro
            </h3>
            <p className="font-body text-sm text-slate-600 leading-relaxed">
              Te lo enviamos en moto directo a tu taller en menos de 20 minutos en Valledupar o lo retiras empacado y listo para aplicar en soplete.
            </p>
          </div>
        </div>

        {/* Central CTA */}
        <div className="text-center pt-2">
          <a
            href={`${STORE_INFO.whatsappUrl}?text=${encodeURIComponent('Hola Color Center Automotriz, quiero enviar el código de mi vehículo por WhatsApp para cotizar pintura.')}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleStepsWhatsApp}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-headline text-base font-bold shadow-lg hover:shadow-xl active:scale-95 transition-all min-h-[48px]"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>Consultar por WhatsApp ahora</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </section>
  );
};
