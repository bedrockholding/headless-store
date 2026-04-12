import type { Money } from "@/lib/shopify/types";

export function formatMoney(money: Money, locale = "en-US"): string {
  const amount = Number.parseFloat(money.amount);
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: money.currencyCode,
  }).format(amount);
}
