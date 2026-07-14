import type { Currency, Region } from "../types";

export const currencies: Currency[] = [
  { code: "USD", symbol: "$", name: "US Dollar", rate: 1 },
  { code: "EUR", symbol: "€", name: "Euro", rate: 0.92 },
  { code: "GBP", symbol: "£", name: "British Pound", rate: 0.79 },
  { code: "CHF", symbol: "CHF", name: "Swiss Franc", rate: 0.88 },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", rate: 149 },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan", rate: 7.24 },
  { code: "HKD", symbol: "HK$", name: "Hong Kong Dollar", rate: 7.82 },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham", rate: 3.67 },
];

export const regions: Region[] = [
  { code: "GLOBAL", name: "Worldwide", nameZh: "全球", currency: "USD" },
  { code: "NA", name: "North America", nameZh: "北美", currency: "USD" },
  { code: "EU", name: "Europe", nameZh: "欧洲", currency: "EUR" },
  { code: "UK", name: "United Kingdom", nameZh: "英国", currency: "GBP" },
  { code: "ASIA", name: "Asia Pacific", nameZh: "亚太", currency: "JPY" },
  { code: "CN", name: "China", nameZh: "中国", currency: "CNY" },
  { code: "ME", name: "Middle East", nameZh: "中东", currency: "AED" },
  { code: "CH", name: "Switzerland", nameZh: "瑞士", currency: "CHF" },
];

export const formatPrice = (price: number, currency: string): string => {
  const cur = currencies.find((c) => c.code === currency) || currencies[0];
  const converted = price * cur.rate;
  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(converted);

  if (cur.code === "JPY" || cur.code === "CNY") {
    return `${cur.symbol}${formatted}`;
  }
  return `${cur.symbol}${formatted}`;
};