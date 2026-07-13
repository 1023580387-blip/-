"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HologramVideoProps {
  src: string;
  className?: string;
  videoClassName?: string;
}

export default function HologramVideo({
  src,
  className,
  videoClassName,
}: HologramVideoProps) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.015, 1],
        boxShadow: [
          "0 0 0 rgba(34,211,238,0)",
          "0 0 24px rgba(34,211,238,0.18)",
          "0 0 0 rgba(34,211,238,0)",
        ],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={cn(
        "relative overflow-hidden rounded-xl border border-white/15 bg-white/5 p-1 backdrop-blur-md",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-ice/10 via-transparent to-white/5" />
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className={cn(
          "relative z-10 h-full w-full rounded-lg object-cover opacity-80",
          videoClassName
        )}
      />
    </motion.div>
  );
}
