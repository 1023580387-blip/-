'use client';
import { useCountUp } from '@/hooks/useCountUp';

interface CountUpNumberProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export default function CountUpNumber({ end, suffix = '', prefix = '', duration = 2000, className = '' }: CountUpNumberProps) {
  const count = useCountUp(end, duration);

  return (
    <span className={`time-font value-flicker ${className}`}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}