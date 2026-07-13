import React from 'react';
import BackgroundLayer from '@/components/BackgroundLayer';
import ParticleSystem from '@/components/ParticleSystem';
import DataFlow from '@/components/DataFlow';
import GlassPanel from '@/components/GlassPanel';
import VideoWindow from '@/components/VideoWindow';
import TextNav from '@/components/TextNav';
import HeroContent from '@/components/HeroContent';
import NoiseOverlay from '@/components/NoiseOverlay';

const Home: React.FC = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 背景层 */}
      <BackgroundLayer />

      {/* 粒子系统 */}
      <ParticleSystem />

      {/* 数据流 */}
      <DataFlow />

      {/* 顶部导航 */}
      <TextNav />

      {/* 多层交错悬浮玻璃面板 */}
      {/* 左侧上方玻璃面板 */}
      <GlassPanel
        className="fixed left-[5%] top-[12%] w-[280px] h-[180px] z-20"
        animationType="drift"
        animationDelay={0}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-light text-neon-cyan/80 tracking-wider">150M+</div>
            <div className="text-xs text-white/40 mt-2 tracking-wider">每秒推理计算</div>
          </div>
        </div>
      </GlassPanel>

      {/* 右侧上方玻璃面板 */}
      <GlassPanel
        className="fixed right-[8%] top-[15%] w-[320px] h-[200px] z-20"
        animationType="drift"
        animationDelay={2}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
          <div className="text-lg font-light text-white/70 tracking-wider">量子计算架构</div>
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent my-4" />
          <div className="text-xs text-white/40 leading-relaxed text-center">
            基于分布式量子计算单元<br />
            实现超高并发智能推理
          </div>
        </div>
      </GlassPanel>

      {/* 左侧下方玻璃面板 */}
      <GlassPanel
        className="fixed left-[6%] bottom-[20%] w-[260px] h-[160px] z-20"
        animationType="drift"
        animationDelay={4}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-light text-neon-cyan/80 tracking-wider">5.2B</div>
            <div className="text-xs text-white/40 mt-2 tracking-wider">模型参数规模</div>
          </div>
        </div>
      </GlassPanel>

      {/* 右侧下方玻璃面板 */}
      <GlassPanel
        className="fixed right-[5%] bottom-[18%] w-[300px] h-[180px] z-20"
        animationType="drift"
        animationDelay={6}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
          <div className="text-lg font-light text-white/70 tracking-wider">AI 训练集群</div>
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent my-4" />
          <div className="text-xs text-white/40 leading-relaxed text-center">
            千卡级GPU集群<br />
            毫秒级推理延迟
          </div>
        </div>
      </GlassPanel>

      {/* 半透明全息视频窗口 */}
      <VideoWindow
        title="芯片运行"
        videoContent="chip"
        className="fixed left-[30%] top-[10%] w-[200px] h-[130px] z-20"
        animationDelay={0}
      />
      <VideoWindow
        title="数字城市"
        videoContent="city"
        className="fixed right-[28%] top-[25%] w-[220px] h-[140px] z-20"
        animationDelay={1.5}
      />
      <VideoWindow
        title="AI机房"
        videoContent="ai-room"
        className="fixed left-[32%] bottom-[25%] w-[210px] h-[135px] z-20"
        animationDelay={3}
      />

      {/* 主文字内容 */}
      <HeroContent />

      {/* 底部状态栏 */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30">
        <GlassPanel className="px-6 py-2 rounded-full">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
              <span className="text-xs text-white/50 tracking-wider">系统运行中</span>
            </div>
            <div className="text-xs text-white/30 tracking-wider">
              CLUSTER STATUS: HEALTHY
            </div>
            <div className="text-xs text-white/30 tracking-wider">
              LATENCY: 0.3ms
            </div>
          </div>
        </GlassPanel>
      </div>

      {/* 胶片噪点叠加层 */}
      <NoiseOverlay />
    </div>
  );
};

export default Home;