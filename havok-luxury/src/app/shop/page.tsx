'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useCallback, useMemo, useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LuxuryProductCard from '@/components/LuxuryProductCard';
import PageTransition from '@/components/PageTransition';
import { products, navCategories } from '@/lib/data';
import { LuxuryCategory, LuxuryProduct } from '@/lib/types';

// ── Helpers ──────────────────────────────────────────────────────────────────

function createQueryString(
  params: URLSearchParams,
  updates: Record<string, string | null>,
): string {
  const next = new URLSearchParams(params.toString());
  for (const [key, value] of Object.entries(updates)) {
    if (value === null) {
      next.delete(key);
    } else {
      next.set(key, value);
    }
  }
  return next.toString();
}

type SortOption = 'price-desc' | 'price-asc' | 'newest';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-desc', label: 'Price: High–Low' },
  { value: 'price-asc', label: 'Price: Low–High' },
];

const regionOptions = [
  { code: 'na', label: 'North America', flag: '🇺🇸' },
  { code: 'eu', label: 'Europe', flag: '🇪🇺' },
  { code: 'me', label: 'Middle East', flag: '🇦🇪' },
  { code: 'apac', label: 'Asia Pacific', flag: '🇯🇵' },
  { code: 'cn', label: 'China', flag: '🇨🇳' },
  { code: 'global', label: 'Global', flag: '🌐' },
];

// ── Inner Content (reads search params) ──────────────────────────────────────

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // ── Read params ──────────────────────────────────────────────────────────

  const activeCategory = (searchParams.get('category') || null) as LuxuryCategory | null;
  const inStockOnly = searchParams.get('inStock') === 'true';
  const limitedOnly = searchParams.get('limited') === 'true';
  const regionParam = searchParams.get('region') || '';
  const selectedRegions = regionParam ? regionParam.split(',').filter(Boolean) : [];
  const sortBy = (searchParams.get('sort') || 'newest') as SortOption;

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  // ── Filter & sort ────────────────────────────────────────────────────────

  const filteredProducts = useMemo(() => {
    let result: LuxuryProduct[] = [...products];

    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (inStockOnly) {
      result = result.filter((p) => p.stockRegions.some((r) => r.inStock));
    }

    if (limitedOnly) {
      result = result.filter((p) => p.limitedEdition);
    }

    if (selectedRegions.length > 0) {
      result = result.filter((p) =>
        p.stockRegions.some(
          (r) => r.inStock && selectedRegions.includes(r.code),
        ),
      );
    }

    return result;
  }, [activeCategory, inStockOnly, limitedOnly, selectedRegions]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortBy) {
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'newest':
      default:
        sorted.sort((a, b) => b.yearIntroduced - a.yearIntroduced);
        break;
    }
    return sorted;
  }, [filteredProducts, sortBy]);

  // ── URL helpers ──────────────────────────────────────────────────────────

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      router.push(`/shop?${createQueryString(searchParams, updates)}`, {
        scroll: false,
      });
    },
    [searchParams, router],
  );

  const toggleRegion = useCallback(
    (code: string) => {
      const current = new Set(selectedRegions);
      if (current.has(code)) {
        current.delete(code);
      } else {
        current.add(code);
      }
      const val = Array.from(current).join(',');
      updateParams({ region: val || null });
    },
    [selectedRegions, updateParams],
  );

  // ── Active filter tags ───────────────────────────────────────────────────

  const activeTags = useMemo(() => {
    const tags: { label: string; onRemove: () => void }[] = [];

    if (activeCategory) {
      const cat = navCategories.find((c) => c.id === activeCategory);
      tags.push({
        label: cat?.label || activeCategory,
        onRemove: () => updateParams({ category: null }),
      });
    }

    if (inStockOnly) {
      tags.push({
        label: 'In Stock',
        onRemove: () => updateParams({ inStock: null }),
      });
    }

    if (limitedOnly) {
      tags.push({
        label: 'Limited Edition',
        onRemove: () => updateParams({ limited: null }),
      });
    }

    for (const code of selectedRegions) {
      const r = regionOptions.find((ro) => ro.code === code);
      tags.push({
        label: r?.label || code,
        onRemove: () => toggleRegion(code),
      });
    }

    return tags;
  }, [activeCategory, inStockOnly, limitedOnly, selectedRegions, updateParams, toggleRegion]);

  const clearAllFilters = useCallback(() => {
    router.push('/shop', { scroll: false });
  }, [router]);

  // ── Sidebar content (shared between desktop + mobile drawer) ──────────────

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Categories header */}
      <div className="px-6 pb-4 pt-6">
        <h2 className="text-label font-medium uppercase tracking-[0.14em] text-havok-silver">
          Categories
        </h2>
      </div>
      <div className="metal-divider mx-4" />

      {/* Category links */}
      <nav className="flex-1 space-y-0.5 px-3 py-4">
        <button
          onClick={() => updateParams({ category: null })}
          className={`group flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-left transition-colors ${
            !activeCategory
              ? 'bg-havok-frost/10 text-havok-frost'
              : 'text-havok-silver hover:bg-havok-slate/50 hover:text-havok-platinum'
          }`}
        >
          <span
            className={`inline-block h-1.5 w-1.5 rounded-full transition-colors ${
              !activeCategory ? 'bg-havok-frost' : 'bg-havok-text-muted group-hover:bg-havok-silver'
            }`}
          />
          <span className="text-sm font-light tracking-[0.03em]">All</span>
        </button>

        {navCategories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() =>
                updateParams({ category: isActive ? null : cat.id })
              }
              className={`group flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-left transition-colors ${
                isActive
                  ? 'bg-havok-frost/10 text-havok-frost'
                  : 'text-havok-silver hover:bg-havok-slate/50 hover:text-havok-platinum'
              }`}
            >
              <span
                className={`inline-block h-1.5 w-1.5 rounded-full transition-colors ${
                  isActive ? 'bg-havok-frost' : 'bg-havok-text-muted group-hover:bg-havok-silver'
                }`}
              />
              <span className="flex-1 text-sm font-light tracking-[0.03em]">
                {cat.label}
              </span>
              <span className="text-detail text-havok-text-muted">
                {products.filter((p) => p.category === cat.id).length}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="metal-divider mx-4" />

      {/* Filters */}
      <div className="flex-1 space-y-6 px-5 py-5">
        <p className="text-label font-medium uppercase tracking-[0.14em] text-havok-silver">
          Filters
        </p>

        {/* Availability */}
        <fieldset className="space-y-2">
          <legend className="mb-2 text-detail uppercase tracking-[0.08em] text-havok-text-muted">
            Availability
          </legend>
          <div className="space-y-1.5">
            <label
              className={`flex cursor-pointer items-center gap-2.5 rounded-sm border px-3 py-2 transition-colors ${
                !inStockOnly
                  ? 'border-havok-frost/30 bg-havok-frost/5 text-havok-frost'
                  : 'border-havok-glass-border bg-havok-graphite/50 text-havok-silver hover:border-havok-divider-active'
              }`}
            >
              <input
                type="radio"
                name="availability"
                checked={!inStockOnly}
                onChange={() => updateParams({ inStock: null })}
                className="h-3 w-3 accent-havok-frost"
              />
              <span className="text-sm font-light">All</span>
            </label>
            <label
              className={`flex cursor-pointer items-center gap-2.5 rounded-sm border px-3 py-2 transition-colors ${
                inStockOnly
                  ? 'border-havok-frost/30 bg-havok-frost/5 text-havok-frost'
                  : 'border-havok-glass-border bg-havok-graphite/50 text-havok-silver hover:border-havok-divider-active'
              }`}
            >
              <input
                type="radio"
                name="availability"
                checked={inStockOnly}
                onChange={() => updateParams({ inStock: 'true' })}
                className="h-3 w-3 accent-havok-frost"
              />
              <span className="text-sm font-light">In Stock</span>
            </label>
          </div>
        </fieldset>

        {/* Edition */}
        <fieldset className="space-y-2">
          <legend className="mb-2 text-detail uppercase tracking-[0.08em] text-havok-text-muted">
            Edition
          </legend>
          <div className="space-y-1.5">
            <label
              className={`flex cursor-pointer items-center gap-2.5 rounded-sm border px-3 py-2 transition-colors ${
                !limitedOnly
                  ? 'border-havok-frost/30 bg-havok-frost/5 text-havok-frost'
                  : 'border-havok-glass-border bg-havok-graphite/50 text-havok-silver hover:border-havok-divider-active'
              }`}
            >
              <input
                type="radio"
                name="edition"
                checked={!limitedOnly}
                onChange={() => updateParams({ limited: null })}
                className="h-3 w-3 accent-havok-frost"
              />
              <span className="text-sm font-light">All</span>
            </label>
            <label
              className={`flex cursor-pointer items-center gap-2.5 rounded-sm border px-3 py-2 transition-colors ${
                limitedOnly
                  ? 'border-havok-frost/30 bg-havok-frost/5 text-havok-frost'
                  : 'border-havok-glass-border bg-havok-graphite/50 text-havok-silver hover:border-havok-divider-active'
              }`}
            >
              <input
                type="radio"
                name="edition"
                checked={limitedOnly}
                onChange={() => updateParams({ limited: 'true' })}
                className="h-3 w-3 accent-havok-frost"
              />
              <span className="text-sm font-light">Limited Edition</span>
            </label>
          </div>
        </fieldset>

        {/* Region */}
        <fieldset className="space-y-2">
          <legend className="mb-2 text-detail uppercase tracking-[0.08em] text-havok-text-muted">
            Region
          </legend>
          <div className="space-y-1">
            {regionOptions.map((r) => {
              const checked = selectedRegions.includes(r.code);
              return (
                <label
                  key={r.code}
                  className={`flex cursor-pointer items-center gap-2.5 rounded-sm border px-3 py-2 transition-colors ${
                    checked
                      ? 'border-havok-frost/30 bg-havok-frost/5 text-havok-frost'
                      : 'border-havok-glass-border bg-havok-graphite/50 text-havok-silver hover:border-havok-divider-active'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleRegion(r.code)}
                    className="h-3 w-3 rounded-sm accent-havok-frost"
                  />
                  <span className="text-xs">{r.flag}</span>
                  <span className="text-sm font-light">{r.label}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>

      {/* Clear all */}
      {activeTags.length > 0 && (
        <div className="border-t border-havok-divider px-5 py-4">
          <button
            onClick={clearAllFilters}
            className="text-detail uppercase tracking-[0.08em] text-havok-text-muted transition-colors hover:text-havok-frost"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <PageTransition>
      <div className="min-h-screen">
        <div className="flex">
          {/* ── Desktop Sidebar ──────────────────────────────────────────────── */}
          <aside className="hidden h-[calc(100vh-4rem)] w-64 flex-shrink-0 overflow-y-auto border-r border-havok-divider bg-havok-carbon/95 backdrop-blur-glass lg:sticky lg:top-16 lg:block">
            {sidebarContent}
          </aside>

          {/* ── Main Content ─────────────────────────────────────────────────── */}
          <div className="flex min-h-[calc(100vh-4rem)] flex-1 flex-col">
            {/* Mobile filter bar */}
            <div className="flex items-center gap-3 border-b border-havok-divider px-4 py-3 lg:hidden">
              <button
                onClick={() => setMobileDrawerOpen(true)}
                className="glass-panel flex items-center gap-2 px-3 py-2 text-sm text-havok-silver transition-colors hover:text-havok-platinum"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                >
                  <line x1="2" y1="3" x2="12" y2="3" />
                  <line x1="4" y1="7" x2="10" y2="7" />
                  <line x1="6" y1="11" x2="8" y2="11" />
                </svg>
                <span className="text-label uppercase tracking-[0.1em]">Filters</span>
                {activeTags.length > 0 && (
                  <span className="flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-havok-frost/20 px-1 text-[0.625rem] text-havok-frost">
                    {activeTags.length}
                  </span>
                )}
              </button>

              {/* Active category on mobile */}
              <span className="text-sm text-havok-platinum">
                {activeCategory
                  ? navCategories.find((c) => c.id === activeCategory)?.label
                  : 'All Products'}
              </span>

              <span className="ml-auto text-detail text-havok-text-muted">
                {sortedProducts.length} {sortedProducts.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            {/* Top bar: results + sort */}
            <div className="flex flex-wrap items-center gap-3 border-b border-havok-divider px-6 py-3">
              <span className="hidden text-sm text-havok-silver lg:block">
                <span className="text-havok-platinum">{sortedProducts.length}</span>{' '}
                {sortedProducts.length === 1 ? 'result' : 'results'}
                {activeCategory &&
                  ` in ${navCategories.find((c) => c.id === activeCategory)?.label || activeCategory}`}
              </span>

              {/* Active filter tags */}
              {activeTags.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5">
                  {activeTags.map((tag) => (
                    <span
                      key={tag.label}
                      className="inline-flex items-center gap-1 rounded-sm border border-havok-frost/20 bg-havok-frost/5 px-2 py-0.5 text-detail text-havok-frost"
                    >
                      {tag.label}
                      <button
                        onClick={tag.onRemove}
                        className="ml-0.5 text-havok-frost/60 transition-colors hover:text-havok-frost"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {activeTags.length > 1 && (
                    <button
                      onClick={clearAllFilters}
                      className="text-detail text-havok-text-muted underline transition-colors hover:text-havok-silver"
                    >
                      Clear all
                    </button>
                  )}
                </div>
              )}

              {/* Sort dropdown */}
              <div className="relative ml-auto">
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center gap-2 rounded-sm border border-havok-glass-border bg-havok-graphite/50 px-3 py-1.5 text-sm text-havok-silver transition-colors hover:border-havok-divider-active hover:text-havok-platinum"
                >
                  <span className="text-detail text-havok-text-muted">Sort:</span>
                  <span className="font-light">
                    {sortOptions.find((o) => o.value === sortBy)?.label || 'Sort'}
                  </span>
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform ${sortOpen ? 'rotate-180' : ''}`}
                  >
                    <path d="M1 1L5 5L9 1" />
                  </svg>
                </button>

                <AnimatePresence>
                  {sortOpen && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="fixed inset-0 z-30"
                        onClick={() => setSortOpen(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full z-40 mt-1 w-48 overflow-hidden rounded-sm border border-havok-glass-border bg-havok-graphite shadow-lg backdrop-blur-glass"
                      >
                        {sortOptions.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => {
                              updateParams({ sort: opt.value === 'newest' ? null : opt.value });
                              setSortOpen(false);
                            }}
                            className={`flex w-full items-center px-3 py-2 text-left text-sm transition-colors ${
                              sortBy === opt.value
                                ? 'bg-havok-frost/10 text-havok-frost'
                                : 'text-havok-silver hover:bg-havok-slate/50 hover:text-havok-platinum'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Product grid / empty state */}
            <div className="flex-1 px-4 py-6 lg:px-6 lg:py-8">
              {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                  {sortedProducts.map((product, index) => (
                    <LuxuryProductCard
                      key={product.id}
                      product={product}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center justify-center py-24 text-center"
                >
                  <div className="mb-6">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.8"
                      className="text-havok-text-muted"
                    >
                      <rect x="4" y="4" width="40" height="40" rx="2" />
                      <line x1="16" y1="16" x2="32" y2="16" />
                      <line x1="16" y1="24" x2="28" y2="24" />
                      <line x1="16" y1="32" x2="22" y2="32" />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-lg font-light text-havok-platinum">
                    No products match your filters
                  </h3>
                  <p className="mb-8 max-w-sm text-sm text-havok-text-muted">
                    Try adjusting your category, availability, or region
                    selections to discover more items.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="inline-flex items-center gap-2 rounded-sm border border-havok-frost/30 bg-havok-frost/5 px-4 py-2 text-sm text-havok-frost transition-colors hover:bg-havok-frost/10"
                  >
                    Clear All Filters
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* ── Mobile Drawer ──────────────────────────────────────────────────── */}
        <AnimatePresence>
          {mobileDrawerOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-40 bg-havok-carbon/80 backdrop-blur-sm lg:hidden"
                onClick={() => setMobileDrawerOpen(false)}
              />

              {/* Drawer panel */}
              <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-y-0 left-0 z-50 w-72 overflow-y-auto border-r border-havok-divider bg-havok-carbon lg:hidden"
              >
                <div className="flex items-center justify-between border-b border-havok-divider px-5 py-4">
                  <h2 className="text-label font-medium uppercase tracking-[0.14em] text-havok-silver">
                    Filters &amp; Categories
                  </h2>
                  <button
                    onClick={() => setMobileDrawerOpen(false)}
                    className="text-havok-text-muted transition-colors hover:text-havok-platinum"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    >
                      <line x1="4" y1="4" x2="14" y2="14" />
                      <line x1="14" y1="4" x2="4" y2="14" />
                    </svg>
                  </button>
                </div>
                {sidebarContent}
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}

// ── Page (with Suspense boundary for useSearchParams) ────────────────────────

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="h-1 w-1 animate-pulse rounded-full bg-havok-frost" />
            <div className="h-1 w-1 animate-pulse rounded-full bg-havok-frost [animation-delay:0.15s]" />
            <div className="h-1 w-1 animate-pulse rounded-full bg-havok-frost [animation-delay:0.3s]" />
          </div>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}