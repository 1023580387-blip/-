import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/products/${product.id}`}>
        <div className="relative bg-havoc-dark/50 border border-havoc-blue/20 rounded-lg p-8 glow-border-hover overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-havoc-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Content */}
          <div className="relative z-10">
            <h3 className="font-orbitron text-3xl font-bold text-gradient mb-4">
              {product.name}
            </h3>
            <p className="font-rajdhani text-lg text-havoc-blue/80 mb-6 italic">
              "{product.slogan}"
            </p>
            <p className="font-rajdhani text-white/70 mb-6">
              {product.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {product.features.slice(0, 3).map((feature, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-havoc-blue/10 border border-havoc-blue/30 rounded text-xs text-havoc-blue font-rajdhani"
                >
                  {feature}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <span className="font-rajdhani text-havoc-blue text-sm">
                查看详情 →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
