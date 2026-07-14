import { motion } from "framer-motion";
import { MapPin, Clock, Phone } from "lucide-react";
import { stores } from "../../data/stores";
import type { Product } from "../../types";

interface Props {
  product: Product;
}

export default function BrandStoreMap({ product }: Props) {
  const relevantStores = stores.filter((store) =>
    product.regions.some((r) => {
      const regionMap: Record<string, string> = {
        GLOBAL: "Global",
        NA: "North America",
        EU: "Europe",
        UK: "Europe",
        CH: "Europe",
        ASIA: "Asia",
        CN: "Asia",
        ME: "Middle East",
      };
      return store.continent === regionMap[r];
    })
  ).slice(0, 4);

  return (
    <section className="mt-16 lg:mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="metal-divider mb-10" />
        <h3 className="text-[10px] tracking-[0.3em] text-havok-platinum/30 uppercase mb-8">
          Available at These Boutiques
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relevantStores.map((store, i) => (
            <motion.div
              key={store.id}
              className="glass-panel-light p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <h4 className="font-display text-lg text-havok-gold mb-2">{store.city}</h4>
              <p className="text-[10px] tracking-[0.15em] text-havok-platinum/40 mb-4">
                {store.name}
              </p>
              <div className="space-y-2 text-xs text-havok-platinum/50">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0 text-havok-platinum/30" />
                  <span className="tracking-wider">{store.address}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-3 h-3 mt-0.5 flex-shrink-0 text-havok-platinum/30" />
                  <span className="tracking-wider">{store.hours}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="w-3 h-3 mt-0.5 flex-shrink-0 text-havok-platinum/30" />
                  <span className="tracking-wider font-mono">{store.phone}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}