'use client';
import { motion } from 'framer-motion';
import { Cpu, Satellite, Brain, Rocket, Zap, Shield } from 'lucide-react';

const categories = [
  { id: 'all', label: '全部技术', icon: null },
  { id: 'supercomputing', label: '曼德尔超算AI', icon: Cpu },
  { id: 'satellite', label: '天网卫星系统', icon: Satellite },
  { id: 'brain_computer', label: 'Relink脑机技术', icon: Brain },
  { id: 'aerospace', label: '航天工程', icon: Rocket },
  { id: 'energy', label: '新能源设施', icon: Zap },
  { id: 'defense', label: '防务作战装备', icon: Shield },
];

interface TechSidebarProps {
  activeCategory: string;
  onCategoryChange: (id: string) => void;
  activeClassification: string;
  onClassificationChange: (id: string) => void;
}

export default function TechSidebar({
  activeCategory,
  onCategoryChange,
  activeClassification,
  onClassificationChange,
}: TechSidebarProps) {
  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="metal-panel p-4 lg:sticky lg:top-28">
        <h3 className="font-orbitron text-xs tracking-[0.2em] text-haavk-silver mb-4 pb-3 border-b border-haavk-border/20">
          技术分类
        </h3>
        <div className="flex flex-col gap-0.5 mb-6">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-rajdhani tracking-wider transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'text-haavk-ice border-l-2 border-haavk-ice/60 bg-haavk-ice/5'
                  : 'text-haavk-platinum/50 hover:text-haavk-silver border-l-2 border-transparent hover:border-haavk-silver/20'
              }`}
              whileHover={{ x: 4 }}
            >
              {cat.icon && <cat.icon size={14} className="opacity-60" />}
              {cat.label}
            </motion.button>
          ))}
        </div>

        <h3 className="font-orbitron text-xs tracking-[0.2em] text-haavk-silver mb-4 pt-3 border-t border-haavk-border/20">
          机密等级
        </h3>
        <div className="flex flex-col gap-0.5">
          {[
            { id: 'all', label: '全部等级' },
            { id: 'public', label: '公开资料' },
            { id: 'restricted', label: '受限机密' },
            { id: 'classified', label: '最高保密' },
          ].map((cls) => (
            <motion.button
              key={cls.id}
              onClick={() => onClassificationChange(cls.id)}
              className={`px-3 py-2 text-xs font-rajdhani tracking-wider transition-all duration-300 ${
                activeClassification === cls.id
                  ? 'text-haavk-ice border-l-2 border-haavk-ice/60 bg-haavk-ice/5'
                  : 'text-haavk-platinum/50 hover:text-haavk-silver border-l-2 border-transparent hover:border-haavk-silver/20'
              }`}
              whileHover={{ x: 4 }}
            >
              {cls.label}
            </motion.button>
          ))}
        </div>
      </div>
    </aside>
  );
}