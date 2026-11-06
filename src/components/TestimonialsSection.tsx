import React from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Star, Info } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-[#f8faff] transition-colors duration-300 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-8">
        {/* Header */}
        <div className="flex flex-col items-start sm:items-center sm:text-center max-w-2xl sm:mx-auto">
          <span className="text-xs sm:text-sm font-bold text-[#006398] uppercase tracking-widest">
            Talleres y Maestros en Valledupar
          </span>
          <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#00236f] mt-1.5 tracking-tight">
            Confianza en Talleres del Cesar
          </h2>
          <p className="font-body text-sm sm:text-base text-slate-600 mt-2">
            La voz de latoneros, pintores profesionales y jefes de mantenimiento que confían en Sherwin-Williams Automotive.
          </p>
        </div>

        {/* Prototype / Mockup Notice Banner */}
        <div className="p-3 sm:p-3.5 rounded-2xl bg-white border border-slate-200 text-slate-700 flex items-center justify-center gap-2.5 text-center text-xs shadow-sm">
          <Info className="w-4 h-4 text-[#006398] shrink-0" />
          <span className="font-semibold">
            Testimonios representativos de talleres de colisión y contratistas de repintado en Valledupar
          </span>
        </div>

        {/* Testimonials 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="font-body text-sm text-slate-700 leading-relaxed italic">
                  "{item.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-headline font-bold text-sm text-[#00236f]">
                    {item.name}
                  </h4>
                  <p className="font-body text-xs text-slate-500">
                    {item.role} {item.shopName ? `• ${item.shopName}` : ''}
                  </p>
                </div>
                <span className="text-[11px] font-bold px-2 py-1 rounded-md bg-slate-50 border border-slate-200 text-[#006398]">
                  {item.neighborhood}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
