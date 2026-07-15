'use client';
import { useState, useEffect } from 'react';
import { Clock, Globe, Radio } from 'lucide-react';

export default function HoloTimeBar() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const utc = now.toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
      setTime(utc);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-16 left-0 right-0 z-40 h-7 bg-haavk-carbon/80 backdrop-blur-sm border-b border-haavk-border/20 flex items-center justify-between px-4 overflow-hidden">
      {/* 扫描线 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-haavk-ice/20 to-transparent animate-scan-line" />
      </div>

      {/* 左侧：星际纪元 */}
      <div className="flex items-center gap-3 text-[10px] font-rajdhani tracking-wider text-haavk-platinum/60">
        <div className="flex items-center gap-1.5">
          <Globe size={10} className="text-haavk-ice/50" />
          <span className="time-font text-[10px] text-haavk-ice/60">STELLAR ERA 2035</span>
        </div>
        <span className="text-haavk-border/50">|</span>
        <div className="flex items-center gap-1.5">
          <Radio size={10} className="text-haavk-ice/50" />
          <span className="time-font text-[10px] text-haavk-ice/60 value-flicker">
            COORD: 25.2°N 55.3°E
          </span>
        </div>
        <span className="text-haavk-border/50">|</span>
        <span className="time-font text-[10px] text-haavk-ice/60">NODE: HAAVK-SPIRE-01</span>
      </div>

      {/* 右侧：实时时间 */}
      <div className="flex items-center gap-1.5 text-[10px] font-rajdhani tracking-wider">
        <Clock size={10} className="text-haavk-ice/50" />
        <span className="time-font text-[10px] text-haavk-ice/60 value-flicker">{time}</span>
      </div>
    </div>
  );
}