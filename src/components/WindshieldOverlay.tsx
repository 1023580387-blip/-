'use client';

// ========================================
// 首页雨夜挡风玻璃遮罩层
// 玻璃持续缓慢晃动模拟行驶，表面雨水持续滑落
// 所有页面内容透过带雨滴的玻璃展示
// ========================================
import { useMemo } from 'react';
import { motion } from 'framer-motion';

// 生成挡风玻璃上的雨滴
function generateWindshieldRaindrops(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: `${2 + Math.random() * 4}px`,
    slideDuration: `${1 + Math.random() * 3}s`,
    delay: `${Math.random() * 5}s`,
    opacity: 0.3 + Math.random() * 0.5,
  }));
}

export default function WindshieldOverlay() {
  const raindrops = useMemo(() => generateWindshieldRaindrops(60), []);

  return (
    <motion.div
      className="absolute inset-0 z-30 pointer-events-none"
      animate={{
        rotate: [0, 0.3, -0.2, 0.1, 0],
        x: [0, 2, -1, 3, 0],
        y: [0, 1, -2, 1, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {/* 玻璃基底 - 带雨滴半透明效果 */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-neon/5 via-transparent to-magenta-neon/5" />

      {/* 挡风玻璃边框 */}
      <div className="absolute inset-2 border border-cyan-neon/10 rounded-3xl" />

      {/* 玻璃反光条纹 */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(0,240,255,0.03) 0%, transparent 40%, transparent 60%, rgba(255,0,255,0.03) 100%)',
        }}
      />

      {/* 雨水滑落粒子 */}
      {raindrops.map((drop) => (
        <motion.div
          key={drop.id}
          className="absolute rounded-full"
          style={{
            left: drop.left,
            top: drop.top,
            width: drop.size,
            height: drop.size,
            background: 'rgba(0, 240, 255, 0.6)',
            boxShadow: '0 0 3px rgba(0, 240, 255, 0.4)',
            opacity: drop.opacity,
          }}
          animate={{
            y: ['0px', '80px'],
            opacity: [drop.opacity, 0],
          }}
          transition={{
            duration: parseFloat(drop.slideDuration),
            delay: parseFloat(drop.delay),
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* 水珠流动轨迹 */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`trail-${i}`}
          className="absolute w-[1px]"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: '-5%',
            height: `${20 + Math.random() * 40}px`,
            background: 'linear-gradient(to bottom, transparent, rgba(0,240,255,0.3))',
          }}
          animate={{
            y: ['0vh', '110vh'],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            delay: Math.random() * 4,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* 玻璃边缘雾化 */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow: 'inset 0 0 100px rgba(0, 0, 0, 0.3)',
        }}
      />
    </motion.div>
  );
}