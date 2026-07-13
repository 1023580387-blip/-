import { motion } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";

const SCENE_COUNT = 3;

export default function SceneIndicator() {
  const { currentScene, setScene, isPreloading } = useAppStore();

  if (isPreloading) return null;

  return (
    <motion.div
      className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      {Array.from({ length: SCENE_COUNT }).map((_, i) => (
        <button
          key={i}
          onClick={() => setScene(i)}
          className="relative group cursor-pointer p-2"
          aria-label={`Scene ${i + 1}`}
        >
          <motion.div
            className={`w-2 h-2 rounded-full transition-colors duration-500 ${
              i === currentScene
                ? "bg-cyan-glow"
                : "bg-titanium-600/40 hover:bg-titanium-500/60"
            }`}
            animate={
              i === currentScene
                ? {
                    boxShadow: [
                      "0 0 6px rgba(163,213,224,0.4)",
                      "0 0 14px rgba(163,213,224,0.7)",
                      "0 0 6px rgba(163,213,224,0.4)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 rounded-full bg-cyan-glow/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      ))}

      <div className="w-px h-8 bg-gradient-to-b from-transparent via-titanium-600/30 to-transparent mt-1" />
    </motion.div>
  );
}