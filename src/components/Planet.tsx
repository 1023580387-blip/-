'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { PlanetData } from '@/utils/planetData';

interface Props {
  planet: PlanetData;
  angle: number;
  isHovered: boolean;
  onHover: (id: string | null) => void;
}

export function Planet({ planet, angle, isHovered, onHover }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>();

  const x = Math.cos(angle) * planet.orbitRadius;
  const y = Math.sin(angle) * planet.orbitRadius;
  const scale = isHovered ? 1.5 : 1;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = planet.size * 2;
    canvas.width = size;
    canvas.height = size;

    const cx = size / 2;
    const cy = size / 2;
    const radius = planet.size * 0.8;

    function drawPlanet(t: number) {
      ctx!.clearRect(0, 0, size, size);

      const baseGrad = ctx!.createRadialGradient(cx - radius * 0.2, cy - radius * 0.2, 0, cx, cy, radius);
      baseGrad.addColorStop(0, lightenColor(planet.color, 40));
      baseGrad.addColorStop(0.4, planet.color);
      baseGrad.addColorStop(0.8, darkenColor(planet.color, 40));
      baseGrad.addColorStop(1, darkenColor(planet.color, 60));

      ctx!.beginPath();
      ctx!.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx!.fillStyle = baseGrad;
      ctx!.fill();

      ctx!.save();
      ctx!.beginPath();
      ctx!.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx!.clip();

      for (let i = 0; i < 8; i++) {
        const tx = cx + Math.sin(i * 1.7 + t * 0.5) * radius * 0.6;
        const ty = cy + Math.cos(i * 2.3 + t * 0.4) * radius * 0.5;
        const spotGrad = ctx!.createRadialGradient(tx, ty, 0, tx, ty, radius * 0.4);
        spotGrad.addColorStop(0, `rgba(255, 255, 255, ${0.08 + 0.04 * Math.sin(t + i)})`);
        spotGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx!.fillStyle = spotGrad;
        ctx!.fillRect(tx - radius * 0.4, ty - radius * 0.4, radius * 0.8, radius * 0.8);
      }

      const shadowGrad = ctx!.createLinearGradient(cx - radius, cy, cx + radius, cy);
      shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
      shadowGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.15)');
      shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0.5)');
      ctx!.fillStyle = shadowGrad;
      ctx!.fillRect(0, 0, size, size);

      ctx!.restore();

      const glowGrad = ctx!.createRadialGradient(cx, cy, radius * 0.85, cx, cy, radius * 1.15);
      glowGrad.addColorStop(0, planet.glowColor);
      glowGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx!.beginPath();
      ctx!.arc(cx, cy, radius * 1.15, 0, Math.PI * 2);
      ctx!.fillStyle = glowGrad;
      ctx!.fill();
    }

    let localTime = 0;
    function animate() {
      localTime += planet.rotationSpeed * 0.01;
      drawPlanet(localTime);
      animRef.current = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [planet]);

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `calc(50% + ${x}px - ${planet.size}px)`,
        top: `calc(50% + ${y}px - ${planet.size}px)`,
        width: planet.size * 2,
        height: planet.size * 2,
      }}
      animate={{
        scale,
        x: isHovered ? (x > 0 ? 20 : -20) : 0,
        y: isHovered ? (y > 0 ? 20 : -20) : 0,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      onHoverStart={() => onHover(planet.id)}
      onHoverEnd={() => onHover(null)}
      whileHover={{ zIndex: 50 }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute -inset-4 rounded-full pointer-events-none"
          style={{
            background: `conic-gradient(from 0deg, transparent, ${planet.glowColor}, transparent, ${planet.glowColor}, transparent)`,
            animation: 'spin 3s linear infinite',
          }}
        />
      )}
    </motion.div>
  );
}

function lightenColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, (num >> 16) + percent);
  const g = Math.min(255, ((num >> 8) & 0x00ff) + percent);
  const b = Math.min(255, (num & 0x0000ff) + percent);
  return `rgb(${r},${g},${b})`;
}

function darkenColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, (num >> 16) - percent);
  const g = Math.max(0, ((num >> 8) & 0x00ff) - percent);
  const b = Math.max(0, (num & 0x0000ff) - percent);
  return `rgb(${r},${g},${b})`;
}