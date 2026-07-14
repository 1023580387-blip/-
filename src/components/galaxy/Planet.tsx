'use client';

import { motion } from 'framer-motion';
import { Planet } from '@/types';

interface PlanetProps {
  planet: Planet;
  x: number;
  y: number;
  onHover: (planet: Planet | null) => void;
  onClick: (planet: Planet) => void;
}

export default function Planet({ planet, x, y, onHover, onClick }: PlanetProps) {
  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `calc(50% + ${x}px - ${planet.radius}px)`,
        top: `calc(50% + ${y}px - ${planet.radius}px)`,
        width: `${planet.radius * 2}px`,
        height: `${planet.radius * 2}px`,
      }}
      whileHover={{ scale: 1.2 }}
      onHoverStart={() => onHover(planet)}
      onHoverEnd={() => onHover(null)}
      onClick={(e) => {
        e.stopPropagation();
        onClick(planet);
      }}
    >
      {/* 星球主体 */}
      <div
        className="w-full h-full rounded-full relative overflow-hidden"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${planet.color}, ${planet.color}88 70%)`,
          boxShadow: `0 0 ${planet.radius}px ${planet.glowColor}`,
          animation: `planet-rotate ${10 / planet.rotationSpeed}s linear infinite`,
        }}
      >
        {/* 地表光影效果 */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(0,0,0,0.4) 100%)',
          }}
        />
        
        {/* 高光 */}
        <div
          className="absolute rounded-full"
          style={{
            top: '15%',
            left: '15%',
            width: '30%',
            height: '30%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* 光晕效果 */}
      <div
        className="absolute inset-0 rounded-full breathe"
        style={{
          boxShadow: `0 0 ${planet.radius * 2}px ${planet.glowColor}`,
          opacity: 0.5,
        }}
      />
    </motion.div>
  );
}
