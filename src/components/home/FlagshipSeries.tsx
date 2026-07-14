import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { brands } from "../../data/brands";
import { products } from "../../data/products";
import { useCurrencyStore } from "../../store/useCurrencyStore";
import { formatPrice } from "../../data/currencies";

const flagshipBrands = brands.slice(0, 3);
const flagshipProducts = products.filter((p) =>
  ["havok-018", "havok-005", "havok-003"].includes(p.id)
);

export default function FlagshipSeries() {
  const { currency } = useCurrencyStore();

  return (
    <section className="relative py-24 lg:py-32 px-6 lg:px-12 bg-havok-deep">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="text-[10px] tracking-[0.4em] text-havok-accent/60 uppercase block mb-3">
            Flagship
          </span>
          <h2 className="font-display text-display-md text-havok-gold leading-tight">
            Signature Collections
          </h2>
          <p className="text-havok-platinum/40 text-sm tracking-wider mt-2 max-w-md">
            The defining masterpieces from our most prestigious maisons.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {flagshipProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to={`/product/${product.id}`} className="block group">
                <div className="relative aspect-[4/5] overflow-hidden mb-6 border border-havok-border/10 transition-all duration-700 group-hover:border-havok-border/30">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                    style={{ backgroundImage: `url(${product.images[0]})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-havok-deep/90 via-transparent to-transparent" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 scan-line-overlay" />
                </div>
                <span className="text-[10px] tracking-[0.2em] text-havok-platinum/40 uppercase block mb-1">
                  {product.brand}
                </span>
                <h3 className="font-display text-xl text-havok-gold mb-1 leading-tight">
                  {product.name}
                </h3>
                <p className="text-havok-platinum/40 text-xs leading-relaxed mb-3 line-clamp-2">
                  {product.description}
                </p>
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