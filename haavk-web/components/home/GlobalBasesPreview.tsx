'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '@/components/shared/SectionTitle';
import { Shield, Eye } from 'lucide-react';
import { bases } from '@/data/bases';

export default function GlobalBasesPreview() {
  const [activeBase, setActiveBase] = useState<string | null>(null);

  return (
    <section className="relative py-24 px-6 bg-haavk-graphite/30">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="全球据点分布"
          subtitle="七大洲战略部署 · 全方位防务覆盖"
        />

        {/* 极简世界地图 */}
        <div className="relative w-full max-w-3xl mx-auto aspect-[2/1] mb-8">
          <svg viewBox="0 0 800 400" className="w-full h-full">
            {/* 简化大洲轮廓 */}
            <path d="M150,80 Q200,60 260,80 Q280,140 260,200 Q220,240 180,200 Q140,140 150,80Z" fill="none" stroke="rgba(168,180,192,0.15)" strokeWidth="0.5" />
            <path d="M280,60 Q400,40 520,60 Q560,120 540,200 Q500,280 380,260 Q300,240 280,160 Z" fill="none" stroke="rgba(168,180,192,0.15)" strokeWidth="0.5" />
            <path d="M540,80 Q620,70 680,100 Q700,160 660,220 Q600,260 550,220 Z" fill="none" stroke="rgba(168,180,192,0.15)" strokeWidth="0.5" />
            <path d="M200,220 Q280,200 320,260 Q240,320 180,300 Q140,260 200,220Z" fill="none" stroke="rgba(168,180,192,0.15)" strokeWidth="0.5" />
            <path d="M560,240 Q640,260 660,320 Q600,360 540,340 Z" fill="none" stroke="rgba(168,180,192,0.15)" strokeWidth="0.5" />
            <path d="M100,280 Q180,270 220,320 Q160,360 80,340 Z" fill="none" stroke="rgba(168,180,192,0.15)" strokeWidth="0.5" />
            <path d="M680,300 Q740,290 760,340 Q720,370 680,350 Z" fill="none" stroke="rgba(168,180,192,0.15)" strokeWidth="0.5" />

            {/* 据点标记 */}
            {bases.map((base) => {
              const x = ((base.coordinates.lng + 180) / 360) * 800;
              const y = ((90 - base.coordinates.lat) / 180) * 400;
              return (
                <g key={base.id}>
                  <circle cx={x} cy={y} r="4" fill="none" stroke="rgba(126,184,218,0.5)" strokeWidth="0.5" />
                  <circle cx={x} cy={y} r="2" fill="rgba(126,184,218,0.4)" className="animate-pulse-slow" />
                  <rect
                    x={x - 20}
                    y={y - 24}
                    width="40"
                    height="12"
                    rx="1"
                    fill="rgba(13,13,13,0.8)"
                    stroke="rgba(126,184,218,0.2)"
                    strokeWidth="0.5"
                    className="cursor-pointer hover:stroke-haavk-ice/50 transition-colors"
                    onClick={() => setActiveBase(activeBase === base.id ? null : base.id)}
                  />
                  <text
                    x={x}
                    y={y - 15}
                    textAnchor="middle"
                    fill="rgba(168,180,192,0.6)"
                    fontSize="7"
                    fontFamily="Orbitron"
                    className="cursor-pointer"
                    onClick={() => setActiveBase(activeBase === base.id ? null : base.id)}
                  >
                    {base.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* 弹窗详情 */}
          <AnimatePresence>
            {activeBase && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 holo-glass p-4 z-10"
              >
                {(() => {
                  const base = bases.find((b) => b.id === activeBase);
                  if (!base) return null;
                  return (
                    <>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-orbitron text-xs tracking-[0.1em] text-haavk-silver">
                          {base.name}
                        </h3>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: base.securityLevel }).map((_, i) => (
                            <Shield key={i} size={10} className="text-haavk-ice/50" />
                          ))}
                        </div>
                      </div>
                      <p className="text-[10px] text-haavk-platinum/50 font-rajdhani leading-relaxed mb-2">
                        {base.description.slice(0, 100)}...
                      </p>
                      <div className="flex items-center gap-2 text-[9px] text-haavk-ice/50 font-rajdhani">
                        <Eye size={10} />
                        <span>{base.production}</span>
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}