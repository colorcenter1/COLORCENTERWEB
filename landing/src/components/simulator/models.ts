/**
 * Identificación del vehículo de muestra, genérico y sin marca.
 */
export type BodyId = 'sample';

export interface BodyModel {
  id: BodyId;
  label: string;
  /** Giro inicial en grados para mostrar el vehículo de tres cuartos. */
  initialYawDeg: number;
}

export const BODY_MODELS: readonly BodyModel[] = [
  { id: 'sample', label: 'Auto de muestra (modelo conceptual sin marca)', initialYawDeg: -35 },
];

export const DEFAULT_BODY: BodyId = 'sample';

export function findBody(id: BodyId): BodyModel {
  const found = BODY_MODELS.find((body) => body.id === id);
  if (!found) throw new Error(`Carrocería desconocida: ${id}`);
  return found;
}
