'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function HoloTimeBar() {
  const [time, setTime] = useState(new Date());
  const [epoch, setEpoch] = useState('第六纪元');
  const [coordinates, setCoordinates] = useState('X: 1247.3 Y: -892.1 Z: 456.7');

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      // 模拟坐标变化
      const x = (1247.3 + Math.sin(Date.now() / 10000) * 10).toFixed(1);
      const y = (-892.1 + Math.cos(Date.now() / 10000) * 10).toFixed(1);
      const z = (456.7 + Math.sin(Date.now() / 15000) * 5).toFixed(1);
      setCoordinates(`X: ${x} Y: ${y} Z: ${z}`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return { hours, minutes, seconds };
  };

  const { hours, minutes, seconds } = formatTime(time);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="glass-card border-b border-white/10">
        {/* 流光效果 */}
        <div className="absolute inset-0 shimmer pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* 星际纪元 */}
            <div className="flex items-center gap-6">
              <div>
                <div className="text-xs text-deep-space-silver-dark font-share-tech tracking-wider mb-1">
                  INTERSTELLAR ERA
                </div>
                <div className="text-lg font-orbitron text-deep-space-blue-light">
                  {epoch}
                </div>
              </div>
            </div>

            {/* 实时时空时间 */}
            <div className="flex items-center gap-2">
              <div className="text-xs text-deep-space-silver-dark font-share-tech tracking-wider mr-2">
                SPACETIME
              </div>
              <div className="flex items-center gap-1 font-share-tech text-2xl text-deep-space-blue-light">
                <motion.span
                  key={hours}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {hours}
                </motion.span>
                <span className="text-deep-space-silver">:</span>
                <motion.span
                  key={minutes}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {minutes}
                </motion.span>
                <span className="text-deep-space-silver">:</span>
                <motion.span
                  key={seconds}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {seconds}
                </motion.span>
              </div>
            </div>

            {/* 宇宙坐标 */}
            <div>
              <div className="text-xs text-deep-space-silver-dark font-share-tech tracking-wider mb-1 text-right">
                COSMIC COORDINATES
              </div>
              <div className="text-sm font-share-tech text-deep-space-silver">
                {coordinates}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
