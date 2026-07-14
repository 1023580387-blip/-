'use client';

import { motion } from 'framer-motion';
import { Planet } from '@/types';

interface PlanetTooltipProps {
  planet: Planet | null;
  position: { x: number; y: number };
}

export default function PlanetTooltip({ planet, position }: PlanetTooltipProps) {
  if (!planet) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      transition={{ duration: 0.2 }}
      className="fixed pointer-events-none z-50"
      style={{
        left: `${position.x + 20}px`,
        top: `${position.y - 20}px`,
      }}
    >
      <div className="glass-card rounded-lg p-4 min-w-[280px] breathe">
        {/* 标题 */}
        <div className="mb-3">
          <h3 className="text-lg font-orbitron text-deep-space-blue-light mb-1">
            {planet.name}
          </h3>
          <p className="text-xs text-deep-space-silver-dark font-share-tech">
            {planet.nameEn}
          </p>
        </div>

        {/* 描述 */}
        <p className="text-sm text-deep-space-silver mb-4 leading-relaxed">
          {planet.description}
        </p>

        {/* 数据面板 */}
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-deep-space-silver-dark font-share-tech">纪元</span>
            <span className="text-deep-space-blue-light font-share-tech">{planet.data.epoch}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-deep-space-silver-dark font-share-tech">坐标</span>
            <span className="text-deep-space-silver font-share-tech text-right">
              {planet.data.coordinates}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-deep-space-silver-dark font-share-tech">质量</span>
            <span className="text-deep-space-silver font-share-tech">{planet.data.mass}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-deep-space-silver-dark font-share-tech">温度</span>
            <span className="text-deep-space-silver font-share-tech">{planet.data.temperature}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-deep-space-silver-dark font-share-tech">大气</span>
            <span className="text-deep-space-silver font-share-tech">{planet.data.atmosphere}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-deep-space-silver-dark font-share-tech">重力</span>
            <span className="text-deep-space-silver font-share-tech">{planet.data.gravity}</span>
          </div>
        </div>

        {/* 装饰角标 */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-deep-space-blue/50" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-deep-space-blue/50" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-deep-space-blue/50" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-deep-space-blue/50" />
      </div>
    </motion.div>
  );
}
