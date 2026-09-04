import InventoryCard from "./InventoryCard";

export default function InventoryTable({ medications, onSelect, onDelete }) {
  if (!medications || medications.length === 0) {
    return (
      <div className="inventory-table__empty-state">
        <p>No hay medicamentos registrados en el inventario.</p>
      </div>
    );
  }

  return (
    <section className="inventory-table" aria-label="Productos del inventario">
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