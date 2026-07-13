'use client';

// ========================================
// 全屏雨幕粒子背景 - 通用复用组件
// 无限循环雨幕下落粒子 + 横向/纵向霓虹扫描流光
// ========================================
import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface RainParticlesProps {
  /** 雨滴密度: low | medium | high */
  density?: 'low' | 'medium' | 'high';
  /** 是否显示扫描线 */
  scanLines?: boolean;
  /** 是否显示电路板底层纹理 */
  circuitBoard?: boolean;
}

// 雨滴粒子配置
const DENSITY_MAP = {
  low: 40,
  medium: 80,
  high: 150,
};

// 生成随机雨滴参数
function generateRaindrops(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDuration: `${0.5 + Math.random() * 1.5}s`,
    animationDelay: `${Math.random() * 3}s`,
    height: `${10 + Math.random() * 20}px`,
    opacity: 0.1 + Math.random() * 0.4,
  }));
}

export default function RainParticles({
  density = 'medium',
  scanLines = true,
  circuitBoard = false,
}: RainParticlesProps) {
  const raindrops = useMemo(() => generateRaindrops(DENSITY_MAP[density]), [density]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* 电路板底层纹理 */}
      {circuitBoard && (
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(var(--neon-primary) 1px, transparent 1px),
                linear-gradient(90deg, var(--neon-primary) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />
        </div>
      )}

      {/* 雨幕粒子 */}
      {raindrops.map((drop) => (
        <motion.div
          key={drop.id}
          className="absolute w-[1px] rounded-full"
          style={{
            left: drop.left,
            top: '-5%',
            height: drop.height,
            background: `linear-gradient(to bottom, transparent, var(--neon-primary))`,
            opacity: drop.opacity,
            boxShadow: `0 0 3px var(--neon-primary)`,
          }}
          animate={{
            y: ['0vh', '105vh'],
            opacity: [0, drop.opacity, drop.opacity, 0],
          }}
          transition={{
            duration: parseFloat(drop.animationDuration),
            delay: parseFloat(drop.animationDelay),
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* 横向霓虹扫描线 */}
      {scanLines && (
        <>
          <motion.div
            className="absolute left-0 w-full h-[2px]"
            style={{
              background: 'linear-gradient(to right, transparent, var(--neon-primary), transparent)',
              boxShadow: '0 0 10px var(--neon-primary)',
            }}
            animate={{ top: ['-2%', '102%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
          {/* 第二道扫描线，错开时间 */}
          <motion.div
            className="absolute left-0 w-full h-[1px]"
            style={{
              background: 'linear-gradient(to right, transparent, var(--neon-secondary), transparent)',
              boxShadow: '0 0 6px var(--neon-secondary)',
            }}
            animate={{ top: ['102%', '-2%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear', delay: 2 }}
          />
        </>
      )}

      {/* 纵向数据流光带 */}
      <motion.div
        className="absolute top-0 w-[2px] h-full"
        style={{
          left: '30%',
          background: 'linear-gradient(to bottom, transparent, var(--neon-accent), transparent)',
          boxShadow: '0 0 15px var(--neon-accent)',
          opacity: 0.3,
        }}
        animate={{ left: ['30%', '70%', '30%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* 细碎发光光点 */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-[2px] h-[2px] rounded-full"
          style={{
            left: `${20 + Math.random() * 60}%`,
            background: 'var(--neon-primary)',
            boxShadow: '0 0 6px var(--neon-primary)',
          }}
          animate={{
            y: ['100vh', '-10vh'],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 5,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}