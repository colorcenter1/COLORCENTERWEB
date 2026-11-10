/**
 * Medidas y perfiles de los vehículos genéricos creados para Color Center.
 * Diseño propio (sin marcas ni copias de modelos reales). Unidades en metros;
 * eje x = largo (frente en +x), eje y = alto.
 */
import type { BodyId } from './models';

export type Point = readonly [number, number];

/** Comandos de trazado: M/L punto, Q curva cuadrática, A paso de rueda centrado en x. */
export type PathCmd =
  | readonly ['M', number, number]
  | readonly ['L', number, number]
  | readonly ['Q', number, number, number, number]
  | readonly ['A', number];

export interface Curve {
  from: Point;
  ctrl: Point;
  to: Point;
}

export interface LampSpec {
  x: number;
  y: number;
  z: number;
  size: readonly [number, number, number];
}

export interface CarSpec {
  width: number;
  bottomY: number;
  wheelRadius: number;
  tireWidth: number;
  archRadius: number;
  axles: readonly [number, number];
  beltY: number;
  lower: readonly PathCmd[];
  cabin: readonly PathCmd[];
  cabinWidthRatio: number;
  tumblehome: number;
  windshield: Curve;
  rearGlass: Curve;
  sideWindows: readonly (readonly Point[])[];
  doorSeams: readonly number[];
  handles: readonly number[];
  mirrorX: number;
  headlight: LampSpec;
  taillight: LampSpec;
  grille: LampSpec;
  frontFaceX: number;
  rearFaceX: number;
  bed?: { fromX: number; toX: number; topY: number };
}

const SEDAN: CarSpec = {
  width: 1.8,
  bottomY: 0.3,
  wheelRadius: 0.33,
  tireWidth: 0.22,
  archRadius: 0.39,
  axles: [1.4, -1.32],
  beltY: 0.99,
  lower: [
    ['M', -2.24, 0.3],
    ['A', -1.32],
    ['A', 1.4],
    ['L', 2.18, 0.3],
    ['Q', 2.3, 0.32, 2.31, 0.48],
    ['L', 2.31, 0.62],
    ['Q', 2.3, 0.8, 2.12, 0.84],
    ['Q', 1.5, 0.93, 0.92, 0.98],
    ['L', -1.45, 1.0],
    ['Q', -1.75, 1.02, -2.18, 0.99],
    ['Q', -2.3, 0.97, -2.31, 0.86],
    ['L', -2.31, 0.52],
    ['Q', -2.3, 0.32, -2.24, 0.3],
  ],
  cabin: [
    ['M', 0.98, 0.95],
    ['Q', 0.55, 1.12, 0.05, 1.38],
    ['Q', -0.05, 1.43, -0.25, 1.44],
    ['L', -0.85, 1.44],
    ['Q', -1.05, 1.43, -1.15, 1.38],
    ['Q', -1.45, 1.18, -1.62, 0.97],
    ['L', -1.62, 0.95],
  ],
  cabinWidthRatio: 0.86,
  tumblehome: 0.13,
  windshield: { from: [0.98, 0.97], ctrl: [0.55, 1.12], to: [0.05, 1.38] },
  rearGlass: { from: [-1.15, 1.38], ctrl: [-1.45, 1.18], to: [-1.62, 0.97] },
  sideWindows: [
    [[0.78, 1.04], [0.06, 1.34], [-0.42, 1.37], [-0.42, 1.04]],
    [[-0.5, 1.04], [-0.5, 1.37], [-0.86, 1.38], [-1.04, 1.33], [-1.36, 1.05]],
  ],
  doorSeams: [0.9, -0.46, -1.42],
  handles: [0.25, -0.75],
  mirrorX: 0.8,
  headlight: { x: 2.2, y: 0.76, z: 0.6, size: [0.16, 0.1, 0.4] },
  taillight: { x: -2.26, y: 0.86, z: 0.6, size: [0.12, 0.1, 0.42] },
  grille: { x: 2.28, y: 0.6, z: 0, size: [0.08, 0.14, 0.78] },
  frontFaceX: 2.31,
  rearFaceX: -2.31,
};

const HATCHBACK: CarSpec = {
  width: 1.76,
  bottomY: 0.3,
  wheelRadius: 0.31,
  tireWidth: 0.2,
  archRadius: 0.37,
  axles: [1.28, -1.22],
  beltY: 0.99,
  lower: [
    ['M', -2.0, 0.3],
    ['A', -1.22],
    ['A', 1.28],
    ['L', 2.0, 0.3],
    ['Q', 2.08, 0.32, 2.08, 0.48],
    ['L', 2.08, 0.62],
    ['Q', 2.07, 0.8, 1.92, 0.84],
    ['Q', 1.4, 0.92, 0.82, 0.98],
    ['L', -1.8, 1.02],
    ['Q', -2.04, 1.02, -2.07, 0.92],
    ['L', -2.08, 0.52],
    ['Q', -2.07, 0.32, -2.0, 0.3],
  ],
  cabin: [
    ['M', 0.86, 0.95],
    ['Q', 0.45, 1.13, -0.05, 1.4],
    ['Q', -0.15, 1.45, -0.35, 1.46],
    ['L', -1.2, 1.45],
    ['Q', -1.6, 1.42, -1.86, 1.2],
    ['Q', -1.96, 1.1, -1.98, 0.98],
    ['L', -1.98, 0.95],
  ],
  cabinWidthRatio: 0.87,
  tumblehome: 0.12,
  windshield: { from: [0.86, 0.97], ctrl: [0.45, 1.13], to: [-0.05, 1.4] },
  rearGlass: { from: [-1.24, 1.45], ctrl: [-1.6, 1.42], to: [-1.86, 1.2] },
  sideWindows: [
    [[0.68, 1.04], [-0.02, 1.36], [-0.5, 1.39], [-0.5, 1.04]],
    [[-0.58, 1.04], [-0.58, 1.39], [-1.16, 1.39], [-1.48, 1.28], [-1.66, 1.05]],
  ],
  doorSeams: [0.8, -0.54, -1.5],
  handles: [0.15, -0.85],
  mirrorX: 0.68,
  headlight: { x: 1.97, y: 0.76, z: 0.58, size: [0.16, 0.1, 0.38] },
  taillight: { x: -2.02, y: 0.82, z: 0.62, size: [0.12, 0.16, 0.26] },
  grille: { x: 2.05, y: 0.6, z: 0, size: [0.08, 0.13, 0.72] },
  frontFaceX: 2.08,
  rearFaceX: -2.08,
};

const PICKUP: CarSpec = {
  width: 1.9,
  bottomY: 0.45,
  wheelRadius: 0.4,
  tireWidth: 0.27,
  archRadius: 0.47,
  axles: [1.72, -1.62],
  beltY: 1.19,
  lower: [
    ['M', -2.55, 0.45],
    ['A', -1.62],
    ['A', 1.72],
    ['L', 2.52, 0.45],
    ['Q', 2.62, 0.47, 2.62, 0.62],
    ['L', 2.62, 0.9],
    ['Q', 2.61, 1.1, 2.45, 1.13],
    ['Q', 1.8, 1.17, 1.0, 1.2],
    ['L', -2.52, 1.2],
    ['Q', -2.62, 1.2, -2.62, 1.1],
    ['L', -2.62, 0.62],
    ['Q', -2.61, 0.47, -2.55, 0.45],
  ],
  cabin: [
    ['M', 1.02, 1.16],
    ['Q', 0.6, 1.4, 0.18, 1.72],
    ['Q', 0.1, 1.78, -0.08, 1.79],
    ['L', -0.72, 1.79],
    ['Q', -0.82, 1.79, -0.84, 1.7],
    ['Q', -0.86, 1.45, -0.88, 1.19],
    ['L', -0.88, 1.16],
  ],
  cabinWidthRatio: 0.9,
  tumblehome: 0.09,
  windshield: { from: [1.02, 1.18], ctrl: [0.6, 1.4], to: [0.18, 1.72] },
  rearGlass: { from: [-0.84, 1.7], ctrl: [-0.86, 1.45], to: [-0.88, 1.19] },
  sideWindows: [
    [[0.86, 1.27], [0.16, 1.7], [-0.3, 1.72], [-0.3, 1.27]],
    [[-0.37, 1.27], [-0.37, 1.72], [-0.7, 1.72], [-0.74, 1.27]],
  ],
  doorSeams: [1.0, -0.33, -0.9],
  handles: [0.35, -0.55],
  mirrorX: 0.88,
  headlight: { x: 2.52, y: 0.98, z: 0.62, size: [0.2, 0.14, 0.42] },
  taillight: { x: -2.6, y: 0.95, z: 0.86, size: [0.08, 0.32, 0.12] },
  grille: { x: 2.6, y: 0.86, z: 0, size: [0.08, 0.3, 0.92] },
  frontFaceX: 2.62,
  rearFaceX: -2.62,
  bed: { fromX: -0.98, toX: -2.5, topY: 1.2 },
};

export const CAR_SPECS: Record<BodyId, CarSpec> = {
  sedan: SEDAN,
  hatchback: HATCHBACK,
  pickup: PICKUP,
};
