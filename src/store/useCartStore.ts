import { create } from "zustand";
import type { CartItem } from "../types";

interface CartStore {
  items: CartItem[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  updateItem: (productId: string, updates: Partial<CartItem>) => void;
  clearCart: () => void;
  itemCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (productId: string) => {
    const existing = get().items.find((item) => item.productId === productId);
    if (existing) {
      set({
        items: get().items.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
        ),
      });
    } else {
      set({
        items: [
          ...get().items,
          { productId, quantity: 1, customPackage: "standard", deliveryRegion: "GLOBAL" },
        ],
      });
    }
  },
  removeItem: (productId: string) => {
    set({ items: get().items.filter((item) => item.productId !== productId) });
  },
  updateItem: (productId: string, updates: Partial<CartItem>) => {
    set({
      items: get().items.map((item) =>
        item.productId === productId ? { ...item, ...updates } : item
      ),
    });
  },
  clearCart: () => set({ items: [] }),
  itemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
}));