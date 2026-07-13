import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="relative border-t border-white/5 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
            <span className="text-white font-bold text-xs">D</span>
          </div>
          <span className="text-white font-semibold text-sm">
            Dark<span className="text-neon-blue">Tech</span>
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <a href="#" className="hover:text-neon-blue transition-colors">Privacy</a>
          <a href="#" className="hover:text-neon-blue transition-colors">Terms</a>
          <a href="#" className="hover:text-neon-blue transition-colors">Status</a>
          <a href="#" className="hover:text-neon-blue transition-colors">Twitter</a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} DarkTech. All rights reserved.
        </p>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neon-blue/30 to-transparent" />
    </footer>
  );
};

export default Footer;