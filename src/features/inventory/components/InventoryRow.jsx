export default function InventoryRow({ medication, onEdit, onDelete }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(value);
  };

  return (
    <tr>
      <td>{medication.name}</td>
      <td>{medication.category}</td>
      <td>{medication.quantity}</td>
      <td>{formatCurrency(medication.unitPrice)}</td>
      <td>{medication.stockStatus}</td>
      <td>
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
      </td>
    </tr>
  );
}
