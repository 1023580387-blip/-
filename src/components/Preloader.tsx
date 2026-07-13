import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { useEffect } from "react";

function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-0.5 rounded-full bg-cyan-glow/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function Preloader() {
  const { isPreloading, finishPreloading } = useAppStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      finishPreloading();
    }, 3000);
    return () => clearTimeout(timer);
  }, [finishPreloading]);

  return (
    <AnimatePresence>
      {isPreloading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-abyss-900 overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="marble-texture" />
          <ParticleField />

          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(163,213,224,0.08) 0%, transparent 70%)",
            }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              className="glass-panel w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center mb-8"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <motion.div
                className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-cyan-glow/20 border border-cyan-glow/30"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(163,213,224,0.2)",
                    "0 0 40px rgba(163,213,224,0.4)",
                    "0 0 20px rgba(163,213,224,0.2)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            <motion.h1
              className="font-serif text-3xl md:text-5xl font-light tracking-[0.2em] text-ice-100 text-glow-cyan"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              NEXUS
            </motion.h1>

            <motion.p
              className="font-sans text-[10px] md:text-xs tracking-[0.4em] text-titanium-500 uppercase mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Premium AI Computing
            </motion.p>

            <motion.div
              className="mt-12 flex gap-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 rounded-full bg-cyan-glow/50"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}