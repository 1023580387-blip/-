'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export function HolographicSearch({ onClose }: Props) {
  const [query, setQuery] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-60 flex items-start justify-center pt-32"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg mx-4"
      >
        <div
          className="backdrop-blur-2xl rounded-xl border overflow-hidden"
          style={{
            background: 'rgba(5, 5, 25, 0.85)',
            borderColor: 'rgba(79, 195, 247, 0.3)',
            boxShadow: '0 0 60px rgba(79, 195, 247, 0.1), inset 0 0 1px rgba(255,255,255,0.1)',
          }}
        >
          <div className="flex items-center px-5 py-4 gap-3">
            <Search className="w-5 h-5 text-space-blue/60" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索星系坐标、星球数据..."
              autoFocus
              className="flex-1 bg-transparent border-none outline-none text-space-ice font-space text-sm placeholder:text-space-ice/30"
            />
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/5">
              <X className="w-4 h-4 text-space-ice/40" />
            </button>
          </div>

          {query && (
            <div className="border-t border-space-border/20 px-5 py-4">
              <p className="text-space-ice/30 text-xs font-space">
                搜索星际数据库...
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}