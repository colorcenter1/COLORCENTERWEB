/**
 * Carrocerías del simulador. Este archivo no importa Three.js, para que la página
 * pueda listar las opciones sin descargar la biblioteca 3D.
 *
 * Los vehículos son modelos propios generados por código (carSpecs.ts y carFactory.ts),
 * creados a solicitud del propietario el 2026-11-10: sin marcas, sin licencias de terceros
 * y sin archivos de modelo que descargar.
 */
export type BodyId = 'sedan' | 'hatchback' | 'pickup';

export interface BodyModel {
  id: BodyId;
  label: string;
  /** Giro inicial en grados para mostrar el vehículo de tres cuartos. */
  initialYawDeg: number;
}

export const BODY_MODELS: readonly BodyModel[] = [
  { id: 'sedan', label: 'Sedán', initialYawDeg: -35 },
  { id: 'hatchback', label: 'Hatchback', initialYawDeg: -35 },
  { id: 'pickup', label: 'Pickup', initialYawDeg: -35 },
];

export const DEFAULT_BODY: BodyId = 'sedan';

export function findBody(id: BodyId): BodyModel {
  const found = BODY_MODELS.find((body) => body.id === id);
  if (!found) throw new Error(`Carrocería desconocida: ${id}`);
  return found;
}
