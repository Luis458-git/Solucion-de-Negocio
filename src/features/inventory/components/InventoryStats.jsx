export default function InventoryStats({ metrics }) {
  const statItems = [
    {
      label: "Productos registrados",
      value: metrics.totalProducts,
    },
    {
      label: "Unidades totales",
      value: metrics.totalUnits,
    },
    {
      label: "Stock bajo",
      value: metrics.lowStockProducts,
    },
    {
      label: "Agotados",
      value: metrics.exhaustedProducts,
    },
  ];

  return (
    <section
      className="inventory-stats"
      aria-labelledby="inventory-stats-title"
    >
      <h2 id="inventory-stats-title">Resumen del inventario</h2>

      <div className="inventory-stats__grid">
        {statItems.map((stat) => (
          <article className="inventory-stats__card" key={stat.label}>
            <p className="inventory-stats__label">{stat.label}</p>
            <strong className="inventory-stats__value">{stat.value}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
