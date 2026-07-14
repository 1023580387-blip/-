'use client';

import { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { NeonGlassPanel } from '@/components/ui/NeonGlassPanel';
import { DataFlowLine } from '@/components/ui/DataFlowLine';
import { generateOrbitData } from '@/utils/mockData';

export default function OrbitPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);
  const orbitData = useMemo(() => generateOrbitData(), []);

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

      ctx.clearRect(0, 0, w, h);

      const orbitCount = 5;
      for (let i = 0; i < orbitCount; i++) {
        const radius = (Math.min(w, h) * 0.1) + i * (Math.min(w, h) * 0.08);
        const rotation = time * 0.002 * (i % 2 === 0 ? 1 : -1);
        
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(rotation);

        ctx.beginPath();
        ctx.ellipse(0, 0, radius, radius * 0.6, 0, 0, Math.PI * 2);
        ctx.strokeStyle = i % 2 === 0 ? 'rgba(0, 229, 255, 0.4)' : 'rgba(255, 43, 134, 0.4)';
        ctx.lineWidth = 2;
        ctx.stroke();

        const scanAngle = (time * 0.02 + i) % (Math.PI * 2);
        const scanX = radius * Math.cos(scanAngle);
        const scanY = radius * 0.6 * Math.sin(scanAngle);
        
        ctx.beginPath();
        ctx.arc(scanX, scanY, 4, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? '#00e5ff' : '#ff2b86';
        ctx.shadowColor = i % 2 === 0 ? '#00e5ff' : '#ff2b86';
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;

        for (let j = 0; j < 20; j++) {
          const trailAngle = scanAngle - j * 0.05;
          const trailX = radius * Math.cos(trailAngle);
          const trailY = radius * 0.6 * Math.sin(trailAngle);
          ctx.beginPath();
          ctx.arc(trailX, trailY, 2, 0, Math.PI * 2);
          ctx.fillStyle = i % 2 === 0 ? '#00e5ff' : '#ff2b86';
          ctx.globalAlpha = 1 - j / 20;
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        ctx.restore();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen px-8 pb-32">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-mono font-bold text-cyber-cyan mb-2">
            星际航道可视化
          </h1>
          <p className="text-white/50 font-mono text-sm">
            多层扩张霓虹轨道 · 数字化航线参数 · 实时通行计时
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <NeonGlassPanel className="h-[600px]">
              <canvas
                ref={canvasRef}
                className="w-full h-full"
              />
            </NeonGlassPanel>
          </div>

          <div className="space-y-4">
            <NeonGlassPanel>
              <h3 className="text-cyber-cyan font-mono text-sm mb-4 uppercase tracking-wider">
                航道参数
              </h3>
              <div className="space-y-3">
                {orbitData.map((orbit, index) => (
                  <motion.div
                    key={orbit.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 border border-cyber-cyan/20 rounded"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-mono text-white">{orbit.orbitName}</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        orbit.status === 'active' ? 'bg-cyber-cyan/20 text-cyber-cyan' :
                        orbit.status === 'inactive' ? 'bg-cyber-magenta/20 text-cyber-magenta' :
                        'bg-yellow-500/20 text-yellow-500'
                      }`}>
                        {orbit.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div>
                        <span className="text-white/40">距离:</span>
                        <span className="text-cyber-cyan ml-1">{orbit.distance} AU</span>
                      </div>
                      <div>
                        <span className="text-white/40">速度:</span>
                        <span className="text-cyber-magenta ml-1">{orbit.speed} c</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </NeonGlassPanel>

            <NeonGlassPanel glowColor="magenta">
              <h3 className="text-cyber-magenta font-mono text-sm mb-3 uppercase tracking-wider">
                航道计时
              </h3>
              <OrbitTimer />
            </NeonGlassPanel>
          </div>
        </div>
      </div>

      <div className="fixed inset-0 pointer-events-none z-0">
        <DataFlowLine direction="vertical" className="absolute left-1/4" />
        <DataFlowLine direction="vertical" color="magenta" className="absolute right-1/4" />
      </div>
    </div>
  );
}

function OrbitTimer() {
  const timeRef = useRef(0);
  const displayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      timeRef.current += 1;
      if (displayRef.current) {
        const hours = Math.floor(timeRef.current / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((timeRef.current % 3600) / 60).toString().padStart(2, '0');
        const seconds = (timeRef.current % 60).toString().padStart(2, '0');
        displayRef.current.textContent = `${hours}:${minutes}:${seconds}`;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center">
      <div 
        ref={displayRef}
        className="text-3xl font-mono font-bold text-cyber-magenta"
        style={{ textShadow: '0 0 10px #ff2b86' }}
      >
        00:00:00
      </div>
      <div className="text-xs text-white/40 font-mono mt-2">
        航道通行计时
      </div>
    </div>
  );
}
