'use client';

import { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useGalaxyStore } from '@/store/useGalaxyStore';
import { useGalaxyDrag } from '@/hooks/useGalaxyDrag';
import { planets, orbitalRings } from '@/utils/planetData';
import { Planet } from './Planet';
import { PlanetTooltip } from './PlanetTooltip';

export function GalaxyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>();
  const rotation = useGalaxyStore((s) => s.rotation);
  const hoveredPlanet = useGalaxyStore((s) => s.hoveredPlanet);
  const setHoveredPlanet = useGalaxyStore((s) => s.setHoveredPlanet);
  const { isDragging, handlePointerDown, handlePointerMove, handlePointerUp } = useGalaxyDrag();

  const [planetList, ringList] = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const scale = isMobile ? 0.5 : 1;
    const scaledPlanets = planets.map((p) => ({
      ...p,
      orbitRadius: p.orbitRadius * scale,
      size: p.size * scale,
    }));
    const scaledRings = orbitalRings.map((r) => ({
      ...r,
      radius: r.radius * scale,
    }));
    return [scaledPlanets, scaledRings];
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    function animate() {
      time += 0.005;
      const w = canvas!.width;
      const h = canvas!.height;
      ctx!.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // Draw orbital rings
      ringList.forEach((ring) => {
        ctx!.beginPath();
        ctx!.ellipse(
          cx + rotation.y * 50 * (ring.radius / 350),
          cy + rotation.x * 50 * (ring.radius / 350),
          ring.radius,
          ring.radius * 0.35,
          0,
          0,
          Math.PI * 2
        );
        ctx!.strokeStyle = `rgba(79, 195, 247, ${ring.opacity})`;
        ctx!.lineWidth = 0.5;
        ctx!.stroke();

        // Orbital flow
        const dashOffset = (time * ring.speed * 100) % 16;
        ctx!.beginPath();
        ctx!.ellipse(
          cx + rotation.y * 50 * (ring.radius / 350),
          cy + rotation.x * 50 * (ring.radius / 350),
          ring.radius,
          ring.radius * 0.35,
          0,
          0,
          Math.PI * 2
        );
        ctx!.setLineDash([4, 12]);
        ctx!.lineDashOffset = -dashOffset;
        ctx!.strokeStyle = `rgba(79, 195, 247, ${ring.opacity * 2})`;
        ctx!.lineWidth = 0.8;
        ctx!.stroke();
        ctx!.setLineDash([]);
      });

      animRef.current = requestAnimationFrame(animate);
    }

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [ringList, rotation]);

  const hoveredPlanetData = planetList.find((p) => p.id === hoveredPlanet);

  return (
    <motion.div
      className="absolute inset-0 z-10"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Central star */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
        <div
          className="rounded-full"
          style={{
            width: 12,
            height: 12,
            background: 'radial-gradient(circle, rgba(255,255,255,0.9), rgba(79,195,247,0.5), transparent)',
            boxShadow: '0 0 40px rgba(124, 77, 255, 0.4), 0 0 80px rgba(79, 195, 247, 0.2)',
          }}
        />
      </div>

      {/* Planets */}
      {planetList.map((planet) => (
        <Planet
          key={planet.id}
          planet={planet}
          angle={planet.angle + planet.orbitSpeed * 0.5}
          isHovered={hoveredPlanet === planet.id}
          onHover={setHoveredPlanet}
        />
      ))}

      {/* Tooltip */}
      {hoveredPlanetData && (
        <PlanetTooltip
          planet={hoveredPlanetData}
          x={Math.cos(hoveredPlanetData.angle + hoveredPlanetData.orbitSpeed * 0.5) * hoveredPlanetData.orbitRadius}
          y={Math.sin(hoveredPlanetData.angle + hoveredPlanetData.orbitSpeed * 0.5) * hoveredPlanetData.orbitRadius}
        />
      )}

      {/* Center indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <p className="text-space-ice/40 text-xs font-space tracking-widest animate-breath">
          DRAG TO EXPLORE · 拖拽探索星系
        </p>
      </div>
    </motion.div>
  );
}