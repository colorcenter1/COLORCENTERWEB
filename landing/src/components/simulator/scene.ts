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
  type Texture,
  type Material,
  type Object3D,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { SimulatedFinish } from '../../data/palette';
import type { BodyModel } from './models';

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

function disposeObject(root: Object3D): void {
  root.traverse((child) => {
    if (!(child instanceof Mesh)) return;
    child.geometry.dispose();
    const materials: Material[] = Array.isArray(child.material) ? child.material : [child.material];
    materials.forEach((material) => {
      const maps: Texture[] = [];
      for (const value of Object.values(material)) {
        if (value && typeof value === 'object' && 'isTexture' in value && value.isTexture) maps.push(value as Texture);
      }
      maps.forEach((map) => map.dispose());
      material.dispose();
    });
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

  const loader = new GLTFLoader();
  const paintMaterials: Material[] = [];
  const shadow = createContactShadow();
  const stageGroup = new Group();
  stageGroup.add(shadow);
  scene.add(stageGroup);

  let current: Object3D | null = null;
  let loadPromise: Promise<Object3D> | null = null;
  let activePaint: PaintSpec = { hex: '#6d747a', finish: 'metalizado' };
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
    loadPromise ??= loader.loadAsync('/models/khronos-car-concept.glb').then(({ scene: root }) => {
      root.traverse((child) => {
        const nodeName = child.name.toLowerCase();
        if (nodeName.includes('license plate') || nodeName.includes('steeringemblem')) child.visible = false;
        if (!(child instanceof Mesh)) return;
        const materials: Material[] = Array.isArray(child.material) ? child.material : [child.material];
        for (const material of materials) {
          if (/^paint\s/i.test(material.name)) {
            if (material instanceof MeshPhysicalMaterial) {
              material.metalness = 0.45;
              material.roughness = 0.3;
              material.clearcoat = 1;
              material.clearcoatRoughness = 0.04;
            }
            paintMaterials.push(material);
          }
        }
      });
      applyPaint(activePaint);
      return root;
    });
    const root = await loadPromise;
    if (isDisposed) return;
    centerOnGround(root);
    shadow.position.set(0, 0.002, 0);

    if (current) {
      stageGroup.remove(current);
    }
    current = root;
    stageGroup.rotation.y = (model.initialYawDeg * Math.PI) / 180;
    if (root.parent !== stageGroup) stageGroup.add(root);
    const bounds = new Box3().setFromObject(root);
    const fittedSize = bounds.getSize(new Vector3());
    const scale = 4.8 / Math.max(fittedSize.x, fittedSize.y, fittedSize.z);
    root.scale.setScalar(scale);
    centerOnGround(root);
    shadow.scale.set(fittedSize.x * scale * 1.3, fittedSize.z * scale * 1.35, 1);
    camera.position.set(0, 1.6, 8.2);
    controls.target.set(0, 0.72, 0);
    controls.update();
    requestRender();
  }

  function setPaint({ hex, finish }: PaintSpec): void {
    activePaint = { hex, finish };
    applyPaint(activePaint);
  }

  function applyPaint({ hex, finish }: PaintSpec): void {
    for (const material of paintMaterials) {
      if ((material instanceof MeshStandardMaterial || material instanceof MeshPhysicalMaterial) && material.color instanceof Color) material.color.set(hex);
      if (material instanceof MeshPhysicalMaterial) material.setValues(FINISH_PARAMS[finish]);
      material.needsUpdate = true;
    }
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
    if (current) disposeObject(current);
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
