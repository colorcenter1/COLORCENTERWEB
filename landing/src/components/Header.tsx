import React, { useState } from 'react';
import { STORE_INFO } from '../data/mockData';
import { analytics } from '../services/analytics';
import { BrandLogo } from './BrandLogo';
import { Moon, Sun, BarChart3, MessageCircle, Menu, X, Car } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenAnalytics: () => void;
  onOpenColorStudio: () => void;
  activeUsersCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  onOpenAnalytics,
  onOpenColorStudio,
  activeUsersCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string, label: string) => {
    setMobileMenuOpen(false);
    analytics.recordEvent('page_view', `Navegó a sección: ${label}`, { section: sectionId });
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsAppClick = () => {
    analytics.recordEvent('whatsapp_trigger', 'Header WhatsApp Click', { source: 'header' });
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-colors duration-300">
        {/* Dynamic Accent Bar: Official Color Center Logo Palette */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#00236f] via-[#003882] via-[#006398] via-[#0284c7] to-[#f59e0b]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-16 sm:h-20 flex items-center justify-between gap-3">
          {/* Brand Logo & Title with Official Component */}
          <div className="flex items-center gap-3 min-w-0">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center group min-w-0"
            >
              <BrandLogo size="md" variant="dark" />
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => handleNavClick('productos', 'Líneas Automotrices')}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-[#00236f] hover:bg-slate-100 transition-colors"
            >
              Líneas Automotrices
            </button>
            <button
              onClick={() => handleNavClick('por-que-elegirnos', 'Tecnología Sherwin-Williams')}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-[#00236f] hover:bg-slate-100 transition-colors"
            >
              Por qué elegirnos
            </button>
            <button
              onClick={() => handleNavClick('como-comprar', 'Cómo pedir por código')}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-[#00236f] hover:bg-slate-100 transition-colors"
            >
              Cómo pedir por código
            </button>
            <button
              onClick={() => handleNavClick('visitanos', 'Sede Valledupar')}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-[#00236f] hover:bg-slate-100 transition-colors"
            >
              Sede Valledupar
            </button>
            <button
              onClick={() => {
                onOpenColorStudio();
                analytics.recordEvent('color_select', 'Abrió Laboratorio de Color Automotriz');
              }}
              className="px-3.5 py-2 rounded-xl text-sm font-bold text-[#00236f] bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors flex items-center gap-1.5"
            >
              <Car className="w-4 h-4 text-amber-500" />
              <span>Simulador de Color</span>
            </button>
          </nav>

          {/* Right Action Icons: Live Analytics, Dark Mode Toggle, WhatsApp */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Real-Time Analytics Button */}
            <button
              onClick={onOpenAnalytics}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors text-xs font-semibold shadow-sm border border-slate-200"
              title="Panel de Analíticas y Pedidos en Tiempo Real"
              aria-label="Abrir panel de analíticas"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <BarChart3 className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline font-mono font-bold text-emerald-600">
                {activeUsersCount} online
              </span>
            </button>

            {/* Dark Mode Switcher */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 sm:p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all border border-slate-200"
              title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              aria-label="Alternar modo oscuro"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* WhatsApp Direct Action Button */}
            <a
              href={`${STORE_INFO.whatsappUrl}?text=${encodeURIComponent('Hola Color Center Automotriz Valledupar, vi su página oficial y deseo cotizar pintura para mi vehículo.')}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg active:scale-95 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span className="hidden xs:inline">WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">Menú Automotriz</span>
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {activeUsersCount} usuarios en línea
              </span>
            </div>
            <button
              onClick={() => handleNavClick('productos', 'Líneas Automotrices')}
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100 flex items-center justify-between"
            >
              <span>Líneas Automotrices</span>
              <span className="text-xs text-slate-400">Ultra 7000, 2K</span>
            </button>
            <button
              onClick={() => handleNavClick('por-que-elegirnos', 'Tecnología')}
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100 flex items-center justify-between"
            >
              <span>Por qué elegirnos</span>
              <span className="text-xs text-slate-400">Espectrofotómetro</span>
            </button>
            <button
              onClick={() => handleNavClick('como-comprar', 'Cómo pedir')}
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100 flex items-center justify-between"
            >
              <span>Cómo pedir por código</span>
              <span className="text-xs text-slate-400">3 pasos</span>
            </button>
            <button
              onClick={() => handleNavClick('visitanos', 'Sede Valledupar')}
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100 flex items-center justify-between"
            >
              <span>Sede Valledupar</span>
              <span className="text-xs text-slate-400">Pablo VI</span>
            </button>
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenColorStudio();
                }}
                className="w-full py-3 px-4 rounded-xl bg-blue-50 text-[#00236f] border border-blue-200 font-bold text-sm flex items-center justify-center gap-2 shadow-sm"
              >
                <Car className="w-4 h-4 text-amber-500" />
                <span>Abrir Simulador 3D de Color</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
