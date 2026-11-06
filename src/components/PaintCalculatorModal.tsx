import React, { useState } from 'react';
import { ProductItem } from '../types';
import { STORE_INFO, VEHICLE_PIECES } from '../data/mockData';
import { analytics } from '../services/analytics';
import { Calculator, X, MessageCircle, ArrowRight, Car, CheckSquare, Square } from 'lucide-react';

interface PaintCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProduct?: ProductItem | null;
}

export const PaintCalculatorModal: React.FC<PaintCalculatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [vehicleType, setVehicleType] = useState<'sedan' | 'suv' | 'pickup' | 'moto'>('sedan');
  const [finishSystem, setFinishSystem] = useState<'bicapa_2k' | 'monocapa_pu'>('bicapa_2k');
  const [selectedPieceIds, setSelectedPieceIds] = useState<string[]>([
    'bomper_delantero',
    'capo',
  ]);
  const [includePrimer, setIncludePrimer] = useState<boolean>(true);
  const [includePutty, setIncludePutty] = useState<boolean>(true);

  if (!isOpen) return null;

  const vehicleMultipliers = {
    sedan: 1.0,
    suv: 1.25,
    pickup: 1.35,
    moto: 0.5,
  };

  const handleTogglePiece = (pieceId: string) => {
    setSelectedPieceIds((prev) =>
      prev.includes(pieceId) ? prev.filter((id) => id !== pieceId) : [...prev, pieceId]
    );
  };

  const handleSelectAll = () => {
    if (selectedPieceIds.length === VEHICLE_PIECES.length) {
      setSelectedPieceIds([]);
    } else {
      setSelectedPieceIds(VEHICLE_PIECES.map((p) => p.id));
    }
  };

  // Calculate units
  const totalUnits = VEHICLE_PIECES.filter((p) => selectedPieceIds.includes(p.id)).reduce(
    (sum, piece) => sum + piece.relativeUnits,
    0
  );

  const adjustedUnits = Math.round(totalUnits * vehicleMultipliers[vehicleType] * 10) / 10;

  // 1 unit roughly equates to:
  // - Basecoat: 350-400ml sprayable (~1/8 gal per 1 unit)
  // 8 units = 1 Gallon basecoat (full car)
  const baseCoatGallons = Math.max(0.125, Math.ceil((adjustedUnits / 8) * 8) / 8);
  const clearCoatGallons = Math.max(0.125, Math.ceil((adjustedUnits / 7) * 8) / 8);
  const primerGallons = includePrimer ? Math.max(0.125, Math.ceil((adjustedUnits / 9) * 8) / 8) : 0;
  const thinnerLiters = Math.ceil((baseCoatGallons * 3.78 * 0.8 + clearCoatGallons * 3.78 * 0.15) * 10) / 10;
  const puttyKilos = includePutty ? (adjustedUnits > 4 ? 2 : 1) : 0;

  // Format fractions nicely
  const formatVolume = (gals: number) => {
    if (gals <= 0.125) return '1/8 Galón (Pintadita)';
    if (gals <= 0.25) return '1/4 Galón (1 Litro aprox)';
    if (gals <= 0.5) return '1/2 Galón (2 Litros)';
    if (gals <= 0.75) return '3/4 Galón (3 Litros)';
    if (gals === 1) return '1 Galón Completo (3.78 L)';
    return `${gals} Galones`;
  };

  const handleWhatsAppQuote = () => {
    analytics.recordEvent('calculator_use', `Calculó ${selectedPieceIds.length} piezas automotrices`, {
      vehicleType,
      finishSystem,
      pieceCount: selectedPieceIds.length,
      adjustedUnits,
      baseCoatGallons,
    });

    const pieceNames = VEHICLE_PIECES.filter((p) => selectedPieceIds.includes(p.id))
      .map((p) => p.name)
      .join(', ');

    const msg = `Hola Color Center Automotriz Valledupar, utilicé la calculadora web para mi vehículo:
- Tipo de vehículo: ${vehicleType.toUpperCase()}
- Sistema: ${finishSystem === 'bicapa_2k' ? 'Bicapa OEM + Barniz 2K High Solids' : 'Monocapa Poliuretano'}
- Piezas a pintar (${selectedPieceIds.length}): ${pieceNames || 'Ninguna seleccionada'}
- Material estimado:
  • Base Color: ${formatVolume(baseCoatGallons)}
  • Barniz 2K Clear Coat: ${formatVolume(clearCoatGallons)}
  ${includePrimer ? `• Primer / Fondo 2K: ${formatVolume(primerGallons)}` : ''}
  • Reductor / Thinner PU: ~${thinnerLiters} L
  ${includePutty ? `• Masilla Liviana: ${puttyKilos} Kg` : ''}

¿Podrían confirmarme precio y formular el color por código de mi vehículo con despacho a taller?`;

    window.open(`${STORE_INFO.whatsappUrl}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#00236f] via-[#003882] to-[#006398] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shadow-inner">
              <Calculator className="w-5 h-5 text-sky-200" />
            </div>
            <div>
              <h3 className="font-headline font-bold text-lg sm:text-xl text-white">
                Calculadora de Materiales Automotriz
              </h3>
              <p className="text-xs text-blue-100">
                Estima bases bicapa, barnices 2K, primers y thinner por pieza o vehículo
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-white/15 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto bg-white">
          {/* Step 1: Vehicle Type Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              1. Tipo de Vehículo
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'sedan', label: 'Automóvil Sedán / Hatch', icon: '🚗' },
                { id: 'suv', label: 'Camioneta SUV / Crossover', icon: '🚙' },
                { id: 'pickup', label: 'Pickup / Platón 4x4', icon: '🛻' },
                { id: 'moto', label: 'Motocicleta / Piezas', icon: '🏍️' },
              ].map((veh) => (
                <button
                  key={veh.id}
                  type="button"
                  onClick={() => setVehicleType(veh.id as any)}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    vehicleType === veh.id
                      ? 'border-[#00236f] bg-blue-50/70 ring-2 ring-[#00236f] text-[#00236f] font-bold shadow-sm'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span className="text-2xl block mb-1">{veh.icon}</span>
                  <span className="text-xs font-semibold leading-tight block">{veh.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Finish System */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              2. Sistema de Pintura
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setFinishSystem('bicapa_2k')}
                className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                  finishSystem === 'bicapa_2k'
                    ? 'border-[#00236f] bg-blue-50/70 ring-2 ring-[#00236f]'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <div className="w-4 h-4 rounded-full border border-blue-600 flex items-center justify-center mt-0.5 shrink-0">
                  {finishSystem === 'bicapa_2k' && <div className="w-2 h-2 rounded-full bg-[#00236f]" />}
                </div>
                <div>
                  <span className="font-headline font-bold text-sm text-[#00236f] block">
                    Bicapa OEM + Barniz 2K HS
                  </span>
                  <span className="font-body text-xs text-slate-600 block mt-0.5">
                    Acabado de fábrica original con capa de color y barniz poliuretano cristal.
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFinishSystem('monocapa_pu')}
                className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                  finishSystem === 'monocapa_pu'
                    ? 'border-[#00236f] bg-blue-50/70 ring-2 ring-[#00236f]'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <div className="w-4 h-4 rounded-full border border-slate-400 flex items-center justify-center mt-0.5 shrink-0">
                  {finishSystem === 'monocapa_pu' && <div className="w-2 h-2 rounded-full bg-[#00236f]" />}
                </div>
                <div>
                  <span className="font-headline font-bold text-sm text-[#00236f] block">
                    Monocapa Poliuretano PU
                  </span>
                  <span className="font-body text-xs text-slate-600 block mt-0.5">
                    Color sólido y brillo en una sola aplicación para flotas y comerciales.
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Step 3: Piece selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                3. Selecciona las piezas a pintar ({selectedPieceIds.length} seleccionadas)
              </label>
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-xs font-bold text-[#006398] hover:underline flex items-center gap-1"
              >
                {selectedPieceIds.length === VEHICLE_PIECES.length ? (
                  <>
                    <CheckSquare className="w-3.5 h-3.5" />
                    <span>Deseleccionar todas</span>
                  </>
                ) : (
                  <>
                    <Square className="w-3.5 h-3.5" />
                    <span>Pintura General (Todas)</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-1 border border-slate-200 rounded-2xl bg-slate-50/60">
              {VEHICLE_PIECES.map((piece) => {
                const isChecked = selectedPieceIds.includes(piece.id);
                return (
                  <button
                    key={piece.id}
                    type="button"
                    onClick={() => handleTogglePiece(piece.id)}
                    className={`p-2.5 rounded-xl text-left flex items-center justify-between text-xs transition-colors ${
                      isChecked
                        ? 'bg-[#00236f] text-white font-bold shadow-sm'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <span>{piece.name}</span>
                    <span className="text-[10px] opacity-80">
                      {isChecked ? '✓' : '+'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Additional Consumables toggles */}
          <div className="flex flex-wrap gap-4 pt-1 text-xs">
            <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
              <input
                type="checkbox"
                checked={includePrimer}
                onChange={(e) => setIncludePrimer(e.target.checked)}
                className="w-4 h-4 rounded text-[#00236f] focus:ring-blue-500"
              />
              <span>Incluir Fondo / Primer 2K Surfacer</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
              <input
                type="checkbox"
                checked={includePutty}
                onChange={(e) => setIncludePutty(e.target.checked)}
                className="w-4 h-4 rounded text-[#00236f] focus:ring-blue-500"
              />
              <span>Incluir Masilla Poliéster Liviana</span>
            </label>
          </div>

          {/* Calculation Summary Box (High Contrast White / Navy) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#00236f] to-[#003882] text-white shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-blue-400/30 pb-3">
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-sky-300" />
                <span className="font-headline font-bold text-sm text-white">Resumen de Material Sugerido</span>
              </div>
              <span className="text-xs bg-emerald-500/25 text-emerald-300 px-2.5 py-0.5 rounded-full font-bold border border-emerald-400/40">
                0% Desperdicio
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-xs">
              <div className="bg-white/10 p-2.5 rounded-xl border border-white/10">
                <span className="text-sky-200 font-medium block">Base Color (OEM):</span>
                <span className="font-headline font-bold text-sm text-white block mt-0.5">
                  {formatVolume(baseCoatGallons)}
                </span>
              </div>

              <div className="bg-white/10 p-2.5 rounded-xl border border-white/10">
                <span className="text-sky-200 font-medium block">Barniz 2K Clear Coat:</span>
                <span className="font-headline font-bold text-sm text-white block mt-0.5">
                  {formatVolume(clearCoatGallons)}
                </span>
              </div>

              <div className="bg-white/10 p-2.5 rounded-xl border border-white/10">
                <span className="text-sky-200 font-medium block">Reductor Reactivo PU:</span>
                <span className="font-headline font-bold text-sm text-white block mt-0.5">
                  ~{thinnerLiters} Litros
                </span>
              </div>

              {includePrimer && (
                <div className="bg-white/10 p-2.5 rounded-xl border border-white/10">
                  <span className="text-sky-200 font-medium block">Fondo / Primer 2K:</span>
                  <span className="font-headline font-bold text-sm text-white block mt-0.5">
                    {formatVolume(primerGallons)}
                  </span>
                </div>
              )}

              {includePutty && (
                <div className="bg-white/10 p-2.5 rounded-xl border border-white/10">
                  <span className="text-sky-200 font-medium block">Masilla Liviana:</span>
                  <span className="font-headline font-bold text-sm text-white block mt-0.5">
                    {puttyKilos} Kg + Endurecedor
                  </span>
                </div>
              )}

              <div className="bg-white/10 p-2.5 rounded-xl border border-white/10">
                <span className="text-sky-200 font-medium block">Tiempo en cabina:</span>
                <span className="font-headline font-bold text-sm text-white block mt-0.5">
                  Secado rápido 45 min
                </span>
              </div>
            </div>

            <p className="text-[11px] text-blue-100/90 italic pt-1">
              * El cálculo considera 2 manos completas con pistola de gravedad HVLP a 28-32 PSI.
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-600 font-medium">
            ¿Tienes la pieza o código de chasis? Te la igualamos al 100%.
          </div>

          <button
            type="button"
            onClick={handleWhatsAppQuote}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-headline text-sm font-bold shadow-md hover:shadow-lg active:scale-95 transition-all min-h-[44px]"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Enviar piezas calculadas a WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
