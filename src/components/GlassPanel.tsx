import React from 'react';

interface GlassPanelProps {
  children?: React.ReactNode;
  className?: string;
  animationDelay?: number;
  animationType?: 'float-slow' | 'float-slower' | 'drift';
  style?: React.CSSProperties;
}

const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className = '',
  animationDelay = 0,
  animationType = 'float-slow',
  style,
}) => {
  return (
    <div
      className={`glass-panel glow-edge rounded-2xl overflow-hidden relative ${animationType} ${className}`}
      style={{
        animationDelay: `${animationDelay}s`,
        transform: 'translateZ(0)',
        willChange: 'transform',
        ...style,
      }}
    >
      {/* 水波纹动态效果背景层 */}
      <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-white/20 via-transparent to-white/10 animate-ripple" />
      {children}
    </div>
  );
};

export default GlassPanel;
