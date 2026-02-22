export const CURRENCY_SYMBOL = "EGP";

// Format a number as price with the app currency
export function formatPrice(amount: number): string {
  const value = Number(amount).toFixed(2);
  const prefix = CURRENCY_SYMBOL.length >= 2 ? `${CURRENCY_SYMBOL} ` : CURRENCY_SYMBOL;
  return `${prefix}${value}`;
}
