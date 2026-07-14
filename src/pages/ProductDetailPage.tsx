import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import Product360Viewer from "../components/product/Product360Viewer";
import ProductInfoPanel from "../components/product/ProductInfoPanel";
import BrandStoreMap from "../components/product/BrandStoreMap";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <main className="min-h-screen bg-tracks pt-24 flex items-center justify-center">
        <div className="text-center">
          <span className="text-[10px] tracking-[0.3em] text-havok-platinum/25 uppercase block mb-4">
            Product Not Found
          </span>
          <Link to="/shop" className="btn-havok-ghost">
            Browse Collection
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-tracks min-h-screen pt-24 lg:pt-28 pb-16">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Back */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-havok-platinum/40 hover:text-havok-gold transition-colors duration-500 text-xs tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Collection
          </Link>
        </motion.div>

        {/* Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Product360Viewer images={product.images} />
          </motion.div>

          {/* Right: Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProductInfoPanel product={product} />
          </motion.div>
        </div>

        {/* Brand Store Map */}
        <BrandStoreMap product={product} />
      </div>
    </main>
  );
}