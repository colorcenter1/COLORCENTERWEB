/**
 * Categorías del plan. Las descripciones solo nombran productos que el propietario
 * confirmó vender: pinturas, barnices, catalizadores, cintas, lijas, pistolas,
 * ceras y complementos. Referencias, marcas, precios y existencias: pendientes.
 */
export type CategoryIcon = 'paint' | 'sand' | 'tape' | 'spray' | 'shine' | 'kit';

export interface Category {
  id: string;
  name: string;
  summary: string;
  icon: CategoryIcon;
}

export const CATEGORIES: readonly Category[] = [
  {
    id: 'pinturas',
    name: 'Pinturas, barnices y catalizadores',
    summary: 'Pintura automotriz, barnices y los catalizadores para prepararlos.',
    icon: 'paint',
  },
  {
    id: 'preparacion',
    name: 'Preparación y abrasivos',
    summary: 'Lijas e insumos para preparar la superficie antes de pintar.',
    icon: 'sand',
  },
  {
    id: 'enmascarado',
    name: 'Cintas y enmascarado',
    summary: 'Cintas para proteger y delimitar las zonas que no se pintan.',
    icon: 'tape',
  },
  {
    id: 'pistolas',
    name: 'Pistolas',
    summary: 'Pistolas para la aplicación de pintura y barniz.',
    icon: 'spray',
  },
  {
    id: 'pulido',
    name: 'Ceras y pulido',
    summary: 'Ceras y productos para el acabado y el cuidado del brillo.',
    icon: 'shine',
  },
  {
    id: 'complementos',
    name: 'Protección y complementos',
    summary: 'Complementos para el trabajo de pintura. Pregunta por lo que necesitas.',
    icon: 'kit',
  },
];

export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
}

/** Respuestas limitadas a lo acordado con el propietario (compra por WhatsApp y recogida en sede). */
export const FAQ: readonly FaqEntry[] = [
  {
    id: 'como-compro',
    question: '¿Cómo compro?',
    answer:
      'Escríbenos por WhatsApp con lo que necesitas. Un asesor te confirma precio y disponibilidad, y recoges tu pedido en la sede. La página no recibe pagos.',
  },
  {
    id: 'donde-recojo',
    question: '¿Dónde recojo mi pedido?',
    answer:
      'En nuestra sede de Cl. 21 #17-96, Valledupar. Antes de ir, confirma por WhatsApp que tu pedido está listo.',
  },
  {
    id: 'color-exacto',
    question: '¿El simulador muestra el color exacto?',
    answer:
      'No. Es una vista aproximada para explorar tonos. El color y el acabado reales se confirman con una muestra y la asesoría del negocio.',
  },
  {
    id: 'codigo-color',
    question: '¿Qué información sirve para consultar un color?',
    answer:
      'Comparte el tono que buscas y, si lo tienes, el código de color del vehículo o una foto de la pieza. Con eso el asesor te orienta sobre las opciones disponibles.',
  },
  {
    id: 'presentaciones',
    question: '¿Qué presentaciones manejan?',
    answer:
      'Las presentaciones y cantidades dependen de cada producto. Pregunta por WhatsApp y te indicamos las opciones disponibles.',
  },
  {
    id: 'servicios',
    question: '¿Pintan o reparan vehículos?',
    answer:
      'No. Color Center vende pinturas e insumos automotrices; no presta servicios de pintura, latonería ni mantenimiento.',
  },
];
