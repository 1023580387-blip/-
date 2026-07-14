'use client';

import { motion } from 'framer-motion';
import GalaxyCanvas from '@/components/galaxy/GalaxyCanvas';
import GlassCard from '@/components/ui/GlassCard';
import { orbits } from '@/data/orbits';

export default function HomePage() {
  const totalPlanets = orbits.reduce((sum, orbit) => sum + orbit.planets.length, 0);

  return (
    <div className="relative min-h-screen">
      {/* 星系画布 */}
      <GalaxyCanvas />

      {/* 底部信息板块 */}
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 星系概览 */}
            <GlassCard hover className="p-6">
              <div className="text-xs text-deep-space-silver-dark font-share-tech tracking-wider mb-2">
                GALAXY OVERVIEW
              </div>
              <div className="text-3xl font-orbitron text-deep-space-blue-light mb-2">
                {orbits.length}
              </div>
              <div className="text-sm text-deep-space-silver">
                活跃轨道
              </div>
            </GlassCard>

            {/* 星球统计 */}
            <GlassCard hover className="p-6">
              <div className="text-xs text-deep-space-silver-dark font-share-tech tracking-wider mb-2">
                PLANETS DETECTED
              </div>
              <div className="text-3xl font-orbitron text-deep-space-blue-light mb-2">
                {totalPlanets}
              </div>
              <div className="text-sm text-deep-space-silver">
                已发现星体
              </div>
            </GlassCard>

            {/* 宇宙参数 */}
            <GlassCard hover className="p-6">
              <div className="text-xs text-deep-space-silver-dark font-share-tech tracking-wider mb-2">
                COSMIC PARAMETERS
              </div>
              <div className="text-3xl font-orbitron text-deep-space-blue-light mb-2">
                6.2 AU
              </div>
              <div className="text-sm text-deep-space-silver">
                最大航道距离
              </div>
            </GlassCard>
          </div>

          {/* 底部描述 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="text-deep-space-silver-dark font-rajdhani text-sm">
              探索无限深空，追踪星际轨迹，见证宇宙演化
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
