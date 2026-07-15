'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Eye, X } from 'lucide-react';
import { Base } from '@/types';

interface WorldBaseCanvasProps {
  bases: Base[];
}

export default function WorldBaseCanvas({ bases }: WorldBaseCanvasProps) {
  const [selectedBase, setSelectedBase] = useState<Base | null>(null);
  const [selectedContinent, setSelectedContinent] = useState<string>('all');

  const continents = ['all', '亚洲', '非洲', '欧洲', '北美洲', '南美洲', '大洋洲'];

  const filteredBases = selectedContinent === 'all'
    ? bases
    : bases.filter((b) => b.continent === selectedContinent);

  const mapPositions: Record<string, { x: number; y: number }> = {
    spaceport: { x: 48, y: 62 },
    'zero-dam': { x: 62, y: 55 },
    'tide-prison': { x: 52, y: 82 },
    spire: { x: 66, y: 52 },
    'lab-asia': { x: 82, y: 42 },
    'lab-europe': { x: 47, y: 35 },
    'lab-americas': { x: 22, y: 40 },
  };

  return (
    <div className="relative">
      {/* 大洲筛选栏 */}
      <div className="flex flex-wrap gap-2 mb-8">
        {continents.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedContinent(c)}
            className={`px-4 py-1.5 text-xs font-rajdhani tracking-wider transition-all duration-300 ${
              selectedContinent === c
                ? 'text-haavk-ice border border-haavk-ice/40 bg-haavk-ice/5'
                : 'text-haavk-platinum/50 border border-haavk-border/20 hover:border-haavk-silver/30 hover:text-haavk-silver'
            }`}
          >
            {c === 'all' ? '全球总览' : c}
          </button>
        ))}
      </div>

      {/* 世界地图 */}
      <div className="relative w-full aspect-[2/1] bg-haavk-graphite/50 border border-haavk-border/20 rounded-sm overflow-hidden">
        <svg viewBox="0 0 800 400" className="w-full h-full">
          {/* 网格 */}
          <defs>
            <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 20" fill="none" stroke="rgba(168,180,192,0.03)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="800" height="400" fill="url(#grid)" />

          {/* 简化大洲轮廓 */}
          <path d="M150,80 Q200,60 260,80 Q280,140 260,200 Q220,240 180,200 Q140,140 150,80Z" fill="rgba(168,180,192,0.03)" stroke="rgba(168,180,192,0.1)" strokeWidth="0.5" />
          <path d="M280,60 Q400,40 520,60 Q560,120 540,200 Q500,280 380,260 Q300,240 280,160 Z" fill="rgba(168,180,192,0.03)" stroke="rgba(168,180,192,0.1)" strokeWidth="0.5" />
          <path d="M540,80 Q620,70 680,100 Q700,160 660,220 Q600,260 550,220 Z" fill="rgba(168,180,192,0.03)" stroke="rgba(168,180,192,0.1)" strokeWidth="0.5" />
          <path d="M200,220 Q280,200 320,260 Q240,320 180,300 Q140,260 200,220Z" fill="rgba(168,180,192,0.03)" stroke="rgba(168,180,192,0.1)" strokeWidth="0.5" />
          <path d="M560,240 Q640,260 660,320 Q600,360 540,340 Z" fill="rgba(168,180,192,0.03)" stroke="rgba(168,180,192,0.1)" strokeWidth="0.5" />
          <path d="M100,280 Q180,270 220,320 Q160,360 80,340 Z" fill="rgba(168,180,192,0.03)" stroke="rgba(168,180,192,0.1)" strokeWidth="0.5" />
          <path d="M680,300 Q740,290 760,340 Q720,370 680,350 Z" fill="rgba(168,180,192,0.03)" stroke="rgba(168,180,192,0.1)" strokeWidth="0.5" />

          {/* 据点标记 */}
          {filteredBases.map((base) => {
            const pos = mapPositions[base.id] || { x: 50, y: 50 };
            return (
              <g
                key={base.id}
                className="cursor-pointer"
                onClick={() => setSelectedBase(base)}
              >
                <circle cx={`${pos.x}%`} cy={`${pos.y}%`} r="6" fill="none" stroke="rgba(126,184,218,0.4)" strokeWidth="1" />
                <circle cx={`${pos.x}%`} cy={`${pos.y}%`} r="2" fill="rgba(126,184,218,0.5)" className="animate-pulse-slow" />
                <text
                  x={`${pos.x}%`}
                  y={`${pos.y - 2}%`}
                  textAnchor="middle"
                  fill="rgba(168,180,192,0.5)"
                  fontSize="8"
                  fontFamily="Orbitron"
                  dy="-8"
                >
                  {base.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* 全息弹窗 */}
        <AnimatePresence>
          {selectedBase && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-4 md:inset-10 holo-glass p-6 md:p-8 overflow-y-auto z-10"
            >
              <button
                onClick={() => setSelectedBase(null)}
                className="absolute top-4 right-4 text-haavk-platinum/50 hover:text-haavk-ice transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: selectedBase.securityLevel }).map((_, i) => (
                    <Shield key={i} size={14} className="text-haavk-ice/50" />
                  ))}
                </div>
                <span className="time-font text-[10px] text-haavk-ice/50 tracking-wider">
                  LEVEL {selectedBase.securityLevel}
                </span>
              </div>

              <h2 className="font-orbitron text-xl tracking-[0.1em] text-haavk-silver mb-2">
                {selectedBase.name}
              </h2>
              <p className="text-xs text-haavk-platinum/50 font-rajdhani mb-4 tracking-wider">
                {selectedBase.timezone} · {selectedBase.continent}
              </p>

              <div className="metal-divider my-4" />

              <p className="text-sm text-haavk-platinum/60 font-rajdhani leading-relaxed mb-6">
                {selectedBase.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="border border-haavk-border/20 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap size={14} className="text-haavk-ice/40" />
                    <span className="text-[10px] text-haavk-platinum/40 font-rajdhani tracking-wider">产能</span>
                  </div>
                  <div className="time-font text-sm text-haavk-ice/60">{selectedBase.production}</div>
                </div>
                <div className="border border-haavk-border/20 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye size={14} className="text-haavk-ice/40" />
                    <span className="text-[10px] text-haavk-platinum/40 font-rajdhani tracking-wider">项目</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selectedBase.projects.map((p) => (
                      <span key={p} className="time-font text-[9px] text-haavk-ice/50 bg-haavk-ice/5 px-1.5 py-0.5">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}