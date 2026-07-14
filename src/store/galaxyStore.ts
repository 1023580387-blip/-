import { create } from 'zustand';
import { Planet, CanvasState } from '@/types';

interface GalaxyStore extends CanvasState {
  setScale: (scale: number) => void;
  setOffset: (x: number, y: number) => void;
  setSelectedPlanet: (planet: Planet | null) => void;
  setHoveredPlanet: (planet: Planet | null) => void;
  reset: () => void;
}

const initialState: CanvasState = {
  scale: 1,
  offsetX: 0,
  offsetY: 0,
  selectedPlanet: null,
  hoveredPlanet: null,
};

export const useGalaxyStore = create<GalaxyStore>((set) => ({
  ...initialState,
  
  setScale: (scale) => set({ scale: Math.max(0.5, Math.min(2, scale)) }),
  
  setOffset: (x, y) => set({ offsetX: x, offsetY: y }),
  
  setSelectedPlanet: (planet) => set({ selectedPlanet: planet }),
  
  setHoveredPlanet: (planet) => set({ hoveredPlanet: planet }),
  
  reset: () => set(initialState),
}));
