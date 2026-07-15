import { motion } from 'framer-motion';
import HexagonLogo from '@/components/common/HexagonLogo';
import { useAppStore } from '@/store/useAppStore';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const { incrementHiddenClick, hiddenClickCount } = useAppStore();
  const navigate = useNavigate();

  const handleHiddenClick = () => {
    incrementHiddenClick();
    if (hiddenClickCount >= 4) {
      navigate('/admin');
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-havoc-black">
      {/* Background code flow animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,255,0.1),transparent_70%)]" />
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300d4ff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="w-full h-px bg-gradient-to-r from-transparent via-havoc-blue to-transparent"
          animate={{
            y: ['-100%', '100%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <HexagonLogo size="lg" animated />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-orbitron text-6xl font-bold text-gradient mb-6"
        >
          HAVOC CORPORATION
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-rajdhani text-2xl text-white/80 mb-12"
        >
          Technology for a Better Tomorrow.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <button className="px-8 py-3 bg-havoc-blue/10 border border-havoc-blue/50 text-havoc-blue font-rajdhani text-lg rounded hover:bg-havoc-blue/20 hover:border-havoc-blue transition-all glow-border-hover">
            播放CG短片《秩序之源》
          </button>
        </motion.div>
      </div>

      {/* Hidden trigger area */}
      <div
        className="absolute bottom-20 right-20 w-20 h-20 cursor-pointer opacity-0"
        onClick={handleHiddenClick}
        title=""
      />
    </section>
  );
}
