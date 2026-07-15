import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import HexagonLogo from '@/components/common/HexagonLogo';

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '首页' },
    { path: '/about', label: '关于我们' },
    { path: '/products', label: '产品矩阵' },
    { path: '/careers', label: '人才网' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-havoc-black/80 backdrop-blur-md border-b border-havoc-blue/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <HexagonLogo size="sm" />
          <span className="font-orbitron text-xl font-bold text-gradient">
            HAVOC
          </span>
        </Link>

        <div className="flex gap-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative font-rajdhani text-lg font-medium text-white/80 hover:text-havoc-blue transition-colors"
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-havoc-blue"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
