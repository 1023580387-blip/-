import { create } from "zustand";
import { currencies } from "../data/currencies";

interface CurrencyStore {
  currency: string;
  setCurrency: (code: string) => void;
  getSymbol: () => string;
  getRate: () => number;
}

export const useCurrencyStore = create<CurrencyStore>((set, get) => ({
  currency: "USD",
  setCurrency: (code: string) => set({ currency: code }),
  getSymbol: () => {
    const cur = currencies.find((c) => c.code === get().currency);
    return cur?.symbol || "$";
  },
  getRate: () => {
    const cur = currencies.find((c) => c.code === get().currency);
    return cur?.rate || 1;
  },
}));