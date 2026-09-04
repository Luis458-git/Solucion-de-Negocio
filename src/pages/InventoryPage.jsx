import { useState } from "react";
import { useInventory } from "../features/inventory/hooks/useInventory";
import InventoryForm from "../features/inventory/components/InventoryForm";
import InventoryTable from "../features/inventory/components/InventoryTable";
import InventoryStats from "../features/inventory/components/InventoryStats";

export default function InventoryPage() {
  const {
    medications,
    metrics,
    addMedication,
    updateMedication,
    deleteMedication,
  } = useInventory();

  const [editingMedication, setEditingMedication] = useState(null);

  function handleSubmit(formData) {
    if (editingMedication) {
      const result = updateMedication(editingMedication.id, formData);

      if (result.isValid) {
        setEditingMedication(null);
      }

      return;
    }

    addMedication(formData);
  }

  function handleEdit(medication) {
    setEditingMedication(medication);
  }

  function handleDelete(id) {
    const medication = medications.find((item) => item.id === id);

    if (!medication) {
      return;
    }

    const confirmed = window.confirm(
      `¿Deseas eliminar el medicamento "${medication.name}"?`
    );

    if (confirmed) {
      deleteMedication(id);
    }
  }

  function handleCancel() {
    setEditingMedication(null);
  }

  return (
    <main className="inventory-page">
      <header className="inventory-page__header">
        <p className="inventory-page__eyebrow">Control de farmacia</p>
        <h1 className="inventory-page__title">Inventario de medicamentos</h1>
        <p className="inventory-page__description">
          Registra medicamentos y revisa rápidamente cuáles necesitan reposición.
        </p>
      </header>

      <InventoryStats metrics={metrics} />

      <section
        className="inventory-page__form-section"
        aria-label={
          editingMedication
            ? "Editar medicamento"
            : "Registrar medicamento"
        }
      >
        <InventoryForm
          initialValues={editingMedication || undefined}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitLabel={
            editingMedication
              ? "Actualizar medicamento"
              : "Registrar medicamento"
          }
          cancelLabel="Cancelar"
        />
      </section>

      <section
        className="inventory-page__table-section"
        aria-label="Lista de medicamentos"
      >
        <InventoryTable
          medications={medications}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </section>
    </main>
  );
}
