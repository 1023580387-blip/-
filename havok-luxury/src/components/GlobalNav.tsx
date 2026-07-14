'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';
import type { NavCategory, CurrencyOption, RegionOption } from '@/lib/types';
import { navCategories, currencies, regions } from '@/lib/data';

export default function GlobalNav() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [regionOpen, setRegionOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<RegionOption>(regions[0]);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyOption>(currencies[0]);
  const [bagCount] = useState(0);

  const regionRef = useRef<HTMLDivElement>(null);
  const currencyRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 20);
  });

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (regionRef.current && !regionRef.current.contains(e.target as Node)) {
        setRegionOpen(false);
      }
      if (currencyRef.current && !currencyRef.current.contains(e.target as Node)) {
        setCurrencyOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleCategoryClick = (category: NavCategory) => {
    setActiveCategory(category.id);
    setMobileOpen(false);
    router.push(`/category/${category.id}`);
  };

  const handleRegionSelect = (region: RegionOption) => {
    setSelectedRegion(region);
    setRegionOpen(false);
  };

  const handleCurrencySelect = (currency: CurrencyOption) => {
    setSelectedCurrency(currency);
    setCurrencyOpen(false);
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 h-20"
        initial={false}
        animate={{
          backgroundColor: scrolled
            ? 'rgba(26, 26, 29, 0.65)'
            : 'rgba(13, 13, 14, 0)',
          borderBottomColor: scrolled
            ? 'rgba(154, 157, 165, 0.08)'
            : 'rgba(154, 157, 165, 0)',
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          borderBottomWidth: 1,
          borderBottomStyle: 'solid',
        }}
      >
        {/* Backdrop blur layer */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={false}
          animate={{
            backdropFilter: scrolled
              ? 'blur(16px)'
              : 'blur(0px)',
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'blur(0px)',
          }}
        />

        {/* Metal divider bottom accent when scrolled */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
          initial={false}
          animate={{
            opacity: scrolled ? 1 : 0,
            background: scrolled
              ? 'linear-gradient(90deg, transparent 0%, rgba(154, 157, 165, 0.15) 20%, rgba(154, 157, 165, 0.15) 80%, transparent 100%)'
              : 'transparent',
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />

        <div className="relative h-full max-w-[1440px] mx-auto px-6 lg:px-10 flex items-center justify-between">
          {/* ─── Left: HAVOK Logo ─── */}
          <Link
            href="/"
            className="flex-shrink-0 group"
            onClick={() => setMobileOpen(false)}
          >
            <span
              className="text-2xl tracking-[0.25em] font-[200] text-havok-platinum select-none transition-colors duration-500 group-hover:text-havok-platinum-light"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              HAVOK
            </span>
          </Link>

          {/* ─── Center: Category Links (Desktop) ─── */}
          <div className="hidden lg:flex items-center gap-1">
            {navCategories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className="relative px-4 py-2 group"
                onMouseEnter={() => setActiveCategory(category.id)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <span className="relative z-10 text-havok-text-secondary text-sm tracking-[0.08em] font-[350] transition-colors duration-300 group-hover:text-havok-platinum">
                  {category.label}
                </span>
                {/* Animated bottom border */}
                <motion.span
                  className="absolute bottom-0 left-4 right-4 h-px bg-havok-platinum origin-left"
                  initial={false}
                  animate={{
                    scaleX: activeCategory === category.id ? 1 : 0,
                    opacity: activeCategory === category.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
                {/* Subtle background glow on hover */}
                <motion.span
                  className="absolute inset-1 rounded-md bg-havok-platinum pointer-events-none"
                  initial={false}
                  animate={{
                    opacity: activeCategory === category.id ? 0.04 : 0,
                  }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              </Link>
            ))}
          </div>

          {/* ─── Right: Controls ─── */}
          <div className="flex items-center gap-1 lg:gap-2">
            {/* Region Selector */}
            <div ref={regionRef} className="relative">
              <button
                onClick={() => {
                  setRegionOpen(!regionOpen);
                  setCurrencyOpen(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-2 rounded-md text-havok-text-secondary hover:text-havok-platinum transition-colors duration-300"
                aria-label="Select region"
              >
                <span className="text-sm">{selectedRegion.flag}</span>
                <span className="hidden xl:inline text-xs tracking-[0.06em] font-[350]">
                  {selectedRegion.code.toUpperCase()}
                </span>
                <motion.svg
                  className="w-3 h-3"
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
                    className="absolute top-full right-0 mt-2 w-56 glass-panel py-2 z-50"
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-4 py-2 text-label text-havok-text-muted tracking-[0.12em] uppercase">
                      Region
                    </div>
                    {regions.map((region) => (
                      <button
                        key={region.code}
                        onClick={() => handleRegionSelect(region)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-200 ${
                          selectedRegion.code === region.code
                            ? 'text-havok-platinum bg-havok-graphite/50'
                            : 'text-havok-text-secondary hover:text-havok-platinum hover:bg-havok-graphite/30'
                        }`}
                      >
                        <span className="text-base">{region.flag}</span>
                        <span className="font-[350] tracking-[0.04em]">{region.label}</span>
                        <span className="ml-auto text-xs text-havok-text-muted tracking-[0.06em]">
                          {region.languages.join(' / ')}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-5 metal-divider-vertical" />

            {/* Currency Selector */}
            <div ref={currencyRef} className="relative">
              <button
                onClick={() => {
                  setCurrencyOpen(!currencyOpen);
                  setRegionOpen(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-2 rounded-md text-havok-text-secondary hover:text-havok-platinum transition-colors duration-300"
                aria-label="Select currency"
              >
                <span className="text-xs tracking-[0.06em] font-[400]">
                  {selectedCurrency.symbol}
                </span>
                <span className="hidden xl:inline text-xs tracking-[0.06em] font-[350]">
                  {selectedCurrency.code}
                </span>
                <motion.svg
                  className="w-3 h-3"
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
                    className="absolute top-full right-0 mt-2 w-48 glass-panel py-2 z-50"
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-4 py-2 text-label text-havok-text-muted tracking-[0.12em] uppercase">
                      Currency
                    </div>
                    {currencies.map((currency) => (
                      <button
                        key={currency.code}
                        onClick={() => handleCurrencySelect(currency)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-200 ${
                          selectedCurrency.code === currency.code
                            ? 'text-havok-platinum bg-havok-graphite/50'
                            : 'text-havok-text-secondary hover:text-havok-platinum hover:bg-havok-graphite/30'
                        }`}
                      >
                        <span className="w-7 text-xs font-[400] tracking-[0.06em] text-havok-text-muted">
                          {currency.symbol}
                        </span>
                        <span className="font-[350] tracking-[0.04em]">{currency.label}</span>
                        <span className="ml-auto text-xs text-havok-text-muted tracking-[0.06em]">
                          {currency.code}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-5 metal-divider-vertical" />

            {/* Shopping Bag */}
            <Link
              href="/cart"
              className="relative flex items-center justify-center w-9 h-9 rounded-md text-havok-text-secondary hover:text-havok-platinum transition-colors duration-300"
              aria-label="Shopping bag"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <AnimatePresence>
                {bagCount > 0 && (
                  <motion.span
                    className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-havok-frost text-[10px] font-[400] text-white leading-none"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {bagCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* User Icon */}
            <Link
              href="/account"
              className="hidden lg:flex items-center justify-center w-9 h-9 rounded-md text-havok-text-secondary hover:text-havok-platinum transition-colors duration-300"
              aria-label="Account"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              >
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>

            {/* ─── Mobile Hamburger ─── */}
            <button
              onClick={() => {
                setMobileOpen(!mobileOpen);
                setRegionOpen(false);
                setCurrencyOpen(false);
              }}
              className="lg:hidden relative flex items-center justify-center w-9 h-9 rounded-md text-havok-text-secondary hover:text-havok-platinum transition-colors duration-300"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center gap-1"
                animate={mobileOpen ? 'open' : 'closed'}
              >
                <motion.span
                  className="block w-5 h-px bg-current origin-center"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 3 },
                  }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.span
                  className="block w-5 h-px bg-current origin-center"
                  variants={{
                    closed: { opacity: 1, scaleX: 1 },
                    open: { opacity: 0, scaleX: 0 },
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block w-5 h-px bg-current origin-center"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -3 },
                  }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ─── Mobile Full-Screen Drawer ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-havok-carbon/90 backdrop-blur-glass"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer Panel */}
            <motion.div
              className="absolute inset-0 flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Metal glass panel */}
              <div className="flex-1 m-4 glass-panel flex flex-col overflow-hidden">
                {/* Drawer header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-havok-glass-border">
                  <span className="text-xl tracking-[0.2em] font-[200] text-havok-platinum">
                    HAVOK
                  </span>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-md text-havok-text-secondary hover:text-havok-platinum transition-colors"
                    aria-label="Close menu"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Category links */}
                <div className="flex-1 overflow-y-auto px-6 py-8">
                  <div className="text-label text-havok-text-muted tracking-[0.12em] uppercase mb-6">
                    Categories
                  </div>
                  <nav className="flex flex-col gap-1">
                    {navCategories.map((category, index) => (
                      <motion.button
                        key={category.id}
                        onClick={() => handleCategoryClick(category)}
                        className="flex items-center justify-between w-full px-4 py-4 rounded-md text-left transition-colors duration-300 hover:bg-havok-graphite/40 group"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.1 + index * 0.06,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        <div className="flex flex-col gap-0.5">
                          <span className="text-lg font-[250] tracking-[0.06em] text-havok-platinum group-hover:text-havok-platinum-light transition-colors">
                            {category.label}
                          </span>
                          <span className="text-xs tracking-[0.08em] text-havok-text-muted">
                            {category.labelZh}
                          </span>
                        </div>
                        <span className="text-xs tracking-[0.06em] text-havok-text-muted font-[300]">
                          {category.description}
                        </span>
                        <svg
                          className="w-4 h-4 text-havok-text-muted group-hover:text-havok-platinum transition-colors ml-3"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.2"
                        >
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </motion.button>
                    ))}
                  </nav>

                  <div className="metal-divider my-8" />

                  {/* Mobile region & currency */}
                  <div className="text-label text-havok-text-muted tracking-[0.12em] uppercase mb-6">
                    Preferences
                  </div>
                  <div className="flex flex-col gap-4">
                    {/* Region */}
                    <div className="flex flex-col gap-2">
                      <span className="text-xs text-havok-text-muted tracking-[0.06em]">Region</span>
                      <div className="flex flex-wrap gap-2">
                        {regions.map((region) => (
                          <button
                            key={region.code}
                            onClick={() => setSelectedRegion(region)}
                            className={`px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                              selectedRegion.code === region.code
                                ? 'bg-havok-graphite text-havok-platinum border border-havok-divider-active'
                                : 'text-havok-text-secondary hover:text-havok-platinum border border-havok-glass-border'
                            }`}
                          >
                            <span className="mr-1.5">{region.flag}</span>
                            {region.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Currency */}
                    <div className="flex flex-col gap-2">
                      <span className="text-xs text-havok-text-muted tracking-[0.06em]">Currency</span>
                      <div className="flex flex-wrap gap-2">
                        {currencies.map((currency) => (
                          <button
                            key={currency.code}
                            onClick={() => setSelectedCurrency(currency)}
                            className={`px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                              selectedCurrency.code === currency.code
                                ? 'bg-havok-graphite text-havok-platinum border border-havok-divider-active'
                                : 'text-havok-text-secondary hover:text-havok-platinum border border-havok-glass-border'
                            }`}
                          >
                            {currency.symbol} {currency.code}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="metal-divider my-8" />

                  {/* Account link */}
                  <Link
                    href="/account"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-4 rounded-md text-havok-text-secondary hover:text-havok-platinum hover:bg-havok-graphite/40 transition-all duration-300"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    >
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <span className="text-sm font-[350] tracking-[0.06em]">Account</span>
                  </Link>

                  {/* Cart link */}
                  <Link
                    href="/cart"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-4 rounded-md text-havok-text-secondary hover:text-havok-platinum hover:bg-havok-graphite/40 transition-all duration-300"
                  >
                    <div className="relative">
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      >
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                        <path d="M3 6h18" />
                        <path d="M16 10a4 4 0 01-8 0" />
                      </svg>
                      {bagCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full bg-havok-frost text-[10px] font-[400] text-white leading-none">
                          {bagCount}
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-[350] tracking-[0.06em]">
                      Shopping Bag
                      {bagCount > 0 && (
                        <span className="ml-1 text-havok-text-muted">({bagCount})</span>
                      )}
                    </span>
                  </Link>
                </div>

                {/* Drawer footer */}
                <div className="px-6 py-5 border-t border-havok-glass-border">
                  <p className="text-detail text-havok-text-muted tracking-[0.04em]">
                    {selectedRegion.label} · {selectedCurrency.code}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}