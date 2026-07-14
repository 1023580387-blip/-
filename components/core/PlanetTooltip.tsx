'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { PlanetData } from '@/types';

interface PlanetTooltipProps {
  data: PlanetData;
  position: { x: number; y: number };
  visible: boolean;
}

export function PlanetTooltip({ data, position, visible }: PlanetTooltipProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="fixed z-[100] pointer-events-none"
          style={{
            left: position.x + 20,
            top: position.y - 10,
          }}
        >
          <div className="neon-glass rounded-lg p-4 min-w-[240px] border border-cyber-cyan/50">
            <div className="absolute inset-0 rounded-lg overflow-hidden">
              <div className="scan-line" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-cyber-cyan font-mono text-sm font-bold mb-3 glitch-text" data-text={data.name}>
                {data.name}
              </h3>
              
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-white/50">算力指数:</span>
                  <span className="text-cyber-cyan neon-pulse">
                    {data.data?.computingPower.toLocaleString()} TH/s
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">数据流量:</span>
                  <span className="text-cyber-magenta">
                    {data.data?.dataFlow.toLocaleString()} PB/s
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">星际坐标:</span>
                  <span className="text-purple-400">{data.data?.coordinates}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">轨道层级:</span>
                  <span className="text-white/80">L-{data.orbitIndex + 1}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-cyber-cyan/20">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
                  <span className="text-[10px] text-white/40 font-mono">SIGNAL ACTIVE</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
