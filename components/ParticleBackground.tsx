"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  yShift: number;
  xShift: number;
}

interface Stream {
  id: number;
  position: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function ParticleBackground({
  variant,
}: {
  variant: "home" | "products" | "compute" | "about";
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const particles = useMemo<Particle[]>(() => {
    if (!mounted) return [];
    const count = variant === "about" ? 30 : 45;
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.35 + 0.1,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 8,
      yShift: (Math.random() - 0.5) * 12,
      xShift: (Math.random() - 0.5) * 8,
    }));
  }, [mounted, variant]);

  const streams = useMemo<Stream[]>(() => {
    if (!mounted) return [];
    const isVertical = variant === "compute";
    const count = isVertical ? 6 : variant === "home" ? 5 : 0;
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      position: Math.random() * 90 + 5,
      size: Math.random() * 1.5 + 0.5,
      duration: Math.random() * 6 + 6,
      delay: Math.random() * 6,
      opacity: Math.random() * 0.25 + 0.1,
    }));
  }, [mounted, variant]);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* 丝绸纹理（仅品牌页） */}
      {variant === "about" && (
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -left-1/2 -top-1/2 h-[200%] w-[200%] bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.04),transparent_40%),radial-gradient(circle_at_70%_70%,rgba(34,211,238,0.03),transparent_45%)]" />
        </div>
      )}

      {/* 数据流光带 */}
      {streams.map((stream) =>
        variant === "compute" ? (
          <motion.div
            key={`v-${stream.id}`}
            initial={{ y: "-20%", opacity: 0 }}
            animate={{ y: "120%", opacity: [0, stream.opacity, stream.opacity, 0] }}
            transition={{
              duration: stream.duration,
              repeat: Infinity,
              delay: stream.delay,
              ease: "linear",
            }}
            style={{
              left: `${stream.position}%`,
              width: `${stream.size}px`,
            }}
            className="absolute top-0 h-[30vh] rounded-full bg-gradient-to-b from-transparent via-ice/60 to-transparent blur-[2px]"
          />
        ) : (
          <motion.div
            key={`h-${stream.id}`}
            initial={{ x: "-20%", opacity: 0 }}
            animate={{ x: "120%", opacity: [0, stream.opacity, stream.opacity, 0] }}
            transition={{
              duration: stream.duration,
              repeat: Infinity,
              delay: stream.delay,
              ease: "linear",
            }}
            style={{
              top: `${stream.position}%`,
              height: `${stream.size}px`,
            }}
            className="absolute left-0 w-[25vw] rounded-full bg-gradient-to-r from-transparent via-ice/50 to-transparent blur-[2px]"
          />
        )
      )}

      {/* 漂浮粒子 */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, p.opacity, p.opacity, 0],
            y: ["0vh", `${p.yShift}vh`],
            x: ["0vw", `${p.xShift}vw`],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            repeatType: "reverse",
            delay: p.delay,
            ease: "easeInOut",
          }}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          className="absolute rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.4)]"
        />
      ))}
    </div>
  );
}
