import React, { useState } from 'react';
import { ColorSwatch } from '../types';
import { STORE_INFO } from '../data/mockData';
import { analytics } from '../services/analytics';
import {
  Lightbulb,
  MessageCircle,
  Layers,
  Check,
  Copy,
  Palette,
  Info
} from 'lucide-react';

interface CarPaintSimulatorProps {
  color: ColorSwatch;
  interactive?: boolean;
  onSelectColor?: (swatch: ColorSwatch) => void;
  className?: string;
  compact?: boolean;
}

export type CarModelType = 'coupe' | 'pickup' | 'sedan';
export type CameraViewType = 'threeQuarter' | 'side' | 'front';

export const CarPaintSimulator: React.FC<CarPaintSimulatorProps> = ({
  color,
  interactive = true,
  onSelectColor,
  className = '',
  compact = false,
}) => {
  const [carModel, setCarModel] = useState<CarModelType>('coupe');
  const [cameraView, setCameraView] = useState<CameraViewType>('threeQuarter');
  const [headlightsOn, setHeadlightsOn] = useState<boolean>(true);
  const [activeFinish, setActiveFinish] = useState<ColorSwatch['finishType']>(color.finishType || 'Perlado Tricapa');
  const [customHex, setCustomHex] = useState<string>(color.hex);
  const [dualToneRoof, setDualToneRoof] = useState<boolean>(false);
  const [copiedHex, setCopiedHex] = useState<boolean>(false);

  // Sync if parent color updates
  React.useEffect(() => {
    setCustomHex(color.hex);
    if (color.finishType) {
      setActiveFinish(color.finishType);
    }
  }, [color]);

  const currentColorHex = customHex;

  // Finish specular gloss & reflection parameters
  const getFinishConfig = () => {
    switch (activeFinish) {
      case 'Perlado Tricapa':
        return {
          glossOpacity: 0.65,
          shimmerOpacity: 0.45,
          filterId: 'pearlGlow',
          badgeText: 'Perlado 3-Capas OEM',
          description: 'Efecto nacarado con mica tridimensional y barniz CC920 HS.',
        };
      case 'Metálico Fino':
        return {
          glossOpacity: 0.75,
          shimmerOpacity: 0.6,
          filterId: 'metallicFlakes',
          badgeText: 'Aluminio Metalizado',
          description: 'Pigmento de aluminio fino Sherwin-Williams Ultra 7000.',
        };
      case 'Sólido Gloss PU':
        return {
          glossOpacity: 0.85,
          shimmerOpacity: 0.2,
          filterId: 'none',
          badgeText: 'Brillo Espejo PU',
          description: 'Esmalte poliuretano 2K de alto poder cubriente y secado rápido.',
        };
      case 'Satinado / Mate':
        return {
          glossOpacity: 0.15,
          shimmerOpacity: 0.05,
          filterId: 'none',
          badgeText: 'Mate Satinado',
          description: 'Barniz mate automotriz anti-rayones y resistente a rayos UV.',
        };
      default:
        return {
          glossOpacity: 0.6,
          shimmerOpacity: 0.3,
          filterId: 'none',
          badgeText: 'Acabado Profesional',
          description: 'Línea automotriz Sherwin-Williams.',
        };
    }
  };

  const finishConfig = getFinishConfig();

  const handleCopyHex = () => {
    navigator.clipboard.writeText(currentColorHex);
    setCopiedHex(true);
    setTimeout(() => setCopiedHex(false), 2000);
  };

  const handleWhatsAppQuote = () => {
    const modelNames = {
      coupe: 'Coupé Deportivo GT',
      pickup: 'Camioneta Pickup 4x4 / All-Terrain',
      sedan: 'Sedán Ejecutivo de Lujo',
    };
    analytics.recordEvent('whatsapp_trigger', `Cotizó simulador: ${modelNames[carModel]} en ${color.name}`, {
      model: carModel,
      color: `${color.name} (${currentColorHex})`,
      finish: activeFinish,
      dualTone: dualToneRoof,
    });
    const msg = `Hola Color Center Valledupar, vi el simulador 3D automotriz para un ${modelNames[carModel]} en color ${color.name} (HEX: ${currentColorHex} - ${activeFinish}${dualToneRoof ? ' con techo bitono' : ''}). Deseo cotizar base bicapa, barniz 2K y catalizador para mi vehículo.`;
    window.open(`${STORE_INFO.whatsappUrl}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const modelLabels = {
    coupe: { title: 'Coupé GT', icon: '🏎️', desc: 'Carrocería deportiva aerodinámica' },
    pickup: { title: 'Pickup 4x4', icon: '🛻', desc: 'Doble cabina todoterreno con platón' },
    sedan: { title: 'Sedán', icon: '🚗', desc: 'Línea ejecutiva de 4 puertas' },
  };

  return (
    <div className={`relative flex flex-col rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-xl shadow-blue-950/5 select-none ${className}`}>
      {/* Studio Lighting Glow: Crisp Softbox Overhead Lighting */}
      <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-blue-100/40 via-sky-50/20 to-transparent blur-2xl pointer-events-none" />
      <div className="absolute top-1 left-1/4 right-1/4 h-[2px] bg-white blur-[0.5px] pointer-events-none" />

      {/* Top Header Controls: Car Model, Camera Angle, LED toggle (Clean White & Navy) */}
      <div className="relative z-20 flex flex-wrap items-center justify-between p-3 sm:p-4 gap-2 border-b border-slate-200/90 bg-white/95 backdrop-blur-md text-xs">
        {/* Model Selector */}
        <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-2xl border border-slate-200">
          {(['coupe', 'pickup', 'sedan'] as CarModelType[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setCarModel(m);
                analytics.recordEvent('product_view', `Simulador: Modelo ${modelLabels[m].title}`);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all ${
                carModel === m
                  ? 'bg-[#00236f] text-white shadow-md border border-sky-400/40'
                  : 'text-slate-600 hover:text-[#00236f] hover:bg-white'
              }`}
            >
              <span>{modelLabels[m].icon}</span>
              <span>{modelLabels[m].title}</span>
            </button>
          ))}
        </div>

        {/* Camera Views */}
        <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-2xl border border-slate-200">
          <button
            type="button"
            onClick={() => setCameraView('threeQuarter')}
            className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
              cameraView === 'threeQuarter'
                ? 'bg-[#006398] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#00236f] hover:bg-white'
            }`}
          >
            3/4 Frontal
          </button>
          <button
            type="button"
            onClick={() => setCameraView('side')}
            className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
              cameraView === 'side'
                ? 'bg-[#006398] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#00236f] hover:bg-white'
            }`}
          >
            Perfil Lateral
          </button>
          <button
            type="button"
            onClick={() => setCameraView('front')}
            className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
              cameraView === 'front'
                ? 'bg-[#006398] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#00236f] hover:bg-white'
            }`}
          >
            Frente Directo
          </button>
        </div>

        {/* Accessory Toggles: Headlights & Bitono */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setHeadlightsOn(!headlightsOn)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-[11px] font-bold transition-all ${
              headlightsOn
                ? 'bg-amber-100/80 border-amber-300 text-amber-900 shadow-sm'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
            title="Encender o apagar faros LED automotrices"
          >
            <Lightbulb className={`w-3.5 h-3.5 ${headlightsOn ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
            <span className="hidden xs:inline">Luces LED</span>
          </button>

          <button
            type="button"
            onClick={() => setDualToneRoof(!dualToneRoof)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-[11px] font-bold transition-all ${
              dualToneRoof
                ? 'bg-blue-100/80 border-blue-300 text-[#00236f] shadow-sm'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
            title="Pintar techo negro brillante (Bitono)"
          >
            <Layers className="w-3.5 h-3.5 text-[#006398]" />
            <span className="hidden xs:inline">Techo Bitono</span>
          </button>
        </div>
      </div>

      {/* Main Automotive Studio Canvas: White High-End Photography Showroom */}
      <div className="relative w-full h-[340px] sm:h-[440px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-100/70 via-white to-slate-100/80">
        {/* Soft Radial Center Stage Studio Spotlight */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent pointer-events-none" />

        {/* Studio Floor Horizon Line & Crisp Guideline */}
        <div className="absolute bottom-16 sm:bottom-20 inset-x-0 h-[1px] bg-slate-200/90 pointer-events-none" />
        <div className="absolute bottom-28 inset-x-12 h-[1px] bg-slate-100 pointer-events-none" />

        {/* Dynamic Studio Contact Ground Shadow under Tires */}
        <div className="absolute bottom-6 sm:bottom-10 w-[84%] max-w-[700px] h-12 bg-slate-900/18 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-5 sm:bottom-8 w-[74%] max-w-[600px] h-6 bg-slate-950/35 rounded-full blur-md pointer-events-none" />

        {/* Golden Yellow Headlight Beams (Matching official logo headlights) */}
        {headlightsOn && (
          <>
            {cameraView === 'threeQuarter' && (
              <div className="absolute bottom-14 right-2 sm:right-6 w-80 h-44 bg-gradient-to-r from-amber-300/45 via-amber-200/20 to-transparent blur-2xl rotate-12 pointer-events-none" />
            )}
            {cameraView === 'front' && (
              <>
                <div className="absolute bottom-8 left-4 w-56 h-40 bg-gradient-to-t from-amber-300/45 via-amber-100/20 to-transparent blur-2xl -rotate-15 pointer-events-none" />
                <div className="absolute bottom-8 right-4 w-56 h-40 bg-gradient-to-t from-amber-300/45 via-amber-100/20 to-transparent blur-2xl rotate-15 pointer-events-none" />
              </>
            )}
            {cameraView === 'side' && (
              <div className="absolute bottom-14 right-0 w-72 h-36 bg-gradient-to-r from-amber-300/40 via-amber-100/20 to-transparent blur-2xl pointer-events-none" />
            )}
          </>
        )}

        {/* ==================================================================== */}
        {/* HIGH-FIDELITY VECTOR AUTOMOTIVE MODELS (CAD ANATOMY)                 */}
        {/* ==================================================================== */}
        <div className="relative z-10 w-[96%] sm:w-[90%] max-w-[760px] aspect-[16/9] flex items-center justify-center transition-all duration-300">
          <svg
            viewBox="0 0 900 500"
            className="w-full h-full drop-shadow-[0_22px_40px_rgba(0,0,0,0.85)]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Metallic micro flake filter */}
              <filter id="metallicFlakes" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
                <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.18 0" in="noise" result="coloredNoise" />
                <feComposite operator="in" in="coloredNoise" in2="SourceGraphic" result="sparkles" />
                <feBlend mode="screen" in="SourceGraphic" in2="sparkles" />
              </filter>

              {/* Dynamic Body Base Gradient (curved reflection) */}
              <linearGradient id="bodyDynamicGrad" x1="0%" y1="0%" x2="100%" y2="80%">
                <stop offset="0%" stopColor={currentColorHex} stopOpacity="1" />
                <stop offset="30%" stopColor={currentColorHex} stopOpacity="0.95" />
                <stop offset="65%" stopColor="#080d19" stopOpacity="0.6" />
                <stop offset="100%" stopColor={currentColorHex} stopOpacity="0.85" />
              </linearGradient>

              {/* Body Top Highlight (Sky/Studio Softbox Reflection) */}
              <linearGradient id="clearCoatGloss" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity={finishConfig.glossOpacity} />
                <stop offset="40%" stopColor="#ffffff" stopOpacity="0.06" />
                <stop offset="75%" stopColor="#000000" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity={finishConfig.glossOpacity * 0.4} />
              </linearGradient>

              {/* Tinted Automotive Glass Gradient */}
              <linearGradient id="tintedGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#060912" stopOpacity="0.96" />
                <stop offset="40%" stopColor="#1e293b" stopOpacity="0.9" />
                <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#0b1120" stopOpacity="0.96" />
              </linearGradient>

              {/* Machined Alloy Wheel Gradient */}
              <radialGradient id="alloyRimGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="50%" stopColor="#94a3b8" />
                <stop offset="80%" stopColor="#475569" />
                <stop offset="100%" stopColor="#0f172a" />
              </radialGradient>

              {/* Carbon Grille Pattern */}
              <pattern id="carbonMesh" width="8" height="8" patternUnits="userSpaceOnUse">
                <rect width="8" height="8" fill="#080c14" />
                <path d="M0 0 L4 4 L0 8 Z M4 4 L8 0 L8 8 Z" fill="#141c2c" opacity="0.6" />
              </pattern>
            </defs>

            {/* ============================================================= */}
            {/* 1. COUPÉ GT MODEL                                            */}
            {/* ============================================================= */}
            {carModel === 'coupe' && (
              <g id="modelCoupe">
                {/* --- 1.1 COUPÉ: 3/4 FRONTAL VIEW --- */}
                {cameraView === 'threeQuarter' && (
                  <g id="coupeThreeQuarter">
                    {/* Undercarriage dark shadow plate & front splitter */}
                    <path d="M115 375 L790 375 L805 365 L110 365 Z" fill="#020408" />
                    <rect x="290" y="366" width="310" height="7" rx="2" fill="#0f172a" />

                    {/* Rear Wheel (Alloy + Rubber, NOT painted with body color) */}
                    <g id="cTqRearWheel">
                      <ellipse cx="230" cy="345" rx="58" ry="62" fill="#070a12" stroke="#1f2937" strokeWidth="4" />
                      <ellipse cx="230" cy="345" rx="46" ry="50" fill="#1e293b" />
                      <ellipse cx="230" cy="345" rx="34" ry="38" fill="#475569" stroke="#334155" strokeWidth="2" />
                      <path d="M210 320 Q225 310 240 315 L240 330 Q225 325 212 330 Z" fill="#e11d48" />
                      <ellipse cx="230" cy="345" rx="42" ry="46" fill="none" stroke="url(#alloyRimGrad)" strokeWidth="4.5" />
                      <line x1="230" y1="300" x2="230" y2="390" stroke="#cbd5e1" strokeWidth="3" />
                      <line x1="188" y1="345" x2="272" y2="345" stroke="#cbd5e1" strokeWidth="3" />
                      <line x1="200" y1="315" x2="260" y2="375" stroke="#cbd5e1" strokeWidth="3" />
                      <line x1="200" y1="375" x2="260" y2="315" stroke="#cbd5e1" strokeWidth="3" />
                      <circle cx="230" cy="345" r="9" fill="#0f172a" stroke="#94a3b8" strokeWidth="2" />
                    </g>

                    {/* Front Wheel */}
                    <g id="cTqFrontWheel">
                      <ellipse cx="665" cy="345" rx="64" ry="68" fill="#070a12" stroke="#1f2937" strokeWidth="4" />
                      <ellipse cx="665" cy="345" rx="52" ry="56" fill="#1e293b" />
                      <ellipse cx="665" cy="345" rx="38" ry="42" fill="#475569" stroke="#334155" strokeWidth="2" />
                      <path d="M640 320 Q660 310 680 315 L680 332 Q660 325 642 332 Z" fill="#e11d48" />
                      <ellipse cx="665" cy="345" rx="48" ry="52" fill="none" stroke="url(#alloyRimGrad)" strokeWidth="5" />
                      <line x1="665" y1="295" x2="665" y2="395" stroke="#cbd5e1" strokeWidth="3.5" />
                      <line x1="619" y1="345" x2="711" y2="345" stroke="#cbd5e1" strokeWidth="3.5" />
                      <line x1="631" y1="312" x2="699" y2="378" stroke="#cbd5e1" strokeWidth="3.5" />
                      <line x1="631" y1="378" x2="699" y2="312" stroke="#cbd5e1" strokeWidth="3.5" />
                      <circle cx="665" cy="345" r="11" fill="#0f172a" stroke="#94a3b8" strokeWidth="2.5" />
                    </g>

                    {/* BODY PANELS (LITERALLY PAINTED IN CHOSEN CAR PAINT) */}
                    <g id="cTqBodyPanels">
                      {/* Sculpted Coupé silhouette */}
                      <path
                        d="M110 325 
                           C110 290, 135 270, 165 265
                           L220 260
                           C245 200, 305 145, 395 135
                           L575 135
                           C635 135, 715 195, 755 245
                           L815 270
                           C840 282, 850 305, 840 335
                           L825 365
                           C810 375, 790 375, 755 375
                           L725 375
                           C725 305, 695 275, 650 275
                           C605 275, 580 305, 580 375
                           L300 375
                           C300 305, 275 275, 230 275
                           C185 275, 160 305, 160 375
                           L125 375
                           C115 375, 110 350, 110 325 Z"
                        fill="url(#bodyDynamicGrad)"
                        stroke="#020617"
                        strokeWidth="2.5"
                      />
                      <path
                        d="M110 325 C110 290, 135 270, 165 265 L220 260 C245 200, 305 145, 395 135 L575 135 C635 135, 715 195, 755 245 L815 270 C840 282, 850 305, 840 335 L825 365 C810 375, 790 375, 755 375 L725 375 C725 305, 695 275, 650 275 C605 275, 580 305, 580 375 L300 375 C300 305, 275 275, 230 275 C185 275, 160 305, 160 375 L125 375 C115 375, 110 350, 110 325 Z"
                        fill={currentColorHex}
                        opacity="0.82"
                      />

                      {/* Dual-Tone Roof Option */}
                      {dualToneRoof && (
                        <path
                          d="M260 250 C290 185, 345 138, 415 135 L565 135 C615 135, 665 175, 695 220 L685 245 L260 250 Z"
                          fill="#05070d"
                          stroke="#0f172a"
                          strokeWidth="1.5"
                        />
                      )}

                      {/* Coupé Aerodynamic Beltline & Flares */}
                      <path
                        d="M165 265 Q390 260 610 258 Q720 265 810 295 L810 302 Q715 270 610 264 Q390 265 165 272 Z"
                        fill="url(#clearCoatGloss)"
                      />
                      <path
                        d="M565 170 Q660 215 790 270 L775 300 Q655 255 540 205 Z"
                        fill="url(#clearCoatGloss)"
                        opacity="0.75"
                      />
                      <path
                        d="M140 280 Q215 265 285 275 Q215 285 140 310 Z"
                        fill="#ffffff"
                        opacity={finishConfig.glossOpacity * 0.5}
                      />

                      {/* Door Cutlines & Handles */}
                      <path d="M405 165 L375 370" stroke="#000000" strokeWidth="2.5" opacity="0.65" />
                      <rect x="420" y="235" width="34" height="7" rx="3.5" fill="#0b0f19" stroke="#94a3b8" strokeWidth="1" />

                      {/* Side Mirror */}
                      <path
                        d="M580 185 Q620 180 625 198 Q610 215 575 210 Z"
                        fill={currentColorHex}
                        stroke="#020617"
                        strokeWidth="1.8"
                      />
                      <path d="M580 186 Q615 183 620 195 Z" fill="#ffffff" opacity={finishConfig.glossOpacity} />
                    </g>

                    {/* UNPAINTED WINDOWS (REAL TINTED GLASS) */}
                    <g id="cTqWindows">
                      <path
                        d="M275 240 Q315 180 385 155 L385 235 Q325 240 275 240 Z"
                        fill="url(#tintedGlassGrad)"
                        stroke="#050811"
                        strokeWidth="3"
                      />
                      <path
                        d="M400 155 L545 150 L545 235 L400 235 Z"
                        fill="url(#tintedGlassGrad)"
                        stroke="#050811"
                        strokeWidth="3"
                      />
                      <path
                        d="M558 150 L685 225 L558 235 Z"
                        fill="url(#tintedGlassGrad)"
                        stroke="#050811"
                        strokeWidth="3"
                      />
                      <path d="M310 235 L510 155 L535 155 L335 235 Z" fill="#ffffff" opacity="0.22" />
                    </g>

                    {/* UNPAINTED HEADLIGHTS & OPTICS */}
                    <g id="cTqHeadlight">
                      <path
                        d="M775 260 Q830 278 835 298 Q800 310 765 295 Z"
                        fill={headlightsOn ? '#fffbeb' : '#1e293b'}
                        stroke="#475569"
                        strokeWidth="2"
                      />
                      <circle cx="795" cy="285" r="9" fill={headlightsOn ? '#fef08a' : '#334155'} />
                      <circle cx="818" cy="290" r="7" fill={headlightsOn ? '#fef08a' : '#334155'} />
                      <path
                        d="M780 268 Q825 282 828 296"
                        stroke={headlightsOn ? '#fde047' : '#94a3b8'}
                        strokeWidth="2.5"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </g>

                    {/* Taillight cluster */}
                    <path
                      d="M112 305 Q128 300 148 300 L140 325 Q115 325 112 305 Z"
                      fill="#e11d48"
                      stroke="#881337"
                      strokeWidth="1.5"
                    />
                  </g>
                )}

                {/* --- 1.2 COUPÉ: SIDE PROFILE VIEW --- */}
                {cameraView === 'side' && (
                  <g id="coupeSide">
                    {/* Undercarriage */}
                    <rect x="150" y="360" width="600" height="8" rx="2" fill="#020408" />

                    {/* Rear Wheel */}
                    <circle cx="230" cy="335" r="58" fill="#070a12" stroke="#1f2937" strokeWidth="4" />
                    <circle cx="230" cy="335" r="45" fill="#1e293b" />
                    <circle cx="230" cy="335" r="32" fill="#475569" stroke="#334155" strokeWidth="2" />
                    <path d="M210 310 Q225 300 240 305 L240 320 Q225 315 212 320 Z" fill="#e11d48" />
                    <circle cx="230" cy="335" r="40" fill="none" stroke="url(#alloyRimGrad)" strokeWidth="4" />
                    <line x1="230" y1="295" x2="230" y2="375" stroke="#cbd5e1" strokeWidth="3" />
                    <line x1="190" y1="335" x2="270" y2="335" stroke="#cbd5e1" strokeWidth="3" />
                    <circle cx="230" cy="335" r="8" fill="#0f172a" stroke="#94a3b8" strokeWidth="2" />

                    {/* Front Wheel */}
                    <circle cx="670" cy="335" r="58" fill="#070a12" stroke="#1f2937" strokeWidth="4" />
                    <circle cx="670" cy="335" r="45" fill="#1e293b" />
                    <circle cx="670" cy="335" r="32" fill="#475569" stroke="#334155" strokeWidth="2" />
                    <path d="M650 310 Q665 300 680 305 L680 320 Q665 315 652 320 Z" fill="#e11d48" />
                    <circle cx="670" cy="335" r="40" fill="none" stroke="url(#alloyRimGrad)" strokeWidth="4" />
                    <line x1="670" y1="295" x2="670" y2="375" stroke="#cbd5e1" strokeWidth="3" />
                    <line x1="630" y1="335" x2="710" y2="335" stroke="#cbd5e1" strokeWidth="3" />
                    <circle cx="670" cy="335" r="8" fill="#0f172a" stroke="#94a3b8" strokeWidth="2" />

                    {/* Coupé Fastback Bodywork */}
                    <path
                      d="M110 300 
                         C115 270, 150 260, 190 258 
                         C230 180, 310 140, 420 135 
                         L580 135 
                         C680 160, 740 220, 785 255 
                         L820 275 
                         C845 285, 840 320, 830 350 
                         L805 365 
                         L735 365 
                         C735 300, 705 275, 670 275 
                         C635 275, 605 300, 605 365 
                         L295 365 
                         C295 300, 265 275, 230 275 
                         C195 275, 165 300, 165 365 
                         L115 365 Z"
                      fill="url(#bodyDynamicGrad)"
                      stroke="#0f172a"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M110 300 C115 270, 150 260, 190 258 C230 180, 310 140, 420 135 L580 135 C680 160, 740 220, 785 255 L820 275 C845 285, 840 320, 830 350 L805 365 L735 365 C735 300, 705 275, 670 275 C635 275, 605 300, 605 365 L295 365 C295 300, 265 275, 230 275 C195 275, 165 300, 165 365 L115 365 Z"
                      fill={currentColorHex}
                      opacity="0.82"
                    />

                    {/* Dual Tone Roof */}
                    {dualToneRoof && (
                      <path
                        d="M260 235 C300 170, 370 138, 450 135 L580 135 C630 145, 680 180, 715 235 Z"
                        fill="#05070d"
                      />
                    )}

                    {/* Roofline Highlight */}
                    <path
                      d="M160 262 Q360 145 580 145 Q710 180 810 275"
                      stroke="#ffffff"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      opacity={finishConfig.glossOpacity}
                      fill="none"
                    />

                    {/* Windows Glass */}
                    <path
                      d="M275 235 C310 180, 360 150, 430 148 L565 148 L680 235 Z"
                      fill="url(#tintedGlassGrad)"
                      stroke="#0f172a"
                      strokeWidth="3"
                    />
                    <line x1="480" y1="148" x2="480" y2="235" stroke="#0f172a" strokeWidth="3" />

                    {/* Coupé Door Line */}
                    <path d="M480 148 L460 365" stroke="#000000" strokeWidth="2.5" opacity="0.6" />
                    <rect x="500" y="245" width="30" height="6" rx="3" fill="#0b0f19" stroke="#94a3b8" strokeWidth="1" />

                    {/* Side Lights */}
                    <path d="M815 275 L830 282 L822 295 Z" fill={headlightsOn ? '#fef08a' : '#475569'} />
                    <path d="M112 285 L125 285 L120 298 Z" fill="#e11d48" />
                  </g>
                )}

                {/* --- 1.3 COUPÉ: FRONT VIEW --- */}
                {cameraView === 'front' && (
                  <g id="coupeFront">
                    {/* Wide Low Profile Tires */}
                    <rect x="140" y="280" width="75" height="110" rx="18" fill="#070a12" stroke="#1f2937" strokeWidth="3" />
                    <rect x="685" y="280" width="75" height="110" rx="18" fill="#070a12" stroke="#1f2937" strokeWidth="3" />

                    {/* Aerodynamic Low Bodywork */}
                    <path
                      d="M185 270 
                         C205 180, 275 140, 355 130 
                         L545 130 
                         C625 140, 695 180, 715 270 
                         L750 315 
                         C760 365, 695 380, 630 380 
                         L270 380 
                         C205 380, 140 365, 150 315 Z"
                      fill="url(#bodyDynamicGrad)"
                      stroke="#020617"
                      strokeWidth="3"
                    />
                    <path
                      d="M185 270 C205 180, 275 140, 355 130 L545 130 C625 140, 695 180, 715 270 L750 315 C760 365, 695 380, 630 380 L270 380 C205 380, 140 365, 150 315 Z"
                      fill={currentColorHex}
                      opacity="0.82"
                    />

                    {/* Windshield */}
                    <path
                      d="M260 145 L640 145 L690 225 L210 225 Z"
                      fill="url(#tintedGlassGrad)"
                      stroke="#020617"
                      strokeWidth="3"
                    />
                    <rect x="425" y="152" width="50" height="12" rx="3" fill="#1e293b" />

                    {/* Honeycomb Sports Grille with Official Emblem */}
                    <rect x="290" y="270" width="320" height="75" rx="12" fill="#070b14" stroke="#1e293b" strokeWidth="2.5" />
                    <line x1="290" y1="295" x2="610" y2="295" stroke="#1f2937" strokeWidth="1.5" />
                    <line x1="290" y1="320" x2="610" y2="320" stroke="#1f2937" strokeWidth="1.5" />

                    {/* Official Company Logo in Center */}
                    <g transform="translate(425, 280)">
                      <circle cx="25" cy="25" r="22" fill="#000a30" stroke="#38bdf8" strokeWidth="1.5" />
                      <image href="/assets/aistudio/image_dab9c635.png" x="5" y="5" width="40" height="40" />
                    </g>

                    {/* License Plate Valledupar */}
                    <rect x="340" y="348" width="220" height="26" rx="4" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
                    <text x="450" y="366" textAnchor="middle" fontSize="13" fontWeight="900" fill="#00236f" fontFamily="monospace">
                      COLOR CENTER • VUP
                    </text>

                    {/* Sports Headlights Pair */}
                    <g id="cFrontLeftHeadlight">
                      <path
                        d="M175 255 Q255 245 285 260 Q275 295 190 285 Z"
                        fill={headlightsOn ? '#fffbeb' : '#1e293b'}
                        stroke="#475569"
                        strokeWidth="2.5"
                      />
                      <circle cx="215" cy="268" r="12" fill={headlightsOn ? '#fef08a' : '#334155'} />
                      <circle cx="245" cy="268" r="10" fill={headlightsOn ? '#fef08a' : '#334155'} />
                      {headlightsOn && <circle cx="225" cy="268" r="28" fill="#fde047" opacity="0.4" filter="blur(6px)" />}
                    </g>
                    <g id="cFrontRightHeadlight">
                      <path
                        d="M725 255 Q645 245 615 260 Q625 295 710 285 Z"
                        fill={headlightsOn ? '#fffbeb' : '#1e293b'}
                        stroke="#475569"
                        strokeWidth="2.5"
                      />
                      <circle cx="685" cy="268" r="12" fill={headlightsOn ? '#fef08a' : '#334155'} />
                      <circle cx="655" cy="268" r="10" fill={headlightsOn ? '#fef08a' : '#334155'} />
                      {headlightsOn && <circle cx="675" cy="268" r="28" fill="#fde047" opacity="0.4" filter="blur(6px)" />}
                    </g>
                  </g>
                )}
              </g>
            )}

            {/* ============================================================= */}
            {/* 2. PICKUP 4X4 (CAMIONETA DOBLE CABINA Y PLATÓN)                */}
            {/* ============================================================= */}
            {carModel === 'pickup' && (
              <g id="modelPickup">
                {/* --- 2.1 PICKUP: 3/4 FRONTAL VIEW --- */}
                {cameraView === 'threeQuarter' && (
                  <g id="pickupThreeQuarter">
                    {/* Undercarriage High Clearance & Skid Plate */}
                    <path d="M120 380 L790 380 L800 370 L110 370 Z" fill="#020408" />
                    {/* Running Board / Estribo lateral */}
                    <rect x="290" y="360" width="310" height="9" rx="3" fill="#1e293b" stroke="#334155" strokeWidth="1" />

                    {/* Heavy Duty Rear All-Terrain Wheel */}
                    <g id="pTqRearWheel">
                      <ellipse cx="230" cy="335" rx="64" ry="68" fill="#070a12" stroke="#1f2937" strokeWidth="5" />
                      {/* Deep treads */}
                      <ellipse cx="230" cy="335" rx="52" ry="56" fill="#1e293b" />
                      <ellipse cx="230" cy="335" rx="42" ry="46" fill="none" stroke="url(#alloyRimGrad)" strokeWidth="6" />
                      {/* 6-Lug Off-road spokes */}
                      <circle cx="230" cy="335" r="16" fill="#0f172a" stroke="#94a3b8" strokeWidth="2" />
                      <circle cx="230" cy="335" r="4" fill="#cbd5e1" />
                    </g>

                    {/* Front Heavy Duty Wheel */}
                    <g id="pTqFrontWheel">
                      <ellipse cx="670" cy="335" rx="68" ry="72" fill="#070a12" stroke="#1f2937" strokeWidth="5" />
                      <ellipse cx="670" cy="335" rx="56" ry="60" fill="#1e293b" />
                      <ellipse cx="670" cy="335" rx="46" ry="50" fill="none" stroke="url(#alloyRimGrad)" strokeWidth="6" />
                      <circle cx="670" cy="335" r="18" fill="#0f172a" stroke="#94a3b8" strokeWidth="2.5" />
                      <circle cx="670" cy="335" r="5" fill="#cbd5e1" />
                    </g>

                    {/* PICKUP CHASSIS & BED ROLL BAR (UNPAINTED MATTE BLACK) */}
                    <path d="M295 240 L315 130 L345 130 L325 240 Z" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                    <line x1="315" y1="130" x2="430" y2="130" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" />

                    {/* PICKUP BODYWORK (CABIN + CARGO BED - PAINTED IN COLOR) */}
                    <g id="pTqPaintedBody">
                      {/* Robust Pickup Silhouette: Flat high hood, upright cabin, open cargo bed at rear */}
                      <path
                        d="M110 320 
                           L110 240 
                           L300 240 
                           L305 130 
                           L555 130 
                           C610 130, 680 180, 715 220 
                           L815 225 
                           C840 235, 850 260, 840 310 
                           L820 355 
                           L750 355 
                           C750 280, 710 255, 660 255 
                           C610 255, 570 280, 570 355 
                           L305 355 
                           C305 280, 275 255, 230 255 
                           C185 255, 155 280, 155 355 
                           L115 355 Z"
                        fill="url(#bodyDynamicGrad)"
                        stroke="#020617"
                        strokeWidth="3"
                      />
                      <path
                        d="M110 320 L110 240 L300 240 L305 130 L555 130 C610 130, 680 180, 715 220 L815 225 C840 235, 850 260, 840 310 L820 355 L750 355 C750 280, 710 255, 660 255 C610 255, 570 280, 570 355 L305 355 C305 280, 275 255, 230 255 C185 255, 155 280, 155 355 L115 355 Z"
                        fill={currentColorHex}
                        opacity="0.82"
                      />

                      {/* Black Protective Wheel Arch Flares */}
                      <path d="M150 355 C150 270, 180 248, 230 248 C280 248, 310 270, 310 355" fill="none" stroke="#090d16" strokeWidth="8" />
                      <path d="M565 355 C565 270, 605 248, 660 248 C715 248, 755 270, 755 355" fill="none" stroke="#090d16" strokeWidth="8" />

                      {/* Dual Tone Roof */}
                      {dualToneRoof && (
                        <path d="M305 130 L555 130 L545 170 L305 170 Z" fill="#05070d" />
                      )}

                      {/* Pickup Power Bulge on Hood */}
                      <path d="M555 140 L715 220 L810 225 L735 250 L555 170 Z" fill="url(#clearCoatGloss)" opacity="0.6" />

                      {/* Bed Separation Line & Double Cab Doors */}
                      <line x1="300" y1="130" x2="300" y2="355" stroke="#000000" strokeWidth="3" opacity="0.8" />
                      <line x1="430" y1="130" x2="430" y2="355" stroke="#000000" strokeWidth="2.5" opacity="0.6" />
                      {/* Rugged Door Handles */}
                      <rect x="340" y="220" width="30" height="9" rx="2" fill="#090d16" stroke="#64748b" strokeWidth="1" />
                      <rect x="460" y="220" width="30" height="9" rx="2" fill="#090d16" stroke="#64748b" strokeWidth="1" />
                    </g>

                    {/* WINDOWS (UNPAINTED HIGH CLEAR GLASS) */}
                    <g id="pTqWindows">
                      <path d="M315 140 L420 140 L420 215 L315 215 Z" fill="url(#tintedGlassGrad)" stroke="#020617" strokeWidth="2.5" />
                      <path d="M435 140 L540 140 L650 215 L435 215 Z" fill="url(#tintedGlassGrad)" stroke="#020617" strokeWidth="2.5" />
                    </g>

                    {/* HEADLIGHTS (POWERFUL DUAL LED PROJECTORS) */}
                    <g id="pTqHeadlight">
                      <rect x="770" y="235" width="60" height="50" rx="6" fill={headlightsOn ? '#fffbeb' : '#1e293b'} stroke="#64748b" strokeWidth="2" />
                      <circle cx="790" cy="255" r="10" fill={headlightsOn ? '#fef08a' : '#334155'} />
                      <circle cx="815" cy="255" r="10" fill={headlightsOn ? '#fef08a' : '#334155'} />
                      {/* LED C-Clamp DRL */}
                      <path d="M825 240 L775 240 L775 280 L825 280" fill="none" stroke={headlightsOn ? '#fde047' : '#94a3b8'} strokeWidth="3" />
                    </g>
                  </g>
                )}

                {/* --- 2.2 PICKUP: SIDE PROFILE VIEW --- */}
                {cameraView === 'side' && (
                  <g id="pickupSide">
                    {/* High Clearance Frame & Side Steps */}
                    <rect x="150" y="365" width="600" height="12" rx="3" fill="#020408" />
                    <rect x="330" y="358" width="260" height="7" rx="3" fill="#1e293b" stroke="#475569" strokeWidth="1" />

                    {/* All-Terrain Deep Tread Wheels */}
                    <circle cx="230" cy="330" r="62" fill="#070a12" stroke="#1f2937" strokeWidth="5" />
                    <circle cx="230" cy="330" r="48" fill="#1e293b" />
                    <circle cx="230" cy="330" r="36" fill="none" stroke="url(#alloyRimGrad)" strokeWidth="6" />
                    <circle cx="230" cy="330" r="12" fill="#0f172a" />

                    <circle cx="670" cy="330" r="62" fill="#070a12" stroke="#1f2937" strokeWidth="5" />
                    <circle cx="670" cy="330" r="48" fill="#1e293b" />
                    <circle cx="670" cy="330" r="36" fill="none" stroke="url(#alloyRimGrad)" strokeWidth="6" />
                    <circle cx="670" cy="330" r="12" fill="#0f172a" />

                    {/* Pickup Sports Bar / Roll Bar */}
                    <path d="M340 240 L360 140 L395 140 L370 240 Z" fill="#090d16" stroke="#1e293b" strokeWidth="2" />

                    {/* Body Panels: Distinct Bed + Double Cab + High Flat Hood */}
                    <path
                      d="M110 320 
                         L110 235 
                         L340 235 
                         L360 140 
                         L590 140 
                         L675 225 
                         L825 230 
                         C845 235, 850 280, 835 340 
                         L805 355 
                         L745 355 
                         C745 285, 715 255, 670 255 
                         C625 255, 595 285, 595 355 
                         L305 355 
                         C305 285, 275 255, 230 255 
                         C185 255, 155 285, 155 355 
                         L115 355 Z"
                      fill="url(#bodyDynamicGrad)"
                      stroke="#0f172a"
                      strokeWidth="3"
                    />
                    <path
                      d="M110 320 L110 235 L340 235 L360 140 L590 140 L675 225 L825 230 C845 235, 850 280, 835 340 L805 355 L745 355 C745 285, 715 255, 670 255 C625 255, 595 285, 595 355 L305 355 C305 285, 275 255, 230 255 C185 255, 155 285, 155 355 L115 355 Z"
                      fill={currentColorHex}
                      opacity="0.82"
                    />

                    {/* Wheel Arch Moldings */}
                    <path d="M150 355 C150 270, 180 248, 230 248 C280 248, 310 270, 310 355" fill="none" stroke="#090d16" strokeWidth="8" />
                    <path d="M590 355 C590 270, 620 248, 670 248 C720 248, 750 270, 750 355" fill="none" stroke="#090d16" strokeWidth="8" />

                    {/* Windows */}
                    <path d="M375 148 L465 148 L465 225 L365 225 Z" fill="url(#tintedGlassGrad)" stroke="#090d16" strokeWidth="2.5" />
                    <path d="M480 148 L580 148 L655 225 L480 225 Z" fill="url(#tintedGlassGrad)" stroke="#090d16" strokeWidth="2.5" />

                    {/* Bed Seam & Door Lines */}
                    <line x1="340" y1="235" x2="340" y2="355" stroke="#000000" strokeWidth="3" opacity="0.8" />
                    <line x1="472" y1="148" x2="472" y2="355" stroke="#000000" strokeWidth="2.5" opacity="0.6" />

                    {/* Handles */}
                    <rect x="390" y="235" width="28" height="8" rx="2" fill="#090d16" stroke="#64748b" strokeWidth="1" />
                    <rect x="495" y="235" width="28" height="8" rx="2" fill="#090d16" stroke="#64748b" strokeWidth="1" />

                    {/* Vertical Tail Light */}
                    <rect x="110" y="245" width="14" height="65" rx="3" fill="#e11d48" stroke="#881337" strokeWidth="1.5" />
                    {/* Front Headlight */}
                    <rect x="815" y="240" width="18" height="45" rx="3" fill={headlightsOn ? '#fef08a' : '#475569'} />
                  </g>
                )}

                {/* --- 2.3 PICKUP: DIRECT FRONT VIEW --- */}
                {cameraView === 'front' && (
                  <g id="pickupFront">
                    {/* High Off-road Stance Tires */}
                    <rect x="135" y="260" width="85" height="135" rx="16" fill="#070a12" stroke="#1f2937" strokeWidth="4" />
                    <rect x="680" y="260" width="85" height="135" rx="16" fill="#070a12" stroke="#1f2937" strokeWidth="4" />

                    {/* Imposing Upright Bodywork */}
                    <path
                      d="M175 250 
                         C190 160, 260 120, 340 115 
                         L560 115 
                         C640 120, 710 160, 725 250 
                         L765 295 
                         C775 365, 710 380, 640 380 
                         L260 380 
                         C190 380, 125 365, 135 295 Z"
                      fill="url(#bodyDynamicGrad)"
                      stroke="#020617"
                      strokeWidth="3.5"
                    />
                    <path
                      d="M175 250 C190 160, 260 120, 340 115 L560 115 C640 120, 710 160, 725 250 L765 295 C775 365, 710 380, 640 380 L260 380 C190 380, 125 365, 135 295 Z"
                      fill={currentColorHex}
                      opacity="0.82"
                    />

                    {/* Upright Truck Windshield */}
                    <path
                      d="M250 125 L650 125 L690 205 L210 205 Z"
                      fill="url(#tintedGlassGrad)"
                      stroke="#020617"
                      strokeWidth="3"
                    />

                    {/* Massive Hexagonal Off-Road Grille */}
                    <polygon
                      points="270,240 630,240 655,335 245,335"
                      fill="#070b14"
                      stroke="#1e293b"
                      strokeWidth="4"
                    />
                    <line x1="260" y1="270" x2="640" y2="270" stroke="#1e293b" strokeWidth="2" />
                    <line x1="250" y1="300" x2="650" y2="300" stroke="#1e293b" strokeWidth="2" />

                    {/* Official Company Logo in Center */}
                    <g transform="translate(425, 255)">
                      <circle cx="25" cy="25" r="24" fill="#000a30" stroke="#38bdf8" strokeWidth="2" />
                      <image href="/assets/aistudio/image_dab9c635.png" x="5" y="5" width="40" height="40" />
                    </g>

                    {/* Steel Skid Plate / Protector Frontal */}
                    <rect x="310" y="340" width="280" height="30" rx="6" fill="#334155" stroke="#475569" strokeWidth="2" />
                    <circle cx="340" cy="355" r="4" fill="#cbd5e1" />
                    <circle cx="560" cy="355" r="4" fill="#cbd5e1" />
                    <text x="450" y="360" textAnchor="middle" fontSize="12" fontWeight="900" fill="#ffffff" fontFamily="sans-serif">
                      SHERWIN-WILLIAMS 4X4
                    </text>

                    {/* Square Truck LED Headlights */}
                    <g id="pFrontLeftHeadlight">
                      <rect x="150" y="225" width="85" height="60" rx="8" fill={headlightsOn ? '#fffbeb' : '#1e293b'} stroke="#64748b" strokeWidth="3" />
                      <circle cx="180" cy="255" r="14" fill={headlightsOn ? '#fef08a' : '#334155'} />
                      <circle cx="215" cy="255" r="14" fill={headlightsOn ? '#fef08a' : '#334155'} />
                      {headlightsOn && <circle cx="195" cy="255" r="32" fill="#fde047" opacity="0.4" filter="blur(8px)" />}
                    </g>
                    <g id="pFrontRightHeadlight">
                      <rect x="665" y="225" width="85" height="60" rx="8" fill={headlightsOn ? '#fffbeb' : '#1e293b'} stroke="#64748b" strokeWidth="3" />
                      <circle cx="695" cy="255" r="14" fill={headlightsOn ? '#fef08a' : '#334155'} />
                      <circle cx="730" cy="255" r="14" fill={headlightsOn ? '#fef08a' : '#334155'} />
                      {headlightsOn && <circle cx="710" cy="255" r="32" fill="#fde047" opacity="0.4" filter="blur(8px)" />}
                    </g>
                  </g>
                )}
              </g>
            )}

            {/* ============================================================= */}
            {/* 3. SEDÁN MODERNO (EJECUTIVO 4 PUERTAS CON MALETERO)            */}
            {/* ============================================================= */}
            {carModel === 'sedan' && (
              <g id="modelSedan">
                {/* --- 3.1 SEDÁN: 3/4 FRONTAL VIEW --- */}
                {cameraView === 'threeQuarter' && (
                  <g id="sedanThreeQuarter">
                    {/* Undercarriage */}
                    <path d="M120 375 L780 375 L795 365 L110 365 Z" fill="#020408" />

                    {/* Executive Alloy Wheels */}
                    <g id="sTqRearWheel">
                      <ellipse cx="230" cy="345" rx="58" ry="62" fill="#070a12" stroke="#1f2937" strokeWidth="4" />
                      <ellipse cx="230" cy="345" rx="46" ry="50" fill="#1e293b" />
                      <ellipse cx="230" cy="345" rx="40" ry="44" fill="none" stroke="url(#alloyRimGrad)" strokeWidth="4" />
                      {/* Luxury Multispoke */}
                      <line x1="230" y1="305" x2="230" y2="385" stroke="#cbd5e1" strokeWidth="2.5" />
                      <line x1="190" y1="345" x2="270" y2="345" stroke="#cbd5e1" strokeWidth="2.5" />
                      <line x1="202" y1="317" x2="258" y2="373" stroke="#cbd5e1" strokeWidth="2.5" />
                      <line x1="202" y1="373" x2="258" y2="317" stroke="#cbd5e1" strokeWidth="2.5" />
                      <circle cx="230" cy="345" r="8" fill="#0f172a" stroke="#94a3b8" strokeWidth="1.5" />
                    </g>

                    <g id="sTqFrontWheel">
                      <ellipse cx="660" cy="345" rx="62" ry="66" fill="#070a12" stroke="#1f2937" strokeWidth="4" />
                      <ellipse cx="660" cy="345" rx="50" ry="54" fill="#1e293b" />
                      <ellipse cx="660" cy="345" rx="44" ry="48" fill="none" stroke="url(#alloyRimGrad)" strokeWidth="4.5" />
                      <line x1="660" y1="300" x2="660" y2="390" stroke="#cbd5e1" strokeWidth="3" />
                      <line x1="616" y1="345" x2="704" y2="345" stroke="#cbd5e1" strokeWidth="3" />
                      <line x1="629" y1="314" x2="691" y2="376" stroke="#cbd5e1" strokeWidth="3" />
                      <line x1="629" y1="376" x2="691" y2="314" stroke="#cbd5e1" strokeWidth="3" />
                      <circle cx="660" cy="345" r="9" fill="#0f172a" stroke="#94a3b8" strokeWidth="2" />
                    </g>

                    {/* SEDÁN BODY PANELS (TRADITIONAL 3-BOX EXECUTIVE SHAPE) */}
                    <g id="sTqBodyPanels">
                      {/* Distinct Trunk Decklid at rear + 4-Door Cabin + Long Elegant Hood */}
                      <path
                        d="M105 320 
                           L105 285 
                           L175 285 
                           C210 220, 270 145, 360 140 
                           L570 140 
                           C625 140, 695 185, 735 240 
                           L815 255 
                           C840 268, 850 295, 840 330 
                           L820 365 
                           L750 365 
                           C750 300, 715 275, 660 275 
                           C610 275, 575 300, 575 365 
                           L300 365 
                           C300 300, 265 275, 230 275 
                           C190 275, 160 300, 160 365 
                           L115 365 Z"
                        fill="url(#bodyDynamicGrad)"
                        stroke="#020617"
                        strokeWidth="2.5"
                      />
                      <path
                        d="M105 320 L105 285 L175 285 C210 220, 270 145, 360 140 L570 140 C625 140, 695 185, 735 240 L815 255 C840 268, 850 295, 840 330 L820 365 L750 365 C750 300, 715 275, 660 275 C610 275, 575 300, 575 365 L300 365 C300 300, 265 275, 230 275 C190 275, 160 300, 160 365 L115 365 Z"
                        fill={currentColorHex}
                        opacity="0.82"
                      />

                      {/* Dual-Tone Roof */}
                      {dualToneRoof && (
                        <path d="M225 245 C255 180, 315 145, 385 140 L560 140 C610 140, 655 175, 685 225 L225 245 Z" fill="#05070d" />
                      )}

                      {/* Sedán Beltline & Chrome Shoulder */}
                      <path d="M175 285 Q400 270 620 265 Q725 270 815 290" stroke="#cbd5e1" strokeWidth="1.5" fill="none" opacity="0.6" />
                      <path d="M570 160 Q660 205 790 255" stroke="#ffffff" strokeWidth="3" fill="none" opacity={finishConfig.glossOpacity} />

                      {/* 4-Door Seam Lines */}
                      <line x1="375" y1="150" x2="350" y2="365" stroke="#000000" strokeWidth="2.5" opacity="0.6" />
                      <line x1="510" y1="150" x2="490" y2="365" stroke="#000000" strokeWidth="2.5" opacity="0.6" />
                      {/* Chrome Inlaid Door Handles */}
                      <rect x="390" y="240" width="30" height="6" rx="3" fill="#cbd5e1" stroke="#475569" strokeWidth="0.8" />
                      <rect x="525" y="240" width="30" height="6" rx="3" fill="#cbd5e1" stroke="#475569" strokeWidth="0.8" />

                      {/* Side Mirror */}
                      <path d="M575 190 Q610 185 615 200 Q600 215 570 210 Z" fill={currentColorHex} stroke="#020617" strokeWidth="1.5" />
                    </g>

                    {/* WINDOWS (EXECUTIVE CHROME SURROUND) */}
                    <g id="sTqWindows">
                      {/* Rear Window */}
                      <path d="M245 240 Q285 185, 355 155 L355 235 Q295 240 245 240 Z" fill="url(#tintedGlassGrad)" stroke="#050811" strokeWidth="2.5" />
                      {/* Front Passenger Window */}
                      <path d="M370 155 L495 150 L495 235 L370 235 Z" fill="url(#tintedGlassGrad)" stroke="#050811" strokeWidth="2.5" />
                      {/* Driver Window & Windshield */}
                      <path d="M510 150 L660 225 L510 235 Z" fill="url(#tintedGlassGrad)" stroke="#050811" strokeWidth="2.5" />
                    </g>

                    {/* HEADLIGHTS (MATRIX LED LIGHT STRIP) */}
                    <g id="sTqHeadlight">
                      <path d="M760 255 Q820 270 825 290 Q790 300 755 285 Z" fill={headlightsOn ? '#fffbeb' : '#1e293b'} stroke="#64748b" strokeWidth="2" />
                      <circle cx="785" cy="275" r="8" fill={headlightsOn ? '#fef08a' : '#334155'} />
                      <circle cx="808" cy="280" r="7" fill={headlightsOn ? '#fef08a' : '#334155'} />
                    </g>

                    {/* Taillight Strip */}
                    <path d="M106 295 L145 295 L135 315 L106 315 Z" fill="#e11d48" stroke="#881337" strokeWidth="1" />
                  </g>
                )}

                {/* --- 3.2 SEDÁN: SIDE PROFILE VIEW --- */}
                {cameraView === 'side' && (
                  <g id="sedanSide">
                    {/* Undercarriage */}
                    <rect x="150" y="360" width="600" height="8" rx="2" fill="#020408" />

                    {/* Wheels */}
                    <circle cx="230" cy="335" r="56" fill="#070a12" stroke="#1f2937" strokeWidth="4" />
                    <circle cx="230" cy="335" r="44" fill="#1e293b" />
                    <circle cx="230" cy="335" r="38" fill="none" stroke="url(#alloyRimGrad)" strokeWidth="4" />
                    <circle cx="230" cy="335" r="7" fill="#0f172a" />

                    <circle cx="670" cy="335" r="56" fill="#070a12" stroke="#1f2937" strokeWidth="4" />
                    <circle cx="670" cy="335" r="44" fill="#1e293b" />
                    <circle cx="670" cy="335" r="38" fill="none" stroke="url(#alloyRimGrad)" strokeWidth="4" />
                    <circle cx="670" cy="335" r="7" fill="#0f172a" />

                    {/* Sedán 3-Box Silhouette (Trunk, Roof, Long Hood) */}
                    <path
                      d="M100 295 
                         L175 295 
                         C225 210, 290 145, 390 140 
                         L580 140 
                         C660 170, 715 225, 755 255 
                         L825 260 
                         C845 270, 845 305, 835 345 
                         L805 365 
                         L735 365 
                         C735 300, 705 275, 670 275 
                         C635 275, 605 300, 605 365 
                         L295 365 
                         C295 300, 265 275, 230 275 
                         C195 275, 165 300, 165 365 
                         L105 365 Z"
                      fill="url(#bodyDynamicGrad)"
                      stroke="#0f172a"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M100 295 L175 295 C225 210, 290 145, 390 140 L580 140 C660 170, 715 225, 755 255 L825 260 C845 270, 845 305, 835 345 L805 365 L735 365 C735 300, 705 275, 670 275 C635 275, 605 300, 605 365 L295 365 C295 300, 265 275, 230 275 C195 275, 165 300, 165 365 L105 365 Z"
                      fill={currentColorHex}
                      opacity="0.82"
                    />

                    {/* Roofline Highlight */}
                    <path d="M175 295 Q380 140 580 140 Q690 180 810 260" stroke="#ffffff" strokeWidth="3" fill="none" opacity={finishConfig.glossOpacity} />

                    {/* Sedán 4-Window Glass Greenhouse */}
                    <path d="M260 235 C300 175, 350 148, 410 148 L570 148 L670 235 Z" fill="url(#tintedGlassGrad)" stroke="#090d16" strokeWidth="2.5" />
                    <line x1="435" y1="148" x2="435" y2="235" stroke="#090d16" strokeWidth="3" />
                    <line x1="535" y1="148" x2="535" y2="235" stroke="#090d16" strokeWidth="3" />

                    {/* Door Seams */}
                    <line x1="435" y1="148" x2="425" y2="365" stroke="#000000" strokeWidth="2.5" opacity="0.6" />
                    <line x1="535" y1="148" x2="525" y2="365" stroke="#000000" strokeWidth="2.5" opacity="0.6" />

                    {/* Chrome Door Handles */}
                    <rect x="450" y="245" width="28" height="6" rx="3" fill="#cbd5e1" />
                    <rect x="550" y="245" width="28" height="6" rx="3" fill="#cbd5e1" />

                    {/* Lights */}
                    <path d="M820 260 L835 268 L828 280 Z" fill={headlightsOn ? '#fef08a' : '#475569'} />
                    <path d="M100 295 L115 295 L112 308 Z" fill="#e11d48" />
                  </g>
                )}

                {/* --- 3.3 SEDÁN: DIRECT FRONT VIEW --- */}
                {cameraView === 'front' && (
                  <g id="sedanFront">
                    {/* Balanced Executive Stance Tires */}
                    <rect x="145" y="275" width="70" height="115" rx="16" fill="#070a12" stroke="#1f2937" strokeWidth="3" />
                    <rect x="685" y="275" width="70" height="115" rx="16" fill="#070a12" stroke="#1f2937" strokeWidth="3" />

                    {/* Sleek Executive Front Fascia */}
                    <path
                      d="M180 265 
                         C200 175, 270 135, 350 128 
                         L550 128 
                         C630 135, 700 175, 720 265 
                         L755 310 
                         C765 365, 700 380, 630 380 
                         L270 380 
                         C200 380, 135 365, 145 310 Z"
                      fill="url(#bodyDynamicGrad)"
                      stroke="#020617"
                      strokeWidth="3"
                    />
                    <path
                      d="M180 265 C200 175, 270 135, 350 128 L550 128 C630 135, 700 175, 720 265 L755 310 C765 365, 700 380, 630 380 L270 380 C200 380, 135 365, 145 310 Z"
                      fill={currentColorHex}
                      opacity="0.82"
                    />

                    {/* Windshield */}
                    <path d="M255 138 L645 138 L690 220 L210 220 Z" fill="url(#tintedGlassGrad)" stroke="#020617" strokeWidth="3" />
                    <rect x="425" y="146" width="50" height="10" rx="2" fill="#1e293b" />

                    {/* Executive Horizontal Louvre Chrome Grille */}
                    <rect x="280" y="265" width="340" height="78" rx="10" fill="#070b14" stroke="#94a3b8" strokeWidth="2.5" />
                    <line x1="285" y1="285" x2="615" y2="285" stroke="#cbd5e1" strokeWidth="2" opacity="0.8" />
                    <line x1="285" y1="305" x2="615" y2="305" stroke="#cbd5e1" strokeWidth="2" opacity="0.8" />
                    <line x1="285" y1="325" x2="615" y2="325" stroke="#cbd5e1" strokeWidth="2" opacity="0.8" />

                    {/* Official Company Logo in Center */}
                    <g transform="translate(425, 278)">
                      <circle cx="25" cy="25" r="22" fill="#000a30" stroke="#38bdf8" strokeWidth="1.5" />
                      <image href="/assets/aistudio/image_dab9c635.png" x="5" y="5" width="40" height="40" />
                    </g>

                    {/* License Plate Valledupar */}
                    <rect x="340" y="348" width="220" height="26" rx="4" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
                    <text x="450" y="366" textAnchor="middle" fontSize="13" fontWeight="900" fill="#00236f" fontFamily="monospace">
                      COLOR CENTER • VUP
                    </text>

                    {/* Matrix LED Headlights */}
                    <g id="sFrontLeftHeadlight">
                      <path d="M170 250 Q250 240 280 255 Q270 285 185 275 Z" fill={headlightsOn ? '#fffbeb' : '#1e293b'} stroke="#64748b" strokeWidth="2.5" />
                      <circle cx="210" cy="262" r="10" fill={headlightsOn ? '#fef08a' : '#334155'} />
                      <circle cx="240" cy="262" r="9" fill={headlightsOn ? '#fef08a' : '#334155'} />
                      {headlightsOn && <circle cx="220" cy="262" r="24" fill="#fde047" opacity="0.4" filter="blur(6px)" />}
                    </g>
                    <g id="sFrontRightHeadlight">
                      <path d="M730 250 Q650 240 620 255 Q630 285 715 275 Z" fill={headlightsOn ? '#fffbeb' : '#1e293b'} stroke="#64748b" strokeWidth="2.5" />
                      <circle cx="690" cy="262" r="10" fill={headlightsOn ? '#fef08a' : '#334155'} />
                      <circle cx="660" cy="262" r="9" fill={headlightsOn ? '#fef08a' : '#334155'} />
                      {headlightsOn && <circle cx="680" cy="262" r="24" fill="#fde047" opacity="0.4" filter="blur(6px)" />}
                    </g>
                  </g>
                )}
              </g>
            )}
          </svg>
        </div>

        {/* Floating Specular Information Pill at Bottom Left (Crisp White & Navy) */}
        <div className="absolute bottom-3 left-3 sm:left-4 z-20 flex items-center gap-2.5 p-2 sm:p-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-slate-900 shadow-xl max-w-[260px] sm:max-w-xs">
          <div
            className="w-5 h-5 rounded-lg border border-black/15 shadow-sm shrink-0"
            style={{ backgroundColor: currentColorHex }}
          />
          <div className="flex flex-col min-w-0">
            <span className="font-headline font-extrabold text-xs text-[#00236f] truncate">
              {color.name}
            </span>
            <span className="text-[10px] text-[#006398] font-bold font-mono truncate">
              {modelLabels[carModel].title} • {finishConfig.badgeText}
            </span>
          </div>
        </div>

        {/* Floating WhatsApp Action at Bottom Right */}
        <div className="absolute bottom-3 right-3 sm:right-4 z-20 flex items-center gap-2">
          <button
            type="button"
            onClick={handleWhatsAppQuote}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold shadow-lg shadow-emerald-500/25 active:scale-95 transition-transform"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span className="hidden xs:inline">Cotizar Fórmula de este Carro</span>
            <span className="xs:hidden">Cotizar</span>
          </button>
        </div>
      </div>

      {/* Bottom Controls Panel: Finish Switcher & Custom Color Wheel Picker (Clean White) */}
      {interactive && (
        <div className="p-3 sm:p-4 bg-slate-50/90 border-t border-slate-200 space-y-3">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
            {/* Acabados de Pintura */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 shrink-0 mr-1 flex items-center gap-1">
                <Palette className="w-3.5 h-3.5 text-amber-500" />
                Acabado:
              </span>
              {[
                'Perlado Tricapa',
                'Metálico Fino',
                'Sólido Gloss PU',
                'Satinado / Mate',
              ].map((finishName) => (
                <button
                  key={finishName}
                  type="button"
                  onClick={() => {
                    setActiveFinish(finishName as any);
                    analytics.recordEvent('color_select', `Cambió acabado a: ${finishName}`);
                  }}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors ${
                    activeFinish === finishName
                      ? 'bg-[#00236f] text-white font-extrabold shadow-sm border border-sky-400/40'
                      : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {finishName}
                </button>
              ))}
            </div>

            {/* Custom Color Picker & Copy Hex */}
            <div className="flex items-center gap-2 shrink-0 justify-between sm:justify-end">
              <span className="text-[11px] font-semibold text-slate-600">
                Tono libre:
              </span>
              <div className="flex items-center gap-2 bg-white px-2.5 py-1 rounded-xl border border-slate-200 shadow-sm">
                <input
                  type="color"
                  value={customHex}
                  onChange={(e) => {
                    setCustomHex(e.target.value);
                    analytics.recordEvent('color_select', `Color libre carro: ${e.target.value}`);
                  }}
                  className="w-6 h-6 rounded-lg cursor-pointer bg-transparent border-0"
                  title="Seleccionar cualquier color"
                />
                <span className="font-mono text-xs font-bold text-slate-900">
                  {customHex.toUpperCase()}
                </span>
                <button
                  type="button"
                  onClick={handleCopyHex}
                  className="p-1 text-slate-500 hover:text-slate-900 transition-colors"
                  title="Copiar código HEX"
                >
                  {copiedHex ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Technical Tip Bar for the selected finish */}
          <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1 border-t border-slate-200 px-1">
            <div className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#006398] shrink-0" />
              <span className="font-medium text-slate-700">{finishConfig.description}</span>
            </div>
            <span className="hidden sm:inline font-mono font-bold text-[#00236f]">
              Sherwin-Williams Refinish VUP
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
