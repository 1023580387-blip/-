'use client';

import { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { NeonGlassPanel } from '@/components/ui/NeonGlassPanel';
import { GlitchText } from '@/components/ui/GlitchText';
import { generateArchiveData } from '@/utils/mockData';

export default function ArchivePage() {
  const archiveData = useMemo(() => generateArchiveData(), []);

  return (
    <div className="min-h-screen px-8 pb-32">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-3xl font-mono font-bold text-cyber-cyan mb-2">
            星际资料库
          </h1>
          <p className="text-white/50 font-mono text-sm">
            纵向电路板纹理时间轴 · 迷你动态星系窗口 · 故障文字档案
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyber-cyan via-cyber-magenta to-cyber-cyan opacity-30" />

          {archiveData.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: index * 0.05 }}
              className={`relative mb-12 flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
            >
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-cyber-cyan border-2 border-cyber-black z-10"
                style={{ boxShadow: '0 0 10px #00e5ff, 0 0 20px #00e5ff' }}
              />

              <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                <NeonGlassPanel glowColor={index % 2 === 0 ? 'cyan' : 'magenta'}>
                  <MiniGalaxy index={index} />
                  
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] text-white/40 font-mono">
                        {new Date(entry.timestamp).toLocaleDateString('zh-CN')}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        entry.category === 'Discovery' ? 'bg-cyber-cyan/20 text-cyber-cyan' :
                        entry.category === 'Event' ? 'bg-cyber-magenta/20 text-cyber-magenta' :
                        entry.category === 'Anomaly' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-yellow-500/20 text-yellow-500'
                      }`}>
                        {entry.category}
                      </span>
                    </div>
                    
                    <h3 className="text-sm font-mono font-bold text-white mb-2">
                      <GlitchText intensity="low">{entry.title}</GlitchText>
                    </h3>
                    
                    <p className="text-xs text-white/60 font-mono leading-relaxed">
                      {entry.description}
                    </p>
                  </div>
                </NeonGlassPanel>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MiniGalaxy({ index }: { index: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 200;
    canvas.height = 100;

    const animate = () => {
      timeRef.current += 1;
      const time = timeRef.current;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      for (let i = 0; i < 3; i++) {
        const radius = 15 + i * 10;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = i % 2 === 0 ? 'rgba(0, 229, 255, 0.3)' : 'rgba(255, 43, 134, 0.3)';
        ctx.lineWidth = 0.5;
        ctx.stroke();

        const angle = (time * 0.02 + i + index) % (Math.PI * 2);
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? '#00e5ff' : '#ff2b86';
        ctx.shadowColor = i % 2 === 0 ? '#00e5ff' : '#ff2b86';
        ctx.shadowBlur = 5;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [index]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-24 rounded border border-cyber-cyan/20"
      style={{ background: 'rgba(0, 0, 0, 0.5)' }}
    />
  );
}
