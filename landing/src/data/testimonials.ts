/**
 * Testimonios del carrusel.
 *
 * IMPORTANTE (2026-11-11): son textos de referencia redactados a pedido del propietario
 * para validar el diseño. Deben reemplazarse por testimonios reales y autorizados por
 * cada cliente antes del lanzamiento público. Para cambiarlos basta con editar
 * `quote`, `name` y `detail`; no se usan en datos estructurados (sin reseñas en JSON-LD).
 */
export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  detail: string;
}

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: 't1',
    quote:
      'Les escribí por WhatsApp con la foto de la pieza y me ayudaron a escoger la pintura y el barniz. Pasé a recoger y todo estaba listo.',
    name: 'Andrés R.',
    detail: 'Pintor automotriz · Valledupar',
  },
  {
    id: 't2',
    quote:
      'Necesitaba lijas, cinta y catalizador para un trabajo del taller. Me confirmaron precio y disponibilidad en la misma conversación.',
    name: 'Luis M.',
    detail: 'Taller de latonería y pintura',
  },
  {
    id: 't3',
    quote:
      'No sabía qué productos pedir para retocar el bómper. Me explicaron con paciencia qué necesitaba y no me vendieron de más.',
    name: 'Carolina P.',
    detail: 'Cliente particular',
  },
  {
    id: 't4',
    quote:
      'Probé el color en el simulador, lo envié por WhatsApp y con eso empezamos la asesoría. Muy práctico para decidir.',
    name: 'Jorge D.',
    detail: 'Cliente particular',
  },
  {
    id: 't5',
    quote:
      'Compro con ellos ceras y complementos para el acabado. Buena atención y siempre me avisan cuando el pedido está para recoger.',
    name: 'Yesid C.',
    detail: 'Detallado automotriz',
  },
];
