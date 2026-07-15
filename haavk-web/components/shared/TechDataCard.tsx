'use client';
import { motion } from 'framer-motion';
import CgHoloWindow from './CgHoloWindow';
import { TechItem } from '@/types';

interface TechDataCardProps {
  tech: TechItem;
  index: number;
}

export default function TechDataCard({ tech, index }: TechDataCardProps) {
  const isClassified = tech.classification !== 'public';

  return (
    <motion.div
      className="metal-panel rounded-sm overflow-hidden group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
    >
      {/* 微型CG */}
      <div className="relative">
        <CgHoloWindow
          prompt={tech.cgPrompt}
          aspectRatio="16:9"
          size="medium"
          className="!border-0"
          showControls={false}
        />
        {/* 分类标签 */}
        <div className="absolute top-2 right-2 z-20">
          <span className={`time-font text-[8px] px-1.5 py-0.5 ${
            tech.classification === 'classified'
              ? 'bg-red-900/60 text-red-300/70 border border-red-700/30'
              : tech.classification === 'restricted'
              ? 'bg-yellow-900/60 text-yellow-300/70 border border-yellow-700/30'
              : 'bg-haavk-ice/10 text-haavk-ice/60 border border-haavk-ice/20'
          }`}>
            {tech.classification === 'classified' ? '最高机密' : tech.classification === 'restricted' ? '受限' : '公开'}
          </span>
        </div>
      </div>

      {/* 信息面板 */}
      <div className="p-4">
        <h3 className="font-orbitron text-sm tracking-[0.1em] text-haavk-silver mb-2 group-hover:text-haavk-ice transition-colors">
          {tech.name}
        </h3>
        <p className={`text-xs text-haavk-platinum/60 leading-relaxed mb-3 font-rajdhani ${isClassified ? 'classified-text' : ''}`}>
          {tech.description.slice(0, 80)}...
        </p>

        {/* 参数 */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {tech.params.slice(0, 4).map((param) => (
            <div key={param.label} className="border border-haavk-border/20 p-2">
              <div className="text-[9px] text-haavk-platinum/40 font-rajdhani tracking-wider">{param.label}</div>
              <div className={`time-font text-[11px] mt-0.5 ${isClassified ? 'classified-text' : 'text-haavk-ice/70 value-flicker'}`}>
                {param.value}
              </div>
            </div>
          ))}
        </div>

        {/* 项目标签 */}
        <div className="flex flex-wrap gap-1">
          {tech.projects.slice(0, 3).map((project) => (
            <span key={project} className="text-[8px] text-haavk-platinum/40 font-rajdhani tracking-wider border border-haavk-border/10 px-1.5 py-0.5">
              {project}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}