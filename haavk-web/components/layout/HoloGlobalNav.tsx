'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navigation } from '@/data/navigation';

export default function HoloGlobalNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'frosted-nav shadow-lg shadow-black/30' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 border border-haavk-silver/30 flex items-center justify-center rotate-45 group-hover:border-haavk-ice/60 transition-colors duration-500">
            <div className="w-3 h-3 bg-haavk-ice/40 -rotate-45 group-hover:bg-haavk-ice/70 transition-colors duration-500" />
          </div>
          <div>
            <span className="font-orbitron font-bold text-sm tracking-[0.2em] text-haavk-silver group-hover:text-haavk-ice transition-colors duration-500">
              HAAVK
            </span>
            <span className="block text-[10px] tracking-[0.3em] text-haavk-platinum/60 font-rajdhani">
              GLOBAL DEFENSE
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 text-xs tracking-[0.15em] font-rajdhani font-medium transition-colors duration-300 ${
                  isActive
                    ? 'text-haavk-ice'
                    : 'text-haavk-platinum/70 hover:text-haavk-silver'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-2 right-2 h-[1px] bg-haavk-ice/60"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-haavk-silver/70 hover:text-haavk-ice transition-colors"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden frosted-nav border-t border-haavk-border/30 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-3 text-sm tracking-[0.15em] font-rajdhani font-medium transition-colors ${
                      isActive
                        ? 'text-haavk-ice border-l-2 border-haavk-ice/60 pl-3'
                        : 'text-haavk-platinum/70 hover:text-haavk-silver border-l-2 border-transparent pl-3'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}