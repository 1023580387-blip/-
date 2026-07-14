import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { products } from "../../data/products";
import { useCurrencyStore } from "../../store/useCurrencyStore";
import { formatPrice } from "../../data/currencies";

const limitedProducts = products
  .filter((p) => p.isLimited && p.year === "2025")
  .slice(0, 4);

export default function LimitedNewArrivals() {
  const { currency } = useCurrencyStore();

  return (
    <section className="relative py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="text-[10px] tracking-[0.4em] text-havok-accent/60 uppercase block mb-3">
            New Arrivals
          </span>
          <h2 className="font-display text-display-md text-havok-gold leading-tight">
            Limited Editions
          </h2>
          <p className="text-havok-platinum/40 text-sm tracking-wider mt-2 max-w-md">
            Exceptional pieces crafted in strictly limited quantities for the discerning collector.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {limitedProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to={`/product/${product.id}`}
                className="block group"
              >
                <div className="relative aspect-square overflow-hidden mb-5 border border-havok-border/10 transition-all duration-700 group-hover:border-havok-border/30">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                    style={{ backgroundImage: `url(${product.images[0]})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-havok-base/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-[9px] tracking-[0.3em] text-havok-accent/60 uppercase">
                      Limited {product.limitNumber}
                    </span>
                  </div>
                  {/* Scan line */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 scan-line-overlay" />
                </div>
                <span className="text-[10px] tracking-[0.2em] text-havok-platinum/40 uppercase block mb-1">
                  {product.brand}
                </span>
                <h3 className="font-display text-lg text-havok-gold mb-1 leading-tight group-hover:text-havok-platinum transition-colors duration-500">
                  {product.name}
                </h3>
                <span className="font-mono text-sm text-havok-platinum/60">
                  {formatPrice(product.price, currency)}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}