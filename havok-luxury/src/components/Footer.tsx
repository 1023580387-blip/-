"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { storeLocations } from "@/lib/data";

export default function Footer() {
  const continents = [
    { label: "North America", stores: storeLocations.filter((s) => s.continent === "na") },
    { label: "Europe", stores: storeLocations.filter((s) => s.continent === "eu") },
    { label: "Middle East", stores: storeLocations.filter((s) => s.continent === "me") },
    { label: "Asia Pacific", stores: storeLocations.filter((s) => s.continent === "apac") },
    { label: "China", stores: storeLocations.filter((s) => s.continent === "cn") },
  ];

  return (
    <footer className="relative z-10 border-t border-havok-glass-border">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24">
        {/* Top Section */}
        <div className="py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <Link href="/" className="inline-block">
                <span className="text-2xl font-[200] tracking-[0.25em] text-havok-platinum">
                  HAVOK
                </span>
              </Link>
              <p className="mt-4 text-detail text-havok-text-muted leading-relaxed max-w-[240px]">
                Precision craftsmanship since 1790. A global house of luxury, heritage, and innovation.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-label text-havok-silver uppercase tracking-[0.15em] mb-4">
                Collections
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Watches", href: "/shop?category=watches" },
                  { label: "Couture", href: "/shop?category=couture" },
                  { label: "Jewelry", href: "/shop?category=jewelry" },
                  { label: "Auto Accessories", href: "/shop?category=auto-accessories" },
                  { label: "Technology", href: "/shop?category=tech" },
                  { label: "Collectibles", href: "/shop?category=collectibles" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-detail text-havok-text-muted hover:text-havok-platinum transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-label text-havok-silver uppercase tracking-[0.15em] mb-4">
                House of Havok
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Heritage Archive", href: "/archive" },
                  { label: "Global Boutiques", href: "/stores" },
                  { label: "Our Story", href: "#" },
                  { label: "Craftsmanship", href: "#" },
                  { label: "Sustainability", href: "#" },
                  { label: "Careers", href: "#" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-detail text-havok-text-muted hover:text-havok-platinum transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-label text-havok-silver uppercase tracking-[0.15em] mb-4">
                Client Services
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Personal Shopping", href: "#" },
                  { label: "Custom Commission", href: "#" },
                  { label: "Private Appointment", href: "#" },
                  { label: "Global Shipping", href: "#" },
                  { label: "After-Sales Care", href: "#" },
                  { label: "Concierge", href: "#" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-detail text-havok-text-muted hover:text-havok-platinum transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Global Boutiques */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h4 className="text-label text-havok-silver uppercase tracking-[0.15em] mb-4">
                Global Boutiques
              </h4>
              <ul className="space-y-2.5">
                {continents.map((continent) => (
                  <li key={continent.label}>
                    <Link
                      href="/stores"
                      className="text-detail text-havok-text-muted hover:text-havok-platinum transition-colors duration-300"
                    >
                      {continent.label}
                      <span className="ml-1.5 text-havok-frost/60">
                        ({continent.stores.length})
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Metal Divider */}
        <div className="metal-divider" />

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-detail text-havok-text-muted">
            &copy; {new Date().getFullYear()} Havok Group. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {[
              { label: "Privacy Policy", href: "#" },
              { label: "Terms of Service", href: "#" },
              { label: "Cookie Settings", href: "#" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-detail text-havok-text-muted hover:text-havok-silver transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}