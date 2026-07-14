import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { currencies, regions } from "../../data/currencies";
import { useCurrencyStore } from "../../store/useCurrencyStore";
import { useRegionStore } from "../../store/useRegionStore";

interface Props {
  onFilterChange: (filters: { currency: string; region: string; limited: boolean }) => void;
}

export default function FilterBar({ onFilterChange }: Props) {
  const { currency, setCurrency } = useCurrencyStore();
  const { region, setRegion } = useRegionStore();
  const [limitedOnly, setLimitedOnly] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [regionOpen, setRegionOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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

  const handleCurrencyChange = (code: string) => {
    setCurrency(code);
    setCurrencyOpen(false);
    onFilterChange({ currency: code, region, limited: limitedOnly });
  };

  const handleRegionChange = (code: string) => {
    setRegion(code);
    setRegionOpen(false);
    onFilterChange({ currency, region: code, limited: limitedOnly });
  };

  const toggleLimited = () => {
    const newVal = !limitedOnly;
    setLimitedOnly(newVal);
    onFilterChange({ currency, region, limited: newVal });
  };

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:flex items-center gap-4 mb-8">
        <div className="relative" ref={currencyRef}>
          <button
            onClick={() => setCurrencyOpen(!currencyOpen)}
            className="flex items-center gap-2 px-4 py-2 border border-havok-border/20 text-havok-platinum/50 hover:text-havok-gold hover:border-havok-border/40 transition-all duration-500 text-xs tracking-wider"
          >
            <span className="font-mono">{currency}</span>
            <ChevronDown className="w-3 h-3" />
          </button>
          {currencyOpen && (
            <div className="absolute top-full mt-2 left-0 glass-panel p-1 min-w-[140px] z-10">
              {currencies.map((c) => (
                <button
                  key={c.code}
                  onClick={() => handleCurrencyChange(c.code)}
                  className={`w-full text-left px-4 py-2 text-xs tracking-wider transition-colors ${
                    currency === c.code
                      ? "text-havok-gold bg-havok-surface/50"
                      : "text-havok-platinum/50 hover:text-havok-platinum hover:bg-havok-surface/30"
                  }`}
                >
                  <span className="font-mono">{c.symbol}</span> {c.code}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative" ref={regionRef}>
          <button
            onClick={() => setRegionOpen(!regionOpen)}
            className="flex items-center gap-2 px-4 py-2 border border-havok-border/20 text-havok-platinum/50 hover:text-havok-gold hover:border-havok-border/40 transition-all duration-500 text-xs tracking-wider"
          >
            <span>{regions.find((r) => r.code === region)?.nameZh || "Global"}</span>
            <ChevronDown className="w-3 h-3" />
          </button>
          {regionOpen && (
            <div className="absolute top-full mt-2 left-0 glass-panel p-1 min-w-[160px] z-10">
              {regions.map((r) => (
                <button
                  key={r.code}
                  onClick={() => handleRegionChange(r.code)}
                  className={`w-full text-left px-4 py-2 text-xs tracking-wider transition-colors ${
                    region === r.code
                      ? "text-havok-gold bg-havok-surface/50"
                      : "text-havok-platinum/50 hover:text-havok-platinum hover:bg-havok-surface/30"
                  }`}
                >
                  {r.nameZh} <span className="text-havok-platinum/30">{r.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={toggleLimited}
          className={`flex items-center gap-2 px-4 py-2 border text-xs tracking-wider transition-all duration-500 ${
            limitedOnly
              ? "border-havok-accent/40 text-havok-accent bg-havok-accent/5"
              : "border-havok-border/20 text-havok-platinum/50 hover:text-havok-gold hover:border-havok-border/40"
          }`}
        >
          Limited Edition
        </button>

        <span className="text-[10px] tracking-wider text-havok-platinum/25 ml-auto">
          {limitedOnly ? "Limited editions only" : ""}
        </span>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center gap-2 px-4 py-2 border border-havok-border/20 text-havok-platinum/60 text-xs tracking-wider"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Filters
        </button>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="glass-panel mt-3 p-4 space-y-4 overflow-hidden"
          >
            <div>
              <span className="text-[10px] tracking-[0.2em] text-havok-platinum/30 uppercase block mb-2">Currency</span>
              <div className="flex flex-wrap gap-2">
                {currencies.slice(0, 6).map((c) => (
                  <button
                    key={c.code}
                    onClick={() => handleCurrencyChange(c.code)}
                    className={`px-3 py-1.5 text-xs tracking-wider border transition-all ${
                      currency === c.code
                        ? "border-havok-accent/40 text-havok-gold"
                        : "border-havok-border/20 text-havok-platinum/50"
                    }`}
                  >
                    <span className="font-mono">{c.symbol}</span> {c.code}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="text-[10px] tracking-[0.2em] text-havok-platinum/30 uppercase block mb-2">Region</span>
              <div className="flex flex-wrap gap-2">
                {regions.slice(0, 5).map((r) => (
                  <button
                    key={r.code}
                    onClick={() => handleRegionChange(r.code)}
                    className={`px-3 py-1.5 text-xs tracking-wider border transition-all ${
                      region === r.code
                        ? "border-havok-accent/40 text-havok-gold"
                        : "border-havok-border/20 text-havok-platinum/50"
                    }`}
                  >
                    {r.nameZh}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={toggleLimited}
              className={`w-full px-3 py-2 text-xs tracking-wider border transition-all ${
                limitedOnly
                  ? "border-havok-accent/40 text-havok-accent"
                  : "border-havok-border/20 text-havok-platinum/50"
              }`}
            >
              Limited Edition Only
            </button>
          </motion.div>
        )}
      </div>
    </>
  );
}