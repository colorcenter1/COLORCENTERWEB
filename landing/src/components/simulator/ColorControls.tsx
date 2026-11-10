import { useId, useState, type CSSProperties, type FormEvent } from 'react';
import { PALETTE } from '../../data/palette';
import { normalizeHex } from '../../lib/color';
import { BODY_MODELS, type BodyId } from './models';

type SwatchStyle = CSSProperties & { '--sw': string };

interface BodySelectorProps {
  value: BodyId;
  onChange: (id: BodyId) => void;
}

export function BodySelector({ value, onChange }: BodySelectorProps) {
  return (
    <fieldset className="control-group">
      <legend>Carrocería</legend>
      <div className="segmented">
        {BODY_MODELS.map((body) => (
          <label key={body.id}>
            <input
              type="radio"
              name="carroceria"
              value={body.id}
              checked={value === body.id}
              onChange={() => onChange(body.id)}
            />
            {body.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

interface PalettePickerProps {
  selectedToneId: string | null;
  onSelect: (toneId: string) => void;
}

export function PalettePicker({ selectedToneId, onSelect }: PalettePickerProps) {
  return (
    <fieldset className="control-group">
      <legend>Paleta orientativa · 20 tonos</legend>
      <div className="swatch-grid">
      {PALETTE.map((family) => (
        <div key={family.id} className="swatch-family" role="group" aria-label={family.name}>
          <p className="swatch-family-name" aria-hidden="true">
            {family.name}
          </p>
          <div className="swatches">
            {family.tones.map((tone) => {
              const style: SwatchStyle = { '--sw': tone.hex };
              return (
                <label key={tone.id} className="swatch" title={tone.name}>
                  <input
                    type="radio"
                    name="tono"
                    value={tone.id}
                    aria-label={tone.name}
                    checked={selectedToneId === tone.id}
                    onChange={() => onSelect(tone.id)}
                  />
                  <span style={style} aria-hidden="true" />
                </label>
              );
            })}
          </div>
        </div>
      ))}
      </div>
    </fieldset>
  );
}

interface CustomColorProps {
  currentHex: string;
  onApply: (hex: string) => void;
}

export function CustomColor({ currentHex, onApply }: CustomColorProps) {
  const [draft, setDraft] = useState(currentHex.toUpperCase());
  const [hasError, setHasError] = useState(false);
  const pickerId = useId();
  const hexId = useId();
  const errorId = useId();

  const applyDraft = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = normalizeHex(draft);
    if (!normalized) {
      setHasError(true);
      return;
    }
    setHasError(false);
    setDraft(normalized.toUpperCase());
    onApply(normalized);
  };

  const pickVisual = (value: string) => {
    const normalized = normalizeHex(value);
    if (!normalized) return;
    setDraft(normalized.toUpperCase());
    setHasError(false);
    onApply(normalized);
  };

  return (
    <form className="control-group" onSubmit={applyDraft} noValidate>
      <p className="control-title">Color libre</p>
      <div className="custom-color">
        <div className="field">
          <label htmlFor={pickerId}>Elegir</label>
          <input
            id={pickerId}
            className="color-input"
            type="color"
            value={normalizeHex(draft) ?? currentHex}
            onChange={(event) => pickVisual(event.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor={hexId}>Código HEX</label>
          <input
            id={hexId}
            className="text-input"
            type="text"
            inputMode="text"
            autoComplete="off"
            spellCheck={false}
            maxLength={7}
            placeholder="#1A5FB4"
            value={draft}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : undefined}
            onChange={(event) => setDraft(event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-ghost">
          Aplicar
        </button>
        {hasError && (
          <p id={errorId} className="field-error" role="alert">
            Escribe un código como #1A5FB4 (seis caracteres de 0-9 y A-F).
          </p>
        )}
      </div>
    </form>
  );
}
