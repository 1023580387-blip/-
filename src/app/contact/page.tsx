'use client';

// ========================================
// 咨询联系页 /contact
// 巨型霓虹玻璃咨询面板 + 左右分栏 + 发光全息表单
// ========================================
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useThemeStore } from '@/hooks/useThemeStore';
import { HOLOGRAM_VIDEOS } from '@/utils/constants';
import RainParticles from '@/components/RainParticles';
import HologramVideo from '@/components/HologramVideo';
import GlassContainer from '@/components/GlassContainer';
import NeonScanLine from '@/components/NeonScanLine';
import PageTransition from '@/components/PageTransition';
import { Send, Zap, Shield, Globe } from 'lucide-react';

export default function ContactPage() {
  const { currentTheme } = useThemeStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <PageTransition className={`relative min-h-screen overflow-hidden ${currentTheme.className}`}>
      {/* 稀疏慢速雨粒子 */}
      <RainParticles density="low" scanLines circuitBoard />

      {/* 竖向细长霓虹流光 */}
      <NeonScanLine direction="vertical" color="var(--neon-secondary)" thickness={2} duration={4} />
      <NeonScanLine direction="horizontal" duration={5} />

      {/* 页面标题 */}
      <div className="relative z-10 pt-16 pb-8 text-center">
        <motion.h1
          className="font-display text-4xl md:text-6xl font-bold tracking-[0.15em] neon-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          CONTACT
        </motion.h1>
        <motion.p
          className="font-body text-sm text-cyan-neon/50 tracking-[0.2em] mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          量子通讯 · 即刻连接
        </motion.p>
      </div>

      {/* 主咨询面板 */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 pb-32">
        <GlassContainer className="overflow-hidden" float={false}>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* 左侧 - 品牌介绍 */}
            <div className="p-8 md:p-12 border-r border-cyan-neon/10">
              <h2
                className="font-display text-2xl md:text-3xl font-bold tracking-[0.1em] mb-6"
                style={{
                  color: 'var(--neon-primary)',
                  textShadow: '0 0 10px var(--neon-primary)',
                }}
              >
                MAISON ÉCLAT
              </h2>
              <p className="font-body text-sm text-gray-400 leading-relaxed mb-8 tracking-wide">
                我们站在量子计算与人工智能的交汇点，为未来的赛博都市提供核心算力解决方案。
                每一颗芯片、每一行代码，都在重新定义可能的边界。
              </p>

              {/* 品牌特色 */}
              <div className="space-y-4">
                {[
                  { icon: <Zap size={16} />, label: '量子加密通讯' },
                  { icon: <Shield size={16} />, label: '军事级数据安全' },
                  { icon: <Globe size={16} />, label: '全球节点部署' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span style={{ color: 'var(--neon-primary)' }}>{item.icon}</span>
                    <span className="font-body text-sm text-gray-300 tracking-wider">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* 底部装饰线 */}
              <div className="mt-8 h-[1px] bg-gradient-to-r from-cyan-neon/30 to-transparent" />
              <p className="font-body text-xs text-cyan-neon/30 mt-4 tracking-[0.2em]">
                CYBERPUNK 2077 · QUANTUM DIVISION
              </p>
            </div>

            {/* 右侧 - 全息表单 */}
            <div className="p-8 md:p-12 relative">
              {/* 表单侧边竖向霓虹扫描线 */}
              <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-neon/50 to-transparent"
                style={{ boxShadow: '0 0 10px var(--neon-primary)' }}
              />

              <h3 className="font-display text-lg tracking-[0.15em] mb-6 text-white/80">
                发起通讯
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="font-body text-xs text-gray-500 tracking-wider block mb-1.5">
                    代号 / NAME
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 neon-input rounded-lg font-body text-sm tracking-wider"
                    placeholder="输入你的代号..."
                  />
                </div>
                <div>
                  <label className="font-body text-xs text-gray-500 tracking-wider block mb-1.5">
                    通讯频道 / EMAIL
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 neon-input rounded-lg font-body text-sm tracking-wider"
                    placeholder="quantum@maison-eclat.com"
                  />
                </div>
                <div>
                  <label className="font-body text-xs text-gray-500 tracking-wider block mb-1.5">
                    组织 / COMPANY
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 neon-input rounded-lg font-body text-sm tracking-wider"
                    placeholder="你的组织名称..."
                  />
                </div>
                <div>
                  <label className="font-body text-xs text-gray-500 tracking-wider block mb-1.5">
                    讯息 / MESSAGE
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 neon-input rounded-lg font-body text-sm tracking-wider resize-none"
                    placeholder="输入你的讯息..."
                  />
                </div>

                <motion.button
                  type="submit"
                  className="neon-btn w-full py-3 rounded-lg font-display text-sm tracking-[0.2em] flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send size={16} />
                  {submitted ? '讯息已发送' : '发送讯息'}
                </motion.button>

                {/* 提交成功提示 */}
                {submitted && (
                  <motion.p
                    className="text-center font-body text-xs text-cyan-neon tracking-wider"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    量子讯号已发出，我们将在 24 小时内回应
                  </motion.p>
                )}
              </form>
            </div>
          </div>
        </GlassContainer>
      </div>

      {/* 四角悬浮装饰全息视频 */}
      <div className="fixed top-4 left-4 w-24 h-24 md:w-32 md:h-32 z-20 opacity-40 hover:opacity-80 transition-opacity">
        <HologramVideo src={HOLOGRAM_VIDEOS.hero[0].url} aspectRatio="square" corners />
      </div>
      <div className="fixed top-4 right-4 w-24 h-24 md:w-32 md:h-32 z-20 opacity-40 hover:opacity-80 transition-opacity">
        <HologramVideo src={HOLOGRAM_VIDEOS.hero[1].url} aspectRatio="square" corners />
      </div>
      <div className="fixed bottom-4 left-4 w-24 h-24 md:w-32 md:h-32 z-20 opacity-40 hover:opacity-80 transition-opacity">
        <HologramVideo src={HOLOGRAM_VIDEOS.hero[2].url} aspectRatio="square" corners />
      </div>
      <div className="fixed bottom-4 right-4 w-24 h-24 md:w-32 md:h-32 z-20 opacity-40 hover:opacity-80 transition-opacity">
        <HologramVideo src={HOLOGRAM_VIDEOS.hero[3].url} aspectRatio="square" corners />
      </div>
    </PageTransition>
  );
}