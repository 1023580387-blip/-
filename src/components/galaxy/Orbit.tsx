'use client';

import { Planet } from '@/types';
import { motion } from 'framer-motion';

interface OrbitProps {
  radius: number;
  speed: number;
  label?: string;
  children?: React.ReactNode;
}

export default function Orbit({ radius, speed, label, children }: OrbitProps) {
  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        marginLeft: `-${radius}px`,
        marginTop: `-${radius}px`,
      }}
    >
      {/* 轨道环线 */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: '1px solid rgba(192, 192, 192, 0.15)',
          boxShadow: '0 0 10px rgba(192, 192, 192, 0.1)',
        }}
      />

      {/* 轨道标签 */}
      {label && (
        <div
          className="absolute text-xs font-share-tech text-deep-space-silver-dark"
          style={{
            top: '-20px',
            left: '50%',
            transform: 'translateX(-50%)',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </div>
      )}

      {/* 旋转容器 */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{
          duration: 60 / speed,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
