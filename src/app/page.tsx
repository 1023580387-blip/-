'use client';

// ========================================
// 首页 / - 赛博都市主视觉页
// 雨夜挡风玻璃遮罩 + 多层霓虹玻璃 + 全息视频 + 主题切换
// ========================================
import { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useThemeStore } from '@/hooks/useThemeStore';
import { THEMES, HOLOGRAM_VIDEOS } from '@/utils/constants';
import RainParticles from '@/components/RainParticles';
import WindshieldOverlay from '@/components/WindshieldOverlay';
import HologramVideo from '@/components/HologramVideo';
import GlassContainer from '@/components/GlassContainer';
import NeonScanLine from '@/components/NeonScanLine';
import WaterReflection from '@/components/WaterReflection';
import PageTransition from '@/components/PageTransition';

export default function HomePage() {
  const { themeIndex, setThemeIndex, currentTheme } = useThemeStore();

  // 滚轮/方向键切换主题
  const handleThemeSwitch = useCallback(
    (e: WheelEvent | KeyboardEvent) => {
      if (e instanceof WheelEvent) {
        if (e.deltaY > 0) {
          setThemeIndex(themeIndex + 1);
        } else if (e.deltaY < 0) {
          setThemeIndex(themeIndex - 1);
        }
      } else if (e instanceof KeyboardEvent) {
        if (e.key === 'ArrowDown') {
          setThemeIndex(themeIndex + 1);
        } else if (e.key === 'ArrowUp') {
          setThemeIndex(themeIndex - 1);
        }
      }
    },
    [themeIndex, setThemeIndex]
  );

  useEffect(() => {
    window.addEventListener('wheel', handleThemeSwitch);
    window.addEventListener('keydown', handleThemeSwitch);
    return () => {
      window.removeEventListener('wheel', handleThemeSwitch);
      window.removeEventListener('keydown', handleThemeSwitch);
    };
  }, [handleThemeSwitch]);

  return (
    <PageTransition className={`relative min-h-screen overflow-hidden ${currentTheme.className}`}>
      {/* 雨幕粒子背景 */}
      <RainParticles density="high" scanLines circuitBoard />

      {/* 横向扫描霓虹数据流光带 */}
      <NeonScanLine direction="horizontal" duration={2.5} />
      <NeonScanLine direction="horizontal" color="var(--neon-secondary)" thickness={1} duration={4} />

      {/* 主内容区 */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16">
        {/* 品牌标题 */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.2em] mb-4">
            <span className="neon-text">MAISON</span>
            <br />
            <span className="neon-text" style={{ color: 'var(--neon-secondary)', textShadow: '0 0 7px var(--neon-secondary), 0 0 10px var(--neon-secondary), 0 0 21px var(--neon-secondary)' }}>
              ÉCLAT
            </span>
          </h1>
          <motion.p
            className="font-body text-lg md:text-xl text-cyan-neon/60 tracking-[0.3em]"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            量子未来 · 赛博纪元
          </motion.p>
        </motion.div>

        {/* 全息视频网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mb-12">
          {HOLOGRAM_VIDEOS.hero.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 + index * 0.2 }}
            >
              <GlassContainer float floatDelay={index * 0.5} followMouse>
                <HologramVideo
                  src={video.url}
                  title={video.title}
                  showTitle
                  followMouse
                />
              </GlassContainer>
            </motion.div>
          ))}
        </div>

        {/* 主题指示器 */}
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          {THEMES.map((theme, index) => (
            <div
              key={theme.name}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                index === themeIndex
                  ? 'scale-150 shadow-[0_0_10px_var(--neon-primary)]'
                  : 'opacity-30'
              }`}
              style={{ background: theme.primary }}
            />
          ))}
          <span className="font-body text-xs text-cyan-neon/40 tracking-wider ml-2">
            滚轮切换主题
          </span>
        </motion.div>

        {/* 底部品牌标语 */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <p className="font-body text-sm text-cyan-neon/30 tracking-[0.2em]">
            {currentTheme.name} · CYBERPUNK 2077
          </p>
        </motion.div>
      </div>

      {/* 底部积水反射 */}
      <div className="absolute bottom-0 left-0 right-0 h-48 z-10">
        <WaterReflection height="100%">
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-neon/5 to-transparent" />
        </WaterReflection>
      </div>

      {/* 挡风玻璃遮罩 - 最上层 */}
      <WindshieldOverlay />
    </PageTransition>
  );
}