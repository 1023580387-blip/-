'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { LuxuryProduct } from '@/lib/types';

interface LuxuryProductCardProps {
  product: LuxuryProduct;
  index?: number;
}

export default function LuxuryProductCard({
  product,
  index = 0,
}: LuxuryProductCardProps) {
  const firstImage = product.images[0] || '';

  const primaryStockRegion =
    product.stockRegions.find((r) => r.inStock) || product.stockRegions[0];

  function formatPrice(price: number, currency: string): string {
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price);
    } catch {
      return price.toLocaleString();
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -4 }}
      className="glass-panel scan-border group cursor-pointer hover:shadow-lg hover:shadow-havok-frost/5"
    >
      <Link href={`/product/${product.id}`} className="block">
        {/* Image area — square aspect ratio */}
        <div className="relative aspect-square overflow-hidden bg-havok-graphite">
          {firstImage && (
            <motion.img
              src={firstImage}
              alt={product.name}
              className="h-full w-full object-cover"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          )}

          {/* Dark gradient overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-havok-carbon/80 via-transparent to-transparent" />

          {/* Limited edition badge */}
          {product.limitedEdition && (
            <div className="absolute left-3 top-3">
              <span className="inline-block rounded-sm border border-havok-frost/30 bg-havok-carbon/70 px-2 py-0.5 text-label text-havok-frost backdrop-blur-sm">
                LIMITED EDITION
                {product.limitedNumber != null && (
                  <span className="ml-0.5 text-havok-frost/70">
                    /{product.limitedNumber}
                  </span>
                )}
              </span>
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="space-y-1.5 p-4">
          <p className="text-detail uppercase tracking-[0.08em] text-havok-silver">
            {product.brand}
          </p>

          <h3 className="line-clamp-2 text-sm font-light leading-tight text-havok-platinum">
            {product.name}
          </h3>

          <div className="flex items-center justify-between pt-1">
            <span className="text-sm font-light text-havok-platinum-light">
              {formatPrice(product.price, product.currency)}
            </span>

            {primaryStockRegion && (
              <div className="flex items-center gap-1.5">
                <span
                  className={`inline-block h-1.5 w-1.5 rounded-full ${
                    primaryStockRegion.inStock
                      ? 'bg-havok-frost'
                      : 'bg-havok-text-muted'
                  }`}
                />
                <span className="text-detail text-havok-text-muted">
                  {primaryStockRegion.region}
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}