'use client';

import { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import WorldMapCanvas from '@/components/WorldMapCanvas';
import PageTransition from '@/components/PageTransition';
import { storeLocations } from '@/lib/data';
import { StoreLocation } from '@/lib/types';

const regionLabels: Record<string, string> = {
  na: 'North America',
  eu: 'Europe',
  me: 'Middle East',
  apac: 'Asia Pacific',
  cn: 'China',
};

const regionOrder = ['na', 'eu', 'me', 'apac', 'cn'];

function groupStoresByContinent(stores: StoreLocation[]): Map<string, StoreLocation[]> {
  const map = new Map<string, StoreLocation[]>();
  for (const store of stores) {
    const existing = map.get(store.continent) || [];
    existing.push(store);
    map.set(store.continent, existing);
  }
  return map;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function StoresPage() {
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const storeCardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const groupedStores = groupStoresByContinent(storeLocations);

  const handleStoreSelect = useCallback((store: StoreLocation) => {
    setSelectedStoreId(store.id);
    const cardEl = storeCardRefs.current.get(store.id);
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  const setCardRef = useCallback((id: string, el: HTMLDivElement | null) => {
    if (el) {
      storeCardRefs.current.set(id, el);
    } else {
      storeCardRefs.current.delete(id);
    }
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-havok-carbon">
        {/* ================================================================
            HEADER
        ================================================================ */}
        <section className="relative py-24 overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
            <motion.div
              className="text-center"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <h1 className="text-display-md font-[250] text-havok-platinum tracking-tight">
                Global Boutiques
              </h1>
              <p className="mt-4 text-sm font-[300] text-havok-silver tracking-[0.04em]">
                Visit our houses of luxury across five continents
              </p>
              <div className="metal-divider mt-8 max-w-xs mx-auto" />
            </motion.div>
          </div>
        </section>

        {/* ================================================================
            WORLD MAP SECTION
        ================================================================ */}
        <section className="relative overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
            <motion.div
              className="glass-panel scan-border overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeInUp}
            >
              <div className="hidden lg:block h-[500px]">
                <WorldMapCanvas
                  stores={storeLocations}
                  onStoreSelect={handleStoreSelect}
                />
              </div>
              <div className="lg:hidden h-[340px]">
                <WorldMapCanvas
                  stores={storeLocations}
                  onStoreSelect={handleStoreSelect}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================================================================
            STORE LISTINGS
        ================================================================ */}
        <section className="relative py-24 overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
            {regionOrder.map((continent) => {
              const stores = groupedStores.get(continent);
              if (!stores || stores.length === 0) return null;

              return (
                <motion.div
                  key={continent}
                  className="mb-20 last:mb-0"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  variants={staggerContainer}
                >
                  {/* Region header */}
                  <motion.div className="mb-8" variants={fadeInUp}>
                    <div className="flex items-center gap-4">
                      <span className="text-label text-havok-frost uppercase tracking-[0.12em]">
                        {regionLabels[continent] || continent}
                      </span>
                      <div className="flex-1 metal-divider" />
                    </div>
                  </motion.div>

                  {/* Store cards grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {stores.map((store) => {
                      const isSelected = selectedStoreId === store.id;

                      return (
                        <motion.div
                          key={store.id}
                          variants={fadeInUp}
                          ref={(el) => setCardRef(store.id, el as HTMLDivElement | null)}
                        >
                          <div
                            className={`glass-panel scan-border p-6 md:p-8 transition-all duration-500 ${
                              isSelected
                                ? 'border-havok-frost/40 bg-havok-graphite/80'
                                : 'border-havok-glass-border bg-havok-graphite/50 hover:bg-havok-graphite/60'
                            }`}
                          >
                            {/* Store name & location */}
                            <div className="mb-4">
                              <h3 className="text-heading font-[300] text-havok-platinum tracking-tight mb-1">
                                {store.name}
                              </h3>
                              <p className="text-detail text-havok-silver tracking-[0.04em]">
                                {store.city}, {store.country}
                              </p>
                            </div>

                            {/* Address */}
                            <div className="mb-4">
                              <p className="text-sm font-[300] text-havok-text-muted leading-relaxed">
                                {store.address}
                              </p>
                            </div>

                            <div className="metal-divider mb-4" />

                            {/* Phone */}
                            <div className="mb-4">
                              <p className="text-sm font-[300] text-havok-silver">
                                {store.phone}
                              </p>
                            </div>

                            {/* Operating hours */}
                            <div className="mb-4">
                              <p className="text-detail text-havok-text-muted tracking-[0.04em]">
                                {store.hours}
                              </p>
                            </div>

                            <div className="metal-divider mb-4" />

                            {/* Services */}
                            <div className="mb-4">
                              <p className="text-label text-havok-frost uppercase tracking-[0.12em] mb-2">
                                Services
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {store.services.map((service) => (
                                  <span
                                    key={service}
                                    className="inline-block rounded-sm border border-havok-glass-border bg-havok-slate/50 px-2.5 py-1 text-detail text-havok-silver"
                                  >
                                    {service}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Brands */}
                            <div className="mb-6">
                              <p className="text-label text-havok-frost uppercase tracking-[0.12em] mb-2">
                                Available Brands
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {store.brands.map((brand) => (
                                  <span
                                    key={brand}
                                    className="inline-block rounded-sm border border-havok-frost/20 bg-havok-frost/5 px-2.5 py-1 text-detail text-havok-frost"
                                  >
                                    {brand}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Book Appointment button */}
                            <button
                              className="inline-flex items-center gap-2 px-5 py-2.5 border border-havok-frost/30 text-havok-frost hover:bg-havok-frost/10 hover:border-havok-frost/50 transition-all duration-500 text-sm tracking-[0.06em] uppercase"
                            >
                              Book Appointment
                              <span className="text-havok-frost/50">&rarr;</span>
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}