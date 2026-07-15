'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, VolumeX, Maximize2 } from 'lucide-react';

interface CgHoloWindowProps {
  prompt: string;
  aspectRatio?: '16:9' | '4:3' | '1:1';
  size?: 'full' | 'large' | 'medium' | 'small';
  className?: string;
  showControls?: boolean;
}

export default function CgHoloWindow({
  prompt,
  aspectRatio = '16:9',
  size = 'medium',
  className = '',
  showControls = true,
}: CgHoloWindowProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const aspectClasses = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square',
  };

  const sizeClasses = {
    full: 'w-full',
    large: 'w-full max-w-4xl',
    medium: 'w-full max-w-2xl',
    small: 'w-full max-w-sm',
  };

  const imageUrl = `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=${size === 'full' ? 'landscape_16_9' : 'landscape_4_3'}`;

  return (
    <motion.div
      className={`cg-container ${aspectClasses[aspectRatio]} ${sizeClasses[size]} ${className} relative group`}
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* 四角铆钉 */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-haavk-silver/30 z-10" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-haavk-silver/30 z-10" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-haavk-silver/30 z-10" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-haavk-silver/30 z-10" />

      {/* 全息扫描线 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-haavk-ice/30 to-transparent animate-scan-line" />
      </div>

      {/* CG 图像 */}
      <div className="absolute inset-0 bg-haavk-graphite flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt="CG Scene"
          className={`w-full h-full object-cover transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-haavk-ice/30 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* 全息遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-haavk-carbon/10 to-haavk-carbon/30 pointer-events-none z-[3]" />

      {/* 控制栏 */}
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-haavk-carbon/70 backdrop-blur-sm border-t border-haavk-border/20 flex items-center justify-between px-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-6 h-6 flex items-center justify-center text-haavk-silver/60 hover:text-haavk-ice transition-colors"
            >
              <Play size={14} />
            </button>
            <div className="flex-1 h-[2px] bg-haavk-border/30 rounded">
              <div className="w-1/3 h-full bg-haavk-ice/40 rounded" />
            </div>
            <span className="time-font text-[9px] text-haavk-platinum/50">LIVE</span>
          </div>
          <div className="flex items-center gap-2">
            <VolumeX size={12} className="text-haavk-platinum/40" />
            <Maximize2 size={12} className="text-haavk-platinum/40 hover:text-haavk-ice cursor-pointer transition-colors" />
          </div>
        </div>
      )}

      {/* HUD 标签 */}
      <div className="absolute top-3 left-3 z-20">
        <span className="time-font text-[9px] text-haavk-ice/50 tracking-[0.2em] bg-haavk-carbon/60 px-2 py-0.5">
          HAAVK·CG·LIVE
        </span>
      </div>
    </motion.div>
  );
}