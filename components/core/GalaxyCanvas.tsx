'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { PlanetData } from '@/types';
import { PlanetTooltip } from './PlanetTooltip';

interface GalaxyCanvasProps {
  planets: PlanetData[];
  interactive?: boolean;
  className?: string;
  onPlanetClick?: (planet: PlanetData) => void;
}

interface Transform {
  scale: number;
  offsetX: number;
  offsetY: number;
}

export function GalaxyCanvas({ 
  planets, 
  interactive = true, 
  className = '',
  onPlanetClick 
}: GalaxyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);
  const [hoveredPlanet, setHoveredPlanet] = useState<PlanetData | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const transformRef = useRef<Transform>({ scale: 1, offsetX: 0, offsetY: 0 });
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });

  const getOrbitRadius = useCallback((orbitIndex: number, canvasWidth: number, canvasHeight: number) => {
    const minDim = Math.min(canvasWidth, canvasHeight);
    const baseRadius = minDim * 0.12;
    return baseRadius + orbitIndex * (minDim * 0.1);
  }, []);

  const getPlanetPosition = useCallback((planet: PlanetData, time: number, canvasWidth: number, canvasHeight: number) => {
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    const radius = getOrbitRadius(planet.orbitIndex, canvasWidth, canvasHeight);
    const angle = planet.angle + time * planet.speed;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  }, [getOrbitRadius]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      timeRef.current += 1;
      const time = timeRef.current;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const centerX = w / 2;
      const centerY = h / 2;
      const transform = transformRef.current;

      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(transform.offsetX, transform.offsetY);
      ctx.scale(transform.scale, transform.scale);

      const maxOrbit = Math.max(...planets.map(p => p.orbitIndex), 3);
      
      for (let i = 0; i <= maxOrbit; i++) {
        const radius = getOrbitRadius(i, w, h);
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = i % 2 === 0 ? 'rgba(0, 229, 255, 0.3)' : 'rgba(168, 85, 247, 0.3)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        const scanAngle = (time * 0.01 + i * 0.5) % (Math.PI * 2);
        const scanLength = Math.PI * 0.3;
        const gradient = ctx.createConicGradient(scanAngle, centerX, centerY);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.05, i % 2 === 0 ? '#00e5ff' : '#a855f7');
        gradient.addColorStop(0.1, 'transparent');
        gradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      const nebulaGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.min(w, h) * 0.4);
      nebulaGradient.addColorStop(0, 'rgba(255, 43, 134, 0.1)');
      nebulaGradient.addColorStop(0.5, 'rgba(0, 229, 255, 0.05)');
      nebulaGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = nebulaGradient;
      ctx.fillRect(0, 0, w, h);

      planets.forEach((planet) => {
        const pos = getPlanetPosition(planet, time, w, h);
        const pulse = 0.7 + 0.3 * Math.sin(time * 0.05 + planet.angle);

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, planet.radius, 0, Math.PI * 2);
        const planetGrad = ctx.createRadialGradient(
          pos.x - planet.radius * 0.3, 
          pos.y - planet.radius * 0.3, 
          0, 
          pos.x, 
          pos.y, 
          planet.radius
        );
        planetGrad.addColorStop(0, planet.color);
        planetGrad.addColorStop(0.7, planet.color + '80');
        planetGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = planetGrad;
        ctx.globalAlpha = pulse;
        ctx.fill();
        ctx.globalAlpha = 1;

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, planet.radius * 0.8, 0, Math.PI * 2);
        ctx.strokeStyle = planet.color;
        ctx.lineWidth = 1;
        ctx.globalAlpha = pulse * 0.8;
        ctx.stroke();
        ctx.globalAlpha = 1;

        for (let i = 0; i < 3; i++) {
          const lineAngle = (time * 0.02 + i * Math.PI * 0.66) % (Math.PI * 2);
          const lineLen = planet.radius * 0.6;
          ctx.beginPath();
          ctx.moveTo(
            pos.x + Math.cos(lineAngle) * planet.radius * 0.3,
            pos.y + Math.sin(lineAngle) * planet.radius * 0.3
          );
          ctx.lineTo(
            pos.x + Math.cos(lineAngle) * lineLen,
            pos.y + Math.sin(lineAngle) * lineLen
          );
          ctx.strokeStyle = planet.color;
          ctx.globalAlpha = pulse * 0.5;
          ctx.lineWidth = 0.5;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, planet.radius * 1.5, 0, Math.PI * 2);
        ctx.shadowColor = planet.color;
        ctx.shadowBlur = 20;
        ctx.strokeStyle = planet.color + '40';
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      ctx.restore();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [planets, getOrbitRadius, getPlanetPosition]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (isDraggingRef.current && interactive) {
      const dx = mouseX - lastMouseRef.current.x;
      const dy = mouseY - lastMouseRef.current.y;
      transformRef.current.offsetX += dx;
      transformRef.current.offsetY += dy;
      lastMouseRef.current = { x: mouseX, y: mouseY };
      return;
    }

    const w = rect.width;
    const h = rect.height;
    const transform = transformRef.current;

    let found: PlanetData | null = null;
    planets.forEach((planet) => {
      const pos = getPlanetPosition(planet, timeRef.current, w, h);
      const adjustedX = pos.x * transform.scale + transform.offsetX;
      const adjustedY = pos.y * transform.scale + transform.offsetY;
      const dist = Math.sqrt((mouseX - adjustedX) ** 2 + (mouseY - adjustedY) ** 2);
      if (dist < planet.radius * transform.scale * 1.5) {
        found = planet;
        setTooltipPos({ x: e.clientX, y: e.clientY });
      }
    });

    setHoveredPlanet(found);
  }, [planets, interactive, getPlanetPosition]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!interactive) return;
    isDraggingRef.current = true;
    const rect = canvasRef.current!.getBoundingClientRect();
    lastMouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, [interactive]);

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent<HTMLCanvasElement>) => {
    if (!interactive) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    transformRef.current.scale = Math.max(0.5, Math.min(3, transformRef.current.scale * delta));
  }, [interactive]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!hoveredPlanet || !onPlanetClick) return;
    onPlanetClick(hoveredPlanet);
  }, [hoveredPlanet, onPlanetClick]);

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          handleMouseUp();
          setHoveredPlanet(null);
        }}
        onWheel={handleWheel}
        onClick={handleClick}
      />
      {hoveredPlanet && (
        <PlanetTooltip
          data={hoveredPlanet}
          position={tooltipPos}
          visible={true}
        />
      )}
    </div>
  );
}
