'use client';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCw, ZoomIn } from 'lucide-react';

interface Equipment360ViewerProps {
  name: string;
  cgPrompt: string;
}

export default function Equipment360Viewer({ name, cgPrompt }: Equipment360ViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [lastX, setLastX] = useState(0);

  const imageUrl = `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(cgPrompt)}&image_size=square_hd`;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - lastX;
    setRotation((prev) => prev + delta * 0.5);
    setLastX(e.clientX);
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setLastX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const delta = e.touches[0].clientX - lastX;
    setRotation((prev) => prev + delta * 0.5);
    setLastX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => setIsDragging(false);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="relative w-full aspect-square bg-haavk-graphite rounded-sm overflow-hidden border border-haavk-border/20 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* 旋转角度指示器 */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
          <RotateCw size={12} className="text-haavk-ice/40" />
          <span className="time-font text-[9px] text-haavk-ice/40">
            {Math.round(((rotation % 360) + 360) % 360)}°
          </span>
        </div>

        {/* 装备图像（模拟3D旋转） */}
        <motion.div
          className="w-full h-full flex items-center justify-center"
          animate={{ rotateY: rotation }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-contain p-8"
            draggable={false}
          />
        </motion.div>

        {/* 网格参考线 */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-haavk-ice/5" />
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-haavk-ice/5" />
          <div className="absolute inset-0 border-8 border-haavk-ice/5 rounded-full scale-[0.85]" />
          <div className="absolute inset-0 border-8 border-haavk-ice/3 rounded-full scale-[0.6]" />
        </div>

        {/* 提示 */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1">
          <ZoomIn size={10} className="text-haavk-platinum/30" />
          <span className="text-[9px] text-haavk-platinum/30 font-rajdhani tracking-wider">
            拖拽旋转查看360°视图
          </span>
        </div>
      </div>
    </div>
  );
}