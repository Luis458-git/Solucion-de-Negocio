import { useInventory } from "../features/inventory/hooks/useInventory";
import InventoryForm from "../features/inventory/components/InventoryForm";

export default function InventoryPage() {
  const { addMedication } = useInventory();

  function handleSubmit(formData) {
    const result = addMedication(formData);

    if (result.isValid) {
      // The form resets itself via onCancel when submission succeeds.
      // Future increments will handle success feedback (toast, table refresh, etc.)
      console.info("Medicamento registrado:", result.medication);
    }
  }

  return (
    <main className="inventory-page">
      <h1 className="inventory-page__title">Inventario de medicamentos</h1>

      <section className="inventory-page__form-section" aria-label="Registrar medicamento">
        <InventoryForm onSubmit={handleSubmit} />
      </section>
    </main>
  );
}
