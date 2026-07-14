import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { brands } from "../../data/brands";
import { products } from "../../data/products";
import { useCurrencyStore } from "../../store/useCurrencyStore";
import { formatPrice } from "../../data/currencies";

export default function ArchiveTimeline() {
  const { currency } = useCurrencyStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const allEvents = brands.flatMap((brand) =>
    brand.timelineEvents.map((event) => ({
      ...event,
      brandName: brand.name,
      brandId: brand.id,
    }))
  ).sort((a, b) => parseInt(a.year) - parseInt(b.year));

  return (
    <div ref={containerRef} className="relative">
      {/* Timeline Line */}
      <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-havok-border/10">
        <motion.div
          className="absolute top-0 left-0 right-0 bg-havok-accent/40"
          style={{ height: lineHeight }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {allEvents.map((event, i) => {
          const isLeft = i % 2 === 0;
          const eventProduct = event.productId
            ? products.find((p) => p.id === event.productId)
            : null;

          return (
            <motion.div
              key={`${event.brandId}-${event.year}`}
              className={`relative flex items-start mb-16 lg:mb-24 ${
                isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Dot */}
              <div className="absolute left-8 lg:left-1/2 top-0 w-3 h-3 -translate-x-1/2 rounded-full border border-havok-accent/40 bg-havok-base z-10">
                <div className="absolute inset-1 rounded-full bg-havok-accent/60" />
              </div>

              {/* Content */}
              <div
                className={`ml-16 lg:ml-0 lg:w-[calc(50%-2rem)] ${
                  isLeft ? "lg:pr-8 lg:text-right" : "lg:pl-8 lg:text-left"
                }`}
              >
                <span className="font-mono text-sm text-havok-accent/70 block mb-1">
                  {event.year}
                </span>
                <span className="text-[10px] tracking-[0.2em] text-havok-platinum/40 uppercase block mb-2">
                  {event.brandName}
                </span>
                <h3 className="font-display text-xl text-havok-gold mb-2">{event.title}</h3>
                <p className="text-xs text-havok-platinum/50 leading-relaxed tracking-wider mb-3">
                  {event.description}
                </p>

                {eventProduct && (
                  <Link
                    to={`/product/${eventProduct.id}`}
                    className="inline-block group"
                  >
                    <div className="relative w-32 h-32 border border-havok-border/10 overflow-hidden transition-all duration-500 group-hover:border-havok-border/30">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(${eventProduct.images[0]})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-havok-base/70 via-transparent to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <span className="text-[8px] tracking-wider text-havok-platinum/60 block">
                          {eventProduct.name}
                        </span>
                        <span className="text-[9px] font-mono text-havok-accent/70">
                          {formatPrice(eventProduct.price, currency)}
                        </span>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}