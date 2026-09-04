import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="error-state" role="alert" aria-live="assertive">
          <h1>No se pudo mostrar el inventario</h1>
          <p>Ocurrió un error inesperado. Recarga la vista para continuar.</p>
          <button type="button" onClick={() => window.location.reload()}>
            Recargar vista
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}