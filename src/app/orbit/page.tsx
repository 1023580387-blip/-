'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { orbits } from '@/data/orbits';

export default function OrbitPage() {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatElapsedTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
  };

  return (
    <div className="min-h-screen pt-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-orbitron text-deep-space-blue-light mb-8"
        >
          星际航线
        </motion.h1>

        {/* 航线计时 */}
        <GlassCard className="p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-deep-space-silver-dark font-share-tech tracking-wider mb-2">
                VOYAGE TIMER
              </div>
              <div className="text-4xl font-share-tech text-deep-space-blue-light">
                {formatElapsedTime(elapsedTime)}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-deep-space-silver-dark font-share-tech tracking-wider mb-2">
                ACTIVE ROUTES
              </div>
              <div className="text-4xl font-orbitron text-deep-space-blue-light">
                {orbits.length}
              </div>
            </div>
          </div>
        </GlassCard>

        {/* 轨道可视化 */}
        <div className="relative">
          <GlassCard className="p-12 overflow-hidden">
            <div className="relative w-full h-[800px] flex items-center justify-center">
              {/* 中心恒星 */}
              <div
                className="absolute rounded-full breathe"
                style={{
                  width: '80px',
                  height: '80px',
                  background: 'radial-gradient(circle, #5BA3F0 0%, #4A90E2 50%, transparent 100%)',
                  boxShadow: '0 0 80px rgba(74, 144, 226, 0.8)',
                }}
              />

              {/* 扩张式环形轨道 */}
              {orbits.map((orbit, index) => {
                const orbitRadius = 120 + index * 80;
                return (
                  <motion.div
                    key={orbit.id}
                    className="absolute rounded-full"
                    style={{
                      width: `${orbitRadius * 2}px`,
                      height: `${orbitRadius * 2}px`,
                      border: '1px solid rgba(192, 192, 192, 0.2)',
                      boxShadow: '0 0 15px rgba(192, 192, 192, 0.1)',
                    }}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 60 / orbit.speed,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    {/* 轨道标签 */}
                    <div
                      className="absolute text-xs font-share-tech text-deep-space-silver-dark"
                      style={{
                        top: '-25px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {orbit.label} · {orbit.distance}
                    </div>

                    {/* 星球 */}
                    {orbit.planets.map((planet) => (
                      <div
                        key={planet.id}
                        className="absolute"
                        style={{
                          top: '50%',
                          left: '50%',
                          width: `${planet.radius * 2}px`,
                          height: `${planet.radius * 2}px`,
                          marginLeft: `-${planet.radius}px`,
                          marginTop: `-${planet.radius}px`,
                          transform: `translateX(${orbitRadius}px)`,
                        }}
                      >
                        <div
                          className="w-full h-full rounded-full"
                          style={{
                            background: `radial-gradient(circle at 30% 30%, ${planet.color}, ${planet.color}88 70%)`,
                            boxShadow: `0 0 ${planet.radius}px ${planet.glowColor}`,
                          }}
                        />
                      </div>
                    ))}
                  </motion.div>
                );
              })}
            </div>
          </GlassCard>
        </div>

        {/* 航线信息 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {orbits.slice(0, 3).map((orbit) => (
            <GlassCard key={orbit.id} hover className="p-6">
              <div className="text-xs text-deep-space-silver-dark font-share-tech tracking-wider mb-2">
                {orbit.label}
              </div>
              <div className="text-2xl font-orbitron text-deep-space-blue-light mb-2">
                {orbit.distance}
              </div>
              <div className="text-sm text-deep-space-silver">
                航道距离
              </div>
              <div className="mt-4 text-xs text-deep-space-silver-dark">
                公转周期: {(60 / orbit.speed).toFixed(0)}s
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
