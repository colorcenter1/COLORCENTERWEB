const HEX_PATTERN = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;

/** Devuelve el HEX normalizado (#rrggbb, minúsculas) o null si no es válido. */
export function normalizeHex(input: string): string | null {
  const match = HEX_PATTERN.exec(input.trim());
  if (!match) return null;
  const digits = match[1].toLowerCase();
  const full = digits.length === 3 ? digits.split('').map((d) => d + d).join('') : digits;
  return `#${full}`;
}

function channelToLinear(value: number): number {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

/** Luminancia relativa WCAG de un HEX válido. */
export function relativeLuminance(hex: string): number {
  const normalized = normalizeHex(hex);
  if (!normalized) throw new Error(`HEX no válido: ${hex}`);
  const r = parseInt(normalized.slice(1, 3), 16);
  const g = parseInt(normalized.slice(3, 5), 16);
  const b = parseInt(normalized.slice(5, 7), 16);
  return 0.2126 * channelToLinear(r) + 0.7152 * channelToLinear(g) + 0.0722 * channelToLinear(b);
}

/** Elige texto oscuro o claro con mejor contraste sobre el color dado. */
export function readableTextOn(hex: string): '#0b1430' | '#ffffff' {
  const lum = relativeLuminance(hex);
  const contrastWithWhite = 1.05 / (lum + 0.05);
  const contrastWithInk = (lum + 0.05) / (relativeLuminance('#0b1430') + 0.05);
  return contrastWithInk >= contrastWithWhite ? '#0b1430' : '#ffffff';
}
