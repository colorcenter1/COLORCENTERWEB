import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

/** Genera el HTML de la landing para el prerender de la compilación. */
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
