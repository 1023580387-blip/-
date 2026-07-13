import React from 'react';

const BackgroundLayer: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0">
      {/* 主背景渐变 */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-space via-[#121826] to-[#0d1420] overflow-hidden">
        {/* 远处模糊量子服务器轮廓 - 使用渐变模拟 */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-ice-blue/10 to-transparent blur-3xl rounded-[100px]" />
          <div className="absolute top-1/3 left-1/4 w-[200px] h-[400px] bg-gradient-to-r from-neon-cyan/5 to-transparent blur-2xl rounded-full" />
          <div className="absolute top-1/3 right-1/4 w-[200px] h-[400px] bg-gradient-to-l from-neon-cyan/5 to-transparent blur-2xl rounded-full" />
        </div>
      </div>

      {/* 镜面反光地面 */}
      <div className="absolute bottom-0 left-0 right-0 h-[40vh] mirror-floor" />

      {/* 远景光晕 */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-[100px] animate-pulse" />

      {/* 左上角冷色调光晕 */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-ice-blue/3 rounded-full blur-[80px]" />

      {/* 右下角冷色调光晕 */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-silver-light/5 rounded-full blur-[80px]" />
    </div>
  );
};

export default BackgroundLayer;
