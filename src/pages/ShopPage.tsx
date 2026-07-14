import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import CategorySidebar from "../components/shop/CategorySidebar";
import FilterBar from "../components/shop/FilterBar";
import ProductGrid from "../components/shop/ProductGrid";
import { products } from "../data/products";
import { categories } from "../data/categories";
import { Menu, X } from "lucide-react";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filters, setFilters] = useState({ currency: "USD", region: "GLOBAL", limited: false });
  const [mobileDrawer, setMobileDrawer] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (filters.limited) {
      result = result.filter((p) => p.isLimited);
    }

    if (filters.region !== "GLOBAL") {
      result = result.filter((p) => p.regions.includes(filters.region));
    }

    return result;
  }, [selectedCategory, filters]);

  return (
    <main className="bg-tracks min-h-screen pt-24 lg:pt-28 pb-16">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Page Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[10px] tracking-[0.4em] text-havok-accent/60 uppercase block mb-3">
            Collection
          </span>
          <h1 className="font-display text-display-md text-havok-gold leading-tight">
            All Categories
          </h1>
          <p className="text-havok-platinum/40 text-sm tracking-wider mt-2 max-w-md">
            {selectedCategory === "all"
              ? "Explore our complete curation of exceptional luxury pieces."
              : categories.find((c) => c.id === selectedCategory)?.description}
          </p>
        </motion.div>

        {/* Mobile Category Toggle */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setMobileDrawer(!mobileDrawer)}
            className="flex items-center gap-2 px-4 py-2 border border-havok-border/20 text-havok-platinum/60 text-xs tracking-wider"
          >
            {mobileDrawer ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
            Categories
          </button>
          {mobileDrawer && (
            <div className="glass-panel mt-3 p-4 space-y-1">
              <button
                onClick={() => { setSelectedCategory("all"); setMobileDrawer(false); }}
                className={`w-full text-left px-4 py-2 text-xs tracking-wider ${
                  selectedCategory === "all" ? "text-havok-gold bg-havok-surface/50" : "text-havok-platinum/50"
                }`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat.id); setMobileDrawer(false); }}
                  className={`w-full text-left px-4 py-2 text-xs tracking-wider ${
                    selectedCategory === cat.id ? "text-havok-gold bg-havok-surface/50" : "text-havok-platinum/50"
                  }`}
                >
                  {cat.name} · {cat.nameZh}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-10">
          {/* Sidebar */}
          <CategorySidebar selected={selectedCategory} onSelect={setSelectedCategory} />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <FilterBar onFilterChange={setFilters} />
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </main>
  );
}