export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateTax(amount: number, rate: number = 0.18): number {
  return amount * rate;
}

export function calculateTotal(subtotal: number, tax: number): number {
  return subtotal + tax;
}