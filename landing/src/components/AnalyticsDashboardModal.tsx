import React, { useState, useEffect } from 'react';
import { analytics } from '../services/analytics';
import { AnalyticsMetrics, AnalyticsEvent } from '../types';
import {
  BarChart3,
  X,
  Users,
  MessageCircle,
  Calculator,
  Palette,
  Eye,
  Smartphone,
  Laptop,
  Play,
  RotateCcw,
  Download,
  TrendingUp,
  Clock,
} from 'lucide-react';

interface AnalyticsDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AnalyticsDashboardModal: React.FC<AnalyticsDashboardModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [metrics, setMetrics] = useState<AnalyticsMetrics>(analytics.getMetrics());

  useEffect(() => {
    if (!isOpen) return;
    const unsubscribe = analytics.subscribe((updated) => {
      setMetrics(updated);
    });
    return () => unsubscribe();
  }, [isOpen]);

  if (!isOpen) return null;

  const conversionRate = metrics.totalVisits > 0
    ? ((metrics.whatsAppConversions / metrics.totalVisits) * 100).toFixed(1)
    : '0';

  const formatTimeAgo = (timestamp: number) => {
    const diffSeconds = Math.max(1, Math.floor((Date.now() - timestamp) / 1000));
    if (diffSeconds < 60) return `hace ${diffSeconds}s`;
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) return `hace ${diffMinutes}m`;
    return `hace ${Math.floor(diffMinutes / 60)}h`;
  };

  const getEventBadge = (type: AnalyticsEvent['type']) => {
    switch (type) {
      case 'whatsapp_trigger':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">WhatsApp</span>;
      case 'color_select':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">Color</span>;
      case 'calculator_use':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-[#00236f]">Cálculo Auto</span>;
      case 'product_view':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">Producto</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800">Navegación</span>;
    }
  };

  const handleSimulate = () => {
    analytics.simulateLiveActivity();
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(metrics, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `color_center_analytics_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleReset = () => {
    if (confirm('¿Deseas reiniciar las métricas de prueba?')) {
      analytics.resetMetrics();
    }
  };

  const totalDevices = metrics.deviceBreakdown.mobile + metrics.deviceBreakdown.desktop;
  const mobilePct = totalDevices > 0 ? Math.round((metrics.deviceBreakdown.mobile / totalDevices) * 100) : 65;
  const desktopPct = 100 - mobilePct;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header with Live Pulse */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#00236f] via-[#003882] to-[#0050A0] text-white flex items-center justify-between border-b border-blue-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 text-white flex items-center justify-center border border-white/20 shadow-inner">
              <BarChart3 className="w-5 h-5 text-sky-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline font-bold text-lg sm:text-xl text-white">
                  Panel de Analíticas en Tiempo Real
                </h3>
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/25 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-400/40">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  En Vivo
                </span>
              </div>
              <p className="text-xs text-blue-100">
                Monitoreo continuo de interacciones, conversiones a WhatsApp y cálculo de pintura
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSimulate}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm active:scale-95"
              title="Simula un evento para ver cómo se actualiza el panel en tiempo real"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Simular Evento</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-white/15 transition-colors"
              aria-label="Cerrar panel de analíticas"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dashboard Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 bg-white">
          {/* Top KPI Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            {/* KPI 1: Active Users */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="font-bold uppercase tracking-wider text-[11px]">En Línea</span>
                <Users className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <span className="font-headline text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono">
                  {metrics.activeNow}
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Usuarios activos ahora
                </span>
              </div>
            </div>

            {/* KPI 2: Total Visits */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="font-bold uppercase tracking-wider text-[11px]">Visitas</span>
                <Eye className="w-4 h-4 text-[#006398]" />
              </div>
              <div>
                <span className="font-headline text-2xl sm:text-3xl font-extrabold text-[#00236f] font-mono">
                  {metrics.totalVisits}
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  {metrics.uniqueVisitors} visitantes únicos
                </span>
              </div>
            </div>

            {/* KPI 3: WhatsApp Conversions */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="font-bold uppercase tracking-wider text-[11px]">Leads WhatsApp</span>
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
              </div>
              <div>
                <span className="font-headline text-2xl sm:text-3xl font-extrabold text-[#25D366] font-mono">
                  {metrics.whatsAppConversions}
                </span>
                <span className="text-[11px] text-emerald-700 font-bold block mt-0.5">
                  {conversionRate}% tasa conversión
                </span>
              </div>
            </div>

            {/* KPI 4: Calculator Simulations */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="font-bold uppercase tracking-wider text-[11px]">Calculadora Piezas</span>
                <Calculator className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <span className="font-headline text-2xl sm:text-3xl font-extrabold text-purple-700 font-mono">
                  {metrics.calculatorSimulations}
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Vehículos calculados
                </span>
              </div>
            </div>

            {/* KPI 5: Colors Previews */}
            <div className="col-span-2 lg:col-span-1 bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="font-bold uppercase tracking-wider text-[11px]">Colores Probados</span>
                <Palette className="w-4 h-4 text-amber-500" />
              </div>
              <div>
                <span className="font-headline text-2xl sm:text-3xl font-extrabold text-amber-600 font-mono">
                  {metrics.colorPreviews}
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Interacciones con tonos
                </span>
              </div>
            </div>
          </div>

          {/* Middle Row: Conversion Funnel & Segment Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Conversion Funnel */}
            <div className="lg:col-span-7 bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h4 className="font-headline font-bold text-sm sm:text-base text-[#00236f] flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#006398]" />
                  <span>Embudo de Conversión en Tiempo Real</span>
                </h4>
                <span className="text-xs text-slate-500 font-medium">Paso a paso</span>
              </div>

              <div className="space-y-3">
                {/* Step 1 */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700">
                      1. Visitas a la Tienda Web
                    </span>
                    <span className="font-mono font-bold text-slate-900">
                      {metrics.totalVisits} (100%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full w-full"></div>
                  </div>
                </div>

                {/* Step 2 */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700">
                      2. Exploración de Colores / Abanico
                    </span>
                    <span className="font-mono font-bold text-slate-900">
                      {metrics.colorPreviews} ({Math.min(100, Math.round((metrics.colorPreviews / Math.max(1, metrics.totalVisits)) * 100))}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, Math.round((metrics.colorPreviews / Math.max(1, metrics.totalVisits)) * 100))}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Step 3 */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700">
                      3. Uso de Calculadora por Piezas
                    </span>
                    <span className="font-mono font-bold text-slate-900">
                      {metrics.calculatorSimulations} ({Math.min(100, Math.round((metrics.calculatorSimulations / Math.max(1, metrics.totalVisits)) * 100))}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-600 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, Math.round((metrics.calculatorSimulations / Math.max(1, metrics.totalVisits)) * 100))}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Step 4 */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-emerald-700 font-bold">
                      4. Clic a WhatsApp (Leads Calificados)
                    </span>
                    <span className="font-mono font-bold text-emerald-600">
                      {metrics.whatsAppConversions} ({conversionRate}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, Number(conversionRate))}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Segment Conversions */}
            <div className="lg:col-span-5 bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
              <h4 className="font-headline font-bold text-sm sm:text-base text-[#00236f] flex items-center gap-2">
                <Users className="w-4 h-4 text-[#006398]" />
                <span>Conversión por Segmento</span>
              </h4>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-white border border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#00236f]"></span>
                    <span className="font-bold text-slate-800">Talleres de Colisión</span>
                  </div>
                  <span className="font-mono font-bold text-[#00236f]">
                    {metrics.conversionsBySegment.talleres} pedidos
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-white border border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#006398]"></span>
                    <span className="font-bold text-slate-800">Pintores y Cabina</span>
                  </div>
                  <span className="font-mono font-bold text-[#006398]">
                    {metrics.conversionsBySegment.pintores} pedidos
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-white border border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
                    <span className="font-bold text-slate-800">Flotas y Empresas</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-600">
                    {metrics.conversionsBySegment.flotas} pedidos
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-white border border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-slate-400"></span>
                    <span className="font-bold text-slate-800">Consultas de Retoque / Particulares</span>
                  </div>
                  <span className="font-mono font-bold text-slate-700">
                    {metrics.conversionsBySegment.general} pedidos
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Real-time Event Feed & Device Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Live Streaming Feed */}
            <div className="lg:col-span-8 bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#006398]" />
                  <h4 className="font-headline font-bold text-sm sm:text-base text-[#00236f]">
                    Flujo de Actividad en Tiempo Real
                  </h4>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <span className="text-xs text-slate-500">Últimos eventos registrados</span>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {metrics.events.slice(0, 15).map((ev) => (
                  <div
                    key={ev.id}
                    className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs shadow-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {getEventBadge(ev.type)}
                      <span className="font-medium text-slate-800 truncate">
                        {ev.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 text-slate-500 text-[11px]">
                      <span>{ev.deviceType === 'mobile' ? 'Móvil' : 'Escritorio'}</span>
                      <span>•</span>
                      <span className="font-mono">{formatTimeAgo(ev.timestamp)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Devices & Quick Actions */}
            <div className="lg:col-span-4 space-y-4">
              {/* Devices Card */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 shadow-sm">
                <h4 className="font-headline font-bold text-sm text-[#00236f]">
                  Distribución por Dispositivo
                </h4>
                <div className="flex items-center justify-around py-2">
                  <div className="flex flex-col items-center">
                    <Smartphone className="w-6 h-6 text-[#006398] mb-1" />
                    <span className="font-mono font-bold text-base text-slate-900">
                      {mobilePct}%
                    </span>
                    <span className="text-[10px] text-slate-500">Móvil ({metrics.deviceBreakdown.mobile})</span>
                  </div>
                  <div className="h-8 w-[1px] bg-slate-300"></div>
                  <div className="flex flex-col items-center">
                    <Laptop className="w-6 h-6 text-slate-600 mb-1" />
                    <span className="font-mono font-bold text-base text-slate-900">
                      {desktopPct}%
                    </span>
                    <span className="text-[10px] text-slate-500">Escritorio ({metrics.deviceBreakdown.desktop})</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Simulate, Export, Reset */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 shadow-sm">
                <button
                  onClick={handleSimulate}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Simular Evento en Vivo</span>
                </button>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={handleExportJson}
                    className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Exportar</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white hover:bg-red-50 text-red-600 border border-slate-200 text-xs font-semibold"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reiniciar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span>Persistencia local activa • Actualización en tiempo real</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-200 text-slate-800 hover:bg-slate-300 transition-colors"
          >
            Cerrar Panel
          </button>
        </div>
      </div>
    </div>
  );
};
