import { useEffect, useRef, useState } from "react";
import { useInventory } from "../features/inventory/hooks/useInventory";
import InventoryForm from "../features/inventory/components/InventoryForm";
import InventoryTable from "../features/inventory/components/InventoryTable";
import InventoryStats from "../features/inventory/components/InventoryStats";
import MedicationDetail from "../features/inventory/components/MedicationDetail";
import MedicationImport from "../features/inventory/components/MedicationImport";

export default function InventoryPage() {
  const {
    medications,
    metrics,
    addMedication,
    importMedications,
    updateMedication,
    deleteMedication,
    restoreMedication,
  } = useInventory();

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

  function handleCreate(formData) {
    return addMedication(formData);
  }

  function handleUpdate(id, formData) {
    const result = updateMedication(id, formData);

    if (result.isValid) {
      setSelectedMedication(result.medication);
    }

    return result;
  }

  function handleSelect(medication) {
    setSelectedMedication(medication);
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

      <section className="inventory-page__form-section" aria-label="Registrar medicamento">
        <InventoryForm
          onSubmit={handleCreate}
          submitLabel="Registrar medicamento"
          cancelLabel="Limpiar"
        />
      </section>

      <MedicationImport onImport={importMedications} />

      <section className="inventory-page__table-section" aria-label="Lista de medicamentos">
        <InventoryTable
          medications={medications}
          onSelect={handleSelect}
          onDelete={handleDeleteRequest}
        />
      </section>

      <MedicationDetail
        key={selectedMedication?.id ?? "closed"}
        medication={selectedMedication}
        onClose={() => setSelectedMedication(null)}
        onUpdate={handleUpdate}
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