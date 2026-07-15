import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Briefcase, AlertTriangle } from 'lucide-react';

export default function CareersPage() {
  const [showExam, setShowExam] = useState(false);
  const [examAnswer, setExamAnswer] = useState('');
  const [examSubmitted, setExamSubmitted] = useState(false);

  const handleExamSubmit = () => {
    if (examAnswer.trim()) {
      setExamSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-havoc-black">
      <Navbar />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="font-orbitron text-5xl font-bold text-gradient mb-6">
              哈夫克人才网
            </h1>
            <p className="font-rajdhani text-xl text-white/80">
              加入我们，用科技塑造未来
            </p>
          </motion.div>

          {/* Job postings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {[
              {
                title: '核电工程师',
                location: '阿萨拉新科研基地',
                type: '全职',
                description: '负责零号大坝核电系统的维护与升级，确保能源网络稳定运行。',
                requirements: ['核工程学位', '5年以上经验', '安全认证'],
              },
              {
                title: 'AI研究员',
                location: '哈夫克总部',
                type: '全职',
                description: '参与曼德尔砖核心算法研发，推动超级AI技术突破。',
                requirements: ['计算机科学博士', '深度学习经验', '发表论文优先'],
              },
              {
                title: '外骨骼测试员',
                location: '阿萨拉测试场',
                type: '合同制',
                description: '在极端环境下测试泰坦系列外骨骼性能，提供改进建议。',
                requirements: ['体能优秀', '军事背景优先', '能适应恶劣环境'],
              },
            ].map((job, index) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-havoc-dark/50 border border-havoc-blue/20 rounded-lg p-8 glow-border-hover"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-havoc-blue/10 rounded-lg">
                    <Briefcase className="text-havoc-blue" size={24} />
                  </div>
                  <div>
                    <h3 className="font-orbitron text-2xl font-bold text-white mb-1">
                      {job.title}
                    </h3>
                    <p className="font-rajdhani text-sm text-havoc-blue/60">
                      {job.location} · {job.type}
                    </p>
                  </div>
                </div>

                <p className="font-rajdhani text-white/70 mb-4">{job.description}</p>

                <div className="mb-6">
                  <h4 className="font-rajdhani text-sm font-semibold text-havoc-blue mb-2">
                    要求：
                  </h4>
                  <ul className="space-y-1">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="font-rajdhani text-sm text-white/60">
                        • {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full py-2 bg-havoc-blue/10 border border-havoc-blue/50 text-havoc-blue font-rajdhani rounded hover:bg-havoc-blue/20 transition-all">
                  申请职位
                </button>
              </motion.div>
            ))}
          </div>

          {/* Exam section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-havoc-dark/30 border border-havoc-blue/30 rounded-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="text-havoc-blue" size={28} />
              <h2 className="font-orbitron text-3xl font-bold text-gradient">
                入职考试题
              </h2>
            </div>

            {!showExam ? (
              <button
                onClick={() => setShowExam(true)}
                className="px-6 py-3 bg-havoc-blue/10 border border-havoc-blue/50 text-havoc-blue font-rajdhani rounded hover:bg-havoc-blue/20 transition-all"
              >
                开始考试
              </button>
            ) : (
              <div className="space-y-6">
                <div className="bg-havoc-black/50 border border-havoc-blue/20 rounded p-6">
                  <h3 className="font-rajdhani text-lg font-semibold text-white mb-3">
                    逻辑题 1：
                  </h3>
                  <p className="font-rajdhani text-white/80 mb-4">
                    如果所有曼德尔砖都是超级计算机，某些超级计算机能预测天气，那么以下哪个结论正确？
                  </p>
                  <div className="space-y-2">
                    {['A. 所有曼德尔砖都能预测天气', 'B. 某些曼德尔砖可能预测天气', 'C. 没有曼德尔砖能预测天气'].map(
                      (option, i) => (
                        <label key={i} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="logic-q1"
                            className="w-4 h-4"
                          />
                          <span className="font-rajdhani text-white/70">{option}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                <div className="bg-havoc-black/50 border border-havoc-red/30 rounded p-6">
                  <h3 className="font-rajdhani text-lg font-semibold text-havoc-red mb-3">
                    道德倾向测试：
                  </h3>
                  <p className="font-rajdhani text-white/80 mb-4">
                    当设施内发生3级辐射泄漏且存在3名未撤离的本土员工时，作为主管，你应该优先锁死防爆门以保护核心数据，还是开启通道？
                  </p>
                  <p className="font-rajdhani text-xs text-havoc-red/60 italic mb-4">
                    （注：本题无标准答案，系统将记录您的道德倾向权重）
                  </p>
                  <textarea
                    value={examAnswer}
                    onChange={(e) => setExamAnswer(e.target.value)}
                    placeholder="请输入您的决策理由..."
                    className="w-full h-32 bg-havoc-black border border-havoc-blue/30 rounded p-3 font-rajdhani text-white/80 resize-none focus:outline-none focus:border-havoc-blue"
                  />
                  <button
                    onClick={handleExamSubmit}
                    disabled={!examAnswer.trim()}
                    className="mt-4 px-6 py-2 bg-havoc-blue/10 border border-havoc-blue/50 text-havoc-blue font-rajdhani rounded hover:bg-havoc-blue/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    提交答案
                  </button>
                </div>

                {examSubmitted && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-havoc-green/10 border border-havoc-green/30 rounded p-4"
                  >
                    <p className="font-rajdhani text-havoc-green text-sm">
                      ✓ 答案已提交。系统正在分析您的道德倾向权重...
                    </p>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
