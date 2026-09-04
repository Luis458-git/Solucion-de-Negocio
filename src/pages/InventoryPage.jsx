import { useEffect, useRef, useState } from "react";
import { useInventory } from "../features/inventory/hooks/useInventory";
import InventoryForm from "../features/inventory/components/InventoryForm";
import InventoryTable from "../features/inventory/components/InventoryTable";
import InventoryStats from "../features/inventory/components/InventoryStats";
import MedicationDetail from "../features/inventory/components/MedicationDetail";

export default function InventoryPage() {
  const {
    medications,
    metrics,
    addMedication,
    updateMedication,
    deleteMedication,
    restoreMedication,
  } = useInventory();

  const [editingMedication, setEditingMedication] = useState(null);
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [undoMedication, setUndoMedication] = useState(null);
  const undoTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (undoTimerRef.current) {
        clearTimeout(undoTimerRef.current);
      }
    };
  }, []);

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

  function handleSelect(medication) {
    setSelectedMedication(medication);
  }

  function handleEdit(medication) {
    setEditingMedication(medication);
    setSelectedMedication(null);
  }

  function handleDeleteRequest(medication) {
    setSelectedMedication(null);
    setDeleteCandidate(medication);
  }

  function handleCancelDelete() {
    setDeleteCandidate(null);
  }

  function handleConfirmDelete() {
    if (!deleteCandidate) {
      return;
    }

    deleteMedication(deleteCandidate.id);
    setUndoMedication(deleteCandidate);
    setDeleteCandidate(null);

    if (undoTimerRef.current) {
      clearTimeout(undoTimerRef.current);
    }

    undoTimerRef.current = setTimeout(() => {
      setUndoMedication(null);
    }, 5000);
  }

  function handleUndo() {
    if (!undoMedication) {
      return;
    }

    restoreMedication(undoMedication);
    setUndoMedication(null);

    if (undoTimerRef.current) {
      clearTimeout(undoTimerRef.current);
    }
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
        aria-label={editingMedication ? "Editar medicamento" : "Registrar medicamento"}
      >
        <InventoryForm
          initialValues={editingMedication || undefined}
          onSubmit={handleSubmit}
          onCancel={() => setEditingMedication(null)}
          submitLabel={editingMedication ? "Actualizar medicamento" : "Registrar medicamento"}
          cancelLabel="Cancelar"
        />
      </section>

      <section className="inventory-page__table-section" aria-label="Lista de medicamentos">
        <InventoryTable
          medications={medications}
          onSelect={handleSelect}
          onEdit={handleEdit}
          onDelete={handleDeleteRequest}
        />
      </section>

      <MedicationDetail
        medication={selectedMedication}
        onClose={() => setSelectedMedication(null)}
        onEdit={handleEdit}
        onDelete={handleDeleteRequest}
      />

      {deleteCandidate && (
        <div className="delete-dialog__backdrop" role="presentation">
          <section
            className="delete-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-dialog-title"
          >
            <h2 id="delete-dialog-title">Eliminar medicamento</h2>
            <p>
              ¿Seguro que deseas eliminar “{deleteCandidate.name}”? Podrás deshacerlo durante unos segundos.
            </p>
            <div className="delete-dialog__actions">
              <button type="button" onClick={handleCancelDelete}>
                Cancelar
              </button>
              <button type="button" onClick={handleConfirmDelete}>
                Eliminar
              </button>
            </div>
          </section>
        </div>
      )}

      {undoMedication && (
        <div className="undo-notification" role="status" aria-live="polite">
          <span>“{undoMedication.name}” fue eliminado.</span>
          <button type="button" onClick={handleUndo}>
            Deshacer
          </button>
        </div>
      )}
    </main>
  );
}