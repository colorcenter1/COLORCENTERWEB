import React, { useState } from 'react';
import { COLOR_SWATCHES, STORE_INFO } from '../data/mockData';
import { ColorSwatch } from '../types';
import { analytics } from '../services/analytics';
import { X, Check, MessageCircle, Car, ShieldCheck } from 'lucide-react';
import { CarPaintSimulator } from './CarPaintSimulator';

interface ColorStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectColor?: (color: ColorSwatch) => void;
}

export const ColorStudioModal: React.FC<ColorStudioModalProps> = ({
  isOpen,
  onClose,
  onSelectColor,
}) => {
  const [selectedSwatch, setSelectedSwatch] = useState<ColorSwatch>(COLOR_SWATCHES[0]);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeFinishFilter, setActiveFinishFilter] = useState<string>('todos');

  if (!isOpen) return null;

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChooseColor = (swatch: ColorSwatch) => {
    setSelectedSwatch(swatch);
    analytics.recordEvent('color_select', `Probó ${swatch.name} en Laboratorio Automotriz`, {
      color: `${swatch.name} ${swatch.code}`,
      hex: swatch.hex,
      finish: swatch.finishType,
    });
    if (onSelectColor) onSelectColor(swatch);
  };

  const handleWhatsAppColor = (swatch: ColorSwatch) => {
    analytics.recordEvent('whatsapp_trigger', `Solicitó fórmula automotriz ${swatch.name} (${swatch.code})`, {
      color: `${swatch.name} ${swatch.code}`,
      source: 'color_studio_modal',
    });
    const msg = `Hola Color Center Automotriz Valledupar, deseo preparar la fórmula ${swatch.name} (Código: ${swatch.code} - ${swatch.finishType}) de Sherwin-Williams Automotive. ¿En cuánto tiempo me tienen lista la mezcla para despacho o retiro?`;
    window.open(`${STORE_INFO.whatsappUrl}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const finishFilters = [
    { id: 'todos', label: 'Todos los Acabados' },
    { id: 'Perlado Tricapa', label: 'Perlados Tricapa' },
    { id: 'Metálico Fino', label: 'Metálicos Finos' },
    { id: 'Sólido Gloss PU', label: 'Sólidos Gloss PU' },
    { id: 'Satinado / Mate', label: 'Mate / Satinado' },
  ];

  const filteredSwatches = COLOR_SWATCHES.filter(
    (s) => activeFinishFilter === 'todos' || s.finishType === activeFinishFilter
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#00236f] via-[#003882] to-[#006398] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shadow-inner">
              <Car className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-headline font-bold text-lg sm:text-xl text-white">
                Simulador & Laboratorio de Color Automotriz
              </h3>
              <p className="text-xs text-blue-100">
                Fórmulas OEM Sherwin-Williams Automotive Finishes para Valledupar
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-white/15 transition-colors"
            aria-label="Cerrar abanico de color"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 bg-white">
          {/* Top Interactive Automotive Car Paint Simulation Stage */}
          <div className="space-y-4">
            <CarPaintSimulator
              color={selectedSwatch}
              onSelectColor={handleChooseColor}
              interactive={true}
            />

            {/* Description & Recommended Vehicle Brands Card */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
              <div className="md:col-span-8 space-y-2">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-inner"
                    style={{ backgroundColor: selectedSwatch.hex }}
                  />
                  <h4 className="font-headline font-bold text-lg text-[#00236f]">
                    {selectedSwatch.name} ({selectedSwatch.code})
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-blue-100 text-[#00236f]">
                    {selectedSwatch.finishType}
                  </span>
                </div>
                <p className="font-body text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {selectedSwatch.description}
                </p>
                <div className="text-xs text-slate-700">
                  <span className="font-bold text-[#00236f]">Modelos recomendados: </span>
                  <span>{selectedSwatch.carModelSuggestion}</span>
                </div>
              </div>

              <div className="md:col-span-4 flex flex-col gap-2 justify-center">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-mono shadow-sm">
                  <span className="text-slate-500 font-bold">HEX:</span>
                  <span className="font-bold text-slate-900">{selectedSwatch.hex}</span>
                  <button
                    type="button"
                    onClick={() => handleCopyHex(selectedSwatch.hex)}
                    className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-slate-100 hover:bg-slate-200 text-[#00236f] transition-colors"
                  >
                    {copied ? '¡Copiado!' : 'Copiar'}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleWhatsAppColor(selectedSwatch)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold shadow-md hover:shadow-lg active:scale-95 transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Pedir fórmula por WhatsApp</span>
                </button>
              </div>
            </div>
          </div>

          {/* Filter Chips by Finish Type */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Catálogo de Tonos Automotrices ({filteredSwatches.length} fórmulas)
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {finishFilters.map((flt) => (
                <button
                  key={flt.id}
                  type="button"
                  onClick={() => setActiveFinishFilter(flt.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    activeFinishFilter === flt.id
                      ? 'bg-[#00236f] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {flt.label}
                </button>
              ))}
            </div>

            {/* Grid of Swatches */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {filteredSwatches.map((swatch) => {
                const isCurrent = selectedSwatch.id === swatch.id;
                return (
                  <button
                    key={swatch.id}
                    type="button"
                    onClick={() => handleChooseColor(swatch)}
                    className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      isCurrent
                        ? 'border-[#00236f] bg-blue-50/70 ring-2 ring-[#00236f] shadow-md'
                        : 'border-slate-200 bg-white hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    <div>
                      <div
                        className="w-full h-16 rounded-xl shadow-inner relative flex items-center justify-center overflow-hidden mb-2.5 border border-black/10"
                        style={{ backgroundColor: swatch.hex }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent" />
                        {isCurrent && (
                          <Check
                            className="w-5 h-5 drop-shadow-md relative z-10"
                            style={{ color: swatch.textColor }}
                          />
                        )}
                      </div>
                      <h5 className="font-headline font-bold text-xs text-[#00236f] truncate">
                        {swatch.name}
                      </h5>
                      <p className="text-[10px] text-slate-500 font-mono truncate">
                        {swatch.code}
                      </p>
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                      <span className="font-bold text-[#006398] truncate">
                        {swatch.finishType}
                      </span>
                      <span className="text-slate-400 font-medium">Ver</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-[#006398]" />
            <span>Fórmulas de fábrica computarizadas Sherwin-Williams Automotive</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 text-slate-800 font-bold hover:bg-slate-300 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
