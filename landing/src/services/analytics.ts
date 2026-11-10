import { AnalyticsEvent, AnalyticsMetrics } from '../types';

type Listener = (metrics: AnalyticsMetrics) => void;

class AnalyticsTracker {
  private metrics: AnalyticsMetrics;
  private listeners: Set<Listener> = new Set();
  private isClient: boolean = typeof window !== 'undefined';
  private heartbeatInterval: any = null;

  constructor() {
    this.metrics = this.loadInitialMetrics();
    if (this.isClient) {
      this.startLiveHeartbeat();
    }
  }

  private loadInitialMetrics(): AnalyticsMetrics {
    const defaultMetrics: AnalyticsMetrics = {
      totalVisits: 174,
      uniqueVisitors: 112,
      activeNow: 14,
      whatsAppConversions: 52,
      calculatorSimulations: 39,
      colorPreviews: 98,
      events: [
        {
          id: 'ev-seed-1',
          type: 'whatsapp_trigger',
          label: 'Cotización Taller de Colisión',
          timestamp: Date.now() - 1000 * 60 * 3,
          details: { segment: 'talleres', source: 'tarjeta_segmento' },
          deviceType: 'mobile',
        },
        {
          id: 'ev-seed-2',
          type: 'color_select',
          label: 'Probó Rojo Candy Perlado P30',
          timestamp: Date.now() - 1000 * 60 * 6,
          details: { color: 'Rojo Candy Perlado P30', hex: '#B3001B' },
          deviceType: 'desktop',
        },
        {
          id: 'ev-seed-3',
          type: 'calculator_use',
          label: 'Cálculo de Pintura (Capó + 2 Puertas)',
          timestamp: Date.now() - 1000 * 60 * 12,
          details: { pieces: 3, finish: 'Bicapa + Clear 2K' },
          deviceType: 'mobile',
        },
        {
          id: 'ev-seed-4',
          type: 'product_view',
          label: 'Vio Barniz Poliuretano 2K CC920',
          timestamp: Date.now() - 1000 * 60 * 18,
          details: { product: 'Barniz Poliuretano 2K High Solids' },
          deviceType: 'mobile',
        },
        {
          id: 'ev-seed-5',
          type: 'whatsapp_trigger',
          label: 'Consulta Código de Color por Placa',
          timestamp: Date.now() - 1000 * 60 * 25,
          details: { segment: 'general', source: 'hero_cta' },
          deviceType: 'desktop',
        },
      ],
      conversionsBySegment: {
        talleres: 24,
        pintores: 16,
        flotas: 8,
        general: 4,
      },
      colorPopularity: {
        'Rojo Candy Perlado P30': 42,
        'Gris Nardo Cemento G70': 36,
        'Azul Eléctrico Met B45': 28,
        'Negro Diamante K12': 26,
        'Blanco Perlado W08': 31,
        'Plata Titanio S18': 20,
      },
      deviceBreakdown: {
        mobile: 118,
        desktop: 56,
      },
    };

    if (!this.isClient) return defaultMetrics;

    try {
      const stored = localStorage.getItem('color_center_analytics');
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...defaultMetrics,
          ...parsed,
          activeNow: Math.floor(Math.random() * 8) + 9, // dynamic live active visitors
        };
      }
    } catch {
      // ignore
    }

    return defaultMetrics;
  }

  private saveMetrics() {
    if (!this.isClient) return;
    try {
      localStorage.setItem('color_center_analytics', JSON.stringify({
        totalVisits: this.metrics.totalVisits,
        uniqueVisitors: this.metrics.uniqueVisitors,
        whatsAppConversions: this.metrics.whatsAppConversions,
        calculatorSimulations: this.metrics.calculatorSimulations,
        colorPreviews: this.metrics.colorPreviews,
        conversionsBySegment: this.metrics.conversionsBySegment,
        colorPopularity: this.metrics.colorPopularity,
        deviceBreakdown: this.metrics.deviceBreakdown,
        events: this.metrics.events.slice(0, 50),
      }));
    } catch {
      // ignore storage limits
    }
  }

  private startLiveHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      // Slight realistic jitter in active concurrent visitors in Valledupar (8 to 22)
      const delta = (Math.random() > 0.5 ? 1 : -1) * (Math.random() > 0.6 ? 1 : 0);
      const newActive = Math.max(6, Math.min(26, this.metrics.activeNow + delta));
      if (newActive !== this.metrics.activeNow) {
        this.metrics.activeNow = newActive;
        this.notify();
      }
    }, 4500);
  }

  private getDeviceType(): 'mobile' | 'desktop' | 'tablet' {
    if (typeof window === 'undefined') return 'desktop';
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  public recordEvent(
    type: AnalyticsEvent['type'],
    label: string,
    details?: Record<string, any>
  ) {
    const event: AnalyticsEvent = {
      id: 'ev_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      type,
      label,
      timestamp: Date.now(),
      details,
      deviceType: this.getDeviceType(),
    };

    // Update aggregate metrics based on event type
    if (type === 'whatsapp_trigger') {
      this.metrics.whatsAppConversions += 1;
      const seg = details?.segment as keyof AnalyticsMetrics['conversionsBySegment'];
      if (seg && this.metrics.conversionsBySegment[seg] !== undefined) {
        this.metrics.conversionsBySegment[seg] += 1;
      } else {
        this.metrics.conversionsBySegment.general += 1;
      }
    } else if (type === 'color_select') {
      this.metrics.colorPreviews += 1;
      const colorName = details?.color || label;
      this.metrics.colorPopularity[colorName] = (this.metrics.colorPopularity[colorName] || 0) + 1;
    } else if (type === 'calculator_use') {
      this.metrics.calculatorSimulations += 1;
    } else if (type === 'page_view') {
      this.metrics.totalVisits += 1;
      const dev = event.deviceType === 'mobile' ? 'mobile' : 'desktop';
      this.metrics.deviceBreakdown[dev] += 1;
    }

    // Keep the most recent 60 events in memory
    this.metrics.events = [event, ...this.metrics.events].slice(0, 60);

    this.saveMetrics();
    this.notify();
  }

  public simulateLiveActivity() {
    const simulatedActions = [
      {
        type: 'color_select' as const,
        label: 'Probó Ocre Valle SW 6682',
        details: { color: 'Ocre Valle SW 6682', hex: '#D4A034' },
      },
      {
        type: 'whatsapp_trigger' as const,
        label: 'Cotización Hogar Valledupar',
        details: { segment: 'hogar', source: 'boton_segmento' },
      },
      {
        type: 'calculator_use' as const,
        label: 'Cálculo de área: 60 m² (4 Galones)',
        details: { areaM2: 60, finish: 'Mate Arquitectónico' },
      },
      {
        type: 'product_view' as const,
        label: 'Consultó Esmaltes Anticorrosivos',
        details: { product: 'Esmaltes Anticorrosivos' },
      },
      {
        type: 'whatsapp_trigger' as const,
        label: 'Cotización Obras y Cuñetes',
        details: { segment: 'obras', source: 'boton_constructora' },
      },
    ];

    const pick = simulatedActions[Math.floor(Math.random() * simulatedActions.length)];
    this.recordEvent(pick.type, pick.label, pick.details);
  }

  public resetMetrics() {
    localStorage.removeItem('color_center_analytics');
    this.metrics = this.loadInitialMetrics();
    this.notify();
  }

  public getMetrics(): AnalyticsMetrics {
    return { ...this.metrics };
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener(this.getMetrics());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const current = this.getMetrics();
    this.listeners.forEach((listener) => listener(current));
  }
}

export const analytics = new AnalyticsTracker();
