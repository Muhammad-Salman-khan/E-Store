export function formatPKR(amount: number): string {
  // amount is in paisa per spec, convert to rupees
  const rupees = amount / 100
  return `Rs. ${rupees.toLocaleString("en-PK", { maximumFractionDigits: 0 })}`
}
