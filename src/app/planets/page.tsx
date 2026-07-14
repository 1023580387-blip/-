'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GalaxyCanvas from '@/components/galaxy/GalaxyCanvas';
import GlassCard from '@/components/ui/GlassCard';
import { planets } from '@/data/planets';
import { Planet } from '@/types';

export default function PlanetsPage() {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(planets[0]);

  return (
    <div className="min-h-screen pt-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧星系预览 */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-orbitron text-deep-space-blue-light mb-6"
            >
              星系预览
            </motion.h1>
            <GlassCard className="overflow-hidden">
              <GalaxyCanvas compact />
            </GlassCard>
          </div>

          {/* 右侧数据面板 */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-orbitron text-deep-space-blue-light mb-6"
            >
              星体数据
            </motion.h1>

            {/* 星球列表 */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {planets.map((planet) => (
                <motion.button
                  key={planet.id}
                  onClick={() => setSelectedPlanet(planet)}
                  className={`glass-card p-4 text-left transition-all ${
                    selectedPlanet?.id === planet.id
                      ? 'border-deep-space-blue/50 bg-deep-space-blue/10'
                      : ''
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full"
                      style={{
                        background: `radial-gradient(circle at 30% 30%, ${planet.color}, ${planet.color}88)`,
                        boxShadow: `0 0 10px ${planet.glowColor}`,
                      }}
                    />
                    <div>
                      <div className="text-sm font-orbitron text-deep-space-blue-light">
                        {planet.name}
                      </div>
                      <div className="text-xs text-deep-space-silver-dark font-share-tech">
                        {planet.nameEn}
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* 详细数据 */}
            <AnimatePresence mode="wait">
              {selectedPlanet && (
                <motion.div
                  key={selectedPlanet.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <GlassCard className="p-6">
                    {/* 标题 */}
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className="w-16 h-16 rounded-full breathe"
                        style={{
                          background: `radial-gradient(circle at 30% 30%, ${selectedPlanet.color}, ${selectedPlanet.color}88)`,
                          boxShadow: `0 0 30px ${selectedPlanet.glowColor}`,
                        }}
                      />
                      <div>
                        <h2 className="text-2xl font-orbitron text-deep-space-blue-light">
                          {selectedPlanet.name}
                        </h2>
                        <p className="text-sm text-deep-space-silver-dark font-share-tech">
                          {selectedPlanet.nameEn}
                        </p>
                      </div>
                    </div>

                    {/* 描述 */}
                    <p className="text-deep-space-silver mb-6 leading-relaxed">
                      {selectedPlanet.description}
                    </p>

                    {/* 数据网格 */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="glass-card p-4">
                        <div className="text-xs text-deep-space-silver-dark font-share-tech mb-1">
                          纪元
                        </div>
                        <div className="text-sm text-deep-space-blue-light font-share-tech">
                          {selectedPlanet.data.epoch}
                        </div>
                      </div>

                      <div className="glass-card p-4">
                        <div className="text-xs text-deep-space-silver-dark font-share-tech mb-1">
                          宇宙坐标
                        </div>
                        <div className="text-xs text-deep-space-silver font-share-tech">
                          {selectedPlanet.data.coordinates}
                        </div>
                      </div>

                      <div className="glass-card p-4">
                        <div className="text-xs text-deep-space-silver-dark font-share-tech mb-1">
                          质量
                        </div>
                        <div className="text-sm text-deep-space-silver font-share-tech">
                          {selectedPlanet.data.mass}
                        </div>
                      </div>

                      <div className="glass-card p-4">
                        <div className="text-xs text-deep-space-silver-dark font-share-tech mb-1">
                          表面温度
                        </div>
                        <div className="text-sm text-deep-space-silver font-share-tech">
                          {selectedPlanet.data.temperature}
                        </div>
                      </div>

                      <div className="glass-card p-4">
                        <div className="text-xs text-deep-space-silver-dark font-share-tech mb-1">
                          大气成分
                        </div>
                        <div className="text-sm text-deep-space-silver font-share-tech">
                          {selectedPlanet.data.atmosphere}
                        </div>
                      </div>

                      <div className="glass-card p-4">
                        <div className="text-xs text-deep-space-silver-dark font-share-tech mb-1">
                          表面重力
                        </div>
                        <div className="text-sm text-deep-space-silver font-share-tech">
                          {selectedPlanet.data.gravity}
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
