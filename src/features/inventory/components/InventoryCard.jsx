import { formatCurrency } from "../utils/currency";

function EyeIcon() {
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
      <path d="M2.5 12s3.5-5 9.5-5 9.5 5 9.5 5-3.5 5-9.5 5-9.5-5-9.5-5Z" />
      <circle cx="12" cy="12" r="2.75" />
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

export default function InventoryCard({ medication, onSelect, onDelete }) {
  const statusClassName = medication.stockStatus
    .toLowerCase()
    .replaceAll(" ", "-")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  function handleOpenKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(medication);
    }
  }

  return (
    <article className="inventory-card">
      <div
        className="inventory-card__open"
        role="button"
        tabIndex="0"
        onClick={() => onSelect(medication)}
        onKeyDown={handleOpenKeyDown}
        aria-label={`Ver detalles de ${medication.name}`}
      >
        <div className="inventory-card__image-wrapper">
          {medication.imageUrl ? (
            <img
              className="inventory-card__image"
              src={medication.imageUrl}
              alt={`Presentación de ${medication.name}`}
            />
          ) : (
            <div
              className="inventory-card__image-placeholder"
              aria-hidden="true"
            >
              {medication.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="inventory-card__content">
          <p className="inventory-card__category">
            {medication.category}
          </p>

          <h3 className="inventory-card__name">
            {medication.name}
          </h3>

          <div className="inventory-card__summary">
            <span>
              {medication.quantity} unidades
            </span>

            <span>
              {formatCurrency(medication.unitPrice)}
            </span>
          </div>

          <span
            className={`inventory-card__status inventory-card__status--${statusClassName}`}
          >
            {medication.stockStatus}
          </span>
        </div>
      </div>

      <div className="inventory-card__actions">
        <button
          type="button"
          onClick={() => onSelect(medication)}
        >
          <EyeIcon />
          <span>Ver detalle</span>
        </button>

        <button
          type="button"
          onClick={() => onDelete(medication)}
        >
          <TrashIcon />
          <span>Eliminar</span>
        </button>
      </div>
    </article>
  );
}