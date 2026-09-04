export default function InventoryStats({ metrics }) {
  const {
    totalProducts = 0,
    totalUnits = 0,
    lowStockProducts = 0,
    exhaustedProducts = 0,
  } = metrics || {};

  const stats = [
    { label: "Medicamentos registrados", value: totalProducts },
    { label: "Unidades disponibles", value: totalUnits },
    { label: "Con stock bajo", value: lowStockProducts },
    { label: "Agotados", value: exhaustedProducts },
  ];

  return (
    <section className="inventory-stats" aria-labelledby="inventory-stats-title">
      <h2 id="inventory-stats-title">Resumen del inventario</h2>
      <dl className="inventory-stats__list">
        {stats.map((stat) => (
          <div className="inventory-stats__item" key={stat.label}>
            <dt>{stat.label}</dt>
            <dd>{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}