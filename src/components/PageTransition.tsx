'use client';

// ========================================
// 页面切换过渡组件 - 霓虹溶解动画
// 使用 Framer Motion AnimatePresence
// ========================================
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

// 霓虹溶解过渡变体
const variants = {
  initial: {
    opacity: 0,
    filter: 'blur(4px)',
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
  },
  exit: {
    opacity: 0,
    filter: 'blur(8px)',
    scale: 1.02,
  },
};

export default function PageTransition({ children, className = '' }: PageTransitionProps) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* 过渡时的霓虹溶解叠加层 */}
      <motion.div
        className="fixed inset-0 z-[9998] pointer-events-none"
        initial={{ opacity: 0 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-neon/20 via-magenta-neon/20 to-cyan-neon/20" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </motion.div>

      {children}
    </motion.div>
  );
}