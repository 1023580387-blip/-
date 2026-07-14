"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: string;
  link: string;
}

interface HeroCarouselProps {
  slides: HeroSlide[];
}

export default function HeroCarousel({ slides }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection);
      setCurrent((prev) => {
        const next = prev + newDirection;
        if (next < 0) return slides.length - 1;
        if (next >= slides.length) return 0;
        return next;
      });
    },
    [slides.length]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 7000);
    return () => clearInterval(timer);
  }, [paginate]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  const slide = slides[current];

  return (
    <div className="relative w-full h-screen max-h-[900px] min-h-[600px] overflow-hidden bg-havok-carbon">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "tween", duration: 1.2, ease: [0.4, 0, 0.2, 1] },
            opacity: { duration: 0.8 },
          }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-havok-carbon/90 via-havok-carbon/50 to-havok-carbon/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-havok-carbon via-transparent to-havok-carbon/40" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={current + "-content"}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl"
            >
              <motion.p
                className="text-label text-havok-frost uppercase tracking-[0.2em] mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {slide.subtitle}
              </motion.p>
              <motion.h1
                className="text-display-xl md:text-display-xl text-havok-platinum font-[200] tracking-tight mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {slide.title}
              </motion.h1>
              <motion.p
                className="text-lg text-havok-silver/80 font-[300] leading-relaxed mb-10 max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                {slide.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Link
                  href={slide.link}
                  className="inline-flex items-center gap-3 px-8 py-3.5 border border-havok-frost/40 text-havok-frost hover:bg-havok-frost/10 hover:border-havok-frost/60 transition-all duration-500 text-sm tracking-[0.1em] uppercase"
                >
                  {slide.cta}
                  <span className="text-havok-frost/60">&rarr;</span>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className="group relative"
          >
            <span
              className={`block w-12 h-[1px] transition-all duration-700 ${
                i === current
                  ? "bg-havok-platinum"
                  : "bg-havok-silver/20 group-hover:bg-havok-silver/40"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-havok-silver/40 hover:text-havok-platinum transition-colors duration-300"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-havok-silver/40 hover:text-havok-platinum transition-colors duration-300"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}