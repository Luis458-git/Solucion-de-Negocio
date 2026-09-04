const costaRicaCurrency = new Intl.NumberFormat("es-CR", {
  style: "currency",
  currency: "CRC",
  currencyDisplay: "symbol",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatCurrency(value) {
  return costaRicaCurrency.format(Number(value) || 0);
}