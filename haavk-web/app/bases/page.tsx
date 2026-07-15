'use client';
import { useState } from 'react';
import SectionTitle from '@/components/shared/SectionTitle';
import WorldBaseCanvas from '@/components/bases/WorldBaseCanvas';
import { bases } from '@/data/bases';
import { Clock, DollarSign } from 'lucide-react';

const timezones = ['UTC+0', 'UTC+1', 'UTC+2', 'UTC+3', 'UTC+4', 'UTC+5', 'UTC+9'];

export default function BasesPage() {
  const [selectedTz, setSelectedTz] = useState('UTC+4');
  const [haavRate, setHaavRate] = useState(1.00);

  // 模拟哈夫币汇率变化
  const changeRate = () => {
    setHaavRate(Number((1 + (Math.random() - 0.5) * 0.02).toFixed(4)));
  };

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="全球据点分布"
          subtitle="七大洲战略部署 · 全方位防务覆盖"
        />

        {/* 顶部全息时间栏 */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 metal-panel">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-haavk-ice/40" />
              <span className="text-[10px] text-haavk-platinum/40 font-rajdhani tracking-wider">时区</span>
              <div className="flex gap-1">
                {timezones.map((tz) => (
                  <button
                    key={tz}
                    onClick={() => setSelectedTz(tz)}
                    className={`px-2 py-0.5 time-font text-[9px] tracking-wider transition-all ${
                      selectedTz === tz
                        ? 'text-haavk-ice border border-haavk-ice/40'
                        : 'text-haavk-platinum/40 border border-haavk-border/20 hover:text-haavk-silver'
                    }`}
                  >
                    {tz}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <DollarSign size={14} className="text-haavk-ice/40" />
              <span className="text-[10px] text-haavk-platinum/40 font-rajdhani tracking-wider">哈夫币汇率</span>
            </div>
            <button
              onClick={changeRate}
              className="flex items-center gap-2 px-3 py-1 border border-haavk-border/20 hover:border-haavk-ice/30 transition-colors group"
            >
              <span className="time-font text-xs text-haavk-ice/60 value-flicker">
                1 HAAV = ${haavRate} USD
              </span>
              <span className="text-[8px] text-haavk-platinum/30 group-hover:text-haavk-ice/50 transition-colors">
                {new Date().toLocaleTimeString('en-US', { hour12: false })}
              </span>
            </button>
          </div>
        </div>

        <WorldBaseCanvas bases={bases} />
      </div>
    </div>
  );
}