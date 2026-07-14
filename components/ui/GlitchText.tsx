'use client';

interface GlitchTextProps {
  children: React.ReactNode;
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

export function GlitchText({ children, intensity = 'medium', className = '' }: GlitchTextProps) {
  const intensityMap = {
    low: 'animate-pulse',
    medium: 'animate-glitch',
    high: 'animate-glitch',
  };

  return (
    <span className={`glitch-text ${intensityMap[intensity]} ${className}`} data-text={children}>
      {children}
    </span>
  );
}
