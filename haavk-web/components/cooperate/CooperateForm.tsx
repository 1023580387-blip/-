'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Building2, Shield, Users } from 'lucide-react';

const formTabs = [
  { id: 'energy', label: '能源合作', icon: Building2 },
  { id: 'security', label: '安保服务', icon: Shield },
  { id: 'recruit', label: '人才招募', icon: Users },
];

export default function CooperateForm() {
  const [activeTab, setActiveTab] = useState('energy');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* 表单面板 */}
      <div className="lg:col-span-2">
        {/* Tab切换 */}
        <div className="flex gap-1 mb-8">
          {formTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 text-xs font-rajdhani tracking-wider transition-all duration-300 ${
                activeTab === tab.id
                  ? 'text-haavk-ice border-b-2 border-haavk-ice/60 bg-haavk-ice/5'
                  : 'text-haavk-platinum/50 border-b-2 border-transparent hover:text-haavk-silver hover:border-haavk-silver/20'
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* 表单 */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="holo-glass p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] text-haavk-platinum/40 font-rajdhani tracking-[0.2em] mb-2">
                  机构名称
                </label>
                <input
                  type="text"
                  className="holo-input w-full px-4 py-3 text-sm font-rajdhani tracking-wider"
                  placeholder="输入机构全称"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] text-haavk-platinum/40 font-rajdhani tracking-[0.2em] mb-2">
                  联系人
                </label>
                <input
                  type="text"
                  className="holo-input w-full px-4 py-3 text-sm font-rajdhani tracking-wider"
                  placeholder="您的姓名"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] text-haavk-platinum/40 font-rajdhani tracking-[0.2em] mb-2">
                  电子邮箱
                </label>
                <input
                  type="email"
                  className="holo-input w-full px-4 py-3 text-sm font-rajdhani tracking-wider"
                  placeholder="example@corp.com"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] text-haavk-platinum/40 font-rajdhani tracking-[0.2em] mb-2">
                  所在地区
                </label>
                <input
                  type="text"
                  className="holo-input w-full px-4 py-3 text-sm font-rajdhani tracking-wider"
                  placeholder="国家/城市"
                  required
                />
              </div>
            </div>

            {activeTab === 'recruit' && (
              <div>
                <label className="block text-[10px] text-haavk-platinum/40 font-rajdhani tracking-[0.2em] mb-2">
                  申请职位
                </label>
                <select className="holo-input w-full px-4 py-3 text-sm font-rajdhani tracking-wider appearance-none">
                  <option value="">选择职位方向</option>
                  <option value="ai">AI/机器学习工程师</option>
                  <option value="neuro">神经科学研究员</option>
                  <option value="aero">航天工程师</option>
                  <option value="security">安保专员</option>
                  <option value="energy">能源工程师</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-[10px] text-haavk-platinum/40 font-rajdhani tracking-[0.2em] mb-2">
                {activeTab === 'recruit' ? '个人简介' : '合作意向说明'}
              </label>
              <textarea
                className="holo-input w-full px-4 py-3 text-sm font-rajdhani tracking-wider min-h-[120px] resize-y"
                placeholder={activeTab === 'recruit' ? '简述您的专业背景与研究方向...' : '请描述您的合作需求与期望...'}
                required
              />
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-haavk-border/20">
              <button
                type="submit"
                className="flex items-center gap-2 px-8 py-3 text-xs font-rajdhani tracking-[0.15em] font-medium text-haavk-carbon bg-haavk-ice/60 hover:bg-haavk-ice/80 transition-colors"
              >
                <Send size={14} />
                提交申请
              </button>
              <span className="text-[9px] text-haavk-platinum/30 font-rajdhani">
                提交即表示同意哈夫克集团隐私政策与数据使用条款
              </span>
            </div>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 border border-haavk-ice/30 bg-haavk-ice/5"
              >
                <p className="text-sm text-haavk-ice font-rajdhani tracking-wider">
                  申请已提交，哈夫克集团将在7个工作日内与您联系。哈夫克与你同频。
                </p>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>

      {/* 侧边栏：CG + 联系信息 */}
      <div className="space-y-6">
        <div className="metal-panel p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent('UE5 cinematic CG, futuristic corporate headquarters, HAAVK Spire skyscraper, industrial architecture, cold silver lighting, business district, professional atmosphere, 8K')}&image_size=landscape_4_3`}
            alt="HAAVK HQ"
            className="w-full aspect-video object-cover mb-4"
          />
          <h3 className="font-orbitron text-xs tracking-[0.1em] text-haavk-silver mb-2">
            哈夫克全球总部
          </h3>
          <p className="text-[11px] text-haavk-platinum/50 font-rajdhani leading-relaxed">
            哈夫克尖塔，阿萨拉地区核心城市，全球科技防务的神经中枢。
          </p>
        </div>

        <div className="holo-glass p-6">
          <h3 className="font-orbitron text-xs tracking-[0.1em] text-haavk-silver mb-4">
            联络方式
          </h3>
          <div className="space-y-3 text-[11px] text-haavk-platinum/50 font-rajdhani tracking-wider">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-haavk-ice/40 rounded-full" />
              <span>cooperate@haavk.global</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-haavk-ice/40 rounded-full" />
              <span>+∞ HAAVK-SPIRE-01</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-haavk-ice/40 rounded-full" />
              <span>哈夫克尖塔 168层</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}