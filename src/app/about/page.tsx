'use client';

// ========================================
// 品牌发展时间轴页 /about
// 纵向电路板纹理玻璃时间轴 + 滚动渐显动画
// ========================================
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useThemeStore } from '@/hooks/useThemeStore';
import { TIMELINE_NODES } from '@/utils/constants';
import RainParticles from '@/components/RainParticles';
import HologramVideo from '@/components/HologramVideo';
import GlassContainer from '@/components/GlassContainer';
import NeonScanLine from '@/components/NeonScanLine';
import PageTransition from '@/components/PageTransition';

// 时间轴节点组件
function TimelineNodeCard({
  node,
  index,
}: {
  node: (typeof TIMELINE_NODES)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className={`flex items-center gap-8 mb-16 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1 }}
    >
      {/* 时间轴节点 · 中心线 */}
      <div className="hidden md:flex flex-1 justify-end">
        {isLeft && (
          <GlassContainer className="w-[340px]" float floatDelay={index * 0.2}>
            <div className="p-3">
              <HologramVideo src={node.videoUrl} aspectRatio="video" />
            </div>
            <div className="px-4 pb-4">
              <span
                className="font-display text-2xl font-bold tracking-wider"
                style={{
                  color: 'var(--neon-primary)',
                  textShadow: '0 0 8px var(--neon-primary)',
                }}
              >
                {node.year}
              </span>
              <h3 className="font-display text-sm tracking-wider mt-1 text-white/80">
                {node.title}
              </h3>
              <p className="font-body text-xs text-gray-400 mt-2 tracking-wide">
                {node.description}
              </p>
            </div>
          </GlassContainer>
        )}
      </div>

      {/* 中心节点 */}
      <div className="relative flex-shrink-0">
        <div
          className="w-4 h-4 rounded-full"
          style={{
            background: 'var(--neon-primary)',
            boxShadow: '0 0 15px var(--neon-primary), 0 0 30px var(--neon-primary)',
          }}
        />
        {/* 霓虹线条 */}
        <motion.div
          className="absolute top-1/2 w-8 h-[1px]"
          style={{
            background: 'var(--neon-primary)',
            boxShadow: '0 0 8px var(--neon-primary)',
            [isLeft ? 'right' : 'left']: '100%',
          }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
      </div>

      {/* 移动端卡片 */}
      <div className="flex-1 md:hidden">
        <GlassContainer float floatDelay={index * 0.2}>
          <div className="p-3">
            <HologramVideo src={node.videoUrl} aspectRatio="video" />
          </div>
          <div className="px-4 pb-4">
            <span
              className="font-display text-xl font-bold tracking-wider"
              style={{
                color: 'var(--neon-primary)',
                textShadow: '0 0 8px var(--neon-primary)',
              }}
            >
              {node.year}
            </span>
            <h3 className="font-display text-sm tracking-wider mt-1 text-white/80">
              {node.title}
            </h3>
            <p className="font-body text-xs text-gray-400 mt-2 tracking-wide">
              {node.description}
            </p>
          </div>
        </GlassContainer>
      </div>

      {/* 右侧卡片 */}
      <div className="hidden md:flex flex-1 justify-start">
        {!isLeft && (
          <GlassContainer className="w-[340px]" float floatDelay={index * 0.2}>
            <div className="p-3">
              <HologramVideo src={node.videoUrl} aspectRatio="video" />
            </div>
            <div className="px-4 pb-4">
              <span
                className="font-display text-2xl font-bold tracking-wider"
                style={{
                  color: 'var(--neon-primary)',
                  textShadow: '0 0 8px var(--neon-primary)',
                }}
              >
                {node.year}
              </span>
              <h3 className="font-display text-sm tracking-wider mt-1 text-white/80">
                {node.title}
              </h3>
              <p className="font-body text-xs text-gray-400 mt-2 tracking-wide">
                {node.description}
              </p>
            </div>
          </GlassContainer>
        )}
      </div>
    </motion.div>
  );
}

export default function AboutPage() {
  const { currentTheme } = useThemeStore();

  return (
    <PageTransition className={`relative min-h-screen overflow-hidden ${currentTheme.className}`}>
      {/* 慢速细雨粒子 */}
      <RainParticles density="low" scanLines circuitBoard />

      {/* 扫描线 */}
      <NeonScanLine direction="horizontal" duration={5} />

      {/* 页面标题 */}
      <div className="relative z-10 pt-20 pb-12 text-center">
        <motion.h1
          className="font-display text-4xl md:text-6xl font-bold tracking-[0.15em] neon-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          ABOUT
        </motion.h1>
        <motion.p
          className="font-body text-sm text-cyan-neon/50 tracking-[0.2em] mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          品牌发展时间轴 · 向下滚动探索
        </motion.p>
      </div>

      {/* 时间轴 */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 pb-32">
        {/* 中心线 */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] hidden md:block"
          style={{
            background: 'linear-gradient(to bottom, transparent, var(--neon-primary), var(--neon-accent), transparent)',
            boxShadow: '0 0 10px var(--neon-primary)',
          }}
        />

        {TIMELINE_NODES.map((node, index) => (
          <TimelineNodeCard key={node.year} node={node} index={index} />
        ))}
      </div>
    </PageTransition>
  );
}