'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { products, storeLocations } from '@/lib/data';
import Product360Viewer from '@/components/Product360Viewer';
import PageTransition from '@/components/PageTransition';

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

function CountUpPrice({ price, currency }: { price: number; currency: string }) {
  return (
    <motion.span
      className="number-roll inline-block"
      key={price}
    >
      <span className="text-display-md font-light text-havok-platinum tracking-tight">
        {formatPrice(price, currency)}
      </span>
    </motion.span>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';

  const product = products.find((p) => p.id === id);

  // ── 404 Not Found ──
  if (!product) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center bg-havok-carbon px-6">
          <div className="glass-panel p-12 text-center max-w-lg w-full">
            <p className="text-label uppercase tracking-[0.12em] text-havok-silver mb-4">
              Product Not Found
            </p>
            <h1 className="text-display-md font-thin text-havok-platinum mb-4">
              404
            </h1>
            <p className="text-detail text-havok-text-muted leading-relaxed mb-8">
              The piece you are looking for does not exist or has been removed from our collection.
            </p>
            <Link
              href="/"
              className="inline-block glass-panel px-6 py-3 text-label uppercase tracking-[0.08em] text-havok-frost hover:text-havok-frost-light transition-colors duration-300"
            >
              Return to Collection
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  // ── Matched stores for boutique availability ──
  const matchedStores = storeLocations.filter((store) =>
    product.stockRegions.some(
      (region) =>
        region.code === store.continent ||
        store.address.includes(region.storeAddress?.split(',')[0] || '') ||
        region.storeAddress === store.address
    )
  );

  const stockRegionForStore = (store: (typeof storeLocations)[number]) => {
    return product.stockRegions.find(
      (r) =>
        r.code === store.continent ||
        r.storeAddress === store.address ||
        store.address.includes(r.storeAddress?.split(',')[0] || '')
    );
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-havok-carbon">
        {/* ──────────────── TOP SECTION: LEFT/RIGHT SPLIT ──────────────── */}
        <div className="mx-auto max-w-[1440px] flex flex-col lg:flex-row gap-0 px-4 pt-24 pb-8 lg:px-8 lg:pt-32 lg:pb-16">
          {/* ── LEFT: Product Gallery (60%) ── */}
          <motion.div
            className="w-full lg:w-[60%] lg:pr-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            <Product360Viewer
              images={product.images.length > 0 ? product.images : []}
              productName={product.name}
            />
          </motion.div>

          {/* ── RIGHT: Info Panel (40%) ── */}
          <motion.div
            className="w-full lg:w-[40%] mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="glass-panel p-6 lg:p-8 space-y-6">
              {/* Brand */}
              <p className="text-label uppercase tracking-[0.12em] text-havok-silver">
                {product.brand}
              </p>

              {/* Product Name */}
              <h1 className="text-display-md font-thin text-havok-platinum leading-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div>
                <CountUpPrice price={product.price} currency={product.currency} />
              </div>

              {/* Limited Edition Badge */}
              {product.limitedEdition && (
                <div>
                  <span className="inline-block rounded-full border border-havok-frost/30 bg-havok-frost/10 px-4 py-1 text-label text-havok-frost">
                    LIMITED EDITION
                    {product.limitedNumber != null && (
                      <span className="ml-1 text-havok-frost/70">
                        /{product.limitedNumber}
                      </span>
                    )}
                  </span>
                </div>
              )}

              <div className="metal-divider" />

              {/* Stock Region Indicator */}
              <div>
                <p className="text-label uppercase tracking-[0.08em] text-havok-silver mb-3">
                  Regional Availability
                </p>
                <div className="space-y-2">
                  {product.stockRegions.map((region) => (
                    <div
                      key={region.code}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-block h-2 w-2 rounded-full ${
                            region.inStock ? 'bg-havok-frost' : 'bg-havok-text-muted'
                          }`}
                        />
                        <span className="text-detail text-havok-platinum">
                          {region.region}
                        </span>
                      </div>
                      <span className="text-detail text-havok-text-muted">
                        {region.inStock ? `${region.quantity} available` : 'Out of stock'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="metal-divider" />

              {/* Description */}
              <p className="text-detail text-havok-text-muted leading-relaxed">
                {product.description}
              </p>

              {/* Features */}
              {product.features.length > 0 && (
                <div>
                  <p className="text-label uppercase tracking-[0.08em] text-havok-silver mb-3">
                    Features
                  </p>
                  <ul className="space-y-1.5">
                    {product.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-detail text-havok-text-muted"
                      >
                        <span className="mt-0.5 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-havok-silver/40" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="metal-divider" />

              {/* Heritage */}
              <p className="text-sm italic text-havok-frost/70 leading-relaxed">
                {product.heritage}
              </p>

              {/* Customization Availability */}
              <div className="flex items-center gap-2">
                <span
                  className={`inline-block h-1.5 w-1.5 rounded-full ${
                    product.customizationAvailable
                      ? 'bg-havok-frost'
                      : 'bg-havok-text-muted'
                  }`}
                />
                <span className="text-detail text-havok-silver">
                  {product.customizationAvailable
                    ? 'Customization available'
                    : 'No customization available'}
                </span>
              </div>

              <div className="metal-divider" />

              {/* Add to Shopping Bag */}
              <button
                type="button"
                className="w-full rounded-sm bg-havok-frost px-6 py-3.5 text-label uppercase tracking-[0.1em] text-havok-carbon transition-all duration-300 hover:bg-havok-frost-light active:scale-[0.98]"
              >
                Add to Shopping Bag
              </button>

              {/* Request Private Appointment */}
              <div className="text-center">
                <Link
                  href="/stores"
                  className="text-detail text-havok-silver underline-offset-4 hover:text-havok-frost hover:underline transition-colors duration-300"
                >
                  Request Private Appointment
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ──────────────── BOTTOM: Global Boutique Availability ──────────────── */}
        <div className="mx-auto max-w-[1440px] px-4 pb-20 lg:px-8">
          <div className="metal-divider mb-10" />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-heading font-light text-havok-platinum mb-8">
              Global Boutique Availability
            </h2>

            {matchedStores.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {matchedStores.map((store) => {
                  const region = stockRegionForStore(store);
                  return (
                    <div
                      key={store.id}
                      className="glass-panel p-5 space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-light text-havok-platinum">
                            {store.city}
                          </p>
                          <p className="text-detail text-havok-text-muted mt-0.5">
                            {store.address}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <span
                            className={`inline-block h-2 w-2 rounded-full ${
                              region?.inStock ? 'bg-havok-frost' : 'bg-havok-text-muted'
                            }`}
                          />
                          <span className="text-detail text-havok-text-muted">
                            {region?.inStock ? 'In Stock' : 'Unavailable'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-detail text-havok-text-muted">
                No boutique availability information available at this time.
              </p>
            )}

            <div className="mt-8">
              <Link
                href="/stores"
                className="inline-flex items-center gap-2 text-label uppercase tracking-[0.08em] text-havok-frost hover:text-havok-frost-light transition-colors duration-300"
              >
                <span>View All Boutiques</span>
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}