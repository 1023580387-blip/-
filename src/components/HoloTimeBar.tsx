'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTimeData } from '@/hooks/useTimeData';
import { Search, Menu, X, Globe, Clock, MapPin } from 'lucide-react';
import { HolographicSearch } from './HolographicSearch';

export function HoloTimeBar() {
  const timeData = useTimeData();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div
          className="backdrop-blur-xl border-b mx-4 mt-3 rounded-xl px-6 py-3"
          style={{
            background: 'rgba(5, 5, 25, 0.55)',
            borderColor: 'rgba(79, 195, 247, 0.15)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(79,195,247,0.1)',
          }}
        >
          {/* Scan line */}
          <div
            className="absolute top-0 left-0 right-0 h-px pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(79,195,247,0.4), transparent)',
              animation: 'scan 3s linear infinite',
              backgroundSize: '200% 100%',
            }}
          />

          <div className="flex items-center justify-between gap-4">
            {/* Left: Star date */}
            <div className="flex items-center gap-4">
              <Clock className="w-4 h-4 text-space-blue/60" />
              <div className="flex items-center gap-3">
                <span className="font-orbitron text-xs tracking-widest text-space-blue/70">
                  {timeData.starDate}
                </span>
                <span className="w-px h-4 bg-space-border/30" />
                <span className="font-space text-xs text-space-ice/50">
                  {timeData.localTime}
                </span>
              </div>
            </div>

            {/* Center: Cosmic coordinate */}
            <div className="hidden md:flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-space-purple/50" />
              <span className="font-orbitron text-xs tracking-widest text-space-purple/50">
                {timeData.cosmicCoordinate}
              </span>
              <span className="w-px h-4 bg-space-border/30" />
              <Globe className="w-3.5 h-3.5 text-space-ice/40" />
              <span className="font-space text-xs text-space-ice/40">
                {timeData.timezone}
              </span>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
              >
                <Search className="w-4 h-4 text-space-ice/50" />
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
              >
                {menuOpen ? (
                  <X className="w-4 h-4 text-space-ice/50" />
                ) : (
                  <Menu className="w-4 h-4 text-space-ice/50" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mt-3 pt-3 border-t border-space-border/20"
              >
                <div className="flex flex-col gap-2 py-2">
                  <NavItem label="星系概览" />
                  <NavItem label="星际任务" />
                  <NavItem label="时空档案" />
                  <NavItem label="通讯频道" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <AnimatePresence>
        {searchOpen && <HolographicSearch onClose={() => setSearchOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

function NavItem({ label }: { label: string }) {
  return (
    <button className="text-left px-3 py-2 text-sm text-space-ice/60 hover:text-space-blue/80 hover:bg-white/5 rounded-lg transition-all font-space tracking-wide">
      {label}
    </button>
  );
}