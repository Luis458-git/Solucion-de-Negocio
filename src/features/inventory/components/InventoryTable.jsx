import InventoryCard from "./InventoryCard";

export default function InventoryTable({ medications, onSelect, onDelete }) {
  const medicationCount = medications?.length ?? 0;

  if (medicationCount === 0) {
    return (
      <section className="inventory-table" aria-label="Productos del inventario">
        <div className="inventory-table__header">
          <div>
            <p className="inventory-table__eyebrow">Catálogo</p>
            <h2 className="inventory-table__title">Tus medicamentos</h2>
          </div>
          <span className="inventory-table__count">0 productos</span>
        </div>

        <div className="inventory-table__empty-state">
          <div className="inventory-table__empty-icon" aria-hidden="true">
            +
          </div>
          <h3>Tu inventario está esperando su primer producto</h3>
          <p>
            Registra un medicamento manualmente o importa tu lista para comenzar a organizar la farmacia.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="inventory-table" aria-label="Productos del inventario">
      <div className="inventory-table__header">
        <div>
          <p className="inventory-table__eyebrow">Catálogo</p>
          <h2 className="inventory-table__title">Tus medicamentos</h2>
        </div>
        <span className="inventory-table__count">
          {medicationCount} {medicationCount === 1 ? "producto" : "productos"}
        </span>
      </div>

      <div className="inventory-table__grid">
        {medications.map((medication) => (
          <InventoryCard
            key={medication.id}
            medication={medication}
            onSelect={onSelect}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
}