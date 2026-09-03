import { useInventory } from "../features/inventory/hooks/useInventory";
import InventoryForm from "../features/inventory/components/InventoryForm";
import InventoryTable from "../features/inventory/components/InventoryTable";

export default function InventoryPage() {
  const { medications, addMedication, deleteMedication } = useInventory();

  function handleSubmit(formData) {
    const result = addMedication(formData);

    if (result.isValid) {
      // The form resets itself via onCancel when submission succeeds.
      console.info("Medicamento registrado:", result.medication);
    }
  }

  function handleEdit(medication) {
    // En un futuro incremento se conectará esto con un modal o estado de edición
    console.info("Editar medicamento solicitado:", medication);
  }

  function handleDelete(id) {
    // En un futuro incremento se añadirá un diálogo de confirmación (ConfirmDialog)
    deleteMedication(id);
    console.info("Medicamento eliminado con id:", id);
  }

  return (
    <main className="inventory-page">
      <h1 className="inventory-page__title">Inventario de medicamentos</h1>

      <section className="inventory-page__form-section" aria-label="Registrar medicamento">
        <InventoryForm onSubmit={handleSubmit} />
      </section>

      <section className="inventory-page__table-section" aria-label="Lista de medicamentos">
        <InventoryTable
          medications={medications}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </section>
    </main>
  );
}
