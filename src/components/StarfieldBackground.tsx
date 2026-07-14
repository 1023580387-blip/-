'use client';

import { useEffect, useRef, useMemo } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  size: number;
  speed: number;
  alpha: number;
}

interface Props {
  count?: number;
}

function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function StarfieldBackground({ count = 2000 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const particles = useMemo(() => {
    const arr: Particle[] = [];
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const actualCount = isMobile ? Math.floor(count * 0.3) : count;

    for (let i = 0; i < actualCount; i++) {
      arr.push({
        x: getRandom(-1, 1),
        y: getRandom(-1, 1),
        z: getRandom(0, 1),
        size: getRandom(0.5, 2),
        speed: getRandom(0.0001, 0.0005),
        alpha: getRandom(0.1, 0.8),
      });
    }
    return arr;
  }, [count]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    let time = 0;
    function animate() {
      time += 0.001;
      ctx!.fillStyle = '#000010';
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      const cx = canvas!.width / 2;
      const cy = canvas!.height / 2;

      // Draw nebula gradient
      const nebula = ctx!.createRadialGradient(
        cx + Math.sin(time * 0.2) * 50,
        cy + Math.cos(time * 0.15) * 30,
        0,
        cx,
        cy,
        Math.max(cx, cy)
      );
      nebula.addColorStop(0, 'rgba(124, 77, 255, 0.05)');
      nebula.addColorStop(0.5, 'rgba(79, 195, 247, 0.02)');
      nebula.addColorStop(1, 'rgba(0, 0, 16, 0)');
      ctx!.fillStyle = nebula;
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      // Draw second nebula
      const nebula2 = ctx!.createRadialGradient(
        cx * 0.3 + Math.cos(time * 0.1) * 30,
        cy * 1.4 + Math.sin(time * 0.2) * 20,
        0,
        cx * 0.3,
        cy * 1.4,
        Math.max(cx, cy) * 0.6
      );
      nebula2.addColorStop(0, 'rgba(0, 229, 255, 0.03)');
      nebula2.addColorStop(0.6, 'rgba(79, 195, 247, 0.01)');
      nebula2.addColorStop(1, 'rgba(0, 0, 16, 0)');
      ctx!.fillStyle = nebula2;
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      // Draw stars
      particles.forEach((p) => {
        const px = cx + p.x * cx * (1 + p.z * 0.5) + Math.sin(time * p.speed * 1000) * 2;
        const py = cy + p.y * cy * (1 + p.z * 0.5) + Math.cos(time * p.speed * 1000) * 2;
        const scale = (1 + p.z);
        const actualSize = p.size * scale;

        ctx!.beginPath();
        ctx!.fillStyle = `rgba(255, 255, 255, ${p.alpha * (0.7 + 0.3 * Math.sin(time * 2 + p.x))})`;
        ctx!.arc(px, py, actualSize, 0, Math.PI * 2);
        ctx!.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen z-0 bg-space-black"
      style={{ display: 'block' }}
    />
  );
}