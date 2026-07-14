'use client';

import { GlassInfoCard } from './GlassInfoCard';
import { planets } from '@/utils/planetData';
import { Zap, Thermometer, Gauge, Satellite } from 'lucide-react';

export function InfoSection() {
  return (
    <section className="relative z-20 px-6 pb-20 max-w-6xl mx-auto">
      <div className="mb-12 text-center">
        <h2 className="font-orbitron text-lg tracking-[0.3em] text-space-blue/60 mb-3">
          INTERSTELLAR DATA
        </h2>
        <p className="font-space text-sm text-space-ice/40 tracking-wider">
          星际数据档案 · 探索未知宇宙
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {/* Planet data cards */}
        {planets.slice(0, 3).map((planet, i) => (
          <GlassInfoCard
            key={planet.id}
            title={`PLANET · ${planet.name}`}
            subtitle={planet.info.description}
            delay={i * 0.15}
          >
            <DataRow
              icon={<Thermometer className="w-3.5 h-3.5" />}
              label="温度"
              value={planet.info.temperature}
            />
            <DataRow
              icon={<Gauge className="w-3.5 h-3.5" />}
              label="引力"
              value={planet.info.gravity}
            />
            <DataRow
              icon={<Satellite className="w-3.5 h-3.5" />}
              label="直径"
              value={planet.info.diameter}
            />
          </GlassInfoCard>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <GlassInfoCard title="星际资讯 · NEWS" delay={0.4}>
          <NewsItem
            title="深空探测器发现新型能源信号"
            time="STAR-YEAR 2026.195"
            content="远航号探测器在凯普勒星系边缘探测到异常能量波动，科学家初步分析为未知形式暗物质。"
          />
          <NewsItem
            title="银河系中心黑洞活动周期更新"
            time="STAR-YEAR 2026.194"
            content="最新观测数据表明，银河系中心超大质量黑洞正进入新一轮活跃期。"
          />
          <NewsItem
            title="星际移民计划第三阶段启动"
            time="STAR-YEAR 2026.192"
            content="联盟正式批准第三阶段星际移民计划，首批殖民地将扩展至凯普勒-186F。"
          />
        </GlassInfoCard>

        <GlassInfoCard title="时空参数 · PARAMETERS" delay={0.55}>
          <ParamRow label="宇宙膨胀率" value="73.24 km/s/Mpc" />
          <ParamRow label="本地光速" value="299,792,458 m/s" />
          <ParamRow label="量子纠缠系数" value="ΔE·Δt = 4.135×10⁻¹⁵ eV·s" />
          <ParamRow label="暗物质密度" value="0.26 GeV/cm³" />
          <ParamRow label="宇宙微波背景" value="2.725 K" />
          <ParamRow label="时空曲率" value="Ω₀ = 1.002 ± 0.011" />
        </GlassInfoCard>
      </div>

      {/* Bottom wide card */}
      <GlassInfoCard
        title="深空档案 · ARCHIVE"
        subtitle="人类探索宇宙的历史进程与未来展望"
        variant="wide"
        delay={0.7}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatBlock
            label="已探测星系"
            value="2,847"
            unit="个"
            color="#4FC3F7"
          />
          <StatBlock
            label="已确认宜居行星"
            value="163"
            unit="颗"
            color="#7C4DFF"
          />
          <StatBlock
            label="星际航行距离"
            value="12.6"
            unit="光年"
            color="#00E5FF"
          />
        </div>
      </GlassInfoCard>
    </section>
  );
}

function DataRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between text-xs">
      <div className="flex items-center gap-2 text-space-ice/50">
        {icon}
        <span className="font-space">{label}</span>
      </div>
      <span className="font-orbitron tracking-wider text-space-ice">{value}</span>
    </div>
  );
}

function NewsItem({
  title,
  time,
  content,
}: {
  title: string;
  time: string;
  content: string;
}) {
  return (
    <div className="border-b border-space-border/10 pb-3 last:border-0 last:pb-0">
      <div className="flex items-center gap-2 mb-1">
        <Zap className="w-3 h-3 text-space-blue/50" />
        <h4 className="text-space-ice text-xs font-space font-medium">{title}</h4>
      </div>
      <p className="text-space-ice/30 text-[10px] font-orbitron tracking-wider mb-1">{time}</p>
      <p className="text-space-ice/50 text-xs font-space leading-relaxed">{content}</p>
    </div>
  );
}

function ParamRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center text-xs py-1.5 border-b border-space-border/5 last:border-0">
      <span className="text-space-ice/50 font-space">{label}</span>
      <span className="text-space-blue/70 font-orbitron tracking-wider">{value}</span>
    </div>
  );
}

function StatBlock({
  label,
  value,
  unit,
  color,
}: {
  label: string;
  value: string;
  unit: string;
  color: string;
}) {
  return (
    <div className="text-center py-6">
      <div className="font-orbitron text-3xl tracking-wider mb-1" style={{ color }}>
        {value}
        <span className="text-base ml-1 opacity-60">{unit}</span>
      </div>
      <p className="text-space-ice/40 text-xs font-space tracking-wide">{label}</p>
    </div>
  );
}