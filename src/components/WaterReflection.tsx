'use client';

// ========================================
// 积水反光地面 - 底部镜面反射 + 波纹扭曲
// ========================================
import { motion } from 'framer-motion';

interface WaterReflectionProps {
  /** 高度 */
  height?: string;
  /** 子元素 - 用于反射的内容 */
  children?: React.ReactNode;
}

export default function WaterReflection({
  height = '200px',
  children,
}: WaterReflectionProps) {
  return (
    <div className="relative" style={{ height }}>
      {/* 积水层 */}
      <div className="absolute inset-0 water-floor">
        {/* 波纹扭曲效果 */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,240,255,0.03) 3px, rgba(0,240,255,0.03) 6px)',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '0% 100%'],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* 反射内容（翻转） */}
      {children && (
        <div
          className="absolute inset-0 opacity-20"
          style={{
            transform: 'scaleY(-1)',
            filter: 'blur(4px)',
          }}
        >
          {children}
        </div>
      )}

      {/* 渐变遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
    </div>
  );
}