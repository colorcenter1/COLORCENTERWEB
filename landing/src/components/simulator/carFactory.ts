/**
 * Construye vehículos genéricos (sedán, hatchback, pickup) con geometría propia.
 * No descarga modelos: todo se genera en el navegador tras activar el simulador.
 */
import {
  BoxGeometry,
  BufferGeometry,
  CylinderGeometry,
  ExtrudeGeometry,
  Group,
  LatheGeometry,
  Mesh,
  Shape,
  TorusGeometry,
  Vector2,
  type Material,
} from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import type { BodyId } from './models';
import { CAR_SPECS, type CarSpec, type Curve, type PathCmd, type Point } from './carSpecs';

export interface CarMaterials {
  paint: Material;
  glass: Material;
  trim: Material;
  chrome: Material;
  rubber: Material;
  rimDark: Material;
  rim: Material;
  headlight: Material;
  taillight: Material;
}

const CURVE_SEGMENTS = 20;
const GLASS_THICKNESS = 0.012;
const GLASS_OFFSET = 0.006;
const SPOKES = 5;

function traceShape(cmds: readonly PathCmd[], spec: CarSpec): Shape {
  const shape = new Shape();
  for (const cmd of cmds) {
    switch (cmd[0]) {
      case 'M':
        shape.moveTo(cmd[1], cmd[2]);
        break;
      case 'L':
        shape.lineTo(cmd[1], cmd[2]);
        break;
      case 'Q':
        shape.quadraticCurveTo(cmd[1], cmd[2], cmd[3], cmd[4]);
        break;
      case 'A': {
        const r = spec.archRadius;
        const a = Math.asin((spec.bottomY - spec.wheelRadius) / r);
        shape.lineTo(cmd[1] - r * Math.cos(a), spec.bottomY);
        shape.absarc(cmd[1], spec.wheelRadius, r, Math.PI - a, a, true);
        shape.lineTo(cmd[1] + r * Math.cos(a), spec.bottomY);
        break;
      }
    }
  }
  return shape;
}

/** Extrusión centrada en z con bordes redondeados; la silueta exterior respeta el perfil. */
function extrude(shape: Shape, totalWidth: number, bevel: number): ExtrudeGeometry {
  const depth = totalWidth - 2 * bevel;
  const geometry = new ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelOffset: -bevel,
    bevelSegments: 5,
    curveSegments: CURVE_SEGMENTS,
  });
  geometry.translate(0, 0, -depth / 2);
  return geometry;
}

/** Estrecha la cabina hacia el techo (caída lateral de los vidrios). */
function applyTumblehome(geometry: BufferGeometry, baseY: number, topY: number, amount: number): void {
  const pos = geometry.attributes.position;
  for (let i = 0; i < pos.count; i += 1) {
    const t = Math.min(Math.max((pos.getY(i) - baseY) / (topY - baseY), 0), 1);
    pos.setZ(i, pos.getZ(i) * (1 - amount * t));
  }
  pos.needsUpdate = true;
  geometry.computeBoundingBox();
}

function sampleCurve({ from, ctrl, to }: Curve, steps: number): Vector2[] {
  const points: Vector2[] = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const u = 1 - t;
    points.push(
      new Vector2(
        u * u * from[0] + 2 * u * t * ctrl[0] + t * t * to[0],
        u * u * from[1] + 2 * u * t * ctrl[1] + t * t * to[1],
      ),
    );
  }
  return points;
}

/** Vidrio curvo que sigue la superficie de parabrisas o luneta, desplazado hacia afuera. */
function curvedGlass(curve: Curve, outward: 1 | -1, width: number): ExtrudeGeometry {
  const pts = sampleCurve(curve, 16);
  const normals = pts.map((p, i) => {
    const a = pts[Math.max(i - 1, 0)];
    const b = pts[Math.min(i + 1, pts.length - 1)];
    const tangent = new Vector2(b.x - a.x, b.y - a.y).normalize();
    return new Vector2(-tangent.y, tangent.x).multiplyScalar(outward);
  });
  const outer = pts.map((p, i) => p.clone().addScaledVector(normals[i], GLASS_OFFSET + GLASS_THICKNESS));
  const inner = pts.map((p, i) => p.clone().addScaledVector(normals[i], GLASS_OFFSET)).reverse();
  const geometry = new ExtrudeGeometry(new Shape([...outer, ...inner]), { depth: width, bevelEnabled: false });
  geometry.translate(0, 0, -width / 2);
  return geometry;
}

function flatGlass(points: readonly Point[], z: number): ExtrudeGeometry {
  const shape = new Shape(points.map(([x, y]) => new Vector2(x, y)));
  const geometry = new ExtrudeGeometry(shape, { depth: GLASS_THICKNESS, bevelEnabled: false });
  geometry.translate(0, 0, z - (z < 0 ? GLASS_THICKNESS : 0));
  return geometry;
}

function rounded(size: readonly [number, number, number], radius = 0.03): RoundedBoxGeometry {
  return new RoundedBoxGeometry(size[0], size[1], size[2], 3, Math.min(radius, ...size.map((s) => s / 2 - 0.001)));
}

function place(group: Group, geometry: BufferGeometry, material: Material, x: number, y: number, z: number): Mesh {
  const mesh = new Mesh(geometry, material);
  mesh.position.set(x, y, z);
  group.add(mesh);
  return mesh;
}

function buildWheel(spec: CarSpec, m: CarMaterials): Group {
  const r = spec.wheelRadius;
  const w = spec.tireWidth;
  const wheel = new Group();
  const profile = [
    new Vector2(r * 0.66, -w / 2),
    new Vector2(r - 0.045, -w / 2),
    new Vector2(r - 0.01, -w / 2 + 0.03),
    new Vector2(r, 0),
    new Vector2(r - 0.01, w / 2 - 0.03),
    new Vector2(r - 0.045, w / 2),
    new Vector2(r * 0.66, w / 2),
  ];
  const tire = new Mesh(new LatheGeometry(profile, 40), m.rubber);
  tire.rotation.x = Math.PI / 2;
  wheel.add(tire);

  const barrel = new Mesh(new CylinderGeometry(r * 0.67, r * 0.67, w * 0.92, 32, 1, true), m.rimDark);
  barrel.rotation.x = Math.PI / 2;
  wheel.add(barrel);

  const face = new Mesh(new CylinderGeometry(r * 0.64, r * 0.64, 0.01, 32), m.rimDark);
  face.rotation.x = Math.PI / 2;
  face.position.z = w * 0.18;
  wheel.add(face);

  const lip = new Mesh(new TorusGeometry(r * 0.655, 0.014, 8, 40), m.rim);
  lip.position.z = w * 0.4;
  wheel.add(lip);

  const spokeGeometry = new BoxGeometry(r * 0.56, r * 0.13, 0.035);
  for (let i = 0; i < SPOKES; i += 1) {
    const angle = (i / SPOKES) * Math.PI * 2;
    const spoke = new Mesh(spokeGeometry, m.rim);
    spoke.position.set(Math.cos(angle) * r * 0.33, Math.sin(angle) * r * 0.33, w * 0.3);
    spoke.rotation.z = angle;
    wheel.add(spoke);
  }

  const hub = new Mesh(new CylinderGeometry(r * 0.15, r * 0.17, 0.05, 20), m.rim);
  hub.rotation.x = Math.PI / 2;
  hub.position.z = w * 0.33;
  wheel.add(hub);
  return wheel;
}

function addBody(car: Group, spec: CarSpec, m: CarMaterials): void {
  place(car, extrude(traceShape(spec.lower, spec), spec.width, 0.12), m.paint, 0, 0, 0);

  const cabinWidth = spec.width * spec.cabinWidthRatio;
  const cabinGeometry = extrude(traceShape(spec.cabin, spec), cabinWidth, 0.08);
  cabinGeometry.computeBoundingBox();
  const box = cabinGeometry.boundingBox;
  const topY = box ? box.max.y : spec.beltY + 0.45;
  applyTumblehome(cabinGeometry, spec.beltY, topY, spec.tumblehome);
  place(car, cabinGeometry, m.paint, 0, 0, 0);

  const glassWidth = cabinWidth - 0.2;
  const glassParts = [curvedGlass(spec.windshield, -1, glassWidth), curvedGlass(spec.rearGlass, -1, glassWidth)];
  const sideZ = cabinWidth / 2 + GLASS_OFFSET * 0.2;
  spec.sideWindows.forEach((window) => {
    glassParts.push(flatGlass(window, sideZ), flatGlass(window, -sideZ));
  });
  glassParts.forEach((geometry) => {
    applyTumblehome(geometry, spec.beltY, topY, spec.tumblehome);
    place(car, geometry, m.glass, 0, 0, 0);
  });
}

function addDetails(car: Group, spec: CarSpec, m: CarMaterials): void {
  const half = spec.width / 2;
  const sides = [1, -1] as const;

  sides.forEach((s) => {
    const { headlight: h, taillight: t } = spec;
    place(car, rounded(h.size, 0.04), m.headlight, h.x, h.y, s * h.z);
    place(car, rounded(t.size, 0.03), m.taillight, t.x, t.y, s * t.z);

    const mirror = place(car, rounded([0.2, 0.11, 0.16], 0.045), m.paint, spec.mirrorX, spec.beltY + 0.1, s * (half + 0.05));
    mirror.rotation.y = s * 0.15;
    place(car, new BoxGeometry(0.08, 0.04, 0.1), m.trim, spec.mirrorX + 0.02, spec.beltY + 0.05, s * (half + 0.01));

    spec.handles.forEach((x) => place(car, rounded([0.16, 0.035, 0.03], 0.012), m.chrome, x, spec.beltY - 0.1, s * (half + 0.005)));

    spec.doorSeams.forEach((x) => {
      place(car, new BoxGeometry(0.006, spec.beltY - spec.bottomY - 0.12, 0.004), m.trim, x, (spec.beltY + spec.bottomY) / 2 + 0.02, s * (half + 0.001));
    });

    const skirtFrom = spec.axles[1] + spec.archRadius + 0.02;
    const skirtTo = spec.axles[0] - spec.archRadius - 0.02;
    place(car, rounded([skirtTo - skirtFrom, 0.08, 0.05], 0.02), m.trim, (skirtFrom + skirtTo) / 2, spec.bottomY + 0.04, s * (half - 0.015));
  });

  const g = spec.grille;
  place(car, rounded(g.size, 0.03), m.trim, g.x, g.y, g.z);
  place(car, rounded([0.06, 0.09, spec.width * 0.62], 0.03), m.trim, spec.frontFaceX - 0.02, spec.bottomY + 0.12, 0);
  place(car, rounded([0.06, 0.1, spec.width * 0.7], 0.03), m.trim, spec.rearFaceX + 0.02, spec.bottomY + 0.1, 0);
}

function addWheels(car: Group, spec: CarSpec, m: CarMaterials): void {
  const half = spec.width / 2;
  const linerGeometry = new CylinderGeometry(spec.archRadius - 0.015, spec.archRadius - 0.015, spec.width - 0.14, 28);
  spec.axles.forEach((x) => {
    const liner = place(car, linerGeometry, m.trim, x, spec.wheelRadius, 0);
    liner.rotation.x = Math.PI / 2;
    [1, -1].forEach((s) => {
      const wheel = buildWheel(spec, m);
      wheel.position.set(x, spec.wheelRadius, s * (half - spec.tireWidth / 2 - 0.03));
      if (s < 0) wheel.rotation.y = Math.PI;
      car.add(wheel);
    });
  });
}

function addBed(car: Group, spec: CarSpec, m: CarMaterials): void {
  if (!spec.bed) return;
  const { fromX, toX, topY } = spec.bed;
  const length = fromX - toX;
  place(car, new BoxGeometry(length, 0.004, spec.width - 0.24), m.trim, (fromX + toX) / 2, topY + 0.002, 0);
  place(car, new BoxGeometry(0.03, 0.02, spec.width - 0.1), m.trim, fromX + 0.04, topY + 0.004, 0);
  [1, -1].forEach((s) => {
    place(car, new BoxGeometry(0.012, topY - spec.bottomY - 0.15, 0.004), m.trim, fromX + 0.05, (topY + spec.bottomY) / 2 + 0.05, s * (spec.width / 2 + 0.001));
  });
  place(car, new BoxGeometry(0.004, 0.012, spec.width - 0.3), m.trim, spec.rearFaceX - 0.001, topY - 0.08, 0);
}

/** Crea el vehículo apoyado en el suelo (y = 0) y centrado en x/z. */
export function buildCar(id: BodyId, materials: CarMaterials): Group {
  const spec = CAR_SPECS[id];
  const car = new Group();
  car.name = `vehiculo-${id}`;
  addBody(car, spec, materials);
  addDetails(car, spec, materials);
  addWheels(car, spec, materials);
  addBed(car, spec, materials);
  return car;
}
