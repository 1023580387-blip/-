'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { GalaxyCanvas } from '@/components/core/GalaxyCanvas';
import { NeonGlassPanel } from '@/components/ui/NeonGlassPanel';
import { DataFlowLine } from '@/components/ui/DataFlowLine';
import { generatePlanets } from '@/utils/mockData';

export default function HomePage() {
  const planets = useMemo(() => generatePlanets(), []);

  const stats = [
    { label: '活跃星球', value: '10', color: 'cyan' as const },
    { label: '总算力', value: '47.8K TH/s', color: 'magenta' as const },
    { label: '数据流量', value: '23.5 PB/s', color: 'cyan' as const },
    { label: '航道状态', value: '正常', color: 'magenta' as const },
  ];

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="flex-1 relative">
        <GalaxyCanvas planets={planets} className="h-[calc(100vh-12rem)]" />
      </div>

      <div className="relative z-10 px-8 pb-32">
        <DataFlowLine direction="horizontal" className="mb-8" />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <NeonGlassPanel glowColor={stat.color} className="text-center">
                <div className="text-white/50 text-xs font-mono mb-2 uppercase tracking-wider">
                  {stat.label}
                </div>
                <div className={`text-2xl font-mono font-bold ${
                  stat.color === 'cyan' ? 'text-cyber-cyan' : 'text-cyber-magenta'
                }`}>
                  {stat.value}
                </div>
              </NeonGlassPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
