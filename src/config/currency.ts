export const CURRENCY_SYMBOL = "XXYYZZ";

/** Format a number as price with the app currency (e.g. "EGP 123.45" or "$123.45"). */
export function formatPrice(amount: number): string {
  const value = Number(amount).toFixed(2);
  const prefix = CURRENCY_SYMBOL.length >= 2 ? `${CURRENCY_SYMBOL} ` : CURRENCY_SYMBOL;
  return `${prefix}${value}`;
}
