'use client';

import { motion } from 'framer-motion';
import type { PlanetData } from '@/utils/planetData';

interface Props {
  planet: PlanetData;
  x: number;
  y: number;
}

export function PlanetTooltip({ planet, x, y }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute z-100 pointer-events-none"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px - 160px)`,
        transform: 'translateX(-50%)',
      }}
    >
      <div
        className="backdrop-blur-xl rounded-lg border px-5 py-4 min-w-[220px]"
        style={{
          background: 'rgba(5, 5, 25, 0.75)',
          borderColor: 'rgba(79, 195, 247, 0.3)',
          boxShadow: `0 0 30px rgba(79, 195, 247, 0.1), inset 0 0 1px rgba(255,255,255,0.1)`,
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: planet.color, boxShadow: `0 0 8px ${planet.glowColor}` }}
          />
          <h3 className="font-orbitron text-sm tracking-widest" style={{ color: planet.color }}>
            {planet.name}
          </h3>
        </div>

        <div className="space-y-2">
          <InfoRow label="直径" value={planet.info.diameter} />
          <InfoRow label="温度" value={planet.info.temperature} />
          <InfoRow label="引力" value={planet.info.gravity} />
        </div>

        <p className="text-xs text-space-ice/70 mt-3 leading-relaxed font-space">
          {planet.info.description}
        </p>

        <div
          className="absolute top-0 left-0 right-0 h-px opacity-50"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(79,195,247,0.5), transparent)',
          }}
        />
      </div>
    </motion.div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center text-xs">
      <span className="text-space-ice/50 font-space">{label}</span>
      <span className="text-space-ice font-orbitron tracking-wider">{value}</span>
    </div>
  );
}