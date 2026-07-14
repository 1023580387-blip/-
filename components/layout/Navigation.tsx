'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const navItems = [
  { href: '/', label: '星系总览' },
  { href: '/planets', label: '星体算力' },
  { href: '/orbit', label: '星际航道' },
  { href: '/archive', label: '星际资料' },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div className="neon-glass rounded-full px-8 py-4 flex gap-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative px-4 py-2 text-sm font-mono uppercase tracking-wider transition-colors"
            >
              <span className={isActive ? 'text-cyber-cyan' : 'text-white/70 hover:text-white'}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-full border-2 border-cyber-cyan"
                  style={{ boxShadow: '0 0 10px #00e5ff, 0 0 20px #00e5ff' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
