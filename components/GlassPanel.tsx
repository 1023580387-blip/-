"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassPanelProps {
  children?: React.ReactNode;
  className?: string;
  float?: boolean;
  intensity?: "low" | "normal" | "high";
}

export default function GlassPanel({
  children,
  className,
  float = true,
  intensity = "normal",
}: GlassPanelProps) {
  const blur = intensity === "high" ? "backdrop-blur-2xl" : intensity === "low" ? "backdrop-blur-md" : "backdrop-blur-xl";

  return (
    <motion.div
      animate={
        float
          ? {
              y: [0, 8, 0],
              scale: [1, 1.005, 1],
            }
          : undefined
      }
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl",
        blur,
        className
      )}
    >
      {/* 玻璃高光 */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.12] via-transparent to-transparent" />
      {/* 水波纹折射感 */}
      <div className="pointer-events-none absolute -inset-[100%] animate-shimmer bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.04)_45%,rgba(34,211,238,0.03)_55%,transparent_75%)] bg-[length:200%_100%]" />
      <div className="relative z-10 h-full w-full">{children}</div>
    </motion.div>
  );
}
