import { Component, type ReactNode } from 'react';
import { TriangleAlert } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Si falla la descarga del módulo 3D, muestra una alternativa estática en el escenario
 * sin afectar al resto de la página (paleta, selector libre y WhatsApp siguen activos).
 * React 19 aún requiere un componente de clase para los límites de error.
 */
export class StageErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div className="stage-poster" role="alert">
        <div className="stage-error">
          <TriangleAlert size={28} aria-hidden="true" />
          <p>
            No pudimos cargar la vista 3D. Puedes seguir eligiendo colores y consultar por WhatsApp.
          </p>
        </div>
      </div>
    );
  }
}
