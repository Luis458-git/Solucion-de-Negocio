export function getStockStatus(quantity) {
  const numericQuantity = Number(quantity);

  if (numericQuantity === 0) {
    return "Agotado";
  }

  if (numericQuantity < 5) {
    return "Stock Bajo";
  }

  return "Stock Normal";
}

export function calculateInventoryMetrics(medications) {
  return medications.reduce(
    (metrics, medication) => {
      const quantity = Number(medication.quantity);
      const stockStatus = getStockStatus(quantity);

      metrics.totalProducts += 1;
      metrics.totalUnits += quantity;

      if (stockStatus === "Stock Bajo") {
        metrics.lowStockProducts += 1;
      }

      if (stockStatus === "Agotado") {
        metrics.exhaustedProducts += 1;
      }

      return metrics;
    },
    {
      totalProducts: 0,
      totalUnits: 0,
      lowStockProducts: 0,
      exhaustedProducts: 0,
    }
  );
}