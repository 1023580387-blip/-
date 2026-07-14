'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useGalaxyStore } from '@/store/galaxyStore';
import { Planet as PlanetType } from '@/types';
import PlanetComponent from './Planet';
import PlanetTooltip from './PlanetTooltip';
import { orbits } from '@/data/orbits';

interface GalaxyCanvasProps {
  compact?: boolean;
}

export default function GalaxyCanvas({ compact = false }: GalaxyCanvasProps) {
  const { scale, offsetX, offsetY, setScale, setOffset, hoveredPlanet, setHoveredPlanet, setSelectedPlanet } = useGalaxyStore();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  // 动画循环 - 驱动星球公转
  useEffect(() => {
    const animate = () => {
      setTime((prev) => prev + 1);
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // 鼠标滚轮缩放
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale(scale + delta);
  };

  // 拖拽开始
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offsetX, y: e.clientY - offsetY });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  // 拖拽中
  const handlePointerMove = (e: React.PointerEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    if (isDragging) {
      setOffset(e.clientX - dragStart.x, e.clientY - dragStart.y);
    }
  };

  // 拖拽结束
  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // 星球点击
  const handlePlanetClick = (planet: PlanetType) => {
    setSelectedPlanet(planet);
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${compact ? 'h-[600px]' : 'h-screen'}`}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      style={{ cursor: isDragging ? 'grabbing' : 'grab', touchAction: 'none' }}
    >
      {/* 星系画布容器 */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`,
          transition: isDragging ? 'none' : 'transform 0.1s ease-out',
        }}
      >
        {/* 中心恒星 */}
        <div
          className="absolute rounded-full breathe"
          style={{
            width: '60px',
            height: '60px',
            background: 'radial-gradient(circle, #5BA3F0 0%, #4A90E2 50%, transparent 100%)',
            boxShadow: '0 0 60px rgba(74, 144, 226, 0.8)',
          }}
        />

        {/* 轨道和星球 */}
        {orbits.map((orbit) => (
          <div key={orbit.id}>
            {/* 轨道环线 */}
            <div
              className="absolute rounded-full"
              style={{
                width: `${orbit.radius * 2}px`,
                height: `${orbit.radius * 2}px`,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                border: '1px solid rgba(192, 192, 192, 0.12)',
                boxShadow: '0 0 8px rgba(192, 192, 192, 0.08)',
              }}
            />

            {/* 轨道标签 */}
            {!compact && orbit.label && (
              <div
                className="absolute text-xs font-share-tech text-deep-space-silver-dark/60"
                style={{
                  top: `calc(50% - ${orbit.radius}px - 20px)`,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  whiteSpace: 'nowrap',
                }}
              >
                {orbit.label}
              </div>
            )}

            {/* 星球 */}
            {orbit.planets.map((planet) => {
              const angle = time * planet.orbitSpeed;
              const x = Math.cos(angle) * orbit.radius;
              const y = Math.sin(angle) * orbit.radius;

              return (
                <PlanetComponent
                  key={planet.id}
                  planet={planet}
                  x={x}
                  y={y}
                  onHover={setHoveredPlanet}
                  onClick={handlePlanetClick}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* 星球信息面板 */}
      <PlanetTooltip planet={hoveredPlanet} position={mousePosition} />
    </div>
  );
}
