import { motion } from "framer-motion";
import WorldMapCanvas from "../components/stores/WorldMapCanvas";

export default function StoresPage() {
  return (
    <main className="bg-tracks min-h-screen pt-24 lg:pt-28 pb-16">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Page Header */}
        <motion.div
          className="mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[10px] tracking-[0.4em] text-havok-accent/60 uppercase block mb-3">
            Global Presence
          </span>
          <h1 className="font-display text-display-md text-havok-gold leading-tight">
            Worldwide Boutiques
          </h1>
          <p className="text-havok-platinum/40 text-sm tracking-wider mt-2 max-w-md">
            Twelve flagship locations across four continents. Select a region to explore.
          </p>
        </motion.div>

        <WorldMapCanvas />
      </div>
    </main>
  );
}