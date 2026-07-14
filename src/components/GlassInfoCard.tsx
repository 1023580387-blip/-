'use client';

import { motion } from 'framer-motion';

interface Props {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  variant?: 'default' | 'wide';
  delay?: number;
}

export function GlassInfoCard({ title, subtitle, children, variant = 'default', delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay }}
      className={variant === 'wide' ? 'md:col-span-2' : ''}
    >
      <div
        className="backdrop-blur-xl rounded-xl border p-6 h-full transition-all duration-500 hover:border-space-blue/30"
        style={{
          background: 'rgba(5, 5, 25, 0.4)',
          borderColor: 'rgba(79, 195, 247, 0.12)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2), inset 0 0 1px rgba(255,255,255,0.05)',
        }}
      >
        {/* Scan line */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(79,195,247,0.2), transparent)',
          }}
        />

        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-4 rounded-full bg-space-blue/50" />
          <h3 className="font-orbitron text-xs tracking-widest text-space-blue/80 uppercase">
            {title}
          </h3>
        </div>

        {subtitle && (
          <p className="text-space-ice/40 text-xs font-space mb-4 tracking-wide">{subtitle}</p>
        )}

        <div className="space-y-3">{children}</div>
      </div>
    </motion.div>
  );
}