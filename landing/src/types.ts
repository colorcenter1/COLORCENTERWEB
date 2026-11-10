export interface ColorSwatch {
  id: string;
  name: string;
  code: string;
  hex: string;
  family: string;
  description: string;
  tag: string;
  textColor: string;
  finishType: 'Perlado Tricapa' | 'Metálico Fino' | 'Sólido Gloss PU' | 'Satinado / Mate';
  carModelSuggestion: string; // e.g. "Toyota, Mazda, Chevrolet, Renault"
  recommendedUse: string;
}

export type AutoProductCategory =
  | 'bases-bicapa'
  | 'barnices-2k'
  | 'primers-fondos'
  | 'masillas'
  | 'preparacion-abrasivos'
  | 'pulido-detailing';

export interface ProductItem {
  id: string;
  title: string;
  badge: string;
  badgeColor: string;
  description: string;
  fullDescription: string;
  coveragePerGal: string; // e.g., "1/4 de galón rinde 2 a 3 piezas a 2 manos"
  sizes: string[];
  finishes: string[];
  imageUrl: string;
  imageAlt: string;
  category: AutoProductCategory;
  features: string[];
  mixingRatio?: string; // e.g., "2:1 con Catalizador CC920 + 10% Thinner PU"
  dryTime?: string; // e.g., "Secado al tacto en 15 min, horneo 30 min a 60°C"
}

export interface VehiclePieceOption {
  id: string;
  name: string;
  category: 'frente' | 'costado' | 'techo_baul' | 'completo';
  relativeUnits: number; // 1 unit ~ 1 piece (approx 1/8 gal or 350-400ml sprayable base)
  defaultChecked?: boolean;
}

export interface CustomerSegment {
  id: string;
  category: string;
  title: string;
  description: string;
  iconName: string;
  accentColor: string;
  benefits: string[];
  whatsappMessage: string;
  buttonText: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  avatarInitial: string;
  avatarBg: string;
  comment: string;
  rating: number;
  neighborhood: string;
  shopName?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface AnalyticsEvent {
  id: string;
  type:
    | 'page_view'
    | 'color_select'
    | 'cta_click'
    | 'product_view'
    | 'calculator_use'
    | 'theme_toggle'
    | 'faq_toggle'
    | 'whatsapp_trigger';
  label: string;
  timestamp: number;
  details?: Record<string, any>;
  deviceType: 'mobile' | 'desktop' | 'tablet';
}

export interface AnalyticsMetrics {
  totalVisits: number;
  uniqueVisitors: number;
  activeNow: number;
  whatsAppConversions: number;
  calculatorSimulations: number;
  colorPreviews: number;
  events: AnalyticsEvent[];
  conversionsBySegment: {
    talleres: number;
    pintores: number;
    flotas: number;
    general: number;
  };
  colorPopularity: Record<string, number>;
  deviceBreakdown: {
    mobile: number;
    desktop: number;
  };
}
