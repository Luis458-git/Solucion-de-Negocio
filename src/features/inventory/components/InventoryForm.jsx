import { useId, useState } from "react";
import { validateMedication } from "../utils/inventoryValidation";

const EMPTY_FORM = {
  name: "",
  category: "",
  quantity: "",
  unitPrice: "",
};

function normalizeInitialValues(values) {
  return {
    name: values?.name ?? "",
    category: values?.category ?? "",
    quantity:
      values?.quantity !== undefined && values?.quantity !== null
        ? String(values.quantity)
        : "",
    unitPrice:
      values?.unitPrice !== undefined && values?.unitPrice !== null
        ? String(values.unitPrice)
        : "",
  };
}

// Adapts validateMedication (returns { isValid, errors }) to the shape
// expected by the form: a plain errors object.
function defaultValidate(data) {
  return validateMedication(data).errors;
}

export default function InventoryForm({
  initialValues = EMPTY_FORM,
  onSubmit,
  onCancel,
  validate = defaultValidate,
  submitLabel = "Registrar medicamento",
  cancelLabel = "Limpiar",
}) {
  const [prevInitialValues, setPrevInitialValues] = useState(initialValues);
  const [formData, setFormData] = useState(
    normalizeInitialValues(initialValues)
  );
  const [errors, setErrors] = useState({});

  // Derived-state update: sync formData when initialValues reference changes.
  // This is React's documented "store previous prop in state" pattern and
  // avoids calling setState inside useEffect (react-hooks/set-state-in-effect).
  if (prevInitialValues !== initialValues) {
    setPrevInitialValues(initialValues);
    setFormData(normalizeInitialValues(initialValues));
    setErrors({});
  }

  const formId = useId();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    setErrors((currentErrors) => {
      if (!currentErrors[name]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[name];

      return nextErrors;
    });
  };

    const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validate ? validate(formData) : {};

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const result = onSubmit(formData);

    if (result && result.isValid === false) {
      setErrors(result.errors || {});
    }
  };

  const handleCancel = () => {
    setFormData(EMPTY_FORM);
    setErrors({});

    if (onCancel) {
      onCancel();
    }
  };

  const getInputClassName = (fieldName) =>
    errors[fieldName] ? "inventory-form__input inventory-form__input--error" : "inventory-form__input";

  const getErrorId = (fieldName) => `${formId}-${fieldName}-error`;

  return (
    <form
      className="inventory-form"
      onSubmit={handleSubmit}
      noValidate
      aria-label="Formulario de inventario"
    >
      <div className="inventory-form__field">
        <label htmlFor={`${formId}-name`}>Nombre del medicamento</label>

        <input
          id={`${formId}-name`}
          className={getInputClassName("name")}
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          autoComplete="off"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? getErrorId("name") : undefined}
        />

        {errors.name && (
          <p id={getErrorId("name")} className="inventory-form__error" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      <div className="inventory-form__field">
        <label htmlFor={`${formId}-category`}>Categoría</label>

        <input
          id={`${formId}-category`}
          className={getInputClassName("category")}
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          autoComplete="off"
          aria-invalid={Boolean(errors.category)}
          aria-describedby={
            errors.category ? getErrorId("category") : undefined
          }
        />

        {errors.category && (
          <p
            id={getErrorId("category")}
            className="inventory-form__error"
            role="alert"
          >
            {errors.category}
          </p>
        )}
      </div>

      <div className="inventory-form__field">
        <label htmlFor={`${formId}-quantity`}>Cantidad</label>

        <input
          id={`${formId}-quantity`}
          className={getInputClassName("quantity")}
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          min="0"
          step="1"
          inputMode="numeric"
          aria-invalid={Boolean(errors.quantity)}
          aria-describedby={
            errors.quantity ? getErrorId("quantity") : undefined
          }
        />

        {errors.quantity && (
          <p
            id={getErrorId("quantity")}
            className="inventory-form__error"
            role="alert"
          >
            {errors.quantity}
          </p>
        )}
      </div>

      <div className="inventory-form__field">
        <label htmlFor={`${formId}-unit-price`}>Precio unitario</label>

        <input
          id={`${formId}-unit-price`}
          className={getInputClassName("unitPrice")}
          type="number"
          name="unitPrice"
          value={formData.unitPrice}
          onChange={handleChange}
          min="0"
          step="0.01"
          inputMode="decimal"
          aria-invalid={Boolean(errors.unitPrice)}
          aria-describedby={
            errors.unitPrice ? getErrorId("unitPrice") : undefined
          }
        />

        {errors.unitPrice && (
          <p
            id={getErrorId("unitPrice")}
            className="inventory-form__error"
            role="alert"
          >
            {errors.unitPrice}
          </p>
        )}
      </div>

      <div className="inventory-form__actions">
        <button type="submit">
          {submitLabel}
        </button>

        <button type="button" onClick={handleCancel}>
          {cancelLabel}
        </button>
      </div>
    </form>
  );
}