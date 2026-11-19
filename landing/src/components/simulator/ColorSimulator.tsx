import { lazy, Suspense, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { Box, MessageCircle } from 'lucide-react';
import { COLOR_DISCLAIMER, DEFAULT_TONE_ID, FINISH_LABEL, findTone, type SimulatedFinish } from '../../data/palette';
import { colorInquiry, whatsappUrl } from '../../lib/whatsapp';
import { CustomColor, PalettePicker } from './ColorControls';
import { StageErrorBoundary } from './StageErrorBoundary';
import { DEFAULT_BODY, findBody } from './models';

const Viewer3D = lazy(() => import('./Viewer3D').then((m) => ({ default: m.Viewer3D })));

type Selection = { kind: 'tone'; toneId: string } | { kind: 'custom'; hex: string };

interface ResolvedColor {
  name: string;
  hex: string;
  finish: SimulatedFinish;
  isCustom: boolean;
}

const CUSTOM_FINISH: SimulatedFinish = 'solido';

function resolveSelection(selection: Selection): ResolvedColor {
  if (selection.kind === 'custom') {
    return { name: 'Color personalizado', hex: selection.hex, finish: CUSTOM_FINISH, isCustom: true };
  }
  const tone = findTone(selection.toneId) ?? findTone(DEFAULT_TONE_ID);
  if (!tone) throw new Error('Paleta sin tono por defecto');
  return { name: tone.name, hex: tone.hex, finish: tone.finish, isCustom: false };
}

interface ColorSimulatorProps {
  isActive: boolean;
  onActivate: () => void;
}

export function ColorSimulator({ isActive, onActivate }: ColorSimulatorProps) {
  const [selection, setSelection] = useState<Selection>({ kind: 'tone', toneId: DEFAULT_TONE_ID });
  const stageRef = useRef<HTMLDivElement>(null);

  // Al activar el 3D el botón desaparece: se lleva el foco al escenario para no perderlo.
  useEffect(() => {
    if (isActive) stageRef.current?.focus({ preventScroll: true });
  }, [isActive]);

  const color = resolveSelection(selection);
  const body = findBody(DEFAULT_BODY);
  const paint = useMemo(() => ({ hex: color.hex, finish: color.finish }), [color.hex, color.finish]);
  const selectTone = (toneId: string) => {
    setSelection({ kind: 'tone', toneId });
    if (!isActive) onActivate();
  };
  const applyCustomColor = (hex: string) => {
    setSelection({ kind: 'custom', hex });
    if (!isActive) onActivate();
  };
  const inquiryUrl = whatsappUrl(
    colorInquiry({ bodyLabel: body.label, colorName: color.name, hex: color.hex, isCustom: color.isCustom }),
  );
  const finishText = color.isCustom ? 'color libre' : `acabado simulado ${FINISH_LABEL[color.finish]}`;

  const sampleStyle = { '--sample': color.hex } as CSSProperties;
  const readoutStyle = { '--sel': color.hex } as CSSProperties;

  return (
    <section id="simulador" className="section simulator" aria-labelledby="simulador-title">
      <div className="wrap">
        <div className="section-head">
          <h2 id="simulador-title">Prueba colores sobre una carrocería</h2>
          <p className="lede">
            Toca un color para verlo en la carrocería. Arrastra el auto para girarlo y consulta el tono por WhatsApp.
          </p>
        </div>

        <div className="sim-layout">
          <p className="sim-body-note">Auto conceptual genérico, sin marca. Arrástralo para girarlo.</p>

          <div ref={stageRef} className="stage" role="region" aria-label="Vista del simulador" tabIndex={-1}>
            {isActive ? (
              <StageErrorBoundary>
                <Suspense fallback={<StageLoading />}>
                  <Viewer3D body={body} paint={paint} />
                </Suspense>
              </StageErrorBoundary>
            ) : (
              <div className="stage-poster">
                <div className="stage-poster-inner">
                  <div className="panel-sample" data-finish={color.finish} style={sampleStyle} aria-hidden="true" />
                  <p className="stage-caption">
                    <strong>{color.name}</strong> · {body.label}
                  </p>
                  <button type="button" className="btn btn-light" onClick={onActivate}>
                    <Box size={18} aria-hidden="true" />
                    Probar colores en 3D
                  </button>
                </div>
              </div>
            )}
          </div>
          <p className="sim-model-credit">Modelo conceptual de Eric Chadwick / DGG · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a></p>

          <div className="sim-colors">
            <PalettePicker
              selectedToneId={selection.kind === 'tone' ? selection.toneId : null}
              onSelect={selectTone}
            />
            <CustomColor currentHex={color.hex} onApply={applyCustomColor} />

            <div className="selection-readout" style={readoutStyle} aria-live="polite">
              <i aria-hidden="true" />
              <p>
                <strong>
                  {color.name}
                  {color.isCustom ? ` ${color.hex.toUpperCase()}` : ''}
                </strong>
                {body.label} · {finishText}
              </p>
            </div>
          </div>

          <div className="sim-cta">
            <a className="btn btn-primary" href={inquiryUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={18} aria-hidden="true" />
              Consultar este color por WhatsApp
            </a>
            <p className="disclaimer">{COLOR_DISCLAIMER}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StageLoading() {
  return (
    <div className="stage-poster" role="status">
      <div className="stage-poster-inner">
        <span className="spinner" aria-hidden="true" />
        <p className="stage-caption">Preparando la vista 3D…</p>
      </div>
    </div>
  );
}
