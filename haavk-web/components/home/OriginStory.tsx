'use client';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/shared/SectionTitle';
import { characters } from '@/data/characters';

export default function OriginStory() {
  const jacob = characters[0];

  const timeline = [
    { year: '1985', event: '雅各布·哈夫克诞生于索马里摩加迪沙' },
    { year: '1992', event: '摩加迪沙战役中失去双亲，立誓以科技重塑世界秩序' },
    { year: '2009', event: 'MIT量子计算与AI双博士学位，曼德尔理论奠基' },
    { year: '2012', event: '哈夫克科技成立，首轮融资12亿美元' },
    { year: '2015', event: '首块曼德尔砖原型机问世，算力震惊全球' },
    { year: '2020', event: '进驻阿萨拉地区，零号大坝开工' },
    { year: '2035', event: '哈夫克集团成为全球最大科技防务财团' },
  ];

  return (
    <section className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="集团起源"
          subtitle="一个男人与一个帝国的诞生"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* 创始人简介 */}
          <motion.div
            className="metal-panel p-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 border border-haavk-silver/20 flex items-center justify-center">
                <span className="font-orbitron text-2xl text-haavk-ice/50">JH</span>
              </div>
              <div>
                <h3 className="font-orbitron text-lg tracking-[0.1em] text-haavk-silver">
                  {jacob.name}
                </h3>
                <p className="text-xs text-haavk-platinum/50 font-rajdhani tracking-wider">
                  {jacob.title}
                </p>
              </div>
            </div>
            <p className="text-sm text-haavk-platinum/60 font-rajdhani leading-relaxed">
              {jacob.backstory}
            </p>
            <div className="mt-6 pt-4 border-t border-haavk-border/20">
              <p className="text-xs text-haavk-ice/50 font-rajdhani italic tracking-wider">
                &ldquo;资源分配失衡与文明落后是冲突的根源。唯有以绝对的技术垄断，才能终结人类的纷争。&rdquo;
              </p>
            </div>
          </motion.div>

          {/* 时间线 */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-haavk-ice/30 via-haavk-border/20 to-transparent" />

            {timeline.map((item, i) => (
              <motion.div
                key={i}
                className="relative pl-12 pb-8 last:pb-0"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="absolute left-3 top-1 w-3 h-3 rounded-full border border-haavk-ice/30 bg-haavk-carbon">
                  <div className="absolute inset-1 rounded-full bg-haavk-ice/20" />
                </div>
                <span className="time-font text-xs text-haavk-ice/50 tracking-wider">{item.year}</span>
                <p className="text-sm text-haavk-platinum/60 font-rajdhani mt-1 leading-relaxed">
                  {item.event}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}