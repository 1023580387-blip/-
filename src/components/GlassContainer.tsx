'use client';

// ========================================
// 赛博金属玻璃容器 - 通用复用组件
// 带霓虹发光边框、金属镂空纹理、呼吸发光效果
// ========================================
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useMousePosition } from '@/hooks/useMousePosition';

interface GlassContainerProps {
  children: ReactNode;
  className?: string;
  /** 是否启用鼠标光跟随效果 */
  followMouse?: boolean;
  /** 视差偏移强度 (0-1) */
  parallaxStrength?: number;
  /** 呼吸浮动动画 */
  float?: boolean;
  /** 自定义浮动延迟 */
  floatDelay?: number;
}

export default function GlassContainer({
  children,
  className = '',
  followMouse = false,
  parallaxStrength = 0.02,
  float = true,
  floatDelay = 0,
}: GlassContainerProps) {
  const mouse = useMousePosition();

  return (
    <motion.div
      className={`relative glass-panel overflow-hidden ${className}`}
      animate={
        followMouse
          ? {
              x: mouse.normalizedX * parallaxStrength * 50,
              y: mouse.normalizedY * parallaxStrength * 30,
            }
          : float
          ? {
              y: [0, -6, 0],
              boxShadow: [
                '0 0 10px rgba(0,240,255,0.05), inset 0 0 20px rgba(0,240,255,0.02)',
                '0 0 20px rgba(0,240,255,0.1), inset 0 0 30px rgba(0,240,255,0.04)',
                '0 0 10px rgba(0,240,255,0.05), inset 0 0 20px rgba(0,240,255,0.02)',
              ],
            }
          : {}
      }
      transition={
        followMouse
          ? { type: 'spring', damping: 30, stiffness: 200 }
          : {
              y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: floatDelay },
              boxShadow: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: floatDelay },
            }
      }
      style={
        followMouse
          ? {
              transform: `perspective(1000px) rotateX(${mouse.normalizedY * -5}deg) rotateY(${mouse.normalizedX * 5}deg)`,
            }
          : undefined
      }
    >
      {/* 顶部金属边框装饰线 */}
      <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-cyan-neon/20 to-transparent" />

      {/* 四角镂空金属装饰 */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-cyan-neon/20" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-cyan-neon/20" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-cyan-neon/20" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-cyan-neon/20" />

      {/* 霓虹扫描线 */}
      <motion.div
        className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-neon/40 to-transparent"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />

      {children}
    </motion.div>
  );
}