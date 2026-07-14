import { formatPrice } from "../data/currencies";

export function formatPriceWithCurrency(price: number, currency: string): string {
  return formatPrice(price, currency);
}

export function classNames(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}