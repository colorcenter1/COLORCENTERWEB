import React, { useState } from 'react';
import { PRODUCTS, STORE_INFO } from '../data/mockData';
import { ProductItem } from '../types';
import { analytics } from '../services/analytics';
import { Search, Calculator, MessageCircle, Check, Car, Clock } from 'lucide-react';

interface ProductCatalogProps {
  onOpenCalculator: (product: ProductItem) => void;
  onOpenColorStudio: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onOpenCalculator,
  onOpenColorStudio,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'bases-bicapa', label: 'Bases Bicapa (OEM)' },
    { id: 'barnices-2k', label: 'Barnices 2K HS' },
    { id: 'primers-fondos', label: 'Primers & Fondos 2K' },
    { id: 'masillas', label: 'Masillas Poliéster' },
    { id: 'preparacion-abrasivos', label: 'Lijas & Enmascarado' },
    { id: 'pulido-detailing', label: 'Pulido & Detailing' },
  ];

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCat = activeCategory === 'todos' || product.category === activeCategory;
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.fullDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleProductWhatsApp = (product: ProductItem) => {
    analytics.recordEvent('whatsapp_trigger', `Consulta Automotriz: ${product.title}`, {
      product: product.title,
      category: product.category,
      source: 'catalogo_producto',
    });
  };

  const handleOpenCalc = (product: ProductItem) => {
    analytics.recordEvent('product_view', `Calculó piezas para: ${product.title}`, {
      product: product.title,
    });
    onOpenCalculator(product);
  };

  return (
    <section id="productos" className="py-14 sm:py-20 bg-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-8">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#006398] mb-1">
              <span>Línea Sherwin-Williams Automotive Finishes</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              <span className="text-slate-500 font-semibold">Valledupar</span>
            </div>
            <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#00236f] tracking-tight">
              Líneas y Productos de Repintado Automotriz
            </h2>
            <p className="font-body text-sm sm:text-base text-slate-600 mt-2 max-w-xl">
              Fórmulas bicapa de fábrica, barnices 2K de alto sólidos, masillas ultralivianas y abrasivos diseñados para el repintado profesional.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenColorStudio}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 text-[#00236f] border border-blue-200 text-xs sm:text-sm font-bold shadow-sm hover:bg-blue-100 transition-colors"
            >
              <Car className="w-4 h-4 text-amber-500" />
              <span>Simulador de Color</span>
            </button>

            <a
              href={`${STORE_INFO.whatsappUrl}?text=${encodeURIComponent('Hola Color Center Automotriz, solicito la lista de precios de mayoreo para talleres y productos Sherwin-Williams.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00236f] hover:bg-[#001b54] text-white text-xs sm:text-sm font-bold shadow-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Lista de Precios Taller</span>
            </a>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between pt-2">
          {/* Categories Horizontal Scroll */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  analytics.recordEvent('product_view', `Filtró categoría automotriz: ${cat.label}`);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#00236f] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por base, barniz, marca..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#006398]"
            />
          </div>
        </div>

        {/* Products Grid (Clean White Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:border-blue-300"
            >
              <div>
                {/* Image Container with Badge */}
                <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-slate-50 mb-4 shadow-inner border border-slate-100">
                  <img
                    src={product.imageUrl}
                    alt={product.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider shadow-sm ${product.badgeColor}`}>
                      {product.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/75 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    SW Auto
                  </div>
                </div>

                {/* Title & Short Description */}
                <h3 className="font-headline font-bold text-lg text-[#00236f] leading-snug">
                  {product.title}
                </h3>
                <p className="font-body text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                  {product.description}
                </p>

                {/* Technical mixing & specs */}
                {product.mixingRatio && (
                  <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] space-y-1">
                    <div className="flex items-center gap-1.5 text-[#00236f] font-bold">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Mezcla: {product.mixingRatio}</span>
                    </div>
                    {product.dryTime && (
                      <p className="text-slate-600">
                        {product.dryTime}
                      </p>
                    )}
                  </div>
                )}

                {/* Features Pill List */}
                <ul className="space-y-1.5 mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
                  {product.features.slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Sizes Available */}
                <div className="mt-3 pt-2 flex flex-wrap gap-1">
                  {product.sizes.map((sz, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-700"
                    >
                      {sz}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
                <button
                  type="button"
                  onClick={() => handleOpenCalc(product)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-blue-50/80 hover:bg-blue-100 text-[#00236f] border border-blue-200 text-xs font-bold transition-all shadow-sm active:scale-95 min-h-[44px]"
                >
                  <Calculator className="w-4 h-4 text-[#006398]" />
                  <span>Calcular piezas de mi vehículo</span>
                </button>

                <a
                  href={`${STORE_INFO.whatsappUrl}?text=${encodeURIComponent(`Hola Color Center Automotriz, deseo cotizar y consultar disponibilidad de: ${product.title}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleProductWhatsApp(product)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold transition-all shadow-sm active:scale-95 min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Consultar por WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
