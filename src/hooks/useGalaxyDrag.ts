'use client';

import { useCallback, useRef } from 'react';
import { useGalaxyStore } from '@/store/useGalaxyStore';

export function useGalaxyDrag() {
  const { rotation, setRotation, isDragging, setIsDragging, dragStart, setDragStart } =
    useGalaxyStore();
  const lastRotation = useRef(rotation);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
      lastRotation.current = rotation;
    },
    [rotation, setIsDragging, setDragStart]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      setRotation({
        x: lastRotation.current.x + dy * 0.005,
        y: lastRotation.current.y + dx * 0.005,
      });
    },
    [isDragging, dragStart, setRotation]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, [setIsDragging]);

  return {
    isDragging,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
}