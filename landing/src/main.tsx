import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';

const container = document.getElementById('root');
if (!container) throw new Error('No se encontró el contenedor #root');

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// En producción el HTML llega prerenderizado; en desarrollo el contenedor llega vacío.
if (container.firstElementChild) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
