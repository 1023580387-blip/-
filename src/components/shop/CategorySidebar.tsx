import { motion } from "framer-motion";
import type { Category } from "../../types";
import { categories } from "../../data/categories";
import {
  Watch,
  Scissors,
  Gem,
  Car,
  Cpu,
  Trophy,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Watch,
  Scissors,
  Gem,
  Car,
  Cpu,
  Trophy,
};

interface Props {
  selected: string;
  onSelect: (id: string) => void;
}

export default function CategorySidebar({ selected, onSelect }: Props) {
  return (
    <aside className="hidden lg:block w-64 flex-shrink-0">
      <div className="glass-panel p-6 sticky top-28">
        <h3 className="text-[10px] tracking-[0.3em] text-havok-platinum/30 uppercase mb-6">
          Categories
        </h3>
        <nav className="space-y-1">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon];
            const isSelected = selected === cat.id;
            return (
              <motion.button
                key={cat.id}
                onClick={() => onSelect(cat.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-500 group relative ${
                  isSelected
                    ? "text-havok-gold"
                    : "text-havok-platinum/40 hover:text-havok-platinum/70"
                }`}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
              >
                {isSelected && (
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-px bg-havok-accent/60"
                    layoutId="cat-active"
                  />
                )}
                {Icon && (
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isSelected ? "text-havok-accent/70" : ""}`} />
                )}
                <div className="flex flex-col items-start">
                  <span className="text-xs tracking-[0.15em] uppercase">{cat.name}</span>
                  <span className="text-[10px] tracking-wider text-havok-platinum/30">{cat.nameZh}</span>
                </div>
              </motion.button>
            );
          })}
        </nav>
        <div className="metal-divider my-6" />
        <p className="text-[10px] leading-relaxed text-havok-platinum/25">
          {categories.find((c) => c.id === selected)?.description ||
            "Select a category to explore our curated collections."}
        </p>
      </div>
    </aside>
  );
}