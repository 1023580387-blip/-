'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import type { CartItem } from '@/lib/types';
import { currencies, regions } from '@/lib/data';

interface CheckoutGlassPanelProps {
  items: CartItem[];
  onUpdateQuantity?: (productId: string, quantity: number) => void;
  onRemoveItem?: (productId: string) => void;
  onCheckout?: () => void;
}

const TAX_RATE = 0.08;
const SHIPPING_FLAT = 250;
const SHIPPING_FREE_THRESHOLD = 50000;

function formatPrice(price: number, currency: string): string {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  } catch {
    return `${currency} ${price.toLocaleString()}`;
  }
}

export default function CheckoutGlassPanel({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CheckoutGlassPanelProps) {
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [regionOpen, setRegionOpen] = useState(false);
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());

  const handleRemove = useCallback(
    (productId: string) => {
      setRemovingIds((prev) => new Set(prev).add(productId));
      setTimeout(() => {
        onRemoveItem?.(productId);
        setRemovingIds((prev) => {
          const next = new Set(prev);
          next.delete(productId);
          return next;
        });
      }, 300);
    },
    [onRemoveItem],
  );

  const handlePackagingChange = useCallback(
    (productId: string, packaging: CartItem['packaging']) => {
      // Packaging change is handled inline — the parent component should
      // manage CartItem.packaging updates via the item object.
      // For now we treat it as a local UI state change; parent can listen
      // via a custom prop if needed. We keep the select interactive.
      void productId;
      void packaging;
    },
    [],
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items],
  );

  const shipping = useMemo(
    () => (subtotal >= SHIPPING_FREE_THRESHOLD ? 0 : SHIPPING_FLAT),
    [subtotal],
  );

  const tax = useMemo(() => Math.round(subtotal * TAX_RATE), [subtotal]);

  const total = useMemo(() => subtotal + tax + shipping, [subtotal, tax, shipping]);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  return (
    <div className="glass-panel scan-border w-full">
      {/* ─── Header ─── */}
      <div className="px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-[250] tracking-[0.06em] text-havok-platinum">
            Order Summary
          </h2>
          <span className="text-sm text-havok-text-muted font-[300] tracking-[0.04em]">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </span>
        </div>
        <Link
          href="/cart"
          className="text-detail text-havok-text-muted hover:text-havok-silver transition-colors duration-300 tracking-[0.04em]"
        >
          Edit Cart
        </Link>
      </div>

      <div className="metal-divider" />

      {/* ─── Cart Items ─── */}
      <div className="px-6 py-2 max-h-[400px] overflow-y-auto">
        <AnimatePresence initial={false}>
          {items.map((item, index) => {
            const it = item;
            const product = it.product;
            const firstImage = product.images[0] || '';
            const isRemoving = removingIds.has(product.id);

            return (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="py-4"
              >
                <motion.div
                  animate={
                    isRemoving
                      ? { opacity: 0, scale: 0.96, filter: 'blur(2px)' }
                      : { opacity: 1, scale: 1, filter: 'blur(0px)' }
                  }
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-4"
                >
                  {/* Thumbnail */}
                  <Link
                    href={`/product/${product.id}`}
                    className="flex-shrink-0 relative overflow-hidden"
                  >
                    <div className="w-[60px] h-[60px] rounded-md overflow-hidden bg-havok-graphite border border-havok-glass-border">
                      {firstImage && (
                        <img
                          src={firstImage}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${product.id}`}>
                      <h4 className="text-sm font-[250] tracking-[0.04em] text-havok-platinum truncate hover:text-havok-platinum-light transition-colors">
                        {product.name}
                      </h4>
                    </Link>
                    <p className="text-detail text-havok-silver tracking-[0.06em] uppercase mt-0.5">
                      {product.brand}
                    </p>

                    {it.customization && (
                      <p className="text-detail text-havok-frost/70 tracking-[0.04em] mt-0.5">
                        {it.customization}
                      </p>
                    )}

                    {/* Packaging selector */}
                    <div className="mt-1.5">
                      <select
                        value={it.packaging}
                        onChange={(e) =>
                          handlePackagingChange(product.id, e.target.value as CartItem['packaging'])
                        }
                        className="bg-havok-slate border border-havok-glass-border text-havok-platinum text-detail rounded-sm px-2 py-1 tracking-[0.04em] focus:border-havok-frost focus:shadow-[0_0_0_1px_rgba(107,138,142,0.4),0_0_0_3px_rgba(107,138,142,0.1)] appearance-none cursor-pointer transition-colors duration-300"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%239A9DA5' stroke-width='1.2'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 6px center',
                          paddingRight: '22px',
                        }}
                      >
                        <option value="standard">Standard Packaging</option>
                        <option value="premium">Premium Packaging</option>
                        <option value="collector">Collector&apos;s Packaging</option>
                      </select>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-0">
                    <button
                      onClick={() => {
                        if (it.quantity > 1) {
                          onUpdateQuantity?.(product.id, it.quantity - 1);
                        }
                      }}
                      disabled={it.quantity <= 1}
                      className="w-7 h-7 flex items-center justify-center border border-havok-glass-border text-havok-silver hover:text-havok-platinum hover:border-havok-divider-active disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-300 rounded-sm text-sm font-[300]"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm text-havok-platinum font-[300] tabular-nums">
                      {it.quantity}
                    </span>
                    <button
                      onClick={() =>
                        onUpdateQuantity?.(product.id, it.quantity + 1)
                      }
                      className="w-7 h-7 flex items-center justify-center border border-havok-glass-border text-havok-silver hover:text-havok-platinum hover:border-havok-divider-active transition-colors duration-300 rounded-sm text-sm font-[300]"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right min-w-[70px]">
                    <motion.span
                      key={`${product.id}-${it.quantity}`}
                      className="number-roll text-sm text-havok-platinum font-[300] tabular-nums tracking-[0.02em]"
                    >
                      {formatPrice(product.price * it.quantity, product.currency)}
                    </motion.span>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => handleRemove(product.id)}
                    className="flex-shrink-0 w-7 h-7 flex items-center justify-center text-havok-text-muted hover:text-havok-frost transition-colors duration-300"
                    aria-label={`Remove ${product.name}`}
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </motion.div>

                {/* Item divider */}
                {index < items.length - 1 && (
                  <div className="metal-divider mt-4" />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {items.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 text-center"
          >
            <p className="text-havok-text-muted text-sm tracking-[0.04em] font-[300]">
              Your cart is empty
            </p>
            <Link
              href="/shop"
              className="inline-block mt-3 text-detail text-havok-frost hover:text-havok-frost-light transition-colors duration-300 tracking-[0.06em]"
            >
              Explore Collection
            </Link>
          </motion.div>
        )}
      </div>

      <div className="metal-divider" />

      {/* ─── Region & Delivery Selectors ─── */}
      <div className="px-6 py-4 flex flex-wrap gap-4">
        {/* Region Selector */}
        <div className="relative flex-1 min-w-[160px]">
          <label className="block text-detail text-havok-text-muted tracking-[0.06em] mb-1.5">
            Delivery Region
          </label>
          <button
            onClick={() => {
              setRegionOpen(!regionOpen);
              setCurrencyOpen(false);
            }}
            className="w-full flex items-center justify-between bg-havok-slate border border-havok-glass-border text-havok-platinum text-sm rounded-sm px-3 py-2 tracking-[0.04em] font-[300] hover:border-havok-divider-active focus:border-havok-frost focus:shadow-[0_0_0_1px_rgba(107,138,142,0.4),0_0_0_3px_rgba(107,138,142,0.1)] transition-colors duration-300"
          >
            <span className="flex items-center gap-2">
              <span>{selectedRegion.flag}</span>
              <span>{selectedRegion.label}</span>
            </span>
            <motion.svg
              className="w-3.5 h-3.5 text-havok-silver"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              animate={{ rotate: regionOpen ? 180 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <path d="M6 9l6 6 6-6" />
            </motion.svg>
          </button>

          <AnimatePresence>
            {regionOpen && (
              <motion.div
                className="absolute top-full left-0 right-0 mt-1 glass-panel py-1 z-20"
                initial={{ opacity: 0, y: -6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.96 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {regions.map((region) => (
                  <button
                    key={region.code}
                    onClick={() => {
                      setSelectedRegion(region);
                      setRegionOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors duration-200 ${
                      selectedRegion.code === region.code
                        ? 'text-havok-platinum bg-havok-graphite/50'
                        : 'text-havok-text-secondary hover:text-havok-platinum hover:bg-havok-graphite/30'
                    }`}
                  >
                    <span>{region.flag}</span>
                    <span className="font-[300] tracking-[0.04em]">
                      {region.label}
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Currency Selector */}
        <div className="relative flex-1 min-w-[140px]">
          <label className="block text-detail text-havok-text-muted tracking-[0.06em] mb-1.5">
            Currency
          </label>
          <button
            onClick={() => {
              setCurrencyOpen(!currencyOpen);
              setRegionOpen(false);
            }}
            className="w-full flex items-center justify-between bg-havok-slate border border-havok-glass-border text-havok-platinum text-sm rounded-sm px-3 py-2 tracking-[0.04em] font-[300] hover:border-havok-divider-active focus:border-havok-frost focus:shadow-[0_0_0_1px_rgba(107,138,142,0.4),0_0_0_3px_rgba(107,138,142,0.1)] transition-colors duration-300"
          >
            <span className="flex items-center gap-2">
              <span className="text-havok-text-muted">{selectedCurrency.symbol}</span>
              <span>{selectedCurrency.code}</span>
            </span>
            <motion.svg
              className="w-3.5 h-3.5 text-havok-silver"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              animate={{ rotate: currencyOpen ? 180 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <path d="M6 9l6 6 6-6" />
            </motion.svg>
          </button>

          <AnimatePresence>
            {currencyOpen && (
              <motion.div
                className="absolute top-full left-0 right-0 mt-1 glass-panel py-1 z-20"
                initial={{ opacity: 0, y: -6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.96 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {currencies.map((currency) => (
                  <button
                    key={currency.code}
                    onClick={() => {
                      setSelectedCurrency(currency);
                      setCurrencyOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors duration-200 ${
                      selectedCurrency.code === currency.code
                        ? 'text-havok-platinum bg-havok-graphite/50'
                        : 'text-havok-text-secondary hover:text-havok-platinum hover:bg-havok-graphite/30'
                    }`}
                  >
                    <span className="w-8 text-xs text-havok-text-muted font-[400]">
                      {currency.symbol}
                    </span>
                    <span className="font-[300] tracking-[0.04em]">
                      {currency.label}
                    </span>
                    <span className="ml-auto text-xs text-havok-text-muted">
                      {currency.code}
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="metal-divider" />

      {/* ─── Order Summary ─── */}
      <div className="px-6 py-5 space-y-3">
        {/* Subtotal */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-havok-silver font-[300] tracking-[0.04em]">
            Subtotal
          </span>
          <motion.span
            key={`subtotal-${subtotal}`}
            className="number-roll text-sm text-havok-platinum font-[300] tabular-nums tracking-[0.02em]"
          >
            {formatPrice(subtotal, selectedCurrency.code)}
          </motion.span>
        </div>

        {/* Tax */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-havok-frost/70 font-[300] tracking-[0.04em]">
            Estimated Tax
          </span>
          <motion.span
            key={`tax-${tax}`}
            className="number-roll text-sm text-havok-frost/70 font-[300] tabular-nums tracking-[0.02em]"
          >
            {formatPrice(tax, selectedCurrency.code)}
          </motion.span>
        </div>

        {/* Shipping */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-havok-silver font-[300] tracking-[0.04em]">
            Cross-Border Shipping
          </span>
          <div className="text-right">
            {shipping === 0 ? (
              <motion.span
                key="shipping-free"
                className="number-roll text-sm text-havok-frost font-[300] tracking-[0.04em]"
              >
                Complimentary
              </motion.span>
            ) : (
              <motion.span
                key={`shipping-${shipping}`}
                className="number-roll text-sm text-havok-platinum font-[300] tabular-nums tracking-[0.02em]"
              >
                {formatPrice(shipping, selectedCurrency.code)}
              </motion.span>
            )}
          </div>
        </div>

        <div className="metal-divider" />

        {/* Total */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-base font-[250] text-havok-platinum tracking-[0.06em]">
            Total
          </span>
          <motion.span
            key={`total-${total}`}
            className="number-roll text-xl font-[200] text-havok-platinum tracking-[0.02em] tabular-nums"
          >
            {formatPrice(total, selectedCurrency.code)}
          </motion.span>
        </div>

        {/* Multi-currency display */}
        <div className="flex items-center justify-end gap-4">
          <span className="text-detail text-havok-text-muted tracking-[0.04em]">
            ≈ {formatPrice(total, 'USD')}
          </span>
          <span className="text-detail text-havok-text-muted tracking-[0.04em]">
            ≈ {formatPrice(Math.round(total * 0.92), 'EUR')}
          </span>
        </div>
      </div>

      {/* ─── Checkout Button ─── */}
      <div className="px-6 pb-6">
        <motion.button
          onClick={() => onCheckout?.()}
          disabled={items.length === 0}
          whileHover={
            items.length > 0
              ? {
                  boxShadow: '0 0 24px rgba(107, 138, 142, 0.25), 0 0 0 1px rgba(107, 138, 142, 0.3)',
                  backgroundColor: 'rgba(107, 138, 142, 0.12)',
                }
              : {}
          }
          whileTap={items.length > 0 ? { scale: 0.98 } : {}}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full py-3.5 rounded-sm border border-havok-frost/30 bg-havok-frost/8 text-havok-frost hover:text-havok-frost-light disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-500 text-sm font-[300] tracking-[0.12em] uppercase"
        >
          Proceed to Checkout
        </motion.button>

        <p className="mt-3 text-center text-detail text-havok-text-muted tracking-[0.04em]">
          Duties &amp; taxes calculated at checkout · Free shipping on orders
          over {formatPrice(SHIPPING_FREE_THRESHOLD, 'USD')}
        </p>
      </div>
    </div>
  );
}