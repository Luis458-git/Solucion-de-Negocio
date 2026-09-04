import { useEffect } from "react";

export default function MedicationDetail({
  medication,
  onClose,
  onEdit,
  onDelete,
}) {
  useEffect(() => {
    if (!medication) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [medication, onClose]);

  if (!medication) {
    return null;
  }

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleDelete = () => {
    onDelete(medication.id);
    onClose();
  };

  return (
    <div
      className="medication-detail__backdrop"
      role="presentation"
      onMouseDown={handleBackdropClick}
    >
      <section
        className="medication-detail"
        role="dialog"
        aria-modal="true"
        aria-labelledby="medication-detail-title"
      >
        <button
          className="medication-detail__close"
          type="button"
          onClick={onClose}
          aria-label="Cerrar detalles del medicamento"
        >
          ×
        </button>

        <div className="medication-detail__image-wrapper">
          {medication.imageUrl ? (
            <img
              className="medication-detail__image"
              src={medication.imageUrl}
              alt={`Presentación de ${medication.name}`}
            />
          ) : (
            <div className="medication-detail__image-placeholder" aria-hidden="true">
              {medication.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="medication-detail__content">
          <p className="medication-detail__category">{medication.category}</p>
          <h2 id="medication-detail-title">{medication.name}</h2>

          <dl className="medication-detail__data">
            <div>
              <dt>Cantidad disponible</dt>
              <dd>{medication.quantity} unidades</dd>
            </div>

            <div>
              <dt>Precio unitario</dt>
              <dd>${Number(medication.unitPrice).toFixed(2)} MXN</dd>
            </div>

            <div>
              <dt>Estado del inventario</dt>
              <dd>{medication.stockStatus}</dd>
            </div>
          </dl>

          <div className="medication-detail__actions">
            <button type="button" onClick={() => onEdit(medication)}>
              Editar medicamento
            </button>

            <button type="button" onClick={handleDelete}>
              Eliminar medicamento
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
