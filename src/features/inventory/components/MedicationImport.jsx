import { useState } from "react";
import { parseMedicationFile } from "../utils/importMedicationFile";

export default function MedicationImport({ onImport }) {
  const [file, setFile] = useState(null);
  const [rows, setRows] = useState([]);
  const [isReading, setIsReading] = useState(false);
  const [error, setError] = useState("");

  const validRows = rows.filter((row) => row.isValid);
  const invalidRows = rows.filter((row) => !row.isValid);

  async function handleFileChange(event) {
    const selectedFile = event.target.files?.[0];

    setFile(selectedFile || null);
    setRows([]);
    setError("");

    if (!selectedFile) {
      return;
    }

    setIsReading(true);

    try {
      const parsedRows = await parseMedicationFile(selectedFile);
      setRows(parsedRows);
    } catch (readError) {
      setError(readError.message || "No se pudo procesar el archivo.");
    } finally {
      setIsReading(false);
    }
  }

  function handleImport() {
    if (validRows.length === 0 || !onImport) {
      return;
    }

    onImport(validRows.map((row) => row.medication));
    setFile(null);
    setRows([]);
    setError("");
  }

  return (
    <section className="medication-import" aria-labelledby="medication-import-title">
      <div className="medication-import__header">
        <div>
          <p className="medication-import__eyebrow">Carga masiva</p>
          <h2 id="medication-import-title">Importar inventario</h2>
          <p>
            Sube una lista CSV o Excel para revisar sus registros antes de agregarlos.
          </p>
        </div>

        <label className="medication-import__file-button">
          <span>{isReading ? "Leyendo archivo..." : "Seleccionar archivo"}</span>
          <input
            type="file"
            accept=".csv,.xls,.xlsx"
            onChange={handleFileChange}
            disabled={isReading}
          />
        </label>
      </div>

      {file && <p className="medication-import__filename">Archivo: {file.name}</p>}

      {error && (
        <p className="medication-import__error" role="alert">
          {error}
        </p>
      )}

      {rows.length > 0 && (
        <>
          <div className="medication-import__summary" aria-live="polite">
            <span>{rows.length} filas detectadas</span>
            <span className="medication-import__valid-count">
              {validRows.length} válidas
            </span>
            <span className="medication-import__invalid-count">
              {invalidRows.length} con errores
            </span>
          </div>

          <div className="medication-import__preview-wrapper">
            <table className="medication-import__preview">
              <thead>
                <tr>
                  <th>Fila</th>
                  <th>Medicamento</th>
                  <th>Categoría</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.rowNumber} className={!row.isValid ? "is-invalid" : ""}>
                    <td>{row.rowNumber}</td>
                    <td>{row.medication.name || "—"}</td>
                    <td>{row.medication.category || "—"}</td>
                    <td>{row.medication.quantity || "—"}</td>
                    <td>{row.medication.unitPrice || "—"}</td>
                    <td>
                      {row.isValid ? (
                        <span className="medication-import__status medication-import__status--valid">
                          Válida
                        </span>
                      ) : (
                        <span
                          className="medication-import__status medication-import__status--invalid"
                          title={Object.values(row.errors).join(" ")}
                        >
                          Revisar
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {invalidRows.length > 0 && (
            <p className="medication-import__hint">
              Corrige las filas marcadas en el archivo y vuelve a cargarlo. Las filas con errores no se importarán.
            </p>
          )}

          <div className="medication-import__actions">
            <button
              type="button"
              onClick={handleImport}
              disabled={validRows.length === 0 || !onImport}
            >
              Importar {validRows.length} registros válidos
            </button>
          </div>
        </>
      )}
    </section>
  );
}