'use client';

// ========================================
// 算力机房展厅页 /compute
// 巨型纵深阶梯式金属玻璃空间 + 全息大屏墙 + 视差偏移
// ========================================
import { motion } from 'framer-motion';
import { useThemeStore } from '@/hooks/useThemeStore';
import { useMousePosition } from '@/hooks/useMousePosition';
import { HOLOGRAM_VIDEOS } from '@/utils/constants';
import RainParticles from '@/components/RainParticles';
import HologramVideo from '@/components/HologramVideo';
import GlassContainer from '@/components/GlassContainer';
import NeonScanLine from '@/components/NeonScanLine';
import WaterReflection from '@/components/WaterReflection';
import PageTransition from '@/components/PageTransition';

// 主屏视频墙数据
const SCREEN_VIDEOS = [
  { id: 's1', src: HOLOGRAM_VIDEOS.hero[0].url, col: '1 / 3', row: '1 / 3' },
  { id: 's2', src: HOLOGRAM_VIDEOS.hero[1].url, col: '3 / 4', row: '1 / 2' },
  { id: 's3', src: HOLOGRAM_VIDEOS.hero[2].url, col: '3 / 4', row: '2 / 3' },
  { id: 's4', src: HOLOGRAM_VIDEOS.hero[3].url, col: '1 / 2', row: '3 / 4' },
  { id: 's5', src: HOLOGRAM_VIDEOS.hero[0].url, col: '2 / 3', row: '3 / 4' },
  { id: 's6', src: HOLOGRAM_VIDEOS.hero[1].url, col: '3 / 4', row: '3 / 4' },
];

// 阶梯玻璃层
function TierGlass({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  const mouse = useMousePosition();
  const depth = 0.5 + index * 0.3;

  return (
    <motion.div
      className="relative"
      style={{
        x: mouse.normalizedX * 20 * depth,
        y: mouse.normalizedY * 15 * depth,
        zIndex: 10 - index,
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
    >
      {children}
    </motion.div>
  );
}

export default function ComputePage() {
  const { currentTheme } = useThemeStore();

  return (
    <PageTransition className={`relative min-h-screen overflow-hidden ${currentTheme.className}`}>
      {/* 雨幕粒子背景 */}
      <RainParticles density="medium" scanLines circuitBoard />

      {/* 垂直数据流光带 */}
      <NeonScanLine direction="vertical" color="var(--neon-accent)" thickness={2} duration={4} />
      <NeonScanLine direction="vertical" color="var(--neon-primary)" thickness={1} duration={6} />
      <NeonScanLine direction="horizontal" duration={3} />

      {/* 页面标题 */}
      <div className="relative z-10 pt-20 pb-8 text-center">
        <motion.h1
          className="font-display text-4xl md:text-6xl font-bold tracking-[0.15em] neon-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          COMPUTE
        </motion.h1>
        <motion.p
          className="font-body text-sm text-cyan-neon/50 tracking-[0.2em] mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          量子算力中心 · 移动鼠标探索深度
        </motion.p>
      </div>

      {/* 纵深阶梯空间 */}
      <div className="relative z-10 px-4 pb-32">
        <TierGlass index={0}>
          <GlassContainer className="max-w-6xl mx-auto mb-6" followMouse parallaxStrength={0.03}>
            <div className="grid grid-cols-3 gap-3 p-4">
              {SCREEN_VIDEOS.map((v) => (
                <div
                  key={v.id}
                  style={{ gridColumn: v.col, gridRow: v.row }}
                  className="min-h-[120px]"
                >
                  <HologramVideo src={v.src} aspectRatio="video" />
                </div>
              ))}
            </div>
          </GlassContainer>
        </TierGlass>

        {/* 第二层 - 稍小的玻璃面板 */}
        <TierGlass index={1}>
          <GlassContainer className="max-w-4xl mx-auto mb-6" followMouse parallaxStrength={0.02}>
            <div className="p-6 text-center">
              <p className="font-body text-lg text-cyan-neon/60 tracking-wider">
                NEURAL CORE · 每秒 10^18 次浮点运算
              </p>
              <div className="mt-4 h-[1px] bg-gradient-to-r from-transparent via-cyan-neon/30 to-transparent" />
              <div className="grid grid-cols-3 gap-4 mt-4 text-center">
                {['量子纠缠', '光子互联', '低温超导'].map((label) => (
                  <div key={label} className="font-display text-xs text-cyan-neon/40 tracking-widest">
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </GlassContainer>
        </TierGlass>

        {/* 第三层 - 最远 */}
        <TierGlass index={2}>
          <GlassContainer className="max-w-3xl mx-auto" followMouse parallaxStrength={0.01}>
            <div className="p-6 text-center">
              <div className="flex items-center justify-center gap-8">
                {['UPLINK', 'SYNC', 'DEPLOY'].map((label) => (
                  <span
                    key={label}
                    className="font-display text-xs text-cyan-neon/30 tracking-[0.2em]"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </GlassContainer>
        </TierGlass>
      </div>

      {/* 底部积水反射 */}
      <div className="absolute bottom-0 left-0 right-0 h-64 z-10">
        <WaterReflection height="100%" />
      </div>
    </PageTransition>
  );
}