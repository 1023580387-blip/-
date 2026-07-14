'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GalaxyCanvas } from '@/components/core/GalaxyCanvas';
import { NeonGlassPanel } from '@/components/ui/NeonGlassPanel';
import { DataFlowLine } from '@/components/ui/DataFlowLine';
import { generatePlanets, generateComputingData } from '@/utils/mockData';
import { PlanetData } from '@/types';

export default function PlanetsPage() {
  const planets = useMemo(() => generatePlanets(), []);
  const computingData = useMemo(() => generateComputingData(), []);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);

  const maxPower = Math.max(...computingData.map(d => d.computingPower));

  return (
    <div className="min-h-screen px-8 pb-32">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <div className="lg:col-span-1">
          <NeonGlassPanel className="h-[500px]">
            <h2 className="text-cyber-cyan font-mono text-sm mb-4 uppercase tracking-wider">
              星系交互视图
            </h2>
            <GalaxyCanvas 
              planets={planets} 
              className="h-[420px]"
              onPlanetClick={(planet) => setSelectedPlanet(planet)}
            />
          </NeonGlassPanel>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <NeonGlassPanel>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-cyber-cyan font-mono text-lg uppercase tracking-wider">
                全息算力大屏
              </h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
                <span className="text-xs text-white/50 font-mono">LIVE</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {selectedPlanet ? (
                <motion.div
                  key={selectedPlanet.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-full"
                      style={{ 
                        background: `radial-gradient(circle, ${selectedPlanet.color}, transparent)`,
                        boxShadow: `0 0 20px ${selectedPlanet.color}` 
                      }}
                    />
                    <div>
                      <h3 className="text-xl font-mono font-bold text-white">
                        {selectedPlanet.name}
                      </h3>
                      <p className="text-xs text-white/50 font-mono">
                        轨道层级 L-{selectedPlanet.orbitIndex + 1}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 border border-cyber-cyan/20 rounded">
                      <div className="text-xs text-white/50 font-mono mb-1">算力指数</div>
                      <div className="text-xl text-cyber-cyan font-mono font-bold">
                        {selectedPlanet.data?.computingPower.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-white/30 font-mono">TH/s</div>
                    </div>
                    <div className="text-center p-4 border border-cyber-magenta/20 rounded">
                      <div className="text-xs text-white/50 font-mono mb-1">数据流量</div>
                      <div className="text-xl text-cyber-magenta font-mono font-bold">
                        {selectedPlanet.data?.dataFlow.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-white/30 font-mono">PB/s</div>
                    </div>
                    <div className="text-center p-4 border border-purple-500/20 rounded">
                      <div className="text-xs text-white/50 font-mono mb-1">星际坐标</div>
                      <div className="text-sm text-purple-400 font-mono font-bold">
                        {selectedPlanet.data?.coordinates}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 text-white/30 font-mono text-sm"
                >
                  点击左侧星球加载算力数据
                </motion.div>
              )}
            </AnimatePresence>
          </NeonGlassPanel>

          <NeonGlassPanel>
            <h3 className="text-cyber-cyan font-mono text-sm mb-4 uppercase tracking-wider">
              数据流可视化
            </h3>
            <div className="space-y-2">
              {computingData.slice(0, 10).map((data, index) => (
                <motion.div
                  key={data.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-xs text-white/50 font-mono w-20 truncate">
                    {data.planetName}
                  </span>
                  <div className="flex-1 h-2 bg-white/5 rounded overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(data.computingPower / maxPower) * 100}%` }}
                      transition={{ delay: index * 0.05, duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-magenta"
                      style={{ boxShadow: '0 0 10px #00e5ff' }}
                    />
                  </div>
                  <span className="text-xs text-cyber-cyan font-mono w-16 text-right">
                    {data.computingPower}
                  </span>
                </motion.div>
              ))}
            </div>
          </NeonGlassPanel>
        </div>
      </div>

      <div className="fixed inset-0 pointer-events-none z-0">
        <DataFlowLine direction="horizontal" className="absolute top-1/4" />
        <DataFlowLine direction="horizontal" color="magenta" className="absolute top-3/4" />
      </div>
    </div>
  );
}
