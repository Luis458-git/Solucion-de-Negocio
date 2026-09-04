export default function InventoryCard({ medication, onSelect, onEdit, onDelete }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(medication);
    }
  };

  const statusClassName = medication.stockStatus
    .toLowerCase()
    .replaceAll(" ", "-")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  return (
    <article
      className="inventory-card"
      tabIndex="0"
      role="button"
      onClick={() => onSelect(medication)}
      onKeyDown={handleKeyDown}
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
          <span>${Number(medication.unitPrice).toFixed(2)} MXN</span>
        </div>

        <span className={`inventory-card__status inventory-card__status--${statusClassName}`}>
          {medication.stockStatus}
        </span>
      </div>

      <div className="inventory-card__actions" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          onClick={() => onEdit(medication)}
          aria-label={`Editar ${medication.name}`}
        >
          Editar
        </button>

        <button
          type="button"
          onClick={() => onDelete(medication.id)}
          aria-label={`Eliminar ${medication.name}`}
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}
