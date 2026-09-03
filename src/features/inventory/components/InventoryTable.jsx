import InventoryRow from "./InventoryRow";

export default function InventoryTable({ medications, onEdit, onDelete }) {
  if (!medications || medications.length === 0) {
    return (
      <div className="inventory-table__empty-state">
        <p>No hay medicamentos registrados en el inventario.</p>
      </div>
    );
  }

  return (
    <div className="inventory-table__container">
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {medications.map((medication) => (
            <InventoryRow
              key={medication.id}
              medication={medication}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
