import { useMemo, useState } from "react";
import { validateMedication } from "../utils/inventoryValidation";
import {
  calculateInventoryMetrics,
  getStockStatus,
} from "../utils/inventoryUtils";

function normalizeText(value) {
  return String(value ?? "")
    .trim()
    .toLocaleLowerCase("es-CR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function isDuplicateMedication(medication, medications, ignoredId = null) {
  const medicationName = normalizeText(medication.name);
  const medicationCategory = normalizeText(medication.category);

  return medications.some(
    (currentMedication) =>
      currentMedication.id !== ignoredId &&
      normalizeText(currentMedication.name) === medicationName &&
      normalizeText(currentMedication.category) === medicationCategory
  );
}

export function useInventory(initialMedications = []) {
  const [medications, setMedications] = useState(initialMedications);

  function addMedication(medication) {
    const validation = validateMedication(medication);

    if (!validation.isValid) {
      return validation;
    }

    if (isDuplicateMedication(medication, medications)) {
      return {
        isValid: false,
        errors: {
          name: "Este medicamento ya existe con la misma categoría.",
        },
      };
    }

    const newMedication = {
      id: crypto.randomUUID(),
      ...medication,
      name: medication.name.trim(),
      category: medication.category.trim(),
      quantity: Number(medication.quantity),
      unitPrice: Number(medication.unitPrice),
    };

    setMedications((currentMedications) => [
      ...currentMedications,
      newMedication,
    ]);

    return { isValid: true, errors: {}, medication: newMedication };
  }

  function updateMedication(id, updatedMedication) {
    const validation = validateMedication(updatedMedication);

    if (!validation.isValid) {
      return validation;
    }

    if (isDuplicateMedication(updatedMedication, medications, id)) {
      return {
        isValid: false,
        errors: {
          name: "Este medicamento ya existe con la misma categoría.",
        },
      };
    }

    const medication = {
      ...updatedMedication,
      id,
      name: updatedMedication.name.trim(),
      category: updatedMedication.category.trim(),
      quantity: Number(updatedMedication.quantity),
      unitPrice: Number(updatedMedication.unitPrice),
    };

    setMedications((currentMedications) =>
      currentMedications.map((currentMedication) =>
        currentMedication.id === id ? medication : currentMedication
      )
    );

    return { isValid: true, errors: {}, medication };
  }

  function deleteMedication(id) {
    setMedications((currentMedications) =>
      currentMedications.filter((medication) => medication.id !== id)
    );
  }

  function restoreMedication(medication) {
    setMedications((currentMedications) => {
      const alreadyExists = currentMedications.some(
        (currentMedication) => currentMedication.id === medication.id
      );

      return alreadyExists
        ? currentMedications
        : [...currentMedications, medication];
    });
  }

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
    restoreMedication,
  };
}