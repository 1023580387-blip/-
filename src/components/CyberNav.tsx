'use client';

// ========================================
// 右侧隐藏悬浮霓虹导航条
// 鼠标靠近缓慢滑出菜单，极细霓虹金属细条
// ========================================
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/utils/constants';
import { Home, Cpu, Server, Clock, Briefcase, MessageSquare } from 'lucide-react';

// 图标映射
const iconMap: Record<string, React.ReactNode> = {
  Home: <Home size={18} />,
  Cpu: <Cpu size={18} />,
  Server: <Server size={18} />,
  Clock: <Clock size={18} />,
  Briefcase: <Briefcase size={18} />,
  MessageSquare: <MessageSquare size={18} />,
};

export default function CyberNav() {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsHovered(false), 500);
  };

  return (
    <div
      className="fixed right-0 top-0 h-full z-[100] flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 触发条 - 极细霓虹金属细条 */}
      <motion.div
        className="absolute right-0 top-0 w-[3px] h-full cursor-pointer"
        style={{
          background: 'linear-gradient(to bottom, transparent, var(--neon-primary), transparent)',
          boxShadow: '0 0 8px var(--neon-primary)',
        }}
        animate={{ opacity: isHovered ? 0 : 0.6 }}
      />

      {/* 滑出菜单面板 */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="relative mr-2 py-8 px-3 glass-panel rounded-l-xl"
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 200, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          >
            <nav className="flex flex-col gap-3">
              {NAV_ITEMS.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-300 group ${
                        isActive
                          ? 'bg-cyan-neon/10 border border-cyan-neon/30'
                          : 'hover:bg-cyan-neon/5 border border-transparent'
                      }`}
                    >
                      <span
                        className={`transition-colors duration-300 ${
                          isActive ? 'text-cyan-neon' : 'text-cyan-neon/50 group-hover:text-cyan-neon'
                        }`}
                        style={{
                          filter: isActive ? 'drop-shadow(0 0 6px var(--neon-primary))' : 'none',
                        }}
                      >
                        {iconMap[item.icon]}
                      </span>
                      <span
                        className={`font-body text-sm tracking-wider whitespace-nowrap transition-colors duration-300 ${
                          isActive
                            ? 'text-cyan-neon'
                            : 'text-gray-400 group-hover:text-cyan-neon'
                        }`}
                        style={{
                          textShadow: isActive ? '0 0 8px var(--neon-primary)' : 'none',
                        }}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* 导航条底部霓虹线 */}
            <div className="mt-4 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-neon/30 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}