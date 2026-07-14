import { create } from 'zustand';
import type { GalaxyState } from '@/utils/planetData';

interface GalaxyStore extends GalaxyState {
  setRotation: (rotation: { x: number; y: number }) => void;
  setZoom: (zoom: number) => void;
  setHoveredPlanet: (id: string | null) => void;
  setIsDragging: (isDragging: boolean) => void;
  setDragStart: (pos: { x: number; y: number }) => void;
}

export const useGalaxyStore = create<GalaxyStore>((set) => ({
  rotation: { x: 0, y: 0 },
  zoom: 1,
  hoveredPlanet: null,
  isDragging: false,
  dragStart: { x: 0, y: 0 },
  setRotation: (rotation) => set({ rotation }),
  setZoom: (zoom) => set({ zoom }),
  setHoveredPlanet: (id) => set({ hoveredPlanet: id }),
  setIsDragging: (isDragging) => set({ isDragging }),
  setDragStart: (pos) => set({ dragStart: pos }),
}));