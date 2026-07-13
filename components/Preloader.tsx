"use client";

import { motion } from "framer-motion";

export default function Preloader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
    >
      <div className="relative flex flex-col items-center gap-6">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, scale: 1, letterSpacing: "0.35em" }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(6px)" }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-3xl tracking-[0.35em] text-silver md:text-5xl lg:text-6xl"
        >
          MAISON ÉCLAT
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2.4, ease: "easeInOut", delay: 0.2 }}
          className="h-[1px] w-32 origin-left bg-gradient-to-r from-transparent via-ice to-transparent md:w-48"
        />
      </div>
    </motion.div>
  );
}
