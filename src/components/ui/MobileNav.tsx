'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navItems = [
  { href: '/', label: '星际总览' },
  { href: '/planets', label: '星体数据' },
  { href: '/orbit', label: '星际航线' },
  { href: '/archive', label: '时空档案' },
];

export default function MobileNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-20 right-4 z-40 md:hidden">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="glass-card p-3 rounded-lg text-deep-space-blue-light"
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-lg p-2 mt-2 space-y-1"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-lg text-sm font-rajdhani transition-all ${
                  isActive
                    ? 'bg-deep-space-blue/20 text-deep-space-blue-light'
                    : 'text-deep-space-silver hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
