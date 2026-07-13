import { create } from "zustand";

interface AppState {
  currentScene: number;
  isPreloading: boolean;
  isTransitioning: boolean;
  setScene: (scene: number) => void;
  finishPreloading: () => void;
  setTransitioning: (val: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentScene: 0,
  isPreloading: true,
  isTransitioning: false,
  setScene: (scene: number) => set({ currentScene: scene }),
  finishPreloading: () => set({ isPreloading: false }),
  setTransitioning: (val: boolean) => set({ isTransitioning: val }),
}));