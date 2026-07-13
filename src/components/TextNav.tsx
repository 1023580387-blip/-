import React from 'react';
import { Menu } from 'lucide-react';

const TextNav: React.FC = () => {
  const navItems = ['产品', '技术', '解决方案', '关于我们', '联系我们'];

  return (
    <div className="fixed top-0 left-0 right-0 z-30 px-8 py-6">
      <div className="flex items-center justify-between max-w-full">
        {/* Logo - 透明全息发光字体 */}
        <div className="relative group">
          <h1 className="text-3xl font-extralight tracking-widest text-white/80 font-futuristic drop-shadow-[0_0_10px_rgba(79,240,255,0.5)]">
            NEXUS<span className="text-neon-cyan/80">AI</span>
          </h1>
          <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan/0 via-neon-cyan/20 to-neon-cyan/0 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </div>

        {/* 导航项 */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className="text-sm font-light tracking-wide text-white/60 hover:text-neon-cyan transition-colors duration-300 relative group"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-neon-cyan/0 via-neon-cyan to-neon-cyan/0 group-hover:w-full transition-all duration-500" />
            </a>
          ))}
        </nav>

        {/* 移动端菜单按钮 */}
        <button className="md:hidden p-2 glass-panel rounded-lg">
          <Menu className="w-5 h-5 text-white/70" />
        </button>
      </div>
    </div>
  );
};

export default TextNav;
