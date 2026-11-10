/**
 * Productos que el propietario confirmó vender, agrupados en las categorías del plan.
 * Las descripciones explican para qué sirve cada tipo de producto; no afirman marcas,
 * referencias, precios, presentaciones ni existencias (pendientes de confirmar).
 */
export type CategoryIcon = 'paint' | 'sand' | 'tape' | 'spray' | 'shine' | 'kit';

export interface Product {
  id: string;
  name: string;
  use: string;
}

export interface Category {
  id: string;
  name: string;
  intro: string;
  icon: CategoryIcon;
  products: readonly Product[];
}

export const CATEGORIES: readonly Category[] = [
  {
    id: 'pinturas',
    name: 'Pinturas, barnices y catalizadores',
    intro: 'Lo esencial para dar color y acabado a tu vehículo.',
    icon: 'paint',
    products: [
      {
        id: 'pinturas-automotrices',
        name: 'Pinturas automotrices',
        use: 'Para repintar una pieza o el vehículo completo. Cuéntanos el tono que buscas y te orientamos.',
      },
      {
        id: 'barnices',
        name: 'Barnices',
        use: 'La capa transparente que protege la pintura y le da el brillo final.',
      },
      {
        id: 'catalizadores',
        name: 'Catalizadores',
        use: 'Se mezclan con los productos que los requieren, según su ficha, para que endurezcan.',
      },
    ],
  },
  {
    id: 'preparacion',
    name: 'Preparación y abrasivos',
    intro: 'Una buena pintura empieza por una superficie bien preparada.',
    icon: 'sand',
    products: [
      { id: 'lijas', name: 'Lijas', use: 'Para preparar y alisar la superficie antes de pintar y entre capas.' },
    ],
  },
  {
    id: 'enmascarado',
    name: 'Cintas y enmascarado',
    intro: 'Protege lo que no se va a pintar.',
    icon: 'tape',
    products: [
      {
        id: 'cintas',
        name: 'Cintas de enmascarar',
        use: 'Delimitan bordes y cubren vidrios, molduras y zonas que deben quedar intactas.',
      },
    ],
  },
  {
    id: 'pistolas',
    name: 'Pistolas',
    intro: 'Para aplicar con control.',
    icon: 'spray',
    products: [
      { id: 'pistolas', name: 'Pistolas de pintura', use: 'Para aplicar pintura y barniz de forma pareja.' },
    ],
  },
  {
    id: 'pulido',
    name: 'Ceras y pulido',
    intro: 'El cuidado después de pintar.',
    icon: 'shine',
    products: [{ id: 'ceras', name: 'Ceras', use: 'Para el acabado y el cuidado del brillo de la pintura.' }],
  },
  {
    id: 'complementos',
    name: 'Protección y complementos',
    intro: 'Lo que completa el trabajo.',
    icon: 'kit',
    products: [
      {
        id: 'complementos',
        name: 'Complementos',
        use: 'Otros insumos para el trabajo de pintura. Pregunta por lo que necesitas y te confirmamos.',
      },
    ],
  },
];

export const ALL_PRODUCTS: readonly Product[] = CATEGORIES.flatMap((category) => category.products);

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
