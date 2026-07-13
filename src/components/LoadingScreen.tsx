'use client';

// ========================================
// 4秒故障霓虹品牌加载动画
// 文字「MAISON ÉCLAT」伴随霓虹闪烁、像素扭曲后消散
// ========================================
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '@/hooks/useThemeStore';

export default function LoadingScreen() {
  const { setLoading } = useThemeStore();
  const [stage, setStage] = useState<'glitch' | 'stable' | 'dissolve'>('glitch');
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // 阶段1: 故障闪烁 (0-1.5s)
    const t1 = setTimeout(() => setStage('stable'), 1500);
    // 阶段2: 稳定发光 (1.5-3s)
    const t2 = setTimeout(() => setStage('dissolve'), 3000);
    // 阶段3: 溶解消散 (3-4s)
    const t3 = setTimeout(() => {
      setVisible(false);
      setLoading(false);
    }, 4000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [setLoading]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 背景故障条纹 */}
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-full h-[2px]"
                style={{
                  top: `${15 + i * 14}%`,
                  background: i % 2 === 0 ? '#FF00FF' : '#00F0FF',
                }}
                animate={{
                  x: ['-100%', '100%'],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.12,
                  ease: 'linear',
                }}
              />
            ))}
          </div>

          {/* 故障扫描线 */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-neon/5 to-transparent h-[4px]"
            animate={{
              top: ['-10%', '110%'],
            }}
            transition={{
              duration: 0.15,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* 品牌文字 */}
          <motion.div
            className={`relative font-display text-6xl md:text-8xl font-bold tracking-[0.3em] select-none ${
              stage === 'glitch' ? 'text-white' : ''
            }`}
            animate={
              stage === 'glitch'
                ? {
                    x: [0, -4, 3, -2, 0, 5, -3, 0],
                    y: [0, 2, -1, 3, -2, 1, -3, 0],
                    opacity: [1, 0.8, 1, 0.9, 1, 0.7, 1],
                  }
                : stage === 'stable'
                ? {
                    textShadow: [
                      '0 0 7px #00F0FF, 0 0 10px #00F0FF, 0 0 21px #00F0FF',
                      '0 0 15px #FF00FF, 0 0 30px #FF00FF, 0 0 45px #FF00FF',
                      '0 0 7px #00F0FF, 0 0 10px #00F0FF, 0 0 21px #00F0FF',
                    ],
                  }
                : {
                    opacity: 0,
                    filter: 'blur(10px)',
                    scale: 1.1,
                  }
            }
            transition={
              stage === 'glitch'
                ? { duration: 0.05, repeat: Infinity }
                : stage === 'stable'
                ? { duration: 0.8, repeat: Infinity }
                : { duration: 1 }
            }
          >
            {/* 故障重影 */}
            {stage === 'glitch' && (
              <>
                <span
                  className="absolute inset-0 text-[#FF00FF]"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% 35%, 0 35%)', left: '-3px' }}
                >
                  MAISON ÉCLAT
                </span>
                <span
                  className="absolute inset-0 text-[#00F0FF]"
                  style={{ clipPath: 'polygon(0 65%, 100% 65%, 100% 100%, 0 100%)', left: '3px' }}
                >
                  MAISON ÉCLAT
                </span>
              </>
            )}
            <span className="neon-text">MAISON ÉCLAT</span>
          </motion.div>

          {/* 底部加载条 */}
          <motion.div
            className="absolute bottom-32 left-1/2 -translate-x-1/2 w-64 h-[2px] bg-cyan-neon/30 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-cyan-neon to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>

          {/* 角落装饰 */}
          {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => (
            <div
              key={corner}
              className={`absolute w-12 h-12 border-cyan-neon/30 ${
                corner === 'top-left'
                  ? 'top-8 left-8 border-t border-l'
                  : corner === 'top-right'
                  ? 'top-8 right-8 border-t border-r'
                  : corner === 'bottom-left'
                  ? 'bottom-8 left-8 border-b border-l'
                  : 'bottom-8 right-8 border-b border-r'
              }`}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}