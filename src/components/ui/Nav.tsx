'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Globe, Route, Archive } from 'lucide-react';

const navItems = [
  { href: '/', label: '星际总览', icon: Home },
  { href: '/planets', label: '星体数据', icon: Globe },
  { href: '/orbit', label: '星际航线', icon: Route },
  { href: '/archive', label: '时空档案', icon: Archive },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden md:block"
    >
      <div className="glass-card rounded-lg p-2 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className="block group"
              title={item.label}
            >
              <motion.div
                className={`relative p-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-deep-space-blue/20 text-deep-space-blue-light'
                    : 'text-deep-space-silver hover:bg-white/5 hover:text-deep-space-blue-light'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={20} />
                
                {/* 激活指示器 */}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-deep-space-blue/20 rounded-lg"
                    style={{ zIndex: -1 }}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
