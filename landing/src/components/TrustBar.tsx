import React from 'react';
import { Cpu, Sparkles, Truck } from 'lucide-react';

export const TrustBar: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 -mt-4 mb-10 relative z-20">
      <div className="bg-gradient-to-r from-[#00236f] via-[#003882] to-[#0050A0] text-white rounded-3xl p-5 sm:p-7 shadow-xl shadow-blue-950/15 border border-blue-700/60">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-blue-400/25">
          {/* Pillar 1 */}
          <div className="flex items-start gap-4 pt-4 md:pt-0">
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center shrink-0 text-sky-200 shadow-inner">
              <Cpu className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <h3 className="font-headline font-bold text-base sm:text-lg text-white">
                Espectrofotómetro 5 Ángulos
              </h3>
              <p className="font-body text-xs sm:text-sm text-blue-100/90 mt-1 leading-relaxed">
                Lectura óptica computarizada de la pieza. Igualamos vehículos con pintura desgastada o perlas especiales con 0% de diferencia.
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="flex items-start gap-4 pt-4 md:pt-0 md:pl-6">
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center shrink-0 text-amber-300 shadow-inner">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <h3 className="font-headline font-bold text-base sm:text-lg text-white">
                Barnices 2K & Bicapa OEM
              </h3>
              <p className="font-body text-xs sm:text-sm text-blue-100/90 mt-1 leading-relaxed">
                Fórmulas originales Sherwin-Williams Ultra 7000® y barnices High Solids con máxima retención de brillo y filtro UV.
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="flex items-start gap-4 pt-4 md:pt-0 md:pl-6">
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center shrink-0 text-emerald-300 shadow-inner">
              <Truck className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <h3 className="font-headline font-bold text-base sm:text-lg text-white">
                Despacho Exprés a Cabinas
              </h3>
              <p className="font-body text-xs sm:text-sm text-blue-100/90 mt-1 leading-relaxed">
                Llevamos tu pintura lista en moto o camioneta en menos de 20 minutos a cualquier taller o latonería de Valledupar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
