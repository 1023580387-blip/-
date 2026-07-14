import { motion } from "framer-motion";
import { ShoppingBag, Check } from "lucide-react";
import type { Product } from "../../types";
import { useCurrencyStore } from "../../store/useCurrencyStore";
import { useCartStore } from "../../store/useCartStore";
import { formatPrice } from "../../data/currencies";
import { useState } from "react";

interface Props {
  product: Product;
}

export default function ProductInfoPanel({ product }: Props) {
  const { currency } = useCurrencyStore();
  const { addItem, items } = useCartStore();
  const [added, setAdded] = useState(false);

  const isInCart = items.some((item) => item.productId === product.id);

  const handleAddToCart = () => {
    addItem(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="glass-panel p-8 lg:p-10">
      {/* Brand */}
      <motion.span
        className="text-[10px] tracking-[0.4em] text-havok-accent/60 uppercase block mb-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {product.brand}
      </motion.span>

      {/* Name */}
      <motion.h1
        className="font-display text-display-sm lg:text-display-md text-havok-gold leading-tight mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {product.name}
      </motion.h1>

      {/* Price */}
      <motion.div
        className="flex items-baseline gap-2 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <span className="font-mono text-2xl text-havok-gold">
          {formatPrice(product.price, currency)}
        </span>
        <span className="text-xs text-havok-platinum/40 tracking-wider">{currency}</span>
      </motion.div>

      <div className="metal-divider mb-6" />

      {/* Description */}
      <motion.p
        className="text-sm text-havok-platinum/50 leading-relaxed tracking-wider mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {product.description}
      </motion.p>

      {/* Meta */}
      <motion.div
        className="grid grid-cols-2 gap-4 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div>
          <span className="text-[9px] tracking-[0.2em] text-havok-platinum/30 uppercase block mb-1">
            Origin
          </span>
          <span className="text-xs text-havok-platinum/60 tracking-wider">{product.origin}</span>
        </div>
        {product.isLimited && (
          <div>
            <span className="text-[9px] tracking-[0.2em] text-havok-platinum/30 uppercase block mb-1">
              Limited Edition
            </span>
            <span className="text-xs text-havok-accent/70 tracking-wider font-mono">
              {product.limitNumber}
            </span>
          </div>
        )}
        <div>
          <span className="text-[9px] tracking-[0.2em] text-havok-platinum/30 uppercase block mb-1">
            Year
          </span>
          <span className="text-xs text-havok-platinum/60 tracking-wider">{product.year}</span>
        </div>
        <div>
          <span className="text-[9px] tracking-[0.2em] text-havok-platinum/30 uppercase block mb-1">
            Availability
          </span>
          <span className="text-xs text-havok-platinum/60 tracking-wider">
            {product.regions.length} regions
          </span>
        </div>
      </motion.div>

      <div className="metal-divider mb-6" />

      {/* Details */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h3 className="text-[10px] tracking-[0.3em] text-havok-platinum/30 uppercase mb-4">
          Specifications
        </h3>
        <ul className="space-y-2">
          {product.details.map((detail, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-havok-platinum/50 tracking-wider">
              <span className="w-1 h-1 rounded-full bg-havok-platinum/20 mt-1.5 flex-shrink-0" />
              {detail}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Custom Services */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <h3 className="text-[10px] tracking-[0.3em] text-havok-platinum/30 uppercase mb-4">
          Customization Services
        </h3>
        <div className="flex flex-wrap gap-2">
          {product.customService.map((service, i) => (
            <span
              key={i}
              className="text-[10px] tracking-wider px-3 py-1.5 border border-havok-border/20 text-havok-platinum/50"
            >
              {service}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Add to Cart */}
      <motion.button
        onClick={handleAddToCart}
        className={`w-full flex items-center justify-center gap-3 py-4 text-sm tracking-[0.2em] uppercase transition-all duration-500 ${
          added || isInCart
            ? "border border-havok-accent/40 text-havok-accent bg-havok-accent/5"
            : "btn-havok-primary"
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        {added || isInCart ? (
          <>
            <Check className="w-4 h-4" />
            In Cart
          </>
        ) : (
          <>
            <ShoppingBag className="w-4 h-4" />
            Add to Cart
          </>
        )}
      </motion.button>
    </div>
  );
}