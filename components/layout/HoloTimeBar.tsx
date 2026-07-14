'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function HoloTimeBar() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!time) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 h-16">
        <div className="h-full neon-glass border-b border-cyber-cyan/30">
          <div className="h-full flex items-center justify-between px-8 max-w-7xl mx-auto">
            <div className="text-white/30 font-mono text-sm">加载中...</div>
          </div>
        </div>
      </div>
    );
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', { hour12: false });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  const getStardate = (date: Date) => {
    const year = date.getFullYear();
    const dayOfYear = Math.floor((date.getTime() - new Date(year, 0, 0).getTime()) / 86400000);
    return `${year}.${dayOfYear.toString().padStart(3, '0')}`;
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-16">
      <div className="h-full neon-glass border-b border-cyber-cyan/30">
        <div className="h-full flex items-center justify-between px-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="text-cyber-cyan font-mono text-sm">
              <span className="text-white/50">星际纪元:</span>{' '}
              <span className="glitch-text" data-text={getStardate(time)}>
                {getStardate(time)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="text-cyber-cyan font-mono text-lg">
              <span className="glitch-text" data-text={formatTime(time)}>
                {formatTime(time)}
              </span>
            </div>
            <div className="text-white/50 font-mono text-xs">
              {formatDate(time)}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-cyber-cyan font-mono text-sm">
              <span className="text-white/50">宇宙坐标:</span>{' '}
              <span>X:137.42 Y:89.15 Z:256.78</span>
            </div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>
    </div>
  );
}
