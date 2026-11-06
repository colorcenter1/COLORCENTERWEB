import React, { useState } from 'react';
import { STORE_INFO, COLOR_SWATCHES } from '../data/mockData';
import { ColorSwatch } from '../types';
import { analytics } from '../services/analytics';
import { ShieldCheck, MessageCircle, ArrowRight, Car, Sparkles, Check, Clock, Cpu, Sliders, Layers } from 'lucide-react';
import { CarPaintSimulator } from './CarPaintSimulator';

interface HeroSectionProps {
  onOpenColorStudio: () => void;
  onExploreProducts: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenColorStudio,
  onExploreProducts,
}) => {
  const [selectedColor, setSelectedColor] = useState<ColorSwatch>(COLOR_SWATCHES[0]);
  const [previewMode, setPreviewMode] = useState<'car' | 'can'>('car');

  const handleSelectColor = (swatch: ColorSwatch) => {
    setSelectedColor(swatch);
    analytics.recordEvent('color_select', `Probó color automotriz ${swatch.name} (${swatch.code})`, {
      color: `${swatch.name} ${swatch.code}`,
      hex: swatch.hex,
      finish: swatch.finishType,
    });
  };

  const handleWhatsAppCta = () => {
    analytics.recordEvent('whatsapp_trigger', 'Hero Asesoría Automotriz', {
      source: 'hero_primary_cta',
      selectedColor: `${selectedColor.name} (${selectedColor.code})`,
    });
  };

  const trendSwatches = COLOR_SWATCHES.slice(0, 5);

  return (
    <section className="relative overflow-hidden pt-4 sm:pt-8 pb-12 sm:pb-16 bg-white transition-colors duration-300">
      {/* Ambient background glow accents based on automotive color */}
      <div
        className="absolute -top-24 right-0 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: selectedColor.hex }}
      />
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 space-y-6">
        {/* 1. Official Automotive Distributor Banner (Clean White Card) */}
        <div className="bg-white border-2 border-blue-100 rounded-2xl p-3.5 sm:p-4 shadow-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#00236f] dark:bg-blue-700 flex items-center justify-center shrink-0 shadow-sm text-white">
              <ShieldCheck className="w-5 h-5 text-sky-300" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-bold text-[#006398] dark:text-sky-400 uppercase tracking-wider truncate">
                Distribuidor Oficial Autorizado
              </span>
              <span className="font-headline text-sm sm:text-base font-extrabold text-slate-900 dark:text-white truncate">
                Sherwin-Williams Automotive Finishes • Valledupar
              </span>
            </div>
          </div>

          <a
            href={`${STORE_INFO.whatsappUrl}?text=${encodeURIComponent('Hola Color Center Automotriz, vi su página web y deseo consultar disponibilidad de un color automotriz por código.')}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppCta}
            className="shrink-0 inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm active:scale-95 transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Chat con Asesor</span>
          </a>
        </div>

        {/* 2. Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Text & Interactive Automotive Swatches */}
          <div className="lg:col-span-7 flex flex-col space-y-5 sm:space-y-6">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 w-fit text-[#006398] text-xs font-bold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Espectrofotómetro Óptico 5 Ángulos • +80,000 Fórmulas OEM</span>
            </div>

            {/* Headline */}
            <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#00236f] tracking-tight leading-[1.15]">
              El color exacto de tu vehículo,{' '}
              <span className="text-[#006398]">preparado en minutos</span>
            </h1>

            {/* Subtitle */}
            <p className="font-body text-base sm:text-lg text-slate-700 max-w-xl leading-relaxed">
              Pinturas automotrices Sherwin-Williams de máxima resistencia. Sistemas bicapa computarizados, barnices poliuretano 2K de alto brillo y despacho exprés a talleres en Valledupar.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <a
                href={`${STORE_INFO.whatsappUrl}?text=${encodeURIComponent(`Hola Color Center Automotriz, deseo cotizar la pintura para mi vehículo. Me interesa el tono ${selectedColor.name} (${selectedColor.code} - ${selectedColor.finishType}) o consultar por mi código de chasis.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppCta}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-headline text-sm sm:text-base font-bold shadow-lg shadow-emerald-500/25 active:scale-95 transition-all min-h-[48px]"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Cotizar por código o foto</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>

              <button
                onClick={onExploreProducts}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-[#00236f] border border-slate-300 text-sm font-bold shadow-sm transition-all min-h-[48px]"
              >
                <Car className="w-4 h-4 text-[#006398]" />
                <span>Ver líneas y barnices 2K</span>
              </button>
            </div>

            {/* Interactive Live Automotive Trend Swatch Selector (Clean White Card) */}
            <div className="pt-3 flex flex-col space-y-2.5 bg-slate-50/90 p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-slate-600">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Tendencias en Pintura Automotriz</span>
                </div>
                <button
                  onClick={onOpenColorStudio}
                  className="font-bold text-[#006398] hover:underline flex items-center gap-1"
                >
                  <span>Ver simulador completo</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Swatches buttons */}
              <div className="grid grid-cols-5 gap-2">
                {trendSwatches.map((swatch) => {
                  const isSelected = selectedColor.id === swatch.id;
                  return (
                    <button
                      key={swatch.id}
                      onClick={() => handleSelectColor(swatch)}
                      type="button"
                      aria-label={`Seleccionar acabado automotriz ${swatch.name}`}
                      className={`group flex flex-col items-center gap-1 p-1 sm:p-1.5 rounded-xl transition-all duration-200 ${
                        isSelected
                          ? 'ring-2 ring-[#006398] dark:ring-sky-400 bg-sky-50 dark:bg-sky-950/60 scale-102 shadow-sm'
                          : 'bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      <div
                        className="w-full h-10 sm:h-12 rounded-lg shadow-inner relative flex items-center justify-center overflow-hidden transition-transform group-hover:scale-102 border border-black/10"
                        style={{ backgroundColor: swatch.hex }}
                      >
                        {/* Metallic reflection shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 to-transparent pointer-events-none" />
                        {isSelected && (
                          <Check
                            className="w-4 h-4 drop-shadow-md relative z-10"
                            style={{ color: swatch.textColor }}
                          />
                        )}
                      </div>
                      <span className="text-[11px] sm:text-xs font-bold text-slate-800 dark:text-slate-200 truncate w-full text-center">
                        {swatch.tag}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic feedback on selected color */}
              <div
                className="mt-1 p-2.5 rounded-xl border flex items-center justify-between text-xs transition-colors"
                style={{
                  backgroundColor: `${selectedColor.hex}15`,
                  borderColor: `${selectedColor.hex}40`,
                }}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                    style={{ backgroundColor: selectedColor.hex }}
                  />
                  <div className="truncate">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {selectedColor.name} ({selectedColor.code})
                    </span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-semibold ml-2">
                      [{selectedColor.finishType}]
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 hidden sm:inline ml-1.5">
                      • {selectedColor.carModelSuggestion}
                    </span>
                  </div>
                </div>
                <span className="font-mono font-semibold text-slate-600 dark:text-slate-300 shrink-0 ml-2">
                  {selectedColor.hex}
                </span>
              </div>
            </div>
          </div>

          {/* Right Visual Showcase Column with Automotive Simulation */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white p-3 sm:p-4 rounded-3xl shadow-xl border border-slate-200 transition-colors">
              {/* Preview mode toggle */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-[#006398]" />
                    Simulación Carrocería
                  </span>
                </div>
                <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium">
                  <button
                    onClick={() => setPreviewMode('car')}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      previewMode === 'car'
                        ? 'bg-white text-[#00236f] shadow-sm font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Vehículo
                  </button>
                  <button
                    onClick={() => setPreviewMode('can')}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      previewMode === 'can'
                        ? 'bg-white text-[#00236f] shadow-sm font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Lata & Barniz
                  </button>
                </div>
              </div>

              {/* Visual Display Container */}
              <div className="relative w-full rounded-2xl overflow-hidden transition-all">
                {previewMode === 'car' ? (
                  <CarPaintSimulator
                    color={selectedColor}
                    onSelectColor={handleSelectColor}
                    interactive={true}
                  />
                ) : (
                  /* Can Mode */
                  <div
                    className="w-full h-[340px] flex flex-col items-center justify-center p-6 text-center transition-colors duration-500 relative bg-slate-50 rounded-2xl border border-slate-200"
                    style={{ backgroundColor: `${selectedColor.hex}18` }}
                  >
                    <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden shadow-xl bg-white p-2 border border-slate-200">
                      <img
                        src={STORE_INFO.heroCanImage}
                        alt="Lata oficial de pintura automotriz Sherwin-Williams Ultra 7000"
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <div className="absolute bottom-3 left-3 bg-[#00236f] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                        Sherwin-Williams Auto
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="inline-flex items-center gap-1 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Formulación computarizada en 5 minutos</span>
                      </div>
                      <h3 className="font-headline font-bold text-base text-slate-900 mt-1">
                        Ultra 7000® & Barniz 2K CC920 HS
                      </h3>
                      <p className="text-xs text-slate-600">
                        Brillo espejo con filtro UV extremo para el calor del Cesar
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Quick Feature Pill */}
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                  <Cpu className="w-4 h-4 text-[#006398]" />
                  Espectrofotómetro 5 Ángulos
                </span>
                <span className="flex items-center gap-1.5 font-semibold text-emerald-700">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  Despacho Exprés a Cabina
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
