// Parse a price label like "Rp 350k" / "Rp 1.2M" into a number of Rupiah.
export function parsePrice(label: string): number {
  const num = parseFloat(label.replace(/[^0-9.]/g, '')) || 0;
  return label.includes('M') ? num * 1_000_000 : num * 1000;
}
