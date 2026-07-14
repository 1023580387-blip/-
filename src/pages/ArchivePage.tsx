import { motion } from "framer-motion";
import ArchiveTimeline from "../components/archive/ArchiveTimeline";

export default function ArchivePage() {
  return (
    <main className="bg-tracks min-h-screen pt-24 lg:pt-28 pb-16">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Page Header */}
        <motion.div
          className="mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[10px] tracking-[0.4em] text-havok-accent/60 uppercase block mb-3">
            Heritage
          </span>
          <h1 className="font-display text-display-md text-havok-gold leading-tight">
            Brand Archive
          </h1>
          <p className="text-havok-platinum/40 text-sm tracking-wider mt-2 max-w-md">
            A century of excellence. Trace the defining moments of the world's most prestigious maisons.
          </p>
        </motion.div>

        <ArchiveTimeline />
      </div>
    </main>
  );
}