import { useMemo, useState } from "react";
import { validateMedication } from "../utils/inventoryValidation";
import {
  calculateInventoryMetrics,
  getStockStatus,
} from "../utils/inventoryUtils";

export function useInventory(initialMedications = []) {
  const [medications, setMedications] = useState(initialMedications);

  const addMedication = (medication) => {
    const validation = validateMedication(medication);

    if (!validation.isValid) {
      return validation;
    }

    const newMedication = {
      ...medication,
      quantity: Number(medication.quantity),
      unitPrice: Number(medication.unitPrice),
    };

    setMedications((currentMedications) => [
      ...currentMedications,
      newMedication,
    ]);

    return {
      isValid: true,
      errors: {},
      medication: newMedication,
    };
  };

  const updateMedication = (id, updatedMedication) => {
    const validation = validateMedication(updatedMedication);

    if (!validation.isValid) {
      return validation;
    }

    const medication = {
      ...updatedMedication,
      id,
      quantity: Number(updatedMedication.quantity),
      unitPrice: Number(updatedMedication.unitPrice),
    };

    setMedications((currentMedications) =>
      currentMedications.map((currentMedication) =>
        currentMedication.id === id ? medication : currentMedication
      )
    );

    return {
      isValid: true,
      errors: {},
      medication,
    };
  };

  const deleteMedication = (id) => {
    setMedications((currentMedications) =>
      currentMedications.filter((medication) => medication.id !== id)
    );
  };

  const medicationsWithStockStatus = useMemo(
    () =>
      medications.map((medication) => ({
        ...medication,
        stockStatus: getStockStatus(medication.quantity),
      })),
    [medications]
  );

  const metrics = useMemo(
    () => calculateInventoryMetrics(medications),
    [medications]
  );

  return {
    medications: medicationsWithStockStatus,
    metrics,
    addMedication,
    updateMedication,
    deleteMedication,
  };
}