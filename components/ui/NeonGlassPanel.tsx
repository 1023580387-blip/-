'use client';

interface NeonGlassPanelProps {
  children: React.ReactNode;
  glowColor?: 'cyan' | 'magenta' | 'purple';
  className?: string;
}

export function NeonGlassPanel({ 
  children, 
  glowColor = 'cyan',
  className = '' 
}: NeonGlassPanelProps) {
  const glowColors = {
    cyan: 'shadow-neon-cyan border-cyber-cyan/30',
    magenta: 'shadow-neon-magenta border-cyber-magenta/30',
    purple: 'shadow-neon-cyan border-purple-500/30',
  };

  return (
    <div className={`neon-glass rounded-lg p-6 ${glowColors[glowColor]} ${className}`}>
      {children}
    </div>
  );
}
