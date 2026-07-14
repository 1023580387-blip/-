'use client';

import { useEffect, useRef } from 'react';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';

export function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useDeviceDetection();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particleCount = isMobile ? 80 : 250;
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      opacity: number;
      opacitySpeed: number;
      color: string;
    }> = [];

    const colors = ['#00e5ff', '#ff2b86', '#a855f7'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        opacity: Math.random(),
        opacitySpeed: 0.005 + Math.random() * 0.01,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.opacity += particle.opacitySpeed;
        if (particle.opacity > 1 || particle.opacity < 0) {
          particle.opacitySpeed *= -1;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'linear-gradient(135deg, #000000 0%, #0a001a 50%, #1a0033 100%)' }}
    />
  );
}
