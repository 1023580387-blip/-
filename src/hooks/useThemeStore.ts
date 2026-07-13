// ========================================
// Zustand 状态管理 - 主题切换 & 加载状态
// ========================================
import { create } from 'zustand';
import { THEMES } from '@/utils/constants';

interface Theme {
  name: string;
  className: string;
  primary: string;
  secondary: string;
  accent: string;
  glow: string;
}

interface AppStore {
  // 加载状态
  isLoading: boolean;
  setLoading: (loading: boolean) => void;

  // 当前主题索引 (0: 电光青, 1: 洋红, 2: 紫罗兰)
  themeIndex: number;
  setThemeIndex: (index: number) => void;
  currentTheme: Theme;

  // 导航展开状态
  isNavOpen: boolean;
  setNavOpen: (open: boolean) => void;
}

export const useThemeStore = create<AppStore>((set) => ({
  isLoading: true,
  setLoading: (loading) => set({ isLoading: loading }),

  themeIndex: 0,
  setThemeIndex: (index) => {
    const clampedIndex = Math.max(0, Math.min(index, THEMES.length - 1));
    set({ themeIndex: clampedIndex, currentTheme: THEMES[clampedIndex] });
  },
  currentTheme: THEMES[0],

  isNavOpen: false,
  setNavOpen: (open) => set({ isNavOpen: open }),
}));