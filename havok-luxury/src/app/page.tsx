"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import HeroCarousel from "@/components/HeroCarousel";
import LuxuryProductCard from "@/components/LuxuryProductCard";
import { heroSlides, products, storeLocations, navCategories } from "@/lib/data";

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

const limitedEditionProducts = products.filter((p) => p.limitedEdition).slice(0, 4);

const featuredStores = storeLocations.slice(0, 8);

export default function Home() {
  return (
    <PageTransition>
      {/* ================================================================
          SECTION 1 — HERO CAROUSEL (full-screen)
      ================================================================ */}
      <HeroCarousel slides={heroSlides} />

      {/* ================================================================
          SECTION 2 — GLOBAL LIMITED EDITIONS
      ================================================================ */}
      <section className="relative py-32 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          {/* Section header */}
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
          >
            <h2 className="text-display-md font-[250] text-havok-platinum tracking-tight">
              Global Limited Editions
            </h2>
            <p className="mt-4 text-sm font-[300] text-havok-silver tracking-[0.04em]">
              Exceptional pieces available in limited quantities worldwide
            </p>
            <div className="metal-divider mt-8 max-w-xs mx-auto" />
          </motion.div>

          {/* Product grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            {limitedEditionProducts.map((product, i) => (
              <motion.div key={product.id} variants={fadeInUp}>
                <LuxuryProductCard product={product} index={i} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          SECTION 3 — FLAGSHIP COLLECTIONS
      ================================================================ */}
      <section className="relative py-32 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          {/* Section header */}
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
          >
            <h2 className="text-display-md font-[250] text-havok-platinum tracking-tight">
              Flagship Collections
            </h2>
            <p className="mt-4 text-sm font-[300] text-havok-silver tracking-[0.04em]">
              The pinnacle of each atelier
            </p>
            <div className="metal-divider mt-8 max-w-xs mx-auto" />
          </motion.div>

          {/* Category cards grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            {navCategories.map((category) => (
              <motion.div key={category.id} variants={fadeInUp}>
                <Link
                  href={`/shop?category=${category.id}`}
                  className="glass-panel scan-border group block p-8 h-full min-h-[220px] flex flex-col justify-between hover:bg-havok-graphite/60 transition-colors duration-500"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-label text-havok-frost uppercase tracking-[0.12em]">
                        {category.description}
                      </span>
                      <motion.span
                        className="text-havok-silver/30 group-hover:text-havok-frost/60 transition-colors duration-500"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </motion.span>
                    </div>
                    <h3 className="text-heading font-[300] text-havok-platinum tracking-tight mb-3">
                      {category.label}
                    </h3>
                    <p className="text-sm font-[300] text-havok-text-muted leading-relaxed">
                      {category.labelZh}
                    </p>
                  </div>
                  <div className="mt-6">
                    <span className="inline-flex items-center gap-2 text-detail text-havok-frost tracking-[0.08em] uppercase group-hover:text-havok-frost-light transition-colors duration-500">
                      Explore Collection
                      <span className="text-havok-frost/40 group-hover:translate-x-1 transition-transform duration-300">
                        &rarr;
                      </span>
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          SECTION 4 — GLOBAL BOUTIQUES
      ================================================================ */}
      <section className="relative py-32 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          {/* Section header */}
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
          >
            <h2 className="text-display-md font-[250] text-havok-platinum tracking-tight">
              Global Boutiques
            </h2>
            <p className="mt-4 text-sm font-[300] text-havok-silver tracking-[0.04em]">
              Visit our houses of luxury across five continents
            </p>
            <div className="metal-divider mt-8 max-w-xs mx-auto" />
          </motion.div>

          {/* Store grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            {featuredStores.map((store) => (
              <motion.div key={store.id} variants={fadeInUp}>
                <Link
                  href="/stores"
                  className="glass-panel scan-border group block p-6 h-full hover:bg-havok-graphite/60 transition-colors duration-500"
                >
                  <p className="text-label text-havok-frost uppercase tracking-[0.12em] mb-3">
                    {store.region}
                  </p>
                  <h3 className="text-lg font-[300] text-havok-platinum tracking-tight mb-2">
                    {store.city}
                  </h3>
                  <p className="text-sm font-[300] text-havok-silver mb-4">
                    {store.country}
                  </p>
                  <p className="text-detail text-havok-text-muted leading-relaxed line-clamp-2 mb-4">
                    {store.address}
                  </p>
                  <div className="flex items-center gap-2 text-detail text-havok-frost tracking-[0.08em] uppercase group-hover:text-havok-frost-light transition-colors duration-500">
                    <span>Visit Boutique</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      &rarr;
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* View all stores link */}
          <motion.div
            className="text-center mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Link
              href="/stores"
              className="inline-flex items-center gap-3 px-8 py-3.5 border border-havok-frost/40 text-havok-frost hover:bg-havok-frost/10 hover:border-havok-frost/60 transition-all duration-500 text-sm tracking-[0.1em] uppercase"
            >
              View All Boutiques
              <span className="text-havok-frost/60">&rarr;</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          SECTION 5 — BRAND HERITAGE
      ================================================================ */}
      <section className="relative py-32 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <motion.div
            className="glass-panel scan-border p-12 md:p-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
          >
            <div className="max-w-3xl mx-auto text-center">
              <motion.p
                className="text-label text-havok-frost uppercase tracking-[0.12em] mb-6"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Est. 1790
              </motion.p>

              <motion.h2
                className="text-display-md font-[250] text-havok-platinum tracking-tight mb-6"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                A Legacy of Precision
              </motion.h2>

              <motion.p
                className="text-sm font-[300] text-havok-silver tracking-[0.04em] mb-8"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Since 1790, the House of Havok has defined the art of luxury
                craftsmanship
              </motion.p>

              <div className="metal-divider max-w-sm mx-auto mb-10" />

              <motion.div
                className="space-y-6 text-left"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <p className="text-sm font-[300] text-havok-silver leading-relaxed">
                  From the royal courts of 18th-century France to the glittering
                  avenues of the modern world, the House of Havok has remained
                  unwavering in its pursuit of perfection. What began as a
                  single atelier dedicated to precision cartography has evolved
                  into a global luxury group spanning six extraordinary
                  divisions.
                </p>
                <p className="text-sm font-[300] text-havok-silver leading-relaxed">
                  Every Havok creation carries within it the DNA of that first
                  royal appointment — an insistence on precision, an obsession
                  with materials, and a reverence for the hands that shape them.
                  Our master watchmakers spend 1,200 hours on a single movement.
                  Our couturiers devote 800 hours to a single gown. Our
                  jewelers travel the world to source the rarest stones.
                </p>
                <p className="text-sm font-[300] text-havok-silver leading-relaxed">
                  This is not luxury for its own sake. It is luxury as a
                  discipline — a commitment to creating objects of lasting
                  beauty and meaning that will be treasured for generations.
                </p>
              </motion.div>

              <motion.div
                className="mt-12"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Link
                  href="/archive"
                  className="inline-flex items-center gap-3 px-8 py-3.5 border border-havok-frost/40 text-havok-frost hover:bg-havok-frost/10 hover:border-havok-frost/60 transition-all duration-500 text-sm tracking-[0.1em] uppercase"
                >
                  Explore the Archive
                  <span className="text-havok-frost/60">&rarr;</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}