import { create } from "zustand";

interface RegionStore {
  region: string;
  setRegion: (code: string) => void;
}

export const useRegionStore = create<RegionStore>((set) => ({
  region: "GLOBAL",
  setRegion: (code: string) => set({ region: code }),
}));