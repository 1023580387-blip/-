import { motion } from "framer-motion";
import type { Product } from "../../types";
import LuxuryProductCard from "./LuxuryProductCard";

interface Props {
  products: Product[];
}

export default function ProductGrid({ products }: Props) {
  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="col-span-full flex flex-col items-center justify-center py-32"
      >
        <span className="text-[10px] tracking-[0.3em] text-havok-platinum/25 uppercase mb-4">
          No items found
        </span>
        <p className="text-sm text-havok-platinum/30">
          Try adjusting your filters to discover more pieces.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
      {products.map((product, i) => (
        <LuxuryProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  );
}