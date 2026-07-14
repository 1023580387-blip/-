'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CheckoutGlassPanel from '@/components/CheckoutGlassPanel';
import PageTransition from '@/components/PageTransition';
import { products } from '@/lib/data';
import type { CartItem } from '@/lib/types';

const sampleCartItems: CartItem[] = [
  {
    product: products[0], // Havok Chronograph X1
    quantity: 1,
    customization: 'Engraved initials: J.R.',
    packaging: 'premium',
    region: 'North America',
  },
  {
    product: products[2], // Sapphire Nebula Necklace
    quantity: 1,
    packaging: 'collector',
    region: 'Middle East',
  },
  {
    product: products[3], // Carbon Touring Luggage Set
    quantity: 2,
    packaging: 'standard',
    region: 'Europe',
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(sampleCartItems);

  const handleUpdateQuantity = useCallback(
    (productId: string, quantity: number) => {
      setCartItems((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item,
        ),
      );
    },
    [],
  );

  const handleRemoveItem = useCallback((productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const handleCheckout = useCallback(() => {
    // Demo checkout — no-op
  }, []);

  const isEmpty = cartItems.length === 0;

  return (
    <PageTransition>
      <div className="min-h-screen bg-havok-carbon">
        <div className="max-w-[1440px] mx-auto py-24 px-4 sm:px-6 lg:px-8">
          {/* ─── Header ─── */}
          <div className="mb-12 text-center">
            <h1 className="text-display-md font-[250] text-havok-platinum tracking-[-0.02em]">
              Shopping Bag
            </h1>
            <p className="mt-3 text-sm text-havok-silver font-[300] tracking-[0.04em]">
              Review your selections
            </p>
          </div>

          {/* ─── Main Content ─── */}
          {isEmpty ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <div className="glass-panel w-full max-w-lg mx-auto py-16 px-8 text-center">
                <div className="mb-6">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.8"
                    className="text-havok-text-muted mx-auto"
                  >
                    <rect x="6" y="8" width="36" height="32" rx="2" />
                    <path d="M6 16h36" />
                    <circle cx="16" cy="26" r="2" />
                    <circle cx="32" cy="26" r="2" />
                  </svg>
                </div>
                <h2 className="text-lg font-[250] text-havok-platinum tracking-[0.06em] mb-2">
                  Your shopping bag is empty
                </h2>
                <p className="text-sm text-havok-text-muted font-[300] tracking-[0.04em] mb-8">
                  Discover our curated collections of exceptional luxury pieces.
                </p>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 rounded-sm border border-havok-frost/30 bg-havok-frost/8 px-5 py-2.5 text-sm text-havok-frost font-[300] tracking-[0.08em] uppercase hover:bg-havok-frost/12 transition-colors duration-300"
                >
                  Explore Collection
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center">
              {/* ─── Checkout Glass Panel ─── */}
              <div className="w-full max-w-2xl">
                <CheckoutGlassPanel
                  items={cartItems}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                  onCheckout={handleCheckout}
                />
              </div>

              {/* ─── Continue Shopping ─── */}
              <div className="mt-8">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 text-sm text-havok-silver hover:text-havok-platinum font-[300] tracking-[0.04em] transition-colors duration-300"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  >
                    <path d="M19 12H5M11 19l-7-7 7-7" />
                  </svg>
                  Continue Shopping
                </Link>
              </div>

              {/* ─── Secure Checkout Badges ─── */}
              <div className="mt-14 flex flex-col items-center gap-4">
                <div className="metal-divider w-48" />
                <div className="flex items-center gap-6 text-havok-text-muted">
                  {/* Encrypted */}
                  <div className="flex items-center gap-2">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span className="text-detail font-[300] tracking-[0.04em]">
                      SSL Encrypted
                    </span>
                  </div>

                  {/* Separator */}
                  <span className="text-havok-divider" aria-hidden="true">
                    ·
                  </span>

                  {/* Authenticity */}
                  <div className="flex items-center gap-2">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="text-detail font-[300] tracking-[0.04em]">
                      Authenticity Guaranteed
                    </span>
                  </div>

                  {/* Separator */}
                  <span className="text-havok-divider" aria-hidden="true">
                    ·
                  </span>

                  {/* Insured */}
                  <div className="flex items-center gap-2">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                    <span className="text-detail font-[300] tracking-[0.04em]">
                      Fully Insured Shipping
                    </span>
                  </div>
                </div>
                <div className="metal-divider w-48" />
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}