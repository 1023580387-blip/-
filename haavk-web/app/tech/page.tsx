'use client';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import TechSidebar from '@/components/tech/TechSidebar';
import TechDataCard from '@/components/shared/TechDataCard';
import SectionTitle from '@/components/shared/SectionTitle';
import { techItems } from '@/data/tech';

export default function TechPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeClassification, setActiveClassification] = useState('all');

  const filteredTech = useMemo(() => {
    return techItems.filter((tech) => {
      if (activeCategory !== 'all' && tech.category !== activeCategory) return false;
      if (activeClassification !== 'all' && tech.classification !== activeClassification) return false;
      return true;
    });
  }, [activeCategory, activeClassification]);

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="核心技术研发"
          subtitle="曼德尔砖超算驱动的全球科技矩阵"
        />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* 侧边栏 */}
          <TechSidebar
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            activeClassification={activeClassification}
            onClassificationChange={setActiveClassification}
          />

          {/* 技术卡片网格 */}
          <div className="flex-1">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
              layout
            >
              {filteredTech.map((tech, i) => (
                <TechDataCard key={tech.id} tech={tech} index={i} />
              ))}
            </motion.div>

            {filteredTech.length === 0 && (
              <div className="text-center py-20">
                <p className="text-haavk-platinum/40 font-rajdhani tracking-wider">
                  该筛选条件下暂无匹配技术数据
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}