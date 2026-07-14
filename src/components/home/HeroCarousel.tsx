import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { HeroSlide } from "../../types";

const slides: HeroSlide[] = [
  {
    id: "slide-1",
    productId: "havok-001",
    image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=1600&q=80",
    title: "CHRONOMÈTRE SOUVERAIN",
    subtitle: "The Pursuit of Absolute Precision",
    brand: "LAURENT FERRIER",
  },
  {
    id: "slide-2",
    productId: "havok-005",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600&q=80",
    title: "CELESTIAL PARURE",
    subtitle: "142 Carats of D-Flawless Diamonds",
    brand: "GRAFF",
  },
  {
    id: "slide-3",
    productId: "havok-003",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1600&q=80",
    title: "SOIE IMPÉRIALE",
    subtitle: "400 Hours of Hand Embroidery",
    brand: "MAISON MARGIELA",
  },
  {
    id: "slide-4",
    productId: "havok-018",
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=1600&q=80",
    title: "SKY MOON TOURBILLON",
    subtitle: "The Most Complicated Wristwatch Ever Created",
    brand: "PATEK PHILIPPE",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "15%" : "-15%", opacity: 0, scale: 1.02 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-15%" : "15%", opacity: 0, scale: 0.98 }),
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-havok-base">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-tracks opacity-30" />

      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={current}
          className="absolute inset-0"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-havok-base via-havok-base/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-havok-base/70 via-transparent to-havok-base/70" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-[1440px] mx-auto w-full px-6 lg:px-12 mt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[current].id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="max-w-2xl"
            >
              <span className="text-[10px] tracking-[0.4em] text-havok-accent/60 uppercase mb-4 block">
                {slides[current].brand}
              </span>
              <h1 className="font-display text-display-xl text-havok-gold mb-4 leading-tight">
                {slides[current].title}
              </h1>
              <p className="text-lg text-havok-platinum/50 font-light tracking-wider mb-8">
                {slides[current].subtitle}
              </p>
              <Link
                to={`/product/${slides[current].productId}`}
                className="btn-havok-primary inline-block"
              >
                Discover
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-havok-platinum/15 rounded-full text-havok-platinum/40 hover:text-havok-gold hover:border-havok-accent/40 transition-all duration-500"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-havok-platinum/15 rounded-full text-havok-platinum/40 hover:text-havok-gold hover:border-havok-accent/40 transition-all duration-500"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Progress Dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            className="group relative"
          >
            <span className="block w-12 h-px bg-havok-platinum/15 transition-all duration-500 group-hover:bg-havok-platinum/30">
              {i === current && (
                <motion.span
                  className="absolute inset-0 bg-havok-accent/60"
                  layoutId="hero-progress"
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </span>
          </button>
        ))}
      </div>

      {/* Scan Line */}
      <div className="absolute inset-0 pointer-events-none scan-line-overlay" />
    </section>
  );
}