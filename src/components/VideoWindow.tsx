import React from 'react';

interface VideoWindowProps {
  title: string;
  className?: string;
  animationDelay?: number;
  videoContent: 'chip' | 'city' | 'ai-room';
}

const getGradientBackground = (type: string) => {
  switch (type) {
    case 'chip':
      return 'bg-gradient-to-br from-slate-900/60 via-blue-900/40 to-cyan-800/30';
    case 'city':
      return 'bg-gradient-to-br from-slate-800/60 via-indigo-900/40 to-blue-800/30';
    case 'ai-room':
      return 'bg-gradient-to-br from-slate-900/60 via-slate-800/40 to-cyan-900/30';
    default:
      return 'bg-gradient-to-br from-slate-900/60 via-slate-800/40 to-cyan-800/30';
  }
};

const VideoWindow: React.FC<VideoWindowProps> = ({
  title,
  className = '',
  animationDelay = 0,
  videoContent,
}) => {
  return (
    <div
      className={`glass-panel glow-edge rounded-xl overflow-hidden relative animate-breathe ${className}`}
      style={{
        animationDelay: `${animationDelay}s`,
        transform: 'translateZ(0)',
        willChange: 'transform',
      }}
    >
      <div className={`absolute inset-0 ${getGradientBackground(videoContent)}`}>
        {/* 模拟芯片线路纹理 */}
        {videoContent === 'chip' && (
          <div className="absolute inset-0 opacity-30">
            <div className="absolute left-0 top-0 w-full h-full bg-[radial-gradient(circle_at_1px_1px,rgba(79,240,255,0.3)_1px,transparent_0)] bg-[size:16px_16px]" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-neon-cyan/10 to-transparent" />
          </div>
        )}

        {/* 模拟数字城市光点 */}
        {videoContent === 'city' && (
          <div className="absolute inset-0 opacity-40">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-[2px] h-[2px] bg-neon-cyan rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  opacity: 0.3 + Math.random() * 0.7,
                }}
              />
            ))}
          </div>
        )}

        {/* 模拟AI机房服务器线条 */}
        {videoContent === 'ai-room' && (
          <div className="absolute inset-0 opacity-30">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent"
                style={{ top: `${(i + 1) * 12.5}%` }}
              />
            ))}
          </div>
        )}
      </div>

      {/* 半透明遮罩 */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />

      {/* 标题条 */}
      <div className="absolute top-3 left-3 px-3 py-1 rounded-full glass-panel bg-white/5">
        <span className="text-xs font-light text-white/70 tracking-wider">
          {title}
        </span>
      </div>
    </div>
  );
};

export default VideoWindow;
