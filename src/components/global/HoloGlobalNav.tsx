import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingBag,
  User,
  Globe,
  ChevronDown,
  Menu,
  X,
  Gem,
} from "lucide-react";
import { useScrollNav } from "../../hooks/useScrollNav";
import { useCartStore } from "../../store/useCartStore";
import { useCurrencyStore } from "../../store/useCurrencyStore";
import { useRegionStore } from "../../store/useRegionStore";
import { currencies, regions } from "../../data/currencies";

export default function HoloGlobalNav() {
  const isScrolled = useScrollNav();
  const location = useLocation();
  const itemCount = useCartStore((s) => s.itemCount());
  const { currency, setCurrency } = useCurrencyStore();
  const { region, setRegion } = useRegionStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [regionOpen, setRegionOpen] = useState(false);
  const currencyRef = useRef<HTMLDivElement>(null);
  const regionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (currencyRef.current && !currencyRef.current.contains(e.target as Node)) {
        setCurrencyOpen(false);
      }
      if (regionRef.current && !regionRef.current.contains(e.target as Node)) {
        setRegionOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const navLinks = [
    { to: "/shop", label: "SHOP", labelZh: "臻品" },
    { to: "/stores", label: "STORES", labelZh: "门店" },
    { to: "/archive", label: "ARCHIVE", labelZh: "典藏" },
  ];

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: isScrolled
            ? "rgba(13, 13, 13, 0.85)"
            : "transparent",
          backdropFilter: isScrolled ? "blur(24px)" : "none",
          borderBottom: isScrolled
            ? "1px solid rgba(168, 168, 173, 0.08)"
            : "1px solid transparent",
          transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="max-w-[1440px] mx-auto flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 lg:w-10 lg:h-10">
              <div className="absolute inset-0 border border-havok-platinum/30 rotate-45 transition-all duration-500 group-hover:border-havok-accent/60" />
              <div className="absolute inset-1.5 border border-havok-platinum/20 -rotate-45 transition-all duration-500 group-hover:border-havok-accent/40" />
              <Gem className="absolute inset-0 m-auto w-4 h-4 lg:w-5 lg:h-5 text-havok-gold" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg lg:text-xl tracking-[0.3em] text-havok-gold leading-none">
                HAVOK
              </span>
              <span className="text-[8px] lg:text-[9px] tracking-[0.5em] text-havok-platinum/40 uppercase leading-none mt-0.5">
                LUXURY
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="relative group py-2"
              >
                <span className="font-body text-xs tracking-[0.2em] text-havok-platinum/60 transition-colors duration-500 group-hover:text-havok-gold uppercase">
                  {link.label}
                </span>
                <span className="block text-[9px] tracking-[0.15em] text-havok-platinum/30 mt-0.5 transition-colors duration-500 group-hover:text-havok-platinum/50">
                  {link.labelZh}
                </span>
                {location.pathname === link.to && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-px bg-havok-accent/60"
                    layoutId="nav-underline"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-4 lg:gap-6">
            {/* Region Selector */}
            <div className="hidden lg:block relative" ref={regionRef}>
              <button
                onClick={() => { setRegionOpen(!regionOpen); setCurrencyOpen(false); }}
                className="flex items-center gap-1.5 text-havok-platinum/50 hover:text-havok-gold transition-colors duration-500"
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="text-[10px] tracking-[0.15em] uppercase">
                  {regions.find((r) => r.code === region)?.nameZh || "全球"}
                </span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {regionOpen && (
                <div className="absolute top-full mt-3 right-0 glass-panel p-1 min-w-[160px]">
                  {regions.map((r) => (
                    <button
                      key={r.code}
                      onClick={() => { setRegion(r.code); setCurrency(r.currency); setRegionOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-xs tracking-wider transition-colors duration-300 ${
                        region === r.code
                          ? "text-havok-gold bg-havok-surface/50"
                          : "text-havok-platinum/50 hover:text-havok-platinum hover:bg-havok-surface/30"
                      }`}
                    >
                      {r.nameZh} <span className="text-havok-platinum/30 ml-1">{r.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Currency Selector */}
            <div className="hidden lg:block relative" ref={currencyRef}>
              <button
                onClick={() => { setCurrencyOpen(!currencyOpen); setRegionOpen(false); }}
                className="flex items-center gap-1.5 text-havok-platinum/50 hover:text-havok-gold transition-colors duration-500"
              >
                <span className="text-[10px] tracking-[0.15em] uppercase font-mono">{currency}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {currencyOpen && (
                <div className="absolute top-full mt-3 right-0 glass-panel p-1 min-w-[140px]">
                  {currencies.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => { setCurrency(c.code); setCurrencyOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-xs tracking-wider transition-colors duration-300 ${
                        currency === c.code
                          ? "text-havok-gold bg-havok-surface/50"
                          : "text-havok-platinum/50 hover:text-havok-platinum hover:bg-havok-surface/30"
                      }`}
                    >
                      <span className="font-mono">{c.symbol}</span>{" "}
                      <span>{c.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search */}
            <button className="text-havok-platinum/40 hover:text-havok-gold transition-colors duration-500">
              <Search className="w-4 h-4" />
            </button>

            {/* Cart */}
            <Link to="/cart" className="relative text-havok-platinum/40 hover:text-havok-gold transition-colors duration-500">
              <ShoppingBag className="w-4 h-4" />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-havok-accent/80 text-havok-base text-[9px] font-mono flex items-center justify-center"
                >
                  {itemCount}
                </motion.span>
              )}
            </Link>

            {/* User */}
            <button className="hidden lg:block text-havok-platinum/40 hover:text-havok-gold transition-colors duration-500">
              <User className="w-4 h-4" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-havok-platinum/60"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-havok-base/95 backdrop-blur-heavy" onClick={() => setMobileOpen(false)} />
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-72 bg-havok-deep border-l border-havok-border/20 p-8 pt-24"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <nav className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="group"
                  >
                    <span className="font-body text-sm tracking-[0.2em] text-havok-platinum/60 group-hover:text-havok-gold uppercase transition-colors duration-500">
                      {link.label}
                    </span>
                    <span className="block text-[10px] tracking-[0.15em] text-havok-platinum/30 mt-1">
                      {link.labelZh}
                    </span>
                  </Link>
                ))}
                <div className="metal-divider my-2" />
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] tracking-[0.2em] text-havok-platinum/30 uppercase">Region</span>
                  {regions.slice(0, 5).map((r) => (
                    <button
                      key={r.code}
                      onClick={() => { setRegion(r.code); setCurrency(r.currency); setMobileOpen(false); }}
                      className={`text-left text-xs tracking-wider ${
                        region === r.code ? "text-havok-gold" : "text-havok-platinum/50"
                      }`}
                    >
                      {r.nameZh} · {r.name}
                    </button>
                  ))}
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}