import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  images: string[];
}

export default function Product360Viewer({ images }: Props) {
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - dragStart.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setCurrent((prev) => (prev - 1 + images.length) % images.length);
      } else {
        setCurrent((prev) => (prev + 1) % images.length);
      }
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="relative aspect-square overflow-hidden border border-havok-border/20 cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <motion.div
          key={current}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${images[current]})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 scan-line-overlay" />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.2em] text-havok-platinum/30 uppercase bg-havok-base/60 px-3 py-1.5">
          Drag to rotate · {current + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 mt-4">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`relative w-16 h-16 flex-shrink-0 border transition-all duration-500 ${
              i === current
                ? "border-havok-accent/60"
                : "border-havok-border/20 hover:border-havok-border/40 opacity-50 hover:opacity-80"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${img})` }}
            />
          </button>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={() => setCurrent((prev) => (prev - 1 + images.length) % images.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-havok-platinum/15 bg-havok-base/60 text-havok-platinum/40 hover:text-havok-gold hover:border-havok-accent/40 transition-all duration-500"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={() => setCurrent((prev) => (prev + 1) % images.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-havok-platinum/15 bg-havok-base/60 text-havok-platinum/40 hover:text-havok-gold hover:border-havok-accent/40 transition-all duration-500"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}