'use client';

interface DataFlowLineProps {
  direction?: 'horizontal' | 'vertical';
  color?: 'cyan' | 'magenta';
  className?: string;
}

export function DataFlowLine({ 
  direction = 'horizontal', 
  color = 'cyan',
  className = '' 
}: DataFlowLineProps) {
  const colors = {
    cyan: 'from-transparent via-cyber-cyan to-transparent',
    magenta: 'from-transparent via-cyber-magenta to-transparent',
  };

  const directionStyles = {
    horizontal: 'h-px w-full bg-gradient-to-r',
    vertical: 'w-px h-full bg-gradient-to-b',
  };

  return (
    <div className={`${directionStyles[direction]} ${colors[color]} data-flow ${className}`} />
  );
}
