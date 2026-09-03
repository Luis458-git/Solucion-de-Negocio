export function validateMedication(medication) {
  const errors = {};

  if (!medication?.name?.trim()) {
    errors.name = "El nombre es obligatorio.";
  }

  if (!medication?.category?.trim()) {
    errors.category = "La categoría es obligatoria.";
  }

  if (
    medication?.quantity === undefined ||
    medication?.quantity === null ||
    medication.quantity === ""
  ) {
    errors.quantity = "La cantidad es obligatoria.";
  } else if (
    !Number.isInteger(Number(medication.quantity)) ||
    Number(medication.quantity) < 0
  ) {
    errors.quantity = "La cantidad debe ser un entero mayor o igual a 0.";
  }

  if (
    medication?.unitPrice === undefined ||
    medication?.unitPrice === null ||
    medication.unitPrice === ""
  ) {
    errors.unitPrice = "El precio unitario es obligatorio.";
  } else if (
    Number.isNaN(Number(medication.unitPrice)) ||
    Number(medication.unitPrice) < 0
  ) {
    errors.unitPrice = "El precio unitario debe ser mayor o igual a 0.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}