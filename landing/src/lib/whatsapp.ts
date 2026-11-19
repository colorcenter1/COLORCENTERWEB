import { BUSINESS } from '../data/business';

const GREETING = 'Hola, Color Center.';

/** Construye un enlace de WhatsApp con el mensaje codificado. No envía nada por sí mismo. */
export function whatsappUrl(message: string, phone: string = BUSINESS.whatsappNumber): string {
  const text = message.trim();
  const base = `https://wa.me/${phone}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function generalInquiry(): string {
  return `${GREETING} Quiero consultar por pinturas e insumos automotrices.`;
}

export function productInquiry(productName: string): string {
  return `${GREETING} Quiero consultar disponibilidad, presentaciones y precio de: ${productName}.`;
}

export interface ColorInquiry {
  bodyLabel: string;
  colorName: string;
  hex: string;
  isCustom: boolean;
  paintCode?: string;
}

export function colorInquiry({ bodyLabel, colorName, hex, isCustom, paintCode = '' }: ColorInquiry): string {
  const colorLine = isCustom
    ? `Color personalizado elegido en el simulador: ${hex.toUpperCase()}.`
    : `Tono de la paleta orientativa: ${colorName}.`;
  return [
    `${GREETING} Probé un color en el simulador de la web.`,
    `Carrocería: ${bodyLabel}.`,
    colorLine,
    ...(paintCode.trim() ? [`Código de pintura indicado: ${paintCode.trim()}.`] : []),
    'Quisiera asesoría para conseguir pintura e insumos en un tono parecido.',
  ].join('\n');
}
