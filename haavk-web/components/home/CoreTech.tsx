'use client';
import { motion } from 'framer-motion';
import CountUpNumber from '@/components/shared/CountUpNumber';
import SectionTitle from '@/components/shared/SectionTitle';
import { Cpu, Satellite, Zap, Rocket } from 'lucide-react';

const coreStats = [
  {
    icon: Cpu,
    label: '曼德尔砖超算节点',
    value: 12400,
    suffix: '+',
    desc: '全球部署量子-经典混合超算网络',
  },
  {
    icon: Satellite,
    label: '天网在轨卫星',
    value: 384,
    suffix: '',
    desc: '8分钟全球重访监测覆盖',
  },
  {
    icon: Zap,
    label: '零号大坝装机容量',
    value: 24.6,
    suffix: ' GW',
    desc: '年发电量186 TWh清洁能源',
  },
  {
    icon: Rocket,
    label: '航天年发射能力',
    value: 64,
    suffix: '',
    desc: '重型运载142吨近地轨道载荷',
  },
];

export default function CoreTech() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="核心技术优势"
          subtitle="曼德尔砖超算驱动的全球科技防务矩阵"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {coreStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="metal-panel p-6 text-center group cursor-default"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <stat.icon size={24} className="mx-auto mb-4 text-haavk-ice/40 group-hover:text-haavk-ice/70 transition-colors duration-500" />
              <div className="mb-2">
                <CountUpNumber
                  end={stat.value}
                  suffix={stat.suffix}
                  className="text-2xl md:text-3xl text-haavk-ice/70"
                />
              </div>
              <div className="text-[10px] tracking-[0.15em] text-haavk-platinum/50 font-rajdhani mb-2">
                {stat.label}
              </div>
              <div className="text-[11px] text-haavk-platinum/40 font-rajdhani">
                {stat.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}