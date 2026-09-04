import { useState } from "react";
import { useInventory } from "../features/inventory/hooks/useInventory";
import InventoryForm from "../features/inventory/components/InventoryForm";
import InventoryStats from "../features/inventory/components/InventoryStats";
import StockAlert from "../features/inventory/components/StockAlert";
import InventoryTable from "../features/inventory/components/InventoryTable";
import ConfirmDialog from "../shared/components/ConfirmDialog";
import ErrorBoundary from "../shared/components/ErrorBoundary";

export default function InventoryPage() {
  return (
    <ErrorBoundary>
      <InventoryPageContent />
    </ErrorBoundary>
  );
}

function InventoryPageContent() {
  if (import.meta.env.DEV && window.location.search.includes("test-error")) {
    throw new Error("Error de prueba del inventario");
  }

  const {
    medications,
    metrics,
    addMedication,
    updateMedication,
    deleteMedication,
  } = useInventory();
  const [editingMedication, setEditingMedication] = useState(null);
  const [medicationToDelete, setMedicationToDelete] = useState(null);
  const [deleteError, setDeleteError] = useState("");

  function handleSubmit(formData) {
    if (editingMedication) {
      const result = updateMedication(editingMedication.id, formData);
      
      if (result.isValid) {
        setEditingMedication(null);
      }
    } else {
      addMedication(formData);
    }
  }

  function handleEdit(medication) {
    setEditingMedication(medication);
  }

  function handleDelete(id) {
    const medication = medications.find((item) => item.id === id);

    if (medication) {
      setMedicationToDelete(medication);
      setDeleteError("");
    }
  }

  function handleConfirmDelete() {
    if (!medicationToDelete) {
      return;
    }

    try {
      deleteMedication(medicationToDelete.id);
      setMedicationToDelete(null);
    } catch {
      setDeleteError("No se pudo eliminar el medicamento. Inténtalo de nuevo.");
      setMedicationToDelete(null);
    }
  }

  function handleCancel() {
    setEditingMedication(null);
  }

  return (
    <main className="inventory-page">
        <h1 className="inventory-page__title">Inventario de medicamentos</h1>

        <InventoryStats metrics={metrics} />
        <StockAlert medications={medications} />

        {deleteError && (
          <p className="inventory-page__error" role="alert" aria-live="assertive">
            {deleteError}
          </p>
        )}

        <section
          className="inventory-page__form-section"
          aria-label={editingMedication ? "Editar medicamento" : "Registrar medicamento"}
        >
          <InventoryForm
            initialValues={editingMedication || undefined}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitLabel={editingMedication ? "Actualizar medicamento" : "Registrar medicamento"}
            cancelLabel="Cancelar"
          />
        </section>

        <section className="inventory-page__table-section" aria-label="Lista de medicamentos">
          <InventoryTable
            medications={medications}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </section>

        <ConfirmDialog
          isOpen={Boolean(medicationToDelete)}
          message={
            medicationToDelete
              ? `¿Deseas eliminar ${medicationToDelete.name} del inventario?`
              : ""
          }
          onConfirm={handleConfirmDelete}
          onCancel={() => setMedicationToDelete(null)}
        />
    </main>
  );
}
