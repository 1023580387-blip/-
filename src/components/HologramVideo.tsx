'use client';

// ========================================
// 全息发光视频卡片 - 通用复用组件
// 自动静音循环播放，透明叠加霓虹边框
// ========================================
import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';

interface HologramVideoProps {
  /** 视频源 URL */
  src: string;
  /** 封面图（可选） */
  poster?: string;
  /** 自定义类名 */
  className?: string;
  /** 视频标题 */
  title?: string;
  /** 是否显示标题 */
  showTitle?: boolean;
  /** 是否跟随鼠标光偏移 */
  followMouse?: boolean;
  /** 宽高比 */
  aspectRatio?: 'video' | 'square' | 'wide';
  /** 四角装饰 */
  corners?: boolean;
}

export default function HologramVideo({
  src,
  poster,
  className = '',
  title,
  showTitle = false,
  followMouse = false,
  aspectRatio = 'video',
  corners = true,
}: HologramVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const mouse = useMousePosition();

  const aspectClasses = {
    video: 'aspect-video',
    square: 'aspect-square',
    wide: 'aspect-[21/9]',
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => setIsLoaded(true);
    video.addEventListener('canplay', handleCanPlay);

    // 自动播放
    video.play().catch(() => {
      // 浏览器可能阻止自动播放，静默处理
    });

    return () => video.removeEventListener('canplay', handleCanPlay);
  }, [src]);

  return (
    <motion.div
      className={`relative overflow-hidden rounded-lg ${aspectClasses[aspectRatio]} ${className}`}
      style={
        followMouse
          ? {
              transform: `perspective(800px) rotateX(${mouse.normalizedY * -8}deg) rotateY(${mouse.normalizedX * 8}deg)`,
            }
          : undefined
      }
      transition={{ type: 'spring', damping: 30, stiffness: 200 }}
    >
      {/* 霓虹边框 */}
      <div className="absolute inset-0 rounded-lg border border-cyan-neon/20 pointer-events-none z-10"
        style={{ boxShadow: 'inset 0 0 30px rgba(0,240,255,0.05)' }}
      />

      {/* 四角装饰 */}
      {corners && (
        <>
          <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-cyan-neon/40 rounded-tl z-20" />
          <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-cyan-neon/40 rounded-tr z-20" />
          <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-cyan-neon/40 rounded-bl z-20" />
          <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-cyan-neon/40 rounded-br z-20" />
        </>
      )}

      {/* 视频元素 */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        autoPlay
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* 加载占位 */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-cyber-metal flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-cyan-neon/30 border-t-cyan-neon rounded-full animate-spin" />
        </div>
      )}

      {/* 霓虹扫描线叠加 */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to bottom, transparent 50%, rgba(0,240,255,0.03) 50%)',
          backgroundSize: '100% 4px',
        }}
        animate={{ backgroundPosition: ['0% 0%', '0% 100%'] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />

      {/* 标题 */}
      {showTitle && title && (
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent z-20">
          <span className="font-body text-sm text-cyan-neon tracking-wider"
            style={{ textShadow: '0 0 6px var(--neon-primary)' }}
          >
            {title}
          </span>
        </div>
      )}
    </motion.div>
  );
}