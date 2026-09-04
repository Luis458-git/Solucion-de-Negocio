import * as XLSX from "xlsx";
import { validateMedication } from "./inventoryValidation";

const HEADER_ALIASES = {
  name: ["name", "nombre", "medicamento", "producto", "nombre medicamento"],
  category: ["category", "categoria", "categoría", "tipo"],
  quantity: ["quantity", "cantidad", "stock", "existencia", "unidades"],
  unitPrice: [
    "unitprice",
    "unit price",
    "precio",
    "precio unitario",
    "precio_unitario",
    "coste",
    "costo",
  ],
};

function normalizeHeader(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[._-]+/g, " ")
    .replace(/\s+/g, " ");
}

function findValue(row, fieldName) {
  const acceptedHeaders = HEADER_ALIASES[fieldName];
  const rowEntries = Object.entries(row);

  const match = rowEntries.find(([header]) => {
    const normalizedHeader = normalizeHeader(header);
    return acceptedHeaders.some(
      (acceptedHeader) => normalizeHeader(acceptedHeader) === normalizedHeader
    );
  });

  return match ? match[1] : "";
}

function normalizeMedicationRow(row) {
  return {
    name: String(findValue(row, "name") ?? "").trim(),
    category: String(findValue(row, "category") ?? "").trim(),
    quantity: String(findValue(row, "quantity") ?? "").trim(),
    unitPrice: String(findValue(row, "unitPrice") ?? "").trim(),
  };
}

function readFileAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("No se pudo leer el archivo."));
    reader.readAsArrayBuffer(file);
  });
}

export async function parseMedicationFile(file) {
  if (!file) {
    throw new Error("Selecciona un archivo para importar.");
  }

  const supportedExtensions = ["csv", "xls", "xlsx"];
  const extension = file.name.split(".").pop()?.toLowerCase();

  if (!supportedExtensions.includes(extension)) {
    throw new Error("El archivo debe tener formato CSV, XLS o XLSX.");
  }

  const fileBuffer = await readFileAsArrayBuffer(file);
  const workbook = XLSX.read(fileBuffer, { type: "array" });
  const firstSheetName = workbook.SheetNames[0];

  if (!firstSheetName) {
    throw new Error("El archivo no contiene ninguna hoja.");
  }

  const worksheet = workbook.Sheets[firstSheetName];
  const rows = XLSX.utils.sheet_to_json(worksheet, {
    defval: "",
    raw: false,
  });

  if (rows.length === 0) {
    throw new Error("El archivo no contiene registros.");
  }

  return rows.map((row, index) => {
    const medication = normalizeMedicationRow(row);
    const validation = validateMedication(medication);

    return {
      rowNumber: index + 2,
      medication,
      isValid: validation.isValid,
      errors: validation.errors,
    };
  });
}