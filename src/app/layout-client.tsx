'use client';

// ========================================
// 客户端布局组件 - 加载动画 + 导航
// ========================================
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import LoadingScreen from '@/components/LoadingScreen';
import CyberNav from '@/components/CyberNav';
import { useThemeStore } from '@/hooks/useThemeStore';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isLoading, currentTheme } = useThemeStore();

  return (
    <div className={currentTheme.className}>
      {/* 全局加载动画 */}
      {isLoading && <LoadingScreen />}

      {/* 加载完成后显示主内容 */}
      {!isLoading && (
        <>
          {/* 右侧悬浮导航 */}
          <CyberNav />

          {/* 页面切换动画 */}
          <AnimatePresence mode="wait">
            <main key={pathname}>{children}</main>
          </AnimatePresence>
        </>
      )}
    </div>
  );
}