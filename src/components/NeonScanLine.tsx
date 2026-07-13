'use client';

// ========================================
// 霓虹扫描流光带 - 横向/纵向扫描线
// ========================================
import { motion } from 'framer-motion';

interface NeonScanLineProps {
  /** 方向 */
  direction?: 'horizontal' | 'vertical';
  /** 颜色 */
  color?: string;
  /** 宽度 */
  thickness?: number;
  /** 动画时长（秒） */
  duration?: number;
}

export default function NeonScanLine({
  direction = 'horizontal',
  color = 'var(--neon-primary)',
  thickness = 2,
  duration = 3,
}: NeonScanLineProps) {
  const isHorizontal = direction === 'horizontal';

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        [isHorizontal ? 'width' : 'height']: '100%',
        [isHorizontal ? 'height' : 'width']: `${thickness}px`,
        [isHorizontal ? 'left' : 'top']: 0,
        background: isHorizontal
          ? `linear-gradient(to right, transparent, ${color}, transparent)`
          : `linear-gradient(to bottom, transparent, ${color}, transparent)`,
        boxShadow: `0 0 ${thickness * 5}px ${color}`,
      }}
      animate={{
        [isHorizontal ? 'top' : 'left']: isHorizontal ? ['-2%', '102%'] : ['-2%', '102%'],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
}