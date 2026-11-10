/**
 * Paleta orientativa de 20 tonos (PLAN TRABAJO.md, sección 3).
 * Los HEX son aproximaciones visuales para el simulador. No son códigos OEM,
 * fórmulas, referencias de fabricante ni productos disponibles.
 */
export type SimulatedFinish = 'solido' | 'metalizado' | 'perlado';

export interface PaletteTone {
  id: string;
  name: string;
  hex: string;
  finish: SimulatedFinish;
}

export interface PaletteFamily {
  id: string;
  name: string;
  tones: readonly PaletteTone[];
}

export const PALETTE: readonly PaletteFamily[] = [
  {
    id: 'blancos',
    name: 'Blancos',
    tones: [
      { id: 'blanco-puro', name: 'Blanco puro', hex: '#f3f4f1', finish: 'solido' },
      { id: 'blanco-perlado', name: 'Blanco perlado', hex: '#ebe7dc', finish: 'perlado' },
    ],
  },
  {
    id: 'platas-grises',
    name: 'Platas y grises',
    tones: [
      { id: 'plata-aluminio', name: 'Plata aluminio', hex: '#b8bdc2', finish: 'metalizado' },
      { id: 'gris-raton', name: 'Gris ratón', hex: '#85898c', finish: 'metalizado' },
      { id: 'gris-grafito', name: 'Gris grafito', hex: '#474b51', finish: 'metalizado' },
      { id: 'gris-cemento', name: 'Gris cemento', hex: '#8d9295', finish: 'solido' },
    ],
  },
  {
    id: 'negros',
    name: 'Negros',
    tones: [
      { id: 'negro-intenso', name: 'Negro intenso', hex: '#0e0f11', finish: 'solido' },
      { id: 'negro-perlado', name: 'Negro perlado', hex: '#1a1b21', finish: 'perlado' },
      { id: 'negro-nebuloso', name: 'Negro nebuloso', hex: '#2b2d32', finish: 'metalizado' },
    ],
  },
  {
    id: 'rojos',
    name: 'Rojos',
    tones: [
      { id: 'rojo-vivo', name: 'Rojo vivo', hex: '#c8102e', finish: 'solido' },
      { id: 'rojo-diamante', name: 'Rojo diamante', hex: '#8f0e1d', finish: 'perlado' },
      { id: 'vinotinto', name: 'Vinotinto', hex: '#5a1022', finish: 'metalizado' },
    ],
  },
  {
    id: 'azules',
    name: 'Azules',
    tones: [
      { id: 'azul-electrico', name: 'Azul eléctrico', hex: '#0b5ed7', finish: 'metalizado' },
      { id: 'azul-oscuro', name: 'Azul oscuro', hex: '#15223f', finish: 'metalizado' },
      { id: 'azul-acero', name: 'Azul acero', hex: '#4a6a8a', finish: 'metalizado' },
    ],
  },
  {
    id: 'otros',
    name: 'Otros',
    tones: [
      { id: 'beige-champana', name: 'Beige champaña', hex: '#c9b893', finish: 'metalizado' },
      { id: 'cafe-metalizado', name: 'Café metalizado', hex: '#5b3e2b', finish: 'metalizado' },
      { id: 'verde-oliva', name: 'Verde oliva', hex: '#5e6b3a', finish: 'solido' },
      { id: 'amarillo-intenso', name: 'Amarillo intenso', hex: '#f2b705', finish: 'solido' },
      { id: 'naranja-cobre', name: 'Naranja cobre', hex: '#b4582a', finish: 'metalizado' },
    ],
  },
];

export const ALL_TONES: readonly PaletteTone[] = PALETTE.flatMap((family) => family.tones);

export const DEFAULT_TONE_ID = 'azul-electrico';

export function findTone(id: string): PaletteTone | undefined {
  return ALL_TONES.find((tone) => tone.id === id);
}

export const FINISH_LABEL: Record<SimulatedFinish, string> = {
  solido: 'sólido',
  metalizado: 'metalizado',
  perlado: 'perlado',
};

export const COLOR_DISCLAIMER =
  'Vista aproximada. El color y acabado reales deben confirmarse con una muestra y asesoría del negocio.';
