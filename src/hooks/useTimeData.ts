'use client';

import { useState, useEffect, useCallback } from 'react';
import type { TimeData } from '@/utils/planetData';

function formatTime(): TimeData {
  const now = new Date();
  const baseDate = new Date('2050-01-01T00:00:00Z');
  const diffMs = now.getTime() - baseDate.getTime();
  const starDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const starYear = 2050 + Math.floor(starDays / 365.25);
  const starDayOfYear = starDays % 365;

  const starDate = `STAR-YEAR ${starYear}.${String(starDayOfYear).padStart(3, '0')}`;

  const coordX = (Math.sin(now.getTime() / 1000000) * 1000).toFixed(2);
  const coordY = (Math.cos(now.getTime() / 1200000) * 1000).toFixed(2);
  const coordZ = (Math.sin(now.getTime() / 800000) * 1000).toFixed(2);
  const cosmicCoord = `GAL-${coordX}:${coordY}:${coordZ}`;

  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const localTime = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  return {
    starDate,
    cosmicCoordinate: cosmicCoord,
    timezone: tz,
    localTime,
  };
}

export function useTimeData() {
  const [timeData, setTimeData] = useState<TimeData>(formatTime());

  const update = useCallback(() => {
    setTimeData(formatTime());
  }, []);

  useEffect(() => {
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [update]);

  return timeData;
}