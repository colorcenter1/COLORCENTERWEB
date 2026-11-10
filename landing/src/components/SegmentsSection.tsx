import React from 'react';
import { CUSTOMER_SEGMENTS, STORE_INFO } from '../data/mockData';
import { CustomerSegment } from '../types';
import { analytics } from '../services/analytics';
import { Wrench, Paintbrush, Truck, CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react';

interface SegmentsSectionProps {
  onSelectSegment?: (segment: CustomerSegment) => void;
}

export const SegmentsSection: React.FC<SegmentsSectionProps> = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'car_crash':
        return <Wrench className="w-6 h-6 text-[#006398]" />;
      case 'spray_gun':
        return <Paintbrush className="w-6 h-6 text-amber-500" />;
      case 'truck_fleet':
        return <Truck className="w-6 h-6 text-emerald-600" />;
      default:
        return <Wrench className="w-6 h-6 text-[#00236f]" />;
    }
  };

  const getTopBorderColor = (id: string) => {
    switch (id) {
      case 'talleres':
        return 'bg-[#00236f]';
      case 'pintores':
        return 'bg-[#006398]';
      case 'flotas':
        return 'bg-emerald-600';
      default:
        return 'bg-[#00236f]';
    }
  };

  const handleCtaClick = (seg: CustomerSegment) => {
    analytics.recordEvent('whatsapp_trigger', `Cotización Automotriz: ${seg.title}`, {
      segment: seg.id,
      source: 'segment_card',
    });
  };

  return (
    <section className="py-12 sm:py-16 bg-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-8">
        {/* Section Heading */}
        <div className="flex flex-col items-start md:items-center md:text-center max-w-2xl mx-auto">
          <span className="text-xs sm:text-sm font-bold text-[#006398] uppercase tracking-widest">
            Soluciones para el Sector Automotriz
          </span>
          <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#00236f] mt-1.5 tracking-tight">
            Atención especializada para cada necesidad
          </h2>
          <p className="font-body text-sm sm:text-base text-slate-600 mt-2">
            Desde la reparación de un golpe en el parachoques hasta el suministro continuo para talleres de colisión y flotas comerciales en el Cesar.
          </p>
        </div>

        {/* 3 Columns Grid (Crisp White Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {CUSTOMER_SEGMENTS.map((segment) => (
            <div
              key={segment.id}
              className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 hover:border-blue-300"
            >
              {/* Segment Header Color Accent Bar */}
              <div className={`h-1.5 w-full absolute top-0 left-0 ${getTopBorderColor(segment.id)}`} />

              <div>
                {/* Header with Icon */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#006398]">
                      {segment.category}
                    </span>
                    <h3 className="font-headline text-xl font-bold text-[#00236f] mt-0.5">
                      {segment.title}
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50/80 shadow-sm border border-blue-100 flex items-center justify-center shrink-0">
                    {getIcon(segment.iconName)}
                  </div>
                </div>

                {/* Description */}
                <p className="font-body text-sm text-slate-600 leading-relaxed mb-5">
                  {segment.description}
                </p>

                {/* Benefits List */}
                <ul className="space-y-2.5 pt-3 border-t border-slate-100">
                  {segment.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-slate-100">
                <a
                  href={`${STORE_INFO.whatsappUrl}?text=${encodeURIComponent(segment.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleCtaClick(segment)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-headline text-sm font-bold shadow-md hover:shadow-lg active:scale-95 transition-all min-h-[48px]"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{segment.buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
