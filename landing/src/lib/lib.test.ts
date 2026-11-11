import { describe, expect, it } from 'vitest';
import { ALL_TONES, COLOR_DISCLAIMER, PALETTE, findTone } from '../data/palette';
import { ALL_PRODUCTS, CATEGORIES, FAQ } from '../data/catalog';
import { BODY_MODELS, findBody } from '../components/simulator/models';
import { TESTIMONIALS } from '../data/testimonials';
import { normalizeHex, readableTextOn, relativeLuminance } from './color';
import { colorInquiry, generalInquiry, productInquiry, whatsappUrl } from './whatsapp';

describe('normalizeHex', () => {
  it('acepta HEX de 6 dígitos con o sin numeral', () => {
    expect(normalizeHex('#1A5FB4')).toBe('#1a5fb4');
    expect(normalizeHex('1a5fb4')).toBe('#1a5fb4');
  });

  it('expande HEX de 3 dígitos', () => {
    expect(normalizeHex('#abc')).toBe('#aabbcc');
  });

  it('rechaza valores no válidos', () => {
    expect(normalizeHex('')).toBeNull();
    expect(normalizeHex('#12345')).toBeNull();
    expect(normalizeHex('#ggg000')).toBeNull();
    expect(normalizeHex('rojo')).toBeNull();
    expect(normalizeHex('javascript:alert(1)')).toBeNull();
  });
});

describe('contraste', () => {
  it('calcula la luminancia de blanco y negro', () => {
    expect(relativeLuminance('#ffffff')).toBeCloseTo(1, 5);
    expect(relativeLuminance('#000000')).toBeCloseTo(0, 5);
  });

  it('elige texto legible sobre fondos claros y oscuros', () => {
    expect(readableTextOn('#f3f4f1')).toBe('#0b1430');
    expect(readableTextOn('#0e0f11')).toBe('#ffffff');
  });

  it('lanza error con un HEX no válido', () => {
    expect(() => relativeLuminance('no')).toThrow();
  });
});

describe('enlaces de WhatsApp', () => {
  it('codifica el mensaje y usa el número del negocio', () => {
    const url = whatsappUrl('Hola & gracias');
    expect(url).toBe('https://wa.me/573004426477?text=Hola%20%26%20gracias');
  });

  it('omite el texto vacío', () => {
    expect(whatsappUrl('   ')).toBe('https://wa.me/573004426477');
  });

  it('incluye el producto consultado', () => {
    expect(productInquiry('Lijas')).toContain('precio de: Lijas.');
    expect(generalInquiry()).toContain('pinturas e insumos automotrices');
  });

  it('describe tono de la paleta con carrocería, sin códigos', () => {
    const message = colorInquiry({ bodyLabel: 'Pickup', colorName: 'Gris grafito', hex: '#474b51', isCustom: false });
    expect(message).toContain('Carrocería: Pickup.');
    expect(message).toContain('Tono de la paleta orientativa: Gris grafito.');
    expect(message).not.toContain('#474B51');
  });

  it('identifica un color libre como personalizado con su HEX', () => {
    const message = colorInquiry({ bodyLabel: 'Sedán', colorName: 'Color personalizado', hex: '#1a5fb4', isCustom: true });
    expect(message).toContain('Color personalizado elegido en el simulador: #1A5FB4.');
  });
});

describe('contenido acordado', () => {
  it('tiene exactamente 20 tonos únicos con HEX válido', () => {
    expect(ALL_TONES).toHaveLength(20);
    expect(new Set(ALL_TONES.map((t) => t.id)).size).toBe(20);
    ALL_TONES.forEach((tone) => expect(normalizeHex(tone.hex)).toBe(tone.hex));
  });

  it('agrupa los tonos en las seis familias del plan', () => {
    expect(PALETTE.map((f) => f.name)).toEqual(['Blancos', 'Platas y grises', 'Negros', 'Rojos', 'Azules', 'Otros']);
    expect(findTone('gris-raton')?.name).toBe('Gris ratón');
    expect(findTone('inexistente')).toBeUndefined();
  });

  it('mantiene el aviso exacto de vista aproximada', () => {
    expect(COLOR_DISCLAIMER).toBe(
      'Vista aproximada. El color y acabado reales deben confirmarse con una muestra y asesoría del negocio.',
    );
  });

  it('ofrece seis categorías con los productos confirmados y no promete servicios', () => {
    expect(CATEGORIES).toHaveLength(6);
    expect(ALL_PRODUCTS.map((p) => p.name)).toEqual([
      'Pinturas automotrices',
      'Barnices',
      'Catalizadores',
      'Lijas',
      'Cintas de enmascarar',
      'Pistolas de pintura',
      'Ceras',
      'Complementos',
    ]);
    const text = [
      ...ALL_PRODUCTS.map((p) => p.use),
      ...CATEGORIES.map((c) => c.intro),
      ...FAQ.filter((f) => f.id !== 'servicios').map((f) => f.answer),
    ]
      .join(' ')
      .toLowerCase();
    expect(text).not.toMatch(/latoner|mantenimiento|pintamos|reparamos/);
  });

  it('expone las tres carrocerías', () => {
    expect(BODY_MODELS.map((b) => b.id)).toEqual(['sedan', 'hatchback', 'pickup']);
    expect(findBody('pickup').label).toBe('Pickup');
  });

  it('tiene cinco testimonios completos y con id único', () => {
    expect(TESTIMONIALS).toHaveLength(5);
    expect(new Set(TESTIMONIALS.map((t) => t.id)).size).toBe(5);
    TESTIMONIALS.forEach((t) => {
      expect(t.quote.length).toBeGreaterThan(20);
      expect(t.name).not.toBe('');
    });
  });
});
