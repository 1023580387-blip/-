'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Product360ViewerProps {
  images: string[];
  productName: string;
}

export default function Product360Viewer({
  images,
  productName,
}: Product360ViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<number>(0);
  const dragAccumulatedRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<number>(0);
  const touchStartXRef = useRef<number>(0);

  const totalImages = images.length;
  const DRAG_THRESHOLD = 60; // px to trigger image change

  const goToIndex = useCallback(
    (index: number) => {
      if (index < 0) {
        setCurrentIndex(totalImages - 1);
      } else if (index >= totalImages) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(index);
      }
    },
    [totalImages],
  );

  const goNext = useCallback(() => {
    goToIndex(currentIndex + 1);
  }, [currentIndex, goToIndex]);

  const goPrev = useCallback(() => {
    goToIndex(currentIndex - 1);
  }, [currentIndex, goToIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goNext();
      } else if (e.key === 'ArrowLeft') {
        goPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);

  // Mouse drag handlers
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      dragStartRef.current = e.clientX;
      dragAccumulatedRef.current = 0;
      setDragDistance(0);
    },
    [],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      const delta = e.clientX - dragStartRef.current;
      dragAccumulatedRef.current = delta;
      setDragDistance(delta);
    },
    [isDragging],
  );

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    setDragDistance(0);

    const delta = dragAccumulatedRef.current;
    if (Math.abs(delta) >= DRAG_THRESHOLD) {
      if (delta > 0) {
        goPrev();
      } else {
        goNext();
      }
    }
    dragAccumulatedRef.current = 0;
  }, [isDragging, goNext, goPrev]);

  const handleMouseLeave = useCallback(() => {
    if (isDragging) {
      handleMouseUp();
    }
  }, [isDragging, handleMouseUp]);

  // Touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
    touchStartXRef.current = e.touches[0].clientX;
    setDragDistance(0);
    dragAccumulatedRef.current = 0;
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      const delta = e.touches[0].clientX - touchStartRef.current;
      dragAccumulatedRef.current = delta;
      setDragDistance(delta);
    },
    [],
  );

  const handleTouchEnd = useCallback(() => {
    setDragDistance(0);
    const delta = dragAccumulatedRef.current;
    if (Math.abs(delta) >= DRAG_THRESHOLD) {
      if (delta > 0) {
        goPrev();
      } else {
        goNext();
      }
    }
    dragAccumulatedRef.current = 0;
  }, [goNext, goPrev]);

  if (totalImages === 0) {
    return (
      <div className="flex items-center justify-center aspect-[4/3] bg-havok-graphite rounded-lg">
        <p className="text-havok-silver text-sm tracking-[0.06em]">
          No images available
        </p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full select-none">
      {/* ─── Main Image Display ─── */}
      <div
        className="relative overflow-hidden rounded-lg bg-havok-carbon cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Aspect ratio container */}
        <div className="relative aspect-[4/3]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.35,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              {/* Drag offset transform */}
              <motion.div
                className="h-full w-full"
                animate={{
                  x: isDragging ? dragDistance : 0,
                }}
                transition={
                  isDragging
                    ? { duration: 0 }
                    : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                }
              >
                <img
                  src={images[currentIndex]}
                  alt={`${productName} - Angle ${currentIndex + 1}`}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Vignette / dark overlay */}
          <div className="pointer-events-none absolute inset-0 rounded-lg bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(13,13,14,0.55)_100%)]" />

          {/* 360° Badge */}
          <div className="pointer-events-none absolute top-3 left-3">
            <span className="inline-flex items-center gap-1.5 rounded-sm border border-havok-frost/30 bg-havok-carbon/60 px-2.5 py-1 backdrop-blur-sm">
              <svg
                className="h-3.5 w-3.5 text-havok-frost"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10" />
                <path d="M12 2a15.3 15.3 0 00-4 10 15.3 15.3 0 004 10" />
                <path d="M2 12h20" />
              </svg>
              <span className="text-label text-havok-frost tracking-[0.08em]">
                360°
              </span>
            </span>
          </div>

          {/* Image counter */}
          <div className="pointer-events-none absolute bottom-3 right-3">
            <span className="inline-block rounded-sm bg-havok-carbon/60 px-2.5 py-1 text-detail text-havok-platinum backdrop-blur-sm tracking-[0.04em]">
              {currentIndex + 1} / {totalImages}
            </span>
          </div>

          {/* Drag hint */}
          {!isDragging && (
            <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center lg:hidden">
              <span className="text-[10px] text-havok-silver tracking-[0.06em] opacity-60">
                Swipe to rotate
              </span>
            </div>
          )}
        </div>

        {/* Navigation arrows (desktop) */}
        <button
          onClick={goPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-havok-carbon/50 backdrop-blur-sm border border-havok-glass-border text-havok-platinum hover:text-havok-platinum-light hover:bg-havok-graphite/60 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:opacity-100"
          style={{ opacity: isDragging ? 0 : undefined }}
          aria-label="Previous angle"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          onClick={goNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-havok-carbon/50 backdrop-blur-sm border border-havok-glass-border text-havok-platinum hover:text-havok-platinum-light hover:bg-havok-graphite/60 transition-all duration-300"
          style={{ opacity: isDragging ? 0 : undefined }}
          aria-label="Next angle"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* ─── Thumbnail Strip ─── */}
      {totalImages > 1 && (
        <div className="mt-4 glass-panel px-3 py-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {images.map((image, index) => {
              const isActive = index === currentIndex;
              return (
                <motion.button
                  key={index}
                  onClick={() => goToIndex(index)}
                  className={`relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden transition-all duration-300 ${
                    isActive
                      ? 'ring-1 ring-havok-frost/60'
                      : 'ring-1 ring-transparent hover:ring-havok-glass-border'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    scale: isActive ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  aria-label={`View angle ${index + 1}`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <img
                    src={image}
                    alt={`${productName} angle ${index + 1}`}
                    className="h-full w-full object-cover"
                    draggable={false}
                  />

                  {/* Active indicator overlay */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-havok-frost/10"
                      layoutId="activeThumbnail"
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}

                  {/* Inactive dim overlay */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-havok-carbon/40" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}