/**
 * Escena Three.js del simulador. Se importa dinámicamente tras el clic en
 * «Probar colores»; nada de este módulo forma parte de la carga inicial.
 *
 * Rendimiento: vehículos generados por código (sin archivos de modelo), renderizado
 * bajo demanda (solo al girar, cambiar color o modelo), entorno procedural sin HDR
 * descargado, sin sombras dinámicas ni posproceso.
 */
import {
  ACESFilmicToneMapping,
  Box3,
  CanvasTexture,
  Color,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  Scene,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
  type Material,
  type Object3D,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import type { SimulatedFinish } from '../../data/palette';
import type { BodyModel } from './models';
import { buildCar, type CarMaterials } from './carFactory';

export interface PaintSpec {
  hex: string;
  finish: SimulatedFinish;
}

export interface SimulatorScene {
  showBody: (model: BodyModel) => Promise<void>;
  setPaint: (paint: PaintSpec) => void;
  rotateBy: (degrees: number) => void;
  dispose: () => void;
}

const MAX_PIXEL_RATIO = 2;

const FINISH_PARAMS: Record<SimulatedFinish, Partial<MeshPhysicalMaterial>> = {
  solido: { metalness: 0.05, roughness: 0.38, clearcoat: 1, clearcoatRoughness: 0.06, iridescence: 0 },
  metalizado: { metalness: 0.62, roughness: 0.34, clearcoat: 1, clearcoatRoughness: 0.04, iridescence: 0 },
  perlado: { metalness: 0.4, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.03, iridescence: 0.35 },
};

function createContactShadow(): Mesh {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, 'rgba(0,0,0,0.42)');
    gradient.addColorStop(0.5, 'rgba(0,0,0,0.18)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }
  const texture = new CanvasTexture(canvas);
  const material = new MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false });
  const plane = new Mesh(new PlaneGeometry(1, 1), material);
  plane.rotation.x = -Math.PI / 2;
  plane.renderOrder = -1;
  return plane;
}

/** Centra el vehículo en x/z (ya viene apoyado en el suelo) y devuelve su tamaño. */
function centerOnGround(root: Object3D): Vector3 {
  const box = new Box3().setFromObject(root);
  const center = box.getCenter(new Vector3());
  root.position.set(-center.x, -box.min.y, -center.z);
  return box.getSize(new Vector3());
}

function createCarMaterials(paint: Material): CarMaterials {
  return {
    paint,
    glass: new MeshPhysicalMaterial({ color: '#070a0f', metalness: 0.2, roughness: 0.08, clearcoat: 1, envMapIntensity: 0.55 }),
    trim: new MeshStandardMaterial({ color: '#16181c', roughness: 0.62, metalness: 0.1 }),
    chrome: new MeshStandardMaterial({ color: '#dfe3e8', roughness: 0.16, metalness: 1 }),
    rubber: new MeshStandardMaterial({ color: '#121314', roughness: 0.9, metalness: 0 }),
    rimDark: new MeshStandardMaterial({ color: '#2c3036', roughness: 0.4, metalness: 0.8 }),
    rim: new MeshStandardMaterial({ color: '#c9ced4', roughness: 0.22, metalness: 1 }),
    headlight: new MeshPhysicalMaterial({
      color: '#eef3fa',
      emissive: new Color('#dbe6ff'),
      emissiveIntensity: 0.45,
      roughness: 0.05,
      clearcoat: 1,
    }),
    taillight: new MeshPhysicalMaterial({
      color: '#6e0b12',
      emissive: new Color('#c4121d'),
      emissiveIntensity: 0.4,
      roughness: 0.1,
      clearcoat: 1,
    }),
  };
}

function disposeObject(root: Object3D, keep: ReadonlySet<Material>): void {
  root.traverse((child) => {
    if (!(child instanceof Mesh)) return;
    child.geometry.dispose();
    const materials: Material[] = Array.isArray(child.material) ? child.material : [child.material];
    materials.filter((m) => !keep.has(m)).forEach((m) => m.dispose());
  });
}

export function createSimulatorScene(container: HTMLElement, onContextLost: () => void): SimulatorScene {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  container.appendChild(renderer.domElement);
  const handleContextLost = (event: Event) => {
    event.preventDefault();
    onContextLost();
  };
  renderer.domElement.addEventListener('webglcontextlost', handleContextLost);

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const envTexture = pmrem.fromScene(room, 0.04).texture;
  room.dispose();
  scene.environment = envTexture;

  const camera = new PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 1.9, 9.2);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.09;
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.minPolarAngle = Math.PI * 0.28;
  controls.maxPolarAngle = Math.PI * 0.49;
  controls.target.set(0, 0.65, 0);

  const paintMaterial = new MeshPhysicalMaterial({ name: 'cc-paint' });
  const carMaterials = createCarMaterials(paintMaterial);
  const sharedMaterials: ReadonlySet<Material> = new Set(Object.values(carMaterials));
  const shadow = createContactShadow();
  const stageGroup = new Group();
  stageGroup.add(shadow);
  scene.add(stageGroup);

  let current: Object3D | null = null;
  let frame = 0;
  let isDisposed = false;

  const tick = () => {
    frame = 0;
    if (isDisposed) return;
    const isMoving = controls.update();
    renderer.render(scene, camera);
    if (isMoving) requestRender();
  };

  function requestRender(): void {
    if (!frame && !isDisposed) frame = requestAnimationFrame(tick);
  }

  const resize = () => {
    const { clientWidth, clientHeight } = container;
    if (!clientWidth || !clientHeight) return;
    renderer.setSize(clientWidth, clientHeight, false);
    camera.aspect = clientWidth / clientHeight;
    camera.position.setLength(clientWidth / clientHeight < 1.2 ? 11.5 : 9.2);
    camera.updateProjectionMatrix();
    requestRender();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  controls.addEventListener('change', requestRender);
  resize();

  async function showBody(model: BodyModel): Promise<void> {
    if (isDisposed) return;
    const root = buildCar(model.id, carMaterials);
    const size = centerOnGround(root);
    shadow.scale.set(size.x * 1.3, size.z * 1.35, 1);
    shadow.position.set(0, 0.002, 0);

    if (current) {
      stageGroup.remove(current);
      disposeObject(current, sharedMaterials);
    }
    current = root;
    stageGroup.rotation.y = (model.initialYawDeg * Math.PI) / 180;
    stageGroup.add(root);
    requestRender();
  }

  function setPaint({ hex, finish }: PaintSpec): void {
    paintMaterial.color.set(hex);
    paintMaterial.setValues(FINISH_PARAMS[finish]);
    paintMaterial.needsUpdate = true;
    requestRender();
  }

  function rotateBy(degrees: number): void {
    stageGroup.rotation.y += (degrees * Math.PI) / 180;
    requestRender();
  }

  function dispose(): void {
    isDisposed = true;
    if (frame) cancelAnimationFrame(frame);
    observer.disconnect();
    controls.dispose();
    if (current) disposeObject(current, sharedMaterials);
    sharedMaterials.forEach((material) => material.dispose());
    shadow.geometry.dispose();
    (shadow.material as MeshBasicMaterial).map?.dispose();
    (shadow.material as MeshBasicMaterial).dispose();
    envTexture.dispose();
    pmrem.dispose();
    renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
  }

  return { showBody, setPaint, rotateBy, dispose };
}
