import React from 'react';
import { STORE_INFO } from '../data/mockData';
import { analytics } from '../services/analytics';
import { Store, MapPin, Clock, Phone, Navigation, Cpu } from 'lucide-react';

export const StoreSection: React.FC = () => {
  const handleMapClick = () => {
    analytics.recordEvent('cta_click', 'Clic en Cómo Llegar (Google Maps)', {
      destination: STORE_INFO.address,
    });
  };

  return (
    <section id="visitanos" className="py-14 sm:py-20 bg-[#f8faff] transition-colors duration-300 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col items-start sm:items-center sm:text-center max-w-2xl sm:mx-auto">
          <span className="text-xs sm:text-sm font-bold text-[#006398] uppercase tracking-widest">
            Laboratorio y Tienda Física
          </span>
          <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#00236f] mt-1.5 tracking-tight">
            Sede Color Center Automotriz (Barrio Pablo VI)
          </h2>
          <p className="font-body text-sm sm:text-base text-slate-600 mt-2">
            Ven a escanear la tapa de tu carro en nuestro espectrofotómetro, recibir asesoría directa de nuestros coloristas o retirar tus pedidos ya mezclados.
          </p>
        </div>

        {/* 2-Column Store Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Info Card (Clean White) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#00236f] text-white flex items-center justify-center shrink-0 shadow-md">
                  <Store className="w-6 h-6 text-sky-300" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#006398] uppercase tracking-wider">
                    Punto Autorizado Sherwin-Williams
                  </span>
                  <h3 className="font-headline font-bold text-xl text-[#00236f]">
                    Color Center Automotriz
                  </h3>
                </div>
              </div>

              {/* Contact list */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-[#006398]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-headline font-bold text-sm text-[#00236f]">
                      Dirección en Valledupar
                    </p>
                    <p className="font-body text-xs sm:text-sm text-slate-700 font-medium">
                      {STORE_INFO.address}
                    </p>
                    <p className="font-body text-xs text-slate-500">
                      {STORE_INFO.city}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-[#006398]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-headline font-bold text-sm text-[#00236f]">
                      Horario de Atención Taller
                    </p>
                    <p className="font-body text-xs sm:text-sm text-slate-700">
                      {STORE_INFO.scheduleWeek}
                    </p>
                    <p className="font-body text-xs sm:text-sm text-slate-700">
                      {STORE_INFO.scheduleSat}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 text-emerald-600">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-headline font-bold text-sm text-[#00236f]">
                      Línea Directa / WhatsApp Pedidos
                    </p>
                    <a
                      href={`tel:${STORE_INFO.phoneRaw}`}
                      className="font-body text-xs sm:text-sm text-[#006398] font-bold hover:underline"
                    >
                      {STORE_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0 text-amber-600">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-headline font-bold text-sm text-[#00236f]">
                      Equipamiento en Sede
                    </p>
                    <p className="font-body text-xs sm:text-sm text-slate-600">
                      Espectrofotómetro óptico 5 ángulos, balanza tintométrica digital y stock de barnices 2K para entrega inmediata.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps External Action Button */}
            <div className="pt-6 mt-6 border-t border-slate-100">
              <a
                href={STORE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleMapClick}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#00236f] hover:bg-[#001b54] text-white font-headline text-sm font-bold shadow-md hover:shadow-lg active:scale-95 transition-all min-h-[48px]"
              >
                <Navigation className="w-4 h-4" />
                <span>Cómo llegar (Google Maps)</span>
              </a>
            </div>
          </div>

          {/* Map Preview Image Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-3 sm:p-4 border border-slate-200 shadow-sm flex flex-col justify-between overflow-hidden">
            <div className="relative w-full h-[280px] sm:h-[380px] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={STORE_INFO.mapCoverImage}
                alt="Mapa satelital y ubicación de Color Center en Valledupar, barrio Pablo VI"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-blue-900/10 pointer-events-none" />

              {/* Pin indicator badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group pointer-events-auto">
                <a
                  href={STORE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#00236f] text-white px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 text-xs font-black hover:scale-105 transition-transform border-2 border-white"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>Color Center Automotriz</span>
                </a>
                <div className="w-3.5 h-3.5 bg-[#00236f] rotate-45 -mt-1.5 border-r border-b border-white" />
              </div>
            </div>

            <div className="mt-3 px-2 flex items-center justify-between text-xs text-slate-600">
              <span className="font-medium">Sector céntrico y de fácil parqueo para retiro de pedidos</span>
              <a
                href={STORE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#006398] hover:underline"
              >
                Abrir ruta en Waze / Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
