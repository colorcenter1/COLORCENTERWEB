import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TrustBar } from './components/TrustBar';
import { SegmentsSection } from './components/SegmentsSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ProductCatalog } from './components/ProductCatalog';
import { StepsSection } from './components/StepsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { StoreSection } from './components/StoreSection';
import { FinalCta } from './components/FinalCta';
import { TechNotesAccordion } from './components/TechNotesAccordion';
import { Footer } from './components/Footer';
import { MobileNavDock } from './components/MobileNavDock';
import { PaintCalculatorModal } from './components/PaintCalculatorModal';
import { ColorStudioModal } from './components/ColorStudioModal';
import { AnalyticsDashboardModal } from './components/AnalyticsDashboardModal';
import { ProductItem } from './types';
import { analytics } from './services/analytics';
import { Smartphone, Monitor, Maximize2 } from 'lucide-react';

export default function App() {
  // Always default to clean, high-contrast white background theme as requested
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const [activeUsersCount, setActiveUsersCount] = useState<number>(12);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);
  const [calculatorProduct, setCalculatorProduct] = useState<ProductItem | null>(null);
  const [isColorStudioOpen, setIsColorStudioOpen] = useState<boolean>(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState<boolean>(false);

  // View frame mode: 'auto' (fluid responsive), 'mobile' (simulates mobile screen frame), 'desktop'
  const [viewportMode, setViewportMode] = useState<'auto' | 'mobile' | 'desktop'>('auto');

  // Enforce white theme on document root
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('color_center_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('color_center_theme', 'light');
    }
  }, [darkMode]);

  // Track initial page view & subscribe to live metrics
  useEffect(() => {
    analytics.recordEvent('page_view', 'Carga inicial de Color Center Automotriz Valledupar (Fondo Blanco)');
    const unsubscribe = analytics.subscribe((metrics) => {
      setActiveUsersCount(metrics.activeNow);
    });
    return () => unsubscribe();
  }, []);

  const handleToggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    analytics.recordEvent('theme_toggle', `Cambió tema a: ${next ? 'Oscuro' : 'Claro'}`);
  };

  const handleOpenCalculator = (product?: ProductItem) => {
    if (product) {
      setCalculatorProduct(product);
    }
    setIsCalculatorOpen(true);
  };

  const handleExploreProducts = () => {
    const el = document.getElementById('productos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen bg-white text-slate-900 flex flex-col font-sans transition-colors duration-300 ${viewportMode === 'mobile' ? 'items-center justify-start py-4 bg-slate-100' : ''}`}>
      {/* Viewport Simulation Bar (Top Light Controller matching white page aesthetic) */}
      <div className="w-full bg-white text-slate-700 py-1.5 px-4 text-xs flex items-center justify-between border-b border-slate-200 z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-extrabold text-[#00236f]">Color Center Automotriz Valledupar</span>
          <span className="hidden sm:inline text-slate-500">· Distribuidor Oficial Sherwin-Williams Automotive Finishes</span>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
          <button
            onClick={() => setViewportMode('auto')}
            className={`px-2 py-0.5 rounded flex items-center gap-1 transition-colors ${
              viewportMode === 'auto'
                ? 'bg-[#00236f] text-white font-bold shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Vista fluida y responsiva según el tamaño de tu pantalla"
          >
            <Maximize2 className="w-3 h-3" />
            <span className="hidden xs:inline">Auto</span>
          </button>
          <button
            onClick={() => setViewportMode('mobile')}
            className={`px-2 py-0.5 rounded flex items-center gap-1 transition-colors ${
              viewportMode === 'mobile'
                ? 'bg-[#00236f] text-white font-bold shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Vista simulación móvil 390px"
          >
            <Smartphone className="w-3 h-3" />
            <span className="hidden xs:inline">Móvil (390px)</span>
          </button>
          <button
            onClick={() => setViewportMode('desktop')}
            className={`px-2 py-0.5 rounded flex items-center gap-1 transition-colors ${
              viewportMode === 'desktop'
                ? 'bg-[#00236f] text-white font-bold shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Vista de escritorio"
          >
            <Monitor className="w-3 h-3" />
            <span className="hidden xs:inline">Escritorio</span>
          </button>
        </div>
      </div>

      {/* Main Container Wrapper - Pure White Background */}
      <div
        className={`w-full transition-all duration-300 flex flex-col min-h-screen bg-white ${
          viewportMode === 'mobile'
            ? 'max-w-[412px] bg-white shadow-2xl rounded-[36px] overflow-hidden border-[8px] border-slate-800 my-4 relative'
            : viewportMode === 'desktop'
            ? 'max-w-[1280px] mx-auto shadow-xl my-2 bg-white border border-slate-200/80 rounded-2xl overflow-hidden'
            : ''
        }`}
      >
        {/* Navigation Header */}
        <Header
          darkMode={darkMode}
          onToggleDarkMode={handleToggleDarkMode}
          onOpenAnalytics={() => setIsAnalyticsOpen(true)}
          onOpenColorStudio={() => setIsColorStudioOpen(true)}
          activeUsersCount={activeUsersCount}
        />

        {/* Content Body with top padding for fixed header */}
        <main className="flex-1 pt-16 sm:pt-20 pb-20 md:pb-0 bg-white">
          {/* 1. Hero Section with trend swatches & Car Paint Simulator */}
          <HeroSection
            onOpenColorStudio={() => setIsColorStudioOpen(true)}
            onExploreProducts={handleExploreProducts}
          />

          {/* 2. Trust Bar (3 Pillars) */}
          <TrustBar />

          {/* 3. Customer Segments (Talleres, Pintores, Flotas) */}
          <SegmentsSection />

          {/* 4. Why Choose Us */}
          <WhyChooseUs />

          {/* 5. Product Catalog with categories & vehicle paint calculator */}
          <ProductCatalog
            onOpenCalculator={handleOpenCalculator}
            onOpenColorStudio={() => setIsColorStudioOpen(true)}
          />

          {/* 6. How to Buy in 3 Steps */}
          <StepsSection />

          {/* 7. Local Testimonials in Valledupar */}
          <TestimonialsSection />

          {/* 8. FAQs */}
          <FaqSection />

          {/* 9. Valledupar Physical Store & Map */}
          <StoreSection />

          {/* 10. Final Call to Action Banner */}
          <FinalCta />

          {/* 11. Technical Launch Notes & Checklist */}
          <TechNotesAccordion />
        </main>

        {/* Footer */}
        <Footer />

        {/* Mobile Fixed Bottom Nav Dock & Floating WhatsApp Action */}
        <MobileNavDock
          onOpenColorStudio={() => setIsColorStudioOpen(true)}
          onOpenAnalytics={() => setIsAnalyticsOpen(true)}
        />
      </div>

      {/* Modals */}
      <PaintCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        preselectedProduct={calculatorProduct}
      />

      <ColorStudioModal
        isOpen={isColorStudioOpen}
        onClose={() => setIsColorStudioOpen(false)}
      />

      <AnalyticsDashboardModal
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
      />
    </div>
  );
}
