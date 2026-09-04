export default function StockAlert({ medications = [] }) {
  const exhaustedCount = medications.filter(
    (medication) => medication.stockStatus === "Agotado"
  ).length;
  const lowStockCount = medications.filter(
    (medication) => medication.stockStatus === "Stock Bajo"
  ).length;

  let message = "El inventario está en niveles normales.";
  let title = "Stock normal";
  let status = "normal";

  if (exhaustedCount > 0) {
    title = "Hay medicamentos agotados";
    message = `${exhaustedCount} medicamento${exhaustedCount === 1 ? "" : "s"} requiere${exhaustedCount === 1 ? "" : "n"} reposición inmediata.`;
    status = "exhausted";
  } else if (lowStockCount > 0) {
    title = "Hay medicamentos con stock bajo";
    message = `${lowStockCount} medicamento${lowStockCount === 1 ? "" : "s"} requiere${lowStockCount === 1 ? "" : "n"} revisión pronto.`;
    status = "low";
  }

  return (
    <section
      className={`stock-alert stock-alert--${status}`}
      aria-live="polite"
      aria-labelledby="stock-alert-title"
    >
      <h2 id="stock-alert-title">{title}</h2>
      <p>{message}</p>
    </section>
  );
}