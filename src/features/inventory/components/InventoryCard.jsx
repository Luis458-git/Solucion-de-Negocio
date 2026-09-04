import { formatCurrency } from "../utils/currency";

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
            <div className="inventory-card__image-placeholder" aria-hidden="true">
              {medication.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="inventory-card__content">
          <p className="inventory-card__category">{medication.category}</p>
          <h3 className="inventory-card__name">{medication.name}</h3>
          <div className="inventory-card__summary">
            <span>{medication.quantity} unidades</span>
            <span>{formatCurrency(medication.unitPrice)}</span>
          </div>
          <span className={`inventory-card__status inventory-card__status--${statusClassName}`}>
            {medication.stockStatus}
          </span>
        </div>
      </div>

      <div className="inventory-card__actions">
        <button type="button" onClick={() => onSelect(medication)}>
          Ver detalle
        </button>
        <button type="button" onClick={() => onDelete(medication)}>
          Eliminar
        </button>
      </div>
    </article>
  );
}