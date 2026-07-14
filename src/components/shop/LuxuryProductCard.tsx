import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Product } from "../../types";
import { useCurrencyStore } from "../../store/useCurrencyStore";
import { formatPrice } from "../../data/currencies";

interface Props {
  product: Product;
  index: number;
}

export default function LuxuryProductCard({ product, index }: Props) {
  const { currency } = useCurrencyStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={`/product/${product.id}`}
        className="block group"
      >
        <div className="relative aspect-square overflow-hidden border border-havok-border/10 transition-all duration-700 group-hover:border-havok-border/30">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
            style={{ backgroundImage: `url(${product.images[0]})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-havok-base/80 via-transparent to-transparent" />
          {/* Limited badge */}
          {product.isLimited && (
            <div className="absolute top-3 left-3">
              <span className="text-[8px] tracking-[0.2em] px-2 py-1 border border-havok-accent/30 text-havok-accent/70 bg-havok-base/60 uppercase">
                Limited
              </span>
            </div>
          )}
          {/* Scan line overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 scan-line-overlay" />
        </div>

        <div className="mt-4 px-1">
          <span className="text-[10px] tracking-[0.2em] text-havok-platinum/40 uppercase block mb-1">
            {product.brand}
          </span>
          <h3 className="font-display text-base text-havok-gold leading-tight mb-1 group-hover:text-havok-platinum transition-colors duration-500">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="font-mono text-sm text-havok-platinum/60">
              {formatPrice(product.price, currency)}
            </span>
            <span className="text-[9px] tracking-[0.15em] text-havok-platinum/25 uppercase">
              {product.regions.length} regions
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}