import { create } from 'zustand';

interface AppState {
  isAdminLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;

  isCGPlaying: boolean;
  setCGPlaying: (playing: boolean) => void;

  hiddenClickCount: number;
  incrementHiddenClick: () => void;
  resetHiddenClick: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  isAdminLoggedIn: false,
  login: (username, password) => {
    if (username === '42847' && password === 'time0926') {
      set({ isAdminLoggedIn: true });
      return true;
    }
    return false;
  },
  logout: () => set({ isAdminLoggedIn: false }),

  isCGPlaying: false,
  setCGPlaying: (playing) => set({ isCGPlaying: playing }),

  hiddenClickCount: 0,
  incrementHiddenClick: () => set((state) => ({
    hiddenClickCount: state.hiddenClickCount + 1
  })),
  resetHiddenClick: () => set({ hiddenClickCount: 0 }),
}));
