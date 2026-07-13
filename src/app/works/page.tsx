'use client';

// ========================================
// 合作案例展示页 /works
// 不规则错落网格玻璃案例卡片 + 悬浮放大 + 无限滚动加载
// ========================================
import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useThemeStore } from '@/hooks/useThemeStore';
import { WORK_CASES } from '@/utils/constants';
import RainParticles from '@/components/RainParticles';
import HologramVideo from '@/components/HologramVideo';
import GlassContainer from '@/components/GlassContainer';
import NeonScanLine from '@/components/NeonScanLine';
import PageTransition from '@/components/PageTransition';

// 案例卡片组件
function WorkCard({
  work,
  index,
}: {
  work: (typeof WORK_CASES)[0];
  index: number;
}) {
  // 不同高度模拟高低分层
  const heightVariants = ['h-[320px]', 'h-[380px]', 'h-[280px]', 'h-[360px]'];

  return (
    <motion.div
      className={`${heightVariants[index % 4]} group`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileHover={{ scale: 1.05, zIndex: 20 }}
    >
      <GlassContainer float={false} className="h-full flex flex-col">
        {/* 视频区域 */}
        <div className="flex-1 p-3 pb-0 overflow-hidden">
          <HologramVideo
            src={work.videoUrl}
            aspectRatio="video"
            corners={false}
          />
        </div>

        {/* 信息区域 */}
        <div className="p-4">
          <span className="font-body text-[10px] tracking-[0.15em] uppercase"
            style={{ color: 'var(--neon-secondary)' }}
          >
            {work.category}
          </span>
          <h3 className="font-display text-sm tracking-wider mt-1 text-white/80 group-hover:text-white transition-colors">
            {work.title}
          </h3>
        </div>

        {/* 悬浮时霓虹边框高亮 */}
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            border: '1px solid var(--neon-primary)',
            boxShadow: '0 0 20px var(--neon-primary), inset 0 0 20px rgba(0,240,255,0.05)',
          }}
        />

        {/* 底部旋转彩色粒子（悬浮时） */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.div
            className="w-32 h-[1px]"
            style={{
              background: 'linear-gradient(to right, transparent, var(--neon-primary), var(--neon-secondary), transparent)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </GlassContainer>
    </motion.div>
  );
}

export default function WorksPage() {
  const { currentTheme } = useThemeStore();
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  // 无限滚动加载
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
      if (scrollHeight - scrollTop - clientHeight < 200 && !isLoading && visibleCount < WORK_CASES.length) {
        setIsLoading(true);
        setTimeout(() => {
          setVisibleCount((prev) => Math.min(prev + 2, WORK_CASES.length));
          setIsLoading(false);
        }, 500);
      }
    },
    [isLoading, visibleCount]
  );

  return (
    <PageTransition className={`relative min-h-screen overflow-hidden ${currentTheme.className}`}>
      {/* 雨幕粒子 */}
      <RainParticles density="medium" scanLines circuitBoard />

      <NeonScanLine direction="horizontal" duration={3} />
      <NeonScanLine direction="vertical" color="var(--neon-secondary)" thickness={1} duration={5} />

      {/* 页面标题 */}
      <div className="relative z-10 pt-20 pb-8 text-center">
        <motion.h1
          className="font-display text-4xl md:text-6xl font-bold tracking-[0.15em] neon-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          WORKS
        </motion.h1>
        <motion.p
          className="font-body text-sm text-cyan-neon/50 tracking-[0.2em] mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          合作案例展示 · 向下滚动加载更多
        </motion.p>
      </div>

      {/* 案例网格 */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-4 pb-32 h-[calc(100vh-200px)] overflow-y-auto"
        onScroll={handleScroll}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WORK_CASES.slice(0, visibleCount).map((work, index) => (
            <WorkCard key={work.id} work={work} index={index} />
          ))}
        </div>

        {/* 加载指示器 */}
        {isLoading && (
          <div className="flex justify-center py-8">
            <motion.div
              className="w-8 h-8 border-2 border-cyan-neon/30 border-t-cyan-neon rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        )}
      </div>
    </PageTransition>
  );
}