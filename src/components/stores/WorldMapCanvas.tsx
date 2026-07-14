import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { stores } from "../../data/stores";
import StoreModal from "./StoreModal";
import type { Store } from "../../types";

const continents = [
  { name: "North America", x: "22%", y: "35%", label: "NORTH AMERICA" },
  { name: "Europe", x: "48%", y: "32%", label: "EUROPE" },
  { name: "Middle East", x: "57%", y: "42%", label: "MIDDLE EAST" },
  { name: "Asia", x: "78%", y: "40%", label: "ASIA" },
];

export default function WorldMapCanvas() {
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  const continentStores = selectedContinent
    ? stores.filter((s) => s.continent === selectedContinent)
    : [];

  return (
    <div className="relative w-full">
      {/* Map Container */}
      <div className="relative aspect-[16/9] lg:aspect-[2/1] max-w-5xl mx-auto">
        {/* Grid overlay */}
        <svg viewBox="0 0 1000 500" className="absolute inset-0 w-full h-full">
          {/* Horizontal grid lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={`h${i}`}
              x1="0"
              y1={40 + i * 60}
              x2="1000"
              y2={40 + i * 60}
              stroke="rgba(168,168,173,0.05)"
              strokeWidth="0.5"
            />
          ))}
          {/* Vertical grid lines */}
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={`v${i}`}
              x1={40 + i * 85}
              y1="0"
              x2={40 + i * 85}
              y2="500"
              stroke="rgba(168,168,173,0.05)"
              strokeWidth="0.5"
            />
          ))}
          {/* Decorative world outline */}
          <path
            d="M120,180 Q180,120 240,140 Q300,150 280,200 Q240,240 120,180Z M250,160 Q320,110 380,130 Q420,145 390,180 Q330,220 250,160Z M360,140 Q420,100 480,120 Q500,135 480,160 Q420,190 360,140Z M490,110 Q560,70 620,95 Q650,110 630,135 Q560,170 490,110Z M640,90 Q700,65 760,90 Q790,105 770,130 Q700,160 640,90Z M800,85 Q860,65 910,90 Q930,105 900,125 Q850,145 800,85Z"
            fill="none"
            stroke="rgba(168,168,173,0.06)"
            strokeWidth="1"
          />
          <path
            d="M120,220 Q180,190 220,220 Q250,245 220,270 Q160,300 120,220Z M250,240 Q310,210 350,240 Q380,260 340,290 Q280,320 250,240Z M380,270 Q440,240 470,270 Q490,295 450,320 Q390,350 380,270Z M500,290 Q560,260 590,290 Q610,310 580,340 Q510,370 500,290Z M630,310 Q690,280 720,310 Q740,330 710,360 Q640,390 630,310Z"
            fill="none"
            stroke="rgba(168,168,173,0.06)"
            strokeWidth="1"
          />
        </svg>

        {/* Continent Markers */}
        {continents.map((continent, i) => {
          const count = stores.filter((s) => s.continent === continent.name).length;
          return (
            <motion.button
              key={continent.name}
              className="absolute group cursor-pointer"
              style={{ left: continent.x, top: continent.y, transform: "translate(-50%, -50%)" }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              onClick={() => setSelectedContinent(continent.name)}
            >
              <div className="relative">
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-500 ${
                    selectedContinent === continent.name
                      ? "bg-havok-accent scale-150"
                      : "bg-havok-platinum/30 group-hover:bg-havok-accent/60"
                  }`}
                />
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-havok-accent/10 animate-ping" />
                <div className="absolute top-4 left-1/2 -translate-x-1/2">
                  <span className="text-[10px] tracking-[0.2em] text-havok-platinum/50 group-hover:text-havok-gold whitespace-nowrap transition-colors duration-500">
                    {continent.label}
                  </span>
                  <span className="block text-center text-[9px] text-havok-platinum/25 font-mono">
                    {count} boutiques
                  </span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Store List */}
      <AnimatePresence>
        {selectedContinent && (
          <motion.div
            className="max-w-4xl mx-auto mt-12"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="glass-panel p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[10px] tracking-[0.3em] text-havok-platinum/30 uppercase">
                  {selectedContinent} · {continentStores.length} Boutiques
                </h3>
                <button
                  onClick={() => setSelectedContinent(null)}
                  className="text-[10px] tracking-[0.2em] text-havok-platinum/40 hover:text-havok-gold transition-colors"
                >
                  Close
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {continentStores.map((store, i) => (
                  <motion.button
                    key={store.id}
                    className="text-left glass-panel-light p-5 hover:border-havok-accent/30 transition-all duration-500"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    onClick={() => setSelectedStore(store)}
                  >
                    <h4 className="font-display text-lg text-havok-gold mb-1">{store.city}</h4>
                    <p className="text-[10px] tracking-[0.15em] text-havok-platinum/40 mb-2">
                      {store.name}
                    </p>
                    <p className="text-xs text-havok-platinum/50 tracking-wider">
                      {store.address}
                    </p>
                    <div className="flex gap-2 mt-3">
                      {store.services.slice(0, 2).map((s, j) => (
                        <span key={j} className="text-[9px] tracking-wider px-2 py-0.5 border border-havok-border/20 text-havok-platinum/40">
                          {s}
                        </span>
                      ))}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Store Detail Modal */}
      <AnimatePresence>
        {selectedStore && (
          <StoreModal store={selectedStore} onClose={() => setSelectedStore(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}