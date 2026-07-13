'use client';

// ========================================
// 产品展厅页 /products
// 横向拖拽滚动金属玻璃产品展墙 + 全息视频卡片
// ========================================
import { useRef, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { PRODUCTS } from '@/utils/constants';
import { useMousePosition } from '@/hooks/useMousePosition';
import RainParticles from '@/components/RainParticles';
import HologramVideo from '@/components/HologramVideo';
import GlassContainer from '@/components/GlassContainer';
import NeonScanLine from '@/components/NeonScanLine';
import WaterReflection from '@/components/WaterReflection';
import PageTransition from '@/components/PageTransition';
import { useThemeStore } from '@/hooks/useThemeStore';

// 产品卡片组件
function ProductCard({
  product,
  index,
}: {
  product: (typeof PRODUCTS)[0];
  index: number;
}) {
  const mouse = useMousePosition();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="flex-shrink-0 w-[320px] md:w-[380px]"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.03 }}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${mouse.normalizedY * -10}deg) rotateY(${mouse.normalizedX * 10}deg)`
          : 'none',
      }}
    >
      <GlassContainer float floatDelay={index * 0.3}>
        <div className="p-3">
          <HologramVideo src={product.videoUrl} aspectRatio="video" />
        </div>
        <div className="p-4 pt-0">
          <h3
            className="font-display text-lg tracking-wider mb-1"
            style={{
              color: 'var(--neon-primary)',
              textShadow: '0 0 6px var(--neon-primary)',
            }}
          >
            {product.name}
          </h3>
          <p className="font-body text-sm text-gray-400 tracking-wide">
            {product.description}
          </p>
        </div>
      </GlassContainer>
    </motion.div>
  );
}

export default function ProductsPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { currentTheme } = useThemeStore();
  const x = useMotionValue(0);

  // 横向拖拽滚动
  const handleDrag = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number } }
  ) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= info.offset.x;
    }
  };

  return (
    <PageTransition className={`relative min-h-screen overflow-hidden ${currentTheme.className}`}>
      {/* 雨幕粒子背景 */}
      <RainParticles density="medium" scanLines circuitBoard />

      {/* 扫描线 */}
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
          PRODUCTS
        </motion.h1>
        <motion.p
          className="font-body text-sm text-cyan-neon/50 tracking-[0.2em] mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          横向拖拽浏览 · 产品展墙
        </motion.p>
      </div>

      {/* 横向拖拽产品展墙 */}
      <motion.div
        ref={scrollRef}
        className="relative z-10 flex gap-6 px-8 pb-16 overflow-x-auto cursor-grab active:cursor-grabbing scrollbar-hide"
        drag="x"
        dragConstraints={{ left: -(PRODUCTS.length * 340), right: 0 }}
        onDrag={handleDrag}
        style={{ x }}
        whileTap={{ cursor: 'grabbing' }}
      >
        {/* 左侧引导 */}
        <div className="flex-shrink-0 w-8" />

        {PRODUCTS.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}

        {/* 右侧留白 */}
        <div className="flex-shrink-0 w-8" />
      </motion.div>

      {/* 底部积水反射 */}
      <div className="absolute bottom-0 left-0 right-0 h-40 z-10">
        <WaterReflection height="100%" />
      </div>
    </PageTransition>
  );
}