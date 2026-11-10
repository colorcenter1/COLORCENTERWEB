import type { CSSProperties } from 'react';
import { findTone, type PaletteTone } from '../../data/palette';

const FAN_SPAN_DEG = 112;

/** Orden visual del abanico: de claros a oscuros, cerrando con el azul de la marca al frente. */
const FAN_ORDER = [
  'blanco-puro', 'blanco-perlado', 'beige-champana', 'amarillo-intenso', 'naranja-cobre',
  'rojo-vivo', 'rojo-diamante', 'vinotinto', 'cafe-metalizado', 'verde-oliva',
  'negro-intenso', 'negro-perlado', 'negro-nebuloso', 'gris-grafito', 'gris-raton',
  'gris-cemento', 'plata-aluminio', 'azul-acero', 'azul-oscuro', 'azul-electrico',
];

const FAN_TONES: readonly PaletteTone[] = FAN_ORDER.map((id) => findTone(id)).filter(
  (tone): tone is PaletteTone => tone !== undefined,
);

type ChipStyle = CSSProperties & { '--angle': string; '--chip': string; '--i': number };

/**
 * Abanico de muestras con los 20 tonos orientativos. Es una composición gráfica
 * (no una foto del negocio) y se oculta a lectores de pantalla.
 */
export function ChipFan() {
  const count = FAN_TONES.length;
  const step = FAN_SPAN_DEG / (count - 1);

  return (
    <div className="fan" data-animate="true" aria-hidden="true">
      {FAN_TONES.map((tone, index) => {
        const style: ChipStyle = {
          '--angle': `${(-FAN_SPAN_DEG / 2 + index * step).toFixed(2)}deg`,
          '--chip': tone.hex,
          '--i': index,
          zIndex: index,
        };
        return (
          <div key={tone.id} className="fan-chip" style={style}>
            <i />
            <b>{tone.name}</b>
          </div>
        );
      })}
      <span className="fan-pin" />
    </div>
  );
}
