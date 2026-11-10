import { useEffect, useRef, useState } from 'react';
import { RotateCcw, RotateCw, TriangleAlert } from 'lucide-react';
import type { SimulatorScene, PaintSpec } from './scene';
import type { BodyModel } from './models';

type ViewerStatus = 'loading' | 'ready' | 'error';

interface Viewer3DProps {
  body: BodyModel;
  paint: PaintSpec;
}

const ROTATE_STEP_DEG = 30;

/** Monta la escena 3D (descargada bajo demanda) y refleja carrocería y pintura. */
export function Viewer3D({ body, paint }: Viewer3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SimulatorScene | null>(null);
  const paintRef = useRef(paint);
  const [status, setStatus] = useState<ViewerStatus>('loading');
  const [isSceneReady, setIsSceneReady] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    const container = containerRef.current;
    if (!container) return undefined;

    import('./scene')
      .then(({ createSimulatorScene }) => {
        if (isCancelled) return;
        const instance = createSimulatorScene(container, () => setStatus('error'));
        instance.setPaint(paintRef.current);
        sceneRef.current = instance;
        setIsSceneReady(true);
      })
      .catch(() => {
        if (!isCancelled) setStatus('error');
      });

    return () => {
      isCancelled = true;
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, []);

  useEffect(() => {
    const instance = sceneRef.current;
    if (!isSceneReady || !instance) return undefined;
    let isCurrent = true;
    setStatus('loading');
    instance
      .showBody(body)
      .then(() => {
        if (isCurrent) setStatus('ready');
      })
      .catch(() => {
        if (isCurrent) setStatus('error');
      });
    return () => {
      isCurrent = false;
    };
  }, [body, isSceneReady]);

  useEffect(() => {
    paintRef.current = paint;
    sceneRef.current?.setPaint(paint);
  }, [paint]);

  return (
    <>
      <div ref={containerRef} className="stage-canvas" style={{ position: 'absolute', inset: 0 }} />

      {status === 'loading' && (
        <div className="stage-poster" role="status">
          <div className="stage-poster-inner">
            <span className="spinner" aria-hidden="true" />
            <p className="stage-caption">Cargando {body.label.toLowerCase()}…</p>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="stage-poster" role="alert">
          <div className="stage-error">
            <TriangleAlert size={28} aria-hidden="true" />
            <p>
              No pudimos mostrar la vista 3D en este dispositivo. Puedes seguir eligiendo colores y consultar por
              WhatsApp.
            </p>
          </div>
        </div>
      )}

      {status === 'ready' && (
        <div className="stage-status">
          <span className="stage-hint">Arrastra para girar</span>
          <span style={{ display: 'flex', gap: '0.4rem', pointerEvents: 'auto' }}>
            <button
              type="button"
              className="btn btn-light stage-rotate"
              aria-label="Girar a la izquierda"
              onClick={() => sceneRef.current?.rotateBy(-ROTATE_STEP_DEG)}
            >
              <RotateCcw size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="btn btn-light stage-rotate"
              aria-label="Girar a la derecha"
              onClick={() => sceneRef.current?.rotateBy(ROTATE_STEP_DEG)}
            >
              <RotateCw size={18} aria-hidden="true" />
            </button>
          </span>
        </div>
      )}
    </>
  );
}
