'use client';

import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { archives } from '@/data/archives';

export default function ArchivePage() {
  return (
    <div className="min-h-screen pt-20 px-6 pb-20">
      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-orbitron text-deep-space-blue-light mb-12 text-center"
        >
          时空档案
        </motion.h1>

        {/* 纵向时间轴 */}
        <div className="relative">
          {/* 时间轴线 */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px"
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(74, 144, 226, 0.3), transparent)',
            }}
          />

          {/* 时间轴节点 */}
          <div className="space-y-16">
            {archives.map((archive, index) => (
              <motion.div
                key={archive.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* 时间节点 */}
                <div className="absolute left-1/2 -translate-x-1/2 z-10">
                  <div
                    className="w-4 h-4 rounded-full breathe"
                    style={{
                      background: 'radial-gradient(circle, #5BA3F0 0%, #4A90E2 100%)',
                      boxShadow: '0 0 20px rgba(74, 144, 226, 0.6)',
                    }}
                  />
                </div>

                {/* 内容卡片 */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <GlassCard hover className="p-6">
                    {/* 纪元标签 */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-xs text-deep-space-silver-dark font-share-tech tracking-wider">
                        {archive.epoch}
                      </div>
                      <div className="text-xs text-deep-space-blue-light font-share-tech">
                        {archive.timestamp}
                      </div>
                    </div>

                    {/* 标题 */}
                    <h2 className="text-xl font-orbitron text-deep-space-blue-light mb-3">
                      {archive.title}
                    </h2>

                    {/* 描述 */}
                    <p className="text-sm text-deep-space-silver leading-relaxed mb-4">
                      {archive.description}
                    </p>

                    {/* 迷你星系预览 */}
                    <div className="glass-card p-4 rounded-lg">
                      <div className="text-xs text-deep-space-silver-dark font-share-tech mb-3">
                        MINI GALAXY PREVIEW
                      </div>
                      <div className="relative h-32 flex items-center justify-center">
                        {/* 中心点 */}
                        <div
                          className="absolute w-3 h-3 rounded-full"
                          style={{
                            background: 'radial-gradient(circle, #5BA3F0, #4A90E2)',
                            boxShadow: '0 0 10px rgba(74, 144, 226, 0.8)',
                          }}
                        />

                        {/* 迷你轨道 */}
                        {Array.from({ length: archive.miniGalaxy.orbits }).map((_, i) => {
                          const radius = 20 + i * 15;
                          return (
                            <motion.div
                              key={i}
                              className="absolute rounded-full"
                              style={{
                                width: `${radius * 2}px`,
                                height: `${radius * 2}px`,
                                border: '1px solid rgba(192, 192, 192, 0.15)',
                              }}
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 20 + i * 5,
                                repeat: Infinity,
                                ease: 'linear',
                              }}
                            >
                              {/* 迷你星球 */}
                              {i < archive.miniGalaxy.planets && (
                                <div
                                  className="absolute w-2 h-2 rounded-full"
                                  style={{
                                    top: '50%',
                                    left: '50%',
                                    marginLeft: '-4px',
                                    marginTop: '-4px',
                                    transform: `translateX(${radius}px)`,
                                    background: `radial-gradient(circle, ${
                                      ['#4A90E2', '#9B7EDE', '#5BA3F0', '#B19CD9'][i % 4]
                                    }, transparent)`,
                                    boxShadow: `0 0 5px ${
                                      ['rgba(74, 144, 226, 0.6)', 'rgba(155, 126, 222, 0.6)', 'rgba(91, 163, 240, 0.6)', 'rgba(177, 156, 217, 0.6)'][i % 4]
                                    }`,
                                  }}
                                />
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                      <div className="flex justify-between text-xs text-deep-space-silver-dark font-share-tech mt-3">
                        <span>星球: {archive.miniGalaxy.planets}</span>
                        <span>轨道: {archive.miniGalaxy.orbits}</span>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
