import { useState } from "react";
import { useInventory } from "../features/inventory/hooks/useInventory";
import InventoryForm from "../features/inventory/components/InventoryForm";
import InventoryTable from "../features/inventory/components/InventoryTable";

export default function InventoryPage() {
  const { medications, addMedication, updateMedication, deleteMedication } = useInventory();
  const [editingMedication, setEditingMedication] = useState(null);

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
    deleteMedication(id);
  }

  function handleCancel() {
    setEditingMedication(null);
  }

  return (
    <main className="inventory-page">
      <h1 className="inventory-page__title">Inventario de medicamentos</h1>

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
    </main>
  );
}
