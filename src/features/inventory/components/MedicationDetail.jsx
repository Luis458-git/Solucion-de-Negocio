import { useEffect, useRef, useState } from "react";
import InventoryForm from "./InventoryForm";
import { formatCurrency } from "../utils/currency";

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4.5 19.5h4" />
      <path d="M5 15.8 15.7 5.1a2.1 2.1 0 0 1 3 3L8 18.8 5 19.5l.7-3.7Z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 7h16" />
      <path d="M9 7V4.5h6V7" />
      <path d="M7 7l.8 12.5h8.4L17 7" />
      <path d="M10 10.5v6" />
      <path d="M14 10.5v6" />
    </svg>
  );
}

export default function MedicationDetail({
  medication,
  onClose,
  onUpdate,
  onDelete,
}) {
  const closeButtonRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!medication) {
      return undefined;
    }

    const previousActiveElement = document.activeElement;

    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      previousActiveElement?.focus?.();
    };
  }, [medication, onClose]);

  if (!medication) {
    return null;
  }

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  function handleUpdate(formData) {
    const result = onUpdate(medication.id, formData);

    if (result?.isValid) {
      onClose();
    }

    return result;
  }

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
          ref={closeButtonRef}
          className="medication-detail__close"
          type="button"
          onClick={onClose}
          aria-label="Cerrar detalles"
        >
          <CloseIcon />
        </button>

        {isEditing ? (
          <div className="medication-detail__edit-content">
            <p className="medication-detail__category">
              Editar medicamento
            </p>

            <h2 id="medication-detail-title">
              {medication.name}
            </h2>

            <InventoryForm
              initialValues={medication}
              onSubmit={handleUpdate}
              onCancel={() => setIsEditing(false)}
              submitLabel="Guardar cambios"
              cancelLabel="Volver al detalle"
            />
          </div>
        ) : (
          <>
            <div className="medication-detail__image-wrapper">
              {medication.imageUrl ? (
                <img
                  className="medication-detail__image"
                  src={medication.imageUrl}
                  alt={`Presentación de ${medication.name}`}
                />
              ) : (
                <div
                  className="medication-detail__image-placeholder"
                  aria-hidden="true"
                >
                  {medication.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <div className="medication-detail__content">
              <p className="medication-detail__category">
                {medication.category}
              </p>

              <h2 id="medication-detail-title">
                {medication.name}
              </h2>

              <dl className="medication-detail__data">
                <div>
                  <dt>Cantidad disponible</dt>
                  <dd>{medication.quantity} unidades</dd>
                </div>

                <div>
                  <dt>Precio unitario</dt>
                  <dd>{formatCurrency(medication.unitPrice)}</dd>
                </div>

                <div>
                  <dt>Estado del inventario</dt>
                  <dd>{medication.stockStatus}</dd>
                </div>
              </dl>

              <div className="medication-detail__actions">
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                >
                  <EditIcon />
                  <span>Editar medicamento</span>
                </button>

                <button
                  type="button"
                  onClick={() => onDelete(medication)}
                >
                  <TrashIcon />
                  <span>Eliminar medicamento</span>
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}