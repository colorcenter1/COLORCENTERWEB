import React, { useState } from 'react';
import { FAQS, STORE_INFO } from '../data/mockData';
import { analytics } from '../services/analytics';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1']);

  const toggleFaq = (id: string, question: string) => {
    const isOpening = !openIds.includes(id);
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );

    if (isOpening) {
      analytics.recordEvent('faq_toggle', `Pregunta automotriz abierta: ${question}`, { faqId: id });
    }
  };

  const handleCustomQuestionWhatsApp = () => {
    analytics.recordEvent('whatsapp_trigger', 'Pregunta automotriz personalizada por WhatsApp', {
      source: 'faq_cta',
    });
  };

  return (
    <section className="py-14 sm:py-20 bg-white transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 space-y-8">
        {/* Header */}
        <div className="text-left sm:text-center">
          <span className="text-xs sm:text-sm font-bold text-[#006398] uppercase tracking-widest">
            Resolvemos tus Dudas Técnicas
          </span>
          <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#00236f] mt-1.5 tracking-tight">
            Preguntas Frecuentes sobre Pintura Automotriz
          </h2>
          <p className="font-body text-sm sm:text-base text-slate-600 mt-2">
            Información técnica sobre igualación OEM, tiempos de secado, barnices 2K y despacho en Valledupar.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {FAQS.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="bg-slate-50/70 hover:bg-slate-50 rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id, faq.question)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-3 min-h-[48px]"
                  aria-expanded={isOpen}
                >
                  <span className="font-headline font-bold text-sm sm:text-base text-[#00236f]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#006398] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-700 border-t border-slate-200/80 leading-relaxed animate-in fade-in duration-200 bg-white">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Custom Question Button */}
        <div className="text-center pt-2">
          <a
            href={`${STORE_INFO.whatsappUrl}?text=${encodeURIComponent('Hola Color Center Automotriz, tengo una consulta técnica sobre la preparación de pintura para mi carro en Valledupar.')}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCustomQuestionWhatsApp}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-50/80 hover:bg-blue-100 text-[#00236f] border border-blue-200 font-headline text-xs sm:text-sm font-bold shadow-sm transition-all min-h-[48px]"
          >
            <HelpCircle className="w-4 h-4 text-[#006398]" />
            <span>Consultar otra duda con un colorista automotriz</span>
          </a>
        </div>
      </div>
    </section>
  );
};
