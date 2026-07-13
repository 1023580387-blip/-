"use client";

import { motion } from "framer-motion";

export default function WindshieldOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="pointer-events-none fixed inset-0 z-30"
    >
      <motion.div
        animate={{
          x: [0, 4, -3, 2, 0],
          y: [0, 2, -2, 1, 0],
          rotate: [0, 0.3, -0.2, 0.1, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0"
      >
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          className="h-full w-full opacity-40"
        >
          <defs>
            <linearGradient id="glassStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
              <stop offset="50%" stopColor="rgba(34,211,238,0.25)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
            </linearGradient>
          </defs>
          {/* 弧形挡风玻璃外框 */}
          <path
            d="M -40 880 Q 720 780 1480 880 L 1520 -40 L -80 -40 Z"
            fill="rgba(255,255,255,0.015)"
            stroke="url(#glassStroke)"
            strokeWidth="1.5"
          />
          <path
            d="M 60 820 Q 720 740 1380 820"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
          <path
            d="M 120 100 Q 720 160 1320 100"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
        </svg>
      </motion.div>
      {/* 玻璃反光 */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-transparent" />
    </motion.div>
  );
}
